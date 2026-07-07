"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import { BRAND_ASSETS, DESTINATIONS, IDENTITY } from "@/lib/content";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const backX = useTransform(mx, [-1, 1], ["-3%", "3%"]);
  const backY = useTransform(my, [-1, 1], ["-3%", "3%"]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const drift = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  const [hovered, setHovered] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { width, height } = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX / width - 0.5) * 2);
    my.set((e.clientY / height - 0.5) * 2);
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="brand-paper relative flex min-h-svh flex-col overflow-hidden border-b-[10px] border-ink text-ink"
    >
      <motion.div aria-hidden style={{ opacity: fade }} className="absolute inset-0">
        <motion.div
          style={{
            x: backX,
            y: backY,
            backgroundImage: `url(${BRAND_ASSETS.hero.backdrop})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-[-3%] opacity-[0.2] mix-blend-multiply grayscale"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(238,227,205,0.96)_0%,rgba(238,227,205,0.9)_48%,rgba(17,18,17,0.62)_78%,rgba(216,58,46,0.82)_100%)]" />
        <div className="absolute inset-y-0 right-0 hidden w-[42%] bg-primary/90 mix-blend-multiply md:block" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-paper via-paper/70 to-transparent" />
        <div className="brand-checker absolute bottom-6 right-6 hidden h-36 w-36 sm:block" />
        <span className="red-sun right-[15%] top-[16%] hidden h-[22vw] max-h-72 min-h-36 opacity-75 md:block" />
      </motion.div>

      <motion.div
        style={{ y: drift, opacity: fade }}
        className="relative z-10 grid flex-1 gap-8 px-4 pb-10 pt-24 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.72fr)] lg:items-center lg:pt-28"
      >
        <div className="mx-auto flex w-full max-w-5xl flex-col justify-center lg:mx-0">
          <div className="mb-5 flex max-w-xl flex-wrap gap-2">
            <span className="brand-label bg-paper/85 text-ink">we exist outside the ordinary</span>
            <span className="brand-label bg-primary text-paper">catalog: nt-69-a</span>
            <span className="brand-label hidden bg-paper/85 text-ink sm:inline-flex">global observatory program</span>
          </div>

          <div className="relative border-l-[10px] border-primary bg-paper/88 p-4 shadow-[14px_14px_0_rgba(17,18,17,0.12)] backdrop-blur-[2px] sm:p-6">
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-[repeating-linear-gradient(0deg,rgba(216,58,46,0.12)_0_2px,transparent_2px_8px)] sm:block" />
            <div className="brand-microcopy mb-6 flex max-w-xl flex-wrap gap-x-8 gap-y-2 text-ink/78">
            <span>we exist outside the ordinary</span>
            <span>catalog: nt-69-a</span>
            <span>global observatory program</span>
            </div>

            <div className="relative max-w-[880px]">
            <Image
              src={BRAND_ASSETS.logo.red}
              alt="notTyler"
              width={425}
              height={119}
              priority
              className="h-auto w-full max-w-[min(760px,calc(100vw-3rem))]"
            />
              <div className="mt-4 h-3 w-44 bg-primary sm:w-72" />
            </div>

            <p className="mt-7 max-w-2xl whitespace-pre-line text-balance bg-paper/75 py-1 font-mono text-[15px] leading-relaxed text-ink sm:text-base">
            {IDENTITY.description}
            </p>
          </div>

          <nav className="mt-10 w-full max-w-3xl">
            <ul className="grid border-y-2 border-ink sm:grid-cols-2">
              {DESTINATIONS.map((item, index) => (
                <li
                  key={item.name}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  className="border-b border-ink/25 odd:sm:border-r even:sm:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
                >
                  <Link
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="group grid min-h-24 grid-cols-[auto_1fr] gap-x-4 gap-y-2 bg-paper/82 px-4 py-4 transition-colors hover:bg-primary hover:text-paper sm:min-h-28"
                  >
                    <span className="font-advancedled text-[10px] text-primary transition-colors group-hover:text-paper/80">
                        0{index + 1}
                      </span>
                    <span className="font-ndot text-[clamp(2.1rem,6vw,3.25rem)] uppercase leading-[0.78] tracking-[-0.04em]">
                        {item.name}
                    </span>
                    <span
                      className={`col-span-2 border-t border-ink/15 pt-2 text-left font-mono text-[9px] uppercase leading-snug tracking-[0.22em] transition-all duration-300 ${
                        hovered === index
                          ? "translate-x-0 opacity-100"
                          : "translate-x-0 opacity-85"
                      }`}
                    >
                      {item.note}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
        </nav>
        </div>

        <div className="relative mx-auto hidden w-full max-w-[440px] self-end lg:block">
          <div className="print-panel relative overflow-hidden bg-paper/70 p-4">
            <Image
              src={BRAND_ASSETS.hero.figure}
              alt="notTyler helmet figure"
              width={355}
              height={599}
              priority
              className="relative z-10 h-auto w-full"
            />
            <div className="brand-microcopy absolute left-5 top-5 z-20 max-w-[180px] text-ink/70">
              not tyler. not normal. not tomorrow.
            </div>
            <div className="absolute bottom-5 left-5 z-20 rounded-full border-2 border-paper bg-ink px-3 py-1 font-ndot text-3xl text-paper">
              69
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
