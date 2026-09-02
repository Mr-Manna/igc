import { Reveal } from "@/components/ui/Reveal";
import { sectors } from "@/content/home";
import { sectorsPage } from "@/content/sectors";

/**
 * In-page anchors to the sector blocks, in the masthead slot `ServiceJumpNav`
 * occupies on /services.
 *
 * Anchors rather than links to `/sectors/<slug>`: those routes do not exist,
 * and this page carries the detail they would hold. The `id`s are the sector
 * slugs, so `/sectors#food-processing` is a stable address that survives the
 * per-sector pages shipping and these anchors becoming links.
 *
 * With this many entries the list depends on `scroll-padding-top: 6rem` in
 * globals.css to be doing its job — without it every target lands under the
 * sticky header.
 */
export function SectorJumpNav() {
  return (
    <Reveal delay={220} className="mt-12 border-t rule-dark pt-7">
      <nav aria-label={sectorsPage.jumpLabel}>
        <p className="label text-ink-invert-muted">{sectorsPage.jumpLabel}</p>
        <ul className="mt-3.5 flex flex-wrap gap-2">
          {sectors.map((sector) => (
            <li key={sector.slug}>
              <a
                href={`#${sector.slug}`}
                className="inline-block rounded-full border border-[var(--rule-on-dark)] bg-white/5 px-4 py-2 text-[0.875rem] font-medium text-white transition-colors duration-250 hover:border-blue-light hover:bg-white hover:text-navy"
              >
                {sector.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </Reveal>
  );
}
