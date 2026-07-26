import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import { contact, site } from "@/content/site";

// Headings only, at normal width — the `wdth` axis is not requested because
// nothing compresses type any more, and dropping it drops the width-variable
// font file too.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.legalName} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Leading industrial consultancy firm in India. Expert services for project reports, government subsidies, loan consultancy, machinery sourcing. PMEGP, CGTMSE, MSME specialists.",
  keywords: [
    "Industrial Consultancy India",
    "Factory Setup Consultant",
    "Detailed Project Report",
    "Government Subsidy Consultant",
    "Project Finance Consultant",
    "Machinery Consultant",
    "MSME Consultant",
    "Turnkey Factory Setup",
  ],
  authors: [{ name: site.legalName }],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.legalName,
    title: `${site.name} — ${site.legalName}`,
    description:
      "Leading industrial consultancy firm in India. Expert services for project reports, government subsidies, loan consultancy, machinery sourcing.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.legalName}`,
    description:
      "Leading industrial consultancy firm in India. Expert services for project reports, government subsidies, loan consultancy.",
  },
};

export const viewport: Viewport = {
  // Matches the navy utility bar, which is the top-most band on the page.
  themeColor: "#0b2545",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  description: site.description,
  foundingDate: site.founded,
  areaServed: { "@type": "Country", name: "India" },
  telephone: `+${contact.phoneDigits}`,
  email: contact.emailPrimary,
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.addressLine1,
    addressLocality: contact.addressLocality,
    addressRegion: contact.addressRegion,
    postalCode: contact.postalCode,
    addressCountry: contact.countryCode,
  },
  openingHours: "Mo-Sa 09:00-19:00",
  knowsAbout: [
    "Detailed Project Report",
    "PMEGP",
    "CGTMSE",
    "PMFME",
    "MSME subsidies",
    "Industrial machinery sourcing",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${archivo.variable} ${inter.variable}`}
      // The inline script below adds `.js` to this element before hydration, so
      // the client className legitimately differs from the server's. Without
      // this, React reports it as a hydration mismatch on every load.
      suppressHydrationWarning
    >
      <body>
        {/* Stamps `.js` on <html> before the page paints. Scroll-reveal styles hang
            off that class, so without JavaScript every revealed element simply
            renders visible instead of being stranded at opacity 0. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />

        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-btn focus:bg-blue focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>

        {/* Chrome and the <main> landmark belong to the route groups, not here —
            see app/(corporate)/layout.tsx. This layout owns only the document. */}
        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            // Escape `<` so a future content edit can never terminate this script tag.
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
