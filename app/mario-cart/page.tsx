import type { Metadata } from "next";
import Link from "next/link";

import MarioCart from "@/components/mario";
import SiteNav from "@/components/site/site-nav";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";
import { MARIO } from "@/lib/content";

export const metadata: Metadata = {
  title: MARIO.title,
  description: MARIO.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function MarioCartPage() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <SiteNav />

      <div className="pt-40">
        <ScrollVelocityContainer>
          <ScrollVelocityRow baseVelocity={14} direction={1}>
            <span className="whitespace-nowrap pr-10 font-ndot text-5xl uppercase leading-none tracking-tight text-primary sm:text-7xl">
              Mario Cart® The Movie{" "}
              <span className="text-foreground/30">
                {"/// Trailer for Future Blockbuster ///"}
              </span>{" "}
            </span>
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </div>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center gap-8 px-4 py-10 sm:px-6">
        <div className="w-full overflow-hidden rounded-2xl border border-primary/40 bg-card p-1.5 shadow-[0_30px_80px_-30px_rgba(255,68,56,0.35)]">
          <MarioCart className="aspect-video w-full" />
        </div>
        <p className="max-w-xl text-center font-mono text-xs leading-relaxed text-muted-foreground">
          {MARIO.description}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-3 rounded-full border border-foreground/20 px-7 py-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          ← Go Back
        </Link>
      </main>
    </div>
  );
}
