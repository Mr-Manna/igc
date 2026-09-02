import type { ServiceSlug } from "@/content/home";

/**
 * Long-form copy for /services.
 *
 * Everything here is domain content — descriptions of the work, the schemes it
 * touches and the order it runs in. Unlike `testimonials`, `clients` and
 * `projects` in `content/home.ts`, none of it attributes anything to a named
 * client, so there is no `TODO(real-data)` on this file.
 *
 * Two things are deliberately absent. There are no turnaround commitments in
 * days or weeks, because a page cannot promise a date it has not scoped; and
 * there are no fee figures, because pricing is quoted per engagement. Both are
 * things to add only when the business has committed to them in writing.
 */

export const servicesPage = {
  eyebrow: "What We Do",
  heading: "Industrial Consultancy Services",
  body:
    "The engagements that between them take a manufacturing project from a first feasibility question to a line running at rated output — the core consultancy sequence, plus work specific to a few sectors and facility types. Most clients start with one and add the others as the project moves.",
  primaryCta: { label: "Get Free Consultation", href: "/contact" },
  secondaryCta: { label: "Request Project Report", href: "/project-reports" },
  jumpLabel: "Jump to a service",
} as const;

export type ServiceDetail = {
  /**
   * One sentence on what the engagement is, then one on the failure it exists
   * to prevent. The second half is the argument; the first is only the label.
   */
  overview: [string, string];
  /** What is actually handed over. Five or six items — enough to be specific. */
  deliverables: string[];
  /** Who the engagement suits, so a reader can rule themselves out quickly. */
  bestFor: string;
};

/**
 * Keyed by `ServiceSlug`, so adding a service in `content/home.ts` without
 * writing its detail here fails the build rather than rendering an empty block.
 */
