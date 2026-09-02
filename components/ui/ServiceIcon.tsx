/**
 * Line icons for the services grid and the "why choose us" row.
 *
 * Icon-led cards rather than photographic ones: the services share only a couple
 * of stock photographs between them, so a picture header would have shown the
 * same plant several times over. A consistent 24px stroke set reads as a system.
 *
 * Hand-authored rather than pulled from an icon package — the project carries no
 * icon dependency and every glyph on the site is drawn here or inline.
 */

export type ServiceIconName =
  // Services — one per entry in `content/home.ts` `services[]`.
  | "factory"
  | "blueprint"
  | "research"
  | "report"
  | "subsidy"
  | "finance"
  | "workingCapital"
  | "costing"
  | "machinery"
  | "siteSetup"
  | "layout"
  | "supplier"
  | "compliance"
  | "efficiency"
  | "expansion"
  | "recovery"
  | "roadmap"
  | "automation"
  | "ai"
  | "marketing"
  // Value propositions.
  | "expertise"
  | "endToEnd"
  | "turnaround"
  | "network"
  | "value";

const paths: Record<ServiceIconName, React.ReactNode> = {
  factory: (
    <>
      <path d="M2 21h20" />
      <path d="M4 21V10l5 3.2V10l5 3.2V10l5 3.2V21" />
      <path d="M9.5 21v-3.6h4V21" />
    </>
  ),
  /* A spec sheet with a gear — turning a plan into an operating business. */
  blueprint: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4" />
      <circle cx="11.5" cy="14" r="2.1" />
      <path d="M11.5 10.2v1.4M11.5 16.4v1.4M7.9 14h1.4M13.7 14h1.4" />
    </>
  ),
  /* A magnifier over a small bar chart — sizing a market. */
  research: (
    <>
      <circle cx="10" cy="10" r="6" />
      <path d="m14.5 14.5 5 5" />
      <path d="M8 11.5V9.5M10 11.5v-4M12 11.5v-2" />
    </>
  ),
  /* A bound report with a chart on the cover. */
  report: (
    <>
      <path d="M6 3h9l3 3v15H6z" />
      <path d="M6 3v18" />
      <path d="M9.5 16v-4M12 16v-6M14.5 16v-2" />
    </>
  ),
  subsidy: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      <path d="m8.4 13.6-1.4 7.6L12 18.6l5 2.6-1.4-7.6" />
      <path d="m10.3 9 1.2 1.3L13.8 7.7" />
    </>
  ),
  finance: (
    <>
      <path d="M3 10 12 4l9 6z" />
      <path d="M5.5 10.5v7.5M10 10.5v7.5M14 10.5v7.5M18.5 10.5v7.5" />
      <path d="M3 21h18" />
    </>
  ),
  /* The working-capital cycle — a loop turning around a coin. */
  workingCapital: (
    <>
      <path d="M12 4.5a7.5 7.5 0 0 1 7.2 5.4" />
      <path d="M12 19.5a7.5 7.5 0 0 1-7.2-5.4" />
      <path d="M19.5 4.5v4h-4" />
      <path d="M4.5 19.5v-4h4" />
      <circle cx="12" cy="12" r="2.4" />
    </>
  ),
  /* A calculator — building the cost per unit. */
  costing: (
    <>
      <rect x="6" y="3" width="12" height="18" rx="1.5" />
      <path d="M9 7h6" />
      <path d="M9.2 11h1.4M13.4 11h1.4M9.2 14h1.4M13.4 14h1.4M9.2 17h1.4M13.4 17h1.4" />
    </>
  ),
  machinery: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3v2.6M12 18.4V21M3 12h2.6M18.4 12H21" />
      <path d="m5.6 5.6 1.9 1.9M16.5 16.5l1.9 1.9M18.4 5.6l-1.9 1.9M7.5 16.5l-1.9 1.9" />
    </>
  ),
  /* A shed rising on a site — the physical build. */
  siteSetup: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V10l7-4 7 4v11" />
      <path d="M9 21v-6h6v6" />
      <path d="M12 3v3" />
      <path d="M10.5 4.5h3" />
    </>
  ),
  /* A partitioned floor plan. */
  layout: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1" />
      <path d="M3 12h10M13 4v16M13 12h8" />
    </>
  ),
  /* A delivery truck — vendors and supply. */
  supplier: (
    <>
      <path d="M3 7h11v8H3z" />
      <path d="M14 10h4l3 3v2h-7z" />
      <circle cx="7" cy="17" r="1.6" />
      <circle cx="17" cy="17" r="1.6" />
    </>
  ),
  /* A shield with a check — licences and approvals. */
  compliance: (
    <>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  efficiency: (
    <>
      <path d="M3 19V5" />
      <path d="M3 19h18" />
      <path d="m6.5 15.5 4-4.5 3.5 3 5-6" />
      <path d="M15.5 8h3.5v3.5" />
    </>
  ),
  /* Corner brackets pushing outward — capacity expansion. */
  expansion: (
    <>
      <path d="M10 10H5V5" />
      <path d="M14 10h5V5" />
      <path d="M10 14H5v5" />
      <path d="M14 14h5v5" />
      <path d="m5 5 4 4M19 5l-4 4M5 19l4-4M19 19l-4-4" />
    </>
  ),
  /* A health-check pulse line — turnaround. */
  recovery: (
    <>
      <path d="M3 12h4l2-5 3 10 2-6 2 3h5" />
    </>
  ),
  /* A winding path with milestones — implementation management. */
  roadmap: (
    <>
      <path d="M7 20c0-4 10-4 10-8s-10-4-10-8" />
      <circle cx="7" cy="4" r="1.6" />
      <circle cx="17" cy="12" r="1.6" />
      <circle cx="7" cy="20" r="1.6" />
    </>
  ),
  /* A robotic arm on a base. */
  automation: (
    <>
      <path d="M4 21h16" />
      <path d="M6 21v-4h4v4" />
      <path d="M8 17V9" />
      <circle cx="8" cy="7" r="2" />
      <path d="m9.6 6 5.2-1.7" />
      <path d="M14.5 3.6 18 5.6l-1.2 3.6-3.5-2z" />
    </>
  ),
  /* A processor die with pins — AI. */
  ai: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <circle cx="12" cy="12" r="2" />
      <path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />
    </>
  ),
  /* A megaphone with a signal — lead generation. */
  marketing: (
    <>
      <path d="M4 10v4h4l7 5V5l-7 5z" />
      <path d="M18 9a4 4 0 0 1 0 6" />
    </>
  ),

  /* Two figures — the consultant and the client, not a generic person. */
  expertise: (
    <>
      <circle cx="9" cy="7.5" r="3" />
      <path d="M3.5 20v-1.5A4.5 4.5 0 0 1 8 14h2a4.5 4.5 0 0 1 4.5 4.5V20" />
      <path d="M16 5.2a3 3 0 0 1 0 5.6" />
      <path d="M17.5 14.2A4.5 4.5 0 0 1 20.5 18.5V20" />
    </>
  ),
  /* A run from first mark to final mark, with the stages between. */
  endToEnd: (
    <>
      <circle cx="4.5" cy="12" r="2" />
      <circle cx="19.5" cy="12" r="2" />
      <path d="M6.5 12h11" />
      <path d="M10 9.5v5M14 9.5v5" />
    </>
  ),
  /* Elapsed time, not a stopwatch — the hand is short of the hour. */
  turnaround: (
    <>
      <circle cx="12" cy="12.5" r="8" />
      <path d="M12 8v4.5l3 2" />
      <path d="M9.5 3h5" />
    </>
  ),
  /* Nodes joined to a hub: the banking relationships. */
  network: (
    <>
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="5" cy="5.5" r="2" />
      <circle cx="19" cy="5.5" r="2" />
      <circle cx="12" cy="20" r="2" />
      <path d="m6.5 7 3.8 3.4M17.5 7l-3.8 3.4M12 14.5v3.5" />
    </>
  ),
  /* A priced tag. The dot is the eyelet. */
  value: (
    <>
      <path d="M3.5 11.2V4.5a1 1 0 0 1 1-1h6.7a1 1 0 0 1 .7.3l8 8a1 1 0 0 1 0 1.4l-6.7 6.7a1 1 0 0 1-1.4 0l-8-8a1 1 0 0 1-.3-.7Z" />
      <circle cx="7.5" cy="7.5" r="1.2" />
    </>
  ),
};

export function ServiceIcon({ name }: { name: ServiceIconName }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
