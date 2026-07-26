import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { closingCta } from "@/content/home";
import { contact, telHref } from "@/content/site";

/**
 * Single closing CTA. The previous site stacked two near-identical CTA bands
 * back to back on every page; they are consolidated here.
 */
export function ClosingCTA() {
  return (
    <section className="on-dark relative overflow-hidden bg-navy">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[34rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 opacity-45 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse, color-mix(in oklab, var(--color-blue) 55%, transparent) 0%, transparent 70%)",
        }}
      />

      <div className="shell relative z-10 py-20 text-center lg:py-24">
        <Reveal>
          <h2 className="display-lg mx-auto max-w-[30rem]">{closingCta.heading}</h2>
        </Reveal>

        <Reveal delay={70}>
          <p className="measure mx-auto mt-5 text-ink-invert">{closingCta.body}</p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href={closingCta.primaryCta.href} variant="primary-on-dark">
              {closingCta.primaryCta.label}
            </Button>
            <Button href={closingCta.secondaryCta.href} variant="secondary-on-dark">
              {closingCta.secondaryCta.label}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={170}>
          <p className="mt-10 text-[0.9375rem] text-ink-invert-muted">
            Prefer to talk?{" "}
            <a
              href={telHref}
              className="font-semibold text-white underline decoration-blue-light decoration-2 underline-offset-4 transition-colors hover:text-blue-light"
            >
              {contact.phonePrimary}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
