"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
};

export function GlassCard({ children, className, tilt = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 220, damping: 22 });
  const sy = useSpring(my, { stiffness: 220, damping: 22 });
  const rotX = useTransform(sy, [0, 1], [5, -5]);
  const rotY = useTransform(sx, [0, 1], [-5, 5]);
  const spotX = useTransform(sx, (v) => `${v * 100}%`);
  const spotY = useTransform(sy, (v) => `${v * 100}%`);

  function onMove(e: React.MouseEvent) {
    if (!tilt) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        tilt
          ? {
              rotateX: rotX,
              rotateY: rotY,
              transformPerspective: 1000,
              // @ts-expect-error css var driven by motion value
              "--spot-x": spotX,
              "--spot-y": spotY,
            }
          : undefined
      }
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-cyan-glow/15 bg-gradient-to-b from-white/[0.04] to-white/[0.01] transition-colors hover:border-cyan-glow/40",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(520px circle at var(--spot-x,50%) var(--spot-y,50%), rgba(79,195,255,0.18), transparent 40%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/50 to-transparent opacity-60"
      />
      {children}
    </motion.div>
  );
}
