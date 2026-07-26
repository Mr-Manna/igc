import Link from "next/link";
import {
  contact,
  footerQuickLinks,
  footerServiceLinks,
  legalLinks,
  site,
  telHref,
} from "@/content/site";

const socials = [
  { label: "LinkedIn", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
];

/**
 * Column spans sum to exactly 12: 1–4 · 6–7 · 8–9 · 10–12, with column 5 left
 * as a gutter between the brand block and the link columns. They previously
 * summed to 13, which silently wrapped Contact Us onto a second row.
 */
export function Footer() {
  return (
    <footer className="on-dark bg-navy-deep text-ink-invert-muted">
      {/* Extra bottom padding keeps the legal row clear of the fixed WhatsApp /
          call buttons, which sit above the viewport edge and were landing on
          top of the last legal link at the end of the scroll. */}
      <div className="shell pt-16 pb-32 lg:pt-20 lg:pb-36">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand + newsletter */}
          <div className="lg:col-span-4">
            <div className="font-display text-[1.625rem] leading-none font-bold tracking-[-0.03em] text-white">
              IGC<span className="text-blue-light">.</span>
            </div>
            <p className="mt-3 text-[0.9375rem] font-medium text-white">{site.legalName}</p>
            <p className="measure mt-4 text-[0.9375rem] leading-relaxed">
              {site.description}
            </p>

            <form className="mt-8 max-w-sm">
              <label htmlFor="newsletter" className="label block text-white">
                Newsletter
              </label>
              <div className="mt-3 flex gap-2">
                <input
                  id="newsletter"
                  type="email"
                  required
                  placeholder="Your email address"
                  className="w-full rounded-btn border border-[var(--rule-on-dark)] bg-white/5 px-4 py-2.5 text-[0.9375rem] text-white placeholder:text-ink-invert-muted focus:border-blue-light focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-btn bg-blue px-5 text-[0.875rem] font-semibold text-white transition-colors hover:bg-blue-light hover:text-navy"
                >
                  Join
                </button>
              </div>
            </form>

            <ul className="mt-8 flex flex-wrap gap-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="inline-block rounded-full border border-[var(--rule-on-dark)] px-3.5 py-1.5 text-[0.8125rem] transition-colors hover:border-blue-light hover:text-white"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterColumn
            title="Company"
            links={footerQuickLinks}
            className="lg:col-span-2 lg:col-start-6"
          />

          <FooterColumn title="Services" links={footerServiceLinks} className="lg:col-span-2" />

          {/* Contact */}
          <div className="lg:col-span-3 lg:col-start-10">
            <h2 className="label text-white">Contact Us</h2>
            <address className="mt-5 space-y-4 text-[0.9375rem] not-italic">
              <p className="leading-relaxed">
                {contact.addressLine1},
                <br />
                {contact.addressLine2}
              </p>
              <p>
                <a href={telHref} className="transition-colors hover:text-white">
                  {contact.phonePrimary}
                </a>
              </p>
              <p>
                {/* The previous site displayed info@igcindia.com but linked to info@igc.com. */}
                <a
                  href={`mailto:${contact.emailPrimary}`}
                  className="transition-colors hover:text-white"
                >
                  {contact.emailPrimary}
                </a>
              </p>
            </address>

            <dl className="mt-6 space-y-1.5 text-[0.875rem]">
              {contact.hours.map((slot) => (
                <div key={slot.days} className="flex justify-between gap-4">
                  <dt>{slot.days}</dt>
                  <dd className="text-white">{slot.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-14 flex flex-col gap-4 border-t rule-dark pt-7 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.fullName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  className,
}: {
  title: string;
  links: { label: string; href: string }[];
  /** Grid placement — the column owns its own cell. */
  className: string;
}) {
  return (
    <div className={className}>
      <h2 className="label text-white">{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[0.9375rem] transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
