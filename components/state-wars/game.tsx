"use client";

/**
 * UNCIVIL WAR® — sanctioned interstate combat, live on pay-per-view.
 * The premise is the joke. The interface plays it straight.
 */

import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  ARCHETYPE_TAGS,
  choosePlan,
  DOCTRINE_BEATS,
  DOCTRINE_GLYPH,
  doctrineEdge,
  draftOpponent,
  gauntletScale,
  HYPE_MAX,
  makeCombatant,
  pick,
  planLabel,
  resolveAction,
  rollActionFailure,
  rollEvent,
  specialReady,
  STATUS_DEFS,
  tickStatuses,
  type Combatant,
  type MoveSlot,
  type Plan,
} from "@/components/state-wars/engine";
import {
  ArenaFxLayer,
  Debris,
  ImpactFlash,
  LowerThird,
  SpecialCutIn,
  type FxEvent,
  type FxSide,
} from "@/components/state-wars/fx";
import {
  isMuted,
  setMuted,
  sfx,
  unlockAudio,
} from "@/components/state-wars/sound";
import {
  areRivals,
  COMMENTARY,
  STATES,
  TICKER_FILLER,
  type StateFighter,
} from "@/lib/state-wars";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Phase = "select" | "battle" | "victory" | "defeat" | "dynasty";
type Side = FxSide;
type FighterAnim = "idle" | "lunge" | "hurt" | "ko";
type LogTone = "action" | "desk" | "event" | "system";

type LogEntry = { id: number; text: string; tone: LogTone };
type Pop = {
  id: number;
  side: Side;
  text: string;
  crit: boolean;
  kind: "dmg" | "heal" | "note";
};

type Cinematic = {
  abbr: string;
  stateName: string;
  moveName: string;
  side: Side;
};

type Battle = {
  player: Combatant;
  enemy: Combatant;
  round: number;
  busy: boolean;
  showVs: boolean;
  rivalMatch: boolean;
  plan: Plan;
  intentLabel: string;
  anims: Record<Side, FighterAnim>;
  /** arena punch-scale trigger; increments on heavy impacts */
  punch: number;
  log: LogEntry[];
  pops: Pop[];
  fx: FxEvent[];
  cinematic: Cinematic | null;
  breaking: string[];
  toast: { id: number; headline: string } | null;
};

const BEST_KEY = "uncivil-war:best";
const MUTE_KEY = "uncivil-war:muted";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Omit that distributes over a union (plain Omit collapses FxEvent). */
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;

/** Deterministic per-id jitter so simultaneous pops never overlap. */
const jitter = (id: number, spread: number) =>
  (((id * 2654435761) >>> 7) % (spread * 2)) - spread;

/* ------------------------------------------------------------------ */
/*  Root component                                                     */
/* ------------------------------------------------------------------ */

