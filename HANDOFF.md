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

## Current state (updated 2026-06-11, after the build session)

- Design landed in `design/` (4 template pages + styles.css + design-tokens.md), committed.
- The full site is BUILT on `main` (local only): Astro 6 on Node 24 (`.nvmrc`), all six pages plus 404, content collections, `src/data/bedrijf.json` as single source, JSON-LD (AutoWrecker + AutoPartsStore with verified geo coordinates), sitemap + robots.txt, zero client-side JS, self-hosted fonts via @fontsource. 30/30 dist-invariant tests green (`npm run build && npm test`), `astro check` clean, visual fidelity verified against the design at 375/768/1280.
- Implementation plan (gitignored, local): `docs/superpowers/plans/2026-06-11-weber-website-astro.md`.
- `.github/workflows/deploy.yml` committed (official withastro/action, Node 24).
- Facts verified this session: KvK 17056114 is genuinely this business (TransFirm); bedrijventerrein Spaarpot lies directly on the A67 so the "5 minuten van de A67" claim STANDS (handoff open item resolved); geo 51.4350992/5.5540266 (Nominatim); a public email j_weber@hetnet.nl exists in old directories but is unconfirmed, NOT published in the POC; one directory claims Saturday 09:00-13:00 hours, owner to confirm in phase 2 (POC keeps weekends closed per spec).

## Published (2026-06-11, Tim approved)

Live at https://tim661811.github.io/autosloperij-weber/ from the public repo github.com/tim661811/autosloperij-weber. Pages builds via the Actions workflow on every push to main. Mobile Lighthouse on the live site: home 100 performance / 96 accessibility / 100 best practices / 100 SEO; auto-verkopen 98/96/100/100; CLS 0 after preloading the three critical font files. The accessibility 96 is capped by two designer-level contrast items listed under phase 2 below.

## Open items
- Phase 2 only: real photos (placeholder slots are ready), domain candidates (autosloperijweber.nl, sloperijweber.nl, weberautodemontage.nl), owner checklist in the spec plus: confirm email address, Saturday-morning hours, ARN/SGS certifications (found in public directories, strong trust signals for the demontage page).
- Phase 2 design polish (axe color-contrast, found via Lighthouse; accessibility score is 96 with these in): white CTA text on safety orange #e8590c measures 3.58:1 at button size (axe wants 4.5:1 since the 600 weight does not count as bold), and the footer's muted gray #8895a0 on steel #2c353f measures 4.05:1. Both are brand-color calls for the designer; options are deepening the fills (#c64a08 exists as a token) or bumping sizes/weights. The ported stylesheet is byte-identical to design/styles.css on purpose, so change it together with the design source.
- Phase 2 domain switch: change `site` and drop `base` in `astro.config.mjs`, update the absolute URLs in `tests/site.test.js`, add CNAME, point the Google Business profile.
