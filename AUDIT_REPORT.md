# Hippocampus Website — Full Audit Report

**Date**: 2026-04-09
**Next.js Version**: 16.2.3 | **React**: 19.2.4 | **Tailwind**: v4
**TypeScript check**: PASS (0 errors) | **ESLint**: 5 errors, 10 warnings

---

## CRITICAL — Breaks functionality

### C-01: Broken links — 6 footer/CTA links point to non-existent routes

**Routes that exist**: `/` (home), `/le-club`

| File | Line | Broken href | Linked text |
|---|---|---|---|
| `components/layout/Footer.tsx` | 5 | `/activites` | Activites |
| `components/layout/Footer.tsx` | 6 | `/partenaires` | Partenaires |
| `components/layout/Footer.tsx` | 7 | `/faq` | FAQ |
| `components/layout/Footer.tsx` | 84 | `/mentions-legales` | Mentions Legales |
| `components/layout/Footer.tsx` | 90 | `/reglement-interieur` | Reglement Interieur |
| `components/sections/CTASection.tsx` | 33 | `/contact` | Devenir Membre |

**Impact**: Users clicking any of these 6 links land on the 404 page. The main CTA ("Devenir Membre") is broken.

### C-02: Broken links — `/contact` in Pricing and Values sections

| File | Line | Broken href | Linked text |
|---|---|---|---|
| `components/sections/Pricing.tsx` | 60 | `/contact` | Nous contacter |
| `components/sections/Pricing.tsx` | 95 | `/contact` | Nous contacter |
| `components/sections/Values.tsx` | 104 | `/contact` | Nous contacter |

**Impact**: All three "Nous contacter" buttons on the `/le-club` page lead to 404. They should point to `/le-club#contact`.

### C-03: Contact form does not actually send data

- **File**: `components/sections/ContactForm.tsx`, line 163-167
- **Issue**: `handleSubmit` uses a fake `setTimeout(800ms)` and then displays a success message. No actual form submission (no API route, no `mailto:`, no external service).
- **Impact**: Users fill out the form, see a success message, but nothing is sent anywhere. This is deceptive UX.

### C-04: ESLint error — Unescaped apostrophe breaks JSX

- **File**: `components/sections/Formations.tsx`, line 74
- **Issue**: Literal `'` character in JSX text (`l'eau`). ESLint error: `react/no-unescaped-entities`.
- **File**: `components/sections/Values.tsx`, line 102
- **Issue**: Literal `'` character in JSX text (`l'equipage`). Same error.
- **Impact**: While these may render in most browsers, they violate the JSX spec and some parsers/minifiers could choke on them. Inconsistent with the rest of the codebase which uses `&apos;` everywhere else.

---

## WARNING — Degraded experience

### W-01: ESLint error — setState called synchronously inside useEffect

- **File**: `components/layout/Navbar.tsx`, line 34
  - `setActiveSection(null)` called synchronously in effect body.
- **File**: `components/ui/ScrollReveal.tsx`, lines 85, 98
  - `setPrefersReducedMotion(mq.matches)` and `setRevealed(true)` called synchronously.
- **Impact**: Causes cascading renders. React 19's stricter linting flags this as an error. The initial `setPrefersReducedMotion` call should use `useState(() => ...)` initializer instead.

### W-02: Inconsistent use of `<img>` vs Next.js `<Image>` component

10 files use raw `<img>` tags. Only 2 files use `<Image>` from `next/image`:

| Usage | Files |
|---|---|
| `<img>` (raw HTML) | Navbar.tsx, Footer.tsx, Hero.tsx, Philosophy.tsx, SortiesFosse.tsx, Voyages.tsx (x2), Gallery.tsx (x2), not-found.tsx |
| `<Image>` (Next.js) | Formations.tsx, Values.tsx |

