import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Writes robots.txt and sitemap.xml at build time using SITE_URL (set it in .env or
 * your host's environment, e.g. SITE_URL=https://www.your-domain.com).
 * Also swaps %SITE_URL% placeholders in index.html for absolute Open Graph URLs.
 */
function seoFiles(siteUrl) {
  const base = (siteUrl || '').replace(/\/$/, '');
  return {
    name: 'seo-files',
    transformIndexHtml(html) {
      return html.replaceAll('%SITE_URL%', base);
    },
    generateBundle() {
      if (!base) {
        this.warn('SITE_URL is not set: sitemap.xml is skipped and OG URLs are relative.');
        this.emitFile({ type: 'asset', fileName: 'robots.txt', source: 'User-agent: *\nAllow: /\n' });
        return;
      }
      const today = new Date().toISOString().slice(0, 10);
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${base}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url>\n</urlset>\n`,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), tailwindcss(), seoFiles(env.SITE_URL)],
  };
});
