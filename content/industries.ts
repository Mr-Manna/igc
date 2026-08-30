import type { IndustrySlug } from "@/content/home";

/**
 * Long-form copy for /industries.
 *
 * The counterpart to `content/services.ts`: that file is organised by what we
 * do, this one by what the client makes. Both describe the same engagements —
 * the split exists because a promoter searching for help does one or the other,
 * never both, and a page that answers "can you do a PET preform unit" is not the
 * same page as one that answers "what is a DPR".
 *
 * As in the services file, everything here is domain content — process routes,
 * statutory gates, the machinery market — and none of it attributes anything to
 * a named client, so there is no `TODO(real-data)` on this file.
 *
 * Two standing rules for edits. Name a statutory regime only where it genuinely
 * applies to that sector, because a wrong licence named on a sector page is
 * worse than no licence named at all; and do not name an incentive scheme that
 * has lapsed, which is why the copy below refers to state industrial policy
 * generically rather than listing schemes with expiry dates.
 */

export const industriesPage = {
  eyebrow: "Sectors",
  heading: "Industries We Serve",
  body:
    "Ten manufacturing sectors, each with its own process routes, statutory gates and machinery market. The engagement is the same; what changes is everything that decides whether the project clears.",
  primaryCta: { label: "Get Free Consultation", href: "/contact" },
  secondaryCta: { label: "Request Project Report", href: "/project-reports" },
  jumpLabel: "Jump to a sector",
} as const;

export const sectorApproach = {
  eyebrow: "Why It Matters",
  heading: "The Sector Decides the Project",
  body:
    "Two units with the same capital outlay and the same headcount can face entirely different answers on all four of these. It is the reason a project report written from a template survives about one appraisal in three.",
  points: [
    {
      title: "The approval that gates construction",
      body: "Pollution board categorisation — red, orange or green — decides whether consent to establish is a formality or the critical path. In several sectors it also decides which sites are available to you at all, because a red-category unit cannot go where the zoning does not allow it.",
    },
    {
      title: "The process route",
      body: "Capacity is a function of the route, not of the machine list. The same output can be reached by a route that costs half as much to run and cannot take a second product later, or by one that costs more and can. That trade is made once, at the start.",
    },
    {
      title: "The machinery market",
      body: "Some sectors are served by a mature Indian supplier base; others are import-led, with lead times and duty positions that move the project schedule by months. Which one you are in changes both the cost of project and when the money is needed.",
    },
    {
      title: "The incentive that applies",
      body: "Central schemes are sector-scoped and state industrial policy is location-scoped. Eligibility is decided by the combination, and by when in the project you file — several schemes close to a unit once the first capital invoice has been raised.",
    },
  ],
} as const;

export type IndustryDetail = {
  /** One sentence naming the work. Sits under the sector name as a standfirst. */
  lede: string;
  /**
   * The argument: what actually decides whether a project in this sector works.
   * One paragraph, specific to the sector — if a sentence would read the same
   * under any other sector heading, it does not belong here.
   */
  body: string;
  /** Typical units we set up in the sector. Five, so the grid stays even. */
  units: string[];
  /**
   * The statutory and technical gates a project has to clear. Three or four —
   * enough to show the terrain is known without turning into a compliance
   * checklist the page cannot keep current.
   */
  gates: string[];
};

