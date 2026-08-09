/**
 * UNCIVIL WAR® combat engine — pure functions, no React.
 * Tuned so an average bout runs 6–10 rounds: long enough to swing,
 * short enough to demand a rematch.
 */

import {
  areRivals,
  STATES,
  WAR_EVENTS,
  type StateFighter,
  type WarEvent,
} from "@/lib/state-wars";

export const HYPE_MAX = 100;

export type MoveId = "invade" | "fortify" | "viral" | "special";

export type Combatant = {
  state: StateFighter;
  hp: number;
  maxHp: number;
  hype: number;
  /** incoming-damage multiplier from FORTIFY; 1 = no shield */
  shield: number;
  /** consecutive FORTIFY uses — heals decay so nobody turtles */
  fortifyStreak: number;
};

export function makeCombatant(state: StateFighter, scale = 1): Combatant {
  const maxHp = Math.round(state.hp * scale);
  return { state, hp: maxHp, maxHp, hype: 0, shield: 1, fortifyStreak: 0 };
}

/** Difficulty ramp for the conquest gauntlet. */
export function gauntletScale(conquered: number): number {
  return 1 + conquered * 0.045;
}

const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);
export const pick = <T,>(arr: readonly T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

export type StrikeResult = {
  dmg: number;
  crit: boolean;
  rival: boolean;
};

/** Chaos is the crit stat: Florida (10) crits ~26% of the time. */
function critChance(attacker: Combatant): number {
  return 0.06 + attacker.state.chaos * 0.02;
}

function rawStrike(
  attacker: Combatant,
  defender: Combatant,
  base: number,
  atkScale: number,
  critMult: number,
): StrikeResult {
  const rival = areRivals(attacker.state.abbr, defender.state.abbr);
  const crit = Math.random() < critChance(attacker);
  let dmg =
    (base + attacker.state.atk * atkScale) *
    rand(0.85, 1.15) *
    (crit ? critMult : 1) *
    (rival ? 1.15 : 1) *
    defender.shield;
  dmg -= defender.state.def * 0.6;
  return { dmg: Math.max(3, Math.round(dmg)), crit, rival };
}

export function strikeInvade(a: Combatant, d: Combatant): StrikeResult {
  return rawStrike(a, d, 7, 0.9, 1.8);
}

export type ViralOutcome = "hit" | "mid" | "fail";

export function rollViral(): ViralOutcome {
  const r = Math.random();
  if (r < 0.5) return "hit";
  if (r < 0.82) return "mid";
  return "fail";
}

export function strikeViral(
  a: Combatant,
  d: Combatant,
  outcome: ViralOutcome,
): StrikeResult {
  if (outcome === "hit") return rawStrike(a, d, 11, 1.4, 1.8);
  if (outcome === "mid") return rawStrike(a, d, 3, 0.5, 1.5);
  // backfire: self-ratio, no def applied, always "hits" the poster
  return { dmg: Math.round(rand(7, 13)), crit: false, rival: false };
}

/** Specials punch through half of any shield and can't be a dud. */
export function strikeSpecial(a: Combatant, d: Combatant): StrikeResult {
  const shielded = d.shield;
  const softened: Combatant = { ...d, shield: (1 + shielded) / 2 };
  return rawStrike(a, softened, 16, 1.6, 1.6);
}

export function fortify(c: Combatant): { heal: number } {
  const decay = Math.pow(0.55, c.fortifyStreak);
  const heal = Math.round((12 + c.state.def * 0.8) * decay);
  return { heal };
}

export function gainHype(c: Combatant, amount: number): number {
  return Math.min(HYPE_MAX, Math.max(0, c.hype + amount));
}

export function specialReady(c: Combatant): boolean {
  return c.hype >= HYPE_MAX;
}

export function aiChoose(self: Combatant, foe: Combatant): MoveId {
  if (specialReady(self) && Math.random() < 0.8) return "special";
  if (self.hp / self.maxHp < 0.35 && self.shield === 1 && Math.random() < 0.4)
    return "fortify";
  const r = Math.random();
  if (r < 0.55) return "invade";
  if (r < 0.85) return "viral";
  // never let the AI fortify itself into a stalemate
  return self.fortifyStreak >= 2 ? "invade" : "fortify";
}

export type RolledEvent = {
  event: WarEvent;
  /** true = affects the player side */
  onPlayer: boolean;
};

export function rollEvent(chance = 0.22): RolledEvent | null {
  if (Math.random() > chance) return null;
  return { event: pick(WAR_EVENTS), onPlayer: Math.random() < 0.5 };
}

/** Opponent draft: prefers a famous rival so the desk has material. */
export function draftOpponent(
  playerAbbr: string,
  conquered: string[],
): StateFighter {
  const taken = new Set([playerAbbr, ...conquered]);
  const pool = STATES.filter((s) => !taken.has(s.abbr));
  const rivals = pool.filter((s) => areRivals(playerAbbr, s.abbr));
  if (rivals.length > 0 && Math.random() < 0.55) return pick(rivals);
  return pick(pool);
}
