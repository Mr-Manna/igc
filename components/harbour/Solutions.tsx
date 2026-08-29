import Link from "next/link";
import { services, solutions } from "@/content/harbour";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { ArrowLink } from "./ui/ArrowLink";

/**
 * The services, as a ruled index rather than as a card grid.
 *
 * The reference sets one word at poster scale and hangs everything else off it.
 * The core services then read as an index — numbered rows on hairlines — which is
 * also the honest shape for the content: equal-weight engagements, not things
 * competing for a click. Only the featured engagements list here; the
 * sector-specific services are a live-site concern this spike does not carry.
 *
 * The sub-line under the poster word is `harbour-moss`, not sage. The reference
 * uses its pale accent there and it measures 1.3:1 on paper; see the contrast
 * note in `globals.css`.
 */
const featuredServices = services.filter((service) => service.featured);

export function Solutions() {
  return (
    <section className="shell py-24 lg:py-36" aria-labelledby="harbour-solutions">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Reveal>
            <h2 id="harbour-solutions" className="harbour-poster text-harbour-ink">
              {solutions.poster}
            </h2>
          </Reveal>
          <Reveal as="p" delay={90} className="harbour-micro mt-4 text-harbour-moss">
            {solutions.sub}
          </Reveal>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <Reveal as="p" delay={140} className="leading-[1.7] text-harbour-mute">
            {solutions.body}
          </Reveal>
          <Reveal delay={200} className="mt-6">
            <ArrowLink href={solutions.cta.href}>{solutions.cta.label}</ArrowLink>
          </Reveal>
        </div>
      </div>

      <ul className="mt-16 border-t harbour-rule lg:mt-24">
        {featuredServices.map((service, index) => (
          <Reveal key={service.href} as="li" delay={(index % 3) * 60}>
            <Link
              href={service.href}
              className="group grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-3 border-b harbour-rule py-8 transition-colors duration-200 hover:bg-harbour-paper-2 lg:grid-cols-[3.5rem_2.5rem_1fr_auto] lg:items-center lg:gap-x-8 lg:px-4"
            >
              <span className="harbour-micro pt-1 text-harbour-mute lg:pt-0">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="text-harbour-moss">
                <ServiceIcon name={service.icon} />
              </span>

              <span className="col-span-2 lg:col-span-1">
                <span className="harbour-md block text-harbour-ink">{service.title}</span>
                <span className="mt-1.5 block text-[0.9375rem] leading-[1.6] text-harbour-mute">
                  {service.description}
                </span>
              </span>

              {/* Decorative — the whole row is the link, so the arrow must not
                  announce itself as a second target. */}
              <svg
                aria-hidden="true"
                viewBox="0 0 24 8"
                className="hidden h-2 w-6 text-harbour-ink transition-transform duration-300 ease-[var(--ease-corporate)] group-hover:translate-x-1.5 lg:block"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <line x1="0" y1="4" x2="20" y2="4" />
                <path d="M16.5 0.5 20.5 4l-4 3.5" strokeLinecap="square" />
              </svg>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
