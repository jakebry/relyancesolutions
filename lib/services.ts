import {
  Code2,
  Server,
  Mail,
  Globe2,
  Wrench,
  LifeBuoy,
  BarChart3,
  ShoppingCart,
  ShieldCheck,
  DatabaseBackup,
} from "lucide-react";

export type ServiceSize = "lg" | "md" | "sm";

export type Service = {
  id: string;
  title: string;
  description: string;
  short: string;
  size: ServiceSize;
  icon: typeof Code2;
};

export const services: Service[] = [
  {
    id: "design-build",
    title: "Custom Design & Development",
    description:
      "Bespoke websites engineered from the ground up. No templates, no compromises, pixel-perfect every time.",
    short: "Pixel-perfect, from scratch.",
    size: "lg",
    icon: Code2,
  },
  {
    id: "hosting",
    title: "Hosting & Uptime",
    description:
      "Lightning-fast global hosting with 24/7 monitoring. We keep your site online while you sleep.",
    short: "Fast global, 24/7 monitored.",
    size: "lg",
    icon: Server,
  },
  {
    id: "maintenance",
    title: "Maintenance & Updates",
    description:
      "Ongoing updates, dependency patches, and content refreshes. Your site stays sharp, forever.",
    short: "Always updated, always sharp.",
    size: "lg",
    icon: Wrench,
  },
  {
    id: "email",
    title: "Business Email",
    description:
      "Google Workspace and Microsoft 365 setup, migration, and management — your name at your domain.",
    short: "Workspace setup & migration.",
    size: "md",
    icon: Mail,
  },
  {
    id: "domains",
    title: "Domain & DNS",
    description:
      "We buy, configure, and manage your domain and DNS so nothing ever breaks in the background.",
    short: "Domains & DNS, handled.",
    size: "md",
    icon: Globe2,
  },
  {
    id: "seo",
    title: "SEO & Analytics",
    description:
      "Structured data, Core Web Vitals, and analytics dashboards wired up from day one.",
    short: "Schema, vitals, dashboards.",
    size: "md",
    icon: BarChart3,
  },
  {
    id: "ecommerce",
    title: "E-commerce Migration",
    description:
      "Move your store from Shopify, WooCommerce, or Squarespace without losing a single order.",
    short: "Shopify / Woo / Squarespace.",
    size: "md",
    icon: ShoppingCart,
  },
  {
    id: "security",
    title: "Security & SSL",
    description:
      "Hardened headers, managed SSL, DDoS protection, and proactive threat monitoring baked in.",
    short: "SSL, headers, DDoS.",
    size: "md",
    icon: ShieldCheck,
  },
  {
    id: "support",
    title: "Tech Support",
    description:
      "One line, one team, zero runaround. If it plugs into the internet, we'll handle it.",
    short: "One line, zero runaround.",
    size: "sm",
    icon: LifeBuoy,
  },
  {
    id: "backups",
    title: "Automated Backups",
    description:
      "Off-site, encrypted, versioned backups with one-click restore. Sleep easy, we've got copies.",
    short: "Encrypted, versioned, restored.",
    size: "sm",
    icon: DatabaseBackup,
  },
];
