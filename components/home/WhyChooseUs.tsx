import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { whyChooseUs } from "@/content/home";

export function WhyChooseUs() {
  return (
    <section className="border-y rule-light bg-surface">
      <div className="shell grid items-center gap-12 py-20 lg:grid-cols-12 lg:gap-14 lg:py-28">
        <Reveal className="lg:col-span-5">
          <figure className="relative">
            <Media
              src={whyChooseUs.image.src}
              alt={whyChooseUs.image.alt}
              sizes="(max-width: 1024px) 100vw, 38vw"
              className="aspect-[4/3] w-full shadow-card lg:aspect-[4/5]"
            />

            {/* Credential card, overlapping the plate. */}
            <figcaption className="card absolute right-4 -bottom-6 flex items-center gap-3 px-5 py-4 shadow-lift sm:right-6">
              <span className="display-md text-[1.5rem] font-bold text-blue">50+</span>
              <span className="text-[0.8125rem] leading-tight font-medium text-navy">
                banking &amp; financial
                <br />
                institution partners
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="label flex items-center gap-3 text-blue">
              <span aria-hidden="true" className="h-px w-6 bg-current" />
              {whyChooseUs.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={70}>
            <h2 className="display-lg mt-4 max-w-[30rem]">{whyChooseUs.heading}</h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="measure mt-5 text-slate">{whyChooseUs.body}</p>
          </Reveal>

          <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {whyChooseUs.points.map((point, index) => (
              <li key={point.title}>
                <Reveal delay={index * 60}>
                  <div className="flex gap-3.5">
                    <CheckMark />
                    <div>
                      <h3 className="text-[1.0625rem] font-semibold">{point.title}</h3>
                      <p className="mt-1.5 text-[0.9375rem] text-slate">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal>
            <div className="mt-10">
              <Button href={whyChooseUs.cta.href} variant="secondary">
                {whyChooseUs.cta.label}
              </Button>
            </div>
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
      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue/10"
    >
      <svg
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5 text-blue"
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