export const industryDetails: Record<IndustrySlug, IndustryDetail> = {
  plastic: {
    lede: "Polymer processing across injection, blow, extrusion and thermoforming, plus the tooling that goes with it.",
    body: "Everything downstream of the polymer grade is constrained by it, and the tooling is the part that cannot be revised once cut. A mould specified around the grade that was cheapest at quotation stage will run — but at a cycle time and a rejection rate that were never in the projections, and the difference compounds every shift for the life of the machine. Sizing is the other half: injection capacity is a clamping tonnage and a shot weight decided by the part, not a number picked to hit a capex figure.",
    units: [
      "Injection moulding units for containers, closures and components",
      "Blow moulding and PET preform-to-bottle lines",
      "Pipe, profile and film extrusion",
      "Thermoforming and sheet lines",
      "In-house mould and tool rooms",
    ],
    gates: [
      "EPR registration under the Plastic Waste Management Rules for producers and brand owners",
      "State pollution board consent, with category depending on the process and resin",
      "BIS certification where the product carries a mandatory standard",
      "Food-grade and migration compliance for anything in contact with food",
    ],
  },

  "food-processing": {
    lede: "Processing, preservation and packing units for fruit and vegetable, grain, dairy, snack and ready-to-eat products.",
    body: "Food projects are decided by the raw material calendar before they are decided by anything else. A line sized for peak-season arrivals sits idle for two-thirds of the year unless a second product or a preservation step has been designed in from the start, and a plant that solves that with cold storage has quietly added a utility load and a capital block nobody costed. Shelf life is the other constraint that reaches backwards into the machine list: the packing format and the preservation route have to be settled before the line is specified, not after the first trial run.",
    units: [
      "Fruit and vegetable processing, pulping and IQF lines",
      "Flour, rice, dal and spice milling",
      "Bakery, snack and extruded-product lines",
      "Dairy processing and packing",
      "Ready-to-eat and ready-to-cook retort units",
    ],
    gates: [
      "FSSAI licence, with the premises specified to the schedule that applies",
      "Cold chain and utility load sized against the raw material calendar",
      "Central food processing incentives, including PMFME for micro units",
      "Effluent treatment, which is substantive for wet processing",
    ],
  },

  beverage: {
    lede: "Packaged drinking water, mineral water, carbonated and non-carbonated soft drinks, juices and dairy beverages.",
    body: "Beverage plants are among the few where the standard writes much of the project for you: IS 14543 and the BIS certification that goes with it fix the treatment train, the testing regime and the in-house laboratory, so the room for design opinion is narrow and the room for expensive omission is wide. The commercial question is the one people underestimate — a beverage line is a distribution business wearing a factory, and the packing format, crate logistics and radius of profitable delivery decide viability at least as firmly as the filler does.",
    units: [
      "Packaged drinking water and mineral water plants",
      "Carbonated soft drink and flavoured beverage lines",
      "Fruit juice, pulp-based and RTS beverage units",
      "Dairy-based and functional beverage lines",
      "Bottle blowing integrated with filling",
    ],
    gates: [
      "BIS certification to IS 14543 for packaged drinking water, with the ISI mark mandatory",
      "FSSAI licence and the in-house laboratory the standard requires",
      "Water source assessment and groundwater extraction clearance",
      "Treatment train specified to the source analysis, not to a template",
    ],
  },

  chemical: {
    lede: "Specialty and intermediate chemicals, resins, adhesives, agrochemical formulation and blending units.",
    body: "In chemicals the site decision is the project decision. Category, zoning, effluent load and distance to habitation between them rule out most plots before a layout is drawn, and a promoter who has already bought land is frequently the promoter whose project cannot be built on it. Storage is the second thing that surprises people: solvent handling brings a licensing regime, a tank farm and a layout separation that are not optional, and they land on the capital cost of a plant that was budgeted around reactors.",
    units: [
      "Specialty and intermediate chemical plants",
      "Resin, adhesive and coating manufacture",
      "Agrochemical and fertiliser formulation",
      "Blending, packing and repacking units",
      "Solvent recovery and recycling",
    ],
    gates: [
      "Consent to establish before construction, with red-category treatment common",
      "PESO licence for storage and handling of flammable solvents",
      "Effluent and emission treatment designed into the layout, not appended",
      "Environmental clearance where the scale or the category requires it",
    ],
  },

  textile: {
    lede: "Spinning, weaving, knitting, processing and made-up units, and the technical textile segments alongside them.",
    body: "Textile is the sector where the choice of where to sit in the chain matters more than the choice of machine. Spinning is capital-heavy, power-heavy and priced off a commodity; garmenting is labour-heavy and priced off order books; processing sits between them and carries the effluent burden for the whole chain. Each has a different break-even, a different working capital cycle and a different exposure, and a project that has not decided which one it is in will end up with the machinery of one and the finance structure of another.",
    units: [
      "Spinning, open-end and ring frame units",
      "Weaving, knitting and warp-knit lines",
      "Dyeing, printing and finishing houses",
      "Garmenting and made-up manufacturing",
      "Technical and non-woven textile lines",
    ],
    gates: [
      "Effluent treatment and ZLD obligations, which are decisive for wet processing",
      "Power cost and contracted load, a first-order variable in spinning",
      "State textile policy incentives, which vary widely by location",
      "Working capital sized to a cycle that is longer than promoters assume",
    ],
  },

  agriculture: {
    lede: "Agro-processing, post-harvest infrastructure, cold chain, warehousing and farm input manufacturing.",
    body: "Agro projects live or die on procurement, and procurement is a catchment question. A unit sized above what its radius can supply spends the year buying at a premium from further out, which is a margin problem that no amount of plant efficiency fixes. Seasonality does the rest of the damage, and the projects that survive it are the ones designed for a second crop, a second product or a storage revenue line from the beginning. This is also the sector best served by central infrastructure funding, which materially changes the finance structure when the project is designed to qualify.",
    units: [
      "Cold storage, controlled atmosphere and ripening chambers",
      "Grain handling, drying and warehousing",
      "Oil mills, solvent extraction and refining",
      "Cattle and poultry feed plants",
      "Fertiliser, bio-input and farm input manufacturing",
    ],
    gates: [
      "Procurement catchment assessed before capacity is fixed",
      "Central post-harvest and infrastructure funding, including the Agriculture Infrastructure Fund",
      "FSSAI licence where the output is a food product",
      "Power reliability and backup, which decides viability for cold chain",
    ],
  },

  engineering: {
    lede: "Fabrication, machining, sheet metal, castings and capital equipment manufacture.",
    body: "Job-shop economics are the trap here. A shop that quotes against whatever comes in fills its capacity and still does not make money, because the mix of work it took on has no common setup and every job pays for its own changeover. The projects that work are the ones that decided early what they are — a component supplier to a named tier, a build-to-print fabricator, or a product company — and bought machines for that. Utilisation, not the machine list, is what the appraisal will actually test, and it is the number promoters are most consistently optimistic about.",
    units: [
      "CNC machining and precision component shops",
      "Sheet metal, laser cutting and press lines",
      "Structural and heavy fabrication",
      "Foundry and casting units",
      "Capital equipment and machine building",
    ],
    gates: [
      "Realistic machine utilisation, which the appraisal will test hardest",
      "Contracted power load and shift pattern sized to the machine list",
      "Factory licence, and IBR approval where pressure equipment is involved",
      "Customer quality qualification, which sets the metrology and inspection spend",
    ],
  },

  packaging: {
    lede: "Corrugated boxes, flexible and rigid packaging, labels, and food-contact packaging formats.",
    body: "Packaging is a conversion business with thin margins and a heavy dependence on how well the plant is loaded, which makes the customer commitment as much a part of the appraisal as the machine. The second factor is regulatory drift running the other way: brand owners now push their own EPR and food-contact obligations onto their converters, so a line specified without reference to what the customer must be able to declare will find itself unable to serve the accounts it was built for. Both mean the offtake question comes before the equipment question.",
    units: [
      "Corrugated box plants with flexo or offset printing",
      "Flexible packaging, lamination and pouching",
      "PET, HDPE and rigid container manufacture",
      "Label, sleeve and carton printing",
      "Food-contact and export-grade packaging formats",
    ],
    gates: [
      "EPR obligations under the Plastic Waste Management Rules for plastic formats",
      "Food-contact and migration compliance where the pack touches food",
      "Offtake commitment sufficient to load the line before it is bought",
      "Print registration and quality standards set by the customer, not the supplier",
    ],
  },

  recycling: {
    lede: "Plastic, paper, metal and e-waste recycling, reprocessing and waste-to-value units.",
    body: "Recycling is the sector where the feedstock is the business. Availability, price volatility and above all consistency of the incoming stream decide the plant, and a line specified for clean sorted input that is fed mixed post-consumer material will run at a fraction of rated output with a rejection rate that erases the margin. The regulatory position is the other half and it cuts both ways: registration and EPR obligations are a real compliance load, and they are simultaneously what creates the demand — the buyers of certified recycled output are the producers who have to account for it.",
    units: [
      "PET, HDPE and PP washing, sorting and reprocessing lines",
      "Plastic granulation, pelletising and compounding",
      "Paper and board recycling units",
      "Metal recovery, segregation and processing",
      "E-waste dismantling and recovery facilities",
    ],
    gates: [
      "CPCB or state board registration as a recycler, with EPR obligations attached",
      "Feedstock supply secured and characterised before capacity is fixed",
      "Effluent treatment for wash lines, which is the main environmental load",
      "Output quality certified to what regulated buyers are required to account for",
    ],
  },

  "steel-metal": {
    lede: "Rolling mills, induction furnaces, structural steel, wire products and non-ferrous processing.",
    body: "Metals is a conversion-margin business, which means the project is a bet on the spread between input and output prices rather than on volume, and it is exceptionally sensitive to two inputs: power and scrap. A tariff difference of a rupee a unit moves the viability of an induction furnace more than a percentage point of yield does, which is why the state and the connection matter as much as the plant. Where the output carries a mandatory standard, certification is not a marketing exercise either — it is the condition of selling into the construction market at all.",
    units: [
      "Induction furnaces and continuous casting",
      "Hot and cold rolling mills, including TMT bar",
      "Structural steel and fabrication units",
      "Wire drawing, mesh and fastener production",
      "Non-ferrous processing and extrusion",
    ],
    gates: [
      "Power tariff and contracted load, the dominant variable in conversion cost",
      "BIS certification where the product carries a mandatory standard, TMT bar among them",
      "Scrap and raw material supply secured against price volatility",
      "Emission control and pollution board consent, typically red category",
    ],
  },
};

