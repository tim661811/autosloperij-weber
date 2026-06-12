# Productienotities — gevel & drukwerk Autosloperij J. Weber

HTML/CSS-mockups op exacte fysieke verhouding, bedoeld om later naar drukklare
vectoren te zetten. Alle stukken delen één stylesheet (`tokens.css`), met
kleuren, typografie en wordmerk overgenomen uit `src/styles/global.css`.

## Bestanden

| Bestand | Stuk | Verhouding |
|---|---|---|
| `gevelbord-wit.html` | Gevelbord, wit paneel | 3,5 : 1 |
| `visitekaart-voor.html` | Visitekaartje, voorzijde | 85 : 55 |
| `visitekaart-achter.html` | Visitekaartje, achterzijde | 85 : 55 |
| `openingstijden-strip.html` | Losse, vervangbare openingstijden-strip | 6 : 1 |
| `gevelbord-wit-met-tijden.html` | Alternatief: gevelbord met tijdenband op het paneel | 2,85 : 1 |
| `index.html` | Overzicht van alle stukken naast elkaar | — |

## Fysieke maten

- **Gevelbord** — landschap, 3,5 : 1. Ontworpen om bijsnede naar 3 : 1 en 4 : 1
  te overleven: alle inhoud staat in een gecentreerde veilige zone met ruime
  marges. Geen vaste eindmaat (afhankelijk van de gevel); bij een breedte van
  bijv. 2000 mm is het bord 2000 × 571 mm. Plat ingevuld, geen verlopen of
  schaduwen — geschikt voor folie of geprint paneel. Eén wit paneel; de losse
  strip levert de openingstijden, zodat het hoofdbord nooit veroudert.
- **Visitekaartje** — 85 × 55 mm (EU-standaard), dubbelzijdig. Reken op 3 mm
  afloop rondom (eindformaat met afloop 91 × 61 mm); houd inhoud minimaal 5 mm
  van de rand. De binnenmarges in de mockup zijn hierop afgestemd.
- **Openingstijden-strip** — los paneeltje, 6 : 1, onder of naast het
  gevelbord. Bijv. 600 × 100 mm. Bewust apart zodat het goedkoop te vervangen
  is als de tijden wijzigen. Montageschroeven zijn aangegeven.

## Kleurwaarden (zoals gebruikt)

| Token | Waarde | Gebruik |
|---|---|---|
| Off-white veld | `#f6f5f3` | Kaart-achterzijde, overzichtspagina |
| Wit oppervlak | `#ffffff` | Wit gevelbord |
| Ink (tekst) | `#1d242b` | Telefoonnummer op wit, primaire tekst |
| Muted | `#5b6772` | Mono-labels, secundaire tekst |
| Staal | `#3b4754` | Staal gevelbord, kaart-voorzijde, strip |
| Steel-700 | `#2c353f` | Schroefverloop |
| Border | `#e1ded8` | Hairlines op licht |
| Border-strong | `#c9c5bd` | Stippellijn van te-vervangen waarden |
| Safety orange | `#e8590c` | Monogram-onderlijn, eyebrow-streep, oranje monogramblok op staal |
| Accent-text | `#b8430a` | Telefoonnummer op de kaart-achterzijde (oranje als kleine/middelgrote tekst, AA) |
| Accent-light | `#ffb583` | Oranje accent dat op staal leesbaar blijft (eyebrow + dot op de strip) |

### Accent-discipline (oranje)

Maximaal twee oranje momenten per stuk, conform de huisstijl:

- **Gevelbord wit** — monogram-onderlijn + eyebrow-streep. Telefoon = ink-zwart
  voor maximaal contrast op afstand.
- **Gevelbord wit + tijdenband** (alternatief) — zelfde twee oranje momenten;
  de staal-tijdenband draagt geen oranje, dus het budget blijft gelijk.
- **Kaart voorzijde** — alleen het oranje monogramblok.
- **Kaart achterzijde** — alleen het telefoonnummer (`#b8430a`). De scheidslijn
  blijft staal, niet oranje.
- **Strip** — eyebrow-streep + dot (`#ffb583`).

## Typografie

- **Barlow Condensed** (500/600/700) — wordmerk, koppen, telefoonnummers.
- **Source Sans 3** (400/500/600) — ondersteunende tekst (kaartwaarden).
- **Mono — systeemstack** (`ui-monospace, 'SFMono-Regular', 'Cascadia Mono',
  Menlo, Consolas, monospace`), exact zoals de website. Voor eyebrows,
  openingstijden en metadata. Geen derde webfont, dus binnen de twee Google
  Fonts. Bij vectoriseren: outline de mono-tekst met een geometrische
  monospace (bijv. de in `tokens.css` genoemde namen of een vrij alternatief
  zoals JetBrains Mono / IBM Plex Mono) — het is geen merklettertype.

## Placeholders om te finaliseren vóór druk

1. **Domein** — `autosloperijweber.nl` (nog te registreren). Met stippellijn
   gemarkeerd op gevelbord en kaart-achterzijde; typografisch eenvoudig te
   vervangen.
2. **E-mail** — `info@autosloperijweber.nl` (nog te bevestigen). Alleen op de
   kaart-achterzijde, met stippellijn.
3. **Mobiel nummer** — niet verzonnen. Op het gevelbord is onder het
   telefoonnummer ruimte gereserveerd (`.sign__reserve`) zodat een tweede regel
   later past zonder de compositie te breken.

## Merkregel (hard)

De naam verschijnt nooit als kale "Weber". Altijd "Autosloperij J. Weber",
"Sloperij Weber" of het wordmerk mét aangehechte kwalificatie
("Autosloperij · Autodemontage"). Weber is een beschermd merk van het
barbecuemerk.
