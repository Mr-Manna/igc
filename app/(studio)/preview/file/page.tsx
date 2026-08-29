import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Newsreader } from "next/font/google";

/**
 * Design spike A — "The Sanction File".
 *
 * Thesis: IGC does not sell advice, it sells a document that makes a bank say
 * yes. So the page borrows the logic of a bound technical report — numbered
 * clauses, a running head, a real schedule table, a marginal note — rather than
 * the logic of a marketing site. There are no cards and no icons here on
 * purpose; structure comes from clause numbering and tabular data doing actual
 * work, which is also what keeps it from sliding into broadsheet pastiche.
 *
 * Header + hero only. Not linked from anywhere, noindex, absent from the
 * sitemap. See app/(studio)/layout.tsx.
 */

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spike A — The Sanction File",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f7f7f4",
  colorScheme: "light",
};

/** Rendered as clauses in the running head. Real routes — nothing dead. */
const clauses = [
  { no: "01", label: "Scope", href: "/services" },
  { no: "02", label: "Schemes", href: "/subsidies" },
  { no: "03", label: "Finance", href: "/services/loan-consultancy" },
  { no: "04", label: "Machinery", href: "/machinery" },
  { no: "05", label: "Sectors", href: "/industries" },
  { no: "06", label: "Record", href: "/success-stories" },
];

/**
 * Scheme maxima, not entitlements — the footnote under the table says so, and it
 * needs to stay there. Every figure is a published scheme ceiling; none of it is
 * an IGC claim.
 */
const schedule = [
  {
    scheme: "PMEGP",
    cover: "15–35% margin money subsidy",
    ceiling: "₹50 L",
    ceilingNote: "manufacturing",
    applies: "New micro units",
  },
  {
    scheme: "CGTMSE",
    cover: "Up to 85% credit guarantee",
    ceiling: "₹500 L",
    ceilingNote: "per borrower",
    applies: "Collateral-free term loans",
  },
  {
    scheme: "PMFME",
    cover: "35% credit-linked capital subsidy",
    ceiling: "₹10 L",
    ceilingNote: "per unit",
    applies: "Food processing units",
  },
];

