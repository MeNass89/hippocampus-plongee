# Mobile Optimization — Chill Edition

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Hippocampus website feel native on mobile (< 768px) without touching a single desktop pixel.

**Architecture:** Pure Tailwind class additions using `max-md:` prefix (Tailwind v4) to target only mobile. No structural changes, no new components, no logic changes. Every edit is additive responsive classes.

**Tech Stack:** Tailwind CSS v4 (`max-md:` prefix), Next.js 16

**Principle:** If a class doesn't have `max-md:` or `max-lg:`, don't touch it. Desktop stays identical.

---

### Task 1: Section Spacing — Reduce vertical padding on mobile

Every section uses `py-24 md:py-32` (96px on mobile). That's a lot of dead space on a 390px-wide screen. Reduce to `py-16` on mobile (64px) — still generous, but less scrolling.

**Files:**
- Modify: `components/sections/Philosophy.tsx`
- Modify: `components/sections/Formations.tsx`
- Modify: `components/sections/Gallery.tsx`
- Modify: `components/sections/Voyages.tsx`
- Modify: `components/sections/SortiesFosse.tsx`
- Modify: `components/sections/CTASection.tsx`
- Modify: `components/sections/ContactForm.tsx`
- Modify: `components/sections/Values.tsx`
- Modify: `components/sections/Team.tsx`
- Modify: `components/sections/Pricing.tsx`
- Modify: `components/sections/FFESSMAffiliation.tsx`
- Modify: `components/sections/Agenda.tsx`
- Modify: `components/sections/ClubHistory.tsx`
- Modify: `components/layout/Footer.tsx`

- [ ] **Step 1: Change `py-24` to `py-16 md:py-24` across all sections**

In every section component listed above, find the root `<section>` (or `<footer>`) tag and replace `py-24 md:py-32` with `py-16 md:py-32`. This gives mobile 64px padding instead of 96px, while desktop stays at 128px.

Exact replacements for each file:

**Philosophy.tsx** — line 5:
```
py-24 md:py-32  →  py-16 md:py-32
```

**Formations.tsx** — line 30:
```
py-24 md:py-32  →  py-16 md:py-32
```

**Gallery.tsx** — line 129:
```
py-24 md:py-32  →  py-16 md:py-32
```

**Voyages.tsx** — line 35:
```
py-24 md:py-32  →  py-16 md:py-32
```

**SortiesFosse.tsx** — line 13:
```
py-24 md:py-32  →  py-16 md:py-32
```

**CTASection.tsx** — line 7:
```
py-24 md:py-32  →  py-16 md:py-32
```

**ContactForm.tsx** — line 196:
```
py-24 md:py-32  →  py-16 md:py-32
```

**Values.tsx** — line 34:
```
py-24 md:py-32  →  py-16 md:py-32
```

**Team.tsx** — line 30:
```
py-24 md:py-32  →  py-16 md:py-32
```

**Pricing.tsx** — line 14:
```
py-24 md:py-32  →  py-16 md:py-32
```

**FFESSMAffiliation.tsx** — line 17:
```
py-24 md:py-32  →  py-16 md:py-32
```

**Agenda.tsx** — line 8:
```
py-24 md:py-32  →  py-16 md:py-32
```

**ClubHistory.tsx** — line 5:
```
py-24 md:py-32  →  py-16 md:py-32
```

**Footer.tsx** — line 12:
```
py-16 md:py-24  →  py-12 md:py-24
```

- [ ] **Step 2: Verify with `npm run dev`**

Run: `npm run dev`
Open `http://localhost:3000` on mobile viewport (390px width in devtools). Sections should have tighter spacing. Desktop at 1440px should look identical.

- [ ] **Step 3: Commit**

```bash
git add components/sections/*.tsx components/layout/Footer.tsx
git commit -m "style(mobile): reduce section vertical padding for tighter mobile layout"
```

---

### Task 2: Gap Tightening — Reduce stacked column gaps on mobile

