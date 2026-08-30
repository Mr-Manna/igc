import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { services } from "@/content/home";

/**
 * Services as a three-up card grid.
 *
 * Replaces the full-bleed hairline rows that flooded orange on hover: that
 * treatment gave every service the same visual weight as a navigation item and
 * hid the descriptions until the cursor arrived. A card states the offer, the
 * summary and the next step at rest.
 *
 * Only the featured (core) engagements show here — the sector-specific ones live
 * on /services alone, so this grid stays two clean rows of three.
 */
const featuredServices = services.filter((service) => service.featured);

export function ServicesIndex() {
  return (
    <section className="bg-canvas">
      <div className="shell py-20 lg:py-28">
        <SectionHeading
          align="center"
          eyebrow="Our Services"
          heading="Comprehensive Industrial Solutions"
          body="From project concept to commissioning, we provide end-to-end consultancy services for manufacturing industries."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, index) => (
            <li key={service.href} className="flex">
              <Reveal delay={(index % 3) * 70} className="flex w-full">
                <Link
                  href={service.href}
                  className="card card-interactive group flex w-full flex-col p-7"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-btn bg-blue/10 text-blue transition-colors duration-250 group-hover:bg-blue group-hover:text-white">
                    <ServiceIcon name={service.icon} />
                  </span>

                  <h3 className="display-md mt-6">{service.title}</h3>

                  <p className="mt-3 text-[0.9375rem] text-slate">{service.description}</p>

                  {/* The deliverables, not features. This is what the reference
                      site gets right: three concrete nouns per card do more than
                      a second sentence of description. */}
                  <ul className="mt-5 space-y-2 border-t rule-light pt-5">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2.5 text-[0.875rem] text-slate"
                      >
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 16 16"
                          className="h-3 w-3 shrink-0 text-blue"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M6 3l5 5-5 5" />
                        </svg>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-auto flex items-center gap-2 pt-7 text-[0.875rem] font-semibold text-blue">
                    Learn more
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      className="h-3.5 w-3.5 transition-transform duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 8h11M9 4l4 4-4 4" />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <div className="mt-12 flex justify-center">
            <Button href="/services" variant="secondary">
              View All Services
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
