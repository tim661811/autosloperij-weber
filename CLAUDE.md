# Autosloperij J. Weber website

Static brochure site, Astro 6 on Node 24 (`.nvmrc`; run `nvm use 24` before npm commands).

## Deployment: main auto-deploys

Every push to `main` triggers the GitHub Pages deploy workflow and rebuilds the live site. Therefore:

- Work on a feature branch, never directly on `main`.
- Merge and push to `main` only when the change is meant to go live.
- Dev-only changes (tooling, docs, tests) still trigger a rebuild when they land on `main`, so batch them with content changes where possible.

## Commands

- `npm run build && npm test` is the verification pair; tests assert dist invariants (tel: links, zero client JS, JSON-LD, sitemap).
- `npm run dev` serves at http://localhost:4321/autosloperij-weber/ and enables the instruckt annotation toolbar (dev-only). Annotations land in `.instruckt/` (gitignored); read them via the instruckt MCP tools (`.mcp.json`).

## Conventions

- Company facts (phone, address, hours, KvK) live only in `src/data/bedrijf.json`; page copy lives in `src/content/`. Never hardcode these in components.
- `design/` is the design agent's frozen deliverable; never edit it. `src/styles/global.css` started as a byte-identical copy and now evolves from it (UI-feedback changes are marked with dated comments).
- Branding: always "Autosloperij J. Weber" or "Sloperij Weber", never a bare "Weber" (protected trademark of the barbecue brand).
- Internal links go through `pad()` from `src/lib/pad.ts` (GitHub Pages base-path handling).