**Impact**: Raw `<img>` tags miss out on Next.js automatic image optimization (lazy loading, format conversion, responsive srcset). This is a significant performance hit for a media-heavy site. ESLint flags all 10 as warnings.

### W-03: Button component uses `<a>` instead of Next.js `<Link>` for internal navigation

- **File**: `components/ui/Button.tsx`, lines 93-105
- **Issue**: When `href` is provided, `Button` renders a plain `<a>` tag. For internal routes (e.g., `/contact`, `/le-club#contact`), this causes a full page reload instead of a client-side navigation.
- **Impact**: Navigation feels slower. Users see a flash of white/loading on every Button click.

### W-04: `#contact` anchor link behavior across pages

- **File**: `components/layout/Navbar.tsx`, line 152 & line 223 — `href="/le-club#contact"`
- **File**: `components/sections/Agenda.tsx`, line 26 — `href="/le-club#contact"`
- **Issue**: These links work because the `ContactForm` section has `id="contact"`. However, the `SortiesFosse.tsx` component (line 55) links to `/#agenda` using the `Button` component which renders a plain `<a>`, not a `<Link>`, so client-side hash navigation is broken on cross-page clicks.

### W-05: Gallery lightbox uses `<dialog open>` without `showModal()`

- **File**: `components/sections/Gallery.tsx`, lines 248-251
- **Issue**: The lightbox `<dialog>` element uses the `open` attribute directly instead of calling `dialogRef.current.showModal()`. This means:
  1. No `::backdrop` pseudo-element is rendered (the custom backdrop div compensates, but semantically incorrect).
  2. No native "top layer" behavior — the dialog could be obscured by other high-z-index elements.
  3. The `Escape` key handling is manual (line 94) instead of leveraging the browser's native dialog close behavior.
- **Impact**: Accessibility tools may not announce the dialog correctly. Focus trapping is manual and could have edge cases.

### W-06: Accessibility — low contrast text (opacity values below /40)

Multiple elements use very low opacity values that likely fail WCAG AA contrast:

| File | Line | Class/Value | Description |
|---|---|---|---|
| `Footer.tsx` | 79 | `text-on-surface/40` | Copyright text |
| `Footer.tsx` | 85 | `text-on-surface/40` | "Mentions Legales" link |
| `Footer.tsx` | 91 | `text-on-surface/40` | "Reglement Interieur" link |
| `ClubHistory.tsx` | 20 | `text-outline/40` | Photo caption |
| `Gallery.tsx` | 207 | `text-on-surface-variant/50` | Gallery location labels |
| `ContactForm.tsx` | 141 | `text-on-surface-variant/40` | Map location label |
| `FFESSMAffiliation.tsx` | 88 | `text-on-surface-variant/50` | Stat labels |
| `ClubHistory.tsx` | 61, 69 | `text-on-surface-variant/50` | Stat labels |
| `Values.tsx` | 67 | `text-on-surface/25` | Value numbers ("01", "02", "03") |

**Impact**: Text at 25-40% opacity on a dark background is extremely hard to read, especially for users with vision impairments. WCAG AA requires a contrast ratio of at least 4.5:1 for normal text.

### W-07: No `<label>` elements for form inputs

- **File**: `components/sections/ContactForm.tsx`, lines 30-42 (InputField), 60-82 (SelectField), 98-110 (TextareaField)
- **Issue**: Form fields use `placeholder` as the only label. No `<label>` elements are associated with any input. Placeholders disappear when the user starts typing.
- **Impact**: Screen readers cannot announce what each field is for. Sighted users lose context when fields have content.

### W-08: Open Graph image is a logo PNG, not a social preview card

- **File**: `app/layout.tsx`, line 42
- **Issue**: `images: [{ url: '/assets/photos/logo-cyan.png', width: 2048, height: 2048 }]` — Using a 2048x2048 logo as the OG image. Social platforms expect ~1200x630 preview cards.
- **Impact**: When the site is shared on Facebook, LinkedIn, Twitter etc., the preview will show a tiny logo stretched/cropped awkwardly.