When 2-column grids stack on mobile, the `gap-16` (64px) between them is excessive. Reduce to `gap-10` (40px) on mobile.

**Files:**
- Modify: `components/sections/Philosophy.tsx`
- Modify: `components/sections/Formations.tsx`
- Modify: `components/sections/SortiesFosse.tsx`
- Modify: `components/sections/ClubHistory.tsx`
- Modify: `components/sections/FFESSMAffiliation.tsx`
- Modify: `components/layout/Footer.tsx`

- [ ] **Step 1: Tighten grid gaps on mobile**

**Philosophy.tsx** — line 9, the grid div:
```
gap-16  →  gap-10 lg:gap-16
```

**Formations.tsx** — line 31, the grid div:
```
gap-16  →  gap-10 lg:gap-16
```

**SortiesFosse.tsx** — line 16, the grid div:
```
gap-16  →  gap-10 lg:gap-16
```

**ClubHistory.tsx** — line 7, the grid div:
```
gap-16  →  gap-10 lg:gap-16
```

**FFESSMAffiliation.tsx** — line 26, inner grid:
```
gap-16  →  gap-10 lg:gap-16
```

**Footer.tsx** — line 15, the 3-col grid:
```
gap-16 md:gap-12  →  gap-10 md:gap-12
```

- [ ] **Step 2: Verify**

Mobile: gaps between stacked sections should feel proportional. Desktop: unchanged.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Philosophy.tsx components/sections/Formations.tsx components/sections/SortiesFosse.tsx components/sections/ClubHistory.tsx components/sections/FFESSMAffiliation.tsx components/layout/Footer.tsx
git commit -m "style(mobile): tighten grid gaps when columns stack on small screens"
```

---

### Task 3: Gallery — Better mobile card sizing and hide arrows

On mobile, gallery cards at `clamp(280px, 40vw, 500px)` are fine width-wise, but the nav arrows overlap content on small screens. Hide arrows on mobile (touch scroll is natural) and tweak card width for better peek of next card.

**Files:**
- Modify: `components/sections/Gallery.tsx`

- [ ] **Step 1: Adjust gallery card width on mobile**

Line 165, the card width style — change to show more peek of next card:
```tsx
// Before
style={{ width: "clamp(280px, 40vw, 500px)" }}

// After
style={{ width: "clamp(260px, 70vw, 500px)" }}
```

This makes cards ~70% of viewport on mobile (showing a peek of the next) and clamps to 500px on desktop (unchanged since 40vw at 1440px = 576px was already clamped to 500px, and 70vw at 1440px = 1008px also clamps to 500px).

- [ ] **Step 2: Hide nav arrows on mobile, show on md+**

Line 221-239, the two nav arrow buttons — add `hidden md:flex` to replace `flex`:

Left arrow (line 223):
```
className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-surface/80 backdrop-blur-sm flex items-center justify-center..."
```
Change `flex` to `hidden md:flex`:
```
className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-surface/80 backdrop-blur-sm hidden md:flex items-center justify-center..."
```

Right arrow (line 233), same change:
```
Change `flex` to `hidden md:flex`
```

- [ ] **Step 3: Reduce side fade width on mobile**

Lines 242-243, the fade overlays. Change `w-24` to `w-12 md:w-24`:

```
className="absolute left-0 top-0 bottom-0 w-24 pointer-events-none..."
→
className="absolute left-0 top-0 bottom-0 w-12 md:w-24 pointer-events-none..."
```

Same for right fade.

- [ ] **Step 4: Reduce section title margin on mobile**

Line 134, the `mb-16` on the title container:
```
mb-16  →  mb-10 md:mb-16
```

- [ ] **Step 5: Verify**

Mobile: cards should fill ~70% of screen with a peek of the next. Swipe should feel natural without arrows. Desktop: arrows visible, card sizes unchanged.

- [ ] **Step 6: Commit**

```bash
git add components/sections/Gallery.tsx
git commit -m "style(mobile): improve gallery card sizing and hide arrows for touch scroll"
```

---

### Task 4: Hero Glass Panels — Tighter padding on mobile

The hero text panels have generous padding that can be reduced on mobile for better text real estate.

**Files:**
- Modify: `components/sections/Hero.tsx`

- [ ] **Step 1: Tighten glass panel padding on mobile**

Line 160, the glass panel div:
```
className="glass-panel pointer-events-auto max-w-[620px] rounded-[2rem] px-8 py-10 md:px-12 md:py-14 text-center"
```
Change to:
```
className="glass-panel pointer-events-auto max-w-[620px] rounded-[1.5rem] md:rounded-[2rem] px-6 py-8 md:px-12 md:py-14 text-center"
```

- [ ] **Step 2: Reduce heading size in panels on mobile**

Line 181, the panel heading:
```
className="mt-6 font-headline text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-on-surface md:text-6xl lg:text-7xl"
```
Change to:
```
className="mt-5 font-headline text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-on-surface md:text-6xl lg:text-7xl"
```

- [ ] **Step 3: Verify**

Mobile: glass panels should feel more compact and text more proportional. Desktop: unchanged (md/lg breakpoints take over).

- [ ] **Step 4: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "style(mobile): tighten hero glass panel padding and text sizing"
```

