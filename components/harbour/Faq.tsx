import { faq } from "@/content/harbour";
import { Reveal } from "@/components/ui/Reveal";
import { TwoWeightHeading } from "./ui/TwoWeightHeading";

/**
 * The FAQ, as hairline rows with a sticky heading rail.
 *
 * Built on native `<details>`/`<summary>`, which is the whole reason this needs
 * no client component: it opens on Enter and Space, exposes its state to
 * assistive technology without any ARIA, and works with JavaScript off. The only
 * CSS involved drops the default marker and turns the chevron over on `[open]`.
 *
 * `top-24` on the rail clears the 4rem sticky header with room to spare.
 */
export function Faq() {
  return (
    <section className="shell pb-24 lg:pb-36" aria-labelledby="harbour-faq">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
          <span aria-hidden="true" className="block h-px w-12 bg-harbour-ink" />
          <Reveal delay={60}>
            <TwoWeightHeading
              heading={faq.heading}
              id="harbour-faq"
              className="mt-8 max-w-[18ch]"
            />
          </Reveal>
          <Reveal as="p" delay={120} className="mt-6 max-w-[26rem] text-harbour-mute">
            {faq.body}
          </Reveal>
          <Reveal delay={180} className="mt-6">
            <a
              href={`mailto:${faq.email}`}
              className="harbour-micro text-harbour-ink underline decoration-harbour-moss decoration-2 underline-offset-[6px] transition-colors duration-200 hover:text-harbour-moss"
            >
              {faq.email}
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <div className="border-t harbour-rule">
            {faq.items.map((item, index) => (
              <Reveal key={item.q} delay={(index % 4) * 50}>
                <details className="group border-b harbour-rule">
                  <summary className="flex items-start justify-between gap-6 py-6 text-[1.0625rem] leading-[1.5] font-medium text-harbour-ink transition-colors duration-200 hover:text-harbour-moss">
                    {item.q}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      className="harbour-chevron mt-1 h-4 w-4 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.25"
                    >
                      <line x1="8" y1="1" x2="8" y2="14" />
                      <path d="M3.5 9.5 8 14l4.5-4.5" strokeLinecap="square" />
                    </svg>
                  </summary>
                  <p className="max-w-[46rem] pb-7 text-[0.9375rem] leading-[1.7] text-harbour-mute">
                    {item.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
