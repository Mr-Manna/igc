# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing site for IGC (Industrial Consultancy Firm), a rebuild. Next.js 15 (App Router) +
React 19 + Tailwind v4, statically rendered. No database, no CMS — all copy lives in `content/`.

**`README.md` is the design and architecture spec and is kept current.** Read it before any
non-trivial change — it documents the contrast system, the placeholder-data situation, the
carousel/FAQ/enquiry patterns, and the exact production numbers the build is held to. This file
only covers what the README doesn't.

## Commands

```bash
npm install
npm run dev                 # http://localhost:3000
npm run build && npm run start   # production build + serve; build also runs the full TS/type check
npx tsc --noEmit            # type-check only, faster than a full build
```

There is **no test runner, no ESLint, no Prettier config**. Verification is manual: `npm run
build` for type + prerender errors, then Lighthouse and the scripted checks listed under
"Verified" in the README. When driving the pages from a script, heed the "Testing note" in the
README (`behavior: 'instant'` scrolling, `requestAnimationFrame` pacing) or reveals look broken.

## Architecture

**Route groups carry chrome, not the root layout.** `app/layout.tsx` owns only `<html>`/`<body>`,
fonts, the global JSON-LD, the skip link, and the inline `.js`-stamping script. Each group under
`app/` supplies its own shell and `<main>` landmark:
- `app/(corporate)/` — the live site (`UtilityBar` + `Header` + `Footer` + `FloatingActions`).
- `app/(harbour)/` and `app/(studio)/` — unshipped design spikes (`/harbour`, `/preview/file`,
  `/preview/datum`), all `noindex`, none linked from the live site. Their CSS is scoped under
  `.theme-*` in `globals.css`. Safe to delete a whole group.

**`content/` is the single source of truth.** Typed closed unions enforce consistency: e.g.
`content/home.ts` exports `ServiceSlug`, and `content/services.ts` keys long-form copy by it, so
adding a service without its detail copy is a *type error*, not an empty block. `content/harbour.ts`
re-exports `stats`/`services`/`industries` from `content/home.ts` — don't fork them.

**`builtRoutes` in `content/site.ts` is the one switch that ships a page.** It (a) removes the
path from the `app/(corporate)/[...slug]/page.tsx` stub catch-all — two prerenders of one path
collide at build time — and (b) adds it to `app/sitemap.ts`. Stubs stay out of the sitemap
because they're `noindex`. Genuinely unknown paths still 404 (`dynamicParams = false`).
Currently built: `/`, `/about`, `/services`, `/industries`.

**Enquiry form validation is shared.** `lib/enquiry.ts` is imported by both
`components/home/EnquiryForm.tsx` and `app/api/enquiry/route.ts` so a field can't pass client-side
and fail server-side with a different message. The API route's `deliver()` is the single place
delivery happens — unset `ENQUIRY_WEBHOOK_URL` logs to server console (works end to end in dev).

**Path alias:** `@/*` → repo root.

## Conventions that will bite you

- **Never write `focus:outline-none`.** The global `:focus-visible` rule *is* the site's focus
  indicator; `.on-dark` sections re-target it to `blue-light`. See README "Design system".
- **Two blues, by contrast requirement.** `--color-blue` (`#1a56a8`) fails AA on navy; dark
  surfaces must use `text-blue-light` and carry the `on-dark` class. `Button` has four variants
  for this reason.
- **Tailwind v4 is CSS-first — there is no `tailwind.config.js`.** All tokens live in the
  `@theme` block of `app/globals.css`.
- **Width caps on hero/display copy are in `rem`, not `ch`** — a `ch` cap shifts on font swap
  (cost 0.052 CLS before the fix).
- **No UI/icon/animation/validation libraries.** Icons are hand-authored inline SVG. Only
  runtime deps beyond React: `next`, `embla-carousel-react`, `embla-carousel-auto-scroll`.
  `components/ui/Carousel.tsx` is the only carousel wrapper and owns all the a11y Embla lacks.
- **FAQ = native `<details>` + `FAQPage` JSON-LD generated from the same array** it renders
  from. `components/faq/FaqSection.tsx` is the shared one; services/industries keep their own.
- **Images are all remote Pexels URLs** (whitelisted in `next.config.ts`); there is no `public/`
  directory and no local assets.

## Placeholder data — do not treat as real

`content/site.ts` (`contact`, `social`) and parts of `content/home.ts` (`testimonials`,
`projects`, `clients`) are **fictional**, marked `TODO(real-data)`. Phone numbers, address,
testimonial names, and every project/rupee figure are invented. See README "⚠️ Placeholder data"
before publishing anything or citing these values.
