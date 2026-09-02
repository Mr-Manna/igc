"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type CarouselProps = {
  children: ReactNode;
  /** Names the carousel for screen readers. Required — there are four on the page. */
  ariaLabel: string;
  /** Continuous drift, for the logo strip. Pauses on hover and on focus within. */
  autoScroll?: boolean;
  /** Re-initialise when the slide set changes, e.g. a tab filter. */
  reInitKey?: string | number;
  className?: string;
  /** Placed on the same row as the prev/next buttons, before them. */
  toolbar?: ReactNode;
};

/**
 * One Embla wrapper for every carousel on the homepage.
 *
 * Embla ships no accessibility of its own, so everything below the plugin —
 * roles, labels, disabled end states, reduced motion — is this component's job.
 *
 * Slides deliberately stay in the DOM and stay tab-reachable. Most of them hold
 * links, and `aria-hidden`-ing the off-screen ones would leave focusable
 * elements inside a hidden subtree, which is an axe violation and strands
 * keyboard users mid-carousel. Scrolling the rail is the browser's job when a
 * link inside it takes focus.
 */
export function Carousel({
  children,
  ariaLabel,
  autoScroll = false,
  reInitKey,
  className = "",
  toolbar,
}: CarouselProps) {
  const reducedMotion = usePrefersReducedMotion();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      containScroll: "trimSnaps",
      loop: autoScroll,
      // Embla's `duration` is in arbitrary units, not milliseconds. 0 lands the
      // slide immediately, which is what reduced motion asks for.
      duration: reducedMotion ? 0 : 24,
    },
    autoScroll && !reducedMotion
      ? [AutoScroll({ speed: 1, stopOnInteraction: false, stopOnMouseEnter: true })]
      : [],
  );

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const sync = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };

    sync();
    emblaApi.on("select", sync).on("reInit", sync);
    return () => {
      emblaApi.off("select", sync).off("reInit", sync);
    };
  }, [emblaApi]);

  // A changed filter swaps the slide children out from under Embla; without this
  // the rail keeps the old scroll offset and can land on empty space.
  useEffect(() => {
    emblaApi?.reInit();
    emblaApi?.scrollTo(0, true);
  }, [emblaApi, reInitKey]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className={className}>
      <div
        ref={emblaRef}
        className="overflow-hidden"
        role="group"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
      >
        <div className="flex touch-pan-y">{children}</div>
      </div>

      {autoScroll ? null : (
        <div className="mt-8 flex items-center gap-3">
          {toolbar}
          <div className="ml-auto flex gap-2">
            <CarouselButton
              direction="prev"
              label={`Previous — ${ariaLabel}`}
              disabled={!canPrev}
              onClick={scrollPrev}
            />
            <CarouselButton
              direction="next"
              label={`Next — ${ariaLabel}`}
              disabled={!canNext}
              onClick={scrollNext}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function CarouselButton({
  direction,
  label,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--rule-on-light)] bg-canvas text-navy transition-colors duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-blue hover:text-blue disabled:pointer-events-none disabled:opacity-35"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className={`h-4 w-4 ${direction === "prev" ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 8h11M9 4l4 4-4 4" />
      </svg>
    </button>
  );
}
