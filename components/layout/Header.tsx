"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { contact, primaryNav, telHref } from "@/content/site";
import { Wordmark } from "./Wordmark";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change.
  useEffect(() => setOpen(false), [pathname]);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Escape to close, Tab confined to the panel while it is open.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab" || !panel) return;

      const focusable = panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <header
      className={`sticky top-0 z-50 border-b rule-light bg-canvas transition-shadow duration-300 ${
        scrolled && !open ? "shadow-header" : ""
      }`}
    >
      <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
        <Wordmark />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-x-4 lg:flex xl:gap-x-6"
        >
          {primaryNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-6 text-[0.875rem] font-medium whitespace-nowrap transition-colors ${
                  active ? "text-blue" : "text-slate hover:text-navy"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 w-full origin-left bg-blue transition-transform duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-btn bg-blue px-5 py-2.5 text-[0.875rem] font-semibold whitespace-nowrap text-white transition-colors duration-250 hover:bg-blue-dark md:inline-block"
          >
            Get Free Consultation
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => (open ? close() : setOpen(true))}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 items-center justify-center rounded-btn border rule-light text-navy transition-colors hover:border-blue hover:text-blue lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M2 6h16M2 14h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Full-height overlay menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="absolute inset-x-0 top-full z-40 h-[calc(100dvh-4.5rem)] overflow-y-auto border-t rule-light bg-canvas lg:hidden"
      >
        <nav aria-label="Mobile" className="shell flex flex-col py-2">
          {primaryNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center justify-between gap-4 border-b rule-light py-4 font-medium transition-colors ${
                  active ? "text-blue" : "text-navy hover:text-blue"
                }`}
              >
                {item.label}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5 shrink-0 text-slate-muted"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 3l5 5-5 5" />
                </svg>
              </Link>
            );
          })}

          <Link
            href="/contact"
            className="mt-6 rounded-btn bg-blue px-6 py-3.5 text-center font-semibold text-white"
          >
            Get Free Consultation
          </Link>

          <a
            href={telHref}
            className="mt-3 mb-8 rounded-btn border rule-light px-6 py-3.5 text-center font-semibold text-navy"
          >
            Call {contact.phonePrimary}
          </a>
        </nav>
      </div>
    </header>
  );
}