export const serviceDetails: Record<ServiceSlug, ServiceDetail> = {
  "industrial-project-consultancy": {
    overview: [
      "The full arc of setting up a manufacturing unit: what to make, at what capacity, on what site, with what process route, financed how — worked in that order, because each answer constrains the next.",
      "The expensive mistakes in a greenfield project are nearly all made in the first eight weeks, when nothing has been built and everything still looks reversible. A capacity figure picked without a demand study, a plot taken before checking the effluent norms for the sector, a process route chosen around a machine someone has already been quoted for: each of those is cheap to correct now and structural later.",
    ],
    deliverables: [
      "Market and demand assessment for the product",
      "Capacity sizing and process route selection",
      "Site evaluation against sector-specific norms",
      "Plant layout, material flow and utility schedule",
      "Detailed project report to appraisal standard",
      "Approvals map and commissioning support",
    ],
    bestFor:
      "First-time promoters, and established manufacturers adding a line or a second unit.",
  },

  "government-subsidy-consultancy": {
    overview: [
      "Mapping a project to the central and state incentives it actually qualifies for, then filing and following the claim through to disbursement.",
      "Subsidy is where projects lose money quietly. PMEGP, CGTMSE, PMFME and the state capital investment schemes each carry their own eligibility tests, ceilings and claim windows, and they are not interchangeable. A unit that would have qualified comfortably under one is regularly filed under another and rejected on a technicality — often after the first invoice has been raised, which is the point past which several schemes stop being available at all.",
    ],
    deliverables: [
      "Eligibility screen across central and state schemes",
      "Scheme selection, with the trade-offs set out",
      "Application drafting and filing",
      "Coordination with DIC, KVIC and the lending bank",
      "Claim documentation and disbursement follow-up",
      "Post-sanction compliance and reporting",
    ],
    bestFor:
      "MSMEs still at the planning stage — the earlier the better, and before capital is committed.",
  },

  "loan-consultancy": {
    overview: [
      "Structuring the finance for a project and taking it through bank appraisal: cost of project, means of finance, projections, and the answers to the questions the credit desk will ask.",
      "A bank reads a project report as an argument, not as a formality. Where the working capital cycle is understated, the capacity utilisation ramps unrealistically in year one, or the debt service coverage is thin in the repayment years, the file goes back — and each return costs weeks. Having taken proposals to a standing network of banks and financial institutions, we know how differently they read the same numbers.",
    ],
    deliverables: [
      "Cost of project and means of finance",
      "Financial projections and DSCR modelling",
      "CMA data preparation",
      "Lender shortlisting and proposal submission",
      "Appraisal query handling through to sanction",
      "Term loan and working capital limits structured together",
    ],
    bestFor:
      "Projects raising term debt, with or without collateral, including CGTMSE-backed proposals.",
  },

  "industrial-engineering": {
    overview: [
      "Work on a plant that already runs: finding where the output is actually being lost and closing the gap between rated capacity and what comes off the line.",
      "A unit rarely underperforms for the reason its owner assumes. The bottleneck is usually one station in a sequence, an inventory norm nobody has revisited since commissioning, or a rejection rate that has been absorbed into the standard cost so long that it no longer registers as a loss. Measuring the line before changing it is most of the value.",
    ],
    deliverables: [
      "Time and motion study across the line",
      "Line balancing and de-bottlenecking plan",
      "Layout and material flow revision",
      "Inventory norms and stores rationalisation",
      "Rejection and rework root-cause analysis",
      "Energy and utility cost reduction",
    ],
    bestFor:
      "Running units where output has plateaued below rated capacity, or margin is thinning without an obvious cause.",
  },

  "machinery-consultancy": {
    overview: [
      "Specifying, sourcing and commissioning plant and machinery — domestic or imported — against what the line has to produce rather than against what is on offer.",
      "The lowest quotation is rarely the lowest cost per unit produced. Throughput under your raw material and your power conditions, rejection rate, spares availability, and how quickly a supplier's engineer can reach your site all outrank the number at the bottom of the page. Holding one specification from quotation through to commissioning is what stops the machine that arrives from being a different machine than the one that was appraised.",
    ],
    deliverables: [
      "Technical specification written to your output target",
      "Supplier shortlisting, Indian and imported",
      "Quotation comparison on rated output and cost per unit",
      "Pre-dispatch inspection and factory acceptance",
      "Import documentation, duty position and logistics",
      "Installation, trial runs and commissioning oversight",
    ],
    bestFor:
      "Anyone about to commit capital to plant and machinery, and units replacing or expanding an existing line.",
  },

  "plastic-industry-consultancy": {
    overview: [
      "Sector-specific work for polymer processors: product and material selection, process route, tooling, and the compliance regime that comes with it.",
      "Polymer processing is unusually unforgiving of decisions made in the wrong order. The polymer grade constrains the process, the process constrains the tooling, and the tooling is the part that cannot be revised once cut. Get the sequence right and the same capital buys a line that can take a second product later; get it wrong and every subsequent change is a new mould.",
    ],
    deliverables: [
      "Product design review and polymer grade selection",
      "Process selection: injection, blow, extrusion or thermoforming",
      "Mould and tooling specification and vendor selection",
      "Recycling and reprocessing line configuration",
      "In-house testing and quality protocols",
      "BIS, food-grade and export compliance",
    ],
    bestFor:
      "Processors and converters across injection moulding, blow moulding, extrusion, and PET or PP recycling.",
  },

  "brewery-distillery-consultancy": {
    overview: [
      "Sector work for alcoholic-beverage manufacture — breweries, IMFL blending and bottling units, and grain or molasses distilleries — covering process design, plant selection and the licensing regime that governs all of it.",
      "Alcohol is a licensed trade before it is a manufacturing one. State excise policy sets who may hold a licence, at what capacity, and with what bonded-store and measurement controls, and it varies enough between states that the same plant is viable in one and not the next. A unit built to a generic beverage layout and fitted with excise controls afterwards pays for the building twice — the metering, bonded areas and effluent load have to be in the first drawing.",
    ],
    deliverables: [
      "Process route for beer, IMFL or potable spirit, with capacity sized to the licence",
      "Brewhouse, fermentation, distillation or blending-and-bottling plant specification",
      "State excise licensing route, bonded store and measurement compliance",
      "Effluent, spent-wash and ETP design to pollution-board norms",
      "Utilities load — steam, refrigeration, CO2 recovery and water treatment",
      "Detailed project report to appraisal standard, with the duty structure modelled",
    ],
    bestFor:
      "Promoters entering brewing or distilling, and existing units adding an IMFL bottling or craft-beer line.",
  },

  "cold-storage-consultancy": {
    overview: [
      "Sector work for cold-chain infrastructure — single- and multi-commodity cold stores, controlled-atmosphere chambers, ripening units and reefer-backed distribution hubs — from commodity mix and chamber sizing through to the refrigeration and subsidy structure.",
      "A cold store earns its return on load management, not on capacity. The commodity decides the temperature band, the storage life and therefore the throughput a chamber can turn over in a year, so a store sized on floor area rather than on a realistic filling and offtake pattern spends the season part-empty and still carries the full refrigeration and interest cost. Insulation, door discipline and refrigeration selection separate the rated running cost from the real one.",
    ],
    deliverables: [
      "Commodity mix, chamber configuration and capacity sizing on a real offtake pattern",
      "Refrigeration system selection — ammonia, freon or CA — with running-cost modelling",
      "Insulation, PUF panel and vapour-barrier specification",
      "Subsidy mapping — NHB, PMKSY / Integrated Cold Chain, state horticulture schemes",
      "Power, DG backup and thermal-storage sizing against tariff and outage risk",
      "Detailed project report and bank appraisal support",
    ],
    bestFor:
      "Farmer producer organisations, traders and logistics operators building standalone or distribution-linked cold storage.",
  },

  "biogas-consultancy": {
    overview: [
      "Sector work for anaerobic digestion plants — biogas for captive power or thermal use, and compressed biogas (CBG / Bio-CNG) for the SATAT offtake route — covering feedstock, digester design, gas upgrading and the offtake contract.",
      "A biogas plant is a feedstock contract with a digester attached. The tonnage, moisture and seasonality of press mud, cattle dung, napier grass or food waste set the gas yield and every downstream number, so a plant sized above what its catchment can reliably feed runs below nameplate for most of the year. The digestate is not a by-product to settle later either — its handling, storage and fertiliser value belong in the economics from the start.",
    ],
    deliverables: [
      "Feedstock availability, characterisation and tie-up assessment",
      "Digester type and sizing, with gas-yield and mass-balance modelling",
      "Gas upgrading and compression specification for CBG / Bio-CNG",
      "Offtake route — SATAT / OMC agreement, captive power or thermal substitution",
      "Digestate handling, FOM / LFOM processing and the fertiliser revenue line",
      "Detailed project report with CBG viability-gap funding and subsidy structure modelled",
    ],
    bestFor:
      "Sugar mills, dairies, municipalities and agri-entrepreneurs setting up CBG or captive biogas plants.",
  },

  "waste-management-consultancy": {
    overview: [
      "Sector work for waste-processing and recycling plants — municipal solid waste, dry-waste material recovery, plastic and C&D recycling, and industrial or hazardous-waste handling — covering the process line, the regulatory regime and the offtake for every output stream.",
      "A waste plant has two customers and both have to be secured before it is built: the one paying a tipping or gate fee to hand the waste over, and the one buying the recovered material or RDF at the other end. Projects fail when either side is assumed rather than contracted. The applicable rules — SWM, Plastic Waste Management, C&D or Hazardous Waste — decide the authorisations, the siting and much of the plant itself.",
    ],
    deliverables: [
      "Waste-stream characterisation, quantity assessment and gate-fee structure",
      "Process line — segregation, MRF, shredding, RDF, composting or recycling",
      "Regulatory route under the applicable Waste Management Rules, with CPCB / SPCB consent",
      "EPR and co-processing tie-ups, and offtake contracts for each output stream",
      "Siting, buffer-zone and environmental-clearance assessment",
      "Detailed project report with viability under realistic tipping-fee and sales assumptions",
    ],
    bestFor:
      "Urban local bodies, industrial estates and recyclers setting up MSW, plastic, C&D or hazardous-waste processing.",
  },
};

