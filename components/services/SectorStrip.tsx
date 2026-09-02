import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { sectors } from "@/content/home";
import { sectorStrip } from "@/content/services";

/**
 * The sector list, as type.
 *
 * The homepage runs the same list as a photographic rail. Repeating that here
 * would be the same content twice at the same weight, and this page has already
 * spent its attention budget on the twenty services — the sectors are context,
 * not a second headline act. So: chips, no pictures, no carousel.
 *
 * Every chip goes to the sector's block on the index rather than to a per-sector
 * page. Those routes do not exist; /sectors carries the detail they would
 * hold, anchored by the same slug, so these links land on the sector rather than
 * at the top of a list the reader then has to search.
 */
export function SectorStrip() {
  return (
    <section className="border-y rule-light bg-canvas">
      <div className="shell py-16 lg:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div>
            <Reveal>
              <p className="label flex items-center gap-3 text-blue">
                <span aria-hidden="true" className="h-px w-6 bg-current" />
                {sectorStrip.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="display-lg mt-4">{sectorStrip.heading}</h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="measure mt-5 text-slate">{sectorStrip.body}</p>
            </Reveal>
          </div>

          <Reveal delay={160} className="shrink-0">
            <Button href={sectorStrip.cta.href} variant="secondary">
              {sectorStrip.cta.label}
            </Button>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <ul className="mt-10 flex flex-wrap gap-2.5">
            {sectors.map((sector) => (
              <li key={sector.slug}>
                <Link
                  href={`/sectors#${sector.slug}`}
                  className="inline-block rounded-full border border-[var(--rule-on-light)] bg-surface px-4 py-2 text-[0.875rem] font-medium text-slate transition-colors duration-250 hover:border-blue hover:bg-canvas hover:text-blue"
                >
                  {sector.name}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
