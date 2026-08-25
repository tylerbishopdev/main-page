"use client";

import Link from "next/link";

import { HoverExpand_001 } from "@/components/ui/skiper-ui/skiper52";
import { ART_IMAGES, WUT } from "@/lib/content";

const stripImages = ART_IMAGES.slice(0, 8).map((src, i) => ({
  src,
  alt: `Artwork ${i + 1}`,
  code: `№ ${String(i + 1).padStart(2, "0")}`,
}));

export default function GalleryStrip() {
  const artsTab = WUT.tabs[1];

  return (
    <section className="brand-ink relative w-full overflow-hidden py-28">
      <div className="brand-microcopy absolute left-4 top-6 hidden text-primary/80 sm:block">
        tune out / log off / transmit
      </div>
      <span className="red-sun -right-20 top-24 h-72 opacity-80" />
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-2 px-4 sm:px-6">
        <div className="flex w-full flex-wrap items-end justify-between gap-4">
          <h2 className="font-ndot text-6xl uppercase leading-[0.8] tracking-[-0.05em] text-paper sm:text-8xl">
            {artsTab.label}
          </h2>
          <p className="max-w-xs border-l-4 border-primary pl-4 font-mono text-[11px] uppercase tracking-[0.25em] text-paper/85">
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
          className="group inline-flex items-center gap-3 border-2 border-paper/35 px-7 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-primary hover:bg-primary hover:text-paper"
        >
          open the Not Dashboard
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
