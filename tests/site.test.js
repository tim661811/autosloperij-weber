import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const distDirectory = fileURLToPath(new URL('../dist/', import.meta.url));

// Grows as pages land: Task 4 adds 404, Task 5 index, Task 6 services, Task 7 over-ons/contact.
const PAGINAS = ['index.html', '404.html'];

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
