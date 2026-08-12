"use client";

/**
 * UNCIVIL WAR® theater of operations — the battlefield is the visual.
 *
 * Two real state silhouettes face each other on a war-room board
 * (DEFCON register: vector geometry, city lights, ordnance arcs).
 * Every combat action renders as a legible military operation:
 * columns march, artillery arcs, supply lines siphon, storms sweep,
 * and territory visibly degrades — lights go out as HP falls.
 */

import { AnimatePresence, motion } from "framer-motion";

import type { Combatant } from "@/components/state-wars/engine";
import { STATE_SHAPES, type StateShape } from "@/lib/state-shapes";
import type { StatusId } from "@/lib/state-wars";

export type Side = "player" | "enemy";

export type TheaterEvent =
  | { id: number; kind: "column"; from: Side }
  | { id: number; kind: "arc"; from: Side; heavy?: boolean; intercepted?: boolean }
  | { id: number; kind: "pierce"; target: Side }
  | { id: number; kind: "drain"; from: Side }
  | { id: number; kind: "muster"; side: Side }
  | { id: number; kind: "burst"; side: Side; crit?: boolean; big?: boolean }
  | { id: number; kind: "storm"; target: Side }
  | { id: number; kind: "broadcast"; from: Side }
  | { id: number; kind: "blackout"; target: Side }
  | { id: number; kind: "shatter"; side: Side };

export type Scorch = { id: number; side: Side; dx: number; dy: number };

/* ------------------------------------------------------------------ */
/*  Stage geometry                                                     */
/* ------------------------------------------------------------------ */

const STAGE_W = 1000;
const STAGE_H = 330;
const GROUND_Y = 296;

const SLOTS: Record<Side, { x: number; y: number; w: number; h: number }> = {
  player: { x: 34, y: 46, w: 380, h: 250 },
  enemy: { x: 586, y: 46, w: 380, h: 250 },
};

type Fit = {
  s: number;
  tx: number;
  ty: number;
  cx: number;
  cy: number;
  top: number;
};

function fitShape(shape: StateShape, side: Side): Fit {
  const slot = SLOTS[side];
  const [x0, y0, x1, y1] = shape.bounds;
  const w = x1 - x0;
  const h = y1 - y0;
  const s = Math.min(slot.w / w, slot.h / h);
  const tx = slot.x + (slot.w - w * s) / 2 - x0 * s;
  const ty = slot.y + (slot.h - h * s) - y0 * s; // bottom-aligned
  return {
    s,
    tx,
    ty,
    cx: tx + ((x0 + x1) / 2) * s,
    cy: ty + ((y0 + y1) / 2) * s,
    top: ty + y0 * s,
  };
}

const jit = (id: number, spread: number, salt = 0) =>
  (((id * 2654435761 + salt * 40503) >>> 9) % (spread * 2)) - spread;

function quad(
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  apexY: number,
  n = 16,
) {
  const ctrl = { x: (p0.x + p1.x) / 2, y: apexY };
  const xs: number[] = [];
  const ys: number[] = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    xs.push((1 - t) ** 2 * p0.x + 2 * (1 - t) * t * ctrl.x + t ** 2 * p1.x);
    ys.push((1 - t) ** 2 * p0.y + 2 * (1 - t) * t * ctrl.y + t ** 2 * p1.y);
  }
  return { xs, ys, d: `M ${p0.x} ${p0.y} Q ${ctrl.x} ${ctrl.y} ${p1.x} ${p1.y}` };
}

const STATUS_TINT: Partial<Record<StatusId, string>> = {
  BURNING: "rgba(216,58,46,0.5)",
  SNOWBOUND: "rgba(238,227,205,0.4)",
  TOLLED: "rgba(216,58,46,0.28)",
  DISORIENTED: "rgba(245,220,200,0.3)",
  EXPOSED: "rgba(216,58,46,0.36)",
  BECOMING_OHIO: "rgba(216,58,46,0.6)",
};

/* ------------------------------------------------------------------ */
/*  Territory                                                          */
/* ------------------------------------------------------------------ */

