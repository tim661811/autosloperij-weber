// One-off generator for the static contact-page map (src/assets/kaart-spaarpot.webp).
// Stitches OpenStreetMap raster tiles around the company location and composites
// an accent-orange marker. Rerun with: node scripts/genereer-kaart.mjs
// Map data © OpenStreetMap contributors (ODbL); the page shows attribution.
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

const breedtegraad = 51.4350992;
const lengtegraad = 5.5540266;
// Zoom 14 with the company at ~28% from the top-left keeps the A67 (3.3 km
// south, at ~51.405) in the lower part of the picture.
const zoom = 14;
const markerFractieX = 0.28;
const markerFractieY = 0.28;
const uitvoerBreedte = 2264; // 2x retina for the 21:9 map slot (~1132 css px wide)
const uitvoerHoogte = 970;
const tegelGrootte = 256;
const uitvoerPad = 'src/assets/kaart-spaarpot.webp';

const wereldGrootte = tegelGrootte * 2 ** zoom;
const markerWereldX = ((lengtegraad + 180) / 360) * wereldGrootte;
const breedtegraadRadialen = (breedtegraad * Math.PI) / 180;
const markerWereldY =
  ((1 - Math.log(Math.tan(breedtegraadRadialen) + 1 / Math.cos(breedtegraadRadialen)) / Math.PI) / 2) *
  wereldGrootte;

const linksBoven = {
  x: markerWereldX - uitvoerBreedte * markerFractieX,
  y: markerWereldY - uitvoerHoogte * markerFractieY,
};
const eersteTegel = { x: Math.floor(linksBoven.x / tegelGrootte), y: Math.floor(linksBoven.y / tegelGrootte) };
const laatsteTegel = {
  x: Math.floor((linksBoven.x + uitvoerBreedte) / tegelGrootte),
  y: Math.floor((linksBoven.y + uitvoerHoogte) / tegelGrootte),
};

const tegelLagen = [];
for (let tegelY = eersteTegel.y; tegelY <= laatsteTegel.y; tegelY++) {
  for (let tegelX = eersteTegel.x; tegelX <= laatsteTegel.x; tegelX++) {
    const url = `https://tile.openstreetmap.org/${zoom}/${tegelX}/${tegelY}.png`;
    const antwoord = await fetch(url, {
      headers: { 'User-Agent': 'autosloperij-weber-site-build/1.0 (eenmalige statische kaart)' },
    });
    if (!antwoord.ok) throw new Error(`Tegel ${url} gaf ${antwoord.status}`);
    tegelLagen.push({
      input: Buffer.from(await antwoord.arrayBuffer()),
      left: Math.round(tegelX * tegelGrootte - linksBoven.x),
      top: Math.round(tegelY * tegelGrootte - linksBoven.y),
    });
  }
}

const markerBreedte = 76;
const markerHoogte = 100;
const markerSvg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${markerBreedte}" height="${markerHoogte}" viewBox="0 0 38 50">
    <path d="M19 0C8.5 0 0 8.5 0 19c0 14 19 31 19 31s19-17 19-31C38 8.5 29.5 0 19 0z" fill="#e8590c"/>
    <circle cx="19" cy="19" r="8" fill="#ffffff"/>
  </svg>`
);

const kaart = await sharp({
  create: { width: uitvoerBreedte, height: uitvoerHoogte, channels: 3, background: '#eeece8' },
})
  .composite([
    ...tegelLagen,
    {
      input: markerSvg,
      left: Math.round(uitvoerBreedte * markerFractieX - markerBreedte / 2),
      top: Math.round(uitvoerHoogte * markerFractieY - markerHoogte), // pin tip on the location
    },
  ])
  .webp({ quality: 85 })
  .toBuffer();

await mkdir('src/assets', { recursive: true });
await writeFile(uitvoerPad, kaart);
console.log(`Kaart weggeschreven naar ${uitvoerPad} (${Math.round(kaart.length / 1024)} kB, ${tegelLagen.length} tegels)`);
