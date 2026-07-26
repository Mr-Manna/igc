import Link from "next/link";
import { contact, footerServiceLinks, legalLinks, site, telHref } from "@/content/site";
import { harbourNav } from "@/content/harbour";
import { ArrowLink } from "./ui/ArrowLink";

/**
 * The footer, on paper rather than in a dark slab.
 *
 * Reuses `footerServiceLinks` and `legalLinks` from `content/site.ts` — the live
 * footer reads the same arrays, so a link corrected in one place is corrected in
 * both. There is deliberately no newsletter field: the live site carries one that
 * does not submit anywhere, and duplicating a control that does nothing is not
 * worth the visual weight.
 */
export function HarbourFooter() {
  return (
    <footer className="border-t harbour-rule">
      <div className="shell py-16 lg:py-20">
        <div className="flex items-baseline gap-4">
          <span className="text-[1.5rem] leading-none font-bold tracking-[-0.05em] text-harbour-ink">
            IGC
            <span className="text-harbour-moss">.</span>
          </span>
          <span className="harbour-micro text-harbour-mute">{site.legalName}</span>
          <span aria-hidden="true" className="hidden h-px flex-1 bg-harbour-rule sm:block" />
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <h2 className="harbour-micro text-harbour-mute">Contact</h2>
            <a
              href={`mailto:${contact.emailPrimary}`}
              className="mt-5 block font-medium text-harbour-ink transition-colors duration-200 hover:text-harbour-moss"
            >
              {contact.emailPrimary}
            </a>
            <a
              href={telHref}
              className="mt-1.5 block font-medium text-harbour-ink transition-colors duration-200 hover:text-harbour-moss"
            >
              {contact.phonePrimary}
            </a>
            <address className="mt-6 text-[0.9375rem] leading-[1.7] text-harbour-mute not-italic">
              {contact.addressLine1}
              <br />
              {contact.addressLine2}
            </address>
            <dl className="mt-6 text-[0.9375rem] text-harbour-mute">
              {contact.hours.map((slot) => (
                <div key={slot.days} className="flex gap-2">
                  <dt>{slot.days}</dt>
                  <dd className="text-harbour-ink">{slot.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-4">
            <h2 className="harbour-micro text-harbour-mute">Services</h2>
            <ul className="mt-5 space-y-2.5">
              {footerServiceLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] text-harbour-ink transition-colors duration-200 hover:text-harbour-moss"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="harbour-micro text-harbour-mute">Navigate</h2>
            <ul className="mt-5 space-y-2.5">
              {harbourNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] text-harbour-ink capitalize transition-colors duration-200 hover:text-harbour-moss"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-harbour-paper-2 p-8 lg:col-span-3">
            <p className="text-[1.5rem] leading-[1.1] font-bold tracking-[-0.03em] text-harbour-ink">
              Start a project
            </p>
            <p className="mt-3 text-[0.9375rem] leading-[1.6] text-harbour-mute">
              Tell us what you intend to build. The first conversation costs
              nothing.
            </p>
            <ArrowLink href="/contact" className="mt-6">
              Get in touch
            </ArrowLink>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t harbour-rule pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="harbour-micro text-harbour-mute">
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="harbour-micro text-harbour-mute transition-colors duration-200 hover:text-harbour-moss"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
