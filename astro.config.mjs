import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import instruckt from 'instruckt-astro';

// POC runs on a GitHub Pages project page, hence site + base.
// Phase 2 (custom domain): set site to the domain and remove base.
export default defineConfig({
  site: 'https://autosloperijweber.nl',
  base: '/',
  integrations: [
    sitemap({
      filter: (paginaUrl) => !paginaUrl.includes('/404'),
    }),
    // Dev-only UI annotation toolbar; annotations land in .instruckt/ (gitignored).
    instruckt(),
  ],
});
