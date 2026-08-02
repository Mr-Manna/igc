import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export type Crumb = { label: string; href: string };

type Cta = { label: string; href: string };

/**
 * The masthead for interior pages.
 *
 * Solid navy with the same radial wash `ClosingCTA` uses, rather than the
 * homepage's photographic plate. That is a hierarchy decision as much as a
 * performance one: the homepage has to stop a stranger, so it spends an LCP
 * image doing it, while an interior page has already been chosen from the nav
 * and its job starts at the content. A flat band paints immediately and lets
 * the first real section arrive higher up the screen.
 *
 * The breadcrumb is a real ordered list. The current page is the last item and
 * is not a link — `aria-current="page"` marks it instead, because a link to the
 * page you are already on is a keyboard stop that goes nowhere.
 */
export function PageHeader({
  breadcrumb,
  eyebrow,
  heading,
  body,
  primaryCta,
  secondaryCta,
  children,
}: {
  breadcrumb: Crumb[];
  eyebrow: string;
  heading: string;
  body?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  /** Anything that belongs inside the band below the calls to action. */
  children?: ReactNode;
}) {
  const last = breadcrumb.length - 1;

  return (
    <section className="on-dark relative overflow-hidden bg-navy">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[28rem] w-[46rem] -translate-x-1/2 -translate-y-1/3 opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse, color-mix(in oklab, var(--color-blue) 60%, transparent) 0%, transparent 70%)",
        }}
      />

      <div className="shell relative z-10 pt-8 pb-16 lg:pt-10 lg:pb-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem]">
            {breadcrumb.map((crumb, index) => (
              <li key={crumb.href} className="flex items-center gap-2">
                {index === last ? (
                  <span aria-current="page" className="font-medium text-white">
                    {crumb.label}
                  </span>
                ) : (
                  <>
                    {/* `py-1` is for the hit area, not the look. At this size
                        the link box is 21px tall, under the 24px target
                        minimum; the padding takes it to 29 without moving the
                        text off the separator's centre line. */}
                    <Link
                      href={crumb.href}
                      className="inline-block py-1 text-ink-invert-muted transition-colors hover:text-white"
                    >
                      {crumb.label}
                    </Link>
                    <Separator />
                  </>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-10 max-w-[46rem]">
          <Reveal>
            <p className="label flex items-center gap-3 text-blue-light">
              <span aria-hidden="true" className="h-px w-6 bg-current" />
              {eyebrow}
            </p>
          </Reveal>

          {/* Capped in `rem`, never `ch` — a `ch` cap is measured against
              whichever font is live, so the fallback and the loaded Archivo wrap
              at different points and the swap shifts the layout. */}
          <Reveal delay={70}>
            <h1 className="display-hero mt-5 max-w-[34rem]">{heading}</h1>
          </Reveal>

          {body ? (
            <Reveal delay={120}>
              <p className="mt-6 max-w-[40rem] text-ink-invert">{body}</p>
            </Reveal>
          ) : null}

          {primaryCta || secondaryCta ? (
            <Reveal delay={170}>
              <div className="mt-9 flex flex-wrap gap-3">
                {primaryCta ? (
                  <Button href={primaryCta.href} variant="primary-on-dark">
                    {primaryCta.label}
                  </Button>
                ) : null}
                {secondaryCta ? (
                  <Button href={secondaryCta.href} variant="secondary-on-dark">
                    {secondaryCta.label}
                  </Button>
                ) : null}
              </div>
            </Reveal>
          ) : null}
        </div>

        {children}
      </div>
    </section>
  );
}

function Separator() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3 w-3 shrink-0 text-white/35"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3l5 5-5 5" />
    </svg>
  );
}
