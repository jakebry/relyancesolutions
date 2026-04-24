"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCapability } from "./CapabilityProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const { capable, ready } = useCapability();

  useEffect(() => {
    if (!ready) return;
    if (!capable) return; // low-capability devices use native scroll

    const lenis = new Lenis({
      lerp: 0.16,
      duration: 0.9,
      wheelMultiplier: 1.05,
      smoothWheel: true,
      syncTouch: false,
    });

    // Drive Lenis off GSAP's ticker and keep ScrollTrigger in sync —
    // this is the canonical integration that prevents pinned sections
    // from stuttering when Lenis is active.
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, [capable, ready]);

  return <>{children}</>;
}
