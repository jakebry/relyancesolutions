"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Capability = {
  capable: boolean;
  ready: boolean;
};

const CapabilityContext = createContext<Capability>({
  capable: true,
  ready: false,
});

// Default to capable=true so modern devices render the full experience on
// first paint. We downgrade to !capable on mount if signals say otherwise.
function detectCapability(): boolean {
  if (typeof window === "undefined") return true;

  const reduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (reduced) return false;

  // deviceMemory is in GB; not universally supported (Safari returns undefined)
  const mem = (navigator as Navigator & { deviceMemory?: number })
    .deviceMemory;
  if (typeof mem === "number" && mem < 4) return false;

  const cores = navigator.hardwareConcurrency;
  if (typeof cores === "number" && cores > 0 && cores < 4) return false;

  // Touch + small screen = phone. Combine with the above to catch low-end phones
  // that don't report memory/cores.
  const coarse = !window.matchMedia("(hover: hover)").matches;
  const small = window.innerWidth < 768;
  if (coarse && small) {
    // On phones we additionally check DPR and screen size — a cheap proxy for
    // "budget phone" vs "flagship." Flagships since ~2021 all have >=3 DPR.
    const dpr = window.devicePixelRatio || 1;
    if (dpr < 2.5) return false;
  }

  return true;
}

export function CapabilityProvider({ children }: { children: ReactNode }) {
  const [capable, setCapable] = useState<boolean>(true);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    const result = detectCapability();
    setCapable(result);
    setReady(true);
    document.documentElement.dataset.capable = result ? "true" : "false";

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      const next = detectCapability();
      setCapable(next);
      document.documentElement.dataset.capable = next ? "true" : "false";
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <CapabilityContext.Provider value={{ capable, ready }}>
      {children}
    </CapabilityContext.Provider>
  );
}

export function useCapability(): Capability {
  return useContext(CapabilityContext);
}
