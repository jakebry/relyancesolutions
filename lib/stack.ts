export type TechItem = {
  name: string;
  category: TechCategory;
  featured?: boolean;
};

export type TechCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "Infra"
  | "Tooling";

export const stack: TechItem[] = [
  // Frontend
  { name: "React", category: "Frontend", featured: true },
  { name: "Next.js", category: "Frontend", featured: true },
  { name: "Vue", category: "Frontend" },
  { name: "Nuxt", category: "Frontend" },
  { name: "Svelte", category: "Frontend" },
  { name: "SvelteKit", category: "Frontend" },
  { name: "Angular", category: "Frontend" },
  { name: "Astro", category: "Frontend" },
  { name: "Remix", category: "Frontend" },
  { name: "Solid", category: "Frontend" },
  { name: "Qwik", category: "Frontend" },
  { name: "TypeScript", category: "Frontend", featured: true },
  { name: "Tailwind", category: "Frontend", featured: true },
  { name: "Sass", category: "Frontend" },
  { name: "Framer Motion", category: "Frontend" },
  { name: "GSAP", category: "Frontend", featured: true },
  { name: "Three.js", category: "Frontend" },
  { name: "Vite", category: "Frontend" },
  { name: "Webpack", category: "Frontend" },
  { name: "HTML5", category: "Frontend" },
  { name: "CSS3", category: "Frontend" },
  // Backend
  { name: "Node.js", category: "Backend", featured: true },
  { name: "Bun", category: "Backend" },
  { name: "Deno", category: "Backend" },
  { name: "Express", category: "Backend" },
  { name: "Fastify", category: "Backend" },
  { name: "NestJS", category: "Backend" },
  { name: "Hono", category: "Backend" },
  { name: "Python", category: "Backend", featured: true },
  { name: "Django", category: "Backend" },
  { name: "FastAPI", category: "Backend" },
  { name: "Go", category: "Backend" },
  { name: "Rust", category: "Backend" },
  { name: "Ruby on Rails", category: "Backend" },
  { name: "PHP", category: "Backend" },
  { name: "Laravel", category: "Backend" },
  { name: "Java", category: "Backend" },
  { name: "Spring", category: "Backend" },
  // Database
  { name: "PostgreSQL", category: "Database", featured: true },
  { name: "MySQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "Redis", category: "Database" },
  { name: "SQLite", category: "Database" },
  { name: "Supabase", category: "Database", featured: true },
  { name: "Firebase", category: "Database" },
  // Infra
  { name: "Vercel", category: "Infra", featured: true },
  { name: "Netlify", category: "Infra" },
  { name: "AWS", category: "Infra" },
  { name: "Cloudflare", category: "Infra", featured: true },
  { name: "Docker", category: "Infra" },
  { name: "GitHub Actions", category: "Infra" },
  // Tooling
  { name: "Stripe", category: "Tooling", featured: true },
  { name: "Resend", category: "Tooling" },
  { name: "Auth0", category: "Tooling" },
  { name: "Clerk", category: "Tooling" },
];

export const stackCategories: TechCategory[] = [
  "Frontend",
  "Backend",
  "Database",
  "Infra",
  "Tooling",
];

export const featuredStack = stack.filter((item) => item.featured);
