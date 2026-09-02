import type { ServiceIconName } from "@/components/ui/ServiceIcon";

/**
 * Homepage copy, carried over verbatim from the previous site.
 *
 * TODO(real-data): `testimonials`, `clients` and `projects` are unverified.
 * `testimonials` attributes specific claims to named individuals and companies;
 * `clients` and `projects` were authored to give the logo strip and the project
 * showcase something to render. Replace all three before publishing to a public
 * domain — see the placeholder-data section of README.md.
 */

export const hero = {
  eyebrow: "Trusted by 300+ Manufacturing Companies",
  /** Split so "Manufacturing Business" can carry the accent colour. */
  headline: [
    { text: "Build Your Dream", accent: false },
    { text: "Manufacturing Business", accent: true },
    { text: "with Expert Consultancy", accent: false },
  ],
  body:
    "We help entrepreneurs establish profitable factories through complete project consultancy, government subsidy assistance, project finance, machinery sourcing, and turnkey industrial solutions.",
  primaryCta: { label: "Get Free Consultation", href: "/contact" },
  secondaryCta: { label: "Request Project Report", href: "/project-reports" },
  assurances: ["Free Initial Consultation", "ISO Certified", "Pan India Service"],
  /**
   * The reference site puts a search field here. ICF has no corpus to search, so
   * the same slot carries the four things people actually arrive looking for.
   */
  quickLinks: [
    { label: "Detailed Project Report", href: "/project-reports" },
    { label: "PMEGP Subsidy", href: "/subsidies" },
    { label: "Machinery Sourcing", href: "/services/machinery-consultancy" },
    { label: "Loan Assistance", href: "/services/loan-consultancy" },
  ],
  image: {
    /* w=2000 because this now runs full-bleed as the hero plate; the old w=1200
       source was being upscaled past 1200px viewports. */
    src: "https://images.pexels.com/photos/257700/pexels-photo-257700.jpeg?auto=compress&cs=tinysrgb&w=2000",
    alt: "Modern manufacturing facility with process piping and storage vessels",
  },
} as const;

export type Stat = {
  /** Numeric target the counter animates toward. */
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
};

export const stats: Stat[] = [
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 300, suffix: "+", label: "Satisfied Clients" },
  { value: 500, prefix: "₹", suffix: "+ Cr", label: "Projects Executed" },
  { value: 15, suffix: "+", label: "Years Experience" },
];

/**
 * The six services carried only two distinct stock photographs between them, so
 * the cards are icon-led instead — see `components/ui/ServiceIcon.tsx`. The
 * `image` field the previous hover-thumbnail used has been dropped with it.
 */
/**
 * The slug set is a closed union rather than plain strings so that
 * `content/services.ts` can be checked for completeness at build time: a service
 * added here without the long-form copy the services page needs is a type error,
 * not a gap discovered in the browser.
 */
