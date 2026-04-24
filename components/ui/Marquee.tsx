"use client";

import { cn } from "@/lib/cn";
import { useCapability } from "./CapabilityProvider";

type Props = {
  items: React.ReactNode[];
  reverse?: boolean;
  className?: string;
  speed?: number; // seconds for one loop
};

export function Marquee({
  items,
  reverse = false,
  className,
  speed = 50,
}: Props) {
  const { capable } = useCapability();

  if (!capable) {
    // Static fallback — no infinite scroll, no duplication.
    return (
      <div
        className={cn(
          "relative flex flex-wrap justify-center gap-3 px-4",
          className
        )}
      >
        {items.map((item, i) => (
          <div key={i}>{item}</div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className="flex w-max"
        style={{
          animation: `${
            reverse ? "drift-rev" : "drift"
          } ${speed}s linear infinite`,
        }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="shrink-0 px-6">
            {item}
          </div>
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-void to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-void to-transparent"
      />
    </div>
  );
}
