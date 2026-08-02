import { Reveal } from "@/components/ui/Reveal";
import { seoNarrative } from "@/content/home";

/**
 * Long-form prose for organic search.
 *
 * This exists because the search terms this business competes on — "industrial
 * consultant", "manufacturing consultant", "detailed project report" — reward
 * substantive text, and the rest of the page is deliberately terse. It is
 * positioned late, styled quietly, and carries no call to action: a reader who
 * has scrolled this far has already passed the form.
 *
 * Two columns at `lg` rather than one full-width block. Four paragraphs at the
 * shell's 1480px width would run past 120 characters a line, which is unreadable
 * regardless of how few people read it.
 */
export function SeoNarrative() {
  return (
    <section className="border-y rule-light bg-surface">
      <div className="shell py-20 lg:py-24">
        <Reveal>
          <h2 className="display-lg max-w-[24ch]">{seoNarrative.heading}</h2>
        </Reveal>
        <Reveal delay={70}>
          <p className="label mt-4 text-slate-muted">{seoNarrative.subheading}</p>
        </Reveal>

        <div className="mt-10 gap-x-14 space-y-5 lg:columns-2 lg:space-y-0">
          {seoNarrative.paragraphs.map((paragraph, index) => (
            <Reveal
              as="p"
              key={paragraph.slice(0, 24)}
              delay={120 + index * 40}
              // `break-inside-avoid` keeps a paragraph from splitting across the
              // column break mid-sentence.
              className="mb-5 break-inside-avoid text-[0.9375rem] leading-relaxed text-slate"
            >
              {paragraph}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
