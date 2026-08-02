import { Reveal } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { services } from "@/content/home";
import { serviceDetails } from "@/content/services";

/**
 * The six services at length — the substance of the page.
 *
 * Same layout for every one, not an alternating left/right rhythm. Alternation
 * reads as decoration when there is no photography to alternate, and it costs a
 * reader comparing two services the ability to find the same fact in the same
 * place twice.
 *
 * The argument column leads in the DOM and the deliverables card follows, so the
 * reading order is what-and-why before what-you-get. Each block is an
 * `<article>` with the service slug as its `id`; see `ServiceJumpNav`.
 *
 * Every heading here is an `<h2>` — the page `<h1>` is in the masthead and names
 * the set — with `<h3>` inside the card. That keeps the outline flat and true.
 */
export function ServiceDetails() {
  return (
    <section className="bg-canvas">
      <div className="shell py-20 lg:py-28">
        <div className="space-y-16 lg:space-y-24">
          {services.map((service, index) => {
            const detail = serviceDetails[service.slug];

            return (
              <article
                key={service.slug}
                id={service.slug}
                className="grid gap-10 border-t rule-light pt-12 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:gap-14 lg:pt-16"
              >
                <div className="lg:col-span-5">
                  <Reveal className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-btn bg-blue/10 text-blue">
                      <ServiceIcon name={service.icon} />
                    </span>
                    <span className="label text-slate-muted tabular-nums">
                      {String(index + 1).padStart(2, "0")} / {services.length}
                    </span>
                  </Reveal>

                  <Reveal delay={70}>
                    <h2 className="display-lg mt-6">{service.title}</h2>
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
                        /services/<slug>, which is still a stub. Six of these
                        would otherwise read as six identical links in a screen
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
                    <h3 className="label text-slate-muted">What you get</h3>

                    <ul className="mt-5 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
                      {detail.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-slate">
                          <CheckMark />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 border-t rule-light pt-6">
                      <h3 className="label text-slate-muted">Best suited to</h3>
                      <p className="mt-2.5 text-[0.9375rem] text-slate">{detail.bestFor}</p>
                    </div>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>
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
