"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { TextRoll } from "@/components/ui/skiper-ui/skiper58";
import { DESTINATIONS, IDENTITY } from "@/lib/content";

/* Full-screen panel menu adapted from skiper-ui Skiper13 (Navbar_001),
 * with skiper58 TextRoll hover on every item. */
export default function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[80] px-4 pt-4 sm:px-6">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between">
          <Link href="/" aria-label="NotTyler home" className="pointer-events-auto">
            <Image
              src="/logo12.png"
              alt="NotTyler"
              width={110}
              height={110}
              className="h-auto w-[84px] opacity-80 transition-opacity hover:opacity-100 sm:w-[110px]"
              priority
            />
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen((o) => !o)}
            className="group flex items-center gap-3 rounded-full border border-foreground/20 bg-background/60 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-foreground backdrop-blur-md transition-colors hover:border-primary hover:text-primary"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.785, 0.135, 0.15, 0.86] }}
            className="fixed inset-0 z-[70] flex flex-col bg-background/95 p-4 backdrop-blur-xl sm:p-6"
          >
            <div className="h-20" />
            <nav className="flex flex-1 flex-col items-center justify-center gap-6">
              {DESTINATIONS.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.25 + index * 0.06,
                    duration: 0.6,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className="group flex flex-col items-center"
                >
                  <Link
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="text-foreground transition-colors hover:text-primary"
                  >
                    <TextRoll
                      center
                      className="font-ndot text-6xl uppercase leading-[0.9] tracking-tight sm:text-8xl"
                    >
                      {item.name}
                    </TextRoll>
                  </Link>
                  <span className="mt-2 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:text-primary group-hover:opacity-100">
                    {item.note}
                  </span>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-between border-t border-foreground/10 pt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground"
            >
              <span>{IDENTITY.copyrightShort}</span>
              <Link
                href="https://videos.nottyler.org"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                <Image
                  src="/ovlogo.png"
                  alt="Open.Video"
                  width={110}
                  height={110}
                  className="h-auto w-[90px] opacity-60"
                />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