function Territory({
  c,
  side,
  scorches,
}: {
  c: Combatant;
  side: Side;
  scorches: Scorch[];
}) {
  const shape = STATE_SHAPES[c.state.abbr];
  if (!shape) return null;
  const fit = fitShape(shape, side);
  const hpFrac = Math.max(0, c.hp / c.maxHp);
  const lit = Math.ceil(hpFrac * shape.cities.length);
  const paper = side === "player";
  const stroke = paper ? "var(--paper)" : "var(--primary)";
  const dead = c.hp <= 0;
  const tint = c.statuses.map((s) => STATUS_TINT[s.id]).find(Boolean);

  return (
    <g>
      {/* silhouette */}
      <g transform={`translate(${fit.tx},${fit.ty}) scale(${fit.s})`}>
        <motion.path
          d={shape.d}
          animate={{
            fillOpacity: dead ? 0.03 : 0.05 + hpFrac * 0.13,
            strokeOpacity: dead ? 0.25 : 0.9,
          }}
          transition={{ duration: 0.4 }}
          fill={stroke}
          stroke={stroke}
          strokeWidth={1.4}
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
        />
        {/* condition tint pulses over the land */}
        <AnimatePresence>
          {tint && !dead && (
            <motion.path
              key={tint}
              d={shape.d}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.15, 0.5, 0.15] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, repeat: Infinity }}
              fill={tint}
              stroke="none"
            />
          )}
        </AnimatePresence>
        {/* brace: the border hardens */}
        {c.shield < 1 && !dead && (
          <motion.path
            d={shape.d}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.1, repeat: Infinity }}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={2.6}
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
          />
        )}
        {/* city lights — they go out as the state falls */}
        {shape.cities.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={2.1 / fit.s}
            fill={i < lit && !dead ? "var(--accent)" : "transparent"}
            stroke={i < lit && !dead ? "none" : stroke}
            strokeWidth={0.7 / fit.s}
            opacity={i < lit && !dead ? 0.95 : 0.18}
            className={i < lit && !dead ? "uw-twinkle" : undefined}
            style={{ animationDelay: `${(i * 397) % 2100}ms` }}
          />
        ))}
      </g>
      {/* scorch marks persist where ordnance landed */}
      {scorches.map((sc) => (
        <g key={sc.id} transform={`translate(${fit.cx + sc.dx},${fit.cy + sc.dy})`}>
          <circle r={5} fill="rgba(9,9,9,0.85)" />
          <circle r={5} fill="none" stroke="var(--primary)" strokeOpacity={0.5} strokeWidth={0.8} />
        </g>
      ))}
      {/* placard */}
      <text
        x={fit.cx}
        y={GROUND_Y + 20}
        textAnchor="middle"
        className="uw-map-label"
        fill={stroke}
        opacity={dead ? 0.4 : 0.9}
      >
        {c.state.name.toUpperCase()}
      </text>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Operations (effects)                                               */
/* ------------------------------------------------------------------ */

function anchors(playerC: Combatant, enemyC: Combatant) {
  const p = fitShape(STATE_SHAPES[playerC.state.abbr], "player");
  const e = fitShape(STATE_SHAPES[enemyC.state.abbr], "enemy");
  return { player: p, enemy: e };
}

function Column({
  from,
  a,
  onDone,
}: {
  from: Side;
  a: Record<Side, Fit>;
  onDone: () => void;
}) {
  const src = a[from];
  const dst = a[from === "player" ? "enemy" : "player"];
  const { xs, ys } = quad(
    { x: src.cx, y: GROUND_Y - 6 },
    { x: dst.cx, y: GROUND_Y - 6 },
    GROUND_Y - 40,
    14,
  );
  const units = [0, 1, 2, 3, 4, 5, 6];
  return (
    <g>
      {units.map((i) => (
        <motion.rect
          key={i}
          width={5}
          height={3.4}
          fill={from === "player" ? "var(--paper)" : "var(--primary)"}
          initial={{ x: xs[0] - 2.5, y: ys[0] + (i % 2) * 5 - 4, opacity: 0 }}
          animate={{
            x: xs.map((v) => v - 2.5),
            y: ys.map((v) => v + (i % 2) * 5 - 4),
            opacity: [0, 1, 1, 1, 0.9],
          }}
          transition={{ duration: 0.8, delay: i * 0.055, ease: "linear" }}
          onAnimationComplete={i === units.length - 1 ? onDone : undefined}
        />
      ))}
    </g>
  );
}

