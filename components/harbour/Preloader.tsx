"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [phase, setPhase] = useState<"initial" | "visible" | "exiting" | "hidden">("initial");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("visible"), 60);
    const t2 = setTimeout(() => setPhase("exiting"), 2400);
    const t3 = setTimeout(() => setPhase("hidden"), 3100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-harbour-paper transition-opacity duration-700 ${
        phase === "exiting" ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-6">
        <span
          className={`text-[2.5rem] leading-none font-bold tracking-[-0.05em] text-harbour-ink transition-all duration-500 ${
            phase === "initial" ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          ICF<span className="text-harbour-moss">.</span>
        </span>

        <div className="h-px w-48 overflow-hidden bg-harbour-rule">
          <div
            className={`h-full bg-harbour-moss transition-all duration-[1200ms] ${
              phase === "initial" ? "w-0" : "w-full"
            }`}
            style={
              phase !== "initial"
                ? { transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }
                : undefined
            }
          />
        </div>
      </div>
    </div>
  );
}
