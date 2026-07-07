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
  const flip = i % 2 === 1;

  const surface = isFinal
    ? "brand-ink text-foreground"
    : isRed
      ? "bg-primary text-paper"
      : "paper-texture text-ink";

  const chipStyle = isFinal
    ? "border-foreground/25 text-muted-foreground"
    : isRed
      ? "border-paper/60 text-paper"
      : "border-ink/25 text-ink/70";

  /* red-on-primary text needs near-full opacity to stay legible */
  const dimStrong = isRed ? "opacity-100" : "opacity-80";
  const dimSoft = isRed ? "opacity-90" : "opacity-70";
  const dimBody = isRed ? "opacity-100" : "opacity-90";

  const ctaStyle = isRed
    ? "bg-paper text-ink hover:bg-paper/85"
    : "bg-primary text-paper hover:bg-ink";

  /* treated backdrop so square screenshots sit uncropped in the frame */
  const frameStyle = isFinal
    ? "bg-paper/5 ring-paper/20"
    : isRed
      ? "bg-ink/20 ring-paper/30"
      : "bg-ink/90 ring-ink/25";

  const mediaOrder = flip ? "lg:order-2" : "lg:order-1";
  const copyOrder = flip ? "lg:order-1" : "lg:order-2";

  return (
    <div
      id={`exh-${String(i + 1).padStart(3, "0")}`}
      className="sticky top-0 flex h-svh items-center justify-center px-3 sm:px-6"
    >
      <motion.article
        style={{ scale }}
        className={`print-panel relative flex max-h-[90svh] w-full max-w-7xl origin-top flex-col overflow-hidden border-2 shadow-[18px_18px_0_rgba(17,18,17,0.16),28px_28px_0_rgba(216,58,46,0.42)] ${surface}`}
      >
        <div className="flex items-center justify-between gap-4 border-b-2 border-current/35 px-4 py-3 sm:px-7">
          <span className={`font-advancedled text-[11px] uppercase tracking-[0.3em] ${dimStrong}`}>
            EXH.{String(i + 1).padStart(3, "0")} / {String(total).padStart(3, "0")}
          </span>
          <span
            className={`hidden rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] sm:block ${chipStyle}`}
          >
            {project.year}
          </span>
          <span className={`font-mono text-[10px] uppercase tracking-[0.25em] ${dimSoft}`}>
            nottyler.org
          </span>
        </div>

        <div className="grid min-h-0 flex-1 overflow-hidden lg:grid-cols-[minmax(360px,1.08fr)_minmax(0,0.92fr)]">
          <div className={`relative min-h-[230px] overflow-hidden border-current/20 ${mediaOrder} ${flip ? "lg:border-l-2" : "lg:border-r-2"}`}>
            <div className={`absolute inset-4 ring-1 ring-inset ${frameStyle}`} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(216,58,46,0.22),transparent_32%),repeating-linear-gradient(90deg,currentColor_0_1px,transparent_1px_42px)] opacity-[0.13]" />
            <span
              aria-hidden
              className={`absolute -left-5 top-3 z-10 font-ndot text-[8rem] uppercase leading-none tracking-[-0.08em] mix-blend-difference ${dimSoft} sm:text-[11rem]`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <Image
              src={project.imgSrc}
              alt={project.company}
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="relative z-20 object-contain p-5 grayscale-[0.02] contrast-[1.08] drop-shadow-[0_18px_28px_rgba(0,0,0,0.26)] sm:p-7"
            />
            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between gap-4">
              <span
                aria-hidden
                className={`brand-label ${isRed ? "bg-paper text-ink" : isFinal ? "bg-paper text-ink" : "bg-ink text-paper"}`}
              >
                asset view
              </span>
              <span
                aria-hidden
                className={`hidden max-w-44 text-right font-mono text-[9px] uppercase leading-snug tracking-[0.2em] ${dimSoft} sm:block`}
              >
                screenshot preserved, no crop
              </span>
            </div>
          </div>

          <div className={`flex min-h-0 flex-col justify-between gap-6 overflow-y-auto p-5 sm:p-8 lg:p-10 ${copyOrder}`}>
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className={`brand-label ${isRed ? "text-paper" : "text-primary"}`}>
                  project dossier
                </span>
                <span className={`brand-label ${chipStyle}`}>
                  {project.year}
                </span>
              </div>
              <h3 className="font-ndot text-[clamp(3.2rem,9vw,7.8rem)] uppercase leading-[0.72] tracking-[-0.06em]">
                {project.company}
              </h3>
              <p className={`mt-5 max-w-2xl font-mono text-sm uppercase leading-snug tracking-[0.08em] sm:text-base ${dimStrong}`}>
                {project.title}
              </p>
            </div>
            <div className="space-y-4">
              <p className={`text-[11px] font-bold uppercase tracking-[0.22em] ${dimSoft}`}>
                {project.position}
              </p>
              <p className={`max-w-2xl text-base leading-relaxed sm:text-lg ${dimBody}`}>
                {project.answer}
              </p>
              <Link
                href={project.projectLink}
                target={project.external ? "_blank" : undefined}
                rel={project.external ? "noopener noreferrer" : undefined}
                className={`mb-1 inline-flex w-fit items-center gap-2 border-2 border-current px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] transition-colors ${ctaStyle}`}
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
    <section id="exhibits" className="paper-texture relative overflow-hidden text-ink">
      <Image
        src={BRAND_ASSETS.collages[0]}
        alt=""
        width={1200}
        height={675}
        aria-hidden
        className="pointer-events-none absolute right-[-8%] top-10 hidden w-[48vw] max-w-3xl opacity-20 mix-blend-multiply grayscale lg:block"
      />
      <span className="red-sun left-[-8rem] top-32 h-80 opacity-90" />
      <div
        ref={introRef}
        className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-10 pt-28 sm:px-6 lg:flex-row lg:items-end lg:justify-between"
      >
        <h2 className="relative z-10 font-ndot text-7xl uppercase leading-[0.78] tracking-[-0.05em] text-ink sm:text-9xl">
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
          <div className="h-[6px] w-full bg-primary" />
          <p className="font-mono text-xs leading-relaxed text-ink/75">
            {WORKS_INTRO.bio}
          </p>
          <p className="brand-label text-primary">
            {String(total).padStart(3, "0")} works
          </p>
        </div>
      </div>

      <div ref={deckRef} className="relative">
        {PROJECTS.map((project, i) => (
          <ExhibitCard
            key={`${project.company}-${i}`}
            project={project}
            i={i}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
