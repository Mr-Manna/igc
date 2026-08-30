import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/home";
import { servicesPage } from "@/content/services";

/**
 * In-page anchors to the service blocks, rendered inside the navy masthead
 * in the slot the homepage hero gives its "Popular requests" chips.
 *
 * Anchors rather than links to `/services/<slug>`: those routes are still stubs,
 * and this page carries the detail they will eventually hold. The `id`s are the
 * service slugs, so `/services#loan-consultancy` is a stable address that keeps
 * working when the per-service pages ship and the anchors become links.
 *
 * `html { scroll-padding-top: 6rem }` in globals.css is what stops a target
 * landing underneath the sticky header.
 */
export function ServiceJumpNav() {
  return (
    <Reveal delay={220} className="mt-12 border-t rule-dark pt-7">
      <nav aria-label={servicesPage.jumpLabel}>
        <p className="label text-ink-invert-muted">{servicesPage.jumpLabel}</p>
        <ul className="mt-3.5 flex flex-wrap gap-2">
          {services.map((service) => (
            <li key={service.slug}>
              <a
                href={`#${service.slug}`}
                className="inline-block rounded-full border border-[var(--rule-on-dark)] bg-white/5 px-4 py-2 text-[0.875rem] font-medium text-white transition-colors duration-250 hover:border-blue-light hover:bg-white hover:text-navy"
              >
                {service.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </Reveal>
  );
}
