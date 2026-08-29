/**
 * Global site configuration: identity, navigation and contact details.
 *
 * TODO(real-data): every value in `contact` and `social` below is carried over
 * verbatim from the previous site, where it was placeholder content. The phone
 * numbers, street address and email addresses are NOT real. Replace this block
 * before pointing a public domain at this build.
 */

export const site = {
  name: "ICF",
  legalName: "Industrial Consultancy Firm",
  fullName: "Industrial Consultancy Firm (ICF)",
  url: "https://icfindia.com",
  founded: "2009",
  description:
    "Expert industrial consultancy for manufacturing industries, MSMEs, startups, and entrepreneurs. We help you establish profitable factories through complete project solutions.",
  tagline: "Expert Manufacturing Project Consultancy in India",
} as const;

/** TODO(real-data): placeholder — not real contact information. */
export const contact = {
  phonePrimary: "+91 98765 43210",
  phoneSecondary: "+91 22 2345 6789",
  /** Digits only, for tel: and wa.me links. */
  phoneDigits: "919876543210",
  emailPrimary: "info@icfindia.com",
  emailSupport: "support@icfindia.com",
  addressLine1: "101, Industrial Complex, MG Road",
  addressLine2: "Mumbai, Maharashtra 400001",
  addressLocality: "Mumbai",
  addressRegion: "Maharashtra",
  postalCode: "400001",
  countryCode: "IN",
  hours: [
    { days: "Mon – Sat", time: "9:00 AM – 7:00 PM" },
    { days: "Sunday", time: "Closed" },
  ],
  whatsappMessage:
    "Hello ICF, I need consultation for my industrial project.",
} as const;

export const whatsappHref = `https://wa.me/${contact.phoneDigits}?text=${encodeURIComponent(
  contact.whatsappMessage,
)}`;

export const telHref = `tel:+${contact.phoneDigits}`;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Project Reports", href: "/project-reports" },
  // { label: "Machinery", href: "/machinery" },
  // { label: "Success Stories", href: "/success-stories" },
  { label: "Blog", href: "/blog" },
];

export const footerQuickLinks: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Project Reports", href: "/project-reports" },
  // { label: "Machinery", href: "/machinery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

export const footerServiceLinks: NavItem[] = [
  { label: "Project Consultancy", href: "/services/industrial-project-consultancy" },
  { label: "Subsidy Consultancy", href: "/services/government-subsidy-consultancy" },
  { label: "Loan Consultancy", href: "/services/loan-consultancy" },
  { label: "Industrial Engineering", href: "/services/industrial-engineering" },
  { label: "Machinery Consultancy", href: "/services/machinery-consultancy" },
  { label: "Business Consultancy", href: "/services/business-consultancy" },
];

export const legalLinks: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Refund Policy", href: "/refund" },
];

/** All routes referenced anywhere in the shell. */
export const allRoutes: string[] = [
  ...primaryNav.map((n) => n.href),
  ...footerQuickLinks.map((n) => n.href),
  ...footerServiceLinks.map((n) => n.href),
  ...legalLinks.map((n) => n.href),
].filter((href, i, all) => all.indexOf(href) === i);

/**
 * Routes that have a real page behind them.
 *
 * This is the single switch that ships a route: it keeps the path out of the
 * `[...slug]` stub catch-all — two prerenders of the same path would otherwise
 * collide at build time — and puts it into the sitemap, which the stubs are
 * deliberately absent from because they are `noindex`.
 *
 * Add a route here the moment its page lands, and not before.
 */
export const builtRoutes: string[] = ["/", "/about", "/services", "/industries"];

/** Everything the shell links to that is still a placeholder. */
export const stubRoutes: string[] = allRoutes.filter(
  (route) => !builtRoutes.includes(route),
);
