/**
 * Line icons for the services grid and the "why choose us" row.
 *
 * Icon-led cards rather than photographic ones: the six services share only two
 * stock photographs between them, so a picture header would have shown the same
 * plant three times over. A consistent 24px stroke set reads as a system.
 *
 * Hand-authored rather than pulled from an icon package — the project carries no
 * icon dependency and every glyph on the site is drawn here or inline.
 */

export type ServiceIconName =
  | "factory"
  | "subsidy"
  | "finance"
  | "efficiency"
  | "machinery"
  | "polymer"
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
  efficiency: (
    <>
      <path d="M3 19V5" />
      <path d="M3 19h18" />
      <path d="m6.5 15.5 4-4.5 3.5 3 5-6" />
      <path d="M15.5 8h3.5v3.5" />
    </>
  ),
  machinery: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3v2.6M12 18.4V21M3 12h2.6M18.4 12H21" />
      <path d="m5.6 5.6 1.9 1.9M16.5 16.5l1.9 1.9M18.4 5.6l-1.9 1.9M7.5 16.5l-1.9 1.9" />
    </>
  ),
  polymer: (
    <>
      <path d="M9.5 3v6.2L5 17.9A2 2 0 0 0 6.8 21h10.4a2 2 0 0 0 1.8-3.1L14.5 9.2V3" />
      <path d="M8 3h8" />
      <path d="M7 15.5h10" />
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
