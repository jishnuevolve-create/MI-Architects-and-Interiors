import { sectorLink } from './links.js';

/**
 * Choosing a sector anywhere (hero strip, header menu) shows that sector's projects.
 * Where a Projects section is on the page it switches in place; otherwise it opens the
 * Projects page on that sector (?sector=<id>), which the section reads on load.
 */
export const SECTOR_EVENT = 'sector:show';

export function showSector(id) {
  const section = document.getElementById('projects');
  if (!section) {
    window.location.href = sectorLink(id);
    return;
  }
  window.dispatchEvent(new CustomEvent(SECTOR_EVENT, { detail: { id } }));
  requestAnimationFrame(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }));
}
