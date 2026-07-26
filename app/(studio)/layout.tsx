import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

/**
 * Shell for the design spikes at /preview/*.
 *
 * There is deliberately no shared header or footer here. The two directions
 * disagree about what a header even is — one is a running head, the other is a
 * drawing title block — so each page owns its own `<header>` and its own
 * `<main id="main">` landmark. This layout exists only to carry the fonts both
 * directions share.
 *
 * IBM Plex Sans and Plex Mono are declared here because both spikes use them;
 * each spike declares its own display face in its own page module, so choosing
 * one direction and deleting the other also deletes that face's download.
 */

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`${plexSans.variable} ${plexMono.variable}`}>{children}</div>;
}
