# IGC — Industrial Consultancy Firm

Rebuild of the IGC marketing site. Next.js 15 (App Router) + Tailwind v4, statically rendered.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

Copy `.env.example` to `.env.local` if you want form submissions delivered somewhere. Nothing
in it is required to run the site.

## Status

**Two pages are built: `/` and `/services`.** Every other route the shell links to resolves to a
placeholder (`app/(corporate)/[...slug]/page.tsx`) so navigation never 404s; genuinely unknown
paths still return a real 404.

Shipping a page is one edit: add its path to `builtRoutes` in `content/site.ts`. That array is
the single switch — it removes the path from the stub catch-all (two prerenders of the same
path collide at build time) and adds it to `app/sitemap.ts`, which the stubs stay out of
because they are `noindex`.

The homepage is structured against `solutionbuggy.com`, the closest competitor: proof before
pitch, and one lead-capture form on the page rather than a link to `/contact`. Section order
lives in `app/(corporate)/page.tsx` and the reasoning is in the comment there.

`/services` has no counterpart on the reference site — they are a marketplace matching
manufacturers to independent consultants, so their nav is organised by industry and has no
services menu at all. That page follows IGC's own IA instead. See
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

The service, industry, statistics and SEO-narrative copy is legitimate domain content and can
stay, as is everything in `content/services.ts` — it describes the work rather than attributing
anything to a named client, so it carries no `TODO(real-data)`.

Two things are deliberately missing from `content/services.ts` and should only be added once the
business has committed to them: **turnaround times** in days or weeks, and **fees**. A page
cannot promise a date it has not scoped, and pricing is quoted per engagement.

`footerServiceLinks` in `content/site.ts` advertises a seventh service, Business Consultancy,
that does not exist in `services` and so is absent from `/services`. Either add it to
`content/home.ts` and `content/services.ts` or drop the footer link — right now the footer
promises something the services page does not cover.

### About the photography

Every image is a remote Pexels URL (whitelisted in `next.config.ts`); there are no local assets.
The sector and project photographs are **library stock, not IGC sites**, so each `alt` describes
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

`/services` runs: navy masthead with in-page anchors → the six services at length → the
five-stage process → sector chips → enquiry form → FAQ → closing CTA.

`content/home.ts` exports a closed `ServiceSlug` union and `content/services.ts` keys its
long-form copy by it, so adding a service without writing its detail is a **type error rather
than an empty block** in the browser. `Service.href` is derived from the slug in the same file;
the two cannot drift.

The six `/services/<slug>` detail routes are still stubs. The depth that will eventually live on
them is on this page, anchored by slug — `/services#loan-consultancy` works today and keeps
working when those pages ship. Every per-service CTA points at `#enquiry` on the same page
rather than at its own stub, because the form there is real and the stub is not.

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

`content/harbour.ts` re-exports `stats`, `services` and `industries` from `content/home.ts` —
those are single-source-of-truth. Changing the shape of `industries` means updating
`components/harbour/Sectors.tsx` as well.

## Dependencies

Three runtime dependencies beyond React: `next`, `react`, `react-dom`, plus
`embla-carousel-react` and `embla-carousel-auto-scroll`.

There is no UI library, no icon package, no animation library, and no validation library. Every
icon is hand-authored inline SVG (`components/ui/ServiceIcon.tsx` plus locals). Keep it that way
unless something genuinely cannot be built in a hundred lines.

## Verified

Against the production build (`npm run build && npm run start`):

- Build clean, 29 static pages; **127 kB** first-load JS on `/` and **112 kB** on `/services`,
  both prerendered static, `/api/enquiry` dynamic
- Lighthouse mobile on **both** `/` and `/services`: accessibility 100, best practices 100,
  SEO 100, agentic browsing 100, **0 failed audits**
- CLS 0.00 on both, measured with a `layout-shift` observer
- No horizontal overflow at 375 / 768 / 1440 / 1920; shell caps at 1480px. The only element
  outside the viewport is the form honeypot, deliberately
- Every scroll reveal fires — 59 on `/`, 74 on `/services`; no element left hidden
- Enquiry API: field-level 400s, honeypot silently 200s, valid submit delivers and logs, phone
  normalised to digits, 429 after 5 *valid* submissions per hour, invalid submissions do not
  consume quota
- Enquiry form on both pages: empty submit shows four inline errors, moves focus to the first
  invalid field, wires `aria-invalid` / `aria-describedby`, swaps to an announced success state,
  and every field carries a visible focus ring
- Focus ring present on every focusable element: 46 stops inside `<main>` on `/services`, 87
  across the whole document including the shell
- `/services`: one `<h1>` and a clean `h2`/`h3` outline; jump anchors and per-service `#enquiry`
  links land 96px down, clear of the 73px sticky header; FAQ rows open on Enter and close on
  Space; all eight answers are in the server HTML, so the `FAQPage` schema matches text a
  crawler can actually read
- Structured data on `/services`: `BreadcrumbList`, `ItemList` of six `Service` items, `FAQPage`
  with eight questions
- `/harbour`, `/preview/file`, `/preview/datum` still render; unknown paths still 404
- Mobile menu traps focus, closes on Escape, restores focus and body scroll
