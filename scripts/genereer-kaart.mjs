// One-off generator for the static contact-page map (src/assets/kaart-spaarpot.webp).
// Stitches OpenStreetMap raster tiles, draws the driving route from A67 exit 34
// (Geldrop) to the yard (geometry from the public OSRM router), and composites
// an accent-orange marker. Rerun with: node scripts/genereer-kaart.mjs
// Map data © OpenStreetMap contributors (ODbL); the page shows attribution.
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

// Marker: the company location. Map center: Tim's hand-picked framing
// (openstreetmap.org #map=14/51.42255/5.56097) that keeps both the company
// (top) and the A67 (lower half) in the picture.
const markerLocatie = { breedtegraad: 51.4350992, lengtegraad: 5.5540266 };
const kaartCentrum = { breedtegraad: 51.42255, lengtegraad: 5.56097 };
// A67 afrit 34 (Geldrop), motorway_junction node from OpenStreetMap.
const routeStart = { breedtegraad: 51.40673, lengtegraad: 5.56202 };
const zoom = 14;
const uitvoerBreedte = 2264; // 2x retina for the 21:9 map slot (~1132 css px wide)
const uitvoerHoogte = 970;
const tegelGrootte = 256;
const uitvoerPad = 'src/assets/kaart-spaarpot.webp';

const wereldGrootte = tegelGrootte * 2 ** zoom;

function naarWereldPixels({ breedtegraad, lengtegraad }) {
  const radialen = (breedtegraad * Math.PI) / 180;
  return {
    x: ((lengtegraad + 180) / 360) * wereldGrootte,
    y: ((1 - Math.log(Math.tan(radialen) + 1 / Math.cos(radialen)) / Math.PI) / 2) * wereldGrootte,
  };
}

const centrumWereld = naarWereldPixels(kaartCentrum);
const markerWereld = naarWereldPixels(markerLocatie);
const linksBoven = {
  x: centrumWereld.x - uitvoerBreedte / 2,
  y: centrumWereld.y - uitvoerHoogte / 2,
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

// Driving route afrit 34 -> yard, drawn as a white-cased orange polyline.
const routeUrl =
  'https://router.project-osrm.org/route/v1/driving/' +
  `${routeStart.lengtegraad},${routeStart.breedtegraad};${markerLocatie.lengtegraad},${markerLocatie.breedtegraad}` +
  '?geometries=geojson&overview=full';
const routeAntwoord = await fetch(routeUrl, {
  headers: { 'User-Agent': 'autosloperij-weber-site-build/1.0 (eenmalige statische kaart)' },
});
if (!routeAntwoord.ok) throw new Error(`Route-opvraag gaf ${routeAntwoord.status}`);
const routeData = await routeAntwoord.json();
const routePunten = routeData.routes[0].geometry.coordinates.map(([lengtegraad, breedtegraad]) => {
  const wereld = naarWereldPixels({ breedtegraad, lengtegraad });
  return `${(wereld.x - linksBoven.x).toFixed(1)},${(wereld.y - linksBoven.y).toFixed(1)}`;
});
const routePad = `M ${routePunten.join(' L ')}`;
const routeSvg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${uitvoerBreedte}" height="${uitvoerHoogte}">
    <path d="${routePad}" fill="none" stroke="#ffffff" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>
    <path d="${routePad}" fill="none" stroke="#e8590c" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
);

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
    { input: routeSvg, left: 0, top: 0 },
    {
      input: markerSvg,
      left: Math.round(markerWereld.x - linksBoven.x - markerBreedte / 2),
      top: Math.round(markerWereld.y - linksBoven.y - markerHoogte), // pin tip on the location
    },
  ])
  .webp({ quality: 85 })
  .toBuffer();

await mkdir('src/assets', { recursive: true });
await writeFile(uitvoerPad, kaart);
console.log(`Kaart weggeschreven naar ${uitvoerPad} (${Math.round(kaart.length / 1024)} kB, ${tegelLagen.length} tegels)`);
