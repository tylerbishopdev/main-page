"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import Link from "next/link";

const Skiper7 = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="h-full w-screen bg-background">
      <AnimatePresence mode="popLayout">
        {showPreloader ? (
          <motion.div
            key="preloader"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: [0.785, 0.135, 0.15, 0.86] }}
          >
            <Preloader_001 />
          </motion.div>
        ) : (
          <motion.div className="size-full" key="main">
            <Main />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export { Skiper7 };

const Main = () => {
  const list = [
    {
      name: "Projects",
      value: "/#my-works",
      date: "unbridled creative genius",
    },
    {
      name: "Channel",
      value: "https://videos.nottyler.org",
      date: "videos and music",
    },
    {

      name: "Contact",
      value: "/contact",
      date: "I'd rather you dont",
    },

  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const isMobile = useIsMobile();

  return (

    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden font-advancedled text-primary">
      <motion.ul
        layout
        className="mt-0 z-10 flex w-full flex-col items-center justify-center gap-5"
      >
        {list.map((item, index) => (
          <motion.li
            initial={{ y: 350, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              height:
                hoveredIndex === index
                  ? !isMobile
                    ? 120
                    : 60
                  : !isMobile
                    ? 83
                    : 40,
            }}
            transition={{
              duration: 0.7,
              ease: [0.215, 0.61, 0.355, 1],
              delay: index * 0.035 + 0.5,

              height: {
                duration: 0.15,
                ease: "easeOut",
              },
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative my-2 flex cursor-pointer flex-col items-center "
            key={index}
          >
            <div className="relative flex items-center justify-center gap-5">
              <Link href={item.value} className="hover:underline">
                <span className="text-[7vw]  font-advancedled font-semibold text-primary/80 hover:text-accent uppercase text-center leading-[0.8] tracking-[-0.03em] hover:no-underline">
                  {item.name}
                </span>
              </Link>
            </div>

            <AnimatePresence mode="popLayout">
              {hoveredIndex === index && (
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="whitespace-nowrap text-[2vw] font-bold uppercase leading-[0.9] tracking-[-0.06em]"
                >
                  {item.date}
                </motion.h2>
              )}
            </AnimatePresence>
          </motion.li>
        ))}
        <motion.li
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.6 }}
          className="font-inter mt-10 font-black uppercase leading-[0.8] tracking-[-0.03em] text-muted-foreground lg:text-sm"
        >
          © Copright nottyler.org 2025
        </motion.li>
      </motion.ul>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
        className=" w-full h-full fixed "
      >
        <Image
          src="/mainback.png"
          alt=""
          width={1200}
          height={1200}
          className=" w-full h-auto opacity-30 mask-b-from-background mask-t-to-primary"
        />
      </motion.div>
    </div>
  );
};

const Preloader_001 = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-linear-to-b from-black  to-zinc-950">
      <div className="z-50 flex max-w-4xl flex-col items-center justify-center gap-10">
        <h1 className="text-center font-mono text-muted/40  uppercase leading-[0.8] ">
          not TYLER ©2025
        </h1>
        <div className="h-2 flex w-full items-center justify-between">


        </div>
        <h1 className="text-center text-[3vw] font-lcd  uppercase leading-[2] tracking-[-0.06em] text-primary">
          absurdly
          <br /> creative vision
        </h1>
      </div>
      <div className="absolute inset-0 z-20">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          playsInline
        >
          <source src="/skiperv1/skiper7/nike.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

/**
 * Skiper 7 Preloader_001 — React + Framer Motion
 * Inspired by and adapted from https://afterdarktour.nike.com/en/home
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 * Illustrations by https://afterdarktour.nike.com/en/home
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 * - Cannot use original Nike illustrations or videos for commercial purposes.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */
