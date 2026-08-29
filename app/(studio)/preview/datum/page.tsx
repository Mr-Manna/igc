import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Space_Grotesk } from "next/font/google";

/**
 * Design spike B — "Datum".
 *
 * Thesis: before the factory exists there is a drawing, and ICF is who makes it.
 * So the page is composed as a general-arrangement drawing — a title block
 * instead of a nav bar, a drafting field that breaks the text column, dimension
 * lines that measure the thing under them, and callout leaders that label real
 * stages. The rule this direction lives or dies by: every line has to measure or
 * label something true. Grid lines used as decoration are the failure mode.
 *
 * The stage numbering is not ornament either — this is a genuine sequence, and
 * the order is information the reader needs.
 *
 * Header + hero only. Not linked from anywhere, noindex, absent from the
 * sitemap. See app/(studio)/layout.tsx.
 */

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spike B — Datum",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#e4e2dc",
  colorScheme: "light",
};

const sheets = [
  { no: "01", label: "Services", href: "/services" },
  { no: "02", label: "Industries", href: "/industries" },
  { no: "03", label: "Subsidies", href: "/subsidies" },
  { no: "04", label: "Reports", href: "/project-reports" },
  { no: "05", label: "Machinery", href: "/machinery" },
  { no: "06", label: "Record", href: "/success-stories" },
];

/**
 * The four stages of a turnkey setup, each paired with the ICF service that acts
 * on it. Drawn geometry and HTML annotations both read from this, so the SVG and
 * the labels under it can never drift apart.
 *
 * Stage 04 is the only one carrying `gate` — sanction is the moment the project
 * becomes real, and it is the single place this direction raises its voice.
 */
const stages = [
  {
    no: "01",
    stage: "INTAKE",
    sub: "raw material",
    service: "Detailed project report",
    detail: "Feasibility · financials · annexures",
    gate: false,
  },
  {
    no: "02",
    stage: "PROCESSING",
    sub: "plant + utilities",
    service: "Machinery consultancy",
    detail: "Selection · sourcing · procurement",
    gate: false,
  },
  {
    no: "03",
    stage: "PACKAGING",
    sub: "line + QC",
    service: "Industrial engineering",
    detail: "Layout · throughput · efficiency",
    gate: false,
  },
  {
    no: "04",
    stage: "DESPATCH",
    sub: "finished goods",
    service: "Subsidy and finance",
    detail: "PMEGP · CGTMSE · term loan",
    gate: true,
  },
];

/** Box centres sit on a four-column grid across the 90–1110 span of the viewBox,
    so the HTML annotation row below lines up with the drawing exactly. */
const COLS = stages.map((_, i) => 217.5 + i * 255);