function Arc({
  id,
  from,
  heavy,
  intercepted,
  a,
  onDone,
}: {
  id: number;
  from: Side;
  heavy?: boolean;
  intercepted?: boolean;
  a: Record<Side, Fit>;
  onDone: () => void;
}) {
  const src = a[from];
  const dst = a[from === "player" ? "enemy" : "player"];
  const target = intercepted
    ? { x: (src.cx + dst.cx) / 2 + jit(id, 40), y: 120 + jit(id, 30, 1) }
    : { x: dst.cx + jit(id, 60), y: dst.cy + jit(id, 26, 1) };
  const { xs, ys, d } = quad(
    { x: src.cx, y: src.top + 6 },
    target,
    Math.min(src.top, 90) - (heavy ? 62 : 40),
  );
  const dur = heavy ? 0.62 : 0.44;
  const color = from === "player" ? "var(--paper)" : "var(--primary)";
  return (
    <g>
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={heavy ? 1.6 : 1}
        strokeOpacity={0.55}
        initial={{ pathLength: 0, opacity: 1 }}
        animate={{ pathLength: 1, opacity: [1, 1, 0] }}
        transition={{ duration: dur + 0.3, times: [0, 0.7, 1], ease: "easeIn" }}
      />
      <motion.circle
        r={heavy ? 4.4 : 2.6}
        fill={color}
        style={{ filter: "drop-shadow(0 0 6px rgba(216,58,46,0.9))" }}
        initial={{ cx: xs[0], cy: ys[0] }}
        animate={{ cx: xs, cy: ys }}
        transition={{ duration: dur, ease: "easeIn" }}
        onAnimationComplete={onDone}
      />
    </g>
  );
}

function Pierce({
  target,
  a,
  onDone,
}: {
  target: Side;
  a: Record<Side, Fit>;
  onDone: () => void;
}) {
  const dst = a[target];
  const fromLeft = target === "enemy";
  const x0 = fromLeft ? dst.cx - 250 : dst.cx + 250;
  const x1 = fromLeft ? dst.cx + 190 : dst.cx - 190;
  return (
    <motion.line
      x1={x0}
      y1={dst.cy}
      x2={x1}
      y2={dst.cy}
      stroke="var(--accent)"
      strokeWidth={2.2}
      style={{ filter: "drop-shadow(0 0 8px rgba(216,58,46,0.9))" }}
      initial={{ pathLength: 0, opacity: 1 }}
      animate={{ pathLength: 1, opacity: [1, 1, 0] }}
      transition={{ duration: 0.4, times: [0, 0.75, 1], ease: "easeIn" }}
      onAnimationComplete={onDone}
    />
  );
}

function Drain({
  from,
  a,
  onDone,
}: {
  from: Side;
  a: Record<Side, Fit>;
  onDone: () => void;
}) {
  const sink = a[from];
  const src = a[from === "player" ? "enemy" : "player"];
  const { xs, ys, d } = quad(
    { x: src.cx, y: src.cy },
    { x: sink.cx, y: sink.cy },
    40,
  );
  const color = from === "player" ? "var(--paper)" : "var(--primary)";
  return (
    <g>
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeOpacity={0.6}
        strokeWidth={1}
        strokeDasharray="6 5"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0], strokeDashoffset: [0, -66] }}
        transition={{ duration: 1.0, times: [0, 0.15, 0.85, 1] }}
      />
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          r={2.4}
          fill={color}
          initial={{ cx: xs[0], cy: ys[0], opacity: 0 }}
          animate={{ cx: xs, cy: ys, opacity: [0, 1, 1, 0] }}
          transition={{ duration: 0.75, delay: 0.12 + i * 0.16, ease: "easeInOut" }}
          onAnimationComplete={i === 2 ? onDone : undefined}
        />
      ))}
    </g>
  );
}

function Muster({
  side,
  a,
  onDone,
}: {
  side: Side;
  a: Record<Side, Fit>;
  onDone: () => void;
}) {
  const f = a[side];
  const color = side === "player" ? "var(--paper)" : "var(--primary)";
  const pts = [0, 1, 2, 3, 4, 5].map((i) => ({
    x: f.cx + Math.cos((i / 6) * Math.PI * 2) * 70,
    y: f.cy + Math.sin((i / 6) * Math.PI * 2) * 44,
  }));
  return (
    <g>
      {pts.map((p, i) => (
        <motion.rect
          key={i}
          width={4.6}
          height={3.2}
          fill={color}
          initial={{ x: p.x, y: p.y, opacity: 0 }}
          animate={{ x: f.cx - 2, y: f.cy - 1.5, opacity: [0, 1, 1] }}
          transition={{ duration: 0.5, delay: i * 0.04, ease: "easeIn" }}
        />
      ))}
      <motion.circle
        cx={f.cx}
        cy={f.cy}
        fill="none"
        stroke={color}
        strokeWidth={1.4}
        initial={{ r: 4, opacity: 0.9 }}
        animate={{ r: 62, opacity: 0 }}
        transition={{ duration: 0.55, delay: 0.32, ease: "easeOut" }}
        onAnimationComplete={onDone}
      />
    </g>
  );
}

