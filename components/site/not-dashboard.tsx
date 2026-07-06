"use client";

import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  AI_INVESTMENT_DATA,
  ART_IMAGES,
  CORRELATION_DATA,
  CURRENCY_DATA,
  WUT,
} from "@/lib/content";

type TabId = (typeof WUT.tabs)[number]["id"];

export default function NotDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("maybeTrue");
  const active = WUT.tabs.find((t) => t.id === activeTab) ?? WUT.tabs[0];

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-8 px-4 pb-24 pt-44 sm:px-6 lg:flex-row">
      {/* sidebar */}
      <aside className="lg:w-64 lg:shrink-0">
        <div className="mb-8 space-y-1">
          <span className="led-flicker font-advancedled text-[10px] uppercase tracking-[0.3em] text-primary">
            {WUT.status}
          </span>
          <h1 className="font-ndot text-4xl uppercase leading-none tracking-tight text-foreground">
            {WUT.dashboardName}
          </h1>
        </div>
        <nav className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
          {WUT.tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-foreground/15 bg-transparent text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                <span className="block font-ndot text-sm uppercase tracking-wide">
                  {tab.label}
                </span>
                <span
                  className={`mt-1 block font-mono text-[9px] uppercase tracking-[0.15em] ${
                    isActive ? "text-primary-foreground/70" : "opacity-60"
                  }`}
                >
                  {tab.description}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* main pane */}
      <main className="min-w-0 flex-1">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-foreground/10 pb-5">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
              current view
            </span>
            <h2 className="mt-1 font-ndot text-3xl uppercase tracking-tight text-primary">
              {active.label}
            </h2>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {active.description}
          </span>
        </div>

        {activeTab === "maybeTrue" && <KindaFacts />}
        {activeTab === "notArt" && <MostlyArts />}
        {activeTab === "notOriginals" && <Placeholder />}
      </main>
    </div>
  );
}

/* ---------------------------------------------------------------- */

function StatPanel({
  title,
  sub,
  children,
  footnote,
}: {
  title: string;
  sub: string;
  children: React.ReactNode;
  footnote?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-card p-6"
    >
      <div>
        <h3 className="font-ndot text-lg uppercase tracking-wider text-primary">
          {title}
        </h3>
        <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted-foreground">
          {sub}
        </p>
      </div>
      <div className="flex-1">{children}</div>
      {footnote && (
        <p className="font-mono text-[10px] italic text-muted-foreground/70">
          {footnote}
        </p>
      )}
    </motion.div>
  );
}

/* Big animated readouts use NumberFlow, the pattern from skiper-ui Skiper37. */
function BigNumber({
  value,
  suffix,
  className = "text-primary",
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(0);
  return (
    <motion.span
      onViewportEnter={() => setDisplay(value)}
      onViewportLeave={() => setDisplay(0)}
      className={`font-advancedled text-6xl leading-none ${className}`}
    >
      <NumberFlow value={display} suffix={suffix} />
    </motion.span>
  );
}

function KindaFacts() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <StatPanel
          title="Will AI Kill Us All?"
          sub="Tyler's 10 year probability of AI destroying us all"
          footnote="Updated Mar. 9, 2026"
        >
          <div className="flex h-full flex-col justify-end gap-5">
            <div className="flex items-end justify-between">
              <div>
                <BigNumber value={80} suffix="%" />
                <div className="mt-2 font-ndot text-xs uppercase text-primary">
                  yes
                </div>
              </div>
              <div className="text-right">
                <BigNumber value={20} suffix="%" className="text-secondary" />
                <div className="mt-2 font-ndot text-xs uppercase text-secondary">
                  no
                </div>
              </div>
            </div>
            <div className="h-6 overflow-hidden rounded-sm bg-secondary/40">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "80%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-primary"
              />
            </div>
          </div>
        </StatPanel>

        <StatPanel
          title="Prison Industrial Complex"
          sub="Capacity guaranteed to private prisons: Avg. US State"
        >
          <div className="flex h-full flex-col justify-end gap-5">
            <div className="h-4 overflow-hidden rounded-sm bg-secondary/40">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "97%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="h-full bg-primary/80"
              />
            </div>
            <BigNumber value={97} suffix="%" className="text-primary text-8xl" />
          </div>
        </StatPanel>

        <StatPanel
          title="Currency in Circulation"
          sub="U.S. currency in circulation (trillions). Source: Federal Reserve"
        >
          <div className="h-[140px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CURRENCY_DATA}>
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 9, fill: "#948a7e" }}
                  stroke="#2c2825"
                />
                <YAxis tick={{ fontSize: 9, fill: "#948a7e" }} stroke="#2c2825" />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#ff4438"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 space-y-1 font-mono text-[11px]">
            <div className="flex items-center justify-between">
              <span>1971: Nixon ends gold standard</span>
              <span className="font-advancedled text-primary">$1.2T</span>
            </div>
            <div className="flex items-center justify-between">
              <span>2020: COVID go brrr</span>
              <span className="font-advancedled text-primary">$22T</span>
            </div>
          </div>
        </StatPanel>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <StatPanel
          title="DVD Sales Drop Causing Autism"
          sub="Exposed: the undeniable correlation between declining DVD sales and rising autism diagnoses."
        >
          <div className="h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CORRELATION_DATA}>
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 9, fill: "#948a7e" }}
                  stroke="#2c2825"
                />
                <YAxis tick={{ fontSize: 9, fill: "#948a7e" }} stroke="#2c2825" />
                <Line
                  type="monotone"
                  dataKey="autismRate"
                  stroke="#ffd0c8"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="dvdSales"
                  stroke="#ff4438"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex flex-wrap justify-between gap-2 font-mono text-[10px]">
            <span className="flex items-center gap-2">
              <span className="size-2 bg-primary" /> DVD Sales % of Media
              Purchases
            </span>
            <span className="flex items-center gap-2">
              <span className="size-2 bg-accent" /> Autism Diagnoses per 10k
            </span>
          </div>
        </StatPanel>

        <StatPanel
          title="Instead of Fixing Healthcare"
          sub="Capital invested in top AI startups (billions USD). Source: CB Insights"
          footnote="Total: $24.7B invested in making robots instead"
        >
          <div className="space-y-2.5">
            {AI_INVESTMENT_DATA.map((item, i) => (
              <div key={item.company} className="space-y-1">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="font-ndot uppercase">{item.company}</span>
                  <span className="font-advancedled text-primary">
                    ${item.invested}B
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-sm bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${(item.invested / 14) * 100}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: i * 0.08 }}
                    className="h-full bg-primary/80"
                  />
                </div>
              </div>
            ))}
          </div>
        </StatPanel>
      </div>
    </div>
  );
}

