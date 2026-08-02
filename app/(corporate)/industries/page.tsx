import type { Metadata } from "next";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { IndustriesEnquiry } from "@/components/industries/IndustriesEnquiry";
import { IndustriesFaq } from "@/components/industries/IndustriesFaq";
import { IndustryDetails } from "@/components/industries/IndustryDetails";
import { IndustryJumpNav } from "@/components/industries/IndustryJumpNav";
import { SectorApproach } from "@/components/industries/SectorApproach";
import { ServiceStrip } from "@/components/industries/ServiceStrip";
import { PageHeader } from "@/components/ui/PageHeader";
import { industries } from "@/content/home";
import { industriesPage } from "@/content/industries";
import { site } from "@/content/site";

/**
 * The sectors index — the third page built out, after the homepage and
 * /services, and the second axis of the same offer.
 *
 * Where /services is organised by what we do, this is organised by what the
 * client makes, because those are two different searches and a promoter runs one
 * or the other. The reference competitor organises their whole site this way, so
 * this is the page that meets them head-on; the difference is that theirs
 * matches manufacturers to independent consultants and lists sectors as
 * categories, while this one has to argue that sector knowledge is the thing
 * being bought.
 *
 * Hence the order: the argument first, then the twelve sectors, then the
 * cross-reference back to services, then the ask, with the remaining questions
 * parked last where they cannot interrupt anyone already convinced. The
 * `/industries/<slug>` routes do not exist; the depth they would carry is here,
 * anchored by slug, so `/industries#pharmaceutical` works today and keeps
 * working after they ship.
 */

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Industrial consultancy across twelve manufacturing sectors in India — plastic, food processing, beverage, chemical, textile, pharmaceutical, agriculture, engineering, packaging, recycling, automobile and steel. Sector-specific process routes, approvals and machinery.",
  alternates: { canonical: "/industries" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${site.url}/industries`,
    siteName: site.legalName,
    title: `Industries We Serve | ${site.name}`,
    description:
      "Manufacturing project consultancy across twelve sectors, each with its own process routes, statutory approvals and machinery market.",
  },
};

const breadcrumb = [
  { label: "Home", href: "/" },
  { label: "Industries", href: "/industries" },
];

/**
 * Breadcrumb plus the sector list. The `FAQPage` block for this page is emitted
 * by `IndustriesFaq` from the same array it renders; this one is generated from
 * `industries` for the same reason — neither can drift from what is on screen.
 *
 * Each sector is a plain `ListItem` with a name and its in-page anchor rather
 * than a `Service`. There is no `/industries/<slug>` to point at yet, and typing
 * a sector as a service would assert a product that does not have a page.
 */
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
    name: industriesPage.heading,
    numberOfItems: industries.length,
    itemListElement: industries.map((industry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: industry.name,
      url: `${site.url}/industries#${industry.slug}`,
    })),
  },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        breadcrumb={breadcrumb}
        eyebrow={industriesPage.eyebrow}
        heading={industriesPage.heading}
        body={industriesPage.body}
        primaryCta={industriesPage.primaryCta}
        secondaryCta={industriesPage.secondaryCta}
      >
        <IndustryJumpNav />
      </PageHeader>

      <SectorApproach />
      <IndustryDetails />
      <ServiceStrip />
      <IndustriesEnquiry />
      <IndustriesFaq />
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
