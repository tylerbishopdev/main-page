"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import { Link001 } from "@/components/ui/skiper-ui/skiper40";
import { CONTACT } from "@/lib/content";

/* Sticky shrink-and-blur intro adapted from skiper-ui Skiper44
 * (ScrollAnimation_006). All copy is the original site's contact content. */
export default function ContactScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: containerProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(containerProgress, [0.2, 1], [1, 0.5]);
  const blur = useTransform(containerProgress, [0.2, 0.8], [0, 18]);
  const scaleDiv = useTransform(containerProgress, [0, 0.3], [0.97, 1]);

  return (
    <div className="flex w-full flex-col items-center overflow-x-clip pt-[38vh] font-mono">
      <motion.div
        style={{ scale }}
        className="sticky top-[12%] flex gap-3 pb-10 text-3xl tracking-tighter sm:gap-4 md:text-6xl"
      >
        <div className="sticky top-[50%] h-fit">
          <h1 className="font-ndot text-5xl uppercase leading-none text-primary md:text-8xl">
            {CONTACT.heading}
          </h1>
        </div>
        <div className="h-fit space-y-3 pt-1 text-foreground/85">
          {CONTACT.truths.map((line) => (
            <h2 key={line} className="leading-none">
              {line}
            </h2>
          ))}
        </div>
        <motion.div
          style={{ backdropFilter: useMotionTemplate`blur(${blur}px)` }}
          className="absolute inset-0"
        />
      </motion.div>

      <motion.div
        ref={containerRef}
        style={{ scale: scaleDiv }}
        className="z-20 mt-[16vh] flex w-full flex-col items-center space-y-12 rounded-t-[3rem] bg-primary px-4 py-[16vh] text-ink"
      >
        <p className="font-advancedled text-[11px] uppercase tracking-[0.4em] text-ink/70">
          {CONTACT.artistInfoLabel}
        </p>
        <ul className="flex w-full max-w-2xl flex-col items-center gap-5 text-center">
          {CONTACT.info.map((row) =>
            row.href ? (
              <li key={row.label}>
                <Link001
                  href={row.href}
                  className="font-ndot text-2xl uppercase leading-none tracking-tight text-ink transition-colors hover:text-paper sm:text-4xl"
                >
                  {row.label}
                </Link001>
              </li>
            ) : (
              <li
                key={row.label}
                className="font-ndot text-2xl uppercase leading-none tracking-tight text-ink/60 sm:text-4xl"
              >
                {row.label}
              </li>
            ),
          )}
        </ul>
        <p className="max-w-md text-center font-mono text-xs uppercase tracking-[0.25em] text-ink/60">
          responses not guaranteed. genius is busy.
        </p>
      </motion.div>
    </div>
  );
}
