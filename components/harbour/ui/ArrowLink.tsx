import Link from "next/link";

/**
 * The Harbour call-to-action: a label and a long arrow, no box.
 *
 * This layout has exactly one boxed control (`SagePill`, the hero's primary
 * action) and everything else is this. The arrow's shaft is a separate line
 * element so it can grow on hover without scaling the head — a transform on the
 * whole glyph would fatten the stroke.
 *
 * `tone` names the ground it sits on, not the colour of the text, matching the
 * convention `SectionHeading` already uses on the live site.
 */
export function ArrowLink({
  href,
  children,
  tone = "paper",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "paper" | "dark";
  className?: string;
}) {
  const colour =
    tone === "dark"
      ? "text-harbour-sage hover:text-harbour-paper"
      : "text-harbour-ink hover:text-harbour-moss";

  return (
    <Link
      href={href}
      className={`harbour-micro group inline-flex items-center gap-3 transition-colors duration-200 ${colour} ${className}`}
    >
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 34 8"
        className="h-2 w-[2.125rem] overflow-visible"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        {/* The shaft grows from its right-hand end, so the arrowhead stays put
            and the line reaches back into the gap toward the label. Scaling
            from the left instead would push the shaft straight through the
            head, and translating the head to compensate would tie the geometry
            to the rendered pixel size. */}
        <line
          x1="0"
          y1="4"
          x2="30"
          y2="4"
          className="origin-right transition-transform duration-300 ease-[var(--ease-corporate)] group-hover:scale-x-125"
        />
        <path d="M26.5 0.5 30.5 4l-4 3.5" strokeLinecap="square" />
      </svg>
    </Link>
  );
}
