"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { IDENTITY, PROJECTS } from "@/lib/content";

/* The header brand. Swap the mark by setting IDENTITY.logoSrc in
 * lib/content.ts to an image path in /public — nothing else to touch. */
function BrandMark() {
  return (
    <Link
      href="/"
      aria-label="NotTyler home"
      className="pointer-events-auto group flex items-center gap-2 px-2 py-1 transition-transform hover:-translate-y-0.5"
    >
      {IDENTITY.logoSrc ? (
        <Image
          src={IDENTITY.logoSrc}
          alt="NotTyler"
          width={170}
          height={48}
          className="h-8 w-auto drop-shadow-[0_2px_14px_rgba(9,9,9,0.55)] transition-opacity group-hover:opacity-90 sm:h-9"
          priority
        />
      ) : (
        <span className="font-ndot text-xl uppercase leading-none tracking-tight text-primary transition-colors group-hover:text-foreground sm:text-2xl">
          not&nbsp;tyler<span className="text-primary">®</span>
        </span>
      )}
    </Link>
  );
}

function Clock() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setNow(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="led-flicker font-advancedled text-xs tracking-[0.2em] text-primary">
      {now ?? "--:--:--"}
    </span>
  );
}

/* Collection directory drawer: instead of repeating the page's own links,
 * the menu is an exhibit INDEX — jump straight to any of the 15 works —
 * plus a live clock and quick routes to the sub-pages. */
export default function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const lenis = useLenis();

  /* Lenis owns the scroll, so hash hrefs alone won't move the page while
   * we're already on "/" — drive the jump through lenis explicitly. */
  const jumpTo = (hash: string) => (e: React.MouseEvent) => {
    setIsOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      // wait a tick so the drawer's overflow lock is released first
      setTimeout(() => {
        if (lenis) {
          lenis.scrollTo(hash, { offset: -96 });
        } else {
          document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
        }
      }, 60);
    }
  };

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
          <BrandMark />
          <button
            type="button"
            onClick={() => setIsOpen((o) => !o)}
            className="group flex items-center gap-3 rounded-full bg-ink/60 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-paper backdrop-blur-sm transition-colors hover:bg-primary hover:text-paper"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60 group-hover:bg-paper" />
              <span className="relative inline-flex size-2 rounded-full bg-primary group-hover:bg-paper" />
            </span>
            {isOpen ? "Close" : "Index"}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close index"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[70] cursor-default bg-background/70 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "105%" }}
              animate={{ x: 0 }}
              exit={{ x: "105%" }}
              transition={{ duration: 0.45, ease: [0.785, 0.135, 0.15, 0.86] }}
              className="paper-texture fixed bottom-0 right-0 top-0 z-[75] flex w-full max-w-md flex-col border-l-[10px] border-ink p-6 pt-24 text-ink shadow-[-28px_0_0_rgba(216,58,46,0.7)] sm:p-8 sm:pt-24"
            >
              <div className="flex items-center justify-between border-b-2 border-ink pb-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-ink/60">
                    the collection
                  </p>
                  <h2 className="mt-1 font-ndot text-3xl uppercase leading-none text-ink">
                    Directory
                  </h2>
                </div>
                <div className="text-right">
                  <Clock />
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-ink/55">
                    status: brilliant
                  </p>
                </div>
              </div>

              <nav className="-mr-2 flex-1 overflow-y-auto py-4 pr-2">
                <ul>
                  {PROJECTS.map((project, i) => (
                    <motion.li
                      key={`${project.company}-${i}`}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.12 + i * 0.02, duration: 0.3 }}
                    >
                      <Link
                        href={`/#exh-${String(i + 1).padStart(3, "0")}`}
                        onClick={jumpTo(`#exh-${String(i + 1).padStart(3, "0")}`)}
                        className="group flex items-baseline gap-3 border-b border-ink/15 py-2 transition-colors hover:text-primary"
                      >
                        <span className="font-advancedled text-[10px] text-primary/60 transition-colors group-hover:text-primary">
                          {String(i + 1).padStart(3, "0")}
                        </span>
                        <span className="flex-1 truncate font-ndot text-lg uppercase leading-tight tracking-tight">
                          {project.company}
                        </span>
                        <span className="hidden max-w-[38%] truncate text-right font-mono text-[9px] uppercase tracking-[0.1em] text-ink/55 sm:block">
                          {project.year}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + PROJECTS.length * 0.02 }}
                  >
                    <Link
                      href="/#music"
                      onClick={jumpTo("#music")}
                      className="group flex items-baseline gap-3 py-2 transition-colors hover:text-primary"
                    >
                      <span className="font-advancedled text-[10px] text-primary/60">
                        LP
                      </span>
                      <span className="flex-1 font-ndot text-lg uppercase leading-tight tracking-tight">
                        The music catalog
                      </span>
                      <span className="hidden text-right font-mono text-[9px] uppercase tracking-[0.1em] text-ink/55 sm:block">
                        audio project
                      </span>
                    </Link>
                  </motion.li>
                </ul>
              </nav>

              <div className="space-y-4 border-t-2 border-ink pt-4">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.25em]">
                  <Link
                    href="https://videos.nottyler.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink/70 transition-colors hover:text-primary"
                  >
                    Channel ↗
                  </Link>
                  <Link
                    href="/music"
                    className="text-ink/70 transition-colors hover:text-primary"
                  >
                    Music
                  </Link>
                  <Link
                    href="/not"
                    className="text-ink/70 transition-colors hover:text-primary"
                  >
                    Wut?
                  </Link>
                  <Link
                    href="/contact"
                    className="text-ink/70 transition-colors hover:text-primary"
                  >
                    Contact
                  </Link>
                  <Link
                    href="/docs"
                    className="text-ink/70 transition-colors hover:text-primary"
                  >
                    Docs
                  </Link>
                </div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/60">
                  {IDENTITY.copyrightShort}
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