### W-09: Security header missing — Content-Security-Policy

- **File**: `next.config.ts`
- **Issue**: Security headers include `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, but no `Content-Security-Policy` header. The site uses `dangerouslySetInnerHTML` for JSON-LD (line 75 of layout.tsx) and inline styles extensively.
- **Impact**: Without CSP, the site is more vulnerable to XSS attacks.

### W-10: `dangerouslySetInnerHTML` usage for JSON-LD

- **File**: `app/layout.tsx`, lines 75-96
- **Issue**: While JSON-LD structured data is correctly inserted via `dangerouslySetInnerHTML` with `JSON.stringify` (which is safe because JSON.stringify escapes HTML), this is still flagged as a security-sensitive pattern. Next.js 15+ has a native way to handle structured data.
- **Impact**: Low risk since data is static, but worth noting.

### W-11: Sitemap and robots.ts hardcode production URL

- **File**: `app/sitemap.ts`, line 4 — `const baseUrl = 'https://hippocampus-plongee.fr'`
- **File**: `app/robots.ts`, line 6 — `sitemap: 'https://hippocampus-plongee.fr/sitemap.xml'`
- **Issue**: URLs are hardcoded. If deployed to a staging domain, the sitemap/robots will still reference the production URL.
- **Impact**: Minor for production, but bad for staging/preview deployments.

---

## INFO — Minor inconsistencies / suggestions

### I-01: Inconsistent background color strategy — inline style vs class

All section components set their background via `style={{ backgroundColor: 'rgba(...)' }}`. This is intentional (comment in globals.css line 284-286 explains the canvas water effect shows through). However, the specific rgba values vary between components with no clear system:

| Component | Background alpha |
|---|---|
| Philosophy | `rgba(10, 21, 32, 0.85)` |
| Formations | `rgba(2, 10, 20, 0.85)` |
| SortiesFosse | `rgba(4, 14, 26, 0.85)` |
| Voyages | `rgba(2, 10, 20, 0.85)` |
| Gallery | `rgba(2, 10, 20, 0.85)` |
| Agenda | `rgba(4, 14, 26, 0.92)` |
| CTASection | `rgba(4, 14, 26, 0.85)` |
| Footer | `rgba(2, 10, 20, 0.92)` |
| Team | `rgba(4, 14, 26, 0.85)` |
| ClubHistory | `rgba(10, 21, 32, 0.85)` |
| FFESSMAffiliation | `rgba(2, 10, 20, 0.85)` |
| Pricing | `rgba(4, 14, 26, 0.85)` |
| Values | `rgba(2, 10, 20, 0.85)` |
| ContactForm | `rgba(10, 21, 32, 0.85)` |
| PageHero | `rgba(4, 14, 26, 0.85)` |

Three different base colors are used. These could be consolidated into CSS custom properties or Tailwind theme tokens for consistency.

### I-02: Named + default exports on many components

Most section components export both a named export and a default export:
```
export function Philosophy() { ... }
export default Philosophy;
```

This is not a bug, but it's inconsistent — `Hero.tsx` exports `Hero` as named and default, while `Navbar.tsx` only has a default export. Pick one pattern.

### I-03: `"use client"` directives — some could be server components

Components that could potentially be server components but are marked `"use client"`:

| File | Reason for "use client" | Could be server? |
|---|---|---|
| `Formations.tsx` | Only wraps `ScrollReveal` (which is client) | No (child is client, but it could be restructured) |
| `Voyages.tsx` | Only wraps `ScrollReveal` | Same |
| `SortiesFosse.tsx` | Only wraps `ScrollReveal` | Same |
| `Agenda.tsx` | Only wraps `ScrollReveal` | Same |

These are all valid uses of `"use client"` since they use client-side `ScrollReveal`. However, the section data (constants) could be extracted to server components with client children for optimal bundle splitting.

### I-04: Unused exports in `lib/constants.ts`

- `SITE_METADATA` (line 2) — not imported anywhere
- `PLACEHOLDER` (line 26) — not imported anywhere

These are dead code.

### I-05: Unused exports in `lib/animations.ts`

- `initScrollReveal` function (line 65) — not called anywhere
- `REVEAL_CONFIGS` (line 36) — not imported anywhere
- `DURATION` (line 17) — not imported anywhere
- Only `EASING.expo` is actually used (by ScrollReveal.tsx)

### I-06: Missing `role="dialog"` / `aria-modal="true"` on lightbox

- **File**: `components/sections/Gallery.tsx`, line 248
- **Issue**: The `<dialog>` element lacks `aria-modal="true"` and `aria-label` attributes.
- **Impact**: Minor accessibility issue.

### I-07: Mobile menu backdrop click handler on non-interactive div

- **File**: `components/layout/Navbar.tsx`, line 181
- **Issue**: `<div onClick={closeMobile}>` — a non-interactive `<div>` has a click handler without keyboard accessibility (no `role="button"`, no `tabIndex`, no `onKeyDown`).
- **Impact**: Keyboard-only users cannot close the mobile menu by interacting with the backdrop (they can use the close button).

### I-08: WaterBackground isMobile check only runs once

- **File**: `components/ui/WaterBackground.tsx`, line 48
- **Issue**: `const isMobile = window.innerWidth < 768` is computed once in the effect. If a user resizes from desktop to mobile (or vice versa), the octave count and scale factor won't update.
- **Impact**: Minor — affects performance tuning on resize, not correctness.

### I-09: Hero component has multiple `<h1>` tags

- **File**: `components/sections/Hero.tsx`, lines 111, 179
- **Issue**: The Hero renders up to 3 panels, each with its own `<h1>`. While only one is visually visible at a time (opacity-controlled), all are in the DOM simultaneously.
- **Impact**: SEO tools may flag multiple h1 tags on the page.

### I-10: Hardcoded copyright year

- **File**: `components/layout/Footer.tsx`, line 80
- **Issue**: `© 2026 HIPPOCAMPUS` — hardcoded year. Will be outdated next year.
- **Suggestion**: Use `new Date().getFullYear()` (requires "use client" or a server component that passes the year).

### I-11: `tsconfig.json` uses `"jsx": "react-jsx"` instead of `"preserve"`

- **File**: `tsconfig.json`, line 14
- **Issue**: Next.js projects typically use `"jsx": "preserve"` and let Next.js handle JSX transformation. Using `"react-jsx"` may conflict with Next.js's built-in JSX handling.
- **Impact**: Appears to work in practice (TypeScript check passes), but deviates from the default Next.js tsconfig template.

### I-12: Remote image patterns configured but unused

- **File**: `next.config.ts`, lines 5-13
- **Issue**: `remotePatterns` for `googleusercontent.com` and `images.unsplash.com` are configured, but no component uses external images from these domains.
- **Impact**: Dead config.

### I-13: Marquee text has very low opacity

- **File**: `components/ui/Marquee.tsx`, line 29
- **Issue**: `text-on-surface/20` — 20% opacity text. Barely visible.
- **Impact**: This is likely intentional as a decorative element, but at 20% opacity it's essentially invisible to many users.

---

## Summary

| Severity | Count |
|---|---|
| CRITICAL | 4 issues (9 broken links, 1 fake form, 2 unescaped entities) |
| WARNING | 11 issues |
| INFO | 13 issues |

### Top 3 actions to prioritize:
1. **Fix all broken links** — 9 href values point to non-existent pages (C-01, C-02)
2. **Implement actual form submission** or add a mailto: fallback (C-03)
3. **Address accessibility** — add form labels, fix contrast ratios, fix dialog semantics (W-06, W-07, W-05)
