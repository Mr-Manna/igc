import { EnquiryForm } from "@/components/home/EnquiryForm";
import { Reveal } from "@/components/ui/Reveal";
import { industriesEnquiry } from "@/content/industries";

/**
 * The page's lead capture, and the target of every "Discuss a project in this
 * sector" link above — hence `id="enquiry"`, matching /services so the anchor
 * means the same thing on both pages.
 *
 * It reuses the homepage's `EnquiryForm` with its own framing. The copy answers
 * the objection this page specifically raises: twelve named sectors invite the
 * reader whose sector is not among them to close the tab, so the heading takes
 * that question rather than repeating the pitch.
 */
export function IndustriesEnquiry() {
  return (
    <section id="enquiry" className="bg-surface">
      <div className="shell grid items-start gap-12 py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="label flex items-center gap-3 text-blue">
              <span aria-hidden="true" className="h-px w-6 bg-current" />
              {industriesEnquiry.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={70}>
            <h2 className="display-lg mt-4 max-w-[20ch]">{industriesEnquiry.heading}</h2>
          </Reveal>

          <div className="mt-6 space-y-5">
            {industriesEnquiry.paragraphs.map((paragraph, index) => (
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
            heading={industriesEnquiry.form.heading}
            body={industriesEnquiry.form.body}
          />
        </Reveal>
      </div>
    </section>
  );
}
