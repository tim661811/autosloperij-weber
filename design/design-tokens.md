# Design tokens — Autosloperij J. Weber

Reference for the design system used across `index.html`, `auto-verkopen.html`,
`contact.html` and `404.html`. All tokens live as CSS custom properties in the
`:root` block of `styles.css`. This file documents intent so the design ports
cleanly to Astro components later.

## Brand wordmark

The wordmark is purely typographic: a steel monogram block (`JW`) with a
safety-orange underline, set next to the name and an always-attached qualifier.

- Full form: **Autosloperij J. Weber**
- Short form: **Sloperij Weber**
- The qualifier (`Autosloperij · Autodemontage`) is *always* shown with the name.
  Never render a bare "Weber" wordmark (Weber is a protected barbecue trademark).

## Color palette

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#f6f5f3` | Warm off-white page field |
| `--color-surface` | `#ffffff` | Cards, header, raised blocks |
| `--color-surface-alt` | `#eeece8` | Subtle alternating section band |
| `--color-ink` | `#1d242b` | Primary text (near steel-black) |
| `--color-muted` | `#5b6772` | Secondary text |
| `--color-steel` | `#3b4754` | Secondary brand color, steel blocks, buttons |
| `--color-steel-700` | `#2c353f` | Footer, steel hover |
| `--color-border` | `#e1ded8` | Hairline rules, card borders |
| `--color-border-strong` | `#c9c5bd` | Measured-grid lines, ghost-button border |
| `--color-accent` | `#e8590c` | **Safety orange** — fills, buttons, tags, rule lines, large display |
| `--color-accent-700` | `#c64a08` | Accent hover on fill *backgrounds* |
| `--color-accent-soft` | `#fdeee4` | Faint orange wash behind hovered accents |
| `--color-accent-text` | `#b8430a` | Orange as small/normal **text** on light — AA ≥4.5:1 |
| `--color-accent-text-hover` | `#a23c06` | Deeper orange text on hover/active |
| `--color-focus` | `#1456b8` | Visible focus ring (AA contrast on light) |

### Accent discipline

Safety orange is the single brand accent. Budget: **at most two orange moments
per screen** — typically the eyebrow rule plus the primary phone CTA. It marks
exactly two things: a call-to-action (always the phone), and a "this is the
important number/word" highlight. It is never used for large fills or
decorative backgrounds. Steel gray carries all the structural weight; orange is
the spark.

Contrast (WCAG AA): the brand orange `#e8590c` is only ~3.3–3.6:1 on the light
fields, so it is **never used as small text**. It is reserved for fills (button
and tag backgrounds with white text), borders, rule lines, icons, and large
display numerals (`step__num`, the 404 digit) where the large-text 3:1 bar
applies. Wherever orange has to read *as small text* (eyebrows, text-links, card
index, the "Gesloten" hours cells) the deeper `--color-accent-text` `#b8430a` is
used instead — it clears 4.5:1 on white, `--color-bg`, and `--color-surface-alt`
alike (5.5 / 5.0 / 4.6:1). Body text is always ink or muted on the light field,
comfortably above AA.

## Typography

Two Google Fonts only, plus the system monospace stack for metadata labels.

- **Display / headings:** `Barlow Condensed` (500/600/700) — sturdy, condensed,
  industrial. Also used for the wordmark, buttons and numerics.
- **Body:** `Source Sans 3` (400/500/600) — clean, neutral, highly readable.
- **Mono (system, not loaded):** eyebrows, placeholder labels, hours, legal
  metadata. Uses `ui-monospace` stack so we stay within two web fonts.

### Type scale (fluid, `clamp()` mobile → desktop)

| Token | Range | Typical use |
|---|---|---|
| `--step--1` | 0.83 → 0.92rem | Mono labels, captions, legal |
| `--step-0` | 1.00 → 1.13rem | Body |
| `--step-1` | 1.20 → 1.50rem | Card titles, lead-in |
| `--step-2` | 1.55 → 2.20rem | Section titles |
| `--step-3` | 2.10 → 3.40rem | Page-header titles, CTA phone |
| `--step-4` | 2.70 → 4.60rem | Hero title, contact phone hero |

## Spacing rhythm

8px-based scale (`--space-1` 0.5rem … `--space-8` 6.5rem). Sections use
`--space-7` (≈4.5rem) of vertical padding, tightening to `--space-6` on
secondary sections. Content is capped at `--maxw` 1180px and gutter padding is
`--space-4`.

## Structure tokens

- `--radius` 6px (inputs, buttons, small blocks)
- `--radius-lg` 10px (cards, media, placeholders)
- `--shadow-sm` / `--shadow-md` — used sparingly, only on interactive cards
- Photo placeholders: steel gradient + faint 28px measured grid + corner ticks +
  monospace shot label. Six named slots: yard overview, parts shelving,
  dismantling in progress, entrance/building, counter/intake, optional team.

## Component inventory (BEM)

`site-header` · `wordmark` · `header-phone` · `main-nav` · `hero` · `card` /
`card-grid` · `split` (about teaser & media blocks) · `contact-bar` ·
`page-header` · `steps` / `step` · `checklist` · `cta-block` · `phone-hero` ·
`info-card` · `hours` · `map-slot` · `notfound` · `site-footer` · shared
helpers `btn`, `text-link`, `eyebrow`, `ph` (photo placeholder).

## Constraints honored

- Plain HTML + CSS, **no JavaScript**, no frameworks.
- Mobile-first, responsive 360px → 1440px. Breakpoints: 600px (two-up cards),
  768px (tablet portrait, balanced three-up rows), 880px (feature sections go
  two-column), 1080px (header collapses to a single horizontal row).
- Every phone number is a `tel:+31402853261` link.
- Semantic HTML5, visible focus rings, skip-link, `aria-current` on nav,
  `role="img"` + `aria-label` on placeholders, alt-ready markup for real photos.
- One shared stylesheet (`styles.css`) across all four pages.
