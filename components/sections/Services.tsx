"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/services";
import { SectionLabel } from "../ui/SectionLabel";
import { GlassCard } from "../ui/GlassCard";
import { TextReveal } from "../ui/TextReveal";

export function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-void py-24 md:py-28"
    >
      <div aria-hidden className="absolute inset-0 bg-grid opacity-[0.06]" />
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-cyan-glow/10 blur-[160px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <SectionLabel number="01" label="Services" />
        <div className="mt-8 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <TextReveal
            as="h2"
            text="Everything your website needs. None of the things it doesn't."
            className="display max-w-3xl text-balance text-5xl font-semibold leading-[0.95] tracking-tight text-platinum md:text-7xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-sm text-slate-muted"
          >
            We don't sell features. We sell peace of mind — and a website that actually works,
            every day, forever.
          </motion.p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: (i % 4) * 0.06,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <GlassCard className="flex h-full min-h-[16rem] flex-col justify-between p-7">
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-glow/20 bg-cyan-glow/5 text-cyan-glow transition-all group-hover:border-cyan-glow/60 group-hover:shadow-[0_0_24px_rgba(79,195,255,0.3)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="mono text-[10px] text-slate-muted">
                      0{i + 1 > 9 ? "" : ""}{(i + 1).toString().padStart(2, "0")}
                    </span>
                  </div>
                  <div className="relative z-10 mt-8 flex-1">
                    <h3 className="display text-xl font-semibold tracking-tight text-platinum">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-muted">
                      {s.description}
                    </p>
                  </div>
                  <div
                    aria-hidden
                    className="mt-8 h-px w-full bg-gradient-to-r from-cyan-glow/30 via-cyan-glow/10 to-transparent opacity-40 transition-opacity group-hover:opacity-100"
                  />
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