export type ProcessStep = {
  /** Rendered as given, so the sequence reads the same as it is authored. */
  no: string;
  title: string;
  body: string;
};

export const engagementProcess = {
  eyebrow: "How We Work",
  heading: "What an Engagement Actually Looks Like",
  body:
    "The same five stages whether the engagement is one service or several. Nothing moves to the next stage until the last one has an answer you have signed off on.",
  steps: [
    {
      no: "01",
      title: "Discovery call",
      body: "You tell us what you intend to build, roughly where, and roughly at what scale. We tell you what the project needs and whether we are the right firm for it. No charge, and no obligation to continue.",
    },
    {
      no: "02",
      title: "Feasibility and scope",
      body: "Demand, process route, capacity and site are tested against each other until they agree. This is the stage that decides whether the project is worth doing, and it is the cheapest place to find out that it is not.",
    },
    {
      no: "03",
      title: "Detailed project report",
      body: "The document that carries the project through the rest of its life: product, process, plant and machinery schedule, utilities, manpower, cost of project, means of finance and projected profitability, written to survive an appraisal desk.",
    },
    {
      no: "04",
      title: "Finance and subsidy",
      body: "Term loan and working capital arranged, and the incentive claim filed against the scheme the project actually qualifies for. These run on separate clocks and are sequenced together, because arranged out of order a fully sanctioned project still stalls.",
    },
    {
      no: "05",
      title: "Procurement and commissioning",
      body: "Machinery specified, quoted, inspected and installed; layout and utilities executed; trial runs held. We stay on the project until the line holds rated output, not until the last invoice is paid.",
    },
  ] satisfies ProcessStep[],
} as const;

