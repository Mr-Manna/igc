import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/content/home";

/**
 * The one dark band in the upper half of the page. It separates the hero from
 * the services index and gives the figures the weight they earn — a light
 * four-up on ivory read as a caption strip.
 */
export function StatsBand() {
  return (
    <section className="on-dark bg-navy" aria-label="IGC by the numbers">
      <div className="shell py-14 lg:py-16">
        <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {/* Reveal renders the grouping <div> itself. A <dl> may only contain
              dt/dd or a single <div> wrapper — an extra nesting level here is
              invalid HTML and fails axe's definition-list rule. */}
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 70}
              className="flex flex-col-reverse sm:px-6 sm:first:pl-0 lg:border-l lg:rule-dark lg:first:border-l-0 lg:first:pl-0"
            >
              {/* Term before definition in the DOM; reversed visually so the
                  figure reads first. */}
              <dt className="mt-2 text-[0.9375rem] text-ink-invert-muted">{stat.label}</dt>
              <dd className="display-lg text-[clamp(2.25rem,4vw,3rem)] font-bold text-white">
                <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
