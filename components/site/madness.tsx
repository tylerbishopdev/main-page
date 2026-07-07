"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import { WORKS_INTRO } from "@/lib/content";

/* Perspective text crawl adapted from skiper-ui Skiper28 (PerspectiveTextScroll). */
export default function Madness() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const yMotionValue = useTransform(scrollYProgress, [0, 1], [420, -40]);
  const transform = useMotionTemplate`rotateX(28deg) translateY(${yMotionValue}px) translateZ(12px)`;

  return (
    <div
      ref={targetRef}
      className="relative z-0 h-[220vh] w-full bg-primary text-ink"
    >
      <div
        className="sticky top-0 mx-auto flex h-svh items-center justify-center overflow-hidden py-20"
        style={{ transformStyle: "preserve-3d", perspective: "230px" }}
      >
        <motion.blockquote
          style={{ transformStyle: "preserve-3d", transform }}
          className="w-full max-w-3xl px-6 text-center font-ndot text-4xl uppercase leading-[1.05] tracking-tight sm:text-6xl"
        >
          {WORKS_INTRO.madnessQuote.map((line, i) => (
            <span key={i} className={i % 2 === 1 ? "block text-paper" : "block"}>
              {line}
            </span>
          ))}
          <span className="mt-10 block font-mono text-xs normal-case tracking-[0.3em] opacity-90">
            — not Tyler
          </span>
        </motion.blockquote>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[30vh] bg-linear-to-b from-transparent to-primary" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[16vh] bg-linear-to-t from-transparent to-primary" />
      </div>
    </div>
  );
}
