import { contactBand } from "@/content/harbour";
import { telHref } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "./ui/ArrowLink";
import { Plate } from "./ui/Plate";

/**
 * The closing band: a dark plate with the action on the left and the statement
 * on the right.
 *
 * The photograph sits behind at 20% over `harbour-dark`. Worst case — a fully
 * white source pixel — lifts the ground to roughly #494946, where paper text is
 * still about 8:1, so the measured contrast holds across the whole plate rather
 * than only where the image happens to be dark.
 *
 * The band clips with `overflow-clip` rather than `overflow-hidden`, so it does
 * not become a scroll container and capture the background plate's view timeline.
 * See `harbour-drift` in globals.css.
 */
export function ContactBand() {
  return (
    <section className="shell pb-24 lg:pb-32">
      <div className="harbour-invert relative overflow-clip bg-harbour-dark">
        {/* The plate is wrapped rather than positioned directly. `Plate` sets
            `relative` on its own root, so passing `absolute` in through
            `className` puts two position utilities on one element and the winner
            depends on Tailwind's output order — it resolved to `relative`, the
            box collapsed to zero height, and the image vanished. Positioning the
            wrapper instead leaves `Plate` to do the one job it owns.

            Also note: no negative z-index. Inside a stacking context a child at
            `-z-10` paints behind the parent's own background and disappears just
            as completely. The image sits at the default level, above the dark
            ground because it comes first in the flow, and the content opts above
            it with `relative`. */}
        <div className="absolute inset-0 opacity-20">
          <Plate
            src="https://images.pexels.com/photos/1145434/pexels-photo-1145434.jpeg?auto=compress&cs=tinysrgb&w=2000"
            alt=""
            sizes="100vw"
            parallax
            className="h-full w-full"
          />
        </div>

        <div className="relative grid gap-10 px-6 py-16 sm:px-10 lg:grid-cols-12 lg:items-center lg:px-14 lg:py-24">
          <Reveal className="lg:col-span-4">
            <ArrowLink href={contactBand.cta.href} tone="dark">
              {contactBand.cta.label}
            </ArrowLink>
            <a
              href={telHref}
              className="mt-6 block text-[1.0625rem] font-medium text-harbour-paper transition-colors duration-200 hover:text-harbour-sage"
            >
              {contactBand.phoneLabel}
            </a>
          </Reveal>

          <Reveal
            as="p"
            delay={100}
            className="text-[1.0625rem] leading-[1.65] text-harbour-paper lg:col-span-7 lg:col-start-6"
          >
            {contactBand.body}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
