"use client";

import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  animated?: boolean;
};

/**
 * Relyance Solutions – Logo Mark
 * Double-R with circuit-board nodes, matching the brand identity.
 */
export function LogoMark({ className, animated = false }: Props) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-8", className)}
      aria-label="Relyance Solutions"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9DE3FF" />
          <stop offset="50%" stopColor="#4FC3FF" />
          <stop offset="100%" stopColor="#2D6CFF" />
        </linearGradient>
        <filter id="logoGlow">
          <feGaussianBlur stdDeviation="1" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer R */}
      <path
        d="M16 68 V16 H42 C52 16 58 23 58 32 C58 41 52 48 42 48 H26"
        stroke="url(#logoGrad)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#logoGlow)"
      />
      <path
        d="M38 48 L58 68"
        stroke="url(#logoGrad)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        filter="url(#logoGlow)"
      />

      {/* Inner R (offset, lighter — creates the double-stripe effect) */}
      <path
        d="M22 62 V22 H40 C48 22 53 28 53 32 C53 38 48 43 40 43 H30"
        stroke="url(#logoGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.45"
      />
      <path
        d="M37 43 L52 62"
        stroke="url(#logoGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.45"
      />

      {/* Circuit nodes */}
      <circle cx="16" cy="16" r="2.8" fill="url(#logoGrad)" filter="url(#logoGlow)" />
      <circle cx="42" cy="16" r="2.8" fill="url(#logoGrad)" filter="url(#logoGlow)" />
      <circle cx="58" cy="32" r="2.8" fill="url(#logoGrad)" filter="url(#logoGlow)" />
      <circle cx="26" cy="48" r="2.8" fill="url(#logoGrad)" filter="url(#logoGlow)" />
      <circle cx="16" cy="68" r="2.8" fill="url(#logoGrad)" filter="url(#logoGlow)" />
      <circle cx="58" cy="68" r="2.8" fill="url(#logoGrad)" filter="url(#logoGlow)" />

      {/* Trace accents */}
      <path d="M4 24 H10 L13 21 H16" stroke="url(#logoGrad)" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M64 40 H70 L73 43 H78" stroke="url(#logoGrad)" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />

      {/* Animated orbit ring */}
      {animated && (
        <circle
          cx="40"
          cy="40"
          r="35"
          stroke="url(#logoGrad)"
          strokeWidth="0.5"
          fill="none"
          opacity="0.25"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 40 40"
            to="360 40 40"
            dur="18s"
            repeatCount="indefinite"
          />
        </circle>
      )}
    </svg>
  );
}