---

### Task 5: Values & Team Rows — Better mobile row layout

The Values and Team sections use 12-column grids that stack vertically on mobile. The spacing between sub-elements is too spread.

**Files:**
- Modify: `components/sections/Values.tsx`
- Modify: `components/sections/Team.tsx`

- [ ] **Step 1: Tighten Values row padding on mobile**

Values.tsx line 50, each row:
```
py-10 md:py-14  →  py-8 md:py-14
```

- [ ] **Step 2: Tighten Values CTA card padding on mobile**

Values.tsx line 93, the card-frame-inner:
```
className="card-frame-inner px-8 py-16 md:px-16 md:py-20 text-center"
```
Change to:
```
className="card-frame-inner px-6 py-12 md:px-16 md:py-20 text-center"
```

- [ ] **Step 3: Reduce Values section title margin on mobile**

Values.tsx line 41:
```
mb-16  →  mb-10 md:mb-16
```

- [ ] **Step 4: Tighten Team row padding on mobile**

Team.tsx line 46, each row:
```
py-10 md:py-14  →  py-8 md:py-14
```

- [ ] **Step 5: Reduce Team section title margin on mobile**

Team.tsx line 38:
```
mb-16  →  mb-10 md:mb-16
```

- [ ] **Step 6: Verify**

Mobile: rows should feel tighter without feeling cramped. Desktop: identical.

- [ ] **Step 7: Commit**

```bash
git add components/sections/Values.tsx components/sections/Team.tsx
git commit -m "style(mobile): tighten value and team row spacing on small screens"
```

---

### Task 6: Voyages Bento Grid — Mobile card heights

**Files:**
- Modify: `components/sections/Voyages.tsx`

- [ ] **Step 1: Reduce main card height on mobile**

Line 55:
```
className="md:col-span-7 h-[400px] md:h-full"
```
Change to:
```
className="md:col-span-7 h-[320px] md:h-full"
```

- [ ] **Step 2: Reduce section title margin on mobile**

Line 45:
```
className="mb-16"
```
Change to:
```
className="mb-10 md:mb-16"
```

- [ ] **Step 3: Verify**

Mobile: bento grid should feel more compact. Desktop: unchanged (md:h-full takes over).

- [ ] **Step 4: Commit**

```bash
git add components/sections/Voyages.tsx
git commit -m "style(mobile): adjust voyages bento card heights for mobile"
```

---

### Task 7: Contact Form & Pricing — Mobile polish

**Files:**
- Modify: `components/sections/ContactForm.tsx`
- Modify: `components/sections/Pricing.tsx`
- Modify: `components/sections/Agenda.tsx`

- [ ] **Step 1: Tighten contact form card padding on mobile**

