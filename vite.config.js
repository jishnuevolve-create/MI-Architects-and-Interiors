import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Writes robots.txt and sitemap.xml at build time using SITE_URL (set it in .env or
 * your host's environment, e.g. SITE_URL=https://www.your-domain.com).
 * Also swaps %SITE_URL% placeholders in index.html for absolute Open Graph URLs, and
 * %BASE% for the base path (e.g. "/MI-Architects-and-Interiors" on GitHub Pages).
 */
function seoFiles(siteUrl, basePath) {
  const base = (siteUrl || '').replace(/\/$/, '');
  const prefix = basePath.replace(/\/$/, '');
  return {
    name: 'seo-files',
    transformIndexHtml(html, ctx) {
      const out = html.replaceAll('%SITE_URL%', base || prefix).replaceAll('%BASE%', prefix);
      if (!ctx.bundle) return out;
      // Preload the two fonts used above the fold so headings never flash in a fallback serif.
      const fonts = Object.keys(ctx.bundle).filter((f) =>
        /(libre-caslon-text-latin-400-normal|manrope-latin-wght-normal)-[\w-]+\.woff2$/.test(f),
      );
      return {
        html: out,
        tags: fonts.map((f) => ({
          tag: 'link',
          attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: `${prefix}/${f}`, crossorigin: '' },
          injectTo: 'head-prepend',
        })),
      };
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
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${base}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url>\n${['about', 'capabilities', 'projects', 'contact'].map((p) => `  <url><loc>${base}/${p}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>\n`).join('')}</urlset>\n`,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Sub-folder the site is served from. "/" for a normal domain; the GitHub Pages
  // workflow sets BASE_PATH=/MI-Architects-and-Interiors/.
  let basePath = env.BASE_PATH || '/';
  if (!basePath.startsWith('/')) basePath = `/${basePath}`;
  if (!basePath.endsWith('/')) basePath = `${basePath}/`;
  return {
    base: basePath,
    plugins: [react(), tailwindcss(), seoFiles(env.SITE_URL, basePath)],
    build: {
      rollupOptions: {
        // One HTML page per folder: home, about/, capabilities/, projects/, contact/.
        input: {
          main: resolve(import.meta.dirname, 'index.html'),
          ...Object.fromEntries(
            ['about', 'capabilities', 'projects', 'contact'].map((p) => [p, resolve(import.meta.dirname, `${p}/index.html`)]),
          ),
        },
      },
    },
  };
});
