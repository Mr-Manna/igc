import { contact, type NavItem } from "@/content/site";
import { industries, services, stats } from "@/content/home";

/**
 * Copy for the second homepage at /harbour.
 *
 * The facts are the same facts. `stats`, `services` and `industries` are
 * re-exported straight from `content/home.ts` rather than copied, so a figure
 * corrected there is corrected on both pages. What lives here is the copy this
 * layout needs and the live homepage does not: a headline written to be set in
 * one uppercase block, two-weight section headings that arrive pre-split, and
 * three section types the live page has no equivalent of.
 *
 * TODO(real-data): `insights` is entirely invented — four fabricated articles
 * with fabricated dates, written to fill a layout. ICF has published nothing.
 * Delete the section or replace every item before this page is shown to anyone
 * outside the team. `content/home.ts` carries the same warning about its
 * testimonials, and `content/site.ts` about its contact details.
 */

export { stats, services, industries };

/** Lowercase, because the nav is set lowercase. Kept short — four items, not the
    seven the live header carries; this layout has no room for seven and the
    reference uses three. */
export const harbourNav: NavItem[] = [
  { label: "services", href: "/services" },
  { label: "sectors", href: "/industries" },
  { label: "about us", href: "/about" },
  { label: "contact", href: "/contact" },
];

export const hero = {
  eyebrow: "Industrial project consultancy · since 2009",
  /** One block of uppercase type. Line breaks are authored, not left to wrap —
      the shape of the block is the composition. */
  headline: ["Turning industrial", "ambition into", "operating plant."],
  body:
    "Fifteen years of putting manufacturing units into production across India — feasibility through subsidy, finance, machinery and commissioning.",
  primaryCta: { label: "Book a consultation", href: "/contact" },
  secondaryCta: { label: "Request a project report", href: "/project-reports" },
  image: {
    src: "https://images.pexels.com/photos/257700/pexels-photo-257700.jpeg?auto=compress&cs=tinysrgb&w=2000",
    alt: "Process piping and storage vessels at a manufacturing facility",
  },
} as const;

/**
 * Two-weight headings arrive pre-split so the components stay dumb: `bold` is
 * set at weight 700, `light` at 400, both at the same size, stacked.
 */
export type TwoWeight = { bold: string; light: string };

export const positioning = {
  eyebrow: "What we do",
  heading: {
    bold: "Strengthening Indian manufacturing",
    light: "one commissioned plant at a time.",
  } satisfies TwoWeight,
  body:
    "Most industrial projects do not fail on the factory floor. They fail earlier — on a feasibility study that will not survive a credit committee, a subsidy claim filed against the wrong scheme, a machine bought on price rather than on throughput. We work the whole sequence, in order, and stay on it until the plant is running.",
  cta: { label: "About us", href: "/about" },
  image: {
    src: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Consultants reviewing project drawings in a planning session",
  },
};

export const numbers = {
  eyebrow: "By the numbers",
} as const;

export type Challenge = {
  /** Editorial index, rendered as given. */
  no: string;
  title: string;
  body: string;
};

export const challenges = {
  eyebrow: "The problem",
  heading: {
    bold: "Where industrial projects",
    light: "actually come apart",
  } satisfies TwoWeight,
  body:
    "Four failure points account for most of the delay and cost overrun we are called in to fix. All four are avoidable, and all four are decided long before anything is built.",
  cta: { label: "How we work", href: "/about" },
  items: [
    {
      no: "01",
      title: "Schemes read in isolation",
      body: "Central and state incentives interact, and eligibility is often decided by the order in which claims are filed. Read one scheme at a time and you forfeit the others.",
    },
    {
      no: "02",
      title: "Reports that fail credit",
      body: "A detailed project report is a lending document, not a formality. Optimistic capacity assumptions and thin market evidence are the two things appraisal desks reject first.",
    },
    {
      no: "03",
      title: "Machinery bought on price",
      body: "The cheapest quotation rarely holds the rated output, and a line specified around it inherits the bottleneck permanently. Throughput and spares support decide cost per unit.",
    },
    {
      no: "04",
      title: "Finance sequenced too late",
      body: "Term loan, working capital and subsidy disbursement run on separate clocks. Arranged out of order, a fully sanctioned project still stalls short of commissioning.",
    },
  ] satisfies Challenge[],
};

export const solutions = {
  /** The poster word. One word, uppercase, set at poster scale. */
  poster: "Solutions",
  sub: "Industrial consultancy",
  cta: { label: "All services", href: "/services" },
  body:
    "Six core engagements. Taken together they cover a project from the first feasibility question to the day the line runs at rated output.",
} as const;

