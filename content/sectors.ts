import type { SectorSlug } from "@/content/home";

/**
 * Long-form copy for /sectors.
 *
 * The counterpart to `content/services.ts`: that file is organised by what we
 * do, this one by what the client makes. Both describe the same engagements —
 * the split exists because a promoter searching for help does one or the other,
 * never both, and a page that answers "can you do a PET preform unit" is not the
 * same page as one that answers "what is a DPR".
 *
 * The sector list and the per-sector copy follow the client's own "Sectors We
 * Serve" document: `lede` is the one-line intro, `body` is the consultancy /
 * services sentence, and `units` is the project list, verbatim where possible.
 * None of it attributes anything to a named client, so there is no
 * `TODO(real-data)` on this file.
 *
 * One standing rule for edits: do not name an incentive scheme that has lapsed,
 * which is why the general copy refers to state industrial policy generically
 * rather than listing schemes with expiry dates.
 */

export const sectorsPage = {
  eyebrow: "Sectors",
  heading: "Sectors We Serve",
  body:
    "End-to-end industrial consultancy across manufacturing, processing, infrastructure and emerging-technology sectors — from feasibility and DPR to machinery, finance and plant setup, taken from concept to commercial production.",
  primaryCta: { label: "Get Free Consultation", href: "/contact" },
  secondaryCta: { label: "Request Project Report", href: "/project-reports" },
  jumpLabel: "Jump to a sector",
} as const;

export const sectorApproach = {
  eyebrow: "How We Work",
  heading: "From Concept to Commercial Production",
  body:
    "We take manufacturing and processing projects from a first conversation about an idea through to a plant running at rated output, whatever the sector. The sector decides the process route, the machinery market and the applicable norms; the work around it is the same each time.",
  points: [
    {
      title: "Planning and feasibility",
      body: "Market and demand assessment, feasibility study, and project costing — the questions that are cheap to answer before capital is committed and structural afterwards.",
    },
    {
      title: "Project report and finance",
      body: "A detailed project report written to appraisal standard, the project mapped to the central and state incentives it qualifies for, and the term loan taken through to sanction.",
    },
    {
      title: "Machinery and plant setup",
      body: "Machinery specified against your output target rather than the quoted price, procurement support, plant layout and material flow, and the specification held through installation and commissioning.",
    },
    {
      title: "Production, automation and growth",
      body: "Production costing and profitability once the line runs, automation where it pays back, and support for capacity expansion and new products afterwards.",
    },
  ],
} as const;

export type SectorDetail = {
  /** One sentence naming the work. Sits under the sector name as a standfirst. */
  lede: string;
  /**
   * The consultancy / services sentence for the sector — what we advise on,
   * taken from the client's sector document.
   */
  body: string;
  /**
   * The project types we set up in the sector. Length varies by sector, taken
   * from the client's sector document; rendered as a two-column list.
   */
  units: string[];
};

