import { ClosingCTA } from "@/components/home/ClosingCTA";
import { Hero } from "@/components/home/Hero";
import { Industries } from "@/components/home/Industries";
import { ServicesIndex } from "@/components/home/ServicesIndex";
import { StatsBand } from "@/components/home/StatsBand";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <ServicesIndex />
      <WhyChooseUs />
      <Industries />
      <Testimonials />
      <ClosingCTA />
    </>
  );
}