export default function DatumSpike() {
  return (
    <div className={`${spaceGrotesk.variable} theme-datum`}>
      <header className="border-b border-datum-graphite bg-datum-film">
        {/* Title block. The fields are the ones a real drawing carries, and each
            one is filled with something true about this document. */}
        <div className="shell">
          <div className="grid grid-cols-2 border-x border-datum-graphite md:grid-cols-[10rem_1fr_6rem_5rem_7rem]">
            <TitleField label="Drg no" className="border-b md:border-b-0">
              <Link
                href="/preview/datum"
                className="text-[1.0625rem] font-semibold tracking-[-0.02em]"
                style={{ fontFamily: "var(--stack-grotesk)" }}
              >
                ICF<span className="text-datum-line">·</span>GA
              </Link>
            </TitleField>

            <TitleField label="Title" className="border-b border-l md:border-b-0">
              General arrangement — industrial project setup
            </TitleField>

            <TitleField label="Scale" className="border-l md:border-l">
              NTS
            </TitleField>

            <TitleField label="Rev" className="border-l">
              02
            </TitleField>

            <TitleField label="Sheet" className="border-l">
              1 of 6
            </TitleField>
          </div>
        </div>

        {/* Sheet index. Scrolls within itself on narrow screens; the sequence is
            the point, so it does not collapse behind a menu button. */}
        <div className="shell">
          <div className="flex items-center gap-5 border-x border-t border-datum-graphite py-2.5 pl-3">
            <span className="datum-label hidden shrink-0 text-datum-mute sm:inline">
              Sheets
            </span>
            <nav
              aria-label="Sheets"
              className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <ul className="flex w-max items-center gap-x-5">
                {sheets.map((sheet) => (
                  <li key={sheet.no}>
                    <Link
                      href={sheet.href}
                      className="datum-label group inline-flex items-center gap-1.5 py-1 whitespace-nowrap transition-colors duration-200 hover:text-datum-ink"
                    >
                      <span className="text-datum-ink">{sheet.no}</span>
                      <span className="border-b border-transparent transition-colors duration-200 group-hover:border-datum-ink">
                        {sheet.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Link
              href="/contact"
              className="datum-label hidden shrink-0 self-stretch border-l border-datum-graphite bg-datum-graphite px-5 py-3 text-datum-film transition-colors duration-200 hover:bg-datum-ink md:inline-flex md:items-center"
            >
              Start a drawing
            </Link>
          </div>
        </div>
      </header>

      <main id="main">
        {/* The drafting field deliberately runs wider than the 1320px text shell
            — the drawing is not a column of content, it is the sheet. */}
        <section className="px-4 pt-8 pb-16 sm:px-6 lg:pt-12 lg:pb-24">
          <div className="mx-auto flex max-w-[110rem] gap-3 sm:gap-5">
            {/* Left dimension: measures the whole engagement, top to bottom. */}
            <div
              aria-hidden="true"
              className="hidden w-8 shrink-0 flex-col items-center lg:flex"
            >
              <span className="h-px w-4 bg-datum-line" />
              <span className="w-px flex-1 bg-datum-line" />
              <span
                className="datum-anno my-3 text-datum-ink"
                style={{ writingMode: "vertical-rl" }}
              >
                MONTH 00 → 06 TYP.
              </span>
              <span className="w-px flex-1 bg-datum-line" />
              <span className="h-px w-4 bg-datum-line" />
            </div>

            <div className="min-w-0 flex-1 border border-datum-graphite bg-datum-paper">
              <div className="px-5 pt-8 pb-6 sm:px-10 lg:px-14 lg:pt-12">
                <p className="datum-anno flex items-center gap-3 text-datum-ink">
                  <span aria-hidden="true" className="h-px w-8 bg-datum-line" />
                  DATUM 00 — GROUND LEVEL
                </p>

                {/* Capped in rem, not ch: a ch cap is measured against whichever
                    face is active, so the fallback and Space Grotesk would wrap
                    at different points and the swap would shift layout. */}
                <h1 className="datum-display mt-6 max-w-[38rem] text-datum-graphite">
                  Every factory starts as a drawing.
                </h1>

                <p className="mt-7 max-w-[36rem] text-[1.0625rem] leading-[1.65]">
                  We produce the drawings, the numbers and the paperwork that turn
                  a plot and an idea into a commissioned plant — and we stay on the
                  sheet from the first feasibility figure to the day the line runs.
                </p>

                <div className="mt-9 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="datum-label bg-datum-graphite px-6 py-4 text-datum-paper transition-colors duration-200 hover:bg-datum-ink"
                  >
                    Start a drawing
                  </Link>
                  <Link
                    href="/project-reports"
                    className="datum-label border border-datum-graphite px-6 py-4 transition-colors duration-200 hover:bg-datum-graphite hover:text-datum-paper"
                  >
                    See a project report
                  </Link>
                </div>
              </div>

              <ProcessFlow />
              <StageAnnotations />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function TitleField({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`border-datum-graphite px-3 py-2 ${className}`}>
      <p className="datum-label text-datum-mute">{label}</p>
      <div className="mt-1 text-[0.8125rem] leading-snug">{children}</div>
    </div>
  );
}

/**
 * The signature element: the drawing draws itself.
 *
 * Every stroked element carries `pathLength="1"`, so a single dash length works
 * for every shape whatever its real geometry and nothing has to be measured in
 * JavaScript. The whole thing is gated behind the `.js` class the root layout
 * stamps before paint, so without JavaScript the drawing simply renders
 * complete rather than sitting at zero.
 *
 * Object lines are graphite and annotation lines are teal, which is the
 * convention on a real sheet — the drawing and the notes about the drawing are
 * different layers.
 */
function ProcessFlow() {
  const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

  return (
    <div
      className="hidden overflow-hidden px-5 sm:px-10 md:block lg:px-14"
      aria-hidden="true"
    >
      <svg viewBox="0 0 1200 340" className="h-auto w-full">
        {/* Overall dimension — measures the flow beneath it, intake to despatch. */}
        {/* `pathLength="1"` on every stroked element is what makes one dash
            length work across shapes of different real lengths — without it the
            dasharray below renders as dots rather than as a line being drawn. */}
        <g
          stroke="var(--color-datum-line)"
          strokeWidth="1"
          fill="none"
          pathLength="1"
        >
          <line
            className="datum-draw"
            style={delay(0)}
            pathLength="1"
            x1="90"
            y1="26"
            x2="90"
            y2="56"
          />
          <line
            className="datum-draw"
            style={delay(0)}
            pathLength="1"
            x1="1110"
            y1="26"
            x2="1110"
            y2="56"
          />
          <line
            className="datum-draw"
            style={delay(80)}
            pathLength="1"
            x1="90"
            y1="41"
            x2="452"
            y2="41"
          />
          <line
            className="datum-draw"
            style={delay(80)}
            pathLength="1"
            x1="748"
            y1="41"
            x2="1110"
            y2="41"
          />
          <path
            className="datum-draw"
            style={delay(80)}
            pathLength="1"
            d="M99 36 L90 41 L99 46"
          />
          <path
            className="datum-draw"
            style={delay(80)}
            pathLength="1"
            d="M1101 36 L1110 41 L1101 46"
          />
        </g>
        <text
          className="datum-anno-in"
          style={{ ...delay(700), fontFamily: "var(--stack-plex-mono)" }}
          x="600"
          y="45"
          textAnchor="middle"
          fontSize="13"
          letterSpacing="1.6"
          fill="var(--color-datum-ink)"
        >
          TURNKEY SCOPE — CONCEPT TO COMMISSIONING
        </text>

        {/* Object lines: the four stages. */}
        {stages.map((s, i) => {
          const x = COLS[i] - 97.5;
          const stroke = s.gate
            ? "var(--color-datum-gate)"
            : "var(--color-datum-graphite)";
          return (
            <g key={s.no}>
              <rect
                className="datum-draw"
                style={delay(260 + i * 90)}
                x={x}
                y="110"
                width="195"
                height="86"
                pathLength="1"
                fill="none"
                stroke={stroke}
                strokeWidth="1.5"
              />
              <text
                className="datum-anno-in"
                style={{ ...delay(760 + i * 70), fontFamily: "var(--stack-plex-mono)" }}
                x={x + 12}
                y="130"
                fontSize="11"
                letterSpacing="1.2"
                fill="var(--color-datum-ink)"
              >
                {s.no}
              </text>
              <text
                className="datum-anno-in"
                style={{ ...delay(760 + i * 70), fontFamily: "var(--stack-grotesk)" }}
                x={COLS[i]}
                y="157"
                textAnchor="middle"
                fontSize="19"
                fontWeight="600"
                letterSpacing="1.4"
                fill="var(--color-datum-graphite)"
              >
                {s.stage}
              </text>
              <text
                className="datum-anno-in"
                style={{ ...delay(800 + i * 70), fontFamily: "var(--stack-plex-mono)" }}
                x={COLS[i]}
                y="178"
                textAnchor="middle"
                fontSize="12"
                letterSpacing="0.6"
                fill="var(--color-datum-mute)"
              >
                {s.sub}
              </text>
            </g>
          );
        })}

        {/* Flow arrows between stages. */}
        <g stroke="var(--color-datum-graphite)" strokeWidth="1.5" fill="none">
          {[0, 1, 2].map((i) => {
            const from = COLS[i] + 97.5;
            const to = COLS[i + 1] - 97.5;
            return (
              <g key={i}>
                <line
                  className="datum-draw"
                  style={delay(560 + i * 90)}
                  pathLength="1"
                  x1={from}
                  y1="153"
                  x2={to - 8}
                  y2="153"
                />
                <path
                  className="datum-draw"
                  style={delay(620 + i * 90)}
                  pathLength="1"
                  d={`M${to - 17} 148 L${to - 8} 153 L${to - 17} 158`}
                />
              </g>
            );
          })}
        </g>

        {/* Callout leaders down to the annotation row. */}
        <g stroke="var(--color-datum-line)" strokeWidth="1" fill="none">
          {stages.map((s, i) => (
            <g key={s.no}>
              <line
                className="datum-draw"
                style={delay(980 + i * 70)}
                pathLength="1"
                x1={COLS[i]}
                y1="196"
                x2={COLS[i]}
                y2="300"
              />
              <line
                className="datum-draw"
                style={delay(1050 + i * 70)}
                pathLength="1"
                x1={COLS[i] - 14}
                y1="300"
                x2={COLS[i] + 14}
                y2="300"
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

/**
 * The service that acts at each stage.
 *
 * On md and up this is a four-column row whose column centres land exactly on
 * the leader lines above it. Below md the drawing is withdrawn — at 375px the
 * SVG text would render around 4px — and the same data renders as a stacked
 * sequence with a connecting rule, which is the honest small-screen form of a
 * flow diagram rather than a shrunken picture of one.
 */
function StageAnnotations() {
  return (
    <>
      <div className="hidden px-5 pb-10 sm:px-10 md:block lg:px-14">
        <div className="grid grid-cols-4" style={{ paddingInline: "7.5%" }}>
          {stages.map((s) => (
            <div key={s.no} className="px-3 text-center">
              <p
                className={`text-[0.9375rem] leading-snug font-semibold ${
                  s.gate ? "text-datum-gate" : "text-datum-graphite"
                }`}
              >
                {s.service}
              </p>
              <p className="datum-anno mt-1.5 text-datum-mute">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <ol className="px-5 pt-2 pb-10 sm:px-10 md:hidden">
        {stages.map((s, i) => (
          <li key={s.no} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center border text-[0.6875rem] font-medium ${
                  s.gate
                    ? "border-datum-gate text-datum-gate"
                    : "border-datum-graphite text-datum-graphite"
                }`}
                style={{ fontFamily: "var(--stack-plex-mono)" }}
              >
                {s.no}
              </span>
              {i < stages.length - 1 && (
                <span aria-hidden="true" className="w-px flex-1 bg-datum-line" />
              )}
            </div>

            <div className="pb-7">
              <p className="datum-anno text-datum-mute">
                {s.stage} — {s.sub}
              </p>
              <p
                className={`mt-1 text-[1.0625rem] leading-snug font-semibold ${
                  s.gate ? "text-datum-gate" : "text-datum-graphite"
                }`}
              >
                {s.service}
              </p>
              <p className="datum-anno mt-1.5 text-datum-mute">{s.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
