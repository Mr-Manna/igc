import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { Reveal } from "@/components/ui/Reveal";
import { sectors } from "@/content/home";

/**
 * Sectors as photographic tiles on a rail.
 *
 * The flat two-word tile grid this replaces was honest but inert — a wall of
 * identical boxes gave a reader no reason to believe ICF had actually been
 * inside a textile mill or a dairy plant. A picture per sector is the cheapest
 * available evidence.
 *
 * Every tile links to the sector's block on /sectors rather than to a
 * per-sector page: those routes do not exist, and the index carries the detail
 * they would hold, anchored by the same slug.
 */
export function Sectors() {
  return (
    <section className="border-y rule-light bg-surface">
      <div className="shell py-20 lg:py-28">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div>
            <Reveal>
              <p className="label flex items-center gap-3 text-blue">
                <span aria-hidden="true" className="h-px w-6 bg-current" />
                Sectors
              </p>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="display-lg mt-4">Sectors We Serve</h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="measure mt-5 text-slate">
                Expert consultancy across {sectors.length} manufacturing sectors, with
                specialised technical and regulatory knowledge for each.
              </p>
            </Reveal>
          </div>

          <Reveal delay={160} className="shrink-0">
            <Button href="/sectors" variant="secondary">
              View All Sectors
            </Button>
          </Reveal>
        </div>

        <Carousel ariaLabel="Sectors we serve" className="mt-12">
          {sectors.map((sector) => (
            <div
              key={sector.slug}
              className="min-w-0 shrink-0 grow-0 basis-[78%] pr-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <Link
                href={`/sectors#${sector.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-card border border-[var(--rule-on-light)] sm:aspect-[4/3]"
              >
                <Image
                  src={sector.image.src}
                  alt={sector.image.alt}
                  fill
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105"
                />
                {/* Bottom-weighted so the label sits on the darkest part of the
                    plate while the top of the photograph stays readable. */}
                <span aria-hidden="true" className="tile-scrim absolute inset-0" />

                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-5">
                  <span className="font-display text-[1.0625rem] font-semibold text-white">
                    {sector.name}
                  </span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="h-4 w-4 shrink-0 text-white transition-transform duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 8h11M9 4l4 4-4 4" />
                  </svg>
                </span>
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
