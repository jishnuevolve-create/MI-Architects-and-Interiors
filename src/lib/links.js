/**
 * Links between the two pages of the site:
 *   home    -> <base>          (sections addressed by #id)
 *   contact -> <base>contact/  (the quotation form)
 * The base path is "/" on a normal domain and "/<repo>/" on GitHub Pages.
 */
const BASE = import.meta.env.BASE_URL;

export const CONTACT_URL = `${BASE}contact/`;

/** Link to a section of the home page; works from either page. */
export const homeLink = (id) => `${BASE}#${id}`;

/** Contact page link, optionally pre-filling the form, e.g. { project, sector }. */
export const contactLink = (params) =>
  params ? `${CONTACT_URL}?${new URLSearchParams(params).toString()}` : CONTACT_URL;

export const isContactPage = () => /\/contact\/?$/.test(window.location.pathname);
