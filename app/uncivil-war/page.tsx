import type { Metadata } from "next";
import Link from "next/link";

import UncivilWar from "@/components/state-wars/game";
import SiteNav from "@/components/site/site-nav";
import { UNCIVIL_META } from "@/lib/state-wars";

export const metadata: Metadata = {
  title: UNCIVIL_META.title,
  description: UNCIVIL_META.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function UncivilWarPage() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <SiteNav />
      <main className="flex-1">
        <UncivilWar />
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 pb-14 sm:px-6">
          <p className="max-w-xl text-center font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-muted-foreground">
            {UNCIVIL_META.description} No actual states were harmed. Several
            were emotionally annexed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-full border border-foreground/20 px-7 py-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            ← Go Back
          </Link>
        </div>
      </main>
    </div>
  );
}
