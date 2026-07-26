"use client";

import { useEffect, useRef } from "react";

/**
 * Counts up to `value` once, when scrolled into view.
 *
 * The final figure is rendered on the server and is what sits in the HTML. The
 * animation mutates textContent directly and only ever runs after hydration, so
 * crawlers and no-JS visitors always read the real number.
 *
 * (The previous site animated from client state seeded at 0 and never resolved,
 * which is why its stat band read "0+", "0+", "₹0+ Crore", "0+" on load.)
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  durationMs = 1500,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;
    let start: number | null = null;

    const run = () => {
      const step = (now: number) => {
        if (start === null) start = now;
        const progress = Math.min((now - start) / durationMs, 1);
        // easeOutExpo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        el.textContent = `${prefix}${Math.round(eased * value)}${suffix}`;
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect();
            run();
          }
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, prefix, suffix, durationMs]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
