/**
 * Long-form copy for /about.
 *
 * Structured as named sections rather than one flat paragraph list, so the page
 * can render each block under its own heading instead of running everything
 * together as prose.
 *
 * Like `content/services.ts`, everything here is domain content — no named
 * clients, no figures attributed to anyone — so there is no `TODO(real-data)`
 * on this file beyond the site-wide placeholders documented in README.md.
 */

export const aboutPage = {
  eyebrow: "About Us",
  heading: "Fifteen Years Inside India's Factory Floors",
  body: "Industrial Growth Consultancy takes manufacturing projects from a first conversation about an idea through to a plant running at rated output — feasibility, DPR, subsidy, finance, machinery and commissioning under one roof.",
  primaryCta: { label: "Get Free Consultation", href: "/contact" },
  secondaryCta: { label: "Explore Our Services", href: "/services" },
} as const;

export type AboutBlock = {
  heading: string;
  /** One or more paragraphs rendered under the heading. */
  paragraphs: string[];
};

export const whoWeAre: AboutBlock = {
  heading: "Who We Are",
  paragraphs: [
    "We are a team of experienced industrial consultants, engineers, financial experts, and market strategists dedicated to building profitable and sustainable manufacturing businesses.",
    "Our approach combines technical expertise, financial structuring, and regulatory compliance to ensure seamless project implementation from the first feasibility study through full-scale operation.",
  ],
};

export const ourMission: AboutBlock = {
  heading: "Our Mission",
  paragraphs: [
    "To empower entrepreneurs and industries with reliable consultancy, transparent processes, and result-oriented strategies.",
  ],
};

export const ourVision: AboutBlock = {
  heading: "Our Vision",
  paragraphs: [
    "To become one of India's most trusted industrial consultancy brands, supporting MSME and large-scale manufacturing growth nationwide.",
  ],
};
