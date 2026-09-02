# ICF — Industrial Consultancy Firm

Rebuild of the ICF marketing site. Next.js 15 (App Router) + Tailwind v4, statically rendered.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

Copy `.env.example` to `.env.local` if you want form submissions delivered somewhere. Nothing
in it is required to run the site.

## Status

**Four pages are built: `/`, `/about`, `/services` and `/sectors`.** Every other route the
shell links to resolves to a placeholder (`app/(corporate)/[...slug]/page.tsx`) so navigation
never 404s; genuinely unknown paths still return a real 404. `/industries` is the former path
of `/sectors` and 308-redirects to it (`next.config.ts`).

`/partners` is **hidden for now**: the page still exists at `app/(corporate)/partners/` but is
unlinked from the nav and footer, kept out of `builtRoutes` (so out of the sitemap), and set
`noindex`. `components/partners/PartnersBand.tsx` — the site-wide "Delivery partners" band
(Quiet Seven and Substrate) — is no longer rendered by the `(corporate)` layout. Copy lives in
`content/partners.ts`. To bring it all back: re-add `/partners` to `builtRoutes`, re-add the
nav/footer links in `content/site.ts`, re-render `<PartnersBand />` in the layout, and flip the
page's `robots` back to `index: true`.

Shipping a page is one edit: add its path to `builtRoutes` in `content/site.ts`. That array is
the single switch — it removes the path from the stub catch-all (two prerenders of the same
path collide at build time) and adds it to `app/sitemap.ts`, which the stubs stay out of
because they are `noindex`.

The homepage is structured against `solutionbuggy.com`, the closest competitor: proof before
pitch, and one lead-capture form on the page rather than a link to `/contact`. Section order
lives in `app/(corporate)/page.tsx` and the reasoning is in the comment there.

`/services` has no counterpart on the reference site — they are a marketplace matching
manufacturers to independent consultants, so their nav is organised by industry and has no
services menu at all. That page follows ICF's own IA instead. See
`app/(corporate)/services/page.tsx`.

## ⚠️ Placeholder data

`content/site.ts` and `content/home.ts` carry copy that is partly **fictional**. Both files are
marked `TODO(real-data)`. Before pointing a public domain at this build, replace:

- `contact` in `content/site.ts` — phone numbers, street address and email addresses are
  invented (`+91 98765 43210`, `101, Industrial Complex, MG Road`).
- `testimonials` in `content/home.ts` — named individuals and companies with specific,
  unverified claims.
- `projects` in `content/home.ts` — every project, sector and rupee figure is invented.
  Confirm the client is willing to have a project value published before using a real one.
- `clients` in `content/home.ts` — invented company names, rendered as type because there are
  no logo assets and no `public/` directory. Real logos need clearance to use.

The service, sector, statistics and SEO-narrative copy is legitimate domain content and can
stay, as is everything in `content/services.ts` — it describes the work rather than attributing
anything to a named client, so it carries no `TODO(real-data)`.

Two things are deliberately missing from `content/services.ts` and should only be added once the
business has committed to them: **turnaround times** in days or weeks, and **fees**. A page
cannot promise a date it has not scoped, and pricing is quoted per engagement.

`footerServiceLinks` in `content/site.ts` is hand-maintained and lists the six `featured`
services (project consultancy, DPR, loan & subsidy, machinery, factory setup, AI) — it is not
derived from `services`, so keep the two in step by hand if the footer list should change.
These six slugs are also the only `/services/<slug>` stubs that resolve; the rest 404.

### About the photography

Every image is a remote Pexels URL (whitelisted in `next.config.ts`); there are no local assets.
The sector and project photographs are **library stock, not ICF sites**, so each `alt` describes
what is in the frame rather than restating the sector or claiming to show the delivered plant.
Project cards additionally carry a visible "Illustrative" marker — remove it in
`components/home/ProjectsShowcase.tsx` when real project photography lands.

## Design system

"Corporate Professional": white canvas, navy structure, one blue accent. Tokens live in the
`@theme` block of `app/globals.css` — Tailwind v4 is CSS-first, so there is **no
`tailwind.config.js`**.

Two blues, deliberately:

| Token | Value | Use |
|---|---|---|
| `--color-blue` | `#1a56a8` | light backgrounds (7.1:1 on canvas; white on it is 4.8:1) |
| `--color-blue-light` | `#6aa9f0` | dark backgrounds only (6.3:1 on navy) |

