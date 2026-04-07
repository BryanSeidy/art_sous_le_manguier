"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 35, stiffness: 400 });
  const sy = useSpring(y, { damping: 35, stiffness: 400 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX - 18);
      y.set(e.clientY - 18);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed z-50 hidden h-9 w-9 rounded-full border border-mango/70 bg-mango/20 mix-blend-screen md:block"
      style={{ x: sx, y: sy }}
    />
  );
}
