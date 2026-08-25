"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import VerticalCutReveal from "@/components/ui/vertical-cut-reveal";
import { BRAND_ASSETS, PROJECTS, WORKS_INTRO, type Project } from "@/lib/content";

/* Compact shuffle deck adapted from skiper-ui Skiper16 (StickyCard_001):
 * one uniform charcoal plate per project; each card pins and scales back
 * as the next shuffles on top, so the deck stays tight instead of a
 * long run of full-screen sections. Defaults to the index PROJECTS deck;
 * pass props to reuse the same card config elsewhere (e.g. /docs). */

function ExhibitCard({
  project,
  i,
  total,
  progress,
}: {
  project: Project;
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const targetScale = Math.max(0.86, 1 - (total - i - 1) * 0.018);
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);

  return (
    <div
      id={`exh-${String(i + 1).padStart(3, "0")}`}
      className="sticky top-0 flex h-svh items-center justify-center px-3 sm:px-6"
    >
      <motion.article
        style={{ scale }}
        className="print-panel relative grid h-[min(640px,80svh)] w-full max-w-5xl origin-top grid-rows-[auto_1fr] overflow-hidden border border-paper/20 bg-[#191816] text-paper shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
      >
        <div className="flex min-w-0 items-center justify-between gap-4 border-b border-paper/20 bg-ink/40 px-4 py-2.5 sm:px-6">
          <span className="shrink-0 font-advancedled text-[11px] uppercase tracking-[0.3em] text-primary">
            EXH.{String(i + 1).padStart(3, "0")}
          </span>
          <span className="min-w-0 truncate font-mono text-[9px] uppercase tracking-[0.2em] text-paper/60">
            {project.year}
          </span>
          <span className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.25em] text-paper/50 sm:block">
            nottyler.org
          </span>
        </div>

        <div className="grid min-h-0 min-w-0 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.82fr)]">
          <div className="flex min-h-0 min-w-0 flex-col justify-between gap-4 overflow-y-auto p-5 sm:p-7">
            <div className="min-w-0">
              <h3 className="min-w-0 break-words font-ndot text-[clamp(2rem,4.3vw,3.6rem)] uppercase leading-[0.85] tracking-[-0.03em] text-paper">
                {project.company}
              </h3>
              <p className="mt-3 max-w-xl break-words font-mono text-xs uppercase leading-snug tracking-[0.08em] text-primary sm:text-sm">
                {project.title}
              </p>
            </div>
            <div className="min-w-0 space-y-3">
              <p className="break-words text-[10px] font-bold uppercase tracking-[0.2em] text-paper/70">
                {project.position}
              </p>
              <p className="max-w-xl text-sm leading-relaxed text-paper/90 sm:text-[15px]">
                {project.answer}
              </p>
              <Link
                href={project.projectLink}
                target={project.external ? "_blank" : undefined}
                rel={project.external ? "noopener noreferrer" : undefined}
                className="inline-flex w-fit items-center gap-2 bg-primary px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:bg-paper hover:text-ink"
              >
                {project.buttonText}
                <svg
                  className="size-3"
                  fill="none"
                  viewBox="0 0 10 10"
                  aria-hidden="true"
                >
                  <path
                    d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div className="relative hidden min-h-0 border-l border-paper/15 bg-ink/50 lg:block">
            <Image
              src={project.imgSrc}
              alt={project.company}
              fill
              sizes="(max-width: 1024px) 0px, 42vw"
              unoptimized
              className="object-contain p-5"
            />
          </div>
          <div className="relative order-first h-44 border-b border-paper/15 bg-ink/50 sm:h-56 lg:hidden">
            <Image
              src={project.imgSrc}
              alt={project.company}
              fill
              sizes="100vw"
              unoptimized
              className="object-contain p-3"
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function Exhibits({
  projects = PROJECTS,
  heading = WORKS_INTRO.heading,
  bio = WORKS_INTRO.bio,
  countNoun = "works",
}: {
  projects?: Project[];
  heading?: string;
  bio?: string;
  countNoun?: string;
} = {}) {
  const total = projects.length;
  const deckRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: deckRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="exhibits" className="brand-ink relative overflow-x-clip text-foreground">
      <Image
        src={BRAND_ASSETS.collages[0]}
        alt=""
        width={1200}
        height={675}
        aria-hidden
        className="pointer-events-none absolute right-[-8%] top-10 hidden w-[46vw] max-w-3xl opacity-[0.14] grayscale invert lg:block"
      />
      <span className="red-sun left-[-8rem] top-32 h-72 opacity-70" />
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-6 pt-24 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="relative z-10 min-w-0 break-words font-ndot text-6xl uppercase leading-[0.8] tracking-[-0.04em] text-paper sm:text-8xl">
          <VerticalCutReveal
            splitBy="characters"
            staggerDuration={0.02}
            staggerFrom="first"
            transition={{ type: "spring", stiffness: 200, damping: 21 }}
          >
            {heading}
          </VerticalCutReveal>
        </h2>
        <div className="max-w-sm space-y-3">
          <div className="h-[5px] w-full bg-primary" />
          <p className="font-mono text-xs leading-relaxed text-foreground/80">
            {bio}
          </p>
          <p className="brand-label text-primary">
            {String(total).padStart(3, "0")} {countNoun}
          </p>
        </div>
      </div>

      <div ref={deckRef} className="relative pb-16">
        {projects.map((project, i) => (
          <ExhibitCard
            key={`${project.company}-${i}`}
            project={project}
            i={i}
            total={total}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
