"use client";

import { useEffect, useRef } from "react";
import { useCapability } from "./CapabilityProvider";

const INTERACTIVE_SELECTOR =
  "a, button, [data-cursor='hover'], input, textarea, label";

export function Cursor() {
  const { capable } = useCapability();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!capable) return; // touch/low-capability devices use native cursor

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId = 0;

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot!.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }

    function tick() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring!.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(tick);
    }

    // Event delegation: captures elements that mount/unmount after first render
    // (e.g., expanded Tech Stack chips, dynamically revealed cards).
    function onPointerOver(e: Event) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest(INTERACTIVE_SELECTOR)) {
        ring!.classList.add("scale-[2.5]");
        ring!.classList.add("bg-cyan-glow/20");
      }
    }
    function onPointerOut(e: Event) {
      const target = e.target as HTMLElement | null;
      const related = (e as PointerEvent).relatedTarget as HTMLElement | null;
      if (!target) return;
      // Only shrink when truly leaving an interactive element
      const leavingInteractive = target.closest(INTERACTIVE_SELECTOR);
      const enteringInteractive = related?.closest(INTERACTIVE_SELECTOR);
      if (leavingInteractive && !enteringInteractive) {
        ring!.classList.remove("scale-[2.5]");
        ring!.classList.remove("bg-cyan-glow/20");
      }
    }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      cancelAnimationFrame(rafId);
    };
  }, [capable]);

  if (!capable) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block h-8 w-8 rounded-full border border-cyan-glow/60 transition-[transform,background-color,scale] duration-200 ease-out will-change-transform mix-blend-difference"
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block h-1.5 w-1.5 rounded-full bg-cyan-glow will-change-transform"
      />
    </>
  );
}
