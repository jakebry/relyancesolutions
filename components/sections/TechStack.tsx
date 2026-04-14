"use client";

import { motion } from "framer-motion";
import { stack, stackCategories, type TechItem } from "@/lib/stack";
import { SectionLabel } from "../ui/SectionLabel";
import { Marquee } from "../ui/Marquee";
import { TextReveal } from "../ui/TextReveal";

function TechChip({ item }: { item: TechItem }) {
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
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mono inline-flex items-center gap-2 rounded-full border border-cyan-glow/20 bg-white/[0.02] px-4 py-2 text-[11px] text-slate-muted transition-all duration-300 hover:-translate-y-px hover:border-cyan-glow/60 hover:bg-cyan-glow/10 hover:text-platinum hover:shadow-[0_0_16px_rgba(79,195,255,0.25)]"
      data-cursor="hover"
    >
      <span className="h-1 w-1 rounded-full bg-cyan-glow/60" />
      {name}
    </motion.span>
  );
}

export function TechStack() {
  const frontend = stack.filter((s) => s.category === "Frontend");
  const backend = stack.filter((s) => s.category === "Backend");

  return (
    <section
      id="stack"
      className="relative overflow-hidden bg-void py-24 md:py-28"
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
            className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-slate-muted md:text-lg"
          >
            React, Rust, Postgres, Vercel, and forty-something other friends. We pick
            the right tool for your job — never the trendy one.
          </motion.p>
        </div>
      </div>

      <div className="relative mt-16 space-y-5">
        <Marquee
          items={frontend.map((t) => (
            <TechChip key={t.name} item={t} />
          ))}
          speed={60}
        />
        <Marquee
          items={backend.map((t) => (
            <TechChip key={t.name} item={t} />
          ))}
          reverse
          speed={70}
        />
      </div>

      <div className="relative mx-auto mt-20 max-w-6xl px-6 md:px-10">
        <div className="space-y-10">
          {stackCategories.map((cat, ci) => {
            const items = stack.filter((s) => s.category === cat);
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: ci * 0.05,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative border-t border-cyan-glow/10 pt-8"
              >
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
                  <div className="flex items-baseline gap-4">
                    <span className="mono text-[11px] text-cyan-glow">
                      {(ci + 1).toString().padStart(2, "0")}
                    </span>
                    <h3 className="display text-2xl font-semibold tracking-tight text-platinum md:text-3xl">
                      {cat}
                    </h3>
                  </div>
                  <div className="mono flex items-center gap-3 text-[10px] text-slate-muted">
                    <span className="h-px w-10 bg-cyan-glow/30" />
                    <span>
                      {items.length} {items.length === 1 ? "tool" : "tools"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <CategoryChip key={item.name} name={item.name} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
