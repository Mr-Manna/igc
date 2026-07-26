import { hero } from "@/content/harbour";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "./ui/ArrowLink";
import { Plate } from "./ui/Plate";
import { SagePill } from "./ui/SagePill";

/**
 * The recessed hero.
 *
 * The headline is set in `harbour-tint` rather than ink, so the type sits back
 * and the photograph is what the eye lands on — the inversion of the usual
 * marketing hero, and the reference site's defining move. `tint` is 3.1:1 on
 * paper, which is why this treatment is confined to type at 40px and up; see the
 * contrast note in `globals.css`.
 *
 * Line breaks in the headline are authored in `content/harbour.ts`, not left to
 * the browser: the silhouette of the block is the composition.
 *
 * The section clips with `overflow-clip` rather than `overflow-hidden`: `hidden`
 * would make it a scroll container and capture the plate's view timeline,
 * freezing the parallax. Same pixels clipped either way — see `harbour-drift` in
 * globals.css.
 */
export function Hero() {
  return (
    <section className="relative overflow-clip pt-14 lg:pt-20">
      <div className="shell">
        <Reveal as="p" className="harbour-micro text-harbour-moss">
          {hero.eyebrow}
        </Reveal>

        <h1 className="harbour-display mt-8 text-harbour-tint lg:mt-12">
          {hero.headline.map((line, index) => (
            <Reveal as="span" key={line} delay={80 + index * 90} className="block">
              {line}
            </Reveal>
          ))}
        </h1>

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-5" delay={360}>
            <p className="max-w-[34rem] text-[1.0625rem] leading-[1.6] text-harbour-ink">
              {hero.body}
            </p>
          </Reveal>

          <Reveal
            className="flex flex-wrap items-center gap-x-8 gap-y-5 lg:col-span-6 lg:col-start-7 lg:justify-end"
            delay={430}
          >
            <SagePill href={hero.primaryCta.href}>{hero.primaryCta.label}</SagePill>
            <ArrowLink href={hero.secondaryCta.href}>{hero.secondaryCta.label}</ArrowLink>
          </Reveal>
        </div>
      </div>

      {/* Full-bleed, and deliberately outside `shell` — the plate runs to both
          edges and off the bottom of the fold. At 21/8 it is the largest box on
          the page, which is why it carries the parallax: the drift is 5% of the
          plate's own height, so this is the one place the depth actually reads. */}
      <Plate
        src={hero.image.src}
        alt={hero.image.alt}
        sizes="100vw"
        priority
        parallax
        className="mt-12 aspect-[4/3] w-full sm:aspect-[16/9] lg:mt-16 lg:aspect-[21/8]"
      />
    </section>
  );
}
