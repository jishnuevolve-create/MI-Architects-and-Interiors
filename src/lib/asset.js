/**
 * Prefixes a root-relative path ("/images/x.webp") with the site's base path, so the
 * site works both at a domain root and in a sub-folder such as GitHub Pages
 * (/MI-Architects-and-Interiors/). The base comes from `base` in vite.config.js.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export const asset = (path) => `${BASE}${path}`;
