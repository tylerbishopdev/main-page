"use client";

/**
 * UNCIVIL WAR® presentation layer — projectile tracers, impact flashes,
 * shockwaves, KO debris, and the signature-move cut-in cinematic.
 * Everything is DOM + framer-motion in brand colors; zero assets.
 */

import { motion } from "framer-motion";

import type { Doctrine } from "@/lib/state-wars";

export type FxSide = "player" | "enemy";

export type FxEvent =
  | { id: number; type: "tracer"; from: FxSide; doctrine: Doctrine; heavy: boolean }
  | { id: number; type: "pierce"; from: FxSide }
  | { id: number; type: "impact"; side: FxSide; crit: boolean }
  | { id: number; type: "debris"; side: FxSide };

export const DOCTRINE_PAYLOAD: Record<Doctrine, string> = {
  FORCE: "▲",
  CLIMATE: "❆",
  COMMERCE: "$",
  PSYOPS: "◎",
};

/* ------------------------------------------------------------------ */
/*  Arena-level effects (rendered in a layer over the fighter grid)    */
/* ------------------------------------------------------------------ */

function Tracer({
  from,
  doctrine,
  heavy,
  onDone,
}: {
  from: FxSide;
  doctrine: Doctrine;
  heavy: boolean;
  onDone: () => void;
}) {
  const ltr = from === "player";
  return (
    <motion.div
      initial={{ left: ltr ? "18%" : "82%", opacity: 0, scale: heavy ? 1.1 : 0.8 }}
      animate={{ left: ltr ? "82%" : "18%", opacity: [0, 1, 1, 1], scale: heavy ? 1.35 : 1 }}
      transition={{ duration: heavy ? 0.34 : 0.22, ease: [0.3, 0, 0.8, 1] }}
      onAnimationComplete={onDone}
      className="pointer-events-none absolute top-[38%] z-30 -translate-x-1/2 -translate-y-1/2"
    >
      <span
        className={`block leading-none text-primary ${heavy ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl"}`}
        style={{
          textShadow: "0 0 14px rgba(216,58,46,0.9)",
          transform: ltr ? undefined : "scaleX(-1)",
        }}
      >
        {DOCTRINE_PAYLOAD[doctrine]}
      </span>
      {/* motion streak */}
      <span
        aria-hidden
        className={`absolute top-1/2 h-px -translate-y-1/2 bg-gradient-to-r ${
          ltr
            ? "right-full from-transparent to-primary"
            : "left-full from-primary to-transparent"
        } ${heavy ? "w-24" : "w-14"}`}
      />
    </motion.div>
  );
}

function PierceLine({ from, onDone }: { from: FxSide; onDone: () => void }) {
  const ltr = from === "player";
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 1 }}
      animate={{ scaleX: 1, opacity: [1, 1, 0] }}
      transition={{ duration: 0.28, ease: "easeIn" }}
      onAnimationComplete={onDone}
      style={{ transformOrigin: ltr ? "left center" : "right center" }}
      className="pointer-events-none absolute inset-x-[6%] top-[38%] z-30 h-[2px] bg-primary shadow-[0_0_16px_rgba(216,58,46,0.9)]"
    />
  );
}

