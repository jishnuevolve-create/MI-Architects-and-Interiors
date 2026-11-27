/**
 * Pages of the site. Each lives in its own folder under the base path:
 *   home -> <base>   about -> <base>about/   capabilities -> <base>capabilities/
 *   projects -> <base>projects/   contact -> <base>contact/
 * The base path is "/" on a normal domain and "/<repo>/" on GitHub Pages.
 */
const BASE = import.meta.env.BASE_URL;

export const PAGES = ['about', 'capabilities', 'projects', 'contact'];

/** URL of a page by id ("home" for the home page). */
export const pageLink = (id) => (id === 'home' ? BASE : `${BASE}${id}/`);

export const CONTACT_URL = pageLink('contact');
export const PROJECTS_URL = pageLink('projects');

/** Link to a section of the home page; works from any page. */
export const homeLink = (id) => `${BASE}#${id}`;

/** Contact page link, optionally pre-filling the form, e.g. { project, sector }. */
export const contactLink = (params) =>
  params ? `${CONTACT_URL}?${new URLSearchParams(params).toString()}` : CONTACT_URL;

/** Projects page opened on one sector. */
export const sectorLink = (id) => `${PROJECTS_URL}?sector=${encodeURIComponent(id)}`;

/** Id of the page being viewed: "home", "about", "capabilities", "projects" or "contact". */
export function currentPage() {
  const rest = window.location.pathname.slice(BASE.length).replace(/\/+$/, '');
  return PAGES.includes(rest) ? rest : 'home';
}

export const isContactPage = () => currentPage() === 'contact';
