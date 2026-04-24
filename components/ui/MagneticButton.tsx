"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import { useCapability } from "./CapabilityProvider";

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  type?: "button" | "submit";
};

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  type = "button",
}: Props) {
  const { capable } = useCapability();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18 });
  const sy = useSpring(y, { stiffness: 260, damping: 18 });
  const txtX = useTransform(sx, (v) => v * 0.4);
  const txtY = useTransform(sy, (v) => v * 0.4);

  function handleMove(e: React.MouseEvent) {
    if (!capable) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.25);
    y.set(relY * 0.25);
  }
  function handleLeave() {
    if (!capable) return;
    x.set(0);
    y.set(0);
  }

  const classes = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium tracking-wide transition-colors will-change-transform touch-manipulation",
    "min-h-[44px]",
    variant === "primary"
      ? "bg-cyan-glow text-void hover:bg-platinum"
      : "border border-cyan-glow/40 bg-cyan-glow/5 text-platinum hover:bg-cyan-glow/10",
    className
  );

  const content = capable ? (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      <motion.div style={{ x: txtX, y: txtY }} className={classes}>
        {variant === "primary" && (
          <span
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full bg-cyan-glow blur-2xl opacity-40"
          />
        )}
        {children}
      </motion.div>
    </motion.div>
  ) : (
    <div className="inline-block">
      <div className={classes}>
        {variant === "primary" && (
          <span
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full bg-cyan-glow blur-2xl opacity-40"
          />
        )}
        {children}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} data-cursor="hover" className="inline-block">
        {content}
      </a>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      data-cursor="hover"
      className="inline-block"
    >
      {content}
    </button>
  );
}
