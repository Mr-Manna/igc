import Image from "next/image";

/**
 * A photograph in its natural colours, inside a rounded, clipped frame.
 *
 * Replaces the previous `DuotoneImage`, which pushed every photo through a
 * graphite→orange colour blend. The tint read as art direction on an editorial
 * site; on a professional-services site it reads as a filter, and it made
 * plant and meeting-room photography impossible to assess at a glance.
 *
 * The parent must define the box; this fills it.
 */
export function Media({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-card border border-[var(--rule-on-light)] bg-surface ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
