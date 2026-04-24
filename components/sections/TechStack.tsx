"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  featuredStack,
  stack,
  stackCategories,
  type TechItem,
} from "@/lib/stack";
import { SectionLabel } from "../ui/SectionLabel";
import { Marquee } from "../ui/Marquee";
import { TextReveal } from "../ui/TextReveal";

function FeaturedChip({ item }: { item: TechItem }) {
  return (
    <div
      className="mono inline-flex items-center gap-2 rounded-full border border-cyan-glow/30 bg-cyan-glow/[0.06] px-4 py-2 text-[11px] text-platinum transition-colors hover:border-cyan-glow/60 hover:bg-cyan-glow/15"
      data-cursor="hover"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow shadow-[0_0_6px_rgba(79,195,255,0.8)]" />
      {item.name}
    </div>
  );
}

function MarqueeChip({ item }: { item: TechItem }) {
  return (
    <div
      className="mono flex items-center gap-2 rounded-full border border-cyan-glow/15 bg-white/[0.02] px-5 py-2.5 text-[11px] text-slate-muted transition-colors hover:border-cyan-glow/50 hover:text-platinum"
      data-cursor="hover"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow/50" />
      {item.name}
    </div>
  );
}

function CategoryChip({ name }: { name: string }) {
  return (
    <span
      className="mono inline-flex items-center gap-2 rounded-full border border-cyan-glow/20 bg-white/[0.02] px-3.5 py-1.5 text-[11px] text-slate-muted transition-all duration-300 hover:-translate-y-px hover:border-cyan-glow/60 hover:bg-cyan-glow/10 hover:text-platinum"
      data-cursor="hover"
    >
      <span className="h-1 w-1 rounded-full bg-cyan-glow/60" />
      {name}
    </span>
  );
}

export function TechStack() {
  const [expanded, setExpanded] = useState(false);
  const frontend = stack.filter((s) => s.category === "Frontend");
  const backend = stack.filter((s) => s.category === "Backend");

  return (
    <section
      id="stack"
      className="relative overflow-hidden bg-void py-20 md:py-28"
    >
      <div aria-hidden className="absolute inset-0 bg-grid opacity-[0.05]" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <SectionLabel number="03" label="Stack" />
          <TextReveal
            as="h2"
            text="We speak every dialect of the internet."
            className="display mt-8 max-w-4xl text-balance text-4xl font-semibold leading-[0.98] tracking-tight text-platinum md:text-6xl lg:text-7xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-slate-muted md:text-lg"
          >
            React, Rust, Postgres, Vercel, and forty-something other friends. We pick
            the right tool for your job — never the trendy one.
          </motion.p>
        </div>

        {/* Featured headliners — the "what we reach for most" strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-12 flex flex-wrap justify-center gap-2.5 md:mt-14 md:gap-3"
        >
          {featuredStack.map((item) => (
            <FeaturedChip key={item.name} item={item} />
          ))}
        </motion.div>
      </div>

      {/* Decorative marquees — same full frontend + backend lists */}
      <div className="relative mt-14 space-y-4 md:mt-16">
        <Marquee
          items={frontend.map((t) => (
            <MarqueeChip key={t.name} item={t} />
          ))}
          speed={50}
        />
        <Marquee
          items={backend.map((t) => (
            <MarqueeChip key={t.name} item={t} />
          ))}
          reverse
          speed={60}
        />
      </div>

      {/* See full stack toggle */}
      <div className="relative mx-auto mt-12 flex max-w-6xl justify-center px-6 md:mt-14 md:px-10">
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          aria-controls="stack-full-breakdown"
          data-cursor="hover"
          className="mono group inline-flex min-h-[44px] items-center gap-3 rounded-full border border-cyan-glow/30 bg-cyan-glow/[0.04] px-6 py-3 text-[11px] text-platinum transition-all hover:border-cyan-glow/60 hover:bg-cyan-glow/10 touch-manipulation"
        >
          <span>{expanded ? "Collapse stack" : "See full stack"}</span>
          <ChevronDown
            className={`h-3.5 w-3.5 text-cyan-glow transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
            strokeWidth={2.5}
          />
        </button>
      </div>

      {/* Expanded category breakdown */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id="stack-full-breakdown"
            key="full-stack"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden"
          >
            <div className="relative mx-auto mt-10 max-w-6xl px-6 md:mt-14 md:px-10">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-16 md:gap-y-10">
                {stackCategories.map((cat, ci) => {
                  const items = stack.filter((s) => s.category === cat);
                  return (
                    <motion.div
                      key={cat}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.1 + ci * 0.06,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="relative border-t border-cyan-glow/10 pt-6"
                    >
                      <div className="mb-4 flex items-baseline justify-between gap-4">
                        <div className="flex items-baseline gap-3">
                          <span className="mono text-[11px] text-cyan-glow">
                            {(ci + 1).toString().padStart(2, "0")}
                          </span>
                          <h3 className="display text-xl font-semibold tracking-tight text-platinum md:text-2xl">
                            {cat}
                          </h3>
                        </div>
                        <span className="mono text-[10px] text-slate-muted">
                          {items.length}{" "}
                          {items.length === 1 ? "tool" : "tools"}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {items.map((item) => (
                          <CategoryChip key={item.name} name={item.name} />
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
