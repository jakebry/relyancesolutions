"use client";

import { motion } from "framer-motion";
import { team } from "@/lib/team";
import { SectionLabel } from "../ui/SectionLabel";
import { TextReveal } from "../ui/TextReveal";

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-cream text-ink"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 0%, #141212 0.5px, transparent 0.5px), radial-gradient(circle at 80% 100%, #141212 0.5px, transparent 0.5px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <SectionLabel number="04" label="About" invert />

        <div className="mt-12 grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <TextReveal
              as="h2"
              text="We take care of the web so you can take care of everything else."
              className="serif text-balance text-5xl font-medium leading-[1.0] tracking-tight text-ink md:text-7xl lg:text-[5.5rem]"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-12 flex items-center gap-4"
            >
              <span className="h-px w-12 bg-ink/40" />
              <span className="mono text-[10px] tracking-[0.2em] text-ink/60">
                Est. 2025 — Two co-founders, one mission
              </span>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="serif text-xl leading-relaxed text-ink/80 md:text-2xl"
            >
              Relyance was founded by two people who got tired of watching good businesses
              lose customers to bad websites. We build, we host, we maintain — and we pick
              up the phone when something breaks.
            </motion.p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {team.map((person, i) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: i * 0.1,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex items-start gap-5 rounded-xl border border-ink/15 bg-gradient-to-br from-ink/[0.04] to-transparent p-5 transition-colors hover:border-ink/30"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-ink/15 bg-ink/[0.03]">
                <CircuitAvatar initials={person.initials} />
              </div>
              <div className="min-w-0 flex-1 pt-1">
                <div className="mono text-[10px] tracking-[0.2em] text-ink/60">
                  Co-Founder · {(i + 1).toString().padStart(2, "0")}
                </div>
                <h3 className="serif mt-2 text-2xl font-semibold leading-tight text-ink md:text-3xl">
                  {person.name}
                </h3>
                <div className="mono mt-1.5 text-[10.5px] text-ink/70">
                  {person.role}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">
                  {person.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-void"
      />
    </section>
  );
}

function CircuitAvatar({ initials }: { initials: string }) {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 400 500"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={`grad-${initials}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2D6CFF" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#4FC3FF" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Background circuit traces */}
      <g stroke="#141212" strokeWidth="0.6" opacity="0.15">
        <path d="M20 80 H140 L160 100 V180" />
        <path d="M380 40 H260 L240 60 V160" />
        <path d="M20 460 H100 L120 440 V340" />
        <path d="M380 480 H300 L280 460 V380" />
        <path d="M20 260 H80" />
        <path d="M320 260 H380" />
        <circle cx="140" cy="80" r="2" fill="#141212" />
        <circle cx="260" cy="40" r="2" fill="#141212" />
        <circle cx="100" cy="460" r="2" fill="#141212" />
        <circle cx="300" cy="480" r="2" fill="#141212" />
      </g>

      {/* Silhouette (head + shoulders) */}
      <g>
        <circle
          cx="200"
          cy="190"
          r="70"
          stroke={`url(#grad-${initials})`}
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M80 460 C80 370, 130 300, 200 300 C270 300, 320 370, 320 460"
          stroke={`url(#grad-${initials})`}
          strokeWidth="2.5"
          fill="none"
        />
        <circle cx="200" cy="190" r="70" fill="#141212" opacity="0.04" />
        <path
          d="M80 460 C80 370, 130 300, 200 300 C270 300, 320 370, 320 460"
          fill="#141212"
          opacity="0.04"
        />
        {/* Circuit nodes on silhouette */}
        <circle cx="170" cy="170" r="2.5" fill="#2D6CFF" />
        <circle cx="230" cy="170" r="2.5" fill="#2D6CFF" />
        <circle cx="200" cy="220" r="2.5" fill="#2D6CFF" />
        <circle cx="140" cy="380" r="2.5" fill="#4FC3FF" />
        <circle cx="260" cy="380" r="2.5" fill="#4FC3FF" />
        <path
          d="M170 170 L200 220 L230 170"
          stroke="#2D6CFF"
          strokeWidth="1"
          opacity="0.6"
        />
      </g>

      {/* Initials */}
      <text
        x="200"
        y="200"
        textAnchor="middle"
        className="serif"
        fontFamily="Fraunces, serif"
        fontSize="64"
        fontWeight="600"
        fill="#141212"
        opacity="0.5"
      >
        {initials}
      </text>
    </svg>
  );
}
