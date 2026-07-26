import Link from "next/link";

/**
 * The one boxed control on the page.
 *
 * Text is `harbour-ink` on the sage fill, never the reverse — sage is 1.3:1 on
 * paper and cannot carry type there, but ink on sage is 12.9:1. See the contrast
 * note in `globals.css`. Square corners: this layout has no radii.
 */
export function SagePill({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`harbour-micro inline-flex items-center bg-harbour-sage px-6 py-4 text-harbour-ink transition-colors duration-200 hover:bg-harbour-ink hover:text-harbour-paper ${className}`}
    >
      {children}
    </Link>
  );
}
