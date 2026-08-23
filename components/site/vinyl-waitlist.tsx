"use client";

import { useEffect, useId, useState } from "react";

const STORAGE_KEY = "ao:vinyl-waitlist";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,24}$/i;

type Status = "idle" | "sending" | "done";

/* The torn card from the poster, rebuilt as a real form. Anyone who already
 * signed up on this device sees the confirmation instead of an empty form. */
export default function VinylWaitlist() {
  const fieldId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [joinedAs, setJoinedAs] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setJoinedAs(saved);
        setStatus("done");
      }
    } catch {
      /* private mode — the form simply stays interactive */
    }
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (trimmedName.length < 2) {
      setError("Put a name on it.");
      return;
    }
    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setError("That email will not reach you.");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          company,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "The press jammed. Try that again.");
      }

      try {
        window.localStorage.setItem(STORAGE_KEY, trimmedName);
      } catch {
        /* nothing to remember it with — the confirmation still shows */
      }
      setJoinedAs(trimmedName);
      setStatus("done");
    } catch (caught) {
      setStatus("idle");
      setError(
        caught instanceof Error
          ? caught.message
          : "The press jammed. Try that again.",
      );
    }
  }

  const sending = status === "sending";

  return (
    <div className="ao-card">
      <h2 className="ao-card-title">Vinyl Waitlist</h2>
      <p className="ao-card-lede">The vinyl revolution will be pressed</p>
      <ul className="ao-card-bullets" role="list">
        <li>
          <span aria-hidden="true">&bull;</span> Expand your collection
        </li>
        <li>
          <span aria-hidden="true">&bull;</span> Don&apos;t miss the pressing
        </li>
      </ul>

      {status === "done" ? (
        <div className="ao-done" role="status">
          <p className="ao-done-stamp">On the list</p>
          <p className="ao-done-body">
            {joinedAs ? `${joinedAs} — ` : ""}the pressing is not your problem
            anymore. We write when the plates are cut.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <fieldset className="ao-fieldset" disabled={sending}>
            <legend className="ao-legend">Sign up</legend>

            <label className="sr-only" htmlFor={`${fieldId}-name`}>
              Your name
            </label>
            <input
              id={`${fieldId}-name`}
              className="ao-field"
              name="name"
              type="text"
              autoComplete="name"
              maxLength={80}
              placeholder="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              aria-invalid={error === "Put a name on it." || undefined}
            />

            <label className="sr-only" htmlFor={`${fieldId}-email`}>
              Your email
            </label>
            <input
              id={`${fieldId}-email`}
              className="ao-field"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={254}
              placeholder="Your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={
                error === "That email will not reach you." || undefined
              }
            />

            <div className="ao-hp" aria-hidden="true">
              <label htmlFor={`${fieldId}-company`}>Company</label>
              <input
                id={`${fieldId}-company`}
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
              />
            </div>

            <button className="ao-submit" type="submit">
              <span className="ao-submit-label">
                {sending ? "Pressing\u2026" : "Join the waitlist"}
              </span>
            </button>
          </fieldset>

          <p
            className={`ao-note${error ? " ao-note--error" : ""}`}
            role="status"
          >
            {error ?? ""}
          </p>
        </form>
      )}
    </div>
  );
}
