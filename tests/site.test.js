import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const distDirectory = fileURLToPath(new URL('../dist/', import.meta.url));

// Grows as pages land: Task 4 adds 404, Task 5 index, Task 6 services, Task 7 over-ons/contact.
const PAGINAS = [
  'index.html',
  'gebruikte-onderdelen/index.html',
  'auto-verkopen/index.html',
  'demontage/index.html',
  'over-ons/index.html',
  'contact/index.html',
  '404.html',
];

function leesPagina(relatiefPad) {
  return readFileSync(path.join(distDirectory, relatiefPad), 'utf8');
}

function leesJsonLd(html) {
  const jsonLdMatch = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
  assert.ok(jsonLdMatch, 'JSON-LD script ontbreekt');
  return JSON.parse(jsonLdMatch[1]);
}

for (const pagina of PAGINAS) {
  test(`${pagina}: bestaat in dist`, () => {
    assert.ok(existsSync(path.join(distDirectory, pagina)), `${pagina} ontbreekt in dist/`);
  });

  test(`${pagina}: basisinvarianten`, () => {
    const html = leesPagina(pagina);

    assert.ok(html.includes('<html lang="nl"'), 'lang="nl" ontbreekt');
    assert.ok(html.includes('href="tel:+31402853261"'), 'klikbare telefoonlink ontbreekt');

    const titelMatch = html.match(/<title>(.*?)<\/title>/s);
    assert.ok(titelMatch, 'title ontbreekt');
    assert.ok(
      titelMatch[1].includes('Autosloperij J. Weber'),
      `titel mist de volledige merknaam met kwalificatie: ${titelMatch[1]}`
    );

    // Zero client-side JavaScript: every script tag must be the JSON-LD block.
    const scriptTags = html.match(/<script\b/g) ?? [];
    const jsonLdTags = html.match(/<script type="application\/ld\+json"/g) ?? [];
    assert.equal(scriptTags.length, jsonLdTags.length, 'pagina bevat client-side JavaScript');

    const structuredData = leesJsonLd(html);
    assert.deepEqual(structuredData['@type'], ['AutoWrecker', 'AutoPartsStore']);
    assert.equal(structuredData.telephone, '+31402853261');
    assert.equal(structuredData.address.postalCode, '5667 KZ');
  });

  test(`${pagina}: meta description aanwezig (behalve 404)`, () => {
    const html = leesPagina(pagina);
    if (pagina === '404.html') {
      assert.ok(html.includes('<meta name="robots" content="noindex"'), '404 mist noindex');
    } else {
      assert.ok(html.includes('<meta name="description"'), 'meta description ontbreekt');
    }
  });
}

test('index.html: paginaspecifiek', () => {
  const html = leesPagina('index.html');
  assert.ok(html.includes('Gebruikte auto-onderdelen,<br>'), 'hero-titel ontbreekt of mist regelafbreking');
  assert.ok(html.includes('href="/autosloperij-weber/gebruikte-onderdelen/"'), 'dienstkaart-link mist base-prefix');
  assert.ok(html.includes('href="/autosloperij-weber/auto-verkopen/"'), 'auto-verkopen-link ontbreekt');
  assert.ok(html.includes('href="/autosloperij-weber/demontage/"'), 'demontage-link ontbreekt');
  assert.ok(html.includes('href="/autosloperij-weber/over-ons/"'), 'over-ons-link ontbreekt');
  assert.ok(html.includes('class="contact-bar"'), 'contactbalk ontbreekt');
  assert.equal((html.match(/class="card card--link"/g) ?? []).length, 3, 'verwacht precies drie dienstkaarten');
});

const DIENST_PAGINAS = [
  { pad: 'gebruikte-onderdelen/index.html', stappen: 3, heeftChecklist: true },
  { pad: 'auto-verkopen/index.html', stappen: 4, heeftChecklist: true },
  { pad: 'demontage/index.html', stappen: 3, heeftChecklist: false },
];

for (const dienst of DIENST_PAGINAS) {
  test(`${dienst.pad}: dienstpagina-opbouw`, () => {
    const html = leesPagina(dienst.pad);
    assert.ok(html.includes('class="page-header"'), 'page-header ontbreekt');
    assert.ok(html.includes(`class="steps steps--${dienst.stappen}"`), `verwacht steps--${dienst.stappen}`);
    assert.equal((html.match(/class="step"/g) ?? []).length, dienst.stappen, 'aantal stappen klopt niet');
    assert.equal(html.includes('class="checklist"'), dienst.heeftChecklist, 'checklist-aanwezigheid klopt niet');
    assert.ok(html.includes('class="cta-block__phone"'), 'CTA-telefoonnummer ontbreekt');
    assert.ok(html.includes('aria-current="page"'), 'nav mist aria-current op de actieve pagina');
  });
}

test('contact/index.html: paginaspecifiek', () => {
  const html = leesPagina('contact/index.html');
  assert.ok(html.includes('class="phone-hero'), 'phone-hero ontbreekt');
  assert.equal((html.match(/<th scope="row">/g) ?? []).length, 7, 'verwacht zeven dagen in de openingstijdentabel');
  assert.equal((html.match(/class="is-closed"/g) ?? []).length, 2, 'verwacht twee gesloten dagen');
  assert.ok(
    html.includes('https://www.google.com/maps/search/?api=1&amp;query=Spaarpot+114+5667+KZ+Geldrop'),
    'Google Maps-link ontbreekt'
  );
  assert.ok(html.includes('5 minuten van de A67'), 'routehint ontbreekt');
});

test('over-ons/index.html: paginaspecifiek', () => {
  const html = leesPagina('over-ons/index.html');
  assert.ok(html.includes('class="page-header"'), 'page-header ontbreekt');
  assert.equal((html.match(/class="ph ph--/g) ?? []).length, 2, 'verwacht twee fotoplaceholders');
  assert.ok(html.includes('href="/autosloperij-weber/contact/"'), 'route-link naar contact ontbreekt');
});
