import { Reveal } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { services } from "@/content/home";
import { serviceDetails, serviceGroups } from "@/content/services";

/**
 * The services at length — the substance of the page.
 *
 * Twenty services is too many for a flat list, so they run in the five themed
 * sections of `serviceGroups`: a group header (`<h2>`) and its blurb, then each
 * service as an `<article>` with the slug as its `id` (see `ServiceJumpNav`).
 *
 * Same layout for every service, not an alternating left/right rhythm.
 * Alternation reads as decoration when there is no photography to alternate, and
 * it costs a reader comparing two services the ability to find the same fact in
 * the same place twice. The argument column leads in the DOM and the
 * deliverables card follows, so the reading order is what-and-why before
 * what-you-get.
 *
 * Heading outline: the page `<h1>` is in the masthead; each group is an `<h2>`,
 * each service an `<h3>`, and the card labels `<h4>`. Flat and true.
 */

const serviceBySlug = new Map(services.map((service) => [service.slug, service]));

export function ServiceDetails() {
  const total = services.length;
  let position = 0;

  return (
    <section className="bg-canvas">
      <div className="shell space-y-16 py-20 lg:space-y-24 lg:py-28">
        {serviceGroups.map((group) => (
          <div key={group.id} id={group.id} className="space-y-12 lg:space-y-16">
            <Reveal className="max-w-2xl">
              <h2 className="display-lg">{group.heading}</h2>
              <p className="mt-3 text-slate">{group.blurb}</p>
            </Reveal>

            {group.slugs.map((slug) => {
              const service = serviceBySlug.get(slug);
              if (!service) return null;
              const detail = serviceDetails[slug];
              position += 1;
              const index = position;

              return (
                <article
                  key={slug}
                  id={slug}
                  className="grid gap-10 border-t rule-light pt-12 lg:grid-cols-12 lg:gap-14 lg:pt-14"
                >
                  <div className="lg:col-span-5">
                    <Reveal className="flex items-center gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-btn bg-blue/10 text-blue">
                        <ServiceIcon name={service.icon} />
                      </span>
                      <span className="label text-slate-muted tabular-nums">
                        {String(index).padStart(2, "0")} / {total}
                      </span>
                    </Reveal>

                    <Reveal delay={70}>
                      <h3 className="display-md mt-6">{service.title}</h3>
                    </Reveal>

                    <div className="mt-5 space-y-4">
                      {detail.overview.map((paragraph, paragraphIndex) => (
                        <Reveal
                          as="p"
                          key={paragraph.slice(0, 24)}
                          delay={120 + paragraphIndex * 50}
                          className="text-slate"
                        >
                          {paragraph}
                        </Reveal>
                      ))}
                    </div>

                    <Reveal delay={230}>
                      {/* Points at the form on this page rather than at
                          /services/<slug>, which is still a stub. Each of these
                          would otherwise read as an identical link in a screen
                          reader's link list, hence the off-screen qualifier. */}
                      <a
                        href="#enquiry"
                        className="group mt-7 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-blue"
                      >
                        Discuss this service
                        <span className="sr-only"> — {service.title}</span>
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
                      </a>
                    </Reveal>
                  </div>

                  <Reveal delay={140} className="lg:col-span-7">
                    {/* Deliberately not `h-full`. The argument column is usually
                        the taller of the two, and a card stretched to match it
                        ends in a block of empty space that reads as unfinished
                        rather than as alignment. */}
                    <div className="card p-7 lg:p-9">
                      <h4 className="label text-slate-muted">What you get</h4>

                      <ul className="mt-5 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
                        {detail.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-slate">
                            <CheckMark />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8 border-t rule-light pt-6">
                        <h4 className="label text-slate-muted">Best suited to</h4>
                        <p className="mt-2.5 text-[0.9375rem] text-slate">{detail.bestFor}</p>
                      </div>
                    </div>
                  </Reveal>
                </article>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

function CheckMark() {
  return (
    <span
      aria-hidden="true"
      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue/10"
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
