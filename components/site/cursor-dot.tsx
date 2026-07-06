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
      className="pointer-events-none fixed left-0 top-0 z-[95] -ml-2 -mt-2 size-4 rounded-full bg-primary mix-blend-difference"
    />
  );
}