`#1a56a8` is **2.2:1 on navy and fails AA there**, so any section on a dark surface must use
`text-blue-light`. Those sections carry an `on-dark` class, which flips the focus ring to
`blue-light` and forces `h1/h2/h3` to white. `Button` has four variants for the same reason.

Small text must not go below `--color-slate-muted` `#5d6b7e` (5.4:1). This is the one rule the
Lighthouse accessibility score is actually sensitive to — a faded logo-grey in `ClientLogos`
measured 2.9:1 and cost 3 points before it was corrected.

**Never write `focus:outline-none`.** The global `:focus-visible` rule is the site's focus
indicator and `.on-dark` re-targets it to `blue-light`; suppressing the outline and tinting a
1px border instead is not a substitute, and Lighthouse does not catch it. Every text input on
the site had exactly that before it was fixed. Walking the tab order and asserting a non-zero
`outlineWidth` on each stop is the check — see Verified below.

### Display scale

| Utility | Ceiling | Used by |
|---|---|---|
| `display-hero` | 3.125rem / 50px | hero H1 only |
| `display-lg` | 2.5rem / 40px | section H2s |
| `display-md` | 1.375rem / 22px | card titles |
| `display-xl` | 4rem | 404 and stub-route H1s |

Width caps on hero copy are in `rem`, **not** `ch` — a `ch` cap is measured against whichever
font is currently active, so the fallback and the loaded Archivo wrap at different points and
the font swap shifts layout (this cost 0.052 CLS before the fix).

### Hero and the overlapping stats card

The hero is a full-bleed photographic masthead under `hero-scrim`, an *angled* navy gradient:
94% at the left edge where the copy sits, easing to 50% at the right so the plant stays legible.
A flat wash dark enough for the headline turns the photograph into a texture.

The plate is `components/home/HeroBackdrop.tsx`, a crossfading slideshow — one frame per
manufacturing process, copy in `hero.slides` (`content/home.ts`). It is progressively enhanced
so the verified LCP/CLS numbers hold: the server renders **slide 0 only**, as the same
`<Image priority>` element the hero always had (the LCP); the rest mount a tick after
hydration and only when motion is allowed, so they never join the LCP fetch and never
download under `prefers-reduced-motion` or with JS off — either case leaves one static plate.
Every slide is `absolute inset-0`, so frame swaps cannot shift layout. Auto-advance (~6s)
carries a pause/play control top-right (WCAG 2.2.2) beside a pill naming the current process,
and stops while the tab is hidden. `usePrefersReducedMotion` moved to `lib/` — `Carousel`
uses the same hook.

`StatsBand` is pulled up over the hero's lower edge with a negative margin. The hero carries
matching oversized bottom padding — change one and you must change the other.

## Carousels

`components/ui/Carousel.tsx` wraps Embla and is the only carousel implementation; four sections
use it. Embla ships no accessibility, so the wrapper owns all of it: `role="group"` +
`aria-roledescription`, labelled prev/next buttons with disabled end states, and `duration: 0`
plus no auto-scroll plugin under `prefers-reduced-motion`.

Off-screen slides deliberately stay in the DOM and stay tab-reachable. Most hold links, and
`aria-hidden`-ing them would leave focusable elements inside a hidden subtree — an axe violation
that also strands keyboard users mid-rail. Their images stay lazy and load when scrolled to.

`ProjectsShowcase` drives the same component from a real tablist: one tab stop, arrow keys to
move and select, Home/End, and wrap-around.

## The services page

The catalogue is the client's full **twenty-service list** — project consultancy, market
research and DPR; government loan and subsidy; project and product costing; machinery, factory
setup and plant layout; production improvement, expansion and turnaround; industrial automation,
AI and digital marketing. There are no sector-specific services (the earlier plastics / brewery
/ cold storage / biogas / waste entries were dropped) — sector nuance lives on `/sectors`.

`/services` runs: navy masthead with a grouped in-page anchor nav → the twenty services in
**five themed sections** → the five-stage process → sector chips → enquiry form → FAQ → closing
CTA. `serviceGroups` in `content/services.ts` is the grouping source of truth: it lists the
sections and the slugs in each, `ServiceDetails` and `ServiceJumpNav` render from it, and a
compile guard fails the build if a `ServiceSlug` is missing from every group.

