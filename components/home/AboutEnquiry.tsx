import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { aboutSection } from "@/content/home";
import { EnquiryForm } from "./EnquiryForm";

/**
 * The page's one lead-capture point, paired with the story that earns it.
 *
 * The reference site puts these side by side and it is the right call: a form
 * on its own asks for trust it has not been given, and an about section on its
 * own has nowhere to send the reader who has just been convinced.
 *
 * Copy leads in the DOM so the reading order is argument-then-ask, and the form
 * takes the narrower column — five short fields do not need seven columns.
 */
export function AboutEnquiry() {
  return (
    <section className="border-y rule-light bg-surface">
      <div className="shell grid items-start gap-12 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="label flex items-center gap-3 text-blue">
              <span aria-hidden="true" className="h-px w-6 bg-current" />
              {aboutSection.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={70}>
            <h2 className="display-lg mt-4 max-w-[20ch]">{aboutSection.heading}</h2>
          </Reveal>

          <div className="mt-6 space-y-5">
            {aboutSection.paragraphs.map((paragraph, index) => (
              <Reveal as="p" key={paragraph.slice(0, 24)} delay={120 + index * 50} className="measure text-slate">
                {paragraph}
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <div className="mt-9">
              <Button href={aboutSection.cta.href} variant="secondary">
                {aboutSection.cta.label}
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={160} className="lg:col-span-5">
          <EnquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
