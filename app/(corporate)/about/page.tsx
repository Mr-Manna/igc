import type { Metadata } from "next";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { FaqSection } from "@/components/faq/FaqSection";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { aboutPage, ourMission, ourVision, whoWeAre } from "@/content/about";
import { generalFaq } from "@/content/faq";
import { site } from "@/content/site";

/**
 * The company page — the fourth route built out, after the homepage,
 * /services and /sectors.
 *
 * Sections render as distinct blocks under their own headings rather than one
 * flat paragraph run: Who We Are carries the argument at full width, while
 * Mission and Vision are single statements, so they sit side by side as paired
 * cards instead of stretching one line across the full measure.
 */

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Industrial Consultancy Firm (ICF) is a team of industrial consultants, engineers, financial experts and market strategists building profitable, sustainable manufacturing businesses across India.",
  alternates: { canonical: "/about" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${site.url}/about`,
    siteName: site.legalName,
    title: `About Us | ${site.name}`,
    description:
      "A team of industrial consultants, engineers, financial experts and market strategists dedicated to building profitable and sustainable manufacturing businesses.",
  },
};

const breadcrumb = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: breadcrumb.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.label,
    item: crumb.href === "/" ? site.url : `${site.url}${crumb.href}`,
  })),
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        breadcrumb={breadcrumb}
        eyebrow={aboutPage.eyebrow}
        heading={aboutPage.heading}
        body={aboutPage.body}
        primaryCta={aboutPage.primaryCta}
        secondaryCta={aboutPage.secondaryCta}
      />

      <WhoWeAre />
      <MissionVision />
      <FaqSection
        eyebrow={generalFaq.eyebrow}
        heading={generalFaq.heading}
        items={generalFaq.items}
      />
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

/** Full-width prose block: who the team is, then how the work is done. */
function WhoWeAre() {
  return (
    <section className="bg-canvas">
      <div className="shell py-20 lg:py-28">
        <div className="max-w-[46rem]">
          <Reveal>
            <h2 className="display-lg">{whoWeAre.heading}</h2>
          </Reveal>

          <div className="mt-6 space-y-5">
            {whoWeAre.paragraphs.map((paragraph, index) => (
              <Reveal
                as="p"
                key={paragraph.slice(0, 24)}
                delay={70 + index * 50}
                className="measure text-slate"
              >
                {paragraph}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * One statement each, so they pair off as two cards on a shared band rather
 * than two headings dragging a single line across the measure.
 */
function MissionVision() {
  const blocks = [ourMission, ourVision];

  return (
    <section className="border-y rule-light bg-surface">
      <div className="shell grid gap-6 py-16 md:grid-cols-2 lg:gap-10 lg:py-20">
        {blocks.map((block, index) => (
          <Reveal key={block.heading} delay={index * 80} className="h-full">
            <article className="h-full rounded-card border border-[var(--rule-on-light)] bg-canvas p-8 lg:p-10">
              <h2 className="display-md">{block.heading}</h2>

              {block.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="measure mt-4 text-slate">
                  {paragraph}
                </p>
              ))}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
