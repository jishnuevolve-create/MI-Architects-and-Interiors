import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Images } from 'lucide-react';
import Picture from './ui/Picture.jsx';
import Reveal from './ui/Reveal.jsx';
import ProjectDetail from './ProjectDetail.jsx';
import { projects, projectsBySector, sectors } from '../data/projects.js';
import { SECTOR_EVENT } from '../lib/sectorEvents.js';
import { CONTACT_URL } from '../lib/links.js';

const HASH_PREFIX = '#project/';
const FIRST_BATCH = 6;
const ease = [0.22, 0.61, 0.36, 1];

/** Sector cover: a photo, or a typographic panel while photos are being added. */
function SectorCover({ sector, sizes, className = '' }) {
  if (sector.cover) {
    return <Picture name={sector.cover} alt="" sizes={sizes} className={className} eager />;
  }
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,#6b4c3b_0%,#4a3326_70%)] ${className}`}
    >
      <span className="display text-[64px] text-white/10 italic">{sector.name.slice(0, 1)}</span>
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState(sectors[0].id);
  const [showAll, setShowAll] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const sector = sectors.find((s) => s.id === active);
  const list = projectsBySector(active);
  const visible = showAll ? list : list.slice(0, FIRST_BATCH);

  const choose = (id) => {
    setActive(id);
    setShowAll(false);
    // Below the desktop layout the project list sits under the tiles: bring it into view.
    if (window.innerWidth < 1024) {
      setTimeout(() => document.getElementById('sector-panel')?.scrollIntoView({ block: 'start' }), 60);
    }
  };

  const openProject = useCallback((i) => {
    setOpenIndex(i);
    history.replaceState(null, '', `${HASH_PREFIX}${projects[i].slug}`);
  }, []);

  const navigate = useCallback((i) => openProject((i + projects.length) % projects.length), [openProject]);

  const close = useCallback(() => {
    setOpenIndex(null);
    history.replaceState(null, '', '#projects');
  }, []);

  // Arriving from another page with ?sector=<id> (header Sectors menu).
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('sector');
    if (id && sectors.some((s) => s.id === id)) {
      setActive(id);
      // The browser's own #projects jump happens before the page has laid out; land on it again.
      setTimeout(() => document.getElementById('projects')?.scrollIntoView({ block: 'start' }), 350);
    }
  }, []);

  // Sector picked elsewhere on the page (hero strip, sector tiles, header menu).
  useEffect(() => {
    const onSector = (e) => {
      if (!e.detail?.id) return;
      setActive(e.detail.id);
      setShowAll(false);
    };
    window.addEventListener(SECTOR_EVENT, onSector);
    return () => window.removeEventListener(SECTOR_EVENT, onSector);
  }, []);

  // Shared links such as /#project/garden-villa open that project and its sector.
  useEffect(() => {
    const fromHash = () => {
      if (!location.hash.startsWith(HASH_PREFIX)) return;
      const i = projects.findIndex((p) => p.slug === location.hash.slice(HASH_PREFIX.length));
      if (i >= 0) {
        setActive(projects[i].sector);
        setOpenIndex(i);
      }
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

  return (
    <section id="projects" className="my-3 bg-cream/70 py-16 md:my-5 md:py-24">
      <div className="container-x">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <p className="eyebrow">Featured projects · Sector-wise</p>
            <h2 className="display mt-5 text-[34px] md:text-[44px] xl:text-[52px]">
              Five Sectors. <em className="text-bronze-deep">Designed and Built.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-5">
            <p className="text-[15.5px] leading-[1.75] text-ink md:max-w-[400px] md:justify-self-end">
              From villas to clinics, the same studio draws the plans, makes the furniture and runs the site.
              Choose a sector to see the work.
            </p>
          </Reveal>
        </div>

        {/* Sector selector — expanding image panels on desktop, a tile grid on smaller screens */}
        <div
          role="tablist"
          aria-label="Sectors"
          className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:mt-16 lg:flex lg:h-[440px] lg:gap-3"
        >
          {sectors.map((s, i) => {
            const isActive = s.id === active;
            const count = projectsBySector(s.id).length;
            return (
              <motion.button
                key={s.id}
                type="button"
                role="tab"
                id={`sector-tab-${s.id}`}
                aria-selected={isActive}
                aria-controls="sector-panel"
                onClick={() => choose(s.id)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.8, delay: i * 0.06, ease }}
                className={`group relative isolate aspect-[4/3] overflow-hidden ${
                  // Odd number of sectors: the last tile spans the two-column phone grid.
                  sectors.length % 2 && i === sectors.length - 1
                    ? 'col-span-2 !aspect-[2/1] sm:col-span-1 sm:!aspect-[5/4] lg:!aspect-auto'
                    : ''
                } rounded-[20px] text-left text-white transition-[flex-grow,box-shadow] duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] sm:aspect-[5/4] lg:aspect-auto lg:h-full lg:min-w-0 ${
                  isActive
                    ? 'shadow-[0_0_0_2px_var(--color-bronze)] lg:flex-[3.2]'
                    : 'lg:flex-1 lg:hover:flex-[1.35]'
                }`}
              >
                <SectorCover
                  sector={s}
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 33vw, 50vw"
                  className={`absolute inset-0 -z-10 h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
                    isActive ? 'scale-100' : 'scale-[1.06] group-hover:scale-100'
                  }`}
                />
                <span
                  aria-hidden="true"
                  className={`absolute inset-0 -z-10 transition-colors duration-700 ${
                    isActive
                      ? 'bg-[linear-gradient(180deg,rgba(20,20,18,0)_35%,rgba(20,20,18,0.78)_100%)]'
                      : 'bg-[linear-gradient(180deg,rgba(20,20,18,0.25)_0%,rgba(20,20,18,0.8)_100%)]'
                  }`}
                />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 md:p-5">
                  <span className="min-w-0">
                    <span
                      className={`block text-[10px] font-semibold tracking-[0.22em] text-white/70 uppercase ${
                        isActive ? '' : 'lg:hidden'
                      }`}
                    >
                      {count ? `${count} ${count === 1 ? 'project' : 'projects'}` : 'Portfolio coming soon'}
                    </span>
                    <span
                      className={`display mt-1 block truncate text-[21px] md:text-[24px] lg:text-[25px] ${
                        isActive ? '' : 'lg:rotate-180 lg:overflow-visible lg:[writing-mode:vertical-rl]'
                      }`}
                    >
                      {s.name}
                    </span>
                  </span>
                  <span
                    className={`hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ivory text-charcoal transition-opacity duration-500 lg:flex ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <ArrowRight size={16} strokeWidth={1.6} className="rotate-90" />
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Selected sector */}
        <div
          id="sector-panel"
          role="tabpanel"
          aria-labelledby={`sector-tab-${active}`}
          className="mt-14 grid gap-10 scroll-mt-28 md:mt-20 lg:grid-cols-12 lg:gap-12"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease }}
              className="lg:col-span-12 lg:grid lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <p className="eyebrow">Sector</p>
                  <h3 className="display mt-4 text-[34px] md:text-[44px]">{sector.name}</h3>
                  <p className="mt-5 max-w-[420px] text-[16px] leading-[1.75] text-ink">{sector.intro}</p>
                  {list.length > 0 && (
                    <p className="mt-6 text-[13px] tracking-wide text-ink/70">
                      {list.length} {list.length === 1 ? 'project' : 'projects'} shown
                    </p>
                  )}
                  {sector.clients.length > 0 && (
                    <div className="mt-8 border-t border-line pt-6">
                      <p className="text-[11px] font-semibold tracking-[0.2em] text-taupe uppercase">Clients include</p>
                      <p className="display mt-3 text-[20px] leading-snug text-charcoal">{sector.clients.join(' · ')}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-10 lg:col-span-8 lg:mt-0">
                {list.length === 0 ? (
                  <div className="rounded-[24px] border border-line bg-ivory p-8 md:p-12">
                    <p className="display text-[30px] md:text-[36px]">Hospitality portfolio coming soon.</p>
                    <p className="mt-4 max-w-[520px] text-[15.5px] leading-[1.75] text-ink">
                      We are adding photographs of our hospitality work. To see references for a hotel, café or guest
                      space, ask us and we will share them directly.
                    </p>
                    <a href={CONTACT_URL} className="btn btn-dark mt-8">
                      Ask for hospitality references <ArrowRight size={16} strokeWidth={1.6} />
                    </a>
                  </div>
                ) : (
                  <>
                    <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
                      {visible.map((p, i) => {
                        const index = projects.indexOf(p);
                        // Odd counts: the first project spans both columns so the grid closes evenly.
                        const feature = i === 0 && visible.length % 2 === 1;
                        return (
                          <motion.li
                            key={p.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: Math.min(i, 6) * 0.06, ease }}
                            className={feature ? 'sm:col-span-2' : ''}
                          >
                            <button
                              type="button"
                              onClick={() => openProject(index)}
                              className="group block w-full text-left"
                              aria-label={`View project: ${p.title}`}
                            >
                              <div className="relative overflow-hidden rounded-[18px]">
                                <Picture
                                  name={p.cover}
                                  alt={`${p.title}: ${p.space.toLowerCase()}`}
                                  sizes={feature ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw'}
                                  className={`${feature ? 'aspect-[16/9]' : 'aspect-[4/3]'} w-full`}
                                  imgClassName="transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.05]"
                                />
                                <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-ivory/90 px-3 py-1.5 text-[10.5px] font-semibold tracking-[0.12em] text-charcoal uppercase backdrop-blur-sm">
                                  <Images size={12} strokeWidth={1.8} /> {p.gallery.length}
                                </span>
                                <span className="absolute right-3 bottom-3 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-ivory text-charcoal opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100">
                                  <ArrowUpRight size={18} strokeWidth={1.5} />
                                </span>
                              </div>
                              <div className="mt-4 flex items-baseline justify-between gap-4 border-b border-line pb-3">
                                <h4 className="display text-[21px] transition-colors duration-300 group-hover:text-bronze-deep md:text-[23px]">
                                  {p.title}
                                </h4>
                                <span className="shrink-0 text-right text-[12px] tracking-wide text-ink/70">{p.space}</span>
                              </div>
                            </button>
                          </motion.li>
                        );
                      })}
                    </ul>
                    {list.length > FIRST_BATCH && (
                      <button
                        type="button"
                        onClick={() => setShowAll((v) => !v)}
                        className="btn mt-10 w-full border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory sm:w-auto"
                        aria-expanded={showAll}
                      >
                        {showAll ? 'Show fewer' : `Show all ${list.length} ${sector.name.toLowerCase()} projects`}
                      </button>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <ProjectDetail key="detail" index={openIndex} onClose={close} onNavigate={navigate} />
        )}
      </AnimatePresence>
    </section>
  );
}
