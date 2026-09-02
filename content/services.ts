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
 *
 * The catalogue is the client's full twenty-service list. `serviceGroups` below
 * splits it into five themed sections; `/services` renders and navigates by
 * that grouping, and `serviceDetails` — keyed by the closed `ServiceSlug` union
 * — carries the block copy for every one.
 */

export const servicesPage = {
  eyebrow: "What We Do",
  heading: "Industrial Consultancy Services",
  body:
    "One consultancy across the whole life of a manufacturing project — idea and feasibility, project report, finance and subsidy, machinery, factory setup, production, and the automation, AI and marketing that come after. Most clients start with one engagement and add the others as the project moves.",
  primaryCta: { label: "Get Free Consultation", href: "/contact" },
  secondaryCta: { label: "Request Project Report", href: "/project-reports" },
  jumpLabel: "Jump to a service",
} as const;

export type ServiceGroup = {
  id: string;
  heading: string;
  /** One line under the group heading — the thread the services in it share. */
  blurb: string;
  slugs: readonly ServiceSlug[];
};

/**
 * The five themed sections of the services page, in render order. `/services`
 * iterates this to lay the page out and `ServiceJumpNav` to build the grouped
 * anchor nav; `content/home.ts` keeps `services[]` in the same order.
 *
 * `as const satisfies` keeps the slug literals, which the compile guard below
 * uses to prove every service sits in exactly one group.
 */
export const serviceGroups = [
  {
    id: "project-feasibility",
    heading: "Project & Feasibility",
    blurb: "From a business idea to a plan a bank will fund.",
    slugs: [
      "industrial-project-consultancy",
      "manufacturing-business-consultancy",
      "market-research-opportunity-analysis",
      "detailed-project-report",
    ],
  },
  {
    id: "finance-subsidy",
    heading: "Finance & Subsidy",
    blurb: "Funding the project, and proving the numbers it turns on.",
    slugs: [
      "government-loan-subsidy-consultancy",
      "project-costing-financial-analysis",
      "working-capital-financial-management",
      "product-costing-consultancy",
    ],
  },
  {
    id: "factory-machinery",
    heading: "Factory & Machinery",
    blurb: "Specifying the plant, sourcing it, and building it right the first time.",
    slugs: [
      "machinery-consultancy",
      "factory-setup-consultancy",
      "plant-layout-production-planning",
      "vendor-supplier-development",
      "licensing-compliance-guidance",
    ],
  },
  {
    id: "production-turnaround",
    heading: "Production & Turnaround",
    blurb: "Getting more out of a plant that is already running.",
    slugs: [
      "production-process-improvement",
      "factory-machinery-expansion",
      "business-turnaround-cost-reduction",
      "industrial-project-implementation-management",
    ],
  },
  {
    id: "automation-ai-growth",
    heading: "Automation, AI & Growth",
    blurb: "Modernising how the business produces and sells.",
    slugs: [
      "industrial-automation-consultancy",
      "ai-consultancy",
      "digital-marketing",
    ],
  },
] as const satisfies readonly ServiceGroup[];

/**
 * Compile guard: every `ServiceSlug` must appear in exactly one group above. Add
 * a service to `serviceSlugs` without slotting it into a group and `Ungrouped`
 * stops being `never`, which fails this assignment.
 */
