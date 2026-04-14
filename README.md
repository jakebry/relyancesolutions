# Relyance Solutions

> We build the web. You run your business.

The marketing site for **Relyance Solutions** — a tech firm that designs, builds, hosts, and maintains websites for businesses. Websites, hosting, email, security — handled. Every pixel and every packet.

This repo is the landing page itself: a high-animation, WebGL-powered, editorial-meets-cyber Next.js build that doubles as a portfolio piece. The site you're looking at _is_ the product pitch.

---

## Live

**Production:** https://relyancesolutions-3qcm0aet8-jakebrys-projects.vercel.app

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@theme` token system) |
| Component motion | Framer Motion 12 |
| Scroll timelines | GSAP + ScrollTrigger |
| Smooth scroll | Lenis (driven off GSAP ticker) |
| 3D / shaders | React Three Fiber + Three.js (custom GLSL fbm) |
| Forms | React Hook Form + Zod |
| Icons | Lucide |
| Deploy | Vercel |

---

## What's in here

```
app/
  layout.tsx          fonts, Lenis root, custom cursor, nav + footer
  page.tsx            landing page composition
  pricing/page.tsx    coming-soon stub
  globals.css         Tailwind + design tokens + keyframes

components/
  Navbar.tsx          sticky nav, mobile overlay, frosted on scroll
  Footer.tsx
  LogoMark.tsx        custom circuit-R logo (inline SVG)
  sections/
    Hero.tsx          split-letter headline + WebGL background
    Services.tsx      10-card grid with tilt + spotlight
    Process.tsx       pinned horizontal scroll timeline (GSAP)
    TechStack.tsx     counter-scrolling marquees + category grid (55+ techs)
    About.tsx         editorial "cream flip" with circuit-silhouette team cards
    Contact.tsx       RHF + Zod form, conditional fields, fake submit
  ui/
    LenisProvider.tsx Lenis + GSAP ticker integration
    Cursor.tsx        custom blended cursor
    MagneticButton.tsx
    TextReveal.tsx    word-by-word entrance
    GlassCard.tsx     tilted glass surface with CSS-var spotlight
    SectionLabel.tsx  "01 / SERVICES" mono eyebrow
    Marquee.tsx       CSS-driven infinite marquee
  effects/
    HeroShader.tsx    R3F canvas + custom fbm noise shader

lib/
  services.ts   process.ts   stack.ts   team.ts   cn.ts

docs/
  superpowers/specs/2026-04-14-relyance-landing-design.md   design spec
```

---

## Design system

All tokens live in `app/globals.css` under `@theme`:

| Token | Hex | Use |
|---|---|---|
| `void` | `#05070E` | Page base |
| `surface` | `#0B1220` | Section alt |
| `steel` | `#1B2A4E` | Card backgrounds |
| `cyan-glow` | `#4FC3FF` | Primary glow, from the logo |
| `blue-deep` | `#2D6CFF` | Gradient stops, hover |
| `platinum` | `#E8F0FF` | Body text |
| `slate-muted` | `#8A9BB8` | Secondary text |
| `cream` | `#F5F1E8` | About section (editorial flip) |
| `ink` | `#141212` | Text on cream |

Fonts:

- **Space Grotesk** — display (H1/H2, `.display` class)
- **Fraunces** — editorial serif (About section only, `.serif` class)
- **Inter** — body
- **JetBrains Mono** — section labels and small mono UI (`.mono` class)

Motion:

- Default ease: `cubic-bezier(0.22, 1, 0.36, 1)` (expo-out)
- Lenis `lerp: 0.16`, `duration: 0.9`, integrated with GSAP ticker so pinned ScrollTrigger timelines stay in sync
- `prefers-reduced-motion` honored globally

---

## Performance notes

The hero shader is the most expensive thing on the page, so it earns its weight:

- 3-octave fbm (down from 5) with a single warp layer
- DPR capped at 1.0 — retina doesn't make fog any prettier
- `depth` / `stencil` buffers disabled
- Canvas `frameloop` flips to `"never"` when the hero scrolls out of view via `IntersectionObserver`

Elsewhere:

- `backdrop-blur` only on the navbar (small area, sparing use)
- Marquees are CSS-keyframe driven (no JS tick)
- GlassCard spotlight is a single gradient positioned by CSS variables fed from Framer Motion springs — no per-frame style writes
- Client bundles for the hero shader are lazy-split via `next/dynamic({ ssr: false })`

---

## Running locally

```bash
pnpm install
pnpm dev
```

The site runs at http://localhost:3000.

Type check and build:

```bash
pnpm build
```

---

## Deploying

The site is deployed to Vercel. To ship a new version:

```bash
vercel deploy --prod
```

Or push to `main` with the Vercel git integration enabled.

---

## What's stubbed

The contact form is frontend-only — it validates, shows success state, and `console.log`s the payload. There's a `TODO` in `components/sections/Contact.tsx` pointing at where to wire a real email backend (Resend + a Next route handler is the simplest path).

---

## Team

- **Jake Bryan** — Co-Founder & Lead Developer
- **Cameron Reehl** — Co-Founder, Sales & Client Relations

Built with a lot of care and an unreasonable amount of keyframes.
