import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Four variants rather than three: a dark band needs its own pair, because the
 * blue accent is only 2.2:1 on navy and cannot be used there (see the contrast
 * note in globals.css). On navy the primary action inverts to a white fill.
 */
type Variant = "primary" | "secondary" | "primary-on-dark" | "secondary-on-dark";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-btn px-6 py-3.5 text-[0.9375rem] font-semibold transition-colors duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]";

const variants: Record<Variant, string> = {
  /** White on #1a56a8 is 4.8:1. */
  primary: "bg-blue text-white hover:bg-blue-dark",
  secondary:
    "border border-[var(--rule-on-light)] bg-canvas text-navy hover:border-blue hover:text-blue",
  "primary-on-dark": "bg-white text-navy hover:bg-blue-light",
  "secondary-on-dark":
    "border border-[var(--rule-on-dark)] text-white hover:bg-white hover:text-navy",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      <Arrow />
    </Link>
  );
}

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 shrink-0 transition-transform duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}