export default function UncivilWar() {
  const [phase, setPhase] = useState<Phase>("select");
  const [homeland, setHomeland] = useState<StateFighter | null>(null);
  const [battle, setBattle] = useState<Battle | null>(null);
  const [conquered, setConquered] = useState<string[]>([]);
  const [best, setBest] = useState(0);
  const [muted, setMutedState] = useState(false);

  const idRef = useRef(1);
  const carryRef = useRef<{ hp: number; hype: number } | null>(null);
  const nextId = () => idRef.current++;

  useEffect(() => {
    setBest(Number(localStorage.getItem(BEST_KEY) ?? 0) || 0);
    const m = localStorage.getItem(MUTE_KEY) === "1";
    setMuted(m);
    setMutedState(m);
  }, []);

  const toggleMute = () => {
    const m = !isMuted();
    setMuted(m);
    setMutedState(m);
    localStorage.setItem(MUTE_KEY, m ? "1" : "0");
    if (!m) sfx.click();
  };

  const recordRun = useCallback((count: number) => {
    setBest((prev) => {
      const next = Math.max(prev, count);
      localStorage.setItem(BEST_KEY, String(next));
      return next;
    });
  }, []);

  /* -------------------------------------------------------------- */
  /*  Battle lifecycle                                               */
  /* -------------------------------------------------------------- */

  const startBattle = useCallback(
    (home: StateFighter, foe: StateFighter, conqueredNow: string[]) => {
      const player = makeCombatant(home);
      const carry = carryRef.current;
      if (carry) {
        const healed = carry.hp + Math.round((player.maxHp - carry.hp) * 0.65);
        player.hp = Math.min(player.maxHp, healed);
        player.hype = Math.min(40, carry.hype);
      }
      const enemy = makeCombatant(foe, gauntletScale(conqueredNow.length));
      const rivalMatch = areRivals(home.abbr, foe.abbr);
      const plan = choosePlan(enemy, player);
      const log: LogEntry[] = [
        {
          id: nextId(),
          text: `ENGAGEMENT ${conqueredNow.length + 1}: ${home.name.toUpperCase()} VS ${foe.name.toUpperCase()}`,
          tone: "system",
        },
      ];
      if (rivalMatch) {
        log.unshift({ id: nextId(), text: pick(COMMENTARY.rival), tone: "desk" });
      }
      setBattle({
        player,
        enemy,
        round: 1,
        busy: false,
        showVs: true,
        rivalMatch,
        plan,
        intentLabel: planLabel(enemy, plan),
        anims: { player: "idle", enemy: "idle" },
        punch: 0,
        log,
        pops: [],
        fx: [],
        cinematic: null,
        breaking: [],
        toast: null,
      });
      setPhase("battle");
    },
    [],
  );

  const declareWar = (home: StateFighter) => {
    unlockAudio();
    sfx.select();
    carryRef.current = null;
    setHomeland(home);
    setConquered([]);
    startBattle(home, draftOpponent(home.abbr, []), []);
  };

  const nextEngagement = () => {
    if (!homeland || !battle) return;
    sfx.select();
    carryRef.current = { hp: battle.player.hp, hype: battle.player.hype };
    startBattle(homeland, draftOpponent(homeland.abbr, conquered), conquered);
  };

  const revenge = () => {
    if (!homeland || !battle) return;
    sfx.select();
    carryRef.current = null;
    startBattle(homeland, battle.enemy.state, conquered);
  };

  const newCampaign = () => {
    sfx.click();
    carryRef.current = null;
    setBattle(null);
    setHomeland(null);
    setConquered([]);
    setPhase("select");
  };

  /* -------------------------------------------------------------- */
  /*  Turn resolution                                                */
  /* -------------------------------------------------------------- */

  const doMove = useCallback(
    async (slot: MoveSlot) => {
      if (!battle || battle.busy || battle.showVs || phase !== "battle") return;
      if (slot === "special" && !specialReady(battle.player)) return;

      const b: Battle = {
        ...battle,
        player: { ...battle.player, statuses: battle.player.statuses.map((s) => ({ ...s })) },
        enemy: { ...battle.enemy, statuses: battle.enemy.statuses.map((s) => ({ ...s })) },
        anims: { ...battle.anims },
        log: [...battle.log],
        pops: [...battle.pops],
        fx: [...battle.fx],
        breaking: [...battle.breaking],
      };
      const commit = () =>
        setBattle({
          ...b,
          player: { ...b.player, statuses: b.player.statuses.map((s) => ({ ...s })) },
          enemy: { ...b.enemy, statuses: b.enemy.statuses.map((s) => ({ ...s })) },
          anims: { ...b.anims },
          log: [...b.log],
          pops: [...b.pops],
          fx: [...b.fx],
          breaking: [...b.breaking],
        });
      const say = (text: string, tone: LogTone) =>
        b.log.unshift({ id: nextId(), text, tone });
      const pop = (side: Side, text: string, kind: Pop["kind"], crit = false) =>
        b.pops.push({ id: nextId(), side, text, crit, kind });
      const fx = (e: DistributiveOmit<FxEvent, "id">) =>
        b.fx.push({ ...e, id: nextId() } as FxEvent);

      b.busy = true;
      commit();

      const act = async (side: Side, chosen: MoveSlot) => {
        b.anims.player = "idle";
        b.anims.enemy = "idle";
        const atkSide = side;
        const defSide: Side = side === "player" ? "enemy" : "player";
        const attacker = side === "player" ? b.player : b.enemy;
        const defender = side === "player" ? b.enemy : b.player;
        const tag = `[${attacker.state.abbr}]`;
        const arch = attacker.state.tactical.archetype;

        // pre-rolled fizzle: the whole action stalls before launch
        if (rollActionFailure(attacker, chosen)) {
          resolveAction(attacker, defender, chosen, true);
          b.anims[atkSide] = "lunge";
          commit();
          await sleep(180);
          b.anims[atkSide] = "idle";
          pop(atkSide, "NO ACTION", "note");
          sfx.fail();
          say(`${tag} ACTION FAILS. SUBJECT REPORTS DISORIENTATION.`, "system");
          commit();
          await sleep(520);
          return;
        }

        // wind-up
        if (chosen !== "fortify") {
          b.anims[atkSide] = "lunge";
          commit();
          await sleep(200);
        }

        // signature cut-in cinematic
        if (chosen === "special") {
          say(
            `${tag} ${attacker.state.special.name} — ${attacker.state.special.flavor}`,
            "action",
          );
          say(pick(COMMENTARY.special), "desk");
          b.cinematic = {
            abbr: attacker.state.abbr,
            stateName: attacker.state.name,
            moveName: attacker.state.special.name,
            side: atkSide,
          };
          sfx.special();
          commit();
          await sleep(1450);
          b.cinematic = null;
          commit();
          await sleep(80);
        }

        // projectile choreography — fired before the books are opened
        const isPierce = chosen === "tactical" && arch === "pierce";
        const isBarrage = chosen === "tactical" && arch === "barrage";
        const heavy = chosen === "special" || (chosen === "tactical" && arch === "siege");
        const throws =
          chosen === "fortify" || (chosen === "tactical" && arch === "rally")
            ? 0
            : isBarrage
              ? 3
              : 1;
        if (isPierce) {
          fx({ type: "pierce", from: atkSide });
          commit();
          await sleep(240);
        } else {
          for (let i = 0; i < throws; i++) {
            fx({ type: "tracer", from: atkSide, doctrine: attacker.state.doctrine, heavy });
            commit();
            await sleep(isBarrage ? 150 : heavy ? 330 : 230);
          }
        }

        // resolve
        const res = resolveAction(attacker, defender, chosen, false);
        if (chosen !== "special") {
          say(`${tag} ${res.moveName} — ${res.flavor}`, "action");
        }

        // hit-stop, then impacts land staggered
        let anyCrit = false;
        if (res.hits.length > 0) {
          await sleep(55);
          for (let i = 0; i < res.hits.length; i++) {
            const h = res.hits[i];
            anyCrit = anyCrit || h.crit;
            fx({ type: "impact", side: defSide, crit: h.crit || heavy });
            pop(defSide, `-${h.dmg}`, "dmg", h.crit);
            b.anims[defSide] = "hurt";
            if (h.crit || heavy) b.punch += 1;
            if (h.crit) sfx.crit();
            else sfx.hit();
            commit();
            if (i < res.hits.length - 1) {
              await sleep(170);
              b.anims[defSide] = "idle";
              commit();
              await sleep(50);
            }
          }
          if (anyCrit) say(pick(COMMENTARY.crit), "desk");
          else if (Math.random() < 0.3) say(pick(COMMENTARY.hit), "desk");
        }

        // secondary effects
        if (res.intercepted) {
          pop(atkSide, "INTERCEPTED", "note");
          sfx.fail();
          say(
            `${tag} OPERATION INTERCEPTED. ${defender.state.name.toUpperCase()} GAINS INITIATIVE.`,
            "system",
          );
        }
        if (res.selfDamage > 0) {
          await sleep(240);
          fx({ type: "impact", side: atkSide, crit: false });
          pop(atkSide, `-${res.selfDamage}`, "dmg");
          b.anims[atkSide] = "hurt";
          sfx.hit();
          say(`${tag} RECOIL ABSORBED: −${res.selfDamage}.`, "system");
          commit();
        }
        if (res.healSelf > 0) {
          pop(atkSide, `+${res.healSelf}`, "heal");
          sfx.heal();
          if (chosen === "fortify") {
            say(`${tag} EMERGENCY POWERS — ASSETS RESTORED, POSITION BRACED.`, "system");
            if (Math.random() < 0.3) say(pick(COMMENTARY.heal), "desk");
          }
          commit();
        }
        if (res.cleansed) {
          say(`${tag} CONDITION SUSPENDED: ${STATUS_DEFS[res.cleansed].label}.`, "system");
        }
        if (res.statusApplied) {
          const def = STATUS_DEFS[res.statusApplied];
          await sleep(140);
          pop(defSide, def.label, "note");
          sfx.status();
          say(
            `CONDITION APPLIED TO ${defender.state.name.toUpperCase()}: ${def.label} (${def.desc}).`,
            "event",
          );
          if (Math.random() < 0.35) say(pick(COMMENTARY.status), "desk");
          commit();
        }
        if (res.stageSelf > 0) {
          pop(atkSide, `ATK +${res.stageSelf}`, "note");
          sfx.stage();
          say(
            `${tag} OFFENSIVE CAPACITY INCREASED (STAGE ${attacker.atkStage >= 0 ? "+" : ""}${attacker.atkStage}).`,
            "system",
          );
          commit();
        }
        if (res.stageEnemy < 0) {
          pop(defSide, `ATK ${res.stageEnemy}`, "note");
          sfx.stage();
          say(
            `${defender.state.name.toUpperCase()} OFFENSIVE CAPACITY REDUCED (STAGE ${defender.atkStage >= 0 ? "+" : ""}${defender.atkStage}).`,
            "system",
          );
          commit();
        }

        b.anims[atkSide] = "idle";
        commit();
        await sleep(chosen === "special" ? 560 : 480);
      };

      const finish = async (winner: Side) => {
        const loser: Side = winner === "player" ? "enemy" : "player";
        b.anims[loser] = "ko";
        b.punch += 1;
        fx({ type: "impact", side: loser, crit: true });
        fx({ type: "debris", side: loser });
        say(pick(COMMENTARY.ko), "desk");
        commit();
        await sleep(650);
        if (winner === "player") {
          sfx.win();
          const nextConquered = [...conquered, b.enemy.state.abbr];
          setConquered(nextConquered);
          recordRun(nextConquered.length);
          await sleep(950);
          setPhase(nextConquered.length >= STATES.length - 1 ? "dynasty" : "victory");
        } else {
          sfx.lose();
          recordRun(conquered.length);
          await sleep(950);
          setPhase("defeat");
        }
      };

      // --- player acts ---
      await act("player", slot);
      if (b.enemy.hp <= 0) return finish("player");
      if (b.player.hp <= 0) return finish("enemy"); // recoil can end a campaign

      // --- enemy executes the telegraphed plan ---
      await sleep(380);
      await act("enemy", b.plan.slot);
      if (b.player.hp <= 0) return finish("enemy");
      if (b.enemy.hp <= 0) return finish("player");

      // --- conditions run their course ---
      for (const side of ["player", "enemy"] as Side[]) {
        const c = side === "player" ? b.player : b.enemy;
        const ticks = tickStatuses(c);
        for (const t of ticks) {
          const def = STATUS_DEFS[t.id];
          if (t.dmg > 0) {
            pop(side, `-${t.dmg}`, "dmg");
            sfx.status();
            say(
              t.id === "BECOMING_OHIO"
                ? `${c.state.name.toUpperCase()} — THE TRANSFORMATION ADVANCES: −${t.dmg}.`
                : `${c.state.name.toUpperCase()} — ${def.label}: −${t.dmg}.`,
              "event",
            );
          }
          if (t.expired) {
            say(`${c.state.name.toUpperCase()} — ${def.label} HAS RUN ITS COURSE.`, "system");
          }
        }
        if (ticks.some((t) => t.dmg > 0)) {
          commit();
          await sleep(460);
        }
        if (c.hp <= 0) return finish(side === "player" ? "enemy" : "player");
      }

      // --- field developments (lower-third) ---
      const rolled = rollEvent();
      if (rolled) {
        const target = rolled.onPlayer ? b.player : b.enemy;
        const side: Side = rolled.onPlayer ? "player" : "enemy";
        const headline = rolled.event.headline.replaceAll(
          "{S}",
          target.state.name.toUpperCase(),
        );
        if (rolled.event.hp) {
          target.hp = Math.max(1, Math.min(target.maxHp, target.hp + rolled.event.hp));
          if (rolled.event.hp > 0) pop(side, `+${rolled.event.hp}`, "heal");
          else pop(side, `${rolled.event.hp}`, "dmg");
        }
        if (rolled.event.hype)
          target.hype = Math.min(HYPE_MAX, Math.max(0, target.hype + rolled.event.hype));
        sfx.event();
        say(headline, "event");
        b.breaking = [headline, ...b.breaking].slice(0, 6);
        b.toast = { id: nextId(), headline };
        commit();
        await sleep(2100);
        b.toast = null;
      }

      // --- next intercept ---
      b.plan = choosePlan(b.enemy, b.player);
      b.intentLabel = planLabel(b.enemy, b.plan);
      if (b.plan.jammed && Math.random() < 0.4) say(pick(COMMENTARY.jammed), "desk");

      b.round += 1;
      b.busy = false;
      commit();
    },
    [battle, phase, conquered, recordRun],
  );

  /* keyboard: 1-4 fire moves */
  useEffect(() => {
    if (phase !== "battle") return;
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, MoveSlot> = {
        "1": "primary",
        "2": "tactical",
        "3": "fortify",
        "4": "special",
      };
      const mv = map[e.key];
      if (mv) void doMove(mv);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, doMove]);

  /* auto-dismiss the tale of the tape */
  useEffect(() => {
    if (!battle?.showVs) return;
    const t = setTimeout(() => {
      setBattle((prev) => (prev ? { ...prev, showVs: false } : prev));
    }, 3800);
    return () => clearTimeout(t);
  }, [battle?.showVs]);

  const clearPop = (id: number) =>
    setBattle((prev) =>
      prev ? { ...prev, pops: prev.pops.filter((p) => p.id !== id) } : prev,
    );
  const clearFx = (id: number) =>
    setBattle((prev) =>
      prev ? { ...prev, fx: prev.fx.filter((f) => f.id !== id) } : prev,
    );

  /* -------------------------------------------------------------- */
  /*  Render                                                         */
  /* -------------------------------------------------------------- */

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-28 sm:px-6">
      {/* initial={false}: the select screen must be visible pre-hydration */}
      <AnimatePresence mode="wait" initial={false}>
        {phase === "select" ? (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24 }}
          >
            <SelectScreen best={best} onDeclare={declareWar} />
          </motion.div>
        ) : battle && homeland ? (
          <motion.div
            key="broadcast"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24 }}
          >
            <BroadcastFrame
              battle={battle}
              conqueredCount={conquered.length}
              muted={muted}
              onToggleMute={toggleMute}
              screenKey={phase}
            >
              {phase === "battle" && (
                <BattleScreen
                  battle={battle}
                  onMove={(m) => void doMove(m)}
                  onClearPop={clearPop}
                  onClearFx={clearFx}
                  onSkipVs={() =>
                    setBattle((prev) => (prev ? { ...prev, showVs: false } : prev))
                  }
                />
              )}
              {phase === "victory" && (
                <VictoryScreen
                  battle={battle}
                  homeland={homeland}
                  conquered={conquered}
                  best={best}
                  onNext={nextEngagement}
                  onRetire={newCampaign}
                />
              )}
              {phase === "defeat" && (
                <DefeatScreen
                  battle={battle}
                  conquered={conquered}
                  best={best}
                  onRevenge={revenge}
                  onNew={newCampaign}
                />
              )}
              {phase === "dynasty" && (
                <DynastyScreen homeland={homeland} onNew={newCampaign} />
              )}
            </BroadcastFrame>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Select screen                                                      */