export const servicesEnquiry = {
  eyebrow: "Start Here",
  heading: "Not Sure Which Service You Need?",
  paragraphs: [
    "Most projects do not arrive knowing whether they need a feasibility study, a project report or a subsidy filing — they arrive knowing what they want to manufacture. Working out which of the engagements the project actually needs, and in what order, is the first conversation, and it does not cost anything.",
    "Send us the outline and a consultant will come back to you with a straight answer, including the case where the answer is that you do not need us yet.",
  ],
  form: {
    heading: "Talk to a Consultant",
    body: "Tell us what you intend to build. We will come back within one working day with what the project needs.",
  },
} as const;

export const sectorStrip = {
  eyebrow: "Sectors",
  heading: "Where These Services Are Delivered",
  body:
    "Every engagement is specified against the sector it is for — the process routes, the applicable norms and the machinery market all differ. These are the sectors we work in.",
  cta: { label: "View All Industries", href: "/industries" },
} as const;

export type Faq = { question: string; answer: string };

/**
 * Rendered as native `<details>` elements and, from the same array, as
 * `FAQPage` structured data on the page. One source, so the markup a crawler
 * reads and the text a visitor reads cannot diverge.
 */
export const servicesFaq = {
  eyebrow: "Questions",
  heading: "Before You Get in Touch",
  items: [
    {
      question: "What does an industrial consultant actually do?",
      answer:
        "Resolves the questions that decide whether a plant works while they are still cheap to answer — what to make, at what capacity, on what site, with which machines, financed how. The work is concentrated at the start of a project, which is where nearly all of a project's cost is committed and almost none of it has yet been spent.",
    },
    {
      question: "At what stage should we bring you in?",
      answer:
        "Before land and machinery are committed. Both decisions constrain everything downstream — subsidy eligibility, loan structure, layout, cost per unit — and both are expensive to reverse. Several incentive schemes also close to a project once the first invoice has been raised.",
    },
    {
      question: "Do you charge for the first consultation?",
      answer:
        "No. The discovery call is free and carries no obligation. Fees are quoted per engagement once the scope is clear, and they are quoted directly rather than recovered through vendor or machinery commissions.",
    },
    {
      question: "Which subsidy schemes do you work with?",
      answer:
        "The central schemes an MSME manufacturer is most likely to qualify under — PMEGP, CGTMSE and PMFME among them — alongside the state industrial policy that applies where you are building. Which combination is worth pursuing depends on sector, location and investment size, and it is decided per project rather than from a template.",
    },
    {
      question: "Do you help with the bank, or only with the paperwork?",
      answer:
        "Both. We prepare the report to appraisal standard and we take it to the desk, handling the queries that come back. Sanction is the deliverable, not submission.",
    },
    {
      question: "Do you source the machinery, or only advise on it?",
      answer:
        "We specify it, shortlist suppliers, compare quotations on rated output rather than on price, inspect before dispatch and oversee installation and commissioning. The purchase contract is yours and is signed directly with the supplier — we do not resell equipment, which is what keeps the recommendation independent.",
    },
    {
      question: "Can you take over a project that has already stalled?",
      answer:
        "Yes, and a meaningful share of the work is exactly that. A stalled project usually needs the same diagnosis as a new one, run backwards: what was decided, in what order, and which of those decisions is now the constraint.",
    },
    {
      question: "Do you work outside your home state?",
      answer:
        "Yes, across India. State industrial policy differs enough that it is a substantive part of the engagement rather than a footnote, which is why subsidy work is mapped per project and per location.",
    },
  ] satisfies Faq[],
} as const;
