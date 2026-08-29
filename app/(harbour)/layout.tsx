import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { HarbourFooter } from "@/components/harbour/HarbourFooter";
import { HarbourHeader } from "@/components/harbour/HarbourHeader";

/**
 * Shell for the second homepage at /harbour.
 *
 * A separate route group rather than a page inside `(corporate)` because the
 * chrome is different all the way down: this direction has no utility bar, no
 * floating action buttons, a header built from tab pills and a footer on paper
 * instead of in a navy slab. The root layout owns only the document, which is
 * what makes a second set of chrome possible at all — see the note in
 * `app/(corporate)/layout.tsx`.
 *
 * Note that a route group contributes no path segment, so the page lives at
 * `(harbour)/harbour/page.tsx`. Putting it at `(harbour)/page.tsx` would resolve
 * to `/` and collide with the live homepage.
 *
 * `<main id="main">` is declared here, not in the root layout: the root supplies
 * the skip link and each route group supplies its own landmark.
 *
 * Instrument Sans is the only face this direction uses, at everything from 11px
 * micro-lettering to 84px display. It is loaded here rather than globally so
 * that deleting this route group also deletes its font download.
 */

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harbour",
  description:
    "Design direction C for the ICF homepage. Not part of the live site.",
  robots: { index: false, follow: false },
};

export default function HarbourLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`theme-harbour ${instrument.variable}`}>
      <HarbourHeader />
      <main id="main">{children}</main>
      <HarbourFooter />
    </div>
  );
}
