# Design brief: facade sign and business cards, Autosloperij J. Weber

You are designing physical brand carriers for a Dutch car salvage yard: a facade sign (gevelbord) and a two-sided business card. You previously designed this company's website; these pieces must feel like the same brand. Deliver HTML/CSS mockups at the exact physical aspect ratios; they will be converted to print-ready vector files later.

## The business

- Name: Autosloperij J. Weber, a car salvage and dismantling business.
- Address: Spaarpot 114, 5667 KZ Geldrop, Netherlands.
- Phone: 040 285 3261 (the single most important element; customers call).
- Opening hours: Monday to Friday 09:00-17:00, weekends closed.
- Dutch language only.

## The existing design system (from the website you designed)

- Colors: warm off-white `#f6f5f3`, white surfaces, ink `#1d242b`, steel gray `#3b4754` (secondary brand color), steel dark `#2c353f`, safety orange `#e8590c` (the single accent, used sparingly: at most two orange moments per piece), deep orange for small text `#b8430a`.
- Type: Barlow Condensed (500/600/700) for display, wordmark, and numbers; Source Sans 3 (400/500/600) for supporting text; a monospace stack for small labels (eyebrows, hours, metadata).
- Wordmark: a steel square monogram block "JW" with a safety-orange underline bar, next to "J. WEBER" in bold condensed caps with the qualifier "AUTOSLOPERIJ · AUTODEMONTAGE" in spaced monospace caps beneath it.
- Brand rule (hard constraint): the name NEVER appears as a bare "Weber". Always "Autosloperij J. Weber", "Sloperij Weber", or the wordmark with its attached qualifier. Weber is a protected barbecue trademark.

## Why these pieces

The current facade sign dates from another era: ornamental script lettering, a fax number, opening hours that have been wrong for years, and a domain (johanweber.nl) that no longer exists. The replacement must look like the website: clean, industrial, trustworthy, phone-first.

Learn from that failure mode: the old sign hard-painted opening hours and they went stale. The new sign should NOT carry opening hours on the main panel. If you include hours at all, design them as a small, separately mounted strip that can be swapped cheaply.

## Deliverable 1: facade sign (gevelbord)

- Landscape panel mounted high on a corrugated steel building (currently olive-green cladding), read from the street and by drivers slowing down. Design at a 3.5:1 aspect ratio; it should survive cropping to 3:1 and 4:1.
- Content, in hierarchy order:
  1. The wordmark with qualifier (dominant).
  2. Phone number, very large: "040 285 3261" with a "BEL VOOR ONDERDELEN" or similar mono eyebrow.
  3. Street number and domain: "Spaarpot 114, Geldrop" and the website domain. Use the placeholder "autosloperijweber.nl"; the final domain is still to be registered, so keep it typographically easy to substitute.
- No fax number. No opening hours on the main panel (see above). A mobile number may be added later; reserve a graceful spot but do not invent one.
- Print/production constraints: solid flat fills only (no gradients, no shadows), high contrast at distance, generous safe margins, must work on a white panel AND as a variant on a steel `#3b4754` panel. Legibility test: the phone number should be readable at a glance from across a two-lane street.

## Deliverable 2: business card

- Standard EU size 85 x 55 mm, two-sided, design both sides. Include 3 mm bleed thinking in your margins (keep content 5 mm from edges).
- Front: the wordmark with qualifier, centered or anchored left, on off-white or steel. Quiet and confident; this side carries no contact data.
- Back: name, phone (dominant), address, domain (same placeholder), and a reserved line for an email address (still to be confirmed; use "info@autosloperijweber.nl" as placeholder styling, clearly substitutable).
- The orange accent budget applies per side: one orange moment on the front (the monogram underline), at most one more on the back (the phone number or a rule line).
- Optional: a variant back with a person's name and role line, for when staff want personal cards.

## Deliverables format

- One HTML/CSS file per piece (sign white variant, sign steel variant, card front, card back), each sized to the exact aspect ratio, sharing one stylesheet with the design tokens.
- Plain HTML and CSS, no JavaScript, fonts from Google Fonts (Barlow Condensed, Source Sans 3).
- A short notes file documenting intended physical sizes, the color values used, and which placeholders (domain, email, mobile) must be finalized before production.