export const sectorDetails: Record<SectorSlug, SectorDetail> = {
  "food-processing": {
    lede: "We assist entrepreneurs in establishing food-processing units from concept to commercial production.",
    body: "Project costing, machinery selection, plant layout, DPR, licensing guidance, production costing and profitability analysis.",
    units: [
      "Spice processing",
      "Flour mill",
      "Rice processing",
      "Pulses and dal mill",
      "Bakery products",
      "Namkeen and snacks",
      "Biscuits",
      "Pickles",
      "Sauces and ketchup",
      "Jam and jelly",
      "Fruit processing",
      "Vegetable processing",
      "Dehydrated food",
      "Ready-to-eat food",
      "Frozen food",
      "Dairy-based food products",
    ],
  },

  dairy: {
    lede: "We provide consultancy for small, medium and large dairy projects.",
    body: "Capacity planning, machinery selection, cold-chain planning, packaging, costing, DPR and financial feasibility.",
    units: [
      "Milk chilling plant",
      "Milk processing plant",
      "Pasteurised milk",
      "Paneer",
      "Curd",
      "Lassi",
      "Flavoured milk",
      "Ghee",
      "Butter",
      "Cheese",
      "Milk powder",
    ],
  },

  beverage: {
    lede: "We set up packaged water and beverage plants from the water source to the finished pack.",
    body: "RO and UV systems, water treatment, filling and capping, PET blowing, labelling, shrink wrapping, coding, utilities, plant layout and production economics.",
    units: [
      "Packaged drinking water",
      "Mineral water",
      "RO water plant",
      "Soda water",
      "Juice",
      "Fruit beverages",
      "Energy drinks",
      "Flavoured drinks",
      "Carbonated beverages",
    ],
  },

  plastic: {
    lede: "We provide consultancy for plastic-product manufacturing projects.",
    body: "Injection-moulding machine selection, mould selection, cycle-time analysis, product costing, raw-material planning, automation and profitability analysis.",
    units: [
      "Plastic containers",
      "Chairs and tables",
      "Household products",
      "Industrial components",
      "Caps and closures",
      "Automotive plastic components",
      "Packaging products",
      "Agricultural plastic products",
      "Plastic pipes and fittings",
    ],
  },

  "pet-packaging": {
    lede: "We size PET projects on production per hour, electricity consumption, manufacturing cost, selling price and profit per kg or unit.",
    body: "Injection moulding machines, preform moulds, PET blowing machines, compressors, chillers, dryers and dehumidifiers, and auxiliary equipment.",
    units: [
      "PET preform manufacturing",
      "PET bottle manufacturing",
      "PET jar manufacturing",
      "Blow-moulding plants",
      "Plastic packaging",
      "Caps and closures",
    ],
  },

  packaging: {
    lede: "We assist businesses involved in flexible and rigid packaging.",
    body: "Machinery, raw materials, production capacity, costing, factory layout and market analysis.",
    units: [
      "Corrugated boxes",
      "Paper bags",
      "Plastic packaging",
      "Food containers",
      "Pouches",
      "Labels",
      "Cartons",
      "Disposable packaging",
      "Industrial packaging",
    ],
  },

  "paper-disposables": {
    lede: "We set up paper and eco-friendly disposable-product units.",
    body: "Machine selection, capacity planning, raw materials, costing, manpower and project economics.",
    units: [
      "Paper cup manufacturing",
      "Paper plate manufacturing",
      "Paper bags",
      "Tissue products",
      "Sal-leaf plates",
      "Areca-leaf products",
      "Disposable food containers",
      "Eco-friendly packaging",
    ],
  },

  "poultry-livestock": {
    lede: "We provide consultancy for poultry and livestock projects of every scale.",
    body: "Farm planning, equipment selection, project costing, DPR, finance and subsidy guidance and profitability analysis.",
    units: [
      "Broiler farms",
      "Layer farms",
      "Hatcheries",
      "Poultry feed plants",
      "Poultry processing",
      "Goat farming",
      "Sheep farming",
      "Dairy farming",
      "Integrated livestock projects",
    ],
  },

  "fishery-aquaculture": {
    lede: "We help set up fish farming and aquaculture projects end to end.",
    body: "Farm infrastructure, machinery, feed, processing, cold-chain and project economics.",
    units: [
      "Fish farming",
      "Biofloc",
      "Aquaculture",
      "Fish hatchery",
      "Fish feed manufacturing",
      "Fish processing",
      "Cold storage",
      "Ice plants",
    ],
  },

  agriculture: {
    lede: "We help convert agricultural raw materials into higher-value commercial products.",
    body: "Project feasibility, machinery selection, raw-material planning, costing and DPR.",
    units: [
      "Rice mills",
      "Dal mills",
      "Flour mills",
      "Maize processing",
      "Grain processing",
      "Oil extraction",
      "Seed processing",
      "Fruit and vegetable processing",
      "Dehydration plants",
      "Cold storage",
      "Agricultural machinery",
    ],
  },

  "cold-chain": {
    lede: "We provide consultancy for cold storage and cold-chain projects.",
    body: "Capacity calculation, refrigeration selection, building requirement, energy requirement, project cost, DPR and financial analysis.",
    units: [
      "Multi-commodity cold storage",
      "Potato cold storage",
      "Fruit and vegetable storage",
      "Dairy cold storage",
      "Frozen-food storage",
      "Ripening chambers",
      "Refrigerated warehouses",
    ],
  },

  "bakery-confectionery": {
    lede: "We set up bakery and confectionery units from recipe to packed product.",
    body: "Bakery machinery, ovens, mixers, packaging equipment, production planning, costing and plant layout.",
    units: [
      "Bread",
      "Biscuits",
      "Cakes",
      "Cookies",
      "Rusk",
      "Pastry",
      "Namkeen",
      "Confectionery",
    ],
  },

  "rice-grain-flour": {
    lede: "We set up rice, grain and flour milling units of every scale.",
    body: "Machinery capacity, automation, raw-material requirement, electricity consumption, manpower and profitability.",
    units: [
      "Rice mill",
      "Mini rice mill",
      "Flour mill",
      "Dal mill",
      "Maize processing",
      "Grain cleaning",
      "Grain grading",
      "Seed processing",
      "Pulverising",
    ],
  },

  "feed-manufacturing": {
    lede: "We provide complete feed-plant project consultancy.",
    body: "Hammer mill, pulveriser, mixer, pellet mill, extruder, dryer, cooler and packing machine — selection, sizing and layout.",
    units: [
      "Poultry feed",
      "Fish feed",
      "Cattle feed",
      "Goat and sheep feed",
      "Pet food",
    ],
  },

  "bio-cng": {
    lede: "We provide consultancy for Bio-CNG, biogas and waste-to-energy projects.",
    body: "Feedstock assessment, plant capacity, technology selection, machinery, project cost, revenue model and financial feasibility.",
    units: [
      "Bio-CNG",
      "Compressed biogas",
      "Biogas",
      "Organic-waste processing",
      "Biomass utilisation",
      "Waste-to-energy projects",
    ],
  },

  recycling: {
    lede: "We set up recycling and waste-processing units.",
    body: "Technology evaluation, machinery, input costs, output value and project profitability.",
    units: [
      "Plastic recycling",
      "PET recycling",
      "Plastic dana and granules",
      "Waste processing",
      "Organic waste",
      "E-waste-related processing",
      "Industrial waste management",
      "Composting",
    ],
  },

  engineering: {
    lede: "We set up fabrication and machining shops built around a defined product or customer.",
    body: "Machine selection, fabrication-shop planning, production costing, manpower and capacity planning.",
    units: [
      "Industrial fabrication",
      "Structural fabrication",
      "Sheet-metal products",
      "Industrial components",
      "Machinery manufacturing",
      "Agricultural machinery",
      "Food-processing machinery",
      "Material-handling equipment",
    ],
  },

  "electrical-equipment": {
    lede: "We set up units making electrical and industrial equipment.",
    body: "Project feasibility, machinery, production planning, costing and market assessment.",
    units: [
      "Electrical panels",
      "Control panels",
      "Industrial automation systems",
      "Cables and related products",
      "Electrical components",
      "Industrial equipment",
    ],
  },

  textile: {
    lede: "We help place a textile project at the right point in the chain, then equip it for that.",
    body: "Machinery selection, production capacity, manpower, costing, factory layout and project finance.",
    units: [
      "Garment manufacturing",
      "Uniform manufacturing",
      "Home textiles",
      "Textile processing",
      "Fabric-related products",
      "Technical textiles",
    ],
  },

  "construction-material": {
    lede: "We set up units making bricks, blocks and precast construction products.",
    body: "Machinery selection, production economics, raw-material planning and DPR consultancy.",
    units: [
      "Fly-ash bricks",
      "AAC blocks",
      "Concrete blocks",
      "Paver blocks",
      "Tiles",
      "Precast products",
      "Cement products",
      "Construction components",
    ],
  },

  "alcohol-beverage": {
    lede: "For projects where all required statutory permissions and licences have been obtained.",
    body: "Capacity planning, process equipment, plant layout, project costing, DPR, utilities and financial feasibility.",
    units: [
      "Beer manufacturing",
      "Distillery",
      "Winery",
      "IMFL-related projects",
      "Bottling",
      "Alcoholic beverage processing",
    ],
  },

  "green-manufacturing": {
    lede: "We support businesses looking at environmentally sustainable manufacturing opportunities.",
    body: "Project feasibility, technology selection, machinery, costing and financial feasibility for sustainable projects.",
    units: [
      "Eco-friendly packaging",
      "Biodegradable products",
      "Agricultural waste utilisation",
      "Biomass projects",
      "Recycling",
      "Waste-to-value",
      "Sustainable manufacturing",
      "Renewable-energy integration",
    ],
  },
};