export const serviceSlugs = [
  "industrial-project-consultancy",
  "government-subsidy-consultancy",
  "loan-consultancy",
  "industrial-engineering",
  "machinery-consultancy",
  "plastic-industry-consultancy",
  "brewery-distillery-consultancy",
  "cold-storage-consultancy",
  "biogas-consultancy",
  "waste-management-consultancy",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export type Service = {
  title: string;
  slug: ServiceSlug;
  /** Always `/services/${slug}`; derived below so the two cannot drift apart. */
  href: string;
  description: string;
  icon: ServiceIconName;
  /** Three deliverables per service. Exactly three — the card grid depends on
      every cell being the same height before `mt-auto` pins the footer. The
      full list lives in `content/services.ts`. */
  points: [string, string, string];
  /** Shown in the homepage services grid. The sector-specific engagements below
      the first six are `/services`-only, so the homepage stays two clean rows. */
  featured: boolean;
};

const withHref = (service: Omit<Service, "href">): Service => ({
  ...service,
  href: `/services/${service.slug}`,
});

export const services: Service[] = [
  withHref({
    title: "Industrial Project Consultancy",
    slug: "industrial-project-consultancy",
    description: "Complete end-to-end consultancy for setting up manufacturing units",
    icon: "factory",
    points: ["Feasibility study", "Detailed project report", "Plant layout & commissioning"],
    featured: true,
  }),
  withHref({
    title: "Government Subsidy Consultancy",
    slug: "government-subsidy-consultancy",
    description: "Expert guidance on all government subsidies and incentives",
    icon: "subsidy",
    points: ["PMEGP & PMFME", "State capital subsidy", "Claim filing & follow-up"],
    featured: true,
  }),
  withHref({
    title: "Loan Consultancy",
    slug: "loan-consultancy",
    description: "Seamless project finance and loan assistance",
    icon: "finance",
    points: ["Term loan appraisal", "CGTMSE collateral-free", "Working capital limits"],
    featured: true,
  }),
  withHref({
    title: "Industrial Engineering",
    slug: "industrial-engineering",
    description: "Optimize your manufacturing processes for maximum efficiency",
    icon: "efficiency",
    points: ["Process improvement", "Capacity & line balancing", "Cost reduction"],
    featured: true,
  }),
  withHref({
    title: "Machinery Consultancy",
    slug: "machinery-consultancy",
    description: "Expert guidance on machinery selection and procurement",
    icon: "machinery",
    points: ["Technical specification", "Vendor evaluation", "Import & installation"],
    featured: true,
  }),
  withHref({
    title: "Plastic Industry Consultancy",
    slug: "plastic-industry-consultancy",
    description: "Specialized consultancy for plastic manufacturing units",
    icon: "polymer",
    points: ["Injection & blow moulding", "Recycling units", "Product development"],
    featured: true,
  }),
  withHref({
    title: "Brewery & Distillery Consultancy",
    slug: "brewery-distillery-consultancy",
    description: "Specialised consultancy for breweries, IMFL and distillery units",
    icon: "brewery",
    points: ["Brewhouse & fermentation", "IMFL blending & bottling", "State excise licensing"],
    featured: false,
  }),
  withHref({
    title: "Cold Storage Consultancy",
    slug: "cold-storage-consultancy",
    description: "Specialised consultancy for cold chain and controlled-atmosphere storage",
    icon: "coldStorage",
    points: ["Single & multi-commodity", "Refrigeration & insulation", "NHB / PMKSY subsidy"],
    featured: false,
  }),
  withHref({
    title: "Biogas Plant Consultancy",
    slug: "biogas-consultancy",
    description: "Specialised consultancy for biogas, Bio-CNG and compressed biogas plants",
    icon: "biogas",
    points: ["Feedstock assessment", "Digester & gas upgrading", "SATAT / CBG offtake"],
    featured: false,
  }),
  withHref({
    title: "Waste Management Consultancy",
    slug: "waste-management-consultancy",
    description: "Specialised consultancy for recycling, C&D and waste-processing plants",
    icon: "waste",
    points: ["MSW & dry-waste sorting", "Plastic & C&D recycling", "CPCB / EPR compliance"],
    featured: false,
  }),
];

/**
 * Five points, not four: the section now renders as a single icon row, and five
 * cells divide the twelve-column shell evenly where four left a gap.
 */
export const whyChooseUs = {
  eyebrow: "Why Choose Us",
  heading: "Your Trusted Partner for Industrial Success",
  body:
    "With over 15 years of experience, we have helped 300+ entrepreneurs establish successful manufacturing units across India.",
  points: [
    {
      title: "Industry Experts",
      description: "15+ years of experience in manufacturing consultancy",
      icon: "expertise",
    },
    {
      title: "Complete Solution",
      description: "End-to-end support from concept to commissioning",
      icon: "endToEnd",
    },
    {
      title: "Quick Turnaround",
      description: "Fast DPR preparation and project execution",
      icon: "turnaround",
    },
    {
      title: "Strong Network",
      description: "Connected with 50+ banks and financial institutions",
      icon: "network",
    },
    {
      title: "Value for Money",
      description: "Transparent fees with no cost padded into vendor quotes",
      icon: "value",
    },
  ],
  cta: { label: "Learn More About Us", href: "/about" },
  image: {
    src: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "ICF consultants in a project planning session",
  },
} as const satisfies {
  eyebrow: string;
  heading: string;
  body: string;
  points: readonly { title: string; description: string; icon: ServiceIconName }[];
  cta: { label: string; href: string };
  image: { src: string; alt: string };
};

/**
 * Sectors carry a photograph now that `Industries` renders as image tiles.
 *
 * This is the single source of truth for the sector list — `content/harbour.ts`
 * re-exports it, so changing the shape here means updating
 * `components/harbour/Sectors.tsx` too. Do not fork a second list.
 */
/**
 * Declared as a tuple so `IndustrySlug` is a union rather than `string`. That is
 * what makes `industryDetails` in `content/industries.ts` a total map: adding a
 * sector here without writing its detail fails the build instead of rendering
 * an empty block. Same arrangement as `serviceSlugs` above. Order is the order
 * the sectors render on /industries, following the client's sector document.
 */
export const industrySlugs = [
  "food-processing",
  "dairy",
  "beverage",
  "plastic",
  "pet-packaging",
  "packaging",
  "paper-disposables",
  "poultry-livestock",
  "fishery-aquaculture",
  "agriculture",
  "cold-chain",
  "bakery-confectionery",
  "rice-grain-flour",
  "feed-manufacturing",
  "bio-cng",
  "recycling",
  "engineering",
  "electrical-equipment",
  "textile",
  "construction-material",
  "alcohol-beverage",
  "green-manufacturing",
] as const;

export type IndustrySlug = (typeof industrySlugs)[number];

export type Industry = {
  name: string;
  slug: IndustrySlug;
  image: { src: string; alt: string };
};

/**
 * Every id below has been checked to resolve, and every `alt` describes what is
 * actually in the frame rather than restating the sector name. That distinction
 * matters: the tile's visible label already says "Textile & Garment", and alt
 * text asserting a loom over a photograph of a yarn line would be wrong for a
 * screen reader and wrong for search.
 *
 * There are more sectors than photographs, so a handful of ids are reused across
 * related sectors — the `alt` still describes the frame, not the sector on it.
 * These are library photographs standing in for sector imagery, not ICF sites.
 * Replace them with plant photography from real engagements when it is cleared.
 */
const sectorPhoto = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800`;

export const industries: Industry[] = [
  {
    name: "Food Processing",
    slug: "food-processing",
    image: { src: sectorPhoto("4820840"), alt: "Industrial sealing machine closing a foil pack" },
  },
  {
    name: "Dairy & Milk Processing",
    slug: "dairy",
    image: { src: sectorPhoto("29988955"), alt: "Worker in protective gear supervising plant operations" },
  },
  {
    name: "Beverage & Packaged Water",
    slug: "beverage",
    image: { src: sectorPhoto("18631424"), alt: "Bottles moving along an automated conveyor" },
  },
  {
    name: "Plastic & Polymer",
    slug: "plastic",
    image: { src: sectorPhoto("34221997"), alt: "Industrial machine running in a production hall" },
  },
  {
    name: "PET Preform & Bottle",
    slug: "pet-packaging",
    image: { src: sectorPhoto("18631423"), alt: "Plastic bottle on a factory bottling line" },
  },
  {
    name: "Packaging",
    slug: "packaging",
    image: { src: sectorPhoto("5532664"), alt: "Automated canning and packaging line" },
  },
  {
    name: "Paper & Disposables",
    slug: "paper-disposables",
    image: { src: sectorPhoto("34718926"), alt: "Conveyor belts running through a plant interior" },
  },
  {
    name: "Poultry & Livestock",
    slug: "poultry-livestock",
    image: { src: sectorPhoto("34718930"), alt: "Wide view of a factory floor with machinery and conveyors" },
  },
  {
    name: "Fishery & Aquaculture",
    slug: "fishery-aquaculture",
    image: { src: sectorPhoto("29988986"), alt: "Laser cutter operating in an industrial facility" },
  },
  {
    name: "Agriculture & Agro-Processing",
    slug: "agriculture",
    image: { src: sectorPhoto("29988955"), alt: "Worker in protective gear supervising plant operations" },
  },
  {
    name: "Cold Storage & Cold Chain",
    slug: "cold-chain",
    image: { src: sectorPhoto("34718926"), alt: "Conveyor belts running through a plant interior" },
  },
  {
    name: "Bakery & Confectionery",
    slug: "bakery-confectionery",
    image: { src: sectorPhoto("5532664"), alt: "Automated canning and packaging line" },
  },
  {
    name: "Rice, Grain & Flour",
    slug: "rice-grain-flour",
    image: { src: sectorPhoto("34221997"), alt: "Industrial machine running in a production hall" },
  },
  {
    name: "Feed Manufacturing",
    slug: "feed-manufacturing",
    image: { src: sectorPhoto("34718930"), alt: "Wide view of a factory floor with machinery and conveyors" },
  },
  {
    name: "Bio-CNG & Renewable Energy",
    slug: "bio-cng",
    image: { src: sectorPhoto("29988986"), alt: "Laser cutter operating in an industrial facility" },
  },
  {
    name: "Recycling & Waste Management",
    slug: "recycling",
    image: { src: sectorPhoto("34718926"), alt: "Conveyor belts running through a plant interior" },
  },
  {
    name: "Engineering & Fabrication",
    slug: "engineering",
    image: { src: sectorPhoto("29988964"), alt: "Laser cutting machine running in a workshop" },
  },
  {
    name: "Electrical & Industrial Equipment",
    slug: "electrical-equipment",
    image: { src: sectorPhoto("29988988"), alt: "Laser cutting head working through sheet metal" },
  },
  {
    name: "Textile & Garment",
    slug: "textile",
    image: { src: sectorPhoto("8246480"), alt: "Yarn production line in a textile factory" },
  },
  {
    name: "Construction Material",
    slug: "construction-material",
    image: { src: sectorPhoto("29988988"), alt: "Laser cutting head working through sheet metal" },
  },
  {
    name: "Beverage Alcohol",
    slug: "alcohol-beverage",
    image: { src: sectorPhoto("18631424"), alt: "Bottles moving along an automated conveyor" },
  },
  {
    name: "Green & Sustainable Manufacturing",
    slug: "green-manufacturing",
    image: { src: sectorPhoto("34718930"), alt: "Wide view of a factory floor with machinery and conveyors" },
  },
];

/**
 * TODO(real-data): invented company names. ICF has no logo assets and no
 * `public/` directory, so the strip renders wordmarks set in the display face
 * rather than images. Swap for real client logos — and clear permission to use
 * them — before launch.
 */
export type Client = { name: string };

export const clients: Client[] = [
  { name: "AquaPure Industries" },
  { name: "PlastTech Solutions" },
  { name: "Sunrise Agro Foods" },
  { name: "Meridian Polymers" },
  { name: "Craft Breweries India" },
  { name: "Vardhman Packaging" },
  { name: "Nova Chem Works" },
  { name: "Deccan Steel & Metal" },
  { name: "Suraj Textile Mills" },
  { name: "Kaveri Pharma Labs" },
];

/**
 * TODO(real-data): every project below is fabricated. Titles, sectors and
 * investment figures are plausible for ICF's book of work but none are real.
 * Replace with sanctioned projects — and confirm the client is content to have
 * the investment value published — before launch.
 *
 * The photographs are library stock, not the projects themselves, so each `alt`
 * describes the frame rather than claiming to show the delivered plant. The
 * card carries an "Illustrative" marker for the same reason. Real project
 * photography should replace both.
 */
export type Project = {
  title: string;
  /** Must match an `Industry.name`; the tab filter compares on this. */
  sector: string;
  /** Rendered verbatim, so the unit stays with the figure. */
  investment: string;
  image: { src: string; alt: string };
};

export const projects: Project[] = [
  {
    title: "Turnkey setup of a 12,000 LPH packaged drinking water plant",
    sector: "Beverage & Packaged Water",
    investment: "₹4 Cr",
    image: { src: sectorPhoto("18631424"), alt: "Bottles moving along an automated conveyor" },
  },
  {
    title: "Cold storage and ripening chamber for a fruit exporter",
    sector: "Food Processing",
    investment: "₹2 Cr",
    image: { src: sectorPhoto("34718926"), alt: "Conveyor belts running through a plant interior" },
  },
  {
    title: "PET preform and closure unit with in-house tooling",
    sector: "PET Preform & Bottle",
    investment: "₹8 Cr",
    image: { src: sectorPhoto("18631423"), alt: "Plastic bottle on a factory bottling line" },
  },
  {
    title: "Specialty resin blending plant with effluent treatment",
    sector: "Plastic & Polymer",
    investment: "₹30 Cr",
    image: { src: sectorPhoto("34221997"), alt: "Industrial machine running in a production hall" },
  },
  {
    title: "Ready-to-cook breakfast range — formulation and line setup",
    sector: "Food Processing",
    investment: "₹2.5 Cr",
    image: { src: sectorPhoto("4820840"), alt: "Industrial sealing machine closing a foil pack" },
  },
  {
    title: "Multi-layer corrugated box plant with automatic flexo printing",
    sector: "Packaging",
    investment: "₹6 Cr",
    image: { src: sectorPhoto("5532664"), alt: "Automated canning and packaging line" },
  },
  {
    title: "PP woven sack unit — circular looms and lamination",
    sector: "Textile & Garment",
    investment: "₹5.5 Cr",
    image: { src: sectorPhoto("38357014"), alt: "Textile machinery running large spools of yarn" },
  },
  {
    title: "PET bottle-to-flake washing and recycling line",
    sector: "Recycling & Waste Management",
    investment: "₹3.5 Cr",
    image: { src: sectorPhoto("34718930"), alt: "Wide view of a factory floor with machinery and conveyors" },
  },
  {
    title: "Sheet metal fabrication unit with CNC press brakes",
    sector: "Engineering & Fabrication",
    investment: "₹7 Cr",
    image: { src: sectorPhoto("29988986"), alt: "Laser cutter operating in an industrial facility" },
  },
  {
    title: "Induction furnace and rolling mill modernisation",
    sector: "Engineering & Fabrication",
    investment: "₹25 Cr",
    image: { src: sectorPhoto("29988988"), alt: "Laser cutting head working through sheet metal" },
  },
];

export const aboutSection = {
  eyebrow: "About Us",
  heading: "Fifteen Years Inside India's Factory Floors",
  paragraphs: [
    "Industrial Consultancy Firm has worked alongside Indian manufacturers since 2009, taking projects from a first conversation about an idea through to a plant running at rated output. We prepare the feasibility study, write the detailed project report, map the applicable subsidy scheme, arrange the term loan, specify and source the machinery, and stay on the project until it is commissioned.",
    "Most industrial projects do not fail on the factory floor. They fail earlier — on a feasibility study that will not survive a credit committee, on a subsidy claim filed against the wrong scheme, on a machine bought on price rather than on throughput. Our work is to close those gaps before they cost anything.",
    "We work across manufacturing, processing and infrastructure sectors and hold working relationships with 50+ banks and financial institutions, which is why our project reports tend to clear appraisal on the first pass rather than the third.",
  ],
  cta: { label: "More About ICF", href: "/about" },
  form: {
    heading: "Register Your Query",
    body: "Tell us about the project. A consultant will get back to you within one working day.",
    terms: "I accept the terms and conditions and consent to being contacted about my enquiry.",
  },
} as const;

/**
 * Keyword prose for organic search. Deliberately quiet: it sits low on the page,
 * runs at body size on the plain canvas, and carries no calls to action.
 */
export const seoNarrative = {
  heading: "Industrial and Manufacturing Consultants in India",
  subheading: "What a consultancy actually changes about your project",
  paragraphs: [
    "An industrial consultant earns their fee in the gap between what a plant is designed to do and what it actually does. That gap opens early. A capacity figure chosen without a market study, a machine specified in horsepower rather than in output per shift, a plot selected before checking the effluent norms for the sector — each becomes expensive only after the money has been committed. Manufacturing consultancy is the work of resolving those questions while they are still cheap to answer.",
    "For an Indian MSME the central document is the detailed project report. It sets out the product, the process route, the plant and machinery schedule, the utilities, the manpower, the cost of the project and the means of financing, and it projects the profitability and the debt service coverage over the loan tenure. A bank's appraisal desk reads it as an argument. Where the working capital cycle is understated or the capacity utilisation ramps unrealistically in year one, the file goes back — and each return costs weeks.",
    "Subsidy is the other place projects lose money quietly. PMEGP, CGTMSE, PMFME and the state-level capital investment schemes each carry their own eligibility tests, ceilings and claim windows, and they are not interchangeable. A unit that would have qualified comfortably under one scheme is regularly filed under another and rejected on a technicality. Mapping the project to the right scheme at the planning stage, before the first invoice is raised, is usually worth more than any single negotiation with a vendor.",
    "Machinery selection is where technical expertise pays back most visibly. The lowest quotation is rarely the lowest cost per unit produced once throughput, rejection rate, power draw, spares availability and installation support are counted. An industrial consultant evaluates suppliers on rated output under your conditions rather than on the price at the bottom of the page, and holds the specification through procurement, installation and commissioning so that what arrives is what was appraised.",
  ],
} as const;

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "ICF helped us set up our mineral water plant from scratch. Their expert guidance on machinery selection and government subsidies saved us over ₹50 lakhs. The DPR they prepared was approved by the bank within 15 days.",
    name: "Rajesh Kumar",
    role: "Managing Director, AquaPure Industries Pvt Ltd",
  },
  {
    quote:
      "The team at ICF has exceptional knowledge of the plastic industry. They helped us get CGTMSE loan for our injection moulding unit and guided us through the entire process. Highly professional and reliable.",
    name: "Priya Sharma",
    role: "CEO, PlastTech Solutions",
  },
  {
    quote:
      "Starting a microbrewery seemed daunting until we connected with ICF. Their technical expertise and regulatory guidance made our dream project a reality. The plant is now running successfully for 3 years.",
    name: "Vijay Menon",
    role: "Founder, Craft Breweries India",
  },
];

export const closingCta = {
  heading: "Ready to Start Your Manufacturing Project?",
  body:
    "Get free consultation from our expert industrial consultants. We'll help you navigate the entire process from planning to production.",
  primaryCta: { label: "Get Free Consultation", href: "/contact" },
  secondaryCta: { label: "Check Subsidy Eligibility", href: "/subsidies" },
} as const;
