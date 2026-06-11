# Design brief: website Autosloperij J. Weber

You are designing a small brochure website for a Dutch car salvage yard. Deliver the design as plain HTML and CSS files. This brief contains everything you need: business facts, brand constraints, tone, page structure, Dutch copy, and technical constraints.

## The business

- Name: Autosloperij J. Weber, a car salvage and dismantling business.
- Address: Spaarpot 114, 5667 KZ Geldrop, Netherlands.
- Phone: 040 285 3261.
- Opening hours: Monday to Friday, 09:00 to 17:00. Weekends closed.
- Services: selling used car parts, buying cars for salvage (with RDW vrijwaringsbewijs, the official Dutch deregistration proof), and certified dismantling and recycling.
- Audience: local DIY mechanics and garages looking for affordable parts, and private owners who want to get rid of an old or damaged car. These customers call or drop by; the phone number is the single most important element on every page.

## Brand constraints

- The brand name is always written as "Autosloperij J. Weber" (formal) or "Sloperij Weber" (short). NEVER use a bare "Weber" wordmark: Weber is a protected barbecue trademark and the site must not lean on that name alone.
- There is no existing logo or house style. Design a simple typographic wordmark that includes the qualifier (for example "J. WEBER Autodemontage" with the qualifier visually attached).
- Dutch language only.

## Design tone

Clean and professional with industrial accents. Concretely:

- Light, modern base: off-white or light warm-gray background, generous whitespace, clear visual hierarchy.
- Industrial character through accents, not through grunge: steel gray (around #3b4754) as the secondary color, one bold accent in safety orange (around #e8590c) used for calls to action and key highlights.
- Sturdy condensed headings (for example Barlow Condensed or similar), paired with a clean readable body font. At most two font families, loaded from Google Fonts.
- Subtle industrial texture is welcome (thin rule lines, measured-grid feel), but no dark backgrounds, no metal textures, no distressed or grungy styling.
- The result should read as "professional company that is clearly a real salvage yard": trustworthy first, characterful second.

What to avoid: dark workshop aesthetics, corporate blandness that could belong to any company, stock-photo gloss, and any styling that needs JavaScript to work.

## Pages to design

Design these three pages in full. They share a header, footer, and component set.

### 1. Home (/)

- Header: wordmark left, navigation (Onderdelen, Auto verkopen, Demontage, Over ons, Contact), clickable phone number prominently right.
- Hero: core promise, one supporting sentence, large phone call-to-action button, photo slot.
- Services strip: three cards (Gebruikte onderdelen, Auto verkopen, Demontage en recycling), each with a short description and link.
- About teaser: two or three sentences with a photo slot and link to the about page.
- Contact bar: phone, address, opening hours in one compact strip.
- Footer: full company details, opening hours, navigation, space for KvK number.

### 2. Service detail template (design it as "Auto verkopen")

- Page header with title and intro.
- "How it works" in three or four steps (bring or have picked up, direct handling, RDW vrijwaring on the spot).
- Supporting content blocks for practical details (what to bring: registration card, ID).
- Call-to-action block with phone number.
- This template is reused for the other two services and (simplified) for the about page.

### 3. Contact (/contact/)

- Phone number as the hero element, clickable.
- Address block, opening hours table.
- Map slot: a static map image placeholder linking out to Google Maps (no embedded map iframe).
- Route hint ("Op bedrijventerrein Spaarpot, 5 minuten van de A67").

Also include a minimal 404 page: short friendly message, link home, phone number.

## Dutch placeholder copy

Use this copy in the designs (it may be refined later, but design with realistic text, not lorem ipsum):

- Hero heading: "Gebruikte auto-onderdelen, gloednieuwe service"
- Hero support: "Autosloperij J. Weber in Geldrop. Onderdelen, demontage en inkoop van sloopauto's, al jaren een vertrouwd adres."
- Hero CTA: "Bel 040 285 3261"
- Card Onderdelen: "Gebruikte auto-onderdelen, gecontroleerd en direct leverbaar. Bel om te vragen of uw onderdeel op voorraad is."
- Card Auto verkopen: "Uw sloop- of schadeauto direct verkocht, inclusief RDW-vrijwaringsbewijs. U weet meteen waar u aan toe bent."
- Card Demontage: "Milieuverantwoorde demontage en recycling. Geen verrassingen, alles volgens de regels."
- About teaser: "Sloperij Weber is een begrip in Geldrop en omgeving. Eerlijk advies, korte lijnen en een vakkundige afhandeling."

## Photo placeholders

Real photography follows later. Design six photo slots with a deliberate placeholder treatment (for example a flat steel-gray block with a small monospace label naming the intended shot). The slots:

1. Yard overview (hero, landscape)
2. Parts shelving or warehouse interior
3. Dismantling work in progress
4. Entrance or building front
5. Counter or intake desk (service pages)
6. Optional team photo (about page)

The design must look intentional and complete with these placeholders, since the proof-of-concept ships before real photos exist.

## Technical constraints

- Plain HTML and CSS only. No JavaScript. No CSS frameworks (no Tailwind, no Bootstrap). Hand-written CSS with custom properties for the color palette and type scale.
- Mobile-first and fully responsive from 360px up to 1440px wide. On mobile, calling must be one tap: phone numbers are `tel:` links everywhere.
- Semantic HTML5 (header, nav, main, section, footer, h1-h3 hierarchy) and WCAG AA basics: sufficient contrast, visible focus states, alt texts on images.
- One shared stylesheet across pages, consistent class naming (BEM or similar). The design will be ported to Astro components afterwards, so clean repeatable component markup matters more than page-level cleverness.
- Lightweight: system of two Google Fonts at most, no background videos, no large decorative images.

## Deliverables

- The three pages plus 404 as self-contained HTML files sharing one CSS file.
- A short notes section (comment block or separate file) documenting the design tokens: color palette, type scale, spacing rhythm, and the intended use of the accent color.
- If you produce multiple directions, keep each variant complete (all pages), so they can be compared side by side.
