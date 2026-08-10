/**
 * Tiny WebAudio synth for UNCIVIL WAR® — zero audio assets.
 * Everything is oscillators and noise bursts at polite volume.
 */

let ctx: AudioContext | null = null;
let muted = false;

export function setMuted(m: boolean) {
  muted = m;
}

export function isMuted() {
  return muted;
}

function ac(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** Call from a user gesture so iOS lets us make noise later. */
export function unlockAudio() {
  ac();
}

type ToneOpts = {
  freq: number;
  end?: number;
  time?: number;
  type?: OscillatorType;
  vol?: number;
  delay?: number;
};

function tone({
  freq,
  end,
  time = 0.12,
  type = "square",
  vol = 0.05,
  delay = 0,
}: ToneOpts) {
  const a = ac();
  if (!a || muted) return;
  const t0 = a.currentTime + delay;
  const osc = a.createOscillator();
  const gain = a.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (end) osc.frequency.exponentialRampToValueAtTime(end, t0 + time);
  gain.gain.setValueAtTime(vol, t0);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + time);
  osc.connect(gain).connect(a.destination);
  osc.start(t0);
  osc.stop(t0 + time + 0.02);
}

function noise(time = 0.15, vol = 0.08, delay = 0) {
  const a = ac();
  if (!a || muted) return;
  const t0 = a.currentTime + delay;
  const len = Math.max(1, Math.floor(a.sampleRate * time));
  const buf = a.createBuffer(1, len, a.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / len);
  }
  const src = a.createBufferSource();
  src.buffer = buf;
  const gain = a.createGain();
  gain.gain.setValueAtTime(vol, t0);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + time);
  src.connect(gain).connect(a.destination);
  src.start(t0);
}

export const sfx = {
  click() {
    tone({ freq: 660, time: 0.05, vol: 0.03 });
  },
  select() {
    tone({ freq: 440, time: 0.06, vol: 0.035 });
    tone({ freq: 660, time: 0.07, vol: 0.035, delay: 0.05 });
  },
  hit() {
    noise(0.1, 0.07);
    tone({ freq: 160, end: 60, time: 0.14, type: "sawtooth", vol: 0.07 });
  },
  crit() {
    noise(0.2, 0.1);
    tone({ freq: 320, end: 50, time: 0.3, type: "sawtooth", vol: 0.09 });
    tone({ freq: 1200, time: 0.06, vol: 0.04 });
  },
  heal() {
    tone({ freq: 392, time: 0.09, type: "triangle", vol: 0.05 });
    tone({ freq: 523, time: 0.09, type: "triangle", vol: 0.05, delay: 0.08 });
    tone({ freq: 659, time: 0.12, type: "triangle", vol: 0.05, delay: 0.16 });
  },
  fail() {
    tone({ freq: 300, end: 90, time: 0.35, type: "sawtooth", vol: 0.06 });
  },
  status() {
    tone({ freq: 140, time: 0.18, type: "sawtooth", vol: 0.045 });
    tone({ freq: 110, time: 0.2, type: "sawtooth", vol: 0.04, delay: 0.14 });
  },
  stage() {
    tone({ freq: 330, end: 494, time: 0.14, type: "triangle", vol: 0.045 });
  },
  special() {
    tone({ freq: 80, end: 640, time: 0.4, type: "sawtooth", vol: 0.07 });
    noise(0.3, 0.09, 0.35);
    tone({ freq: 500, end: 40, time: 0.45, type: "square", vol: 0.08, delay: 0.35 });
  },
  hype() {
    tone({ freq: 880, time: 0.07, vol: 0.04 });
    tone({ freq: 1175, time: 0.09, vol: 0.04, delay: 0.06 });
  },
  win() {
    [523, 659, 784, 1047].forEach((f, i) =>
      tone({ freq: f, time: 0.16, type: "triangle", vol: 0.06, delay: i * 0.11 }),
    );
  },
  lose() {
    [392, 330, 262, 196].forEach((f, i) =>
      tone({ freq: f, time: 0.22, type: "sawtooth", vol: 0.05, delay: i * 0.16 }),
    );
  },
  event() {
    tone({ freq: 988, time: 0.08, vol: 0.045 });
    tone({ freq: 988, time: 0.08, vol: 0.045, delay: 0.12 });
  },
};
