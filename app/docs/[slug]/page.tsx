import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import OpenVideoPlayer from "@/components/site/open-video-player";
import SiteNav from "@/components/site/site-nav";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";
import { DOCS } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return DOCS.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = DOCS.find((d) => d.slug === slug);
  if (!doc) return {};
  return {
    title: doc.pageTitle,
    description: doc.blurb,
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const doc = DOCS.find((d) => d.slug === slug);
  if (!doc) notFound();

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <SiteNav />

      <div className="pt-40">
        <ScrollVelocityContainer>
          <ScrollVelocityRow baseVelocity={14} direction={1}>
            <span className="whitespace-nowrap pr-10 font-ndot text-5xl uppercase leading-none tracking-tight text-primary sm:text-7xl">
              {doc.marquee}{" "}
              <span className="text-foreground/30">{doc.marqueeNote}</span>{" "}
            </span>
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </div>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center gap-8 px-4 py-10 sm:px-6">
        <div className="w-full overflow-hidden rounded-2xl border border-primary/40 bg-card p-1.5 shadow-[0_30px_80px_-30px_rgba(216,58,46,0.35)]">
          <OpenVideoPlayer
            videoId={doc.videoId}
            className="aspect-video w-full"
          />
        </div>
        <p className="max-w-xl text-center font-mono text-xs leading-relaxed text-muted-foreground">
          {doc.blurb}
        </p>
        <Link
          href="/docs"
          className="inline-flex items-center gap-3 rounded-full border border-foreground/20 px-7 py-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          ← All Docs
        </Link>
      </main>
    </div>
  );
}