export const sectors = {
  eyebrow: "Sectors",
  heading: {
    bold: "Ten industries",
    light: "we have commissioned in",
  } satisfies TwoWeight,
  cta: { label: "All sectors", href: "/industries" },
};

export type Insight = {
  date: string;
  /** ISO form for the <time> element. */
  datetime: string;
  tags: string[];
  title: string;
  href: string;
  image: { src: string; alt: string };
};

/** TODO(real-data): fabricated. See the module note above. */
export const insights = {
  eyebrow: "Insights",
  cta: { label: "All insights", href: "/blog" },
  items: [
    {
      date: "12 June 2026",
      datetime: "2026-06-12",
      tags: ["Subsidy", "MSME"],
      title: "Reading central and state incentives as one stack, not two",
      href: "/blog",
      image: {
        src: "https://images.pexels.com/photos/236709/pexels-photo-236709.jpeg?auto=compress&cs=tinysrgb&w=900",
        alt: "Empty factory hall spanned by overhead travelling cranes",
      },
    },
    {
      date: "28 April 2026",
      datetime: "2026-04-28",
      tags: ["Finance", "DPR"],
      title: "What an appraisal desk is actually looking for in a project report",
      href: "/blog",
      image: {
        src: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=900",
        alt: "Technician in a hard hat working on machinery on a workshop floor",
      },
    },
    {
      date: "09 March 2026",
      datetime: "2026-03-09",
      tags: ["Machinery"],
      title: "Specifying a line around throughput instead of around quotations",
      href: "/blog",
      image: {
        src: "https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=900",
        alt: "Worker in a high-visibility vest guiding a large industrial roller",
      },
    },
    {
      date: "21 January 2026",
      datetime: "2026-01-21",
      tags: ["Polymer", "Sector note"],
      title: "Injection moulding: where the unit economics turn",
      href: "/blog",
      image: {
        src: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=900",
        alt: "Forklift moving palletised goods across a distribution warehouse",
      },
    },
  ] satisfies Insight[],
};

export type Faq = { q: string; a: string };

export const faq = {
  heading: {
    bold: "Quick answers",
    light: "to the questions we get asked first",
  } satisfies TwoWeight,
  body: "Not covered here? Write to us — we answer project questions directly.",
  email: contact.emailPrimary,
  items: [
    {
      q: "What does a full project engagement actually cover?",
      a: "Feasibility and site assessment, the detailed project report, subsidy mapping and filing, term loan and working capital arrangement, machinery specification and vendor selection, layout and utilities, then commissioning support until the line holds rated output.",
    },
    {
      q: "At what stage should we bring you in?",
      a: "Before the land and the machinery are committed. Both decisions constrain everything downstream — subsidy eligibility, loan structure, layout, cost per unit — and both are expensive to reverse. A first conversation costs nothing.",
    },
    {
      q: "Which subsidy schemes do you work with?",
      a: "The central schemes an MSME manufacturer is most likely to qualify under, PMEGP, CGTMSE and PMFME among them, alongside the state industrial policy that applies where you are building. Which combination is worth pursuing depends on sector, location and investment size.",
    },
    {
      q: "How long does a detailed project report take?",
      a: "Two to four weeks for a standard manufacturing unit once we have your capacity intent and the site position. Sector studies that need primary market data take longer. We would rather quote a real date than a fast one.",
    },
    {
      q: "Do you help with the bank, or only with the paperwork?",
      a: "Both. We prepare the report to appraisal standard and we take it to the desk, because we work with a standing network of banks and financial institutions and know how each one reads a proposal. Sanction is the deliverable, not submission.",
    },
    {
      q: "Which sectors do you take on?",
      a: "Ten, listed above. Polymer processing, food and beverage, chemical and packaging are where our work is deepest. If your sector is not on the list, ask — we will tell you honestly whether we are the right firm for it.",
    },
    {
      q: "Do you work outside your home state?",
      a: "Yes, across India. State industrial policy differs enough that it is a substantive part of the engagement rather than a footnote, which is why the subsidy work is mapped per project rather than from a template.",
    },
  ] satisfies Faq[],
};

export const contactBand = {
  cta: { label: "Contact us", href: "/contact" },
  body:
    "Every project is specified from your capacity intent, your site and your sector — never from a template. Tell us what you intend to build and we will tell you what it takes.",
  phoneLabel: contact.phonePrimary,
} as const;
