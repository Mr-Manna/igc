import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { hero } from "@/content/home";

/**
 * Two-column masthead: proposition on the left, facility photograph on the
 * right.
 *
 * The previous hero ran the photo full-bleed behind the copy under a heavy
 * graphite scrim, which is a campaign device — it made the picture unreadable
 * and forced every word on top of it. Splitting the two lets the copy sit on a
 * clean surface at ordinary contrast and lets the plant actually be seen.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b rule-light bg-surface">
      {/* Soft blue wash, top-right. The only decorative element on the page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-14rem] right-[-10rem] h-[34rem] w-[34rem] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-blue) 22%, transparent) 0%, transparent 70%)",
        }}
      />

      <div className="shell relative grid items-center gap-12 py-14 lg:grid-cols-12 lg:gap-14 lg:py-24">
        {/* 7/5 rather than an even split: the headline needs ~535px to hold
            "Manufacturing Business" on one line, which a six-column cell does
            not give at 1024–1280. */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="inline-flex items-center gap-2.5 rounded-full border rule-light bg-canvas py-1.5 pr-4 pl-2.5 text-[0.8125rem] font-medium text-navy">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-blue" />
              {hero.eyebrow}
            </p>
          </Reveal>

          {/* Caps line length on wide screens. Deliberately in rem, not ch: a ch
              cap is measured against whatever font is active, so the fallback and
              the loaded Archivo wrap at different points and the swap shifts
              layout. */}
          <h1 className="display-hero mt-6 max-w-[35rem]">
            {hero.headline.map((line, index) => (
              <Reveal
                as="span"
                key={line.text}
                delay={90 + index * 70}
                className={`block ${line.accent ? "text-blue" : ""}`}
              >
                {line.text}
              </Reveal>
            ))}
          </h1>

          <Reveal as="p" delay={320} className="mt-6 max-w-[36rem] text-slate">
            {hero.body}
          </Reveal>

          <Reveal delay={390} className="mt-9 flex flex-wrap gap-3">
            <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
            <Button href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </Button>
          </Reveal>

          <Reveal delay={450} className="mt-10 border-t rule-light pt-6">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {hero.assurances.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-[0.875rem] font-medium text-navy"
                >
                  <CheckMark />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={160} className="lg:col-span-5">
          <div className="relative">
            {/* Offset panel behind the photograph — depth without a drop shadow
                heavy enough to read as a sticker. */}
            <div
              aria-hidden="true"
              className="absolute -right-4 -bottom-4 h-[70%] w-[70%] rounded-card bg-blue/10"
            />
            <Media
              src={hero.image.src}
              alt={hero.image.alt}
              priority
              sizes="(max-width: 1024px) 100vw, 38vw"
              className="relative aspect-[4/3] w-full shadow-card lg:aspect-[5/4]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CheckMark() {
  return (
    <span
      aria-hidden="true"
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue/10"
    >
      <svg
        viewBox="0 0 16 16"
        className="h-3 w-3 text-blue"
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