function Burst({
  id,
  side,
  crit,
  big,
  a,
  onDone,
}: {
  id: number;
  side: Side;
  crit?: boolean;
  big?: boolean;
  a: Record<Side, Fit>;
  onDone: () => void;
}) {
  const f = a[side];
  const x = f.cx + jit(id, 46);
  const y = f.cy + jit(id, 22, 2);
  const R = big ? 66 : crit ? 46 : 30;
  const color = crit || big ? "var(--primary)" : "var(--paper)";
  const sparks = [0, 1, 2, 3, 4, 5];
  return (
    <g>
      <motion.circle
        cx={x}
        cy={y}
        initial={{ r: 2, opacity: 1 }}
        animate={{ r: R, opacity: 0 }}
        transition={{ duration: big ? 0.6 : 0.42, ease: "easeOut" }}
        fill="none"
        stroke={color}
        strokeWidth={crit || big ? 2.2 : 1.4}
        onAnimationComplete={onDone}
      />
      <motion.circle
        cx={x}
        cy={y}
        initial={{ r: 1, opacity: 0.9 }}
        animate={{ r: R * 0.45, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        fill={color}
      />
      {sparks.map((i) => {
        const ang = (i / sparks.length) * Math.PI * 2 + jit(id, 3, i) / 10;
        return (
          <motion.line
            key={i}
            x1={x}
            y1={y}
            initial={{ x2: x, y2: y, opacity: 1 }}
            animate={{
              x2: x + Math.cos(ang) * R * 0.9,
              y2: y + Math.sin(ang) * R * 0.55,
              opacity: 0,
            }}
            transition={{ duration: 0.38, ease: "easeOut" }}
            stroke={color}
            strokeWidth={1.2}
          />
        );
      })}
    </g>
  );
}

function Storm({
  target,
  a,
  onDone,
}: {
  target: Side;
  a: Record<Side, Fit>;
  onDone: () => void;
}) {
  const f = a[target];
  return (
    <motion.g
      initial={{ x: f.cx - 190, opacity: 0 }}
      animate={{ x: f.cx + 150, opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.25, times: [0, 0.2, 0.8, 1], ease: "linear" }}
      onAnimationComplete={onDone}
    >
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={0}
          cy={f.cy - 20 - i * 6}
          r={26 + i * 16}
          fill="none"
          stroke="var(--paper)"
          strokeOpacity={0.8 - i * 0.2}
          strokeWidth={1.6}
          strokeDasharray="30 22"
          animate={{ rotate: 360 * (i % 2 === 0 ? 2 : -2) }}
          transition={{ duration: 1.25, ease: "linear" }}
        />
      ))}
    </motion.g>
  );
}

function Broadcast({
  from,
  a,
  onDone,
}: {
  from: Side;
  a: Record<Side, Fit>;
  onDone: () => void;
}) {
  const f = a[from];
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={f.cx}
          cy={f.cy}
          fill="none"
          stroke={from === "player" ? "var(--paper)" : "var(--primary)"}
          strokeWidth={1.6 - i * 0.3}
          initial={{ r: 8, opacity: 0.9 }}
          animate={{ r: 420, opacity: 0 }}
          transition={{ duration: 1.05, delay: i * 0.18, ease: "easeOut" }}
          onAnimationComplete={i === 2 ? onDone : undefined}
        />
      ))}
    </g>
  );
}

function Blackout({
  target,
  a,
  onDone,
}: {
  target: Side;
  a: Record<Side, Fit>;
  onDone: () => void;
}) {
  const slot = SLOTS[target];
  return (
    <motion.rect
      x={slot.x - 10}
      width={slot.w + 20}
      height={slot.h + 40}
      fill="rgba(9,9,9,0.9)"
      initial={{ y: slot.y - slot.h, opacity: 0 }}
      animate={{ y: slot.y - 6, opacity: [0, 0.95, 0.95, 0] }}
      transition={{ duration: 1.05, times: [0, 0.3, 0.75, 1], ease: "easeIn" }}
      onAnimationComplete={onDone}
    />
  );
}

