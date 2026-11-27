import { homeLink } from './links.js';

/**
 * Choosing a sector anywhere (hero strip, header menu) shows that sector's projects.
 * On the home page it switches the Projects section in place; from another page it
 * opens the home page with ?sector=<id>, which the Projects section reads on load.
 */
export const SECTOR_EVENT = 'sector:show';

export function showSector(id) {
  const section = document.getElementById('projects');
  if (!section) {
    window.location.href = homeLink('projects').replace('#', `?sector=${encodeURIComponent(id)}#`);
    return;
  }
  window.dispatchEvent(new CustomEvent(SECTOR_EVENT, { detail: { id } }));
  requestAnimationFrame(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }));
}
