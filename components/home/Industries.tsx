import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { industries } from "@/content/home";

/**
 * Sectors as a plain tile index.
 *
 * The previous version ran a full-bleed outlined ticker above the list. It was
 * decorative, unfocusable, unreachable on touch, and it was the single loudest
 * thing on the page — the first element to go when the site moved corporate.
 */
export function Industries() {
  return (
    <section className="bg-canvas">
      <div className="shell py-20 lg:py-28">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div>
            <Reveal>
              <p className="label flex items-center gap-3 text-blue">
                <span aria-hidden="true" className="h-px w-6 bg-current" />
                Industries
              </p>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="display-lg mt-4">Industries We Serve</h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="measure mt-5 text-slate">
                Expert consultancy across {industries.length} manufacturing sectors, with
                specialised technical and regulatory knowledge for each.
              </p>
            </Reveal>
          </div>

          <Reveal delay={160} className="shrink-0">
            <Button href="/industries" variant="secondary">
              View All Industries
            </Button>
          </Reveal>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {industries.map((industry, index) => (
            <li key={industry} className="flex">
              <Reveal delay={(index % 4) * 50} className="flex w-full">
                <Link
                  href="/industries"
                  className="card card-interactive group flex w-full items-center justify-between gap-3 px-5 py-4"
                >
                  <span className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue"
                    />
                    <span className="font-display text-[0.9375rem] font-semibold text-navy sm:text-base">
                      {industry}
                    </span>
                  </span>

                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="h-3.5 w-3.5 shrink-0 text-slate-muted transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-0.5 group-hover:text-blue"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 3l5 5-5 5" />
                  </svg>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
