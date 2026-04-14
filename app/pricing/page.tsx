import type { Metadata } from "next";
import { LogoMark } from "@/components/LogoMark";

export const metadata: Metadata = {
  title: "Pricing — Relyance Solutions",
  description: "Transparent, all-in-one pricing for websites, hosting, email, and support.",
};

export default function Pricing() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-void">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-[0.08]" />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/3 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-cyan-glow/10 blur-[160px]"
      />
      <div className="relative mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center px-6 py-40 text-center md:px-10">
        <LogoMark className="h-16 w-16" animated />
        <div className="mono mt-12 flex items-center gap-3 text-[11px] text-slate-muted">
          <span className="h-px w-10 bg-cyan-glow/60" />
          <span className="text-cyan-glow">06</span>
          <span className="opacity-60">/</span>
          <span>Pricing</span>
        </div>
        <h1 className="display mt-8 text-balance text-6xl font-semibold leading-[0.95] tracking-tight text-platinum md:text-8xl">
          Transparent pricing.
          <br />
          <span className="italic text-cyan-glow">Coming soon.</span>
        </h1>
        <p className="mt-8 max-w-xl text-pretty text-lg text-slate-muted">
          We're finalizing our packages. In the meantime, reach out — we'll put together
          a quote tailored to your project within one business day.
        </p>
        <a
          href="/#contact"
          className="mono mt-12 rounded-full border border-cyan-glow/40 bg-cyan-glow/10 px-8 py-4 text-[11px] text-platinum transition hover:bg-cyan-glow/20"
          data-cursor="hover"
        >
          Get a custom quote →
        </a>
      </div>
    </main>
  );
}
