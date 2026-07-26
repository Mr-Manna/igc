import Link from "next/link";
import { insights } from "@/content/harbour";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "./ui/ArrowLink";
import { Plate } from "./ui/Plate";

/**
 * The insights row.
 *
 * TODO(real-data): every article here is fabricated — invented headlines, tags
 * and dates, written to fill this layout. IGC has published nothing. Delete this
 * section or replace all four items before the page is shown outside the team.
 * See the note at the top of `content/harbour.ts`.
 *
 * Below `lg` the row scrolls horizontally inside its own container — the page
 * body must never scroll sideways, so the overflow is owned here and the track
 * is padded out to the shell gutter rather than nested inside it.
 */
export function Insights() {
  return (
    <section className="border-t harbour-rule py-24 lg:py-36" aria-labelledby="harbour-insights">
      <div className="shell flex flex-wrap items-end justify-between gap-6">
        <h2 id="harbour-insights" className="harbour-head font-bold text-harbour-ink">
          {insights.eyebrow}
        </h2>
        <ArrowLink href={insights.cta.href}>{insights.cta.label}</ArrowLink>
      </div>

      <ul className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-[var(--shell-pad)] pb-2 lg:mx-auto lg:grid lg:max-w-[var(--shell-max)] lg:grid-cols-4 lg:gap-8 lg:overflow-visible lg:pb-0">
        {insights.items.map((item, index) => (
          <Reveal
            key={item.title}
            as="li"
            delay={(index % 4) * 70}
            className="w-[17rem] shrink-0 snap-start lg:w-auto"
          >
            <Link href={item.href} className="group block">
              <Plate
                src={item.image.src}
                alt={item.image.alt}
                sizes="(max-width: 1024px) 17rem, 22vw"
                className="aspect-[4/3] w-full"
              />
              {/* Date on its own line above the chips rather than pushed to the
                  end of them: in a column this narrow a two-tag card wrapped the
                  date onto a second row and dropped that card's title out of
                  line with the other three. */}
              <time dateTime={item.datetime} className="harbour-micro mt-5 block text-harbour-mute">
                {item.date}
              </time>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="harbour-micro bg-harbour-paper-2 px-2.5 py-1 text-harbour-mute"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="mt-4 text-[1.0625rem] leading-[1.35] font-bold tracking-[-0.015em] text-harbour-ink transition-colors duration-200 group-hover:text-harbour-moss">
                {item.title}
              </h3>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
