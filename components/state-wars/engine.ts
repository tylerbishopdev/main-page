/**
 * UNCIVIL WAR® combat engine — pure functions, no React.
 *
 * Phase-1 systems: doctrine advantage cycle, per-state move kits built
 * from eight tactical archetypes, conditions (statuses), ATK stages,
 * and a plan-ahead AI whose next action is telegraphed to the player.
 */

import {
  areRivals,
  STATES,
  WAR_EVENTS,
  type Archetype,
  type Doctrine,
  type StateFighter,
  type StatusId,
  type WarEvent,
} from "@/lib/state-wars";

export const HYPE_MAX = 100;

export type MoveSlot = "primary" | "tactical" | "fortify" | "special";

/* ------------------------------------------------------------------ */
/*  Doctrine cycle: FORCE ⊳ PSYOPS ⊳ COMMERCE ⊳ CLIMATE ⊳ FORCE        */
/* ------------------------------------------------------------------ */

export const DOCTRINE_BEATS: Record<Doctrine, Doctrine> = {
  FORCE: "PSYOPS",
  PSYOPS: "COMMERCE",
  COMMERCE: "CLIMATE",
  CLIMATE: "FORCE",
};

export type DoctrineEdge = "advantage" | "disadvantage" | "neutral";

export function doctrineEdge(att: Doctrine, def: Doctrine): DoctrineEdge {
  if (DOCTRINE_BEATS[att] === def) return "advantage";
  if (DOCTRINE_BEATS[def] === att) return "disadvantage";
  return "neutral";
}

function doctrineMult(edge: DoctrineEdge): number {
  return edge === "advantage" ? 1.2 : edge === "disadvantage" ? 0.9 : 1;
}

/* ------------------------------------------------------------------ */
/*  Conditions                                                         */
/* ------------------------------------------------------------------ */

export type StatusDef = {
  label: string;
  desc: string;
  duration: number; // turns; Infinity = permanent
  cleansable: boolean;
};

export const STATUS_DEFS: Record<StatusId, StatusDef> = {
  BURNING: { label: "BURNING", desc: "5 DMG / ROUND", duration: 3, cleansable: true },
  TOLLED: { label: "TOLLED", desc: "4 DMG / ROUND", duration: 4, cleansable: true },
  DISORIENTED: { label: "DISORIENTED", desc: "25% ACTION FAILURE", duration: 2, cleansable: true },
  SNOWBOUND: { label: "SNOWBOUND", desc: "OUTPUT −30%", duration: 2, cleansable: true },
  EXPOSED: { label: "EXPOSED", desc: "DEFENSE SUSPENDED", duration: 2, cleansable: true },
  BECOMING_OHIO: { label: "BECOMING OHIO", desc: "ESCALATING. PERMANENT.", duration: Infinity, cleansable: false },
};

export type ActiveStatus = { id: StatusId; turns: number; ticks: number };

/* ------------------------------------------------------------------ */
/*  Combatants                                                         */
/* ------------------------------------------------------------------ */

export type Combatant = {
  state: StateFighter;
  hp: number;
  maxHp: number;
  hype: number;
  /** incoming-damage multiplier from EMERGENCY POWERS; 1 = no brace */
  shield: number;
  /** consecutive fortify uses — the heal decays so nobody turtles */
  fortifyStreak: number;
  /** −3..+3; each stage is ±12% outgoing damage */
  atkStage: number;
  statuses: ActiveStatus[];
};

export function makeCombatant(state: StateFighter, scale = 1): Combatant {
  const maxHp = Math.round(state.hp * scale);
  return {
    state,
    hp: maxHp,
    maxHp,
    hype: 0,
    shield: 1,
    fortifyStreak: 0,
    atkStage: 0,
    statuses: [],
  };
}

export function gauntletScale(conquered: number): number {
  return 1 + conquered * 0.045;
}