/* The artwork IS the point: one large uncropped stage (object-contain),
 * arrow / keyboard navigation, a thumbnail rail, and a true fullscreen view. */
function MostlyArts() {
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const total = ART_IMAGES.length;

  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + total) % total),
    [total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Escape") setFullscreen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  useEffect(() => {
    document.documentElement.style.overflow = fullscreen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [fullscreen]);

  const src = ART_IMAGES[index];

  return (
    <div className="space-y-5">
      {/* stage */}
      <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-[#0a0909]">
        <div className="relative h-[52svh] w-full md:h-[64svh]">
          <AnimatePresence mode="wait">
            <motion.button
              key={src}
              type="button"
              onClick={() => setFullscreen(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 cursor-zoom-in"
              aria-label="View artwork fullscreen"
            >
              <Image
                src={src}
                alt={`Artwork ${index + 1} of ${total}`}
                fill
                sizes="(max-width: 1024px) 100vw, 80vw"
                className="object-contain p-4 md:p-6"
                priority
              />
            </motion.button>
          </AnimatePresence>
        </div>

        {/* chrome */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span className="font-advancedled text-xs uppercase tracking-[0.25em] text-primary">
            № {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <span className="hidden font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground sm:block">
            click to enlarge — ← → to browse
          </span>
        </div>
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous artwork"
          className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/15 bg-background/70 text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next artwork"
          className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/15 bg-background/70 text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
        >
          →
        </button>
      </div>

      {/* thumbnail rail */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {ART_IMAGES.map((thumb, i) => (
          <button
            key={thumb}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show artwork ${i + 1}`}
            className={`relative size-16 shrink-0 overflow-hidden rounded-lg transition-all sm:size-20 ${
              i === index
                ? "ring-2 ring-primary"
                : "opacity-50 ring-1 ring-foreground/10 hover:opacity-90"
            }`}
          >
            <Image
              src={thumb}
              alt=""
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* fullscreen view */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setFullscreen(false)}
            className="fixed inset-0 z-[96] flex items-center justify-center bg-black/95 p-4 sm:p-10"
          >
            <Image
              src={src}
              alt={`Artwork ${index + 1} of ${total}`}
              fill
              sizes="100vw"
              className="object-contain p-4 sm:p-10"
            />
            <button
              type="button"
              onClick={() => setFullscreen(false)}
              aria-label="Close fullscreen"
              className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full border border-foreground/20 bg-background/60 font-mono text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
            >
              ✕
            </button>
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-advancedled text-xs uppercase tracking-[0.3em] text-primary">
              № {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Placeholder() {
  return (
    <div className="flex min-h-[440px] items-center justify-center">
      <div className="max-w-md space-y-3 rounded-2xl border border-primary/30 bg-primary/10 p-10 text-center">
        <span className="font-ndot text-3xl uppercase text-primary">
          {WUT.placeholder.heading}
        </span>
        <p className="font-mono text-sm text-foreground/60">
          {WUT.placeholder.body}
        </p>
      </div>
    </div>
  );
}
