"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type Slide = { src: string; alt: string; label: string };

/** Dwell per slide. Long enough that the motion reads as ambient, not as a pitch. */
const INTERVAL_MS = 6000;

/**
 * The hero's photographic plate — a slow crossfading slideshow, one frame per
 * manufacturing process, behind `hero-scrim` and the copy column.
 *
 * Progressive enhancement, so the verified LCP / CLS numbers are untouched:
 *
 *  - The server renders slide 0 only, as the same `<Image priority>` plate the
 *    hero always had. That is the LCP element.
 *  - The remaining slides mount a tick after hydration and only when motion is
 *    allowed, so they never join the LCP fetch and never download at all under
 *    `prefers-reduced-motion` or with JavaScript off — either case leaves a
 *    single static plate.
 *  - Every slide is `position: absolute; inset: 0`, so the set cannot shift
 *    layout as frames swap.
 *
 * Auto-advance is paired with a pause/play control (WCAG 2.2.2) and stops while
 * the tab is hidden.
 */
export function HeroBackdrop({ slides }: { slides: readonly Slide[] }) {
  const reducedMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => setMounted(true), []);

  const animated = mounted && !reducedMotion && slides.length > 1;

  useEffect(() => {
    if (!animated || paused) return;

    let timer: ReturnType<typeof setInterval> | undefined;
    const start = () => {
      timer = setInterval(() => {
        setActive((i) => (i + 1) % slides.length);
      }, INTERVAL_MS);
    };
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = undefined;
    };
    const onVisibility = () => {
      stop();
      if (!document.hidden) start();
    };

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [animated, paused, slides.length]);

  const rendered = animated ? slides : slides.slice(0, 1);

  return (
    <>
      <div
        className="absolute inset-0 -z-10"
        role="group"
        aria-roledescription="carousel"
        aria-label="Manufacturing processes"
      >
        {rendered.map((slide, index) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            // Slide 0 is the LCP element and carries the head preload; the rest
            // fall back to next/image's default lazy loading.
            priority={index === 0}
            sizes="100vw"
            className={`object-cover transition-opacity duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none ${
              index === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div aria-hidden="true" className="hero-scrim absolute inset-0 -z-10" />

      {animated ? (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2 lg:top-8 lg:right-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--rule-on-dark)] bg-white/10 py-1.5 pr-3.5 pl-3 text-[0.8125rem] font-medium text-white backdrop-blur-sm">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-blue-light" />
            {slides[active].label}
          </p>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={
              paused ? "Play the background slideshow" : "Pause the background slideshow"
            }
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--rule-on-dark)] bg-white/10 text-white backdrop-blur-sm transition-colors duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-blue-light hover:text-blue-light"
          >
            {paused ? <PlayIcon /> : <PauseIcon />}
          </button>
        </div>
      ) : null}
    </>
  );
}

function PauseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
      <rect x="4" y="3" width="3" height="10" rx="1" />
      <rect x="9" y="3" width="3" height="10" rx="1" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
      <path d="M5 3.5v9a1 1 0 0 0 1.53.848l7-4.5a1 1 0 0 0 0-1.696l-7-4.5A1 1 0 0 0 5 3.5Z" />
    </svg>
  );
}