export default function SanctionFileSpike() {
  return (
    <div className={`${newsreader.variable} theme-file`}>
      <header className="file-rule-double sticky top-0 z-50 bg-file-paper">
        {/* Identity row. A running head, not a nav bar — it states what the
            document is and who issued it, and nothing is clickable except the
            wordmark. */}
        <div className="shell flex items-center justify-between gap-4 border-b border-file-rule py-2.5">
          <Link href="/preview/file" className="flex items-baseline gap-2.5">
            <span
              className="text-[1.375rem] leading-none font-semibold tracking-[-0.02em]"
              style={{ fontFamily: "var(--stack-newsreader)" }}
            >
              IGC<span className="text-file-oxide">.</span>
            </span>
            <span className="file-mono hidden text-file-mute sm:inline">
              Industrial Consultancy Firm
            </span>
          </Link>

          <p className="file-mono text-file-mute">
            File 2009<span className="mx-1 text-file-rule">/</span>26
            <span className="mx-2 text-file-rule">·</span>
            <span className="hidden sm:inline">Mumbai</span>
            <span className="sm:hidden">MUM</span>
          </p>
        </div>

        {/* Clause index. Scrolls within itself on narrow screens rather than
            collapsing to a hamburger — the index of a document is the document's
            structure, so hiding it would hide the idea. */}
        <div className="shell flex items-center gap-6 py-2">
          <nav
            aria-label="Clauses"
            className="-mx-1 min-w-0 flex-1 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <ul className="flex w-max items-center gap-x-6">
              {clauses.map((clause) => (
                <li key={clause.no}>
                  <Link
                    href={clause.href}
                    className="file-mono group inline-flex items-baseline gap-1.5 py-1 whitespace-nowrap text-file-ink transition-colors duration-200 hover:text-file-oxide"
                  >
                    <span className="text-file-oxide">§{clause.no}</span>
                    <span className="border-b border-transparent transition-colors duration-200 group-hover:border-file-oxide">
                      {clause.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href="/contact"
            className="file-mono hidden shrink-0 bg-file-ink px-4 py-2 text-file-paper transition-colors duration-200 hover:bg-file-oxide md:inline-block"
          >
            Request a report
          </Link>
        </div>
      </header>

      <main id="main">
        <section className="shell pt-12 pb-16 lg:pt-20 lg:pb-24">
          {/* Clause head: number, rule, title. The rule is structural — it is the
              only thing separating the clause mark from its subject. */}
          <div className="flex items-center gap-4">
            <span className="file-mono text-file-oxide">§ 01</span>
            <span aria-hidden="true" className="h-px flex-1 bg-file-rule" />
            <h2 className="file-mono text-file-mute">Scope of engagement</h2>
          </div>

          <div className="mt-10 grid gap-x-12 gap-y-12 lg:mt-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              {/* Capped in rem, not ch: a ch cap is measured against whichever
                  face is active, so the fallback and Newsreader would wrap at
                  different points and the swap would shift layout. */}
              {/* `text-file-ink` is load-bearing: the base layer colours every
                  h1 navy, and only a utility-layer class overrides it. */}
              <h1 className="file-display max-w-[46rem] text-file-ink">
                The bank doesn&rsquo;t fund your idea. It funds the document.
              </h1>

              <p className="mt-8 max-w-[34rem] text-[1.0625rem] leading-[1.65] text-file-ink">
                We write the detailed project report that gets it sanctioned —
                feasibility, machinery schedule, financial projections, and every
                subsidy scheme you qualify for, mapped in before it reaches the
                credit desk.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="file-mono bg-file-ink px-6 py-3.5 text-file-paper transition-colors duration-200 hover:bg-file-oxide"
                >
                  Request a project report
                </Link>
                <Link
                  href="/subsidies"
                  className="file-mono border border-file-ink px-6 py-3.5 text-file-ink transition-colors duration-200 hover:bg-file-ink hover:text-file-paper"
                >
                  Check scheme eligibility
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <SanctionStamp />

              {/* The marginal note. Newsreader's italic is the reason this face
                  was chosen — it is a second voice, not a slant, which is what
                  lets an aside read as an aside without a box around it. */}
              <div className="mt-10 flex gap-4 lg:mt-12">
                <span
                  aria-hidden="true"
                  className="mt-1.5 w-px shrink-0 self-stretch bg-file-rule"
                />
                <p className="file-margin-note max-w-[22rem]">
                  Fifteen years of these. Five hundred bound, submitted and
                  defended across more than fifty lending institutions — and
                  ₹500&nbsp;crore of project cost carried through to sanction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule A. A real table, because the reader's actual question is a
            table-shaped question: what do I qualify for and how much is it. */}
        <section className="shell pb-20 lg:pb-28">
          <div className="border-t-[3px] border-file-ink pt-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h2 className="file-mono text-file-ink">
                Schedule A — schemes mapped into our reports
              </h2>
              <p className="file-mono text-file-mute">Current as at FY 2025–26</p>
            </div>

            <div className="mt-6 overflow-x-auto [scrollbar-width:thin]">
              <table className="w-full min-w-[40rem] border-collapse text-left">
                <caption className="sr-only">
                  Government schemes IGC maps into a detailed project report, with
                  the maximum cover and ceiling published for each.
                </caption>
                <thead>
                  <tr className="border-b border-file-rule">
                    <th scope="col" className="file-mono py-3 pr-6 text-file-mute">
                      Scheme
                    </th>
                    <th scope="col" className="file-mono py-3 pr-6 text-file-mute">
                      Cover
                    </th>
                    <th scope="col" className="file-mono py-3 pr-6 text-file-mute">
                      Ceiling
                    </th>
                    <th scope="col" className="file-mono py-3 text-file-mute">
                      Applies to
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row) => (
                    <tr key={row.scheme} className="border-b border-file-rule">
                      <th
                        scope="row"
                        className="file-figure py-4 pr-6 text-[0.9375rem] font-medium text-file-ink"
                      >
                        {row.scheme}
                      </th>
                      <td className="py-4 pr-6 text-[0.9375rem]">{row.cover}</td>
                      <td className="py-4 pr-6 whitespace-nowrap">
                        <span className="file-figure text-[1.0625rem] font-medium text-file-ledger">
                          {row.ceiling}
                        </span>{" "}
                        <span className="text-[0.8125rem] text-file-mute">
                          {row.ceilingNote}
                        </span>
                      </td>
                      <td className="py-4 text-[0.9375rem] text-file-mute">
                        {row.applies}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-5 max-w-[46rem] text-[0.8125rem] leading-[1.6] text-file-mute">
              Figures are the published scheme maxima, not an entitlement. Cover
              and ceiling vary with applicant category, location and the
              constitution of the unit; each is verified against current
              guidelines at the time your report is prepared.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

/**
 * The signature element.
 *
 * A rectangular endorsement stamp rather than a circular seal — a bank sanction
 * is endorsed on the file, not sealed. The ragged edge is an SVG displacement
 * filter over the whole group, so it stays sharp at any size and ships no raster.
 *
 * The landed transform sits on the element in CSS and the arrival animation is
 * gated behind `.js`, so a no-JS visitor gets the stamp in place rather than an
 * empty column.
 */
function SanctionStamp() {
  return (
    <div className="flex justify-start lg:justify-end">
      <svg
        viewBox="0 0 300 168"
        role="img"
        aria-label="Endorsement stamp reading: sanctioned. ₹500 crore or more across 500 or more projects."
        className="file-stamp h-auto w-[17rem] max-w-full text-file-oxide sm:w-[19rem]"
      >
        <defs>
          <filter
            id="file-stamp-rag"
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="4"
              seed="11"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2.4"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        <g
          filter="url(#file-stamp-rag)"
          fill="none"
          stroke="currentColor"
          opacity="0.9"
        >
          <rect x="4" y="4" width="292" height="160" strokeWidth="5" />
          <rect x="15" y="15" width="270" height="138" strokeWidth="1.5" />
          <line x1="52" y1="118" x2="248" y2="118" strokeWidth="1.5" />

          <g
            fill="currentColor"
            stroke="none"
            textAnchor="middle"
            style={{ fontFamily: "var(--stack-plex)" }}
          >
            <text x="150" y="46" fontSize="11" fontWeight="600" letterSpacing="3.2">
              INDUSTRIAL GROWTH
            </text>
            <text x="150" y="99" fontSize="41" fontWeight="600" letterSpacing="1.5">
              SANCTIONED
            </text>
            <text x="150" y="140" fontSize="11.5" fontWeight="500" letterSpacing="2.4">
              ₹500+ Cr · 500+ PROJECTS
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
