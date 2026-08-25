"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ALBUM } from "@/lib/content";

/* Gatefold for the current record: sleeve on the right (the poster page),
 * liner notes on the left (the official playlist, each cut to its video). */
export default function NotMusik({ showHeading = true }: { showHeading?: boolean }) {
  const [active, setActive] = useState(0);
  const current = ALBUM.tracks[active];

  return (
    <section
      id="not-musik"
      className="brand-ink relative w-full overflow-hidden border-y-[10px] border-primary py-16 text-paper"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {showHeading && (
          <>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div className="min-w-0">
                <p className="brand-label text-primary">on the press</p>
                <h2 className="mt-2 font-ndot text-5xl uppercase leading-[0.82] tracking-[-0.06em] sm:text-7xl">
                  {ALBUM.title}
                  <span className="mt-2 block font-mono text-sm font-normal normal-case tracking-[0.18em] text-paper/70 sm:text-base">
                    {ALBUM.byline}
                  </span>
                </h2>
              </div>
              <p className="hidden max-w-[16rem] text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.22em] text-paper/60 sm:block">
                fourteen cuts
                <br />
                watch the video · join the waitlist
              </p>
            </div>
            <div className="mb-8 h-[6px] w-full bg-primary" />
          </>
        )}

        <div className="relative grid items-start gap-8 lg:grid-cols-12">
          <ol className="divide-y divide-paper/15 border-y border-paper/15 lg:col-span-7">
            {ALBUM.tracks.map((track, i) => {
              const isActive = i === active;
              return (
                <li key={track.href}>
                  <a
                    href={track.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={`group flex items-baseline gap-3 px-2 py-3.5 transition-colors sm:gap-5 sm:py-4 ${
                      isActive
                        ? "bg-paper text-ink"
                        : "hover:bg-paper/10"
                    }`}
                  >
                    <span
                      className={`w-7 shrink-0 font-mono text-[10px] uppercase tracking-[0.25em] ${
                        isActive ? "text-primary" : "text-paper/55"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block font-ndot text-xl uppercase leading-none tracking-[-0.03em] sm:text-2xl ${
                          isActive ? "text-ink" : "text-paper"
                        }`}
                      >
                        {track.title}
                      </span>
                      <span
                        className={`mt-1 block font-mono text-[10px] uppercase tracking-[0.12em] ${
                          isActive ? "text-ink/60" : "text-paper/55"
                        }`}
                      >
                        {track.note}
                      </span>
                    </span>
                    <span
                      className={`hidden shrink-0 font-mono text-[10px] tracking-[0.18em] sm:block ${
                        isActive ? "text-ink/55" : "text-paper/45"
                      }`}
                    >
                      {track.duration}
                    </span>
                    <span
                      className={`hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] sm:block ${
                        isActive ? "text-primary" : "text-primary/70"
                      }`}
                    >
                      Watch →
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-8">
              <Link
                href={`/${ALBUM.slug}`}
                className="print-panel paper-texture relative mx-auto block aspect-square w-full max-w-[360px] overflow-hidden border-2 border-paper shadow-[16px_16px_0_var(--primary)] lg:ml-auto lg:mr-0"
              >
                <Image
                  src={ALBUM.cover}
                  alt={`${ALBUM.title} album artwork`}
                  fill
                  sizes="(max-width: 1024px) 360px, 420px"
                  className="object-cover"
                  priority={showHeading}
                />
                <span className="absolute inset-x-0 bottom-0 bg-ink/80 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-paper">
                  {current.title}
                  <span className="mt-1 block text-primary">Open the poster →</span>
                </span>
              </Link>
              <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-paper/65 lg:text-right">
                jacket links to the vinyl waitlist
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={`/${ALBUM.slug}`}
            className="inline-flex items-center gap-2 border-2 border-primary bg-primary px-5 py-2.5 font-mono text-xs uppercase tracking-[0.22em] text-paper transition hover:bg-paper hover:text-ink"
          >
            Vinyl waitlist →
          </Link>
          <a
            href={ALBUM.videoChannelHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-paper/30 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.22em] text-paper/85 transition hover:border-primary hover:text-primary"
          >
            videos.nottyler.org →
          </a>
        </div>
      </div>
    </section>
  );
}
