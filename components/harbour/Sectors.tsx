import Link from "next/link";
import { sectors, sectorIndex } from "@/content/harbour";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "./ui/ArrowLink";
import { TwoWeightHeading } from "./ui/TwoWeightHeading";

/**
 * The sectors in a dense hairline grid.
 *
 * No cards: structure comes from the rules between cells. Each cell is a link to
 * the sectors index rather than to a per-sector page, because those pages are
 * still stubs — the live site's `Sectors` section does the same.
 */
export function Sectors() {
  return (
    <section className="shell pb-24 lg:pb-36">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Reveal as="p" className="harbour-micro text-harbour-moss">
            {sectorIndex.eyebrow}
          </Reveal>
          <Reveal delay={80}>
            <TwoWeightHeading heading={sectorIndex.heading} className="mt-6 max-w-[22ch]" />
          </Reveal>
        </div>
        <Reveal delay={160} className="lg:col-span-4 lg:col-start-9 lg:justify-self-end">
          <ArrowLink href={sectorIndex.cta.href}>{sectorIndex.cta.label}</ArrowLink>
        </Reveal>
      </div>

      <ul className="mt-14 grid grid-cols-2 border-t border-l harbour-rule sm:grid-cols-3 lg:mt-20 lg:grid-cols-4">
        {/* `sectors` gained a photograph when the live site's sectors section
            became image tiles. Harbour builds structure from hairlines and takes
            no pictures here, so it reads the name only. */}
        {sectors.map((sector, index) => (
          <Reveal key={sector.slug} as="li" delay={(index % 4) * 50}>
            <Link
              href={sectorIndex.cta.href}
              className="group flex h-full items-center gap-3 border-r border-b harbour-rule px-5 py-7 transition-colors duration-200 hover:bg-harbour-paper-2"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 bg-harbour-moss transition-transform duration-200 group-hover:scale-150"
              />
              <span className="text-[0.9375rem] font-semibold tracking-[-0.01em] text-harbour-ink">
                {sector.name}
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
