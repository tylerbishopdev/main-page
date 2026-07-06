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
import { PROJECTS, WORKS_INTRO, type Project } from "@/lib/content";

/* Scroll-driven exhibit deck adapted from skiper-ui Skiper16 (StickyCard_001):
 * every project is a sticky full-height "museum placard" that scales back as
 * the next one stacks on top. */

const total = PROJECTS.length;

function ExhibitCard({
  project,
  i,
  progress,
}: {
  project: Project;
  i: number;
  progress: MotionValue<number>;
}) {
  const targetScale = Math.max(0.72, 1 - (total - i - 1) * 0.035);
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);

  const isRed = i % 5 === 2;
  const isFinal = i === total - 1;

  const surface = isFinal
    ? "bg-card text-foreground"
    : isRed
      ? "bg-primary text-ink"
      : "bg-paper text-ink";

  const chipStyle = isFinal
    ? "border-foreground/25 text-muted-foreground"
    : isRed
      ? "border-ink/30 text-ink/70"
      : "border-ink/25 text-ink/60";

  const ctaStyle = isRed
    ? "bg-ink text-paper hover:bg-ink/85"
    : "bg-primary text-primary-foreground hover:bg-primary/85";

  /* treated backdrop so square screenshots sit uncropped in the frame */
  const frameStyle = isFinal
    ? "bg-paper/5 ring-paper/15"
    : isRed
      ? "bg-ink/10 ring-ink/25"
      : "bg-ink/5 ring-ink/15";

  return (
    <div
      id={`exh-${String(i + 1).padStart(3, "0")}`}
      className="sticky top-0 flex h-svh items-center justify-center px-3 sm:px-6"
    >
      <motion.article
        style={{ scale }}
        className={`relative flex max-h-[88svh] w-full max-w-6xl origin-top flex-col overflow-hidden rounded-3xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.55)] ${surface}`}
      >
        <div className="flex items-center justify-between gap-4 border-b border-current/15 px-5 py-3 sm:px-8">
          <span className="font-advancedled text-[11px] uppercase tracking-[0.3em] opacity-80">
            EXH.{String(i + 1).padStart(3, "0")} / {String(total).padStart(3, "0")}
          </span>
          <span
            className={`hidden rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] sm:block ${chipStyle}`}
          >
            {project.year}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-60">
            nottyler.org
          </span>
        </div>

        <div className="grid min-h-0 flex-1 gap-5 overflow-hidden p-5 sm:p-7 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          <div className="flex min-h-0 flex-col justify-between gap-4 overflow-y-auto">
            <div>
              <h3 className="font-ndot text-4xl uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
                {project.company}
              </h3>
              <p className="mt-3 font-mono text-sm uppercase tracking-tight opacity-80 sm:text-base">
                {project.title}
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] opacity-60">
                {project.position}
              </p>
              <p className="max-w-md text-sm leading-relaxed opacity-90 sm:text-[15px]">
                {project.answer}
              </p>
              <Link
                href={project.projectLink}
                target={project.external ? "_blank" : undefined}
                rel={project.external ? "noopener noreferrer" : undefined}
                className={`mb-1 inline-flex w-fit items-center gap-2 rounded-full px-6 py-2.5 font-mono text-xs uppercase tracking-[0.15em] transition-colors ${ctaStyle}`}
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

          {/* square-friendly frame: object-contain so nothing is cropped */}
          <div className="hidden min-h-0 items-center justify-center lg:flex">
            <div
              className={`relative aspect-square max-h-full w-full max-w-[460px] overflow-hidden rounded-2xl ring-1 ring-inset ${frameStyle}`}
            >
              <Image
                src={project.imgSrc}
                alt={project.company}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-contain p-3"
              />
            </div>
          </div>
          <div className="flex justify-center lg:hidden">
            <div
              className={`relative aspect-square max-h-56 w-full max-w-56 overflow-hidden rounded-2xl ring-1 ring-inset ${frameStyle}`}
            >
              <Image
                src={project.imgSrc}
                alt={project.company}
                fill
                sizes="60vw"
                className="object-contain p-2"
              />
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function Exhibits() {
  const deckRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: deckRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="exhibits" className="relative">
      <div
        ref={introRef}
        className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-10 pt-28 sm:px-6 lg:flex-row lg:items-end lg:justify-between"
      >
        <h2 className="font-ndot text-6xl uppercase leading-[0.9] tracking-tight text-foreground sm:text-8xl">
          <VerticalCutReveal
            splitBy="characters"
            staggerDuration={0.02}
            staggerFrom="first"
            transition={{ type: "spring", stiffness: 200, damping: 21 }}
          >
            {WORKS_INTRO.heading}
          </VerticalCutReveal>
        </h2>
        <div className="max-w-sm space-y-3">
          <div className="rule-dotted h-[2px] w-full text-primary" />
          <p className="font-mono text-xs leading-relaxed text-foreground/70">
            {WORKS_INTRO.bio}
          </p>
          <p className="font-advancedled text-[10px] uppercase tracking-[0.3em] text-primary">
            {String(total).padStart(3, "0")} works
          </p>
        </div>
      </div>

      <div ref={deckRef} className="relative">
        {PROJECTS.map((project, i) => (
          <ExhibitCard
            key={project.company}
            project={project}
            i={i}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
