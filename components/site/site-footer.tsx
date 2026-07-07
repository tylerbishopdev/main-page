"use client";

import Image from "next/image";
import Link from "next/link";

import { Link001 } from "@/components/ui/skiper-ui/skiper40";
import { BRAND_ASSETS, DESTINATIONS, IDENTITY } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="brand-ink relative w-full overflow-hidden border-t-[10px] border-primary">
      <Image
        src={BRAND_ASSETS.collages[7]}
        alt=""
        width={1024}
        height={576}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-full w-full object-cover opacity-[0.18] mix-blend-screen grayscale"
      />
      <div className="relative mx-auto grid max-w-[1600px] gap-8 px-4 pb-8 pt-20 sm:px-6 lg:grid-cols-[1fr_0.72fr] lg:items-end">
        <div>
          <p className="brand-label mb-6 text-primary">{IDENTITY.tagline}</p>
          <Image
            src={BRAND_ASSETS.logo.cream}
            alt="notTyler"
            width={425}
            height={119}
            className="h-auto w-full max-w-4xl"
          />
          <p className="mt-5 max-w-xl font-mono text-sm uppercase leading-relaxed tracking-[0.12em] text-paper/70">
            future is not a straight line. question everything. design anything.
            break patterns.
          </p>
        </div>
        <div className="print-panel paper-texture relative overflow-hidden p-4 text-ink">
          <Image
            src={BRAND_ASSETS.elements[3]}
            alt=""
            width={362}
            height={493}
            aria-hidden
            className="mx-auto h-auto max-h-[420px] w-auto object-contain mix-blend-multiply"
          />
          <div className="brand-microcopy absolute left-5 top-5 max-w-[180px] text-ink/70">
            not a person. not a brand. a feeling.
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 pb-6 pt-4 sm:px-6">
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-y border-paper/15 py-4">
          {DESTINATIONS.map((item) => (
            <Link001
              key={item.name}
              href={item.href}
              className="font-mono text-xs uppercase tracking-[0.25em] text-paper/70 transition-colors hover:text-primary"
            >
              {item.name}
            </Link001>
          ))}
          <Link001
            href="mailto:not@nottyler.org"
            className="font-mono text-xs uppercase tracking-[0.25em] text-paper/70 transition-colors hover:text-primary"
          >
            not@nottyler.org
          </Link001>
        </nav>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-ndot text-[10px] uppercase tracking-[0.2em] text-paper/60">
            {IDENTITY.copyright}
          </p>
          <Link
            href="https://videos.nottyler.org"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open.Video channel"
          >
            <Image
              src="/ovlogo.png"
              alt="OV Logo"
              width={154}
              height={154}
              className="h-auto w-[120px] opacity-50 invert transition-opacity hover:opacity-90"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
