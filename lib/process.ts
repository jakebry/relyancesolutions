export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  details: string[];
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery Call",
    description:
      "We learn your business, your customers, and the goals you actually care about.",
    details: [
      "30–60 minute call, on your schedule",
      "We ask the right questions so you don't have to",
      "You leave with a clear scope, timeline, and quote",
    ],
  },
  {
    number: "02",
    title: "Design & Build",
    description:
      "We design mockups, iterate with you, then build the real thing — pixel perfect, fast as hell.",
    details: [
      "Custom design, not a template",
      "Modern tech: Next.js, React, whatever fits",
      "You review at every milestone",
    ],
  },
  {
    number: "03",
    title: "Launch",
    description:
      "Domain, hosting, email, DNS, SSL — we handle all the plumbing and make the go-live smooth.",
    details: [
      "Zero-downtime migrations",
      "Email and workspace configured",
      "Full SSL, security headers, monitoring live",
    ],
  },
  {
    number: "04",
    title: "Hands-Off Operations",
    description:
      "We monitor, back up, update, and support. You run your business and forget tech exists.",
    details: [
      "24/7 uptime monitoring",
      "Weekly automated backups",
      "Priority support — text us, we'll fix it",
    ],
  },
];