`content/home.ts` exports a closed `ServiceSlug` union and `content/services.ts` keys its
long-form copy by it (a `Record<ServiceSlug, ServiceDetail>` total map), so adding a service
without writing its detail is a **type error rather than an empty block** in the browser.
`Service.href` is derived from the slug in the same file; the two cannot drift. `Service.featured`
splits the list: the **six** shown in the homepage grid, the harbour spike and the `/sectors`
service strip are `featured` (project consultancy, DPR, loan & subsidy, machinery, factory setup,
AI); the other fourteen are `/services`-only.

The `/services/<slug>` detail routes are still stubs — only the ones in `footerServiceLinks`
(the same six as `featured`) actually resolve, the rest 404 (nothing links them; the jump nav
uses `#<slug>` anchors). The depth that will eventually live on them is on this page, anchored by
slug — `/services#detailed-project-report` works today and keeps working when those pages ship.
Every per-service CTA points at `#enquiry` on the same page rather than at its own stub, because
the form there is real and the stub is not.

## The sectors page

`/sectors` is the second axis of the same offer: `/services` is organised by what ICF does,
this page by what the client makes. It runs: navy masthead with a sector jump-nav → the
"from concept to commercial production" intro → every sector at length → services cross-strip
→ enquiry form → FAQ → closing CTA.

