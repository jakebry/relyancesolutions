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

export function TechStack() {
  const frontend = stack.filter((s) => s.category === "Frontend");
  const backend = stack.filter((s) => s.category === "Backend");

  return (
    <section
      id="stack"
      className="relative overflow-hidden bg-void py-24 md:py-28"
    >
      <div aria-hidden className="absolute inset-0 bg-grid opacity-[0.06]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <SectionLabel number="03" label="Stack" />
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <TextReveal
            as="h2"
            text="We speak every dialect of the internet."
            className="display max-w-3xl text-balance text-5xl font-semibold leading-[0.95] tracking-tight text-platinum md:text-7xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-sm text-slate-muted"
          >
            React, Rust, Postgres, Vercel, and forty-something other friends.
            We pick the right tool for your job — never the trendy one.
          </motion.p>
        </div>
      </div>

      <div className="relative mt-14 space-y-6">
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

      <div className="relative mx-auto mt-20 max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {stackCategories.map((cat, ci) => {
            const items = stack.filter((s) => s.category === cat);
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: ci * 0.08,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative rounded-xl border border-cyan-glow/10 bg-gradient-to-b from-white/[0.03] to-transparent p-6"
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/60 to-transparent"
                />
                <div className="mono mb-5 flex items-center justify-between text-[10px] text-slate-muted">
                  <span className="text-cyan-glow">0{ci + 1}</span>
                  <span>{cat}</span>
                </div>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center gap-2 text-sm text-slate-muted transition-colors hover:text-platinum"
                    >
                      <span className="h-px w-3 bg-cyan-glow/50" />
                      {item.name}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
