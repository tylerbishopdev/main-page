"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import { IDENTITY } from "@/lib/content";

/* Entry curtain adapted from skiper-ui Skiper7 (Preloader_001). */
export default function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = show ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [show]);

  const words = IDENTITY.preloader.split(" ");

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.785, 0.135, 0.15, 0.86] }}
          className="fixed inset-0 z-[99] flex flex-col items-center justify-center overflow-hidden bg-background"
        >
          <Image
            src="/shiba.png"
            alt=""
            width={700}
            height={700}
            priority
            className="pointer-events-none absolute w-3/4 max-w-[640px] opacity-15 hue-rotate-15"
          />
          <h1 className="relative z-10 flex flex-col items-center font-ndot uppercase leading-[0.95] tracking-tight text-primary">
            {words.map((word, i) => (
              <span key={word} className="overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    delay: 0.15 + i * 0.14,
                    duration: 0.7,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className="block text-6xl sm:text-8xl lg:text-9xl"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
          <div className="absolute bottom-10 left-1/2 w-56 -translate-x-1/2">
            <div className="h-px w-full bg-foreground/15" />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.1, ease: "easeInOut" }}
              className="-mt-px h-px w-full origin-left bg-primary"
            />
            <p className="led-flicker mt-3 text-center font-advancedled text-xs uppercase tracking-[0.4em] text-primary">
              nottyler.org
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