export const serviceStrip = {
  eyebrow: "Services",
  heading: "What We Deliver Into These Sectors",
  body:
    "The six core engagements run across every sector we work in. What changes between them is the process route, the machinery market and the applicable norms — the part that has to be got right per sector rather than per template.",
  cta: { label: "View All Services", href: "/services" },
} as const;

export const sectorsEnquiry = {
  eyebrow: "Start Here",
  heading: "Your Sector Not Listed?",
  paragraphs: [
    "The sectors above are where the bulk of our work sits, not the limit of it. Manufacturing projects share a structure — demand, route, capacity, site, machinery, finance — and the sector-specific part is the applicable norms and the supplier base, both of which are researched per project anyway.",
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
export const sectorsFaq = {
  eyebrow: "Questions",
  heading: "About Sector Work",
  items: [
    {
      question: "Do you cover sectors that aren't on this list?",
      answer:
        "Usually. The list follows the sectors we have project history in, not a boundary. Manufacturing projects share a structure — demand, process route, capacity, site, machinery, finance — and the sector-specific part is the applicable norms and the supplier base, both researched per project. What we will not do is take on a sector where the regulatory regime is specialised and we have no prior work; we will tell you that at the discovery call rather than after the engagement letter.",
    },
    {
      question: "Can you help an existing unit rather than a new project?",
      answer:
        "Yes. A large share of our work is with running MSMEs — capacity expansion, a new product line, a machinery upgrade, cost reduction, or bringing automation into a plant that was commissioned years ago. The starting point is measuring the line as it runs before proposing anything.",
    },
    {
      question: "Do you handle the DPR, finance and subsidy, or only machinery?",
      answer:
        "The full sequence: feasibility, the detailed project report to appraisal standard, the subsidy mapping, the term loan through to sanction, then machinery selection, procurement and commissioning. The services page sets out each engagement; a sector project usually draws on several of them.",
    },
    {
      question: "Which sectors do you have the most project experience in?",
      answer:
        "Food processing, agro-processing and packaging are where our project history is deepest, followed by plastics, dairy and cold chain. Where a sector is newer for us we say so at the discovery call, and the sector-specific research — norms, process routes, supplier base — is done per project regardless.",
    },
    {
      question: "Can one project serve more than one sector?",
      answer:
        "Often, and designing for it is cheap at the start and expensive later — a packaging line that can also run food-contact formats, or a food plant with a second-crop product to cover the off-season. It has to be specified into the tooling and the layout up front; retrofitting it is usually a new machine.",
    },
  ] satisfies Faq[],
} as const;
