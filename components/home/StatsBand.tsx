import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/content/home";

/**
 * The four headline figures, on a white card straddling the hero's lower edge.
 *
 * Previously a navy full-bleed band. It moved onto a card because the hero is
 * now itself dark and full-bleed — two stacked dark bands read as one very tall
 * one, and the figures stopped registering as a separate claim. Lifting them
 * onto white also puts the first light surface on the page directly under the
 * fold, which is what makes the hero read as a masthead rather than the whole
 * screen.
 *
 * The negative margin is the overlap. The hero carries matching extra bottom
 * padding so nothing is covered.
 */
export function StatsBand() {
  return (
    <section className="relative z-10 -mt-28 lg:-mt-32" aria-label="IGC by the numbers">
      <div className="shell">
        <div className="card px-6 py-10 shadow-lift sm:px-10 lg:py-12">
          <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
            {/* Reveal renders the grouping <div> itself. A <dl> may only contain
                dt/dd or a single <div> wrapper — an extra nesting level here is
                invalid HTML and fails axe's definition-list rule. */}
            {stats.map((stat, index) => (
              <Reveal
                key={stat.label}
                delay={index * 70}
                className="flex flex-col-reverse px-2 text-center sm:px-6 lg:border-l lg:rule-light lg:first:border-l-0"
              >
                {/* Term before definition in the DOM; reversed visually so the
                    figure reads first. */}
                <dt className="mt-2 text-[0.9375rem] text-slate">{stat.label}</dt>
                <dd className="display-lg text-[clamp(2.25rem,4vw,3rem)] font-bold text-blue">
                  <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
