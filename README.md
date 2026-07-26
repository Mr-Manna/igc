# IGC — Industrial Growth Consultancy

Rebuild of the IGC marketing site. Next.js 15 (App Router) + Tailwind v4, statically rendered.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

## Status

**The homepage is the only page built.** Every other route the shell links to resolves
to a placeholder (`app/[...slug]/page.tsx`) so navigation never 404s; genuinely unknown
paths still return a real 404. Those stubs are `noindex` and are deliberately kept out
of `app/sitemap.ts` — add each one there as it ships.

## ⚠️ Placeholder data

`content/site.ts` and `content/home.ts` carry the previous site's copy verbatim, and
some of it is **fictional**. Both files are marked `TODO(real-data)`. Before pointing a
public domain at this build, replace:

- `contact` in `content/site.ts` — phone numbers, street address and email addresses are
  invented (`+91 98765 43210`, `101, Industrial Complex, MG Road`).
- `testimonials` in `content/home.ts` — named individuals and companies with specific,
  unverified claims.

The service, industry and statistics copy is legitimate domain content and can stay.

## Design system

"Industrial Editorial": graphite canvas, ivory sections, one molten-orange accent,
oversized condensed display type. Tokens live in the `@theme` block of `app/globals.css`
— Tailwind v4 is CSS-first, so there is no `tailwind.config.js`.

Two oranges, deliberately:

| Token | Value | Use |
|---|---|---|
| `--color-accent` | `#ff4d1a` | dark backgrounds only (5.8:1 on graphite) |
| `--color-accent-ink` | `#b83a08` | text on light backgrounds (5.1:1 on ivory) |

`#ff4d1a` is only 2.9:1 on ivory and fails AA there, so light sections must use
`text-accent-ink`. Sections that sit on ivory carry an `on-light` class, which also
switches the focus ring to the darker orange.

Structure comes from hairline rules rather than card borders and shadows — there is no
`shadow-*` in the codebase.

### Display scale

The hero is a full-bleed photographic masthead: the image carries the scale, so the
headline sits at a restrained size instead of poster-compressed. The steps are capped so
nothing outsizes the H1:

| Utility | Ceiling | Used by |
|---|---|---|
| `display-hero` | 3.75rem / 60px | hero H1 only |
| `display-lg` | 2.75rem / 44px | section H2s |
| `display-xl` | 8.5rem | 404 and stub-route H1s (no competing image) |

Stat figures cap at 3.5rem, also below the H1.

Width caps on hero copy are in `rem`, **not** `ch` — a `ch` cap is measured against
whichever font is currently active, so the fallback and the loaded Archivo wrap at
different points and the font swap shifts layout (this cost 0.052 CLS before the fix).

## Motion and no-JS

Scroll reveals are hidden by CSS gated behind a `.js` class that an inline script in
`app/layout.tsx` stamps on `<html>` before first paint. Without JavaScript the class
never lands and every revealed element renders visible — content is never stranded at
opacity 0. Everything is disabled under `prefers-reduced-motion: reduce`.

The stat counters render their final values on the server (`components/ui/Counter.tsx`);
the count-up animation mutates `textContent` after hydration. Crawlers and no-JS visitors
always read `500+`, never `0+`.

## Verified

- `npm run build` clean, 25 static pages, 112 kB first-load JS
- Lighthouse mobile: accessibility 100, best practices 100, SEO 100, agentic browsing 100,
  0 failed audits
- CLS 0.00, measured with a `layout-shift` observer against the production build
- No horizontal overflow at 375 / 768 / 1440 / 1920
- Mobile menu traps focus, closes on Escape, restores focus and body scroll
