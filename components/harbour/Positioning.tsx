import { positioning } from "@/content/harbour";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "./ui/ArrowLink";
import { Plate } from "./ui/Plate";
import { TwoWeightHeading } from "./ui/TwoWeightHeading";

/**
 * The positioning statement, paired with the masked plate.
 *
 * The reference clips a photograph into its own logo glyph. Reproducing that
 * literally would mean an SVG letterform clip path tied to one specific mark and
 * one specific aspect ratio; `harbour-aperture` gets the same structural read —
 * a photograph in a shape rather than in a rectangle — from an elliptical
 * border-radius that scales with whatever box it is given.
 */
export function Positioning() {
  return (
    <section className="shell py-24 lg:py-36">
      {/* The copy comes first in the DOM and the plate is placed back into
          column 1 explicitly. Source order and visual order agree on desktop
          either way, but stacked at small sizes the figure's "About us" link
          would otherwise be read out before the heading it belongs to. */}
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:pt-10">
          <Reveal as="p" className="harbour-micro text-harbour-moss">
            {positioning.eyebrow}
          </Reveal>

          <Reveal delay={80}>
            <TwoWeightHeading heading={positioning.heading} className="mt-6 max-w-[26ch]" />
          </Reveal>

          <Reveal as="p" delay={160} className="mt-8 max-w-[38rem] text-[1.0625rem] leading-[1.7]">
            {positioning.body}
          </Reveal>
        </div>

        <Reveal className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
          <figure className="flex flex-col">
            <Plate
              src={positioning.image.src}
              alt={positioning.image.alt}
              sizes="(max-width: 1024px) 100vw, 40vw"
              parallax
              className="harbour-aperture aspect-[3/4] w-full"
            />
            <figcaption className="mt-6 flex justify-end">
              <ArrowLink href={positioning.cta.href}>{positioning.cta.label}</ArrowLink>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