export function ArenaFxLayer({
  events,
  onDone,
}: {
  events: FxEvent[];
  onDone: (id: number) => void;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      {events.map((e) => {
        if (e.type === "tracer")
          return (
            <Tracer
              key={e.id}
              from={e.from}
              doctrine={e.doctrine}
              heavy={e.heavy}
              onDone={() => onDone(e.id)}
            />
          );
        if (e.type === "pierce")
          return <PierceLine key={e.id} from={e.from} onDone={() => onDone(e.id)} />;
        return null;
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Card-level effects (rendered inside a fighter card)                */
/* ------------------------------------------------------------------ */

export function ImpactFlash({
  crit,
  onDone,
}: {
  crit: boolean;
  onDone: () => void;
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, crit ? 0.85 : 0.55, 0] }}
        transition={{ duration: crit ? 0.4 : 0.26, times: [0, 0.2, 1] }}
        className={`pointer-events-none absolute inset-0 z-20 ${crit ? "bg-primary" : "bg-paper"}`}
      />
      <motion.div
        initial={{ scale: 0.2, opacity: 0.9 }}
        animate={{ scale: crit ? 2.6 : 1.8, opacity: 0 }}
        transition={{ duration: crit ? 0.5 : 0.36, ease: "easeOut" }}
        onAnimationComplete={onDone}
        className={`pointer-events-none absolute left-1/2 top-[38%] z-20 aspect-square w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${
          crit ? "border-primary" : "border-paper/70"
        }`}
      />
    </>
  );
}

/** Deterministic pseudo-random from an id — keeps renders stable. */
const jitter = (id: number, spread: number, salt = 0) =>
  (((id * 2654435761 + salt * 97) >>> 8) % (spread * 2)) - spread;

export function Debris({ side, onDone }: { side: FxSide; onDone: () => void }) {
  const pieces = Array.from({ length: 18 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-visible">
      {pieces.map((i) => {
        const dx = jitter(i + 3, 130, 1);
        const rot = jitter(i + 7, 200, 2);
        const dur = 0.7 + (Math.abs(jitter(i, 40, 3)) / 100);
        const isRed = i % 3 === 0;
        return (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{
              x: dx,
              y: 160 + Math.abs(jitter(i, 60, 4)),
              opacity: [1, 1, 0],
              rotate: rot,
            }}
            transition={{ duration: dur, ease: [0.15, 0.6, 0.5, 1] }}
            onAnimationComplete={i === 0 ? onDone : undefined}
            className={`absolute left-1/2 top-[40%] block ${
              isRed ? "bg-primary" : "bg-paper/80"
            } ${i % 2 === 0 ? "h-2 w-3" : "h-3 w-1.5"}`}
            style={{ marginLeft: jitter(i, 40, 5) }}
          />
        );
      })}
      {/* side is part of the event shape for future directional debris */}
      <span className="hidden">{side}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Signature cut-in cinematic (letterboxed, fighting-game style)      */
/* ------------------------------------------------------------------ */

export function SpecialCutIn({
  abbr,
  stateName,
  moveName,
  side,
}: {
  abbr: string;
  stateName: string;
  moveName: string;
  side: FxSide;
}) {
  const ltr = side === "player";
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.18 } }}
      className="absolute inset-0 z-50 overflow-hidden bg-background/92"
    >
      {/* letterbox bars */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        style={{ transformOrigin: "top" }}
        className="absolute inset-x-0 top-0 h-[14%] bg-ink"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        style={{ transformOrigin: "bottom" }}
        className="absolute inset-x-0 bottom-0 h-[14%] bg-ink"
      />
      {/* diagonal red slash */}
      <motion.div
        initial={{ x: ltr ? "-130%" : "130%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 0.26, ease: [0.2, 0.9, 0.3, 1] }}
        className="absolute inset-y-[14%] left-1/2 w-[160%] -translate-x-1/2 bg-primary/15"
        style={{ clipPath: "polygon(12% 0, 100% 0, 88% 100%, 0 100%)" }}
      />
      {/* giant abbr sliding in */}
      <motion.span
        initial={{ x: ltr ? -260 : 260, opacity: 0 }}
        animate={{ x: 0, opacity: 0.24 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`absolute top-1/2 -translate-y-1/2 font-ndot text-[11rem] leading-none text-paper sm:text-[15rem] ${
          ltr ? "left-[4%]" : "right-[4%]"
        }`}
      >
        {abbr}
      </motion.span>
      {/* the announcement */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.2 }}
          className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary"
        >
          Signature doctrine · {stateName}
        </motion.p>
        <motion.h3
          initial={{ scale: 1.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.24, type: "spring", stiffness: 320, damping: 20 }}
          className="font-marlboro text-4xl uppercase leading-[0.95] text-paper sm:text-6xl"
        >
          {moveName}
        </motion.h3>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.34, duration: 0.28 }}
          className="h-[3px] w-40 bg-primary sm:w-64"
        />
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Lower-third — field developments, broadcast style                  */
/* ------------------------------------------------------------------ */

export function LowerThird({ headline }: { headline: string }) {
  return (
    <motion.div
      initial={{ y: 56, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 56, opacity: 0 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex items-stretch border-t-2 border-primary bg-ink/95"
    >
      <span className="flex items-center bg-primary px-3 py-2 font-mono text-[9px] uppercase tracking-[0.3em] text-primary-foreground">
        Wire
      </span>
      <div className="flex min-w-0 flex-1 items-center px-3">
        <motion.p
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}
          className="truncate font-mono text-[10px] uppercase tracking-[0.14em] text-paper sm:text-[11px]"
        >
          {headline}
        </motion.p>
      </div>
      <span className="hidden items-center px-3 font-mono text-[9px] uppercase tracking-[0.25em] text-primary sm:flex">
        Field development
      </span>
    </motion.div>
  );
}
