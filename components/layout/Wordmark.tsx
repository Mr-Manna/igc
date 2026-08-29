import Link from "next/link";
import { site } from "@/content/site";

// No aria-label on the link: an accessible name that omits the visible "ICF"
// text trips axe's label-content-name-mismatch rule. The visible text plus an
// appended screen-reader-only "Home" forms the name instead.
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group flex items-center gap-3 ${className}`}>
      <span className="font-display text-[1.625rem] leading-none font-bold tracking-[-0.03em] text-navy">
        ICF
        <span className="text-blue">.</span>
      </span>

      {/* Divider + full legal name: the abbreviation alone means nothing to a
          first-time visitor, and spelling it out is what a professional-services
          mark does.

          Dropped below sm, where it would wrap the header — and again across
          lg–xl, the one band where the seven-item primary nav and the CTA are
          both on screen and there is no room left for it. */}
      <span
        aria-hidden="true"
        className="hidden h-7 w-px bg-[var(--rule-on-light)] sm:block lg:hidden xl:block"
      />
      <span className="hidden max-w-[13rem] text-[0.8125rem] leading-tight font-medium text-slate-muted transition-colors group-hover:text-navy sm:block lg:hidden xl:block">
        {site.legalName}
      </span>

      <span className="sr-only">— Home</span>
    </Link>
  );
}
