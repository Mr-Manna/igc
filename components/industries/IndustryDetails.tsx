import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { industries } from "@/content/home";
import { industryDetails } from "@/content/industries";

/**
 * The twelve sectors at length — the substance of the page.
 *
 * The same column arrangement for every sector rather than an alternating
 * left/right rhythm. Alternation would give a long page some visual variety, but
 * it costs a reader comparing two sectors the ability to find the same fact in
 * the same place twice, and comparison is precisely what someone choosing
 * between adjacent sectors is doing here.
 *
 * The split across the two columns is by kind, not by length: the left column is
 * what the sector looks like — the photograph, and the gates that constrain any
 * project in it — and the right column is the argument and what we build. It
 * also happens to balance, because an image plus a four-item card is about the
 * height of a heading plus two paragraphs and a five-item list.
 *
 * Every heading is an `<h2>`; the page `<h1>` in the masthead names the set.
 */
export function IndustryDetails() {
  return (
    <section className="bg-canvas">
      <div className="shell py-20 lg:py-28">
        <div className="space-y-16 lg:space-y-24">
          {industries.map((industry, index) => {
            const detail = industryDetails[industry.slug];

            return (
              <article
                key={industry.slug}
                id={industry.slug}
                className="grid gap-10 border-t rule-light pt-12 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:gap-14 lg:pt-16"
              >
                <Reveal className="lg:col-span-5">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-[var(--rule-on-light)]">
                    <Image
                      src={industry.image.src}
                      alt={industry.image.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="card mt-6 p-6 lg:p-7">
                    <h3 className="label text-slate-muted">What decides viability</h3>
                    <ul className="mt-4 space-y-3">
                      {detail.gates.map((gate) => (
                        <li
                          key={gate}
                          className="flex items-start gap-3 text-[0.9375rem] text-slate"
                        >
                          <Dot />
                          {gate}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <div className="lg:col-span-7">
                  <Reveal>
                    <span className="label text-slate-muted tabular-nums">
                      {String(index + 1).padStart(2, "0")} / {industries.length}
                    </span>
                  </Reveal>

                  <Reveal delay={70}>
                    <h2 className="display-lg mt-4">{industry.name}</h2>
                  </Reveal>

                  <Reveal delay={120}>
                    <p className="mt-4 text-[1.0625rem] font-medium text-navy">{detail.lede}</p>
                  </Reveal>

                  <Reveal delay={170}>
                    <p className="mt-4 text-slate">{detail.body}</p>
                  </Reveal>

                  <Reveal delay={210}>
                    <div className="mt-8 border-t rule-light pt-6">
                      <h3 className="label text-slate-muted">Units we set up</h3>
                      <ul className="mt-4 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
                        {detail.units.map((unit) => (
                          <li
                            key={unit}
                            className="flex items-start gap-3 text-[0.9375rem] text-slate"
                          >
                            <CheckMark />
                            {unit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>

                  <Reveal delay={250}>
                    {/* Points at the form on this page rather than at
                        /industries/<slug>, which does not exist. Twelve of these
                        would read as twelve identical links in a screen reader's
                        link list, hence the off-screen qualifier. */}
                    <a
                      href="#enquiry"
                      className="group mt-7 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-blue"
                    >
                      Discuss a project in this sector
                      <span className="sr-only"> — {industry.name}</span>
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

/**
 * A marker rather than a tick: these are constraints a project has to clear, not
 * things being handed over, and the tick used for deliverables would read as a
 * promise that they are already satisfied.
 */
function Dot() {
  return (
    <span
      aria-hidden="true"
      className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-blue"
    />
  );
}
