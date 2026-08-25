"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { ADVOCATE } from "@/lib/content";

/* Sticky poster theater: the red wordmark plate stays put while the
 * personas climb into it, then the office diptych lands as the credit
 * roll. One argument, two pictures — not three equal role cards. */
export default function Advocate() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const plateY = useTransform(scrollYProgress, [0, 1], ["6%", "-10%"]);
  const figuresY = useTransform(scrollYProgress, [0, 1], ["22%", "-2%"]);
  const figuresScale = useTransform(scrollYProgress, [0, 1], [0.94, 1.03]);
  const copyOpacity = useTransform(scrollYProgress, [0.06, 0.22], [0, 1]);
  const copyY = useTransform(scrollYProgress, [0.06, 0.22], [28, 0]);

  return (
    <section
      id={ADVOCATE.id}
      className="adv-section relative overflow-x-clip bg-[#2b2d2a] text-paper"
    >
      <div ref={sceneRef} className="adv-scene relative">
        <div className="adv-sticky sticky top-0 h-svh overflow-hidden">
          <motion.div
            aria-hidden
            style={reduceMotion ? undefined : { y: plateY }}
            className="adv-plate absolute inset-0"
          >
            <Image
              src={ADVOCATE.plate}
              alt=""
              fill
              sizes="100vw"
              unoptimized
              priority
              className="object-contain object-top sm:object-cover sm:object-[center_12%]"
            />
          </motion.div>

          <motion.div
            style={
              reduceMotion
                ? undefined
                : { opacity: copyOpacity, y: copyY }
            }
            className="adv-copy pointer-events-none absolute inset-x-0 z-20 px-4 sm:top-[42svh] sm:px-8 lg:top-auto lg:bottom-[36%] lg:left-8 lg:right-auto lg:max-w-2xl"
          >
            <h2 className="font-ndot text-[clamp(1.7rem,5vw,3.6rem)] uppercase leading-[0.82] tracking-[-0.04em]">
              {ADVOCATE.sceneHeading}
            </h2>
            <p className="mt-4 max-w-[46ch] font-mono text-[11px] leading-relaxed tracking-[0.04em] text-paper/85 sm:text-xs">
              {ADVOCATE.sceneLede}
            </p>
          </motion.div>

          <motion.div
            aria-hidden
            style={
              reduceMotion
                ? undefined
                : { y: figuresY, scale: figuresScale }
            }
            className="adv-figures pointer-events-none absolute inset-x-[-8%] bottom-[-6%] z-10 h-[58%] sm:inset-x-[-4%] sm:h-[62%]"
          >
            <Image
              src={ADVOCATE.figures}
              alt=""
              fill
              sizes="100vw"
              unoptimized
              className="object-contain object-bottom"
            />
          </motion.div>
        </div>
      </div>

      <div className="adv-offices relative border-t-4 border-primary">
        <div className="adv-crt mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="adv-crt-set">
            <div className="adv-crt-screen">
              <Image
                src={ADVOCATE.offices}
                alt="Ezoic and Open.Video — the two rooms"
                fill
                sizes="(max-width: 1400px) 92vw, 1160px"
                unoptimized
                className="adv-crt-feed object-cover"
              />
              <span aria-hidden className="adv-crt-glitch" />
              <div className="adv-crt-copy">
                <p className="adv-crt-kicker">{ADVOCATE.kicker}</p>
                <h2 className="adv-crt-heading">{ADVOCATE.heading}</h2>
                <p className="adv-crt-lede">{ADVOCATE.lede}</p>
                <p className="adv-crt-body">{ADVOCATE.body}</p>
              </div>
            </div>
            <Image
              src={ADVOCATE.crtBezel}
              alt=""
              width={1088}
              height={608}
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="adv-crt-bezel"
            />
          </div>
        </div>

        <ol className="adv-credits mx-auto grid max-w-[1400px] grid-cols-1 border-t border-paper/15 sm:grid-cols-3">
          {ADVOCATE.credits.map((credit) => {
            const name = (
              <span className="font-ndot text-[clamp(1.4rem,2.6vw,2.1rem)] uppercase leading-none tracking-tight">
                {credit.label}
              </span>
            );

            return (
              <li
                key={credit.label}
                className="flex min-w-0 flex-col border-paper/15 px-5 py-6 sm:border-l sm:px-8 sm:first:border-l-0"
              >
                {credit.href ? (
                  <Link
                    href={credit.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-primary"
                  >
                    {name}
                  </Link>
                ) : (
                  name
                )}
                <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/55">
                  {credit.role}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
