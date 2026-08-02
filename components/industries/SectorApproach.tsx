import { Reveal } from "@/components/ui/Reveal";
import { sectorApproach } from "@/content/industries";

/**
 * The argument for the page, placed before the sector list rather than after it.
 *
 * A reader who arrives from a sector query scrolls to their sector and leaves;
 * this section is for the other reader, the one deciding whether sector
 * knowledge is worth paying for at all. Four numbered points, because the claim
 * is specifically that there are four distinct things the sector changes — a
 * prose paragraph would let them blur into one.
 *
 * `<h2>` here and on every sector block below: the page `<h1>` in the masthead
 * names the set, and nothing on this page is subordinate to anything else on it.
 */
export function SectorApproach() {
  return (
    <section className="border-b rule-light bg-surface">
      <div className="shell grid gap-12 py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="label flex items-center gap-3 text-blue">
              <span aria-hidden="true" className="h-px w-6 bg-current" />
              {sectorApproach.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={70}>
            <h2 className="display-lg mt-4">{sectorApproach.heading}</h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-5 text-slate">{sectorApproach.body}</p>
          </Reveal>
        </div>

        <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:col-span-8">
          {sectorApproach.points.map((point, index) => (
            <Reveal as="li" key={point.title} delay={160 + index * 60}>
              <span className="label text-slate-muted tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="display-md mt-3">{point.title}</h3>
              <p className="mt-3 text-[0.9375rem] text-slate">{point.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
