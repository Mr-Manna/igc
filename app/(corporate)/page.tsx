import { AboutEnquiry } from "@/components/home/AboutEnquiry";
import { ClientLogos } from "@/components/home/ClientLogos";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { Hero } from "@/components/home/Hero";
import { Industries } from "@/components/home/Industries";
import { ProjectsShowcase } from "@/components/home/ProjectsShowcase";
import { SeoNarrative } from "@/components/home/SeoNarrative";
import { ServicesIndex } from "@/components/home/ServicesIndex";
import { StatsBand } from "@/components/home/StatsBand";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { FaqSection } from "@/components/faq/FaqSection";
import { generalFaq } from "@/content/faq";

/**
 * Order matters more than any individual section here.
 *
 * Proof leads: the figures and the client names land before a word of pitch.
 * The ask — AboutEnquiry — sits at roughly the two-thirds mark, late enough
 * that services and sectors have made the case and early enough that nobody has
 * to reach the footer to act. What follows it is corroboration for whoever is
 * still deciding, with the SEO prose parked where it cannot get in the way of
 * a reader who is not a crawler.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <ClientLogos />
      <ServicesIndex />
      <Industries />
      <AboutEnquiry />
      <WhyChooseUs />
      <SeoNarrative />
      <ProjectsShowcase />
      <Testimonials />
      <FaqSection
        eyebrow={generalFaq.eyebrow}
        heading={generalFaq.heading}
        items={generalFaq.items}
      />
      <ClosingCTA />
    </>
  );
}
