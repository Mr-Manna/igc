import type { FaqItem } from "@/components/faq/FaqSection";

/**
 * ICF's delivery partners.
 *
 * ICF takes a manufacturing project from idea to rated output, but two kinds of
 * work sit outside its core: the brand, investor narrative and digital presence
 * a project needs to raise money and sell, and the cloud, data, AI and
 * industrial-automation engineering a modern plant runs on. ICF brings in two
 * specialist firms for exactly this rather than sub-contracting anonymously.
 *
 * Like `content/about.ts`, this is capability copy — no named clients, no
 * figures attributed to anyone — so it carries no `TODO(real-data)` beyond the
 * placeholder URLs noted on `url` below.
 */

export type Partner = {
  slug: string;
  name: string;
  /**
   * TODO(real-data): both partner sites are currently on `*.vercel.app` preview
   * deployments. Swap in the production domains before launch.
   */
  url: string;
  /** Short label for what they do, shown under the name. */
  discipline: string;
  /** One sentence that frames them as a highly capable partner. */
  positioning: string;
  /** One sentence: when and why ICF pulls them into a project. */
  bringsToIcf: string;
  /** 5–6 capability tags. */
  capabilities: string[];
  /** 1–2 short paragraphs for the /partners detail page. */
  body: string[];
  /** The kinds of work ICF hands them on an engagement. */
  engagements: string[];
};

export const partners: Partner[] = [
  {
    slug: "quiet-seven",
    name: "Quiet Seven",
    url: "https://quietseven.vercel.app",
    discipline: "Brand, digital & product design",
    positioning:
      "A digital communication studio that turns a complex industrial proposition into a brand, website and investor story a customer, lender or recruit understands on the first read.",
    bringsToIcf:
      "When a project needs to raise money, reach distributors or hire a founding team, ICF brings in Quiet Seven to build the brand identity, investor narrative and digital presence around it.",
    capabilities: [
      "Brand strategy & identity",
      "Web & product design",
      "Front-end & app development",
      "Design systems",
      "UX research",
      "Motion",
    ],
    body: [
      "Quiet Seven works from a single premise: most businesses do not have a product problem, they have a communication problem. Nine years in practice, a team spread across seven timezones, and a method that puts design and engineering in the same room from day one so what ships matches what was drawn.",
      "For an ICF client that means the pitch deck, the identity, the website and the product interface are one coherent system rather than four freelancers' guesses — clarity a board can sign off, a bank can read and a buyer can act on.",
    ],
    engagements: [
      "Brand identity and messaging for a new plant or product line",
      "Investor and lender pitch decks built on the DPR",
      "Marketing sites, catalogues and distributor portals",
      "Product and dashboard interfaces for connected equipment",
      "Design systems that hold as the business grows",
    ],
  },
  {
    slug: "substrate",
    name: "Substrate",
    url: "https://substrateeng.vercel.app",
    discipline: "Cloud, data & AI engineering",
    positioning:
      "An engineering-first technology partner that architects, builds and operates the cloud platforms, data pipelines and AI-native software that a plant cannot afford to have fail.",
    bringsToIcf:
      "When a project calls for industrial automation, connected-device telemetry, a data platform or applied AI, ICF brings in Substrate to engineer systems built to run for a decade, not a demo.",
    capabilities: [
      "Distributed systems & cloud architecture",
      "Platform engineering & SRE",
      "Data engineering & real-time pipelines",
      "AI-native & agentic systems",
      "IoT & industrial automation",
      "Security & compliance",
    ],
    body: [
      "Substrate is the layer beneath — the complex systems everything else stands on. It runs five-phase engagements, Discover through Operate, and commits to running the system after launch rather than handing it off. Architecture before code, observability from day one, and an honest answer when it is not the right fit.",
      "For an ICF client that is the difference between a line that is instrumented, monitored and improvable and one that is a black box the moment the integrator leaves. Substrate builds the telemetry, the data platform and the AI on top so the plant keeps getting better after commissioning.",
    ],
    engagements: [
      "Industrial automation and SCADA / MES architecture",
      "Connected-device telemetry and edge processing",
      "Data warehouses and real-time pipelines for the shop floor",
      "Applied and agentic AI on top of production data",
      "Cloud platform, SRE and security for the software estate",
    ],
  },
];

export const partnersSection = {
  eyebrow: "Delivery partners",
  heading: "Specialists we bring in when a project needs them",
  body: "ICF runs the industrial project end to end. For the brand and digital work around it, and for serious cloud, data and automation engineering, we work with two firms as delivery partners — introduced into the engagement, not sub-contracted out of sight.",
} as const;

export const partnersPage = {
  eyebrow: "Partners",
  heading: "Highly capable partners for the work beyond the plant",
  body: "A manufacturing project rarely stops at a running line. It has to be branded and sold, and increasingly it has to be instrumented, connected and improved with data. ICF brings in two specialist firms for that work — vetted, and accountable to the same client.",
  primaryCta: { label: "Get Free Consultation", href: "/contact" },
  secondaryCta: { label: "Explore Our Services", href: "/services" },
} as const;

export const partnersFaq: {
  eyebrow: string;
  heading: string;
  items: readonly FaqItem[];
} = {
  eyebrow: "Questions",
  heading: "Working with ICF's partners",
  items: [
    {
      question: "Do I contract with ICF or with the partner?",
      answer:
        "Either arrangement works. ICF can hold a single contract and coordinate the partner as part of the project, or introduce you to work with the partner directly — whichever keeps accountability clearest for your engagement.",
    },
    {
      question: "When does ICF bring a partner in?",
      answer:
        "Only when the work genuinely needs it — brand, investor materials and digital presence for Quiet Seven; automation, telemetry, data platforms and applied AI for Substrate. Most projects need one or neither, and we say so.",
    },
    {
      question: "Can I engage Quiet Seven or Substrate on their own?",
      answer:
        "Yes. Both are independent firms with their own clients. You can reach either directly from their site; ICF is the introduction, not a gate.",
    },
    {
      question: "Are these the only firms ICF works with?",
      answer:
        "They are the two we partner with formally for design and engineering. For finance, machinery and regulatory work, ICF's own network of banks, suppliers and agencies applies.",
    },
  ],
};
