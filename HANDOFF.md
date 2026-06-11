# Handoff: Autosloperij J. Weber website

Continuation notes for the next session in this repo. Read the spec first: `docs/superpowers/specs/2026-06-11-weber-website-design.md`.

## What this project is

Static brochure website for Autosloperij J. Weber (car salvage yard, Spaarpot 114, Geldrop, phone 040 285 3261). Markdown-driven content, built with Astro on Node 24, hosted free on GitHub Pages, custom domain later (~10 euro/year, the only cost). The previous domain johanweber.nl expired and is held by a domain broker; a fresh domain will be registered in phase 2.

## Decisions already made (all approved by Tim, 2026-06-11)

- Goal: brochure + contact, phone-first. No parts inventory, no contact form, no analytics, no cookies (so no cookie banner).
- Dutch only.
- Design tone: clean + industrial accents (light base, steel gray, safety orange, condensed headings). Chosen over rugged-industrial and corporate-clean after a visual comparison.
- Generator: Astro (latest), chosen over Eleventy/Jekyll/VitePress; reasoning is in the spec.
- Branding: always "Autosloperij J. Weber" or "Sloperij Weber", NEVER a bare "Weber" wordmark (Weber is a protected barbecue trademark).
- Phasing: phase 1 is a POC with placeholder photos and copy, used to sell the idea to the owner BEFORE asking them for photos/details. Phase 2 (after buy-in): real content, domain registration, Google Business profile link, launch.

## Current state

- Spec written and committed: `docs/superpowers/specs/2026-06-11-weber-website-design.md`
- Design brief for the external design agent ("open design") written and committed: `docs/design-brief.md`. Tim hands this prompt to the design agent himself; it returns HTML/CSS designs.
- Git: personal identity set (tim661811 / stantim@hotmail.com). No GitHub remote yet; repo `github.com/tim661811/autosloperij-weber` still to be created when pushing.
- No Astro scaffolding yet. Intentional: waiting for the design agent's HTML/CSS output first.
- Tone/approach comparison pages from the brainstorm live in `~/.agent/diagrams/` (weber-design-tones.html, weber-ssg-approaches.html, weber-site-design.html).

## Open items

- Tim runs the design brief through open design and picks a variant.
- Verify or drop the "5 minuten van de A67" route claim in the brief's contact copy before the POC reaches the owner.
- Phase 2 only: domain candidates (autosloperijweber.nl, sloperijweber.nl, weberautodemontage.nl) to check and register; owner checklist in the spec.
- Email address for mailto: link unknown; only the phone number is public.

## Next steps (once design HTML/CSS is back)

1. Invoke superpowers:writing-plans to plan the implementation (design is already brainstormed and approved; do NOT redo brainstorming).
2. Scaffold Astro: content collections per the spec's content model, `src/data/bedrijf.json` as single source for company facts, official Astro GitHub Actions workflow for Pages, Node 24.
3. Port the chosen design into Astro layouts/components (near 1-to-1 from HTML/CSS).
4. SEO implementation per spec: JSON-LD (AutoWrecker + AutoPartsStore) fed from bedrijf.json, per-page meta, sitemap.xml, robots.txt, Lighthouse >= 95 mobile target.
5. POC review with Tim, then phase 2.
