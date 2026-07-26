import type { ServiceIconName } from "@/components/ui/ServiceIcon";

/**
 * Homepage copy, carried over verbatim from the previous site.
 *
 * TODO(real-data): `testimonials` attribute specific claims to named individuals
 * and companies. These were placeholder content on the previous build and are not
 * verified. Replace or remove before publishing to a public domain.
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
export type Service = {
  title: string;
  description: string;
  href: string;
  icon: ServiceIconName;
};

export const services: Service[] = [
  {
    title: "Industrial Project Consultancy",
    description: "Complete end-to-end consultancy for setting up manufacturing units",
    href: "/services/industrial-project-consultancy",
    icon: "factory",
  },
  {
    title: "Government Subsidy Consultancy",
    description: "Expert guidance on all government subsidies and incentives",
    href: "/services/government-subsidy-consultancy",
    icon: "subsidy",
  },
  {
    title: "Loan Consultancy",
    description: "Seamless project finance and loan assistance",
    href: "/services/loan-consultancy",
    icon: "finance",
  },
  {
    title: "Industrial Engineering",
    description: "Optimize your manufacturing processes for maximum efficiency",
    href: "/services/industrial-engineering",
    icon: "efficiency",
  },
  {
    title: "Machinery Consultancy",
    description: "Expert guidance on machinery selection and procurement",
    href: "/services/machinery-consultancy",
    icon: "machinery",
  },
  {
    title: "Plastic Industry Consultancy",
    description: "Specialized consultancy for plastic manufacturing units",
    href: "/services/plastic-industry-consultancy",
    icon: "polymer",
  },
];

export const whyChooseUs = {
  eyebrow: "Why Choose Us",
  heading: "Your Trusted Partner for Industrial Success",
  body:
    "With over 15 years of experience, we have helped 300+ entrepreneurs establish successful manufacturing units across India.",
  points: [
    {
      title: "Industry Experts",
      description: "15+ years of experience in manufacturing consultancy",
    },
    {
      title: "Complete Solution",
      description: "End-to-end support from concept to commissioning",
    },
    {
      title: "Quick Turnaround",
      description: "Fast DPR preparation and project execution",
    },
    {
      title: "Strong Network",
      description: "Connected with 50+ banks and financial institutions",
    },
  ],
  cta: { label: "Learn More About Us", href: "/about" },
  image: {
    src: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "IGC consultants in a project planning session",
  },
} as const;

export const industries: string[] = [
  "Plastic",
  "Food Processing",
  "Beverage",
  "Chemical",
  "Textile",
  "Pharmaceutical",
  "Agriculture",
  "Engineering",
  "Packaging",
  "Recycling",
  "Automobile",
  "Steel & Metal",
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "IGC helped us set up our mineral water plant from scratch. Their expert guidance on machinery selection and government subsidies saved us over ₹50 lakhs. The DPR they prepared was approved by the bank within 15 days.",
    name: "Rajesh Kumar",
    role: "Managing Director, AquaPure Industries Pvt Ltd",
  },
  {
    quote:
      "The team at IGC has exceptional knowledge of the plastic industry. They helped us get CGTMSE loan for our injection moulding unit and guided us through the entire process. Highly professional and reliable.",
    name: "Priya Sharma",
    role: "CEO, PlastTech Solutions",
  },
  {
    quote:
      "Starting a microbrewery seemed daunting until we connected with IGC. Their technical expertise and regulatory guidance made our dream project a reality. The plant is now running successfully for 3 years.",
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
