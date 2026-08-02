import { EnquiryForm } from "@/components/home/EnquiryForm";
import { Reveal } from "@/components/ui/Reveal";
import { servicesEnquiry } from "@/content/services";

/**
 * The page's lead capture, and the target of every "Discuss this service" link
 * above — hence `id="enquiry"`, which is a stable address worth not renaming.
 *
 * It reuses the homepage's `EnquiryForm` with its own framing copy rather than
 * reusing `AboutEnquiry` wholesale. Shipping the same three paragraphs of
 * company history on two pages is duplicate content that helps neither of them,
 * and a reader who has just worked through six service descriptions does not
 * need the firm introduced again — they need to know what to do next.
 */
export function ServicesEnquiry() {
  return (
    <section id="enquiry" className="bg-surface">
      <div className="shell grid items-start gap-12 py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="label flex items-center gap-3 text-blue">
              <span aria-hidden="true" className="h-px w-6 bg-current" />
              {servicesEnquiry.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={70}>
            <h2 className="display-lg mt-4 max-w-[20ch]">{servicesEnquiry.heading}</h2>
          </Reveal>

          <div className="mt-6 space-y-5">
            {servicesEnquiry.paragraphs.map((paragraph, index) => (
              <Reveal
                as="p"
                key={paragraph.slice(0, 24)}
                delay={120 + index * 50}
                className="measure text-slate"
              >
                {paragraph}
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={160} className="lg:col-span-5">
          <EnquiryForm
            heading={servicesEnquiry.form.heading}
            body={servicesEnquiry.form.body}
          />
        </Reveal>
      </div>
    </section>
  );
}
