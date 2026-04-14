# Relyance Solutions — Landing Page Design

**Date:** 2026-04-14
**Owners:** Jake Bryan, Cameron Reehl
**Status:** Approved — implementation in progress

## Goal

Build the marketing landing page for Relyance Solutions — a tech firm that builds websites for businesses and manages their hosting, email, domains, security, backups, and tech support. The site itself is a portfolio piece: it must be unambiguously one of the most visually polished sites a prospect has ever landed on. Showcase what a top-class website builder can do.

## Tone & Aesthetic

**70% futuristic cyber-tech, 30% editorial magazine.** Primary surfaces are dark, glowing, animated, and precise. The About section flips to a warm cream editorial treatment to create contrast — the "magazine" moment.

## Tech Stack

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion (component) + GSAP ScrollTrigger (scroll timelines) + Lenis (smooth scroll)
- **3D / WebGL:** React Three Fiber + drei for hero background shader
- **Forms:** React Hook Form + Zod
- **Deploy target:** Vercel

## Visual System

### Palette
| Token | Hex | Use |
|---|---|---|
| `void` | `#05070E` | Page base |
| `surface` | `#0B1220` | Sections |
| `steel` | `#1B2A4E` | Cards, borders |
| `cyan` | `#4FC3FF` | Primary glow (logo blue) |
| `blue` | `#2D6CFF` | Gradient stops, hover |
| `platinum` | `#E8F0FF` | Body text |
| `slate` | `#8A9BB8` | Secondary text |
| `cream` | `#F5F1E8` | Editorial accent (About only) |
| `ink` | `#141212` | Text on cream |

### Typography
- **Display:** Space Grotesk (H1/H2, tight `-0.03em`)
- **Editorial serif:** Fraunces variable — About section + one pull quote only
- **Body:** Inter
- **Mono:** JetBrains Mono — section labels ("01 / SERVICES"), stack badges

### Motion Language
- Default ease: `cubic-bezier(0.22, 1, 0.36, 1)`
- Framer Motion springs: `{ stiffness: 300, damping: 20 }`
- Section entrances via GSAP ScrollTrigger with stagger
- Lenis for inertial smooth scroll
- Custom cursor with `mix-blend-mode: difference` that grows over interactive elements

## Page Structure

### Navbar
Sticky, transparent at top, frosted blur on scroll. Logo (R mark) + links (Services, Process, Stack, About, Contact) + CTA button ("Start Your Site"). Mobile: hamburger → full-screen overlay menu with staggered link reveal.

### 1. Hero (full viewport)
- **Background:** WebGL shader — animated gradient (void → deep blue) with soft noise and a slow-drifting particle field (R3F + custom GLSL or drei helpers). Subtle circuit-line SVG overlay at low opacity.
- **Foreground:**
  - Logo mark (small, top-left in navbar only — hero is pure type)
  - Eyebrow: `01 / RELYANCE SOLUTIONS` in mono
  - Headline: **"We build the web. You run your business."** (Space Grotesk, huge, split-letter entrance)
  - Sub: *Websites, hosting, email, security — handled. Every pixel and every packet.*
  - CTA: **Start Your Site** — magnetic hover, glowing border
  - Scroll cue at bottom

### 2. Services — `01 / SERVICES`
Grid of 10 service cards. Each card = icon (Lucide or custom SVG) + name + 1–2 sentence description. Glass-morphism surface with cyan border glow on hover, subtle 3D tilt (react tilt or Framer Motion), stagger-reveal on scroll.

**Services:**
1. Custom Website Design & Development
2. Website Hosting & Uptime
3. Business Email (Google Workspace / Microsoft 365)
4. Domain & DNS Management
5. Ongoing Maintenance & Updates
6. Tech Support
7. SEO & Analytics Setup
8. E-commerce Migration
9. Security & SSL
10. Automated Backups

### 3. Process — `02 / PROCESS`
Pinned scroll-driven horizontal timeline (GSAP ScrollTrigger). As user scrolls vertically, panels pan horizontally. 4 panels:

1. **Discovery Call** — we learn your business, audience, goals
2. **Design & Build** — mockups, iteration, pixel-perfect build
3. **Launch** — domain, hosting, email, DNS, SSL — we handle it
4. **Hands-Off Operations** — monitoring, backups, updates, support

Connecting animated circuit-line path between panels.

### 4. Tech Stack — `03 / STACK`
The flex section. 40+ tech logos in two counter-scrolling marquees (frontend row, backend row) plus a static grid below grouping by category (Frontend / Backend / Databases / Infra / Tooling). Logos desaturated by default, full color + glow on hover.

**Frontend:** React, Next.js, Vue, Nuxt, Svelte, SvelteKit, Angular, Astro, Remix, Solid, Qwik, TypeScript, Tailwind, Sass, Framer Motion, GSAP, Three.js, Vite, Webpack, HTML5, CSS3

