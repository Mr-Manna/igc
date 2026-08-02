import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { whyChooseUs } from "@/content/home";

/**
 * Five reasons in a single row.
 *
 * This was a photo-and-text split with a credential card overlapping the plate.
 * That treatment lost its job once the page gained a photographic hero, a
 * sector rail and a project showcase — a sixth photograph in the same scroll
 * stopped carrying information. Reduced to icon, claim, sentence: the section
 * is a summary, and a summary should read in one pass.
 *
 * The "50+ banking partners" figure the credential card used to carry has not
 * been lost — it is the "Strong Network" point's description.
 */
export function WhyChooseUs() {
  return (
    <section className="bg-canvas">
      <div className="shell py-20 lg:py-28">
        <SectionHeading
          align="center"
          eyebrow={whyChooseUs.eyebrow}
          heading={whyChooseUs.heading}
          body={whyChooseUs.body}
        />

        <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
          {whyChooseUs.points.map((point, index) => (
            <li key={point.title} className="text-center">
              <Reveal delay={(index % 5) * 60}>
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue/10 text-blue">
                  <ServiceIcon name={point.icon} />
                </span>
                <h3 className="mt-5 text-[1.0625rem] font-semibold">{point.title}</h3>
                <p className="mx-auto mt-2.5 max-w-[18rem] text-[0.9375rem] text-slate">
                  {point.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <div className="mt-14 flex justify-center">
            <Button href={whyChooseUs.cta.href} variant="secondary">
              {whyChooseUs.cta.label}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
