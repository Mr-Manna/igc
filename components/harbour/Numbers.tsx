import { numbers, stats } from "@/content/harbour";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The four figures, in a hairline-ruled row on paper rather than in a dark band.
 *
 * `Counter` is reused as-is: it renders the final figure server-side and only
 * animates after hydration, so the numbers are real for crawlers and with
 * JavaScript off.
 *
 * `Reveal` is the single wrapper element between `<dl>` and each pair, not an
 * extra one — a `<dl>` may only contain `dt`, `dd`, `div`, `script` and
 * `template`, and nesting a second div inside fails that check. The live site's
 * `StatsBand` carries the same note.
 */
export function Numbers() {
  return (
    <section className="shell pb-24 lg:pb-32" aria-labelledby="harbour-numbers">
      <h2 id="harbour-numbers" className="harbour-micro text-harbour-moss">
        {numbers.eyebrow}
      </h2>

      {/* Two columns then four, so the vertical rule has to fall on the even
          cells at small sizes and on every cell but the first at `lg`. */}
      <dl className="mt-10 grid grid-cols-2 border-t harbour-rule lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal
            key={stat.label}
            delay={(index % 4) * 70}
            className="border-b harbour-rule py-8 even:border-l even:pl-5 lg:px-8 lg:not-first:border-l lg:first:pl-0"
          >
            <dd className="harbour-figure text-harbour-ink">
              <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </dd>
            <dt className="harbour-micro mt-4 text-harbour-mute">{stat.label}</dt>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
