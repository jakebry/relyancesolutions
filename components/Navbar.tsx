"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/cn";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#stack", label: "Stack" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "backdrop-blur-md" : ""
      )}
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          scrolled
            ? "bg-void/60 border-b border-cyan-glow/10 opacity-100"
            : "opacity-0"
        )}
      />
      <nav className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <a
          href="#top"
          className="flex items-center gap-3"
          data-cursor="hover"
        >
          <Image
            src="/logo.png"
            alt="Relyance Solutions"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
            priority
          />
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="mono group relative text-[11px] text-slate-muted transition-colors hover:text-platinum"
                data-cursor="hover"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-cyan-glow transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="mono relative hidden rounded-full border border-cyan-glow/40 bg-cyan-glow/10 px-5 py-2.5 text-[11px] text-platinum transition hover:bg-cyan-glow/20 md:inline-block"
          data-cursor="hover"
        >
          Start Your Site
        </a>

        <button
          onClick={() => setOpen((o) => !o)}
          className="relative h-10 w-10 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={cn(
              "absolute left-1/2 top-1/2 block h-px w-6 -translate-x-1/2 bg-platinum transition-all duration-300",
              open ? "rotate-45" : "-translate-y-1.5"
            )}
          />
          <span
            className={cn(
              "absolute left-1/2 top-1/2 block h-px w-6 -translate-x-1/2 bg-platinum transition-all duration-300",
              open ? "-rotate-45" : "translate-y-1.5"
            )}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col bg-void/95 px-6 backdrop-blur-xl md:hidden"
          >
            <ul className="mt-28 flex flex-col items-center gap-7">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="display text-4xl font-semibold tracking-tight text-platinum"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.06 + 0.05 }}
              className="mt-auto mb-12 flex flex-col items-center gap-5"
            >
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mono inline-flex min-h-[52px] items-center justify-center rounded-full bg-cyan-glow px-8 py-3 text-[12px] font-medium text-void touch-manipulation"
              >
                Start Your Site
              </a>
              <a
                href="mailto:sales@relyancesolutions.com"
                onClick={() => setOpen(false)}
                className="mono text-[11px] text-slate-muted transition-colors hover:text-cyan-glow"
              >
                sales@relyancesolutions.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