function Shatter({
  side,
  c,
  onDone,
}: {
  side: Side;
  c: Combatant;
  onDone: () => void;
}) {
  const shape = STATE_SHAPES[c.state.abbr];
  if (!shape) return null;
  const f = fitShape(shape, side);
  const [x0, y0, x1, y1] = shape.bounds;
  const w = (x1 - x0) / 3;
  const h = (y1 - y0) / 2;
  const cells: { cx: number; cy: number; rx: number; ry: number }[] = [];
  for (let r = 0; r < 2; r++)
    for (let col = 0; col < 3; col++)
      cells.push({ rx: x0 + col * w, ry: y0 + r * h, cx: col - 1, cy: r === 0 ? -1 : 1 });
  const stroke = side === "player" ? "var(--paper)" : "var(--primary)";
  return (
    <g transform={`translate(${f.tx},${f.ty}) scale(${f.s})`}>
      {cells.map((cell, i) => (
        <motion.g
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: cell.cx * (14 + (i % 3) * 6) * (1 / f.s),
            y: 30 * (1 / f.s) + cell.cy * 8 * (1 / f.s),
            opacity: 0,
            rotate: cell.cx * 7,
          }}
          transition={{ duration: 0.9, delay: i * 0.05, ease: [0.3, 0.4, 0.6, 1] }}
          onAnimationComplete={i === cells.length - 1 ? onDone : undefined}
        >
          <clipPath id={`uw-shard-${side}-${i}`}>
            <rect x={cell.rx} y={cell.ry} width={w} height={h} />
          </clipPath>
          <path
            d={shape.d}
            clipPath={`url(#uw-shard-${side}-${i})`}
            fill={stroke}
            fillOpacity={0.3}
            stroke={stroke}
            strokeWidth={1.2}
            vectorEffect="non-scaling-stroke"
          />
        </motion.g>
      ))}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  The stage                                                          */
/* ------------------------------------------------------------------ */

export function TheaterStage({
  player,
  enemy,
  events,
  scorches,
  onDone,
}: {
  player: Combatant;
  enemy: Combatant;
  events: TheaterEvent[];
  scorches: Scorch[];
  onDone: (id: number) => void;
}) {
  const a = anchors(player, enemy);
  return (
    <svg
      viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
      className="block h-auto w-full"
      role="img"
      aria-label={`Theater of operations: ${player.state.name} versus ${enemy.state.name}`}
    >
      {/* ground plane */}
      <line x1={0} y1={GROUND_Y} x2={STAGE_W} y2={GROUND_Y} stroke="var(--border)" strokeWidth={1.5} />
      {[1, 2, 3].map((i) => (
        <line
          key={i}
          x1={0}
          y1={GROUND_Y - i * 5 - i * i * 3}
          x2={STAGE_W}
          y2={GROUND_Y - i * 5 - i * i * 3}
          stroke="var(--border)"
          strokeOpacity={0.35 - i * 0.09}
          strokeWidth={1}
        />
      ))}
      {/* range ticks along the frontier */}
      {Array.from({ length: 11 }).map((_, i) => (
        <line
          key={i}
          x1={455 + i * 9}
          y1={GROUND_Y - 3}
          x2={455 + i * 9}
          y2={GROUND_Y + 3}
          stroke="var(--muted-foreground)"
          strokeOpacity={0.5}
          strokeWidth={1}
        />
      ))}
      <text x={STAGE_W / 2} y={GROUND_Y + 20} textAnchor="middle" className="uw-map-label" fill="var(--muted-foreground)">
        CONTESTED FRONTIER
      </text>

      {/* territories — dead ones are replaced by the shatter effect */}
      {!(player.hp <= 0 && events.some((e) => e.kind === "shatter" && e.side === "player")) && (
        <Territory c={player} side="player" scorches={scorches.filter((s) => s.side === "player")} />
      )}
      {!(enemy.hp <= 0 && events.some((e) => e.kind === "shatter" && e.side === "enemy")) && (
        <Territory c={enemy} side="enemy" scorches={scorches.filter((s) => s.side === "enemy")} />
      )}

      {/* operations */}
      {events.map((e) => {
        const done = () => onDone(e.id);
        switch (e.kind) {
          case "column":
            return <Column key={e.id} from={e.from} a={a} onDone={done} />;
          case "arc":
            return (
              <Arc key={e.id} id={e.id} from={e.from} heavy={e.heavy} intercepted={e.intercepted} a={a} onDone={done} />
            );
          case "pierce":
            return <Pierce key={e.id} target={e.target} a={a} onDone={done} />;
          case "drain":
            return <Drain key={e.id} from={e.from} a={a} onDone={done} />;
          case "muster":
            return <Muster key={e.id} side={e.side} a={a} onDone={done} />;
          case "burst":
            return <Burst key={e.id} id={e.id} side={e.side} crit={e.crit} big={e.big} a={a} onDone={done} />;
          case "storm":
            return <Storm key={e.id} target={e.target} a={a} onDone={done} />;
          case "broadcast":
            return <Broadcast key={e.id} from={e.from} a={a} onDone={done} />;
          case "blackout":
            return <Blackout key={e.id} target={e.target} a={a} onDone={done} />;
          case "shatter":
            return (
              <Shatter key={e.id} side={e.side} c={e.side === "player" ? player : enemy} onDone={done} />
            );
          default:
            return null;
        }
      })}
    </svg>
  );
}
