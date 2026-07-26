import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * Eyebrow, heading, supporting paragraph.
 *
 * `tone` names the background the heading sits on, not the text: `light` is the
 * default because the site is now light-dominant, and `dark` is only for the
 * navy bands, where the blue accent fails contrast and has to step up to
 * `blue-light`.
 */
export function SectionHeading({
  eyebrow,
  heading,
  body,
  tone = "light",
  className = "",
  align = "start",
}: {
  eyebrow: string;
  heading: ReactNode;
  body?: string;
  tone?: "light" | "dark";
  className?: string;
  align?: "start" | "center";
}) {
  const centered = align === "center";
  const accentClass = tone === "light" ? "text-blue" : "text-blue-light";
  const bodyClass = tone === "light" ? "text-slate" : "text-ink-invert";

  return (
    <div className={className}>
      <Reveal>
        <p
          className={`label flex items-center gap-3 ${accentClass} ${
            centered ? "justify-center" : ""
          }`}
        >
          <span aria-hidden="true" className="h-px w-6 bg-current" />
          {eyebrow}
        </p>
      </Reveal>

      <Reveal delay={70}>
        <h2 className={`display-lg mt-4 max-w-[22ch] ${centered ? "mx-auto text-center" : ""}`}>
          {heading}
        </h2>
      </Reveal>

      {body ? (
        <Reveal delay={120}>
          <p className={`measure mt-5 ${bodyClass} ${centered ? "mx-auto text-center" : ""}`}>
            {body}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
