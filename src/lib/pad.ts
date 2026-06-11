/**
 * Prefixes an internal path with the configured base path, so links work both
 * on the GitHub Pages project page (base /autosloperij-weber) and later on the
 * custom domain (no base). Always pass site-absolute paths like '/contact/'.
 */
export function pad(padNaarPagina: string): string {
  const basis = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${basis}${padNaarPagina}`;
}
