"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/lib/process";
import { SectionLabel } from "../ui/SectionLabel";
import { TextReveal } from "../ui/TextReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Process() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const grid = gridRef.current;
    const progress = progressRef.current;
    if (!wrapper || !grid || !progress) return;

    const cards = Array.from(
      grid.querySelectorAll<HTMLDivElement>("[data-step]")
    );

    const mq = window.matchMedia("(min-width: 768px)");
    let ctx: gsap.Context | undefined;

    function create() {
      ctx = gsap.context(() => {
        gsap.set(cards, { opacity: 0, y: 60, filter: "blur(8px)" });
        gsap.set(progress, { scaleX: 0, transformOrigin: "left" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: "+=650",
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(progress, { scaleX: 1, duration: 1, ease: "none" }, 0);

        cards.forEach((card, i) => {
          tl.to(
            card,
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.4,
              ease: "power2.out",
            },
            i * 0.22
          );
        });
      }, wrapper ?? undefined);
    }

    function destroy() {
      ctx?.revert();
      ctx = undefined;
      gsap.set(cards, { clearProps: "all" });
      gsap.set(progress, { clearProps: "all" });
    }

    if (mq.matches) create();

    const onChange = (e: MediaQueryListEvent) => {
      destroy();
      if (e.matches) create();
    };
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      destroy();
    };
  }, []);

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-surface"
    >
      <div aria-hidden className="absolute inset-0 bg-grid-sm opacity-[0.05]" />

      <div
        ref={wrapperRef}
        className="relative py-24 md:flex md:h-screen md:min-h-[720px] md:flex-col md:justify-center md:py-0"
      >
        <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel number="02" label="Process" />
              <TextReveal
                as="h2"
                text="Four steps. Zero surprises."
                className="display mt-8 max-w-3xl text-balance text-4xl font-semibold leading-[0.95] tracking-tight text-platinum md:text-6xl lg:text-7xl"
              />
            </div>
            <p className="max-w-sm text-pretty text-slate-muted">
              From first call to fully-managed site. We take the wheel, you take the credit.
            </p>
          </div>

          <div className="relative mt-14 h-px w-full overflow-hidden bg-cyan-glow/15 md:mt-16">
            <div
              ref={progressRef}
              className="h-full w-full origin-left bg-gradient-to-r from-cyan-glow via-blue-deep to-cyan-glow shadow-[0_0_16px_rgba(79,195,255,0.6)]"
            />
          </div>

          <div
            ref={gridRef}
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-14 md:grid-cols-4 md:gap-4"
          >
            {processSteps.map((step, i) => (
              <ProcessCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessCard({
  step,
  index,
}: {
  step: (typeof processSteps)[number];
  index: number;
}) {
  return (
    <div
      data-step
      className="group relative flex flex-col rounded-2xl border border-cyan-glow/15 bg-gradient-to-br from-white/[0.04] to-transparent p-6 transition-colors hover:border-cyan-glow/40 md:p-7"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/60 to-transparent opacity-70"
      />

      <div className="flex items-baseline justify-between">
        <span className="display text-5xl font-semibold leading-none tracking-tight text-cyan-glow/90 md:text-6xl">
          {step.number}
        </span>
        <span className="mono text-[10px] text-slate-muted">
          {index + 1} / {4}
        </span>
      </div>

      <h3 className="display mt-6 text-xl font-semibold leading-tight tracking-tight text-platinum md:text-2xl">
        {step.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-muted">
        {step.description}
      </p>

      <ul className="mt-6 space-y-2.5 border-t border-cyan-glow/10 pt-5">
        {step.details.map((d) => (
          <li
            key={d}
            className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-slate-muted"
          >
            <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-cyan-glow shadow-[0_0_6px_rgba(79,195,255,0.8)]" />
            {d}
          </li>
        ))}
      </ul>

      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -bottom-16 h-40 w-40 rounded-full bg-cyan-glow/10 blur-[70px] opacity-60 transition-opacity group-hover:opacity-100"
      />
    </div>
  );
}
