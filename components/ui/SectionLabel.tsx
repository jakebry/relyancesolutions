"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  number: string;
  label: string;
  className?: string;
  invert?: boolean;
};

export function SectionLabel({ number, label, className, invert }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mono flex items-center gap-3 text-xs tracking-[0.2em]",
        invert ? "text-ink/60" : "text-slate-muted",
        className
      )}
    >
      <span
        className={cn(
          "h-px w-10",
          invert ? "bg-ink/40" : "bg-cyan-glow/60"
        )}
      />
      <span className={invert ? "text-ink" : "text-cyan-glow"}>{number}</span>
      <span className="opacity-60">/</span>
      <span>{label}</span>
    </motion.div>
  );
}
