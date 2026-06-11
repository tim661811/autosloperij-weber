import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// POC runs on a GitHub Pages project page, hence site + base.
// Phase 2 (custom domain): set site to the domain and remove base.
export default defineConfig({
  site: 'https://tim661811.github.io',
  base: '/autosloperij-weber',
  integrations: [
    sitemap({
      filter: (paginaUrl) => !paginaUrl.includes('/404'),
    }),
  ],
});
