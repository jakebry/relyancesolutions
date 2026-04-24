import { LogoMark } from "./LogoMark";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#stack", label: "Stack" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
  { href: "/pricing", label: "Pricing" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-cyan-glow/10 bg-void">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/40 to-transparent" />
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 md:px-10">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <LogoMark className="h-10 w-10" />
            <div>
              <div className="display text-2xl font-semibold tracking-tight text-platinum">
                Relyance<span className="text-cyan-glow">.</span>
              </div>
              <div className="mono mt-1 text-[10px] text-slate-muted">
                Websites · Hosting · Email · Security
              </div>
            </div>
          </div>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="mono text-[11px] text-slate-muted transition-colors hover:text-cyan-glow"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-cyan-glow/10 pt-8 text-[11px] text-slate-muted md:flex-row md:items-center">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
            <span className="mono">© {year} Relyance Solutions. All rights reserved.</span>
            <a
              href="mailto:sales@relyancesolutions.com"
              className="mono text-slate-muted transition-colors hover:text-cyan-glow"
            >
              sales@relyancesolutions.com
            </a>
          </div>
          <span className="mono">Crafted pixel by pixel. Monitored 24/7.</span>
        </div>
      </div>
    </footer>
  );
}