/* ------------------------------------------------------------------ */

function StatPips({ label, value, max }: { label: string; value: number; max: number }) {
  const filled = Math.round((value / max) * 10);
  return (
    <div className="flex items-center gap-2">
      <span className="w-12 font-mono text-[9px] uppercase tracking-[0.2em] text-ink/60">
        {label}
      </span>
      <div className="flex gap-[3px]">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className={`h-2.5 w-1.5 ${i < filled ? "bg-primary" : "bg-ink/15"}`}
          />
        ))}
      </div>
      <span className="font-advancedled text-[10px] text-ink/70">{value}</span>
    </div>
  );
}

function DoctrineChip({ doctrine }: { doctrine: StateFighter["doctrine"] }) {
  return (
    <span
      title={`${doctrine} SUPPRESSES ${DOCTRINE_BEATS[doctrine]}`}
      className="border border-ink/40 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-ink/80"
    >
      {doctrine}
    </span>
  );
}

function SelectScreen({
  best,
  onDeclare,
}: {
  best: number;
  onDeclare: (s: StateFighter) => void;
}) {
  const [picked, setPicked] = useState<StateFighter | null>(null);

  const choose = (s: StateFighter) => {
    unlockAudio();
    sfx.click();
    setPicked(s);
  };

  return (
    <div>
      {/* masthead */}
      <div className="text-center">
        <p className="mb-3 inline-flex items-center gap-2 border border-primary/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          Live · PPV-01 · Encrypted feed
        </p>
        <h1 className="font-marlboro text-6xl uppercase leading-[0.9] text-foreground sm:text-8xl">
          Uncivil
          <span className="block text-primary">
            War<span className="align-top font-ndot text-2xl sm:text-4xl">®</span>
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-muted-foreground">
          Sanctioned interstate combat. Two states enter. One is annexed.
          The $59.99 broadcast fee is waived for domestic viewers.
        </p>
        <p className="mt-3 font-advancedled text-xs tracking-[0.25em] text-primary led-flicker">
          MANIFEST RECORD: {best}/49 STATES ANNEXED
        </p>
      </div>

      {/* dossier */}
      <div className="print-panel paper-texture mt-10 overflow-hidden text-ink">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink/25 px-5 py-2.5">
          <span className="brand-microcopy text-ink/60">
            Bureau of interstate hostilities — file 1861-B
          </span>
          <span className="font-advancedled text-[10px] tracking-[0.2em] text-primary">
            DOSSIER: {picked ? picked.abbr : "PENDING"}
          </span>
        </div>
        <div className="min-h-[200px] p-5 sm:p-6">
          <AnimatePresence mode="wait">
            {picked ? (
              <motion.div
                key={picked.abbr}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="grid gap-5 lg:grid-cols-[auto_1fr_auto] lg:items-center"
              >
                <div className="flex items-center gap-4">
                  <span className="font-ndot text-7xl leading-none text-primary">
                    {picked.abbr}
                  </span>
                  <div>
                    <p className="font-ndot text-2xl uppercase leading-none">{picked.name}</p>
                    <p className="mt-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60">
                      <span>&ldquo;{picked.epithet}&rdquo;</span>
                      <DoctrineChip doctrine={picked.doctrine} />
                    </p>
                    <div className="mt-3 space-y-1.5">
                      <StatPips label="Body" value={picked.hp} max={130} />
                      <StatPips label="Attack" value={picked.atk} max={13} />
                      <StatPips label="Grit" value={picked.def} max={12} />
                      <StatPips label="Chaos" value={picked.chaos} max={10} />
                    </div>
                  </div>
                </div>
                <div className="max-w-md">
                  <div className="space-y-1 border-b border-ink/20 pb-2 font-mono text-[10px] uppercase tracking-[0.1em] text-ink/80">
                    <p>
                      <span className="text-ink/50">Primary · </span>
                      {picked.primary.name}
                    </p>
                    <p>
                      <span className="text-ink/50">Tactical · </span>
                      {picked.tactical.name}
                      <span className="text-primary"> [{ARCHETYPE_TAGS[picked.tactical.archetype]}]</span>
                    </p>
                    <p>
                      <span className="text-ink/50">Signature · </span>
                      {picked.special.name}
                      <span className="text-ink/50"> (req. 100% hype)</span>
                    </p>
                  </div>
                  <p className="mt-2 font-mono text-xs leading-relaxed text-ink/80">
                    {picked.special.flavor}
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-ink/60">
                    Intel: {picked.intel}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onDeclare(picked)}
                  className="btn-accent group w-full bg-primary px-8 py-5 text-left lg:w-auto"
                >
                  <span className="block font-ndot text-2xl uppercase leading-none text-primary-foreground">
                    Declare war →
                  </span>
                  <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.25em] text-primary-foreground/80">
                    Irrevocable upon selection.
                  </span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="flex min-h-[160px] flex-col items-start justify-between gap-5 sm:flex-row sm:items-center"
              >
                <div className="max-w-lg">
                  <p className="font-ndot text-3xl uppercase leading-none text-ink">
                    Designate your homeland
                  </p>
                  <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-ink/60">
                    Select a state below to open its file — doctrine, move kit,
                    and intel — then sign the declaration. The other 49 will be
                    notified by mail.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => choose(pick(STATES))}
                  className="shrink-0 border-2 border-ink px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  Request random assignment
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* the union */}
      <div className="mt-6 grid grid-cols-5 gap-1.5 sm:grid-cols-10">
        {STATES.map((s) => {
          const active = picked?.abbr === s.abbr;
          return (
            <button
              key={s.abbr}
              type="button"
              onClick={() => choose(s)}
              aria-pressed={active}
              className={`group border p-2 text-center transition-all duration-150 ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              }`}
            >
              <span className="block font-ndot text-xl leading-none sm:text-2xl">
                {s.abbr}
              </span>
              <span
                className={`mt-1 block truncate font-mono text-[8px] uppercase tracking-[0.08em] ${
                  active ? "text-primary-foreground/80" : "text-muted-foreground"
                }`}
              >
                {s.name}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-center font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
        49 challengers. One map. Total annexation.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Broadcast chrome                                                   */
/* ------------------------------------------------------------------ */

function BroadcastFrame({
  battle,
  conqueredCount,
  muted,
  onToggleMute,
  screenKey,
  children,
}: {
  battle: Battle;
  conqueredCount: number;
  muted: boolean;
  onToggleMute: () => void;
  screenKey: string;
  children: React.ReactNode;
}) {
  const tickerItems = useMemo(
    () => [...battle.breaking, ...TICKER_FILLER],
    [battle.breaking],
  );
  const tickerText = tickerItems.join("  +++  ");

  return (
    <div className="print-panel relative overflow-hidden bg-card">
      {/* control bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 bg-primary px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.3em] text-primary-foreground">
            <span className="inline-block size-1.5 animate-pulse rounded-full bg-primary-foreground" />
            Live
          </span>
          <span className="font-marlboro text-xl uppercase leading-none text-foreground">
            Uncivil War<span className="text-primary">®</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground sm:inline">
            Annexed {conqueredCount}/49
          </span>
          <span className="font-advancedled text-xs tracking-[0.2em] text-primary led-flicker">
            RD {String(battle.round).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={onToggleMute}
            className="border border-border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            SND {muted ? "OFF" : "ON"}
          </button>
        </div>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={screenKey}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="p-4 sm:p-6"
          >
            {children}
          </motion.div>
        </AnimatePresence>

        {/* signature cinematic takes over the stage */}
        <AnimatePresence>
          {battle.cinematic && (
            <SpecialCutIn
              abbr={battle.cinematic.abbr}
              stateName={battle.cinematic.stateName}
              moveName={battle.cinematic.moveName}
              side={battle.cinematic.side}
            />
          )}
        </AnimatePresence>

        {/* field developments arrive as a lower third */}
        <AnimatePresence>
          {battle.toast && <LowerThird key={battle.toast.id} headline={battle.toast.headline} />}
        </AnimatePresence>
      </div>

      {/* news ticker */}
      <div className="flex items-stretch border-t border-border">
        <span className="flex items-center bg-primary px-3 font-mono text-[9px] uppercase tracking-[0.25em] text-primary-foreground">
          Wire
        </span>
        <div className="relative flex-1 overflow-hidden bg-ink py-2">
          <div className="uw-marquee flex w-max">
            {[0, 1].map((i) => (
              <span
                key={i}
                aria-hidden={i === 1}
                className="whitespace-nowrap pr-16 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/80"
              >
                {tickerText}
                {"  +++  "}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Battle screen                                                      */
/* ------------------------------------------------------------------ */

function SegBar({
  value,
  max,
  segments,
  low,
}: {
  value: number;
  max: number;
  segments: number;
  /** hype-style bar: red fill, and only reads full at exactly max */
  low?: boolean;
}) {
  const filled = low
    ? Math.floor((value / max) * segments)
    : Math.ceil((value / max) * segments);
  const danger = value / max < 0.35;
  return (
    <div className="flex gap-[2px]">
      {Array.from({ length: segments }).map((_, i) => (
        <span
          key={i}
          className={`h-3 flex-1 transition-colors duration-200 ${
            i < filled
              ? danger
                ? "animate-pulse bg-primary"
                : low
                  ? "bg-primary"
                  : "bg-paper/85"
              : "bg-paper/10"
          }`}
        />
      ))}
    </div>
  );
}

const fighterVariants: Variants = {
  idle: { x: 0, y: 0, rotate: 0, opacity: 1 },
  lungePlayer: { x: 34, transition: { duration: 0.16 } },
  lungeEnemy: { x: -34, transition: { duration: 0.16 } },
  hurtPlayer: { x: [0, -22, 12, -7, 3, 0], transition: { duration: 0.45 } },
  hurtEnemy: { x: [0, 22, -12, 7, -3, 0], transition: { duration: 0.45 } },
  koPlayer: {
    rotate: -11,
    y: 30,
    opacity: 0.5,
    transition: { duration: 0.65, ease: [0.2, 0.8, 0.3, 1] },
  },
  koEnemy: {
    rotate: 11,
    y: 30,
    opacity: 0.5,
    transition: { duration: 0.65, ease: [0.2, 0.8, 0.3, 1] },
  },
};

function ConditionChips({ c }: { c: Combatant }) {
  return (
    <div className="mt-3 flex min-h-[18px] flex-wrap gap-1.5">
      <AnimatePresence>
        {c.shield < 1 && (
          <motion.span
            key="braced"
            initial={{ scale: 1.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 24 }}
            className="border border-paper/40 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-paper/80"
          >
            Braced
          </motion.span>
        )}
        {c.atkStage !== 0 && (
          <motion.span
            key="stage"
            initial={{ scale: 1.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 24 }}
            className={`border px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em] ${
              c.atkStage > 0 ? "border-accent/60 text-accent" : "border-primary/60 text-primary"
            }`}
          >
            ATK {c.atkStage > 0 ? `+${c.atkStage}` : c.atkStage}
          </motion.span>
        )}
        {c.statuses.map((s) => (
          <motion.span
            key={s.id}
            initial={{ scale: 1.8, opacity: 0, rotate: -6 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 480, damping: 22 }}
            title={STATUS_DEFS[s.id].desc}
            className={`border px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em] ${
              s.id === "BECOMING_OHIO"
                ? "animate-pulse border-primary bg-primary/15 text-primary"
                : "border-primary/60 text-primary"
            }`}
          >
            {STATUS_DEFS[s.id].label}
            {Number.isFinite(s.turns) ? ` ·${s.turns}` : ""}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

function FighterCard({
  c,
  side,
  anim,
  pops,
  cardFx,
  intent,
  onClearPop,
  onClearFx,
}: {
  c: Combatant;
  side: Side;
  anim: FighterAnim;
  pops: Pop[];
  cardFx: FxEvent[];
  intent?: { label: string; jammed: boolean; isSpecial: boolean };
  onClearPop: (id: number) => void;
  onClearFx: (id: number) => void;
}) {
  const variant =
    anim === "idle"
      ? "idle"
      : anim === "hurt"
        ? side === "player"
          ? "hurtPlayer"
          : "hurtEnemy"
        : anim === "lunge"
          ? side === "player"
            ? "lungePlayer"
            : "lungeEnemy"
          : side === "player"
            ? "koPlayer"
            : "koEnemy";
  const ko = c.hp <= 0;
  const ready = specialReady(c);

  return (
    <div className="relative">
      <motion.div
        variants={fighterVariants}
        animate={variant}
        className={`relative overflow-hidden border p-4 sm:p-5 ${
          side === "player" ? "border-paper/30 bg-ink" : "border-primary/40 bg-ink"
        }`}
      >
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate font-ndot text-base uppercase leading-none text-foreground sm:text-lg">
            {c.state.name}
          </p>
          <span className="shrink-0 font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
            {side === "player" ? "You" : "Them"}
          </span>
        </div>
        <p className="mt-1 flex items-center gap-2 truncate font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
          <span className="truncate">&ldquo;{c.state.epithet}&rdquo;</span>
          <span className="shrink-0 border border-border px-1 py-px text-[7px] tracking-[0.2em] text-muted-foreground">
            {DOCTRINE_GLYPH[c.state.doctrine]}
          </span>
        </p>

        <div className="my-3 text-center sm:my-4">
          <motion.span
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className={`inline-block font-ndot text-7xl leading-none sm:text-8xl lg:text-9xl ${
              side === "player" ? "text-paper" : "text-primary"
            }`}
          >
            {c.state.abbr}
          </motion.span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-muted-foreground">
            HP
          </span>
          <span className="font-advancedled text-sm tracking-[0.1em] text-foreground">
            <NumberFlow value={Math.max(0, c.hp)} />
            <span className="text-muted-foreground">/{c.maxHp}</span>
          </span>
        </div>
        <div className="mt-1">
          <SegBar value={Math.max(0, c.hp)} max={c.maxHp} segments={20} />
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-muted-foreground">
            Hype
          </span>
          {ready && (
            <span className="animate-pulse font-mono text-[8px] uppercase tracking-[0.2em] text-primary">
              ★ Signature authorized
            </span>
          )}
        </div>
        <div className="mt-1">
          <SegBar value={c.hype} max={HYPE_MAX} segments={10} low />
        </div>

        <ConditionChips c={c} />

        {/* SIGINT intercept — enemy card only */}
        {intent && !ko && (
          <div className="mt-3 flex items-center gap-2 border-t border-border pt-2">
            <span className="shrink-0 font-mono text-[8px] uppercase tracking-[0.25em] text-muted-foreground">
              Sigint
            </span>
            <motion.span
              key={intent.label + String(intent.jammed)}
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={`truncate font-mono text-[9px] uppercase tracking-[0.12em] ${
                intent.jammed
                  ? "text-muted-foreground"
                  : intent.isSpecial
                    ? "animate-pulse text-primary"
                    : "text-accent"
              }`}
            >
              {intent.jammed ? "██████ — SIGNAL JAMMED" : `NEXT: ${intent.label}`}
            </motion.span>
          </div>
        )}

        {/* impact flashes land inside the card */}
        <AnimatePresence>
          {cardFx
            .filter((f) => f.type === "impact")
            .map((f) => (
              <ImpactFlash
                key={f.id}
                crit={f.type === "impact" ? f.crit : false}
                onDone={() => onClearFx(f.id)}
              />
            ))}
        </AnimatePresence>

        {/* KO stamp */}
        <AnimatePresence>
          {ko && (
            <motion.div
              initial={{ scale: 3, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: -14 }}
              transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.25 }}
              className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
            >
              <span className="border-4 border-primary bg-background/60 px-4 py-2 font-ndot text-3xl uppercase tracking-[0.15em] text-primary sm:text-4xl">
                {side === "player" ? "Seceded" : "Annexed"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* KO debris erupts outside the card bounds */}
      {cardFx
        .filter((f) => f.type === "debris")
        .map((f) => (
          <Debris key={f.id} side={side} onDone={() => onClearFx(f.id)} />
        ))}

      {/* damage pops — jittered so simultaneous numbers never stack */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-visible">
        <AnimatePresence>
          {pops.map((p) => {
            const dx = jitter(p.id, 36);
            const big = p.kind === "dmg" && Math.abs(parseInt(p.text, 10) || 0) >= 24;
            return (
              <motion.span
                key={p.id}
                initial={{ opacity: 0, y: 10, x: dx, scale: 0.5 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: -64,
                  x: dx + jitter(p.id + 1, 18),
                  scale: p.crit ? 1.7 : big ? 1.3 : 1,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                onAnimationComplete={() => onClearPop(p.id)}
                className={`absolute left-1/2 top-[30%] -translate-x-1/2 text-center ${
                  p.kind === "note"
                    ? "whitespace-nowrap font-mono text-sm uppercase tracking-[0.2em] text-accent"
                    : `font-ndot ${big || p.crit ? "text-5xl sm:text-6xl" : "text-4xl sm:text-5xl"} ${
                        p.kind === "heal"
                          ? "text-accent"
                          : p.crit
                            ? "text-primary drop-shadow-[0_0_18px_rgba(216,58,46,0.9)]"
                            : "text-paper"
                      }`
                }`}
              >
                {p.text}
                {p.crit && (
                  <span className="block text-center font-mono text-[10px] uppercase tracking-[0.3em]">
                    Critical
                  </span>
                )}
              </motion.span>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

function BattleScreen({
  battle,
  onMove,
  onClearPop,
  onClearFx,
  onSkipVs,
}: {
  battle: Battle;
  onMove: (m: MoveSlot) => void;
  onClearPop: (id: number) => void;
  onClearFx: (id: number) => void;
  onSkipVs: () => void;
}) {
  const { player, enemy } = battle;
  const locked = battle.busy || battle.showVs;
  const ready = specialReady(player);
  const hypePct = Math.min(100, Math.round((player.hype / HYPE_MAX) * 100));
  const edge = doctrineEdge(player.state.doctrine, enemy.state.doctrine);

  const moves: {
    slot: MoveSlot;
    name: string;
    hint: string;
    key: string;
    disabled?: boolean;
    special?: boolean;
  }[] = [
    {
      slot: "primary",
      name: player.state.primary.name,
      hint: `PRIMARY · ${player.state.doctrine}`,
      key: "1",
    },
    {
      slot: "tactical",
      name: player.state.tactical.name,
      hint: ARCHETYPE_TAGS[player.state.tactical.archetype],
      key: "2",
    },
    {
      slot: "fortify",
      name: "EMERGENCY POWERS",
      hint: "HEAL · BRACE · SUSPEND 1 CONDITION",
      key: "3",
    },
    {
      slot: "special",
      name: player.state.special.name,
      hint: ready ? "AUTHORIZED — FIRE AT WILL" : `CHARGING — ${hypePct}%`,
      key: "4",
      disabled: !ready,
      special: true,
    },
  ];

  return (
    <div>
      {/* arena */}
      <div className="relative">
        <motion.div
          initial={false}
          animate={
            battle.anims.player === "hurt" || battle.anims.enemy === "hurt"
              ? { x: [0, -8, 7, -4, 0], scale: [1, 0.992, 1] }
              : { x: 0, scale: 1 }
          }
          transition={{ duration: 0.38 }}
          className="relative grid grid-cols-[1fr_auto_1fr] items-stretch gap-2 sm:gap-4"
        >
          <FighterCard
            c={player}
            side="player"
            anim={battle.anims.player}
            pops={battle.pops.filter((p) => p.side === "player")}
            cardFx={battle.fx.filter(
              (f) => (f.type === "impact" || f.type === "debris") && f.side === "player",
            )}
            onClearPop={onClearPop}
            onClearFx={onClearFx}
          />
          <div className="relative z-10 flex w-14 flex-col items-center justify-center gap-2 sm:w-24">
            <span className="font-marlboro text-2xl uppercase text-muted-foreground sm:text-4xl">
              VS
            </span>
            {battle.rivalMatch && (
              <span className="rotate-[-6deg] border border-primary px-1.5 py-0.5 text-center font-mono text-[8px] uppercase tracking-[0.18em] text-primary sm:px-2">
                Grudge
                <br />
                on file
              </span>
            )}
            {edge !== "neutral" && (
              <span
                className={`text-center font-mono text-[8px] uppercase tracking-[0.18em] ${
                  edge === "advantage" ? "text-accent" : "text-primary"
                }`}
              >
                Doctrine
                <br />
                {edge === "advantage" ? "favors you" : "against you"}
              </span>
            )}
          </div>
          <FighterCard
            c={enemy}
            side="enemy"
            anim={battle.anims.enemy}
            pops={battle.pops.filter((p) => p.side === "enemy")}
            cardFx={battle.fx.filter(
              (f) => (f.type === "impact" || f.type === "debris") && f.side === "enemy",
            )}
            intent={{
              label: battle.intentLabel,
              jammed: battle.plan.jammed,
              isSpecial: battle.plan.slot === "special" && !battle.plan.jammed,
            }}
            onClearPop={onClearPop}
            onClearFx={onClearFx}
          />

          {/* projectiles cross the arena above both cards */}
          <ArenaFxLayer
            events={battle.fx.filter((f) => f.type === "tracer" || f.type === "pierce")}
            onDone={onClearFx}
          />
        </motion.div>

        {/* tale of the tape */}
        <AnimatePresence>
          {battle.showVs && (
            <motion.button
              type="button"
              onClick={onSkipVs}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.3 }}
              className="paper-texture absolute inset-0 z-40 flex cursor-pointer flex-col items-center justify-center gap-3 p-4 text-ink"
            >
              <p className="brand-label text-primary">Tale of the tape</p>
              <div className="flex items-center gap-5 sm:gap-8">
                <motion.span
                  initial={{ x: -60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="font-ndot text-6xl leading-none text-ink sm:text-8xl"
                >
                  {player.state.abbr}
                </motion.span>
                <motion.span
                  initial={{ scale: 2.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.16, type: "spring", stiffness: 400, damping: 18 }}
                  className="font-marlboro text-3xl uppercase text-primary sm:text-5xl"
                >
                  VS
                </motion.span>
                <motion.span
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="font-ndot text-6xl leading-none text-primary sm:text-8xl"
                >
                  {enemy.state.abbr}
                </motion.span>
              </div>
              <p className="max-w-md text-center font-mono text-[10px] uppercase leading-relaxed tracking-[0.15em] text-ink/70">
                {enemy.state.name} — &ldquo;{enemy.state.epithet}&rdquo;
                <br />
                {enemy.state.intel}
              </p>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/70">
                {edge === "neutral"
                  ? "Doctrine analysis: neutral. Outcome rests on execution."
                  : edge === "advantage"
                    ? `Doctrine analysis: ${player.state.doctrine} suppresses ${enemy.state.doctrine} — advantage ${player.state.name}.`
                    : `Doctrine analysis: ${enemy.state.doctrine} suppresses ${player.state.doctrine} — advantage ${enemy.state.name}.`}
              </p>
              {battle.rivalMatch && (
                <p className="animate-pulse font-ndot text-lg uppercase text-primary">
                  Standing border grudge on file: +15% ordnance
                </p>
              )}
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-ink/50">
                Tap to commence hostilities
              </p>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* controls */}
      <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {moves.map((m) => (
          <button
            key={m.slot}
            type="button"
            disabled={locked || m.disabled}
            onClick={() => onMove(m.slot)}
            className={`group relative overflow-hidden border-2 p-3 text-left transition-all duration-150 disabled:cursor-not-allowed sm:p-4 ${
              m.special && ready
                ? "uw-armed border-primary bg-primary text-primary-foreground"
                : m.special
                  ? "border-primary/40 bg-ink text-paper/90 disabled:opacity-90"
                  : "border-paper/25 bg-ink text-paper hover:enabled:-translate-y-0.5 hover:enabled:border-primary hover:enabled:text-primary disabled:opacity-40"
            }`}
          >
            {/* the signature button is its own hype gauge */}
            {m.special && !ready && (
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 bg-primary/25 transition-[width] duration-500"
                style={{ width: `${hypePct}%` }}
              />
            )}
            <span className="absolute right-2 top-2 font-advancedled text-[9px] opacity-50">
              {m.key}
            </span>
            <span className="relative block pr-4 font-ndot text-sm uppercase leading-tight sm:text-base">
              {m.name}
            </span>
            <span
              className={`relative mt-1 block font-mono text-[8px] uppercase tracking-[0.18em] ${
                m.special && ready ? "text-primary-foreground/80" : "text-muted-foreground"
              }`}
            >
              {m.hint}
            </span>
          </button>
        ))}
      </div>

      {/* the desk */}
      <div className="mt-4 border border-border bg-background/60">
        <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
            Commentary desk — Hank &amp; Gen. Whitlock, Ret.
          </span>
          <span className="font-advancedled text-[9px] text-primary led-flicker">
            REC ●
          </span>
        </div>
        <ul className="h-32 space-y-1 overflow-y-auto p-3">
          {battle.log.map((l) => (
            <li
              key={l.id}
              className={`font-mono text-[10px] uppercase leading-relaxed tracking-[0.08em] ${
                l.tone === "desk"
                  ? "text-primary"
                  : l.tone === "event"
                    ? "text-accent"
                    : l.tone === "system"
                      ? "text-muted-foreground"
                      : "text-foreground/90"
              }`}
            >
              {l.tone === "action" ? "▸ " : l.tone === "event" ? "⚠ " : ""}
              {l.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Result screens                                                     */
/* ------------------------------------------------------------------ */

function UnionTally({
  homeland,
  conquered,
}: {
  homeland: string;
  conquered: string[];
}) {
  const taken = new Set(conquered);
  return (
    <div className="mx-auto grid w-full max-w-xl grid-cols-10 gap-1">
      {STATES.map((s) => {
        const mine = s.abbr === homeland;
        const got = taken.has(s.abbr);
        return (
          <span
            key={s.abbr}
            className={`py-1 text-center font-mono text-[8px] tracking-[0.05em] ${
              mine
                ? "bg-paper text-ink"
                : got
                  ? "bg-primary text-primary-foreground"
                  : "bg-paper/10 text-muted-foreground"
            }`}
            title={s.name}
          >
            {s.abbr}
          </span>
        );
      })}
    </div>
  );
}

function BigStamp({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ scale: 2.6, opacity: 0, rotate: -24 }}
      animate={{ scale: 1, opacity: 1, rotate: -8 }}
      transition={{ type: "spring", stiffness: 380, damping: 16, delay: 0.15 }}
      className="inline-block border-[6px] border-primary px-6 py-2"
    >
      <span className="font-marlboro text-5xl uppercase leading-none text-primary sm:text-7xl">
        {text}
      </span>
    </motion.div>
  );
}

function ResultShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-5 py-8 text-center sm:py-12"
    >
      {children}
    </motion.div>
  );
}

function VictoryScreen({
  battle,
  homeland,
  conquered,
  best,
  onNext,
  onRetire,
}: {
  battle: Battle;
  homeland: StateFighter;
  conquered: string[];
  best: number;
  onNext: () => void;
  onRetire: () => void;
}) {
  return (
    <ResultShell>
      <BigStamp text="Annexed" />
      <p className="max-w-md font-mono text-[11px] uppercase leading-relaxed tracking-[0.15em] text-foreground">
        {battle.enemy.state.name} is now a suburb of {homeland.name}. Residents
        have been issued new, worse license plates.
      </p>
      <p className="font-advancedled text-sm tracking-[0.2em] text-primary led-flicker">
        CONQUEST: {conquered.length}/49 — RECORD: {best}/49
      </p>
      <UnionTally homeland={homeland.abbr} conquered={conquered} />
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onNext}
          className="btn-accent bg-primary px-8 py-4 font-ndot text-xl uppercase text-primary-foreground"
        >
          Next engagement →
        </button>
        <button
          type="button"
          onClick={onRetire}
          className="border border-border px-6 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          Retire to Mount Vernon
        </button>
      </div>
      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
        Field hospitals restore partial strength between engagements.
      </p>
    </ResultShell>
  );
}

function DefeatScreen({
  battle,
  conquered,
  best,
  onRevenge,
  onNew,
}: {
  battle: Battle;
  conquered: string[];
  best: number;
  onRevenge: () => void;
  onNew: () => void;
}) {
  return (
    <ResultShell>
      <BigStamp text="Seceded" />
      <p className="max-w-md font-mono text-[11px] uppercase leading-relaxed tracking-[0.15em] text-foreground">
        {battle.player.state.name} has been absorbed by{" "}
        {battle.enemy.state.name}. History will misremember you. Possibly as a
        regional airport.
      </p>
      <p className="font-advancedled text-sm tracking-[0.2em] text-primary led-flicker">
        RUN ENDED AT {conquered.length}/49 — RECORD: {best}/49
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onRevenge}
          className="btn-accent bg-primary px-8 py-4 font-ndot text-xl uppercase text-primary-foreground"
        >
          Retaliate →
        </button>
        <button
          type="button"
          onClick={onNew}
          className="border border-border px-6 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          New campaign
        </button>
      </div>
    </ResultShell>
  );
}

function DynastyScreen({
  homeland,
  onNew,
}: {
  homeland: StateFighter;
  onNew: () => void;
}) {
  return (
    <ResultShell>
      <BigStamp text="Manifest" />
      <h2 className="font-ndot text-3xl uppercase text-foreground sm:text-4xl">
        Destiny complete
      </h2>
      <p className="max-w-md font-mono text-[11px] uppercase leading-relaxed tracking-[0.15em] text-foreground">
        {homeland.name} has annexed the entire union. The map is just you now.
        The cartographers have been sent home.
      </p>
      <UnionTally
        homeland={homeland.abbr}
        conquered={STATES.filter((s) => s.abbr !== homeland.abbr).map((s) => s.abbr)}
      />
      <button
        type="button"
        onClick={onNew}
        className="btn-accent mt-2 bg-primary px-8 py-4 font-ndot text-xl uppercase text-primary-foreground"
      >
        Commence new campaign
      </button>
      <Link
        href="/"
        className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-primary"
      >
        ← Return to the collection
      </Link>
    </ResultShell>
  );
}
