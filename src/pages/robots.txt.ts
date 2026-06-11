import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    throw new Error('Stel "site" in astro.config.mjs in.');
  }
  const basis = import.meta.env.BASE_URL.replace(/\/$/, '');
  const sitemapUrl = new URL(`${basis}/sitemap-index.xml`, site).href;
  const inhoud = `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`;
  return new Response(inhoud, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
