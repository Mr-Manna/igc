"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { Carousel } from "@/components/ui/Carousel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/content/home";

const ALL = "All Projects";

/**
 * Completed projects, filtered by sector.
 *
 * The investment figure is the whole point of this section. "We set up a cold
 * storage unit" is a claim anyone can make; "₹2 Cr" says the project was
 * financed, which is the thing a visitor is actually trying to find out.
 *
 * Only sectors that have projects get a tab — a filter that can return nothing
 * is a filter that has to explain itself, and there is no reason to build that
 * empty state when the data can simply not offer the option.
 */
export function ProjectsShowcase() {
  const sectors = useMemo(
    () => [ALL, ...Array.from(new Set(projects.map((project) => project.sector)))],
    [],
  );
  const [active, setActive] = useState(ALL);

  const visible = useMemo(
    () => (active === ALL ? projects : projects.filter((p) => p.sector === active)),
    [active],
  );

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /**
   * A tablist is a single tab stop with arrow-key navigation inside it — one
   * tab per sector would otherwise be a row of tabs to get past on the way to
   * the carousel. Home/End included because with that many options they earn
   * their keep.
   */
  function onKeyDown(event: React.KeyboardEvent, index: number) {
    const last = sectors.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;

    if (next === null) return;
    event.preventDefault();
    setActive(sectors[next]);
    tabRefs.current[next]?.focus();
  }

  return (
    <section className="bg-canvas">
      <div className="shell py-20 lg:py-28">
        <SectionHeading
          align="center"
          eyebrow="Our Work"
          heading="Key Projects Completed"
          body="Manufacturing units taken from feasibility study to commissioning, across every sector we serve."
        />

        <div
          role="tablist"
          aria-label="Filter projects by sector"
          className="mt-12 flex flex-wrap justify-center gap-2"
        >
          {sectors.map((sector, index) => {
            const selected = sector === active;
            return (
              <button
                key={sector}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`project-tab-${index}`}
                aria-selected={selected}
                aria-controls="project-panel"
                // Roving tabindex: only the active tab is in the tab order.
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(sector)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={`rounded-full border px-4 py-2 text-[0.875rem] font-medium transition-colors duration-250 ${
                  selected
                    ? "border-blue bg-blue text-white"
                    : "border-[var(--rule-on-light)] bg-canvas text-slate hover:border-blue hover:text-blue"
                }`}
              >
                {sector}
              </button>
            );
          })}
        </div>

        <div
          id="project-panel"
          role="tabpanel"
          aria-label={`${active} — ${visible.length} project${visible.length === 1 ? "" : "s"}`}
          tabIndex={-1}
        >
          <Carousel
            ariaLabel="Completed projects"
            reInitKey={active}
            className="mt-10"
            toolbar={
              <p aria-live="polite" className="text-[0.875rem] text-slate-muted">
                {visible.length} project{visible.length === 1 ? "" : "s"}
              </p>
            }
          >
            {visible.map((project) => (
              <div
                key={project.title}
                className="min-w-0 shrink-0 grow-0 basis-[85%] pr-5 sm:basis-1/2 lg:basis-1/3"
              >
                <article className="card flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      fill
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <span className="absolute top-4 left-4 rounded-full bg-navy/85 px-3 py-1.5 text-[0.75rem] font-semibold text-white backdrop-blur-sm">
                      {project.sector}
                    </span>
                    {/* TODO(real-data): drop this the moment real project
                        photography lands. Until then the picture is library
                        stock, and a stock photo sitting beside a specific
                        rupee figure reads as a photograph of that project. */}
                    <span className="absolute right-4 bottom-4 rounded bg-navy/70 px-2 py-1 text-[0.6875rem] font-medium tracking-wide text-white/90 uppercase backdrop-blur-sm">
                      Illustrative
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-[1.0625rem] leading-snug font-semibold text-navy">
                      {project.title}
                    </h3>

                    <div className="mt-auto flex items-baseline justify-between gap-3 border-t rule-light pt-5">
                      <span className="label text-slate-muted">Project value</span>
                      <span className="font-display text-[1.375rem] font-bold text-blue tabular-nums">
                        {project.investment}
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
