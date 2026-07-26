/**
 * Line icons for the services grid.
 *
 * Icon-led cards rather than photographic ones: the six services share only two
 * stock photographs between them, so a picture header would have shown the same
 * plant three times over. A consistent 24px stroke set reads as a system.
 */

export type ServiceIconName =
  | "factory"
  | "subsidy"
  | "finance"
  | "efficiency"
  | "machinery"
  | "polymer";

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
