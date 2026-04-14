"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/lib/process";
import { SectionLabel } from "../ui/SectionLabel";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Process() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const mq = window.matchMedia("(min-width: 768px)");
    let trigger: ScrollTrigger | undefined;

    function create() {
      const distance = track!.scrollWidth - window.innerWidth;
      if (distance <= 0) return;

      const tween = gsap.to(track, {
        x: -distance,
        ease: "none",
      });

      trigger = ScrollTrigger.create({
        animation: tween,
        trigger: wrapper,
        start: "top top",
        end: () => `+=${distance}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      });
    }

    function destroy() {
      trigger?.kill();
      trigger = undefined;
      gsap.set(track, { clearProps: "all" });
    }

    if (mq.matches) create();

    const onChange = (e: MediaQueryListEvent) => {
      destroy();
      if (e.matches) create();
    };
    mq.addEventListener("change", onChange);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("resize", onResize);
      destroy();
    };
  }, []);

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-surface py-32 md:py-0"
    >
      <div aria-hidden className="absolute inset-0 bg-grid-sm opacity-[0.06]" />

      <div
        ref={wrapperRef}
        className="relative md:h-screen md:min-h-[720px]"
      >
        <div className="relative mx-auto max-w-7xl px-6 pt-10 md:px-10 md:pt-24">
          <SectionLabel number="02" label="Process" />
          <h2 className="display mt-8 max-w-3xl text-balance text-5xl font-semibold leading-[0.95] tracking-tight text-platinum md:text-7xl">
            Four steps. Zero surprises.
          </h2>
          <p className="mt-6 max-w-lg text-slate-muted">
            From first call to fully-managed site. We take the wheel, you take the credit.
          </p>
        </div>

        <div className="relative mt-12 md:mt-20 md:overflow-hidden">
          <div
            ref={trackRef}
            className="flex flex-col gap-6 px-6 md:flex-row md:gap-0 md:px-0 md:pl-[8vw] md:pr-[8vw] md:w-max md:will-change-transform"
          >
            {processSteps.map((step, i) => (
              <ProcessCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-void"
        />
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
  const isLast = index === processSteps.length - 1;
  return (
    <div className="relative md:mr-8 md:w-[min(42rem,80vw)] md:shrink-0">
      <div className="relative overflow-hidden rounded-2xl border border-cyan-glow/15 bg-gradient-to-br from-white/[0.04] to-transparent p-8 md:min-h-[30rem] md:p-12">
        <div className="flex items-start justify-between gap-6">
          <span className="display text-[6rem] font-semibold leading-none tracking-tight text-cyan-glow/90 md:text-[9rem]">
            {step.number}
          </span>
          <span className="mono mt-4 text-[10px] text-slate-muted">
            Step {index + 1} of {processSteps.length}
          </span>
        </div>

        <h3 className="display mt-6 text-3xl font-semibold tracking-tight text-platinum md:text-5xl">
          {step.title}
        </h3>
        <p className="mt-4 max-w-md text-slate-muted md:text-lg">
          {step.description}
        </p>

        <ul className="mt-8 space-y-3">
          {step.details.map((d) => (
            <li
              key={d}
              className="flex items-start gap-3 text-sm text-slate-muted"
            >
              <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-glow shadow-[0_0_8px_rgba(79,195,255,0.8)]" />
              {d}
            </li>
          ))}
        </ul>

        <div
          aria-hidden
          className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-cyan-glow/10 blur-[80px]"
        />
      </div>

      {!isLast && (
        <div
          aria-hidden
          className="hidden md:absolute md:top-1/2 md:-right-8 md:flex md:h-px md:w-16 md:-translate-y-1/2 md:items-center md:bg-cyan-glow/40"
        >
          <div className="ml-auto h-2 w-2 rotate-45 border-t border-r border-cyan-glow" />
        </div>
      )}
    </div>
  );
}
