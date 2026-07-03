"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

import { TextRoll } from "@/components/ui/skiper-ui/skiper58";
import { DESTINATIONS, IDENTITY } from "@/lib/content";

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
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      {/* mouse-parallax backdrop, masked by the original site's clip art */}
      <motion.div
        aria-hidden
        style={{ opacity: fade }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-[-6%]"
          style={{
            maskImage: "url(/mainclip.png)",
            maskSize: "contain",
            maskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskImage: "url(/mainclip.png)",
            WebkitMaskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
          }}
        >
          <motion.div
            style={{
              x: backX,
              y: backY,
              backgroundImage: "url(/mainback.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="absolute inset-[-4%] opacity-25 saturate-[0.85]"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-background/70 via-transparent to-background" />
      </motion.div>

      <motion.div
        style={{ y: drift, opacity: fade }}
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-10 pt-24"
      >
        <p className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.45em] text-primary sm:text-xs">
          <span className="inline-block h-px w-10 bg-primary/60" />
          a prestigious organization
          <span className="inline-block h-px w-10 bg-primary/60" />
        </p>

        <h1 className="text-center font-ndot uppercase leading-[0.82] tracking-tight">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ delay: 2.35, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
              className="block text-[20vw] text-foreground/90 sm:text-[16vw] lg:text-[12.5vw]"
            >
              NOT
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ delay: 2.5, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
              className="block text-[20vw] text-primary sm:text-[16vw] lg:text-[12.5vw]"
            >
              TYLER
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.9, duration: 0.7 }}
          className="mt-6 max-w-xl text-balance text-center font-mono text-xs leading-relaxed text-foreground/70 sm:text-sm"
        >
          {IDENTITY.description}
        </motion.p>

        {/* destinations — hover reveals each destination's note */}
        <motion.nav
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.1, duration: 0.7 }}
          className="mt-8 w-full max-w-3xl"
        >
          <ul className="flex flex-col divide-y divide-foreground/10 border-y border-foreground/10">
            {DESTINATIONS.map((item, index) => (
              <li
                key={item.name}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                <Link
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="group flex items-baseline justify-between gap-4 px-2 py-3 transition-colors hover:text-primary sm:px-4"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-advancedled text-[10px] text-primary/70">
                      0{index + 1}
                    </span>
                    <TextRoll className="font-ndot text-3xl uppercase leading-none sm:text-4xl">
                      {item.name}
                    </TextRoll>
                  </span>
                  <span
                    className={`hidden text-right font-mono text-[10px] uppercase tracking-[0.25em] transition-all duration-300 sm:block ${
                      hovered === index
                        ? "translate-x-0 text-primary opacity-100"
                        : "translate-x-3 text-muted-foreground opacity-40"
                    }`}
                  >
                    {item.note}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.4 }}
        className="relative z-10 flex items-center justify-center gap-3 pb-8 font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground"
      >
        <span className="led-flicker text-primary">●</span>
        scroll for the collection
      </motion.div>
    </section>
  );
}
