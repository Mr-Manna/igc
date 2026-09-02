import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { partners, partnersSection } from "@/content/partners";

/**
 * The site-wide "Delivery partners" band.
 *
 * Rendered by `app/(corporate)/layout.tsx` directly above the footer, so it
 * appears on every live route. It sits outside `<main>`, so the root element is
 * an `<aside>` (a complementary landmark) rather than a bare `<section>` —
 * content outside a landmark is an axe best-practice failure and the site holds
 * a clean sheet there.
 *
 * Partner names are set as wordmarks in the display face, matching `ClientLogos`
 * — there are no logo assets and no `public/` directory. The "Visit" links are
 * plain `<a target="_blank">` (not `Button`, which is `next/link` and forwards
 * no `rel`/`target`), following `FloatingActions`.
 */
export function PartnersBand() {
  return (
    <aside
      aria-labelledby="partners-band-heading"
      className="border-y rule-light bg-surface"
    >
      <div className="shell py-16 lg:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-[40rem]">
            <Reveal>
              <p className="label flex items-center gap-3 text-blue">
                <span aria-hidden="true" className="h-px w-6 bg-current" />
                {partnersSection.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={70}>
              <h2 id="partners-band-heading" className="display-lg mt-4">
                {partnersSection.heading}
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="measure mt-5 text-slate">{partnersSection.body}</p>
            </Reveal>
          </div>

          <Reveal delay={160} className="shrink-0">
            <Button href="/partners" variant="secondary">
              Meet our partners
            </Button>
          </Reveal>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {partners.map((partner, index) => (
            <li key={partner.slug} className="flex">
              <Reveal delay={index * 80} className="flex w-full">
                <article className="card flex h-full w-full flex-col p-8 lg:p-10">
                  <span className="font-display text-[1.375rem] font-bold tracking-[-0.02em] text-navy">
                    {partner.name}
                  </span>
                  <span className="label mt-2 text-slate-muted">
                    {partner.discipline}
                  </span>

                  <p className="mt-4 text-[0.9375rem] text-slate">
                    {partner.positioning}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {partner.capabilities.map((capability) => (
                      <li
                        key={capability}
                        className="rounded-full border border-[var(--rule-on-light)] bg-surface px-3 py-1 text-[0.8125rem] text-slate"
                      >
                        {capability}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-auto inline-flex items-center gap-2 pt-6 text-[0.875rem] font-semibold text-blue transition-colors hover:text-blue-dark"
                  >
                    Visit {partner.name}
                    <span className="sr-only"> (opens in a new tab)</span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      className="h-3.5 w-3.5 transition-transform duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 8h11M9 4l4 4-4 4" />
                    </svg>
                  </a>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
