import type { Metadata } from "next";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { SectorsEnquiry } from "@/components/sectors/SectorsEnquiry";
import { SectorsFaq } from "@/components/sectors/SectorsFaq";
import { SectorDetails } from "@/components/sectors/SectorDetails";
import { SectorJumpNav } from "@/components/sectors/SectorJumpNav";
import { SectorApproach } from "@/components/sectors/SectorApproach";
import { ServiceStrip } from "@/components/sectors/ServiceStrip";
import { PageHeader } from "@/components/ui/PageHeader";
import { sectors } from "@/content/home";
import { sectorsPage } from "@/content/sectors";
import { site } from "@/content/site";

/**
 * The sectors index — the fourth page built out, after the homepage, /about and
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
 * Hence the order: the argument first, then the sectors, then the
 * cross-reference back to services, then the ask, with the remaining questions
 * parked last where they cannot interrupt anyone already convinced. The
 * `/sectors/<slug>` routes do not exist; the depth they would carry is here,
 * anchored by slug, so `/sectors#food-processing` works today and keeps
 * working after they ship.
 */

export const metadata: Metadata = {
  title: "Sectors We Serve",
  description:
    "Industrial consultancy across 20+ manufacturing, processing and infrastructure sectors in India — food processing, dairy, beverage, plastics, packaging, cold chain, poultry, engineering, textile and more. Sector-specific project lists, machinery and DPR support.",
  alternates: { canonical: "/sectors" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${site.url}/sectors`,
    siteName: site.legalName,
    title: `Sectors We Serve | ${site.name}`,
    description:
      "Manufacturing project consultancy across 20+ sectors, each with its own process routes, applicable norms and machinery market.",
  },
};

const breadcrumb = [
  { label: "Home", href: "/" },
  { label: "Sectors", href: "/sectors" },
];

/**
 * Breadcrumb plus the sector list. The `FAQPage` block for this page is emitted
 * by `SectorsFaq` from the same array it renders; this one is generated from
 * `sectors` for the same reason — neither can drift from what is on screen.
 *
 * Each sector is a plain `ListItem` with a name and its in-page anchor rather
 * than a `Service`. There is no `/sectors/<slug>` to point at yet, and typing
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
    name: sectorsPage.heading,
    numberOfItems: sectors.length,
    itemListElement: sectors.map((sector, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: sector.name,
      url: `${site.url}/sectors#${sector.slug}`,
    })),
  },
];

export default function SectorsPage() {
  return (
    <>
      <PageHeader
        breadcrumb={breadcrumb}
        eyebrow={sectorsPage.eyebrow}
        heading={sectorsPage.heading}
        body={sectorsPage.body}
        primaryCta={sectorsPage.primaryCta}
        secondaryCta={sectorsPage.secondaryCta}
      >
        <SectorJumpNav />
      </PageHeader>

      <SectorApproach />
      <SectorDetails />
      <ServiceStrip />
      <SectorsEnquiry />
      <SectorsFaq />
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
