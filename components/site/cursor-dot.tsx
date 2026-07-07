"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/* Spring cursor-follower adapted from skiper-ui Skiper61 (SpringMouseFollow). */
const SPRING = { mass: 0.1, damping: 12, stiffness: 160 };

export default function CursorDot() {
  const x = useSpring(-100, SPRING);
  const y = useSpring(-100, SPRING);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
      setEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x, y }}
      className="pointer-events-none fixed left-0 top-0 z-[95] hidden size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-paper/70 bg-primary/85 shadow-[0_0_0_4px_rgba(216,58,46,0.14)] xl:block"
    />
  );
}
