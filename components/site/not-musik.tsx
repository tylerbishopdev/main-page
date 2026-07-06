"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { NOT_MUSIK_RELEASES, type MusikRelease } from "@/lib/content";

const SPOTIFY_ARTIST = "https://open.spotify.com/artist/4BhWvEo85DhqdhG8An3x3n";

function playTick() {
  try {
    const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "square";
    osc.frequency.value = 1350 + Math.random() * 180;

    filter.type = "highpass";
    filter.frequency.value = 900;

    gain.gain.value = 0.035;

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    const stopAt = ctx.currentTime + 0.07;
    gain.gain.linearRampToValueAtTime(0.0001, stopAt);
    osc.stop(stopAt + 0.02);
  } catch {
    // no-op if audio blocked
  }
}

export default function NotMusik({ showHeading = true }: { showHeading?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Use the real unique releases. No artificial duplication — the previous
  // doubling caused repeated tracks in the archive list.
  const displayItems = NOT_MUSIK_RELEASES;

  const current: MusikRelease = NOT_MUSIK_RELEASES[activeIndex % NOT_MUSIK_RELEASES.length];

  // Scroll-driven active item (closest to viewport center)
  useEffect(() => {
    const handleScroll = () => {
      const centerY = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;

      rowRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const dist = Math.abs(itemCenter - centerY);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });

      const realIndex = best % NOT_MUSIK_RELEASES.length;
      if (realIndex !== activeIndex) {
        setActiveIndex(realIndex);
        // subtle "tik" on change while scrolling the archive
        playTick();
      }
    };

    // throttle a bit
    let ticking = false;
    const throttled = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttled, { passive: true });
    // initial
    handleScroll();

    return () => window.removeEventListener("scroll", throttled);
  }, [activeIndex]);

  // Click a row -> jump active + scroll the row into nice view
  const focusRelease = (idx: number, el: HTMLAnchorElement | null) => {
    setActiveIndex(idx);
    playTick();
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.32;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden border-t border-white/10 bg-[#0a0a0a] py-16 text-foreground"
    >
      {/* Dynamic color wash that follows the active release */}
      <div
        className="pointer-events-none absolute inset-0 transition-colors duration-500"
        style={{ backgroundColor: current.bgColor, opacity: 0.06 }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {showHeading && (
          <>
            {/* Heading exactly as requested */}
            <div className="mb-8 flex items-baseline justify-between gap-4">
              <h2 className="font-ndot text-5xl uppercase leading-none tracking-[-1.5px] sm:text-7xl">
                not Tyler: <span className="text-primary">notMusik</span>
              </h2>
              <div className="hidden text-right font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:block">
                archive • scroll to browse<br />drag the sleeve
              </div>
            </div>

            <div className="mb-6 h-px w-full bg-white/10" />
          </>
        )}

        {/* The interactive archive */}
        <div className="relative grid gap-8 lg:grid-cols-12">
          {/* Scrollable list of releases (unique catalog order) */}
          <div className="lg:col-span-7">
            <div className="flex flex-col divide-y divide-white/10">
              {displayItems.map((release, i) => {
                const isActive = i === activeIndex;
                return (
                  <a
                    key={`${release.id}-${i}`}
                    ref={(el) => { rowRefs.current[i] = el; }}
                    href={SPOTIFY_ARTIST}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      // keep navigation but also focus the visual
                      focusRelease(i, rowRefs.current[i]);
                    }}
                    className={`group flex items-center gap-4 py-5 pr-2 transition-all sm:gap-6 sm:py-6 ${isActive ? "opacity-100" : "opacity-70 hover:opacity-100"}`}
                  >
                    <span className="w-9 shrink-0 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-ndot text-2xl uppercase tracking-[-0.5px] transition-colors sm:text-3xl ${isActive ? "text-foreground" : "text-foreground/80 group-hover:text-foreground"}`}
                        >
                          {release.title}
                        </span>
                        <span className="rounded-full border border-white/15 px-2.5 py-px font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                          {release.type}
                        </span>
                      </div>
                      <p className="mt-0.5 font-mono text-xs text-muted-foreground/70">
                        {release.description}
                        {release.plays ? ` • ${release.plays.toLocaleString()} plays` : ""}
                      </p>
                    </div>

                    <div className="hidden text-xs font-mono uppercase tracking-[0.2em] text-primary/70 sm:block">
                      LISTEN →
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Draggable preview sleeve (the "tik tik" fun part) */}
          <div className="relative lg:col-span-5">
            <div className="sticky top-8 flex justify-center lg:justify-end">
              <motion.div
                drag
                dragElastic={0.18}
                dragMomentum
                whileDrag={{ scale: 1.03, rotate: 1.5 }}
                className="group relative aspect-square w-[260px] cursor-grab select-none overflow-hidden rounded-2xl border border-white/15 bg-black/60 shadow-2xl active:cursor-grabbing sm:w-[300px]"
                style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
              >
                {/* The art / waveform */}
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  className="object-contain p-6 opacity-90 mix-blend-luminosity transition-opacity group-active:opacity-100"
                  sizes="(max-width: 640px) 260px, 300px"
                />

                {/* Sleeve treatment + grain */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_0.6px,transparent_0.6px)] bg-[length:3px_3px]" />

                {/* Active release label on the sleeve */}
                <div className="absolute bottom-4 left-4 right-4 rounded-md bg-black/60 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/90 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <span>{current.title}</span>
                    <span className="text-primary">{current.type}</span>
                  </div>
                  {current.plays && (
                    <div className="mt-0.5 text-[9px] text-white/50">
                      {current.plays.toLocaleString()} plays
                    </div>
                  )}
                </div>

                {/* Subtle ring */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
              </motion.div>
            </div>

            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground lg:text-right">
              drag the sleeve anywhere
            </p>
          </div>
        </div>

        {/* Footer line for the section */}
        <div className="mt-12 text-center">
          <a
            href={SPOTIFY_ARTIST}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 font-mono text-xs uppercase tracking-[0.25em] text-foreground/80 transition hover:border-primary hover:text-primary"
          >
            full catalog on Spotify →
          </a>
        </div>
      </div>
    </section>
  );
}
