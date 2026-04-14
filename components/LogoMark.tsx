import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  animated?: boolean;
};

export function LogoMark({ className, animated = false }: Props) {
  return (
    <svg
      viewBox="0 0 64 64"
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
          <feGaussianBlur stdDeviation="0.8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g
        stroke="url(#logoGrad)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#logoGlow)"
      >
        {/* Outer R */}
        <path d="M14 54 V14 H34 C42 14 46 20 46 26 C46 32 42 38 34 38 H22" />
        <path d="M30 38 L46 54" />
        {/* Inner circuit dots */}
        <circle cx="14" cy="14" r="1.6" fill="url(#logoGrad)" />
        <circle cx="34" cy="14" r="1.6" fill="url(#logoGrad)" />
        <circle cx="46" cy="26" r="1.6" fill="url(#logoGrad)" />
        <circle cx="22" cy="38" r="1.6" fill="url(#logoGrad)" />
        <circle cx="14" cy="54" r="1.6" fill="url(#logoGrad)" />
        <circle cx="46" cy="54" r="1.6" fill="url(#logoGrad)" />
        {/* Trace accent */}
        <path d="M2 20 H8 L10 18 H14" opacity="0.6" />
        <path d="M52 32 H58 L60 34 H64" opacity="0.6" />
      </g>
      {animated && (
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="url(#logoGrad)"
          strokeWidth="0.6"
          fill="none"
          opacity="0.3"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 32 32"
            to="360 32 32"
            dur="18s"
            repeatCount="indefinite"
          />
        </circle>
      )}
    </svg>
  );
}
