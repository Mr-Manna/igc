import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { UtilityBar } from "@/components/layout/UtilityBar";
import { PartnersBand } from "@/components/partners/PartnersBand";

/**
 * The shared shell for the live site.
 *
 * This chrome used to sit in the root layout, which meant every route on the
 * site — including design spikes that exist precisely to try a different
 * identity — was bracketed by the navy utility bar, header and footer. Moving it
 * down one level into a route group leaves the root layout responsible only for
 * <html>/<body>, so a second group can wear entirely different chrome without
 * touching a pixel of this one.
 *
 * `<main id="main">` lives here rather than in the root layout so each group
 * owns its own landmark; the skip link in the root layout targets whichever one
 * is rendered.
 */
export default function CorporateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UtilityBar />
      <Header />
      <main id="main">{children}</main>
      <PartnersBand />
      <Footer />
      <FloatingActions />
    </>
  );
}
