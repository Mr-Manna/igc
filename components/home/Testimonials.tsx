import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/content/home";

/** Client quotes as an even card row — comparable at a glance, no carousel. */
export function Testimonials() {
  return (
    <section className="border-y rule-light bg-surface">
      <div className="shell py-20 lg:py-28">
        <SectionHeading
          align="center"
          eyebrow="Testimonials"
          heading="What Our Clients Say"
          body="Entrepreneurs who turned their manufacturing plans into operating plants."
        />

        <ul className="mt-14 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <li key={testimonial.name} className="flex">
              <Reveal delay={index * 70} className="flex w-full">
                <figure className="card flex w-full flex-col p-7 shadow-card">
                  <span
                    aria-hidden="true"
                    className="font-display text-[3rem] leading-[0.6] font-bold text-blue/25"
                  >
                    &ldquo;
                  </span>

                  <blockquote className="mt-5 text-[0.9375rem] text-slate">
                    {testimonial.quote}
                  </blockquote>

                  <figcaption className="mt-auto flex items-center gap-3.5 border-t rule-light pt-6">
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy font-display text-[0.9375rem] font-semibold text-white"
                    >
                      {initials(testimonial.name)}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold text-navy">
                        {testimonial.name}
                      </span>
                      <span className="block text-[0.8125rem] text-slate-muted">
                        {testimonial.role}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <div className="mt-12 flex justify-center">
            <Button href="/success-stories" variant="secondary">
              View All Success Stories
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** "Rajesh Kumar" → "RK". Decorative only; the full name sits beside it. */
function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
