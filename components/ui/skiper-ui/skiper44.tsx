"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useRef } from "react";

const Skiper44 = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: containerProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(containerProgress, [0.2, 1], [1, 0.5]);
  const blur = useTransform(containerProgress, [0.2, 0.8], [0, 20]);
  const scaleDiv = useTransform(containerProgress, [0, 0.3], [0.98, 1]);

  return (
    <div className="font-mono flex w-screen flex-col items-center overflow-x-clip  pt-[44vh] ">
      <motion.div
        style={{
          scale: scale,
        }}
        className="sticky top-[10%] flex gap-2 pb-10 text-2xl  tracking-tighter md:text-6xl"
      >
        <div className="sticky top-[50%] h-fit">
          <h1 className="lg:text-6xl text-primary">not</h1>
          <div className="absolute left-full top-0 z-10 h-[40vh] w-screen -translate-y-full " />
          <div className="absolute bottom-0 left-full z-10 h-[44vh] w-screen translate-y-full" />
        </div>
        <div className="h-fit space-y-2">
          <h2 className="">Tyler is...</h2>
          <h2 className="">all hype</h2>
          <h2 className="">saving music</h2>
          <h2 className="">the godfather of soul</h2>
          <h2 className="">easy to contact</h2>
          <h2 className="">interested in disucssing</h2>
          <h2 className="">...</h2>
        </div>
        <motion.div
          style={{
            backdropFilter: useMotionTemplate`blur(${blur}px)`,
          }}
          className="absolute inset-0"
        />
      </motion.div>
      <motion.div
        ref={containerRef}
        style={{
          scale: scaleDiv,
        }}
        className="rounded-4xl z-20 mt-[20vh] flex w-full flex-col items-center space-y-10 bg-primary py-[20vh] font-medium tracking-tight text-background"
      >
        <div className="grid w-full max-w-xl grid-cols-2 gap-5">
          <p className="text-right text-background/70 font-mono font-bold text-2xl">Artist info:</p>
          <ul>
            {Names.slice(0, 7).map((name) => (
              <li className="text-background/70 font-mono font-bold text-lg" key={name}>{name}</li>

            ))}
          </ul>
        </div>

      </motion.div>
    </div>
  );
};

export { Skiper44 };

const Names = [
  "not Tyler",
  "mail: not@nottyler.org",
  "@tylerbishopbjj on Instagram",
  "@tylerbishop on X",
  "tylerbishopdev on Github",
  "real name: Tyler Bishop",
  "plz dont email me"


];

/**
 * Skiper 44 ScrollAnimation_006 — React + framer motion
 * Inspired by and adapted from https://nextjs.org/
 * Inspired by and adapted from https://devouringdetails.com/
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 * These animations aren’t associated with the nextjs.org . They’re independent recreations meant to study interaction design
 * These animations aren’t associated with the devouringdetails.com . They’re independent recreations meant to study interaction design
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */
