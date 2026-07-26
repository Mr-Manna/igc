import type { ElementType } from "react";
import type { TwoWeight } from "@/content/harbour";

/**
 * The signature section heading: two lines at the same size, the first bold and
 * the second light.
 *
 * The size comes from `harbour-head`, which is set at weight 400 — so the light
 * half is the default and the bold half is the one that opts in. Both halves are
 * `block` spans rather than a wrapped sentence, because the break between them
 * is a compositional decision and must not move with the viewport.
 *
 * The explicit `text-harbour-*` colour is load-bearing: the base layer in
 * `globals.css` colours every h1/h2/h3 navy, and inheritance from `.theme-harbour`
 * loses to a direct element rule. The two existing design spikes carry the same
 * note.
 */
export function TwoWeightHeading({
  heading,
  as: Tag = "h2",
  tone = "paper",
  id,
  className = "",
}: {
  heading: TwoWeight;
  as?: ElementType;
  tone?: "paper" | "dark";
  /** For sections that label themselves with `aria-labelledby`. */
  id?: string;
  className?: string;
}) {
  const ink = tone === "dark" ? "text-harbour-paper" : "text-harbour-ink";
  const light = tone === "dark" ? "text-harbour-paper/70" : "text-harbour-mute";

  return (
    <Tag id={id} className={`harbour-head ${ink} ${className}`}>
      <span className="block font-bold">{heading.bold}</span>
      <span className={`block font-normal ${light}`}>{heading.light}</span>
    </Tag>
  );
}
