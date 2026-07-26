import { Challenges } from "@/components/harbour/Challenges";
import { ContactBand } from "@/components/harbour/ContactBand";
import { Faq } from "@/components/harbour/Faq";
import { Hero } from "@/components/harbour/Hero";
import { Insights } from "@/components/harbour/Insights";
import { Numbers } from "@/components/harbour/Numbers";
import { Positioning } from "@/components/harbour/Positioning";
import { Preloader } from "@/components/harbour/Preloader";
import { Sectors } from "@/components/harbour/Sectors";
import { Solutions } from "@/components/harbour/Solutions";

/**
 * The second homepage. Composition only — every section reads its own slice of
 * `content/harbour.ts` and takes no props, the same arrangement the live
 * homepage uses.
 *
 * The order is the reference's: recede, position, quantify, name the problem
 * against a dark band, answer it, widen to sectors, then editorial, objections
 * and the ask.
 */
export default function HarbourHomePage() {
  return (
    <>
      <Preloader />
      <Hero />
      <Positioning />
      <Numbers />
      <Challenges />
      <Solutions />
      <Sectors />
      <Insights />
      <Faq />
      <ContactBand />
    </>
  );
}
