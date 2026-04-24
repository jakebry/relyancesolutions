"use client";

import { motion } from "framer-motion";
import { services, type Service } from "@/lib/services";
import { SectionLabel } from "../ui/SectionLabel";
import { TextReveal } from "../ui/TextReveal";
import { ArrowUpRight } from "lucide-react";

const sizeSpans: Record<Service["size"], string> = {
  lg: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  md: "sm:col-span-1 lg:col-span-2 lg:row-span-1",
  sm: "sm:col-span-1 lg:col-span-1 lg:row-span-1",
};

const lgPadding: Record<Service["size"], string> = {
  lg: "lg:p-7 xl:p-8",
  md: "lg:p-5 xl:p-6",
  sm: "lg:p-5",
};

export function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-void py-20 md:py-28"
    >
      <div aria-hidden className="absolute inset-0 bg-grid opacity-[0.05]" />
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-cyan-glow/10 blur-[160px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col items-start md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="max-w-3xl">
            <SectionLabel number="01" label="Services" />
            <TextReveal
              as="h2"
              text="Everything your website needs."
              className="display mt-6 text-balance text-4xl font-semibold leading-[0.98] tracking-tight text-platinum md:text-6xl lg:text-7xl"
            />
            <TextReveal
              as="p"
              text="None of the things it doesn't."
              className="display mt-2 text-balance text-3xl font-semibold leading-[0.98] tracking-tight text-cyan-glow/80 md:text-5xl lg:text-6xl"
              delay={0.1}
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-6 max-w-xs text-pretty text-sm leading-relaxed text-slate-muted md:mt-0 md:text-base"
          >
            We don't sell features. We sell peace of mind — and a website that
            actually works, every day, forever.
          </motion.p>
        </div>

        <div
          className="mt-10 grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 md:mt-14 md:gap-4 lg:grid-cols-4"
          style={{ gridAutoFlow: "dense" }}
        >
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: Math.min(i * 0.05, 0.35),
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group relative flex overflow-hidden rounded-2xl border border-cyan-glow/15 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 transition-all duration-500 hover:border-cyan-glow/40 hover:from-cyan-glow/[0.06] lg:flex-col ${sizeSpans[s.size]} ${lgPadding[s.size]}`}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/50 to-transparent opacity-60 transition-opacity group-hover:opacity-100"
                />

                {/* Mobile/tablet: icon left · text right. Desktop (lg+): icon top, text below. */}
                <div className="flex w-full items-start gap-4 lg:block">
                  <div
                    className={`flex shrink-0 items-center justify-center rounded-xl border border-cyan-glow/20 bg-cyan-glow/[0.04] text-cyan-glow transition-all duration-500 group-hover:border-cyan-glow/60 group-hover:bg-cyan-glow/10 group-hover:shadow-[0_0_24px_rgba(79,195,255,0.3)] h-11 w-11 ${s.size === "lg" ? "lg:h-14 lg:w-14" : s.size === "md" ? "lg:h-11 lg:w-11" : "lg:h-10 lg:w-10"}`}
                  >
                    <Icon
                      className={`h-4 w-4 ${s.size === "lg" ? "lg:h-6 lg:w-6" : "lg:h-5 lg:w-5"}`}
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col lg:mt-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3
                        className={`display font-semibold leading-tight tracking-tight text-platinum text-base ${
                          s.size === "lg"
                            ? "lg:text-2xl xl:text-3xl"
                            : s.size === "md"
                              ? "lg:text-lg xl:text-xl"
                              : "lg:text-base xl:text-lg"
                        }`}
                      >
                        {s.title}
                      </h3>
                      <span className="mono shrink-0 text-[10px] text-slate-muted/80">
                        {(i + 1).toString().padStart(2, "0")}
                      </span>
                    </div>

                    {/* Mobile/tablet copy — the compact one-liner */}
                    {s.size !== "sm" && (
                      <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-muted lg:hidden">
                        {s.short}
                      </p>
                    )}

                    {/* Desktop copy — full description on lg, short on md, nothing on sm */}
                    {s.size === "lg" && (
                      <p className="mt-3 hidden text-[15px] leading-relaxed text-slate-muted lg:block">
                        {s.description}
                      </p>
                    )}
                    {s.size === "md" && (
                      <p className="mt-2 hidden text-[13px] leading-relaxed text-slate-muted lg:block">
                        {s.short}
                      </p>
                    )}

                    {s.size === "lg" && (
                      <div className="mono mt-auto hidden items-center gap-2 pt-6 text-[11px] text-cyan-glow/80 lg:flex">
                        <span>Learn more</span>
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    )}
                  </div>
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
    </section>
  );
}
