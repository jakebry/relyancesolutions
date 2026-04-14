"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MagneticButton } from "../ui/MagneticButton";
import { ArrowRight } from "lucide-react";

const HeroShader = dynamic(
  () => import("../effects/HeroShader").then((m) => m.HeroShader),
  { ssr: false }
);

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <HeroShader />
      </div>
      <div aria-hidden className="absolute inset-0 bg-grid opacity-[0.12]" />
      <div className="noise" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-void"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start gap-8 px-6 pt-36 pb-24 md:px-10 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mono flex items-center gap-3 text-[11px] text-slate-muted"
        >
          <span className="h-px w-10 bg-cyan-glow/60" />
          <span className="text-cyan-glow">00</span>
          <span className="opacity-60">/</span>
          <span>Relyance Solutions</span>
        </motion.div>

        <h1 className="display text-balance text-6xl font-semibold leading-[0.92] tracking-[-0.035em] text-platinum sm:text-7xl md:text-[7.5rem] lg:text-[9rem]">
          <SplitLine delay={0.1}>We build</SplitLine>
          <SplitLine delay={0.25}>
            the <span className="italic text-cyan-glow">web.</span>
          </SplitLine>
          <SplitLine delay={0.45}>You run your</SplitLine>
          <SplitLine delay={0.6}>business.</SplitLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl text-pretty text-lg leading-relaxed text-slate-muted md:text-xl"
        >
          Websites, hosting, email, security — handled. Every pixel and every packet,
          designed and defended by humans who actually care.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-4"
        >
          <MagneticButton href="#contact" variant="primary">
            Start Your Site <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton href="#services" variant="ghost">
            What We Do
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1.2 }}
          className="mono absolute bottom-10 left-6 flex items-center gap-3 text-[10px] text-slate-muted md:left-10"
        >
          <div className="relative h-10 w-px bg-cyan-glow/30 overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-3 animate-[drift_2.4s_ease-in-out_infinite] bg-cyan-glow" />
          </div>
          Scroll to explore
        </motion.div>
      </div>
    </section>
  );
}

function SplitLine({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ delay, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}
