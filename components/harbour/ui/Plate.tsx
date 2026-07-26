import Image from "next/image";

/**
 * Image wrapper for Harbour.
 *
 * `components/ui/Media` cannot be reused here: it hardcodes `rounded-card`, a
 * navy-tinted hairline and a `bg-surface` placeholder, none of which belong in a
 * layout with no radii and no navy. What it does get right is that the parent
 * owns the box — the aspect ratio comes in through `className`, and this
 * component only fills it.
 *
 * The monochrome treatment is a CSS filter rather than a pre-processed asset, so
 * the Pexels sources already allowed in `next.config.ts` are reused unchanged.
 *
 * `parallax` opts the image into scroll-driven drift. It belongs here rather than
 * at the call site because the effect needs the image over-scanned past the box
 * it is translating inside, and the image is the part callers do not own — they
 * only pass the box in through `className`. The root's clip is what hides the
 * overscan, so the two go together.
 *
 * That clip is `overflow-clip`, not `overflow-hidden`, and the difference is not
 * cosmetic: `hidden` makes this box a scroll container, which captures the
 * image's `view()` timeline and freezes the drift. See `harbour-drift` in
 * globals.css for the full reasoning before changing it.
 */
export function Plate({
  src,
  alt,
  sizes,
  priority = false,
  parallax = false,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  parallax?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative overflow-clip bg-harbour-paper-2 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`harbour-plate object-cover${parallax ? " harbour-drift" : ""}`}
      />
    </div>
  );
}
