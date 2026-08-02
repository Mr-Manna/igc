import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { engagementProcess } from "@/content/services";

/**
 * The five stages, on navy.
 *
 * An `<ol>`, not a grid of cards: the order is the content. A reader who takes
 * nothing else from this page should leave knowing that the report comes before
 * the finance and the finance before the machinery, because that sequence is
 * the argument for hiring a consultant at all.
 *
 * The shared top rule with a marker at each step is the timeline — drawn from
 * the borders the layout already needs rather than from a separate graphic, so
 * it reflows to a vertical stack on narrow screens without any extra rules.
 */
export function EngagementProcess() {
  return (
    <section className="on-dark bg-navy">
      <div className="shell py-20 lg:py-28">
        <SectionHeading
          tone="dark"
          eyebrow={engagementProcess.eyebrow}
          heading={engagementProcess.heading}
          body={engagementProcess.body}
        />

        <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5 lg:gap-x-6">
          {engagementProcess.steps.map((step, index) => (
            <li key={step.no}>
              <Reveal delay={index * 60} className="relative border-t rule-dark pt-7">
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-0.5 w-8 -translate-y-px bg-blue-light"
                />

                <p className="font-display text-[1.75rem] leading-none font-bold text-blue-light tabular-nums">
                  {step.no}
                </p>

                <h3 className="display-md mt-4">{step.title}</h3>

                <p className="mt-3 text-[0.9375rem] text-ink-invert">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
