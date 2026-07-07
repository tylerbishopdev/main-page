"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BRAND_ASSETS, NOT_MUSIK_RELEASES, type MusikRelease } from "@/lib/content";

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
      className="brand-ink relative w-full overflow-hidden border-y-[10px] border-primary py-16 text-paper"
    >
      {/* Dynamic color wash that follows the active release */}
      <div
        className="pointer-events-none absolute inset-0 transition-colors duration-500"
        style={{ backgroundColor: current.bgColor, opacity: 0.09 }}
      />
      <Image
        src={BRAND_ASSETS.collages[5]}
        alt=""
        width={1024}
        height={576}
        aria-hidden
        className="pointer-events-none absolute -right-20 top-10 hidden w-[44vw] max-w-3xl opacity-[0.12] mix-blend-screen grayscale lg:block"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {showHeading && (
          <>
            {/* Heading exactly as requested */}
            <div className="mb-8 flex items-baseline justify-between gap-4">
              <h2 className="font-ndot text-6xl uppercase leading-[0.82] tracking-[-0.06em] sm:text-8xl">
                not Tyler: <span className="text-primary">notMusik</span>
              </h2>
              <div className="hidden text-right font-mono text-[10px] uppercase tracking-[0.3em] text-paper/60 sm:block">
                broadcast archive<br />drag the sleeve
              </div>
            </div>

            <div className="mb-6 h-[6px] w-full bg-primary" />
          </>
        )}

        {/* The interactive archive */}
        <div className="relative grid gap-8 lg:grid-cols-12">
          {/* Scrollable list of releases (unique catalog order) */}
          <div className="lg:col-span-7">
            <div className="flex flex-col divide-y divide-paper/15 border-y border-paper/15">
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
                    className={`group flex items-center gap-4 px-2 py-5 transition-all sm:gap-6 sm:py-6 ${isActive ? "bg-paper text-ink opacity-100" : "opacity-70 hover:bg-paper/10 hover:opacity-100"}`}
                  >
                    <span className={`w-9 shrink-0 font-mono text-[10px] uppercase tracking-[0.25em] ${isActive ? "text-primary" : "text-paper/45"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-ndot text-2xl uppercase tracking-[-0.5px] transition-colors sm:text-3xl ${isActive ? "text-ink" : "text-paper/90 group-hover:text-paper"}`}
                        >
                          {release.title}
                        </span>
                        <span className={`border px-2.5 py-px font-mono text-[9px] uppercase tracking-[0.2em] ${isActive ? "border-ink/25 text-ink/65" : "border-paper/20 text-paper/55"}`}>
                          {release.type}
                        </span>
                      </div>
                      <p className={`mt-0.5 font-mono text-xs ${isActive ? "text-ink/60" : "text-paper/55"}`}>
                        {release.description}
                        {release.plays ? ` • ${release.plays.toLocaleString()} plays` : ""}
                      </p>
                    </div>

                    <div className={`hidden text-xs font-mono uppercase tracking-[0.2em] sm:block ${isActive ? "text-primary" : "text-primary/70"}`}>
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
                className="print-panel paper-texture group relative aspect-square w-[260px] cursor-grab select-none overflow-hidden border-2 border-paper shadow-[16px_16px_0_var(--primary)] active:cursor-grabbing sm:w-[300px]"
              >
                {/* The art / waveform */}
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  className="object-contain p-7 opacity-90 mix-blend-multiply transition-opacity group-active:opacity-100"
                  sizes="(max-width: 640px) 260px, 300px"
                />

                {/* Sleeve treatment + grain */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_0.6px,transparent_0.6px)] bg-[length:3px_3px]" />

                {/* Active release label on the sleeve */}
                <div className="absolute bottom-4 left-4 right-4 border-2 border-ink bg-paper/90 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-ink">
                  <div className="flex items-center justify-between">
                    <span>{current.title}</span>
                    <span className="text-primary">{current.type}</span>
                  </div>
                  {current.plays && (
                    <div className="mt-0.5 text-[9px] text-ink/55">
                      {current.plays.toLocaleString()} plays
                    </div>
                  )}
                </div>

                {/* Subtle ring */}
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/15" />
              </motion.div>
            </div>

            <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-paper/55 lg:text-right">
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
            className="inline-flex items-center gap-2 border-2 border-paper/30 px-5 py-2 font-mono text-xs uppercase tracking-[0.25em] text-paper/80 transition hover:border-primary hover:bg-primary hover:text-paper"
          >
            full catalog on Spotify →
          </a>
        </div>
      </div>
    </section>
  );
}
