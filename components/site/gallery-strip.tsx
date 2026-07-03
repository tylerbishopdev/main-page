"use client";

import Link from "next/link";

import { HoverExpand_001 } from "@/components/ui/skiper-ui/skiper52";
import { ART_IMAGES, WUT } from "@/lib/content";

const stripImages = ART_IMAGES.slice(0, 9).map((src, i) => ({
  src,
  alt: "art piece from the NotTyler collection",
  code: `№ ${String(i + 1).padStart(2, "0")}`,
}));

export default function GalleryStrip() {
  const artsTab = WUT.tabs[1];

  return (
    <section className="relative w-full bg-background py-28">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-2 px-4 sm:px-6">
        <p className="font-advancedled text-[10px] uppercase tracking-[0.35em] text-primary">
          from the vault
        </p>
        <div className="flex w-full flex-wrap items-end justify-between gap-4">
          <h2 className="font-ndot text-5xl uppercase leading-none tracking-tight text-foreground sm:text-7xl">
            {artsTab.label}
          </h2>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {artsTab.description}
          </p>
        </div>
      </div>

      {/* hover-to-expand filmstrip — skiper-ui Skiper52 (HoverExpand_001) */}
      <div className="mt-12 flex w-full items-center justify-center overflow-hidden">
        <HoverExpand_001 images={stripImages} className="max-w-6xl" />
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/not"
          className="group inline-flex items-center gap-3 rounded-full border border-foreground/20 px-7 py-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          see everything in the Not Dashboard
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
