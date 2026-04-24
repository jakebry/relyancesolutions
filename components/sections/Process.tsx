"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { processSteps } from "@/lib/process";
import { SectionLabel } from "../ui/SectionLabel";
import { TextReveal } from "../ui/TextReveal";

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  // Line fills as the section scrolls through the viewport, 0→1.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 70%"],
  });

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative overflow-hidden bg-surface py-20 md:py-28"
    >
      <div aria-hidden className="absolute inset-0 bg-grid-sm opacity-[0.05]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
          <div>
            <SectionLabel number="02" label="Process" />
            <TextReveal
              as="h2"
              text="Four steps. Zero surprises."
              className="display mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[0.95] tracking-tight text-platinum md:text-6xl lg:text-7xl"
            />
          </div>
          <p className="max-w-sm text-pretty text-sm leading-relaxed text-slate-muted md:text-base">
            From first call to fully-managed site. We take the wheel, you take
            the credit.
          </p>
        </div>

        {/* DESKTOP: horizontal timeline */}
        <div className="relative mt-16 hidden md:block">
          {/* The connecting line behind the nodes */}
          <div className="absolute inset-x-0 top-6 h-px">
            <div className="absolute inset-0 bg-cyan-glow/15" />
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              className="absolute inset-0 bg-gradient-to-r from-cyan-glow via-blue-deep to-cyan-glow shadow-[0_0_12px_rgba(79,195,255,0.6)]"
            />
          </div>

          <div className="relative grid grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex flex-col items-start"
              >
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-glow/40 bg-surface text-cyan-glow shadow-[0_0_24px_rgba(79,195,255,0.2)]">
                  <span className="mono text-[11px] font-medium tracking-wider">
                    {step.number}
                  </span>
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-full bg-cyan-glow/10"
                  />
                </div>

                <h3 className="display mt-6 text-xl font-semibold leading-tight tracking-tight text-platinum lg:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-2.5 max-w-[13rem] text-[13px] leading-relaxed text-slate-muted">
                  {step.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {step.details.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2 text-[12px] leading-relaxed text-slate-muted"
                    >
                      <span className="mt-[0.5em] h-1 w-1 shrink-0 rounded-full bg-cyan-glow/70 shadow-[0_0_6px_rgba(79,195,255,0.7)]" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* MOBILE: vertical timeline */}
        <div className="relative mt-12 md:hidden">
          <div className="relative">
            {/* Vertical line on the left */}
            <div
              aria-hidden
              className="absolute bottom-4 left-[22px] top-4 w-px bg-cyan-glow/20"
            />
            <motion.div
              aria-hidden
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "top" }}
              className="absolute bottom-4 left-[22px] top-4 w-px bg-gradient-to-b from-cyan-glow via-blue-deep to-cyan-glow shadow-[0_0_10px_rgba(79,195,255,0.5)]"
            />

            <ol className="space-y-10">
              {processSteps.map((step, i) => (
                <motion.li
                  key={step.number}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative flex gap-5"
                >
                  <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-glow/40 bg-surface text-cyan-glow shadow-[0_0_20px_rgba(79,195,255,0.2)]">
                    <span className="mono text-[10px] font-medium tracking-wider">
                      {step.number}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pb-1 pt-1">
                    <h3 className="display text-lg font-semibold leading-tight tracking-tight text-platinum">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-slate-muted">
                      {step.description}
                    </p>
                    <ul className="mt-3 space-y-1.5">
                      {step.details.map((d) => (
                        <li
                          key={d}
                          className="flex items-start gap-2 text-[12.5px] leading-relaxed text-slate-muted"
                        >
                          <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-cyan-glow/70" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