ContactForm.tsx line 204:
```
className="card-frame-inner bg-surface-container p-8 md:p-12 h-full"
```
Change to:
```
className="card-frame-inner bg-surface-container p-6 md:p-12 h-full"
```

- [ ] **Step 2: Tighten contact form title margin on mobile**

ContactForm.tsx line 205:
```
className="font-headline text-3xl font-light text-on-surface mb-10 tracking-tight leading-tight"
```
Change to:
```
className="font-headline text-2xl md:text-3xl font-light text-on-surface mb-8 md:mb-10 tracking-tight leading-tight"
```

- [ ] **Step 3: Reduce Pricing section title margin on mobile**

Pricing.tsx line 26:
```
className="mb-16"
```
Change to:
```
className="mb-10 md:mb-16"
```

- [ ] **Step 4: Reduce Agenda section title margin on mobile**

Agenda.tsx, the `mt-16` on line 14:
```
className="mt-16"
```
Change to:
```
className="mt-10 md:mt-16"
```

- [ ] **Step 5: Verify**

Mobile: form should feel more proportional on small screens. Desktop: unchanged.

- [ ] **Step 6: Commit**

```bash
git add components/sections/ContactForm.tsx components/sections/Pricing.tsx components/sections/Agenda.tsx
git commit -m "style(mobile): polish contact form, pricing, and agenda spacing on mobile"
```

---

### Task 8: ClubHistory Stats — Mobile sizing

**Files:**
- Modify: `components/sections/ClubHistory.tsx`

- [ ] **Step 1: Reduce stat number size and gap on mobile**

Line 56, the stats flex container:
```
className="flex gap-16 border-t border-on-surface/[0.06] pt-10"
```
Change to:
```
className="flex gap-10 md:gap-16 border-t border-on-surface/[0.06] pt-8 md:pt-10"
```

Line 58 and 66, stat numbers:
```
className="font-headline text-5xl font-light tracking-tight text-primary tabular-nums"
```
Change to:
```
className="font-headline text-4xl md:text-5xl font-light tracking-tight text-primary tabular-nums"
```

- [ ] **Step 2: Verify**

Mobile: stats should fit comfortably side-by-side. Desktop: unchanged.

- [ ] **Step 3: Commit**

```bash
git add components/sections/ClubHistory.tsx
git commit -m "style(mobile): adjust club history stats sizing for mobile"
```

---

### Task 9: FFESSMAffiliation — Mobile stat grid

**Files:**
- Modify: `components/sections/FFESSMAffiliation.tsx`

- [ ] **Step 1: Reduce inner card padding on mobile**

Line 21:
```
className="card-frame-inner p-8 md:p-16 bg-surface-container-low relative"
```
Change to:
```
className="card-frame-inner p-6 md:p-16 bg-surface-container-low relative"
```

- [ ] **Step 2: Reduce stat card value size on mobile**

Line 85, stat values:
```
className="font-headline text-4xl font-light text-primary italic tracking-tight tabular-nums"
```
Change to:
```
className="font-headline text-3xl md:text-4xl font-light text-primary italic tracking-tight tabular-nums"
```

- [ ] **Step 3: Verify**

Mobile: stat cards should breathe properly. Desktop: unchanged.

- [ ] **Step 4: Commit**

```bash
git add components/sections/FFESSMAffiliation.tsx
git commit -m "style(mobile): adjust FFESSM stat grid for mobile screens"
```

---

### Task 10: Final Verification

- [ ] **Step 1: Full mobile walkthrough**

Open the site at 390px width (iPhone viewport) and scroll through every section. Check:
- No horizontal overflow
- Text readable, not too large or too small
- Spacing feels balanced (not cramped, not too airy)
- All touch targets min 44px
- Gallery swipeable
- Mobile menu works
- Contact form usable

- [ ] **Step 2: Desktop regression check**

Open the site at 1440px width. Scroll through every section. Check:
- Nothing has changed visually
- All hover effects intact
- Gallery arrows present
- Grid layouts unchanged

- [ ] **Step 3: Final commit if any fixes needed**
