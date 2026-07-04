import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://autosloperijweber.nl',
  base: '/',
  integrations: [
    sitemap({
      filter: (paginaUrl) => !paginaUrl.includes('/404'),
    }),
  ],
});
