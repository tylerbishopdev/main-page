"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

import { Link001 } from "@/components/ui/skiper-ui/skiper40";
import { DESTINATIONS, IDENTITY } from "@/lib/content";

/* ASCII shiba renderer from skiper-ui Skiper14 (AsciiSimulation) — three.js. */
const AsciiSimulation = dynamic(
  () =>
    import("@/components/ui/skiper-ui/skiper14").then(
      (mod) => mod.AsciiSimulation,
    ),
  { ssr: false },
);

export default function SiteFooter() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-primary/20 bg-background">
      <div className="relative">
        <AsciiSimulation
          modelPath="/models/shiba2.glb"
          className="h-[48vh] w-full"
          backgroundColor="#0e0d0c"
          textColor="#ff4438"
          fontSize="7px"
          lineHeight="7px"
          modelScale={17}
          cameraPosition={{ x: 0, y: 9, z: 14 }}
        />
      </div>
      <p className="pointer-events-none py-2 text-center font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
        pet the shiba (drag it)
      </p>

      <h2 className="w-full select-none text-center font-ndot text-[16.5vw] uppercase leading-[0.85] tracking-tight text-primary">
        nottyler
      </h2>

      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 pb-6 pt-4 sm:px-6">
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-y border-foreground/10 py-4">
          {DESTINATIONS.map((item) => (
            <Link001
              key={item.name}
              href={item.href}
              className="font-mono text-xs uppercase tracking-[0.25em] text-foreground/70 transition-colors hover:text-primary"
            >
              {item.name}
            </Link001>
          ))}
          <Link001
            href="mailto:not@nottyler.org"
            className="font-mono text-xs uppercase tracking-[0.25em] text-foreground/70 transition-colors hover:text-primary"
          >
            not@nottyler.org
          </Link001>
        </nav>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-ndot text-[10px] uppercase tracking-[0.2em] text-foreground/30">
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
              className="h-auto w-[120px] opacity-50 transition-opacity hover:opacity-90"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
