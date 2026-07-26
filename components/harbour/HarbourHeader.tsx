"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { harbourNav } from "@/content/harbour";
import { contact, site } from "@/content/site";

/**
 * The Harbour header: wordmark, a hairline that runs the width of the bar, then
 * the navigation as tab-shaped pills.
 *
 * Client-side only for the disclosure state below `lg`. The pills carry no
 * active state because none of them points at this page — the wordmark is the
 * home link. Filling one of them sage to look like the reference would be
 * inventing a current-page indicator that is not true.
 */
export function HarbourHeader() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b harbour-rule bg-harbour-paper">
      <div className="shell flex h-16 items-center gap-5">
        <Link href="/harbour" className="flex shrink-0 items-baseline gap-3">
          <span className="text-[1.5rem] leading-none font-bold tracking-[-0.05em] text-harbour-ink">
            IGC
            <span className="text-harbour-moss">.</span>
          </span>
          <span className="harbour-micro hidden text-harbour-mute sm:inline">
            {site.legalName}
          </span>
          <span className="sr-only">— Home</span>
        </Link>

        {/* The rule that runs from the wordmark to the navigation. Decorative,
            so it is a span rather than an <hr>. */}
        <span aria-hidden="true" className="hidden h-px flex-1 bg-harbour-rule md:block" />

        <nav aria-label="Harbour" className="ml-auto hidden items-center md:flex">
          {harbourNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="harbour-tab ml-px bg-harbour-paper-2 px-4 py-3 text-harbour-ink transition-colors duration-200 hover:bg-harbour-sage"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`mailto:${contact.emailPrimary}`}
            className="harbour-tab ml-3 hidden text-harbour-mute transition-colors duration-200 hover:text-harbour-moss lg:inline"
          >
            {contact.emailPrimary}
          </a>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls="harbour-menu"
          onClick={() => setOpen((value) => !value)}
          className="harbour-tab ml-auto bg-harbour-paper-2 px-4 py-3 text-harbour-ink transition-colors duration-200 hover:bg-harbour-sage md:hidden"
        >
          {open ? "close" : "menu"}
        </button>
      </div>

      {open ? (
        <div id="harbour-menu" className="border-t harbour-rule bg-harbour-paper md:hidden">
          <nav aria-label="Harbour, mobile" className="shell flex flex-col py-2">
            {harbourNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="harbour-tab border-b harbour-rule py-4 text-harbour-ink last:border-b-0"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`mailto:${contact.emailPrimary}`}
              className="harbour-tab py-4 text-harbour-mute"
            >
              {contact.emailPrimary}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
