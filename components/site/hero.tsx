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
  const backX = useTransform(mx, [-1, 1], ["-2%", "2%"]);
  const backY = useTransform(my, [-1, 1], ["-2%", "2%"]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const drift = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

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
      className="brand-ink relative flex min-h-svh flex-col overflow-hidden border-b-4 border-primary text-foreground"
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
          className="absolute inset-[-2%] opacity-[0.12] grayscale"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,9,9,0.3)_0%,rgba(9,9,9,0.6)_55%,rgba(9,9,9,0.88)_100%)]" />
        <span className="red-sun right-[12%] top-[14%] hidden h-[20vw] max-h-64 min-h-32 opacity-70 lg:block" />
        <div className="brand-checker absolute bottom-6 right-6 hidden h-32 w-32 opacity-30 invert lg:block" />
      </motion.div>

      <motion.div
        style={{ y: drift, opacity: fade }}
        className="relative z-10 grid min-w-0 flex-1 gap-10 px-4 pb-12 pt-24 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.58fr)] lg:items-center lg:px-10 lg:pt-28"
      >
        <div className="mx-auto flex w-full min-w-0 max-w-4xl flex-col justify-center lg:mx-0">
          <div className="brand-microcopy mb-7 flex flex-wrap gap-x-8 gap-y-2 text-foreground/70">
            <span>we exist outside the ordinary</span>
            <span className="text-primary">catalog: nt-69-a</span>
            <span className="hidden sm:inline">global observatory program</span>
          </div>

          <Image
            src={BRAND_ASSETS.logo.cream}
            alt="notTyler"
            width={425}
            height={119}
            priority
            className="h-auto w-full max-w-[660px]"
          />
          <div className="mt-5 h-2.5 w-40 bg-primary sm:w-64" />

          <p className="mt-7 max-w-2xl whitespace-pre-line font-mono text-sm leading-relaxed text-foreground/85 sm:text-base">
            {IDENTITY.description}
          </p>

          <nav className="mt-10 w-full max-w-3xl">
            <ul className="grid border-y-2 border-paper/30 sm:grid-cols-2">
              {DESTINATIONS.map((item, index) => (
                <li
                  key={item.name}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  className="min-w-0 border-b border-paper/15 odd:sm:border-r odd:sm:border-r-paper/15 sm:[&:nth-last-child(-n+2)]:border-b-0"
                >
                  <Link
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="group flex min-w-0 flex-col gap-2 px-4 py-4 transition-colors hover:bg-primary sm:min-h-27 sm:py-5"
                  >
                    <span className="flex min-w-0 items-baseline gap-3">
                      <span className="font-advancedled text-[10px] text-primary transition-colors group-hover:text-paper/85">
                        0{index + 1}
                      </span>
                      <span className="min-w-0 break-words font-ndot text-3xl uppercase leading-[0.85] sm:text-4xl">
                        {item.name}
                      </span>
                    </span>
                    <span
                      className={`font-mono text-[9px] uppercase leading-snug tracking-[0.2em] text-foreground/65 transition-all duration-300 group-hover:text-paper/90 ${
                        hovered === index ? "opacity-100" : "opacity-80"
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

        <div className="relative mx-auto hidden w-full max-w-[400px] lg:block">
          <div className="print-panel relative overflow-hidden bg-paper p-3">
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
            <div className="absolute bottom-5 left-5 z-20 rounded-full border-2 border-paper bg-ink px-3 py-1 font-ndot text-2xl text-paper">
              69
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