const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);
export const pick = <T,>(arr: readonly T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

export function hasStatus(c: Combatant, id: StatusId): boolean {
  return c.statuses.some((s) => s.id === id);
}

export function applyStatus(c: Combatant, id: StatusId): void {
  const existing = c.statuses.find((s) => s.id === id);
  if (existing) {
    existing.turns = STATUS_DEFS[id].duration;
    return;
  }
  if (c.statuses.length >= 3) c.statuses.shift();
  c.statuses.push({ id, turns: STATUS_DEFS[id].duration, ticks: 0 });
}

/** Remove the oldest cleansable condition. Returns what was removed. */
export function cleanseOne(c: Combatant): StatusId | null {
  const idx = c.statuses.findIndex((s) => STATUS_DEFS[s.id].cleansable);
  if (idx === -1) return null;
  const [removed] = c.statuses.splice(idx, 1);
  return removed.id;
}

export type StatusTick = { id: StatusId; dmg: number; expired: boolean };

/** End-of-round condition processing for one side. */
export function tickStatuses(c: Combatant): StatusTick[] {
  const out: StatusTick[] = [];
  c.statuses = c.statuses.filter((s) => {
    let dmg = 0;
    if (s.id === "BURNING") dmg = 5;
    if (s.id === "TOLLED") dmg = 4;
    if (s.id === "BECOMING_OHIO") dmg = 3 + s.ticks * 2;
    s.ticks += 1;
    s.turns -= 1;
    if (dmg > 0) c.hp = Math.max(0, c.hp - dmg);
    const expired = s.turns <= 0;
    out.push({ id: s.id, dmg, expired });
    return !expired;
  });
  return out;
}

/* ------------------------------------------------------------------ */
/*  Action resolution                                                  */
/* ------------------------------------------------------------------ */

export type Hit = { dmg: number; crit: boolean };

export type Resolution = {
  slot: MoveSlot;
  moveName: string;
  flavor: string;
  /** DISORIENTED roll failed — nothing else applies */
  failed: boolean;
  hits: Hit[];
  selfDamage: number;
  healSelf: number;
  statusApplied: StatusId | null;
  stageSelf: number; // atkStage delta applied to actor
  stageEnemy: number; // atkStage delta applied to target
  cleansed: StatusId | null;
  /** gambit whiff — the operation is intercepted, target gains hype */
  intercepted: boolean;
  braced: boolean; // fortify applied a brace
  edge: DoctrineEdge;
  rival: boolean;
};

function critChance(c: Combatant): number {
  return 0.06 + c.state.chaos * 0.02;
}

const stageMult = (stage: number) => 1 + 0.12 * stage;

type StrikeOpts = {
  base: number;
  scale: number;
  critMult?: number;
  ignoreDefense?: boolean;
  ignoreShield?: boolean;
  shieldSoftened?: boolean; // specials punch through half a brace
  consumeShield?: boolean;
};

/** One damage instance. Mutates defender shield when consumed. */
function strike(a: Combatant, d: Combatant, o: StrikeOpts): Hit {
  const edge = doctrineEdge(a.state.doctrine, d.state.doctrine);
  const rival = areRivals(a.state.abbr, d.state.abbr);
  const crit = Math.random() < critChance(a);
  let shieldMult = 1;
  if (!o.ignoreShield && d.shield < 1) {
    shieldMult = o.shieldSoftened ? (1 + d.shield) / 2 : d.shield;
    if (o.consumeShield !== false) d.shield = 1;
  }
  const exposed = hasStatus(d, "EXPOSED");
  const snowbound = hasStatus(a, "SNOWBOUND");
  let dmg =
    (o.base + a.state.atk * o.scale) *
    rand(0.85, 1.15) *
    (crit ? (o.critMult ?? 1.8) : 1) *
    (rival ? 1.15 : 1) *
    doctrineMult(edge) *
    stageMult(a.atkStage) *
    (snowbound ? 0.7 : 1) *
    (exposed ? 1.2 : 1) *
    shieldMult;
  if (!o.ignoreDefense && !exposed) dmg -= d.state.def * 0.6;
  return { dmg: Math.max(3, Math.round(dmg)), crit };
}

function baseResolution(
  slot: MoveSlot,
  moveName: string,
  flavor: string,
  a: Combatant,
  d: Combatant,
): Resolution {
  return {
    slot,
    moveName,
    flavor,
    failed: false,
    hits: [],
    selfDamage: 0,
    healSelf: 0,
    statusApplied: null,
    stageSelf: 0,
    stageEnemy: 0,
    cleansed: null,
    intercepted: false,
    braced: false,
    edge: doctrineEdge(a.state.doctrine, d.state.doctrine),
    rival: areRivals(a.state.abbr, d.state.abbr),
  };
}

/** Pre-roll a DISORIENTED fizzle so the UI can stage it before any effects. */
export function rollActionFailure(c: Combatant, slot: MoveSlot): boolean {
  return slot !== "fortify" && hasStatus(c, "DISORIENTED") && Math.random() < 0.25;
}

/**
 * Resolve an action. Mutates both combatants (hp, hype, shield, stages,
 * statuses) and returns the full account for presentation.
 * Pass `failedOverride` when the fizzle was already rolled via
 * rollActionFailure; otherwise it is rolled here.
 */
export function resolveAction(
  a: Combatant,
  d: Combatant,
  slot: MoveSlot,
  failedOverride?: boolean,
): Resolution {
  const s = a.state;
  const move =
    slot === "primary"
      ? s.primary
      : slot === "tactical"
        ? s.tactical
        : slot === "special"
          ? s.special
          : { name: "EMERGENCY POWERS", flavor: "Powers are assumed. Objections are tabled." };
  const res = baseResolution(slot, move.name, move.flavor, a, d);

  // DISORIENTED: 25% chance the action simply does not happen
  const failed = failedOverride ?? rollActionFailure(a, slot);
  if (failed) {
    res.failed = true;
    return res;
  }

  const landHits = (hits: Hit[]) => {
    let total = 0;
    let crits = 0;
    for (const h of hits) {
      d.hp = Math.max(0, d.hp - h.dmg);
      total += h.dmg;
      if (h.crit) crits += 1;
    }
    res.hits = hits;
    if (total > 0) {
      a.hype = Math.min(HYPE_MAX, a.hype + 14 + crits * 6);
      d.hype = Math.min(HYPE_MAX, d.hype + 12);
    }
    return total;
  };

  if (slot === "fortify") {
    const decay = Math.pow(0.55, a.fortifyStreak);
    const heal = Math.round((12 + s.def * 0.8) * decay);
    a.fortifyStreak += 1;
    a.hp = Math.min(a.maxHp, a.hp + heal);
    a.shield = 0.55;
    a.hype = Math.min(HYPE_MAX, a.hype + 8);
    res.healSelf = heal;
    res.braced = true;
    res.cleansed = cleanseOne(a);
    return res;
  }

  a.fortifyStreak = 0;

  if (slot === "primary") {
    landHits([strike(a, d, { base: 7, scale: 0.9 })]);
    return res;
  }

  if (slot === "special") {
    a.hype = 0;
    const isOhio = s.special.status === "BECOMING_OHIO";
    const hit = strike(a, d, {
      base: isOhio ? 9 : 16,
      scale: isOhio ? 0.9 : 1.6,
      critMult: 1.6,
      shieldSoftened: true,
    });
    landHits([hit]);
    if (s.special.status && d.hp > 0) {
      applyStatus(d, s.special.status);
      res.statusApplied = s.special.status;
    }
    return res;
  }

  // tactical archetypes
  const arch: Archetype = s.tactical.archetype;

  if (arch === "barrage") {
    landHits([
      strike(a, d, { base: 3, scale: 0.38 }),
      strike(a, d, { base: 3, scale: 0.38 }),
      strike(a, d, { base: 3, scale: 0.38 }),
    ]);
  } else if (arch === "siege") {
    const total = landHits([strike(a, d, { base: 13, scale: 1.2 })]);
    res.selfDamage = Math.round(total * 0.25);
    a.hp = Math.max(0, a.hp - res.selfDamage);
  } else if (arch === "sanction") {
    landHits([strike(a, d, { base: 5, scale: 0.6 })]);
    if (s.tactical.status && d.hp > 0) {
      applyStatus(d, s.tactical.status);
      res.statusApplied = s.tactical.status;
    }
  } else if (arch === "drain") {
    const total = landHits([strike(a, d, { base: 6, scale: 0.7 })]);
    res.healSelf = Math.round(total * 0.5);
    a.hp = Math.min(a.maxHp, a.hp + res.healSelf);
  } else if (arch === "rally") {
    a.atkStage = Math.min(3, a.atkStage + 1);
    a.hype = Math.min(HYPE_MAX, a.hype + 14);
    res.stageSelf = 1;
  } else if (arch === "sabotage") {
    landHits([strike(a, d, { base: 4, scale: 0.5 })]);
    if (d.atkStage > -3) {
      d.atkStage -= 1;
      res.stageEnemy = -1;
    }
  } else if (arch === "gambit") {
    const r = Math.random();
    if (r < 0.5) {
      landHits([strike(a, d, { base: 14, scale: 1.5 })]);
    } else if (r < 0.85) {
      landHits([strike(a, d, { base: 4, scale: 0.4 })]);
    } else {
      res.intercepted = true;
      d.hype = Math.min(HYPE_MAX, d.hype + 15);
    }
  } else {
    // pierce — bypasses brace and defense, leaves the brace intact
    landHits([
      strike(a, d, { base: 8, scale: 0.85, ignoreDefense: true, ignoreShield: true }),
    ]);
  }

  return res;
}

export function specialReady(c: Combatant): boolean {
  return c.hype >= HYPE_MAX;
}

/* ------------------------------------------------------------------ */
/*  AI — plans one action ahead; the plan is telegraphed via SIGINT    */
/* ------------------------------------------------------------------ */

export type Plan = { slot: MoveSlot; jammed: boolean };

export function choosePlan(self: Combatant, foe: Combatant): Plan {
  const p = self.state.personality;
  const hpFrac = self.hp / self.maxHp;
  const canFortify = self.fortifyStreak < 2;
  const ready = specialReady(self);
  let slot: MoveSlot;

  if (p === "aggressive") {
    if (ready && Math.random() < 0.85) slot = "special";
    else if (hpFrac < 0.3 && canFortify && Math.random() < 0.25) slot = "fortify";
    else slot = Math.random() < 0.6 ? "primary" : "tactical";
  } else if (p === "bulwark") {
    if (ready && Math.random() < 0.7) slot = "special";
    else if (hpFrac < 0.5 && self.shield === 1 && canFortify && Math.random() < 0.55)
      slot = "fortify";
    else {
      const r = Math.random();
      slot = r < 0.4 ? "primary" : r < 0.75 ? "tactical" : canFortify ? "fortify" : "primary";
    }
  } else if (p === "opportunist") {
    if (ready && Math.random() < 0.8) slot = "special";
    else if (foe.shield < 1) {
      // a braced enemy is a wasted heavy — do setup work instead
      const arch = self.state.tactical.archetype;
      slot = arch === "pierce" || arch === "rally" || arch === "sabotage" || arch === "sanction"
        ? "tactical"
        : "primary";
    } else if (hpFrac < 0.35 && canFortify && Math.random() < 0.45) slot = "fortify";
    else if (doctrineEdge(self.state.doctrine, foe.state.doctrine) === "advantage")
      slot = Math.random() < 0.6 ? "primary" : "tactical";
    else slot = Math.random() < 0.45 ? "primary" : Math.random() < 0.75 ? "tactical" : canFortify ? "fortify" : "primary";
  } else {
    // erratic
    const options: MoveSlot[] = ["primary", "tactical"];
    if (canFortify) options.push("fortify");
    if (ready) options.push("special", "special");
    slot = pick(options);
  }

  const jammed = p === "erratic" && Math.random() < 0.4;
  return { slot, jammed };
}

/** Display line for an intercepted plan. */
export function planLabel(c: Combatant, plan: Plan): string {
  if (plan.jammed) return "SIGNAL JAMMED";
  if (plan.slot === "fortify") return "EMERGENCY POWERS";
  if (plan.slot === "special") return c.state.special.name;
  if (plan.slot === "primary") return c.state.primary.name;
  return c.state.tactical.name;
}

/* ------------------------------------------------------------------ */
/*  Field developments & opponent drafting                             */
/* ------------------------------------------------------------------ */

export type RolledEvent = {
  event: WarEvent;
  onPlayer: boolean;
};

export function rollEvent(chance = 0.22): RolledEvent | null {
  if (Math.random() > chance) return null;
  return { event: pick(WAR_EVENTS), onPlayer: Math.random() < 0.5 };
}

/** Opponent draft: prefers a standing grudge when one is on file. */
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

/* ------------------------------------------------------------------ */
/*  UI copy helpers                                                    */
/* ------------------------------------------------------------------ */

export const ARCHETYPE_TAGS: Record<Archetype, string> = {
  barrage: "3 STRIKES",
  siege: "HEAVY · RECOIL",
  sanction: "STRIKE + CONDITION",
  drain: "STRIKE + RECOVER",
  rally: "+1 ATK STAGE",
  sabotage: "STRIKE · ENEMY −1 ATK",
  gambit: "50 / 35 / 15",
  pierce: "BYPASSES DEFENSE",
};

export const DOCTRINE_GLYPH: Record<Doctrine, string> = {
  FORCE: "FRC",
  CLIMATE: "CLM",
  COMMERCE: "COM",
  PSYOPS: "PSY",
};
