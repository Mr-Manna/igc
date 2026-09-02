import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/home";
import { serviceGroups, servicesPage } from "@/content/services";

/**
 * In-page anchors to the service blocks, rendered inside the navy masthead
 * in the slot the homepage hero gives its "Popular requests" chips.
 *
 * Grouped the same five ways as the page body, so the nav reads as a table of
 * contents rather than a wall of twenty chips. Anchors rather than links to
 * `/services/<slug>`: those routes are still stubs, and this page carries the
 * detail they will eventually hold. The `id`s are the service slugs, so
 * `/services#detailed-project-report` is a stable address that keeps working
 * when the per-service pages ship and the anchors become links.
 *
 * `html { scroll-padding-top: 6rem }` in globals.css is what stops a target
 * landing underneath the sticky header.
 */

const titleBySlug = new Map(services.map((service) => [service.slug, service.title]));

export function ServiceJumpNav() {
  return (
    <Reveal delay={220} className="mt-12 border-t rule-dark pt-7">
      <nav aria-label={servicesPage.jumpLabel}>
        <p className="label text-ink-invert-muted">{servicesPage.jumpLabel}</p>
        <div className="mt-4 space-y-4">
          {serviceGroups.map((group) => (
            <div key={group.id}>
              <p className="text-[0.8125rem] font-semibold text-blue-light">{group.heading}</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {group.slugs.map((slug) => (
                  <li key={slug}>
                    <a
                      href={`#${slug}`}
                      className="inline-block rounded-full border border-[var(--rule-on-dark)] bg-white/5 px-4 py-2 text-[0.875rem] font-medium text-white transition-colors duration-250 hover:border-blue-light hover:bg-white hover:text-navy"
                    >
                      {titleBySlug.get(slug)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </Reveal>
  );
}
