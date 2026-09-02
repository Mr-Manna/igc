import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HeroBackdrop } from "@/components/home/HeroBackdrop";
import { Reveal } from "@/components/ui/Reveal";
import { hero } from "@/content/home";

/**
 * Full-bleed photographic masthead.
 *
 * An earlier revision split this into copy-left / photo-right, on the reasoning
 * that a scrimmed full-bleed plate is a campaign device. The site is now built
 * against a competitor whose hero is exactly this, and the structure is the
 * point of the exercise — so the plate is back, with the two things that made
 * the previous full-bleed attempt fail handled explicitly:
 *
 *  - Contrast. The scrim is a navy gradient, not a flat black wash: 0.92 at the
 *    left edge where the copy sits, easing to 0.55 at the right where the plant
 *    is meant to be legible. White on navy-deep at 0.92 over this photograph
 *    measures well clear of AA, and the copy column stops before the scrim thins.
 *  - Layout shift. Copy widths are capped in `rem`, never `ch`. A `ch` cap is
 *    measured against whichever font is live, so the fallback and the loaded
 *    Archivo wrap at different points and the swap moves the layout — that cost
 *    0.052 CLS on this codebase before.
 *
 * The plate itself is `HeroBackdrop` — a crossfading slideshow of manufacturing
 * processes that degrades to a single static image (slide 0, the LCP element)
 * under `prefers-reduced-motion` or with JavaScript off.
 *
 * `pb` is oversized because StatsBand is pulled up over this section's lower
 * edge; the padding is what keeps the assurance list clear of the card.
 */
export function Hero() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-navy-deep">
      <HeroBackdrop slides={hero.slides} />

      <div className="shell relative pt-16 pb-40 lg:pt-24 lg:pb-52">
        <div className="max-w-[42rem]">
          <Reveal>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-[var(--rule-on-dark)] bg-white/10 py-1.5 pr-4 pl-2.5 text-[0.8125rem] font-medium text-white backdrop-blur-sm">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-blue-light" />
              {hero.eyebrow}
            </p>
          </Reveal>

          <h1 className="display-hero mt-6 max-w-[35rem]">
            {hero.headline.map((line, index) => (
              <Reveal
                as="span"
                key={line.text}
                delay={90 + index * 70}
                // `blue` is 2.2:1 on navy and fails; on a dark band the accent
                // has to step up to `blue-light`. See globals.css.
                className={`block ${line.accent ? "text-blue-light" : ""}`}
              >
                {line.text}
              </Reveal>
            ))}
          </h1>

          <Reveal as="p" delay={320} className="mt-6 max-w-[36rem] text-ink-invert">
            {hero.body}
          </Reveal>

          <Reveal delay={390} className="mt-9 flex flex-wrap gap-3">
            <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
            <Button href={hero.secondaryCta.href} variant="secondary-on-dark">
              {hero.secondaryCta.label}
            </Button>
          </Reveal>

          {/* The reference site runs a search field here. These are links, not a
              search: ICF has no corpus to query, and a box that only ever
              navigates is a worse version of the thing it imitates. */}
          <Reveal delay={440} className="mt-9">
            <p className="label text-ink-invert-muted">Popular requests</p>
            <ul className="mt-3.5 flex flex-wrap gap-2">
              {hero.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block rounded-full border border-[var(--rule-on-dark)] bg-white/5 px-4 py-2 text-[0.875rem] font-medium text-white transition-colors duration-250 hover:border-blue-light hover:bg-white hover:text-navy"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={500} className="mt-10 border-t rule-dark pt-6">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {hero.assurances.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-[0.875rem] font-medium text-white"
                >
                  <CheckMark />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CheckMark() {
  return (
    <span
      aria-hidden="true"
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15"
    >
      <svg
        viewBox="0 0 16 16"
        className="h-3 w-3 text-blue-light"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m3 8.5 3.2 3.2L13 5" />
      </svg>
    </span>
  );
}
