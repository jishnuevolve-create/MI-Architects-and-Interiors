/**
 * Choosing a sector anywhere on the page (hero strip, sector tiles, the header menu)
 * filters the featured projects to that sector and scrolls to them.
 */
export const SECTOR_EVENT = 'sector:show';

export function showSector(id) {
  window.dispatchEvent(new CustomEvent(SECTOR_EVENT, { detail: { id } }));
  requestAnimationFrame(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
}
