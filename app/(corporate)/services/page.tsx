import type { Metadata } from "next";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { EngagementProcess } from "@/components/services/EngagementProcess";
import { SectorStrip } from "@/components/services/SectorStrip";
import { ServiceDetails } from "@/components/services/ServiceDetails";
import { ServiceJumpNav } from "@/components/services/ServiceJumpNav";
import { ServicesEnquiry } from "@/components/services/ServicesEnquiry";
import { ServicesFaq } from "@/components/services/ServicesFaq";
import { PageHeader } from "@/components/ui/PageHeader";
import { services } from "@/content/home";
import { servicesPage } from "@/content/services";
import { site } from "@/content/site";

/**
 * The services index — the second page of the site to be built out, after the
 * homepage.
 *
 * The reference competitor has no equivalent: they are a marketplace that
 * matches manufacturers to independent consultants, so their site is organised
 * by industry and their nav has no services menu at all. This page therefore
 * follows ICF's own information architecture rather than theirs.
 *
 * Order is argument, then process, then reassurance, then the ask, with the
 * questions a reader still has parked last where they cannot interrupt anyone
 * who is already convinced. The six detail routes under `/services/<slug>` are
 * still stubs; the depth that will eventually live on them is here, anchored by
 * slug, so `/services#loan-consultancy` works today and keeps working after.
 */

export const metadata: Metadata = {
  title: "Industrial Consultancy Services",
  description:
    "Six industrial consultancy services for Indian manufacturers: project consultancy and DPR, government subsidy (PMEGP, PMFME, CGTMSE), loan and project finance, industrial engineering, machinery sourcing and plastic industry consultancy.",
  alternates: { canonical: "/services" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${site.url}/services`,
    siteName: site.legalName,
    title: `Industrial Consultancy Services | ${site.name}`,
    description:
      "Project consultancy, government subsidy, loan assistance, industrial engineering, machinery sourcing and plastic industry consultancy for Indian manufacturers.",
  },
};

const breadcrumb = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
];

/**
 * Breadcrumb plus the service list. The `FAQPage` block for this page is
 * emitted by `ServicesFaq` from the same array it renders, so the two cannot
 * drift; this one is generated from `services` for the same reason.
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
    name: servicesPage.heading,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        url: `${site.url}/services#${service.slug}`,
        provider: { "@type": "ProfessionalService", name: site.legalName },
        areaServed: { "@type": "Country", name: "India" },
      },
    })),
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        breadcrumb={breadcrumb}
        eyebrow={servicesPage.eyebrow}
        heading={servicesPage.heading}
        body={servicesPage.body}
        primaryCta={servicesPage.primaryCta}
        secondaryCta={servicesPage.secondaryCta}
      >
        <ServiceJumpNav />
      </PageHeader>

      <ServiceDetails />
      <EngagementProcess />
      <SectorStrip />
      <ServicesEnquiry />
      <ServicesFaq />
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
