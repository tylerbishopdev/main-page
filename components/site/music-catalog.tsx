"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { MUSIC } from "@/lib/content";

/* The music catalog — copy verbatim from the original works list. */
export default function MusicCatalog() {
  return (
    <section id="music" className="w-full bg-paper py-24 text-ink">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-ndot text-6xl uppercase leading-none tracking-tight sm:text-8xl">
              {MUSIC.heading}
            </h2>
          </div>
          <span className="rounded-full border border-ink/25 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60">
            {MUSIC.year}
          </span>
        </div>

        <div className="rule-dotted mt-8 h-[2px] w-full text-primary" />

        {/* the record */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-14"
        >
          <div className="mx-auto w-full max-w-[420px]">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-ink/5 ring-1 ring-inset ring-ink/15">
              <Image
                src={MUSIC.imgSrc}
                alt={MUSIC.position}
                fill
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-contain p-3"
              />
            </div>
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-ink/65">
              {MUSIC.position}
            </p>
          </div>

          <div className="flex flex-col justify-center gap-5">
            <h3 className="font-mono text-2xl uppercase leading-snug tracking-tight sm:text-3xl">
              {MUSIC.title}
            </h3>
            <p className="max-w-lg text-sm leading-relaxed text-ink/80 sm:text-base">
              {MUSIC.answer}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={MUSIC.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-7 py-3 font-mono text-xs uppercase tracking-[0.15em] text-primary-foreground transition-colors hover:bg-primary/85"
              >
                {MUSIC.buttonText}
                <svg className="size-3" fill="none" viewBox="0 0 10 10" aria-hidden="true">
                  <path
                    d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link
                href={MUSIC.catalogHref}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-ink/30 px-7 py-3 font-mono text-xs uppercase tracking-[0.15em] text-ink transition-colors hover:border-primary hover:text-primary"
              >
                {MUSIC.catalogLabel} →
              </Link>
            </div>
          </div>
        </motion.div>

        {/* the songwriting tool that belongs to the catalog */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="mt-14 grid items-center gap-6 rounded-2xl border border-ink/15 p-5 sm:p-7 lg:grid-cols-[160px_1fr_auto]"
        >
          <div className="relative mx-auto aspect-square w-32 overflow-hidden rounded-xl bg-ink/5 ring-1 ring-inset ring-ink/15 sm:w-40">
            <Image
              src={MUSIC.companion.imgSrc}
              alt={MUSIC.companion.position}
              fill
              sizes="160px"
              className="object-contain p-2"
            />
          </div>
          <div className="space-y-2 text-center lg:text-left">
            <p className="font-advancedled text-[10px] uppercase tracking-[0.3em] text-primary">
              {MUSIC.companion.company} — {MUSIC.companion.year}
            </p>
            <h4 className="font-mono text-lg uppercase leading-snug tracking-tight">
              {MUSIC.companion.title}
            </h4>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-ink/75 lg:mx-0">
              {MUSIC.companion.answer}
            </p>
          </div>
          <Link
            href={MUSIC.companion.projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-ink/30 px-6 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-ink transition-colors hover:border-primary hover:text-primary"
          >
            {MUSIC.companion.buttonText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