export const serviceStrip = {
  eyebrow: "Services",
  heading: "What We Deliver Into These Sectors",
  body:
    "The six core engagements run across all ten sectors. What changes between them is the process route, the statutory gate and the machinery market — which is the part that has to be got right per sector rather than per template.",
  cta: { label: "View All Services", href: "/services" },
} as const;

export const industriesEnquiry = {
  eyebrow: "Start Here",
  heading: "Your Sector Not Listed?",
  paragraphs: [
    "The ten above are where the bulk of our work sits, not the limit of it. Manufacturing projects share a structure — demand, route, capacity, site, machinery, finance — and the sector-specific part is the statutory regime and the supplier base, both of which are researched per project anyway.",
    "Tell us what you intend to manufacture and where. If it is a sector we do not have depth in, we will say so rather than learn on your project.",
  ],
  form: {
    heading: "Talk to a Consultant",
    body: "Tell us what you intend to build and in which state. We will come back within one working day.",
  },
} as const;

export type Faq = { question: string; answer: string };

/**
 * Sector-scoped questions only. The general ones — fees, stage to engage, which
 * subsidy schemes — are answered on /services, and repeating them here would be
 * two pages competing for the same query with the same text.
 */
export const industriesFaq = {
  eyebrow: "Questions",
  heading: "About Sector Work",
  items: [
    {
      question: "Does the consultancy actually differ by sector?",
      answer:
        "The structure of the engagement does not — demand, process route, capacity, site, machinery, finance, in that order. What differs is every input to it: the statutory gate that decides whether a site is usable, the process routes available, the supplier base, and the incentives the project qualifies for. That is the part written per sector rather than per template, and it is where a generic project report fails an appraisal.",
    },
    {
      question: "We are in a sector you have not listed. Can you still help?",
      answer:
        "Usually. The ten listed are where our project history is deepest, not a boundary. What we will not do is take on a sector where the regulatory regime is specialised and we have no prior work — we will tell you that at the discovery call rather than after the engagement letter.",
    },
    {
      question: "Which sectors have the strongest subsidy support?",
      answer:
        "Food processing and agro-processing are the best served by central schemes, and post-harvest infrastructure funding materially changes the finance structure for projects designed to qualify. Beyond that it depends more on where you are building than on what you are making, because state industrial policy carries most of the capital incentive and varies widely between states.",
    },
    {
      question: "How early does the sector affect the site decision?",
      answer:
        "Immediately, and it is the most common expensive mistake we are called in to fix. Pollution board categorisation, zoning and distance norms rule out most plots for a red-category unit before a layout exists. Promoters who buy land first and scope the project afterwards frequently find the project cannot be built on the land they own.",
    },
    {
      question: "Do you have machinery suppliers for every sector?",
      answer:
        "We maintain a working knowledge of the supplier base in each — which segments the Indian market serves well, and which are import-led with the lead times and duty positions that come with that. Suppliers are shortlisted per project against your output target and compared on rated output and cost per unit, not on quoted price. We do not resell equipment, which is what keeps the shortlist honest.",
    },
    {
      question: "Can a project serve two sectors at once?",
      answer:
        "Often, and designing for it is cheap at the start and expensive later — a packaging line that can also run food-contact formats, or a food plant with a second-crop product to cover the off-season. It requires the flexibility to be specified into the tooling and the layout up front. Retrofitting it is usually a new machine.",
    },
  ] satisfies Faq[],
} as const;
