import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/home";
import { serviceStrip } from "@/content/sectors";

/**
 * The mirror of `SectorStrip` on /services: that page ends its argument by
 * pointing at the sectors, this one by pointing at the services. Between them
 * the two axes of the same offer are one click apart in either direction.
 *
 * Chips rather than the homepage's icon cards. This page has already spent its
 * attention on the sector list and the services are the cross-reference, not a
 * second headline act — and repeating the cards would be the same content at the
 * same weight on a third page.
 *
 * These go to real anchors, unlike the sector chips they mirror: /services
 * carries a block per service keyed by the same slug, so each chip lands on the
 * detail rather than at the top of an index.
 *
 * Only the featured (core) engagements are listed — the sector-specific services
 * are themselves sector-shaped and would double up the argument this strip makes.
 */
const featuredServices = services.filter((service) => service.featured);

export function ServiceStrip() {
  return (
    <section className="border-y rule-light bg-canvas">
      <div className="shell py-16 lg:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div>
            <Reveal>
              <p className="label flex items-center gap-3 text-blue">
                <span aria-hidden="true" className="h-px w-6 bg-current" />
                {serviceStrip.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="display-lg mt-4">{serviceStrip.heading}</h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="measure mt-5 text-slate">{serviceStrip.body}</p>
            </Reveal>
          </div>

          <Reveal delay={160} className="shrink-0">
            <Button href={serviceStrip.cta.href} variant="secondary">
              {serviceStrip.cta.label}
            </Button>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <ul className="mt-10 flex flex-wrap gap-2.5">
            {featuredServices.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services#${service.slug}`}
                  className="inline-block rounded-full border border-[var(--rule-on-light)] bg-surface px-4 py-2 text-[0.875rem] font-medium text-slate transition-colors duration-250 hover:border-blue hover:bg-canvas hover:text-blue"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