The sector list and the per-sector copy follow the client's own **"Sectors We Serve"**
document — ~22 sectors, in that document's order. `content/home.ts` exports the closed
`SectorSlug` union (`sectorSlugs`) and `content/sectors.ts` keys `sectorDetails` by
it, so a sector without its detail copy is a type error. Each sector detail is deliberately
thin: `lede` (the document's one-line intro), `body` (its consultancy sentence) and `units`
(its project list, verbatim where possible) — no analytical "what decides viability" column.

There are no `/sectors/<slug>` routes; every sector is an in-page `#<slug>` anchor, and the
`ItemList` JSON-LD lists them as `ListItem`, not `Service`. The page copy is count-neutral
("the sectors", not "the ten sectors") so the list can grow without a copy sweep. Sector
photos are a small reused pool of stock URLs — more sectors than photographs, so some repeat;
each `alt` still describes the frame.

The page was `/industries` until the rename; `next.config.ts` permanently redirects the old
path (and `/industries/*`) to `/sectors`.

`components/ui/PageHeader.tsx` is the interior-page masthead and is meant to be reused. It is
solid navy with a radial wash, not the homepage's photographic plate: the homepage has to stop a
stranger so it spends an LCP image doing it, while an interior page has already been chosen from
the nav. A flat band paints immediately.

The FAQ is native `<details>`/`<summary>` — a disclosure widget, keyboard-operable and correctly
announced without a line of ARIA or a byte of JavaScript. The `.faq` rules in `globals.css` only
drop the default marker and turn the chevron over. The `FAQPage` structured data is generated
from the same array the rows render from, so the schema a crawler reads and the text a visitor
reads cannot diverge — hand-written JSON-LD that has quietly drifted from the page is the usual
way a rich result gets pulled.

## Enquiry form

`components/home/EnquiryForm.tsx` posts to `app/api/enquiry/route.ts`. Validation lives in
`lib/enquiry.ts` and is imported by both, so a field can never pass in the browser and fail on
the server with a different message.

Both the homepage and `/services` render the same component with their own `heading`/`body`.
Only the framing copy is overridable — fields, validation and endpoint are fixed, because a lead
from either page has to reach the same place.

Delivery is pluggable and currently unwired. Set `ENQUIRY_WEBHOOK_URL` and payloads are POSTed
there as JSON; with it unset they are written to the server log, so the form works end to end in
development. To deliver by email instead, edit `deliver()` — it is the single place delivery
happens.

Order of checks is honeypot → validate → rate limit → deliver. Validation runs **before** the
limiter on purpose: someone fixing a mistyped email should not spend their hourly quota doing
it. The limiter is an in-memory `Map`, so it is per-instance and resets on redeploy — a speed
bump, not a defence. Put a real limiter at the edge before this endpoint matters.

## Motion and no-JS

Scroll reveals are hidden by CSS gated behind a `.js` class that an inline script in
`app/layout.tsx` stamps on `<html>` before first paint. Without JavaScript the class never lands
and every revealed element renders visible — content is never stranded at opacity 0. Everything
is disabled under `prefers-reduced-motion: reduce`.

The stat counters render their final values on the server (`components/ui/Counter.tsx`); the
count-up animation mutates `textContent` after hydration. Crawlers and no-JS visitors always
read `500+`, never `0+`.

> **Testing note.** Driving these pages from a script needs two things, and both look like page
> defects when you get them wrong.
>
> `html` has `scroll-behavior: smooth`, so a scripted `window.scrollTo(0, y)` loop *animates* and
> never settles — reveals appear not to fire and most of the page looks blank in a full-page
> screenshot. Pass `behavior: 'instant'`.
>
> Then pace the loop with `requestAnimationFrame`, not a bare `setTimeout`. `IntersectionObserver`
> delivers on a frame; a tight jump loop can outrun it and leave a third of the reveals reading
> as hidden on a page where every one of them fires normally.

## Alternate design directions

Three unshipped spikes live behind route groups, all `noindex` and none linked from the live
site: `/preview/file` ("The Sanction File"), `/preview/datum` ("Datum"), and `/harbour`
("Harbour", a complete second homepage with its own chrome). Their CSS is scoped under
`.theme-file` / `.theme-datum` / `.theme-harbour` in `globals.css`, outside `@layer base` so it
wins on layer order without `!important`. Deleting a route group deletes its font downloads too.

`content/harbour.ts` re-exports `stats`, `services` and `sectors` from `content/home.ts` —
those are single-source-of-truth. Changing the shape of `sectors` means updating
`components/harbour/Sectors.tsx` as well.

## Dependencies

Three runtime dependencies beyond React: `next`, `react`, `react-dom`, plus
`embla-carousel-react` and `embla-carousel-auto-scroll`.

There is no UI library, no icon package, no animation library, and no validation library. Every
icon is hand-authored inline SVG (`components/ui/ServiceIcon.tsx` plus locals). Keep it that way
unless something genuinely cannot be built in a hundred lines.

## Verified

Against the production build (`npm run build && npm run start`):

- Build clean, 27 static pages; **129 kB** first-load JS on `/` and **113 kB** on `/services`,
  both prerendered static, `/api/enquiry` dynamic
- Lighthouse mobile on `/partners` (while it was linked): accessibility / best practices / SEO
  / agentic browsing 100, 0 failed audits. Now hidden — see Status.
- Lighthouse mobile on `/services`: accessibility 100, best practices 100, SEO 100, agentic
  browsing 100, **0 failed audits**. On `/`: accessibility / SEO / agentic browsing 100; the only
  best-practices failure was an `errors-in-console` from prefetching the unbuilt `/subsidies`
  route, now removed from the hero quick-links and closing CTA. Re-run the `/` audit to reconfirm
  best practices 100 — note `Testimonials` still links the unbuilt `/success-stories`, below the
  fold so it did not trip the audit, but worth resolving with the rest of the stub routes
- CLS 0.00 on both, measured with a `layout-shift` observer
- No horizontal overflow at 375 / 768 / 1440 / 1920; shell caps at 1480px. The only element
  outside the viewport is the form honeypot, deliberately
- Every scroll reveal fires on `/services` (twenty service blocks in five groups) with
  rAF-paced scrolling; nothing left at opacity 0. A tight scroll loop outruns the
  `IntersectionObserver` and looks like a defect — see the Testing note
- Enquiry API: field-level 400s, honeypot silently 200s, valid submit delivers and logs, phone
  normalised to digits, 429 after 5 *valid* submissions per hour, invalid submissions do not
  consume quota
- Enquiry form on both pages: empty submit shows four inline errors, moves focus to the first
  invalid field, wires `aria-invalid` / `aria-describedby`, swaps to an announced success state,
  and every field carries a visible focus ring
- Focus ring present on every focusable element; ~85 focus stops inside `<main>` on `/services`
  (grouped 20-chip jump nav, 20 "Discuss this service" links, 9 FAQ summaries)
- `/services`: one `<h1>` and a clean outline — `h2` per group, `h3` per service, `h4` for the
  card labels, no skips; jump anchors and per-service `#enquiry` links land clear of the sticky
  header; FAQ rows open on Enter and close on Space; every answer is in the server HTML, so the
  `FAQPage` schema matches text a crawler can actually read
- Structured data on `/services`: `BreadcrumbList`, `ItemList` of **twenty** `Service` items,
  `FAQPage` with **nine** questions
- `/harbour`, `/preview/file`, `/preview/datum` still render; unknown paths still 404
- Mobile menu traps focus, closes on Escape, restores focus and body scroll
