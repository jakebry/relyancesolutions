"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/services";
import { SectionLabel } from "../ui/SectionLabel";
import { TextReveal } from "../ui/TextReveal";

export function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-void py-24 md:py-28"
    >
      <div aria-hidden className="absolute inset-0 bg-grid opacity-[0.05]" />
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-cyan-glow/10 blur-[160px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <SectionLabel number="01" label="Services" />
          <TextReveal
            as="h2"
            text="Everything your website needs. None of the things it doesn't."
            className="display mt-8 max-w-4xl text-balance text-4xl font-semibold leading-[0.98] tracking-tight text-platinum md:text-6xl lg:text-7xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-slate-muted md:text-lg"
          >
            We don't sell features. We sell peace of mind — and a website that actually
            works, every day, forever.
          </motion.p>
        </div>

        <div className="relative mt-20 border-y border-cyan-glow/10">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-cyan-glow/10 md:block"
          />
          <div className="grid grid-cols-1 md:grid-cols-2">
            {services.map((s, i) => {
              const Icon = s.icon;
              const isLastRow = i >= services.length - 2;
              const isLeftCol = i % 2 === 0;
              return (
                <motion.article
                  key={s.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    delay: (i % 2) * 0.08,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`group relative flex gap-6 px-4 py-10 transition-colors hover:bg-cyan-glow/[0.02] md:px-8 md:py-12 ${
                    !isLastRow ? "border-b border-cyan-glow/10" : ""
                  } ${isLeftCol && !isLastRow ? "md:border-b" : ""} ${
                    !isLeftCol && i < services.length - 1
                      ? "md:border-b md:border-b-cyan-glow/10"
                      : ""
                  }`}
                >
                  <div className="relative shrink-0">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-glow/20 bg-cyan-glow/[0.04] text-cyan-glow transition-all duration-500 group-hover:border-cyan-glow/60 group-hover:bg-cyan-glow/10 group-hover:shadow-[0_0_24px_rgba(79,195,255,0.3)]">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="display text-xl font-semibold leading-tight tracking-tight text-platinum md:text-2xl">
                        {s.title}
                      </h3>
                      <span className="mono shrink-0 text-[10px] text-slate-muted">
                        {(i + 1).toString().padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-muted">
                      {s.description}
                    </p>
                  </div>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-cyan-glow/60 to-transparent transition-all duration-700 group-hover:w-full"
                  />
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