type Ungrouped = Exclude<ServiceSlug, (typeof serviceGroups)[number]["slugs"][number]>;
const _everyServiceGrouped: [Ungrouped] extends [never] ? true : Ungrouped = true;
void _everyServiceGrouped;

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
  // ── Group 1 — Project & Feasibility ─────────────────────────────────────────
  "industrial-project-consultancy": {
    overview: [
      "The full arc of setting up a manufacturing unit: what to make, at what capacity, on what site, with what process route, financed how — worked in that order, because each answer constrains the next.",
      "The expensive mistakes in a greenfield project are nearly all made in the first eight weeks, when nothing has been built and everything still looks reversible. A capacity figure picked without a demand study, a plot taken before checking the effluent norms for the sector, a process route chosen around a machine someone has already been quoted for: each of those is cheap to correct now and structural later.",
    ],
    deliverables: [
      "Business idea and product evaluation",
      "Market and demand assessment",
      "Capacity sizing and process route selection",
      "Investment estimate and profitability projections",
      "Break-even, ROI and risk assessment",
      "Project implementation plan",
    ],
    bestFor:
      "First-time promoters, and established manufacturers adding a line or a second unit.",
  },

  "manufacturing-business-consultancy": {
    overview: [
      "Turning a decision to manufacture into an operating plan: the business model, the cost of making one unit, and the capacity, manpower and layout that plan implies.",
      "A project can clear its feasibility study and still fail on the shop floor because the numbers it was approved on were never converted into an operating plan. Production cost is estimated rather than built up line by line, capacity is quoted at nameplate rather than at a realistic utilisation, and the manpower and utility loads are settled after the machines are ordered. Each gap is invisible until the plant is running and the margin is not there.",
    ],
    deliverables: [
      "Manufacturing business model and product costing",
      "Production capacity and capacity-utilisation plan",
      "Raw-material, manpower and utility planning",
      "Factory layout plan",
      "Production-cost and selling-price calculation",
      "Profit-margin and expansion analysis",
    ],
    bestFor:
      "Entrepreneurs setting up a first manufacturing operation, and owners formalising one that grew without a plan.",
  },

  "market-research-opportunity-analysis": {
    overview: [
      "The questions that come before a feasibility study: what to manufacture, who buys it, how much they need, what the competition looks like, and how quickly the money comes back.",
      "Most projects are chosen from a shortlist of one — a product the promoter already has a reason to like — and a market study that starts after that choice tends to confirm it. Done first, it is the cheapest way to find out that the demand is regional and already served, that the margin is thin, or that a nearby unit has just doubled capacity.",
    ],
    deliverables: [
      "Market size and demand analysis",
      "Competitor and customer-segment analysis",
      "Product pricing and distribution-channel study",
      "Raw-material availability assessment",
      "Regional and export opportunity mapping",
      "Market-trend outlook for the product",
    ],
    bestFor:
      "Promoters weighing more than one product, and investors screening a sector before committing.",
  },

  "detailed-project-report": {
    overview: [
      "The bankable Detailed Project Report: the single document that carries a project through appraisal, sanction and disbursement, written to the standard a credit desk reads it at.",
      "A DPR is read as an argument, not a form. Where the working-capital cycle is understated, capacity utilisation ramps unrealistically in year one, or the debt service coverage is thin in the repayment years, the file goes back — and each return costs weeks. A report that anticipates those questions clears on the first pass.",
    ],
    deliverables: [
      "Promoter profile, product and market sections",
      "Manufacturing process, machinery and utilities schedule",
      "Project cost and means of finance",
      "Sales, production and profit-and-loss projections",
      "Cash-flow and balance-sheet projections",
      "Break-even, DSCR, IRR and risk analysis",
    ],
    bestFor:
      "Any project raising a bank term loan or applying for a subsidy that needs an appraisal-standard report.",
  },

  // ── Group 2 — Finance & Subsidy ────────────────────────────────────────────
  "government-loan-subsidy-consultancy": {
    overview: [
      "Mapping a project to the central and state loan and subsidy schemes it actually qualifies for, then structuring the finance and taking both through to sanction and disbursement.",
      "Subsidy is where projects lose money quietly. PMEGP, AHIDF, PMKSY, the National Livestock Mission and the state capital-investment schemes each carry their own eligibility tests, ceilings and claim windows, and they are not interchangeable. A unit that would have qualified comfortably under one is regularly filed under another and rejected on a technicality — often after the first invoice has been raised, which is the point past which several schemes close entirely.",
    ],
    deliverables: [
      "Eligibility screen across central and state schemes",
      "Scheme selection, with the trade-offs set out",
      "Project structuring and DPR preparation",
      "Bank proposal and loan documentation",
      "Filing and coordination with DIC, KVIC and the lending bank",
      "Subsidy claim, disbursement follow-up and post-sanction compliance",
    ],
    bestFor:
      "MSMEs still at the planning stage — the earlier the better, and before capital is committed.",
  },

  "project-costing-financial-analysis": {
    overview: [
      "Building the actual economics of a proposed project from the ground up: every cost line from land to pre-operative expenses, then the production cost, the selling price and the returns that follow.",
      "A project costed in round figures is a project whose margin is a guess. The gap between a machinery quotation and the installed, wired, running cost of that machine is routinely 20 to 40 per cent; working capital is the line most often left out; and a selling price set from the market rather than from the cost base hides a loss until volume exposes it.",
    ],
    deliverables: [
      "Land, building, machinery and installation cost",
      "Electrical, utility and pre-operative expenses",
      "Working capital requirement",
      "Production cost per unit and selling price",
      "Gross profit, net profit and EBITDA",
      "Break-even point, ROI and payback period",
    ],
    bestFor:
      "Promoters pressure-testing a project's numbers before the DPR, and anyone comparing two projects on returns.",
  },

  "working-capital-financial-management": {
    overview: [
      "Working out how much working capital a business actually needs to run, and where the cash sits tied up while it waits.",
      "Under-assessed working capital is the most common reason a fully sanctioned project stalls after commissioning: the term loan builds the plant, and then there is nothing to buy the first three months of raw material with. The cycle — raw material in, goods out, payment received, suppliers paid — has to be measured for the specific business, not taken from a norm.",
    ],
    deliverables: [
      "Raw-material and finished-goods inventory norms",
      "Receivables and payables assessment",
      "Working-capital cycle calculation",
      "Cash requirement and cash-flow plan",
      "Bank working-capital finance requirement",
      "A monitoring framework for the cycle",
    ],
    bestFor:
      "Projects sizing their working-capital limit, and running units where cash is tight despite profitable sales.",
  },

  "product-costing-consultancy": {
    overview: [
      "Establishing the true cost of making one unit — raw material, power, labour, packaging, maintenance, overhead and finance — and the price chain that has to sit on top of it.",
      "Manufacturers routinely price from what the market pays and discover the margin only at year-end. When the per-unit cost is built up properly, the questions that matter become answerable: which products to push, which to drop, where a wholesale and distributor margin still leaves a viable retail price, and how much a power-tariff change actually costs.",
    ],
    deliverables: [
      "Per-unit manufacturing cost breakdown",
      "Overhead and finance-cost allocation",
      "Manufacturing cost to wholesale to distributor to retail price chain",
      "Profit-margin analysis by product",
      "Cost sensitivity to material and power prices",
      "The costing model handed over for reuse",
    ],
    bestFor:
      "Plastic, packaging, disposable, food and engineering-component makers running several products off one line.",
  },

  // ── Group 3 — Factory & Machinery ──────────────────────────────────────────
  "machinery-consultancy": {
    overview: [
      "Specifying, sourcing and commissioning plant and machinery — domestic or imported — against what the line has to produce rather than against what is on offer.",
      "The lowest quotation is rarely the lowest cost per unit produced. Throughput under your raw material and your power conditions, rejection rate, spares availability, and how quickly a supplier's engineer can reach your site all outrank the number at the bottom of the page. Holding one specification from quotation through to commissioning is what stops the machine that arrives from being a different machine than the one that was appraised.",
    ],
    deliverables: [
      "Technical specification written to your output target",
      "Capacity selection and Indian-versus-imported comparison",
      "Supplier shortlisting and multiple-quotation comparison",
      "Price negotiation and supplier verification",
      "Pre-dispatch inspection and import documentation",
      "Installation, trial runs and commissioning oversight",
    ],
    bestFor:
      "Anyone about to commit capital to plant and machinery, and units replacing or expanding an existing line.",
  },

  "factory-setup-consultancy": {
    overview: [
      "The physical build of the plant: land, building, utilities, installation, trial production and the path to commercial production, planned as one sequence.",
      "A factory built to a generic layout and then fitted to the process pays for the building twice. Effluent load, electrical capacity, water and drainage, storage and material flow all have to be in the first drawing — retrofitting any of them once the shed is up means breaking concrete.",
    ],
    deliverables: [
      "Land-area and site-suitability assessment",
      "Factory building requirement and plant layout",
      "Electrical, water and drainage planning",
      "Raw-material and finished-goods warehouse planning",
      "Loading, office and worker-facility planning",
      "Safety planning and commissioning support",
    ],
    bestFor:
      "Promoters at the land-acquisition or building-design stage of a greenfield unit.",
  },

  "plant-layout-production-planning": {
    overview: [
      "The arrangement of machines, stores, people and utilities on the floor, worked out so material moves the shortest distance and the line is not waiting on itself.",
      "Layout is decided once and lived with for the life of the plant. A metre of unnecessary travel per unit, a warehouse on the wrong side of the line, or a utility run that blocks an expansion bay is a cost that compounds every shift — and it is nearly free to fix on paper and expensive to fix in steel.",
    ],
    deliverables: [
      "Factory and production-line layout",
      "Machinery positioning and material-handling plan",
      "Raw-material and finished-product flow",
      "Warehouse and utility layout",
      "Worker movement and safety zones",
      "Expansion provisions built into the plan",
    ],
    bestFor:
      "New plants at the design stage, and running units losing output to movement and congestion.",
  },

  "vendor-supplier-development": {
    overview: [
      "Finding and qualifying the vendors a plant depends on — machinery, raw materials, spares and services — and benchmarking what they quote.",
      "A single-source supplier chosen in a hurry at project stage becomes a permanent cost: price rises are hard to challenge, quality slips are hard to escalate, and a delayed spare stops the line. Building two or three qualified sources per critical input before commissioning is far cheaper than doing it under pressure later.",
    ],
    deliverables: [
      "Supplier identification for machinery, materials and services",
      "Vendor comparison and evaluation",
      "Technical quotation comparison",
      "Price benchmarking",
      "Negotiation assistance",
      "Procurement plan and spare-parts sourcing",
    ],
    bestFor:
      "Projects building their supplier base before commissioning, and units over-dependent on a single vendor.",
  },

  "licensing-compliance-guidance": {
    overview: [
      "Identifying the registrations, licences and approvals a specific project needs — by state, location, product and plant capacity — and the order to obtain them in.",
      "Approvals have dependencies and lead times that do not forgive a late start. A consent to establish that should have been filed at land stage, an FSSAI licence that gates dispatch, a boiler approval that gates commissioning: each can hold a finished plant idle for months. The list is knowable at the start of the project, and most of it is not obvious.",
    ],
    deliverables: [
      "An applicable-approvals list for the specific project",
      "Udyam registration, GST and factory approvals",
      "Pollution-control and fire-safety requirements",
      "FSSAI, BIS and legal-metrology requirements",
      "Boiler, electrical and local-authority permissions",
      "A sequencing plan against the project schedule",
    ],
    bestFor:
      "Every new manufacturing project — the earlier the approvals map is drawn, the fewer surprises gate commissioning.",
  },

  // ── Group 4 — Production & Turnaround ──────────────────────────────────────
  "production-process-improvement": {
    overview: [
      "Work on a plant that already runs: finding where the output is actually being lost and closing the gap between rated capacity and what comes off the line.",
      "A unit rarely underperforms for the reason its owner assumes. The bottleneck is usually one station in a sequence, an inventory norm nobody has revisited since commissioning, or a rejection rate that has been absorbed into the standard cost so long that it no longer registers as a loss. Measuring the line before changing it is most of the value.",
    ],
    deliverables: [
      "Production-efficiency and cycle-time study",
      "Material-wastage and rejection root-cause analysis",
      "Machine-utilisation and downtime reduction",
      "Line balancing and production planning",
      "Quality improvement and inventory management",
      "Preventive-maintenance planning",
    ],
    bestFor:
      "Running units where output has plateaued below rated capacity, or margin is thinning without an obvious cause.",
  },

  "factory-machinery-expansion": {
    overview: [
      "For an established unit, the case for growing: how much more the plant can produce, what it would cost, and what the additional output actually returns.",
      "Expansion is often reached for when the real constraint is a single bottleneck that a fraction of the capital would clear. The order that pays is diagnosis first — where the line actually stops — then automation and de-bottlenecking, and only then new capacity, because a second line behind the same bottleneck buys nothing.",
    ],
    deliverables: [
      "Capacity-expansion study",
      "Production-bottleneck analysis",
      "New machinery selection and automation opportunities",
      "Additional product-line planning",
      "Manpower and energy optimisation",
      "Plant-expansion plan with ROI analysis",
    ],
    bestFor:
      "Profitable units at or near capacity, and owners deciding between de-bottlenecking and a new line.",
  },

  "business-turnaround-cost-reduction": {
    overview: [
      "A structured health check of an existing or struggling factory — sales, production, costs, labour, inventory, debt and profitability — followed by a costed recovery plan.",
      "A unit in trouble usually knows it is losing money without knowing where. The loss is spread across a rejection rate, an idle machine, an over-stretched working-capital line and a product that has been sold below cost for a year. Naming the largest few, in order, is what turns a vague problem into a plan.",
    ],
    deliverables: [
      "A business and factory health check",
      "Sales, expense and production review",
      "Labour, electricity and raw-material analysis",
      "Inventory, rejection and machine-utilisation review",
      "Debt and working-capital assessment",
      "A cost-reduction and profit-improvement plan",
    ],
    bestFor:
      "Existing units whose margin or cash position has deteriorated, and promoters or lenders reviewing a stressed unit.",
  },

  "industrial-project-implementation-management": {
    overview: [
      "End-to-end coordination of a project through every stage — feasibility, DPR, finance, land, machinery, installation, trial and commercial production — as a single managed sequence.",
      "A project with a different adviser for each stage loses time in the handovers, where the DPR's assumptions quietly diverge from what is being built and the subsidy claim is filed against a scope that has moved. One party holding the whole roadmap keeps the plant that gets commissioned the same as the one that was appraised.",
    ],
    deliverables: [
      "Stage-wise project roadmap and schedule",
      "Feasibility, DPR and finance coordination",
      "Land, building and machinery procurement oversight",
      "Installation and trial-production management",
      "Commercial-production handover",
      "Marketing, sales and expansion planning",
    ],
    bestFor:
      "Promoters who want a single point of accountability from idea to running plant.",
  },

  // ── Group 5 — Automation, AI & Growth ──────────────────────────────────────
  "industrial-automation-consultancy": {
    overview: [
      "Identifying where automation earns its cost in an MSME plant — handling, weighing, filling, packaging, inspection and monitoring — and where it does not.",
      "Automation sold as a package tends to automate the visible station rather than the constraining one. The value is in the assessment first: which manual steps actually limit throughput or quality, what a sensor or a conveyor there returns, and which are cheaper left as they are.",
    ],
    deliverables: [
      "An automation-opportunity assessment across the line",
      "Automatic handling, weighing, filling and packaging",
      "Conveyor and PLC automation specification",
      "Sensor-based and robotic-handling systems",
      "Automatic inspection and production monitoring",
      "Digital inventory and machine-monitoring systems",
    ],
    bestFor:
      "MSME manufacturers scaling volume or tightening quality who want automation targeted rather than wholesale.",
  },

  "ai-consultancy": {
    overview: [
      "Putting AI to work on the parts of a manufacturing business where it pays back quickly — lead handling, forecasting, quality, maintenance and reporting.",
      "AI in a factory fails when it is bought as a platform and left to find a use. It works when it is pointed at a named problem: quotations that take a day to turn around, a demand forecast that is really a guess, a maintenance schedule that is calendar-based while the machine fails on hours run.",
    ],
    deliverables: [
      "Sales lead generation and follow-up automation",
      "Quotation generation and WhatsApp customer support",
      "Demand, production and inventory forecasting",
      "AI-assisted quality inspection",
      "Predictive maintenance",
      "MIS reporting, dashboards and document automation",
    ],
    bestFor:
      "Manufacturers and MSMEs with a specific bottleneck in sales, planning, quality or reporting to point AI at.",
  },

  "digital-marketing": {
    overview: [
      "Lead generation for industrial companies and machinery manufacturers — the channels, the assets and the follow-up system that turn enquiries into orders.",
      "Industrial marketing spend is usually scattered across channels with no way to tell which produced an enquiry, and the leads that do arrive go cold because nothing owns the follow-up. A single system — the right channels for a considered purchase, proper product collateral, and a CRM that nurtures — is what makes the spend measurable.",
    ],
    deliverables: [
      "Website, landing pages and industrial SEO",
      "Google, Meta and LinkedIn ad campaigns",
      "Product brochures, company profiles and industrial video",
      "Lead-generation campaigns",
      "CRM implementation",
      "A lead-nurturing system",
    ],
    bestFor:
      "Machinery manufacturers and industrial suppliers that need a measurable pipeline rather than scattered spend.",
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
      title: "Procurement to commissioning",
      body: "Machinery specified, quoted, inspected and installed; layout and utilities executed; trial runs held and the line taken to commercial production. Where the engagement continues, automation, AI and marketing follow. We stay until the line holds rated output, not until the last invoice is paid.",
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
  cta: { label: "View All Sectors", href: "/sectors" },
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
      question: "Do you only cover project setup, or also automation, AI and marketing?",
      answer:
        "The full arc. The core engagements take a project from feasibility to a commissioned line; beyond that we work on industrial automation, AI for forecasting, quality and reporting, and lead generation for industrial companies. Most clients begin with one engagement and bring in the others as the plant moves from build to running to growth.",
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
      question: "Which loan and subsidy schemes do you work with?",
      answer:
        "Loans and subsidies are handled as one engagement. On the subsidy side, the central schemes an MSME manufacturer is most likely to qualify under — PMEGP, CGTMSE, PMFME, AHIDF, PMKSY and the National Livestock Mission among them — alongside the state industrial policy that applies where you are building. On the finance side, term loans and working-capital limits structured together and taken through appraisal. Which combination is worth pursuing is decided per project rather than from a template, and approval always rests with the scheme authority and the bank — the work is to make the application as strong as the guidelines allow.",
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
