import { challenges } from "@/content/harbour";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "./ui/ArrowLink";
import { TwoWeightHeading } from "./ui/TwoWeightHeading";

/**
 * The one dark band on the page.
 *
 * `harbour-invert` is the scope hook that moves the focus ring from moss, which
 * disappears on this ground, to sage. Text in each cell is bottom-aligned
 * against a hairline grid — the cells are pushed apart by a `min-h` rather than
 * by padding, so the four baselines line up whatever the copy length.
 */
export function Challenges() {
  return (
    <section className="harbour-invert bg-harbour-dark py-24 lg:py-36">
      <div className="shell">
        <Reveal as="p" className="harbour-micro text-harbour-sage">
          {challenges.eyebrow}
        </Reveal>

        <Reveal delay={80}>
          <TwoWeightHeading
            heading={challenges.heading}
            tone="dark"
            className="mt-6 max-w-[24ch]"
          />
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal
            as="p"
            delay={160}
            className="max-w-[34rem] leading-[1.7] text-harbour-paper/70 lg:col-span-6"
          >
            {challenges.body}
          </Reveal>
          <Reveal delay={220} className="lg:col-span-4 lg:col-start-9">
            <ArrowLink href={challenges.cta.href} tone="dark">
              {challenges.cta.label}
            </ArrowLink>
          </Reveal>
        </div>

        <div className="mt-16 grid border-t harbour-rule-dark sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {challenges.items.map((item, index) => (
            <Reveal
              key={item.no}
              delay={(index % 4) * 80}
              className="flex min-h-[16rem] flex-col border-b harbour-rule-dark py-8 sm:even:border-l sm:even:pl-6 lg:px-6 lg:not-first:border-l lg:first:pl-0"
            >
              <p className="harbour-micro text-harbour-sage">{item.no}</p>
              {/* The spacer is what bottom-aligns the copy; `justify-end` on the
                  column would fight the index number at the top. */}
              <div className="flex-1" aria-hidden="true" />
              <h3 className="harbour-md text-harbour-paper">{item.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-[1.65] text-harbour-paper/70">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
