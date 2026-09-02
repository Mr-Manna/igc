import { Reveal } from "@/components/ui/Reveal";
import { industries } from "@/content/home";
import { industriesPage } from "@/content/industries";

/**
 * In-page anchors to the sector blocks, in the masthead slot `ServiceJumpNav`
 * occupies on /services.
 *
 * Anchors rather than links to `/industries/<slug>`: those routes do not exist,
 * and this page carries the detail they would hold. The `id`s are the sector
 * slugs, so `/industries#food-processing` is a stable address that survives the
 * per-sector pages shipping and these anchors becoming links.
 *
 * With this many entries the list depends on `scroll-padding-top: 6rem` in
 * globals.css to be doing its job — without it every target lands under the
 * sticky header.
 */
export function IndustryJumpNav() {
  return (
    <Reveal delay={220} className="mt-12 border-t rule-dark pt-7">
      <nav aria-label={industriesPage.jumpLabel}>
        <p className="label text-ink-invert-muted">{industriesPage.jumpLabel}</p>
        <ul className="mt-3.5 flex flex-wrap gap-2">
          {industries.map((industry) => (
            <li key={industry.slug}>
              <a
                href={`#${industry.slug}`}
                className="inline-block rounded-full border border-[var(--rule-on-dark)] bg-white/5 px-4 py-2 text-[0.875rem] font-medium text-white transition-colors duration-250 hover:border-blue-light hover:bg-white hover:text-navy"
              >
                {industry.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </Reveal>
  );
}
