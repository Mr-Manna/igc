import { Reveal } from "@/components/ui/Reveal";
import { contact } from "@/content/site";
import { servicesFaq } from "@/content/services";

/**
 * Eight questions as native `<details>` rows, plus the `FAQPage` structured
 * data generated from the same array.
 *
 * One source for both is the point. Hand-written JSON-LD that says something
 * the visible page does not is the most common way a rich result gets pulled,
 * and it is the kind of drift nobody notices for months — here it cannot
 * happen, because the markup and the schema map over the same objects.
 *
 * No JavaScript is involved: `<details>` is a disclosure widget in the browser
 * already, keyboard-operable and announced correctly without a line of ARIA.
 * See the `.faq` rules in globals.css, which only remove the default marker.
 */
export function ServicesFaq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: servicesFaq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section className="bg-canvas">
      <div className="shell grid gap-12 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="label flex items-center gap-3 text-blue">
              <span aria-hidden="true" className="h-px w-6 bg-current" />
              {servicesFaq.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={70}>
            <h2 className="display-lg mt-4">{servicesFaq.heading}</h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-5 text-slate">
              Not answered here? Write to{" "}
              <a
                href={`mailto:${contact.emailPrimary}`}
                className="font-semibold text-blue underline underline-offset-4"
              >
                {contact.emailPrimary}
              </a>{" "}
              and a consultant will reply directly.
            </p>
          </Reveal>
        </div>

        <div className="faq lg:col-span-8">
          {servicesFaq.items.map((item, index) => (
            <Reveal key={item.question} delay={index < 4 ? index * 50 : 0}>
              <details className="group border-b rule-light">
                <summary className="flex items-start justify-between gap-6 py-5 text-[1.0625rem] font-semibold text-navy transition-colors hover:text-blue">
                  {item.question}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="faq-chevron mt-1.5 h-3.5 w-3.5 shrink-0 text-slate-muted"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6l5 5 5-5" />
                  </svg>
                </summary>

                <p className="measure pb-6 text-[0.9375rem] text-slate">{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          // Escape `<` so a future copy edit can never terminate this script tag.
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
}
