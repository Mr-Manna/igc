import type { Metadata } from "next";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { partners, partnersPage } from "@/content/partners";
import { site } from "@/content/site";

/**
 * The partners page — longer write-ups of the two firms ICF brings into
 * engagements. The site-wide summary band (`components/partners/PartnersBand`)
 * links here and also renders below this page's closing CTA, like any other
 * footer element.
 */

export const metadata: Metadata = {
  title: "Partners",
  description:
    "ICF's delivery partners: Quiet Seven for brand, digital and product design, and Substrate for cloud, data, AI and industrial-automation engineering — specialist firms brought into a manufacturing project when the work needs them.",
  alternates: { canonical: "/partners" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${site.url}/partners`,
    siteName: site.legalName,
    title: `Partners | ${site.name}`,
    description:
      "Highly capable partners for the work beyond the plant — brand and digital with Quiet Seven, cloud, data and automation engineering with Substrate.",
  },
};

const breadcrumb = [
  { label: "Home", href: "/" },
  { label: "Partners", href: "/partners" },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumb.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: crumb.href === "/" ? site.url : `${site.url}${crumb.href}`,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: partnersPage.heading,
    itemListElement: partners.map((partner, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Organization",
        name: partner.name,
        url: partner.url,
        description: partner.positioning,
        knowsAbout: partner.capabilities,
      },
    })),
  },
];

export default function PartnersPage() {
  return (
    <>
      <PageHeader
        breadcrumb={breadcrumb}
        eyebrow={partnersPage.eyebrow}
        heading={partnersPage.heading}
        body={partnersPage.body}
        primaryCta={partnersPage.primaryCta}
        secondaryCta={partnersPage.secondaryCta}
      />

      <PartnerDetails />
      <ClosingCTA />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          // Escape `<` so a future copy edit can never terminate this script tag.
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}

/** One block per partner, alternating canvas / surface. */
function PartnerDetails() {
  return (
    <>
      {partners.map((partner, index) => (
        <section
          key={partner.slug}
          id={partner.slug}
          className={
            index % 2 === 0
              ? "scroll-mt-24 bg-canvas"
              : "scroll-mt-24 border-y rule-light bg-surface"
          }
        >
          <div className="shell grid gap-10 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="label flex items-center gap-3 text-blue">
                  <span aria-hidden="true" className="h-px w-6 bg-current" />
                  {partner.discipline}
                </p>
              </Reveal>

              <Reveal delay={70}>
                <h2 className="display-lg mt-4">{partner.name}</h2>
              </Reveal>

              <Reveal delay={120}>
                <p className="measure mt-5 text-slate">{partner.bringsToIcf}</p>
              </Reveal>

              <Reveal delay={160}>
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-7 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-blue transition-colors hover:text-blue-dark"
                >
                  Visit {partner.name}
                  <span className="sr-only"> (opens in a new tab)</span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="h-3.5 w-3.5 transition-transform duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 8h11M9 4l4 4-4 4" />
                  </svg>
                </a>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <div className="space-y-5">
                {partner.body.map((paragraph, paragraphIndex) => (
                  <Reveal
                    as="p"
                    key={paragraph.slice(0, 24)}
                    delay={70 + paragraphIndex * 50}
                    className="measure text-slate"
                  >
                    {paragraph}
                  </Reveal>
                ))}
              </div>

              <Reveal delay={200}>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {partner.capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="rounded-full border border-[var(--rule-on-light)] bg-canvas px-3 py-1 text-[0.8125rem] text-slate"
                    >
                      {capability}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={240}>
                <p className="mt-10 text-[0.9375rem] font-semibold text-navy">
                  What ICF hands them
                </p>
                <ul className="mt-4 space-y-2.5 border-t rule-light pt-5">
                  {partner.engagements.map((engagement) => (
                    <li
                      key={engagement}
                      className="flex items-start gap-3 text-[0.9375rem] text-slate"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className="mt-1 h-3 w-3 shrink-0 text-blue"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 3l5 5-5 5" />
                      </svg>
                      {engagement}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
