import { NextResponse } from "next/server";

/**
 * Vinyl waitlist intake for /articifical-originals.
 *
 * Delivery is pluggable so the form works on a bare deployment: set
 * WAITLIST_WEBHOOK_URL (any endpoint that accepts JSON) or RESEND_API_KEY to
 * forward signups. With neither configured every entry is still written to the
 * platform logs as a single structured line, so nothing is dropped on the floor.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,24}$/i;
const NAME_MAX = 80;
const EMAIL_MAX = 254;

const RATE_WINDOW_MS = 60_000;
const RATE_MAX_HITS = 5;
const RATE_MAX_KEYS = 5_000;

const recentHits = new Map<string, number[]>();

function isRateLimited(key: string) {
  const now = Date.now();
  const hits = (recentHits.get(key) ?? []).filter(
    (at) => now - at < RATE_WINDOW_MS,
  );
  hits.push(now);
  recentHits.set(key, hits);

  if (recentHits.size > RATE_MAX_KEYS) {
    for (const [k, v] of recentHits) {
      if (v.every((at) => now - at >= RATE_WINDOW_MS)) recentHits.delete(k);
    }
  }

  return hits.length > RATE_MAX_HITS;
}

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

type Signup = {
  name: string;
  email: string;
  signedUpAt: string;
  source: string;
};

async function deliver(signup: Signup) {
  const webhook = process.env.WAITLIST_WEBHOOK_URL;
  if (webhook) {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(signup),
    });
    if (!response.ok) {
      throw new Error(`webhook responded ${response.status}`);
    }
    return "webhook";
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${resendKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.WAITLIST_FROM_EMAIL ?? "waitlist@nottyler.org",
        to: process.env.WAITLIST_NOTIFY_EMAIL ?? "not@nottyler.org",
        subject: `Vinyl waitlist: ${signup.name}`,
        text: [
          `Name:  ${signup.name}`,
          `Email: ${signup.email}`,
          `When:  ${signup.signedUpAt}`,
          `From:  ${signup.source}`,
        ].join("\n"),
      }),
    });
    if (!response.ok) {
      throw new Error(`resend responded ${response.status}`);
    }
    return "email";
  }

  return "log";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Send that again — we could not read the form." },
      { status: 400 },
    );
  }

  const payload = (body ?? {}) as Record<string, unknown>;

  // Hidden field no human ever sees; anything in it is a bot. Answer 200 so
  // the bot has no signal that it was caught.
  if (typeof payload.company === "string" && payload.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email =
    typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";

  if (name.length < 2 || name.length > NAME_MAX) {
    return NextResponse.json(
      { ok: false, error: "Put a name on it." },
      { status: 400 },
    );
  }

  if (email.length > EMAIL_MAX || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { ok: false, error: "That email will not reach you." },
      { status: 400 },
    );
  }

  if (isRateLimited(clientKey(request))) {
    return NextResponse.json(
      { ok: false, error: "Easy. Try again in a minute." },
      { status: 429 },
    );
  }

  const signup: Signup = {
    name,
    email,
    signedUpAt: new Date().toISOString(),
    source: "articifical-originals",
  };

  let channel = "log";
  try {
    channel = await deliver(signup);
  } catch (error) {
    // The entry survives in the log line below, so the signup is not lost —
    // but the operator needs to know the configured channel is down.
    console.error("[waitlist] delivery failed", error);
  }

  console.log(`[waitlist] ${JSON.stringify({ ...signup, channel })}`);

  return NextResponse.json({ ok: true });
}