**Backend:** Node.js, Bun, Deno, Express, Fastify, NestJS, Hono, Python, Django, FastAPI, Go, Rust, Ruby on Rails, PHP, Laravel, Java, Spring

**Databases:** PostgreSQL, MySQL, MongoDB, Redis, SQLite, Supabase, Firebase

**Infra / Hosting:** Vercel, Netlify, AWS, Cloudflare, Docker, GitHub Actions

**Services:** Stripe, Resend, Auth0, Clerk

### 5. About — `04 / ABOUT` (editorial flip)
Switches to `cream` background with `ink` text. Fraunces serif. Massive pull quote at top: *"We take care of the web so you can take care of everything else."* Two profile cards side-by-side:

- **Jake Bryan** — Co-Founder & Lead Developer
- **Cameron Reehl** — Co-Founder, Sales & Client Relations

Avatars: stylized circuit-silhouette SVGs (glowing outline of a head/shoulders with circuit traces, matching the logo). Placeholder bios I'll write, easy to swap later.

### 6. Contact — `05 / CONTACT`
Back to dark. Single centered form card.

**Fields:**
- `email` (required, email validation)
- `websiteUrl` (optional, URL validation) — hidden when checkbox is checked
- `noWebsiteYet` checkbox — when checked, replaces `websiteUrl` with `idea` textarea
- `idea` textarea — "Your idea" placeholder, only shown when `noWebsiteYet` is true
- Submit: **Send Signal** — loading state (cyan pulse) → success state (checkmark + "We'll be in touch")

**Validation:** React Hook Form + Zod. **Submission:** frontend-only — fake 1.2s await, then success state. Console-log the payload so Jake can verify during testing. Clear TODO comment pointing at where to wire a real email backend (Resend / Formspree / Next.js route handler).

### 7. Footer
Logo mark, copyright, minimal nav (Services, Process, Stack, About, Contact, Pricing), small "Crafted by Relyance" tagline.

## Signature Animations (priority order)

1. **Lenis smooth scroll** — site-wide foundation
2. **Hero WebGL shader background** — the first-impression moment
3. **Split-letter headline entrance** — hero H1
4. **Magnetic CTA buttons** — subtle cursor-follow
5. **Custom blended cursor** — difference blend mode, grows on hover
6. **Pinned horizontal Process timeline** — the scroll-moment everyone screenshots
7. **Counter-scrolling tech stack marquees**
8. **Glass-card services with tilt + glow**
9. **Section number labels** slide in from left with stagger
10. **Contact form field focus glow** — cyan border pulse

## Project Structure

```
app/
  layout.tsx              — fonts, providers, Lenis root, cursor
  page.tsx                — landing composition
  pricing/page.tsx        — stub "coming soon"
  globals.css             — Tailwind, custom CSS vars
components/
  Navbar.tsx
  Footer.tsx
  sections/
    Hero.tsx
    Services.tsx
    Process.tsx
    TechStack.tsx
    About.tsx
    Contact.tsx
  ui/
    Button.tsx            — magnetic variant
    SectionLabel.tsx      — "01 / SERVICES" mono eyebrow
    GlassCard.tsx
    Cursor.tsx
    LenisProvider.tsx
  effects/
    HeroShader.tsx        — R3F canvas + shader material
    TextReveal.tsx        — split-letter entrance
    Marquee.tsx
    MagneticButton.tsx
lib/
  services.ts             — service data
  process.ts              — step data
  stack.ts                — tech logo data (name, svg path, category)
  team.ts                 — team member data
public/
  logos/                  — tech stack SVGs
  relyance-logo.svg       — main brand mark (to be added)
```

## Data Flow (Contact form)

1. User fills form → React Hook Form state
2. Zod schema validates (discriminated on `noWebsiteYet`)
3. On submit → set `isSubmitting` → 1200ms fake delay → `console.log(payload)` → show success state
4. Success state persists; "Send another" button resets form
5. **TODO:** replace fake delay with `fetch('/api/contact', ...)` + Next route handler + Resend integration

## Non-Goals (v1)

- Real email backend
- Pricing page content (stub only)
- CMS / blog
- Auth
- Analytics (can be added later via Vercel Analytics in one line)
- Internationalization
- Dark/light toggle (site is dark by design)

## Success Criteria

- Lighthouse performance ≥ 85 (ambitious given WebGL hero; prioritize visual impact)
- All sections render and animate correctly in Chrome, Safari, Firefox
- Contact form validates and shows success state
- No layout shift on load
- Mobile-responsive (hero, services grid, process becomes vertical, stack marquee still runs, about stacks, contact form full-width)
- Dev server starts cleanly with `pnpm dev`
