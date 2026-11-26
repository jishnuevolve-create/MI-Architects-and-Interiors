import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Images } from 'lucide-react';
import Picture from './ui/Picture.jsx';
import Reveal from './ui/Reveal.jsx';
import ProjectDetail from './ProjectDetail.jsx';
import { projects, sectorName, sectors } from '../data/projects.js';
import { SECTOR_EVENT } from '../lib/sectorEvents.js';

const HASH_PREFIX = '#project/';

/** "All": take one project from each sector in turn, so the first cards show every sector. */
function interleaved() {
  const lists = sectors.map((s) => projects.filter((p) => p.sector === s.id));
  const out = [];
  for (let i = 0; lists.some((l) => l[i]); i++) lists.forEach((l) => l[i] && out.push(l[i]));
  return out;
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [openIndex, setOpenIndex] = useState(null);
  const [progress, setProgress] = useState({ start: 0, size: 1 });
  const trackRef = useRef(null);

  const list = useMemo(() => (filter === 'all' ? interleaved() : projects.filter((p) => p.sector === filter)), [filter]);

  const openProject = useCallback((i) => {
    setOpenIndex(i);
    history.replaceState(null, '', `${HASH_PREFIX}${projects[i].slug}`);
  }, []);
  const navigate = useCallback((i) => openProject((i + projects.length) % projects.length), [openProject]);
  const close = useCallback(() => {
    setOpenIndex(null);
    history.replaceState(null, '', '#projects');
  }, []);

  // Sector picked elsewhere on the page (hero strip, sector tiles, header menu).
  useEffect(() => {
    const onSector = (e) => setFilter(e.detail?.id || 'all');
    window.addEventListener(SECTOR_EVENT, onSector);
    return () => window.removeEventListener(SECTOR_EVENT, onSector);
  }, []);

  // Shared links such as /#project/garden-villa open that project.
  useEffect(() => {
    const fromHash = () => {
      if (!location.hash.startsWith(HASH_PREFIX)) return;
      const i = projects.findIndex((p) => p.slug === location.hash.slice(HASH_PREFIX.length));
      if (i >= 0) {
        setFilter(projects[i].sector);
        setOpenIndex(i);
      }
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

  // Carousel position for the progress bar.
  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress({ start: max > 0 ? el.scrollLeft / el.scrollWidth : 0, size: max > 0 ? el.clientWidth / el.scrollWidth : 1 });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    measure();
    el.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      el.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [filter, measure]);

  const step = (dir) => {
    const el = trackRef.current;
    const card = el?.querySelector('li');
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + 16) * (window.innerWidth >= 1024 ? 2 : 1), behavior: 'smooth' });
  };

  const chips = [{ id: 'all', name: 'All' }, ...sectors];

  return (
    <section id="projects" className="py-3 md:py-5">
      <div className="container-x !max-w-[1440px]">
        <div className="rounded-[28px] border border-line bg-paper py-8 sm:py-10 lg:py-12">
          <div className="flex flex-col gap-6 px-6 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-12">
            <Reveal>
              <p className="eyebrow">Featured projects</p>
              <h2 className="display mt-5 text-[34px] md:text-[44px] xl:text-[48px]">
                Spaces that <em className="text-bronze-deep">Make an Impact.</em>
              </h2>
            </Reveal>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous projects"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-charcoal transition-colors hover:border-espresso hover:bg-espresso hover:text-white"
              >
                <ArrowLeft size={18} strokeWidth={1.6} />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next projects"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-charcoal transition-colors hover:border-espresso hover:bg-espresso hover:text-white"
              >
                <ArrowRight size={18} strokeWidth={1.6} />
              </button>
            </div>
          </div>

          {/* Sector filter */}
          <div role="tablist" aria-label="Filter projects by sector" className="no-scrollbar mt-7 flex gap-2 overflow-x-auto px-6 sm:px-10 lg:px-12">
            {chips.map((c) => {
              const on = filter === c.id;
              const count = c.id === 'all' ? projects.length : projects.filter((p) => p.sector === c.id).length;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setFilter(c.id)}
                  className={`shrink-0 rounded-full border px-5 py-2 text-[14px] font-medium transition-colors duration-300 ${
                    on ? 'border-espresso bg-espresso text-white' : 'border-line bg-ivory text-ink hover:border-taupe'
                  }`}
                >
                  {c.name} <span className={on ? 'text-white/70' : 'text-taupe'}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Carousel */}
          <ul
            ref={trackRef}
            className="no-scrollbar mt-8 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 sm:scroll-px-10 sm:px-10 lg:scroll-px-12 lg:px-12"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {list.map((p, i) => {
                const index = projects.indexOf(p);
                return (
                  <motion.li
                    key={`${filter}-${p.slug}`}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, delay: Math.min(i, 5) * 0.05 }}
                    className="w-[76%] shrink-0 snap-start sm:w-[44%] md:w-[36%] lg:w-[27%] xl:w-[23%]"
                  >
                    <button type="button" onClick={() => openProject(index)} className="group block w-full text-left" aria-label={`View project: ${p.title}`}>
                      <div className="relative overflow-hidden rounded-[16px]">
                        <Picture
                          name={p.cover}
                          alt={`${p.title}: ${p.space.toLowerCase()}`}
                          sizes="(min-width: 1280px) 23vw, (min-width: 1024px) 27vw, (min-width: 640px) 44vw, 76vw"
                          className="aspect-[4/5] w-full"
                          imgClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.06]"
                        />
                        <span className="absolute top-3 left-3 rounded-full bg-paper/90 px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-espresso uppercase backdrop-blur-sm">
                          {sectorName(p.sector)}
                        </span>
                        <span className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-charcoal/60 px-2.5 py-1 text-[11.5px] font-medium text-white backdrop-blur-sm">
                          <Images size={12} strokeWidth={1.8} /> {p.gallery.length}
                        </span>
                      </div>
                      <h3 className="mt-4 text-[17px] font-semibold text-charcoal transition-colors group-hover:text-bronze-deep">{p.title}</h3>
                      <p className="mt-1 text-[13.5px] text-ink/75">{p.space}</p>
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>

          {/* Progress */}
          <div className="mt-8 px-6 sm:px-10 lg:px-12">
            <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-line" aria-hidden="true">
              <span
                className="absolute inset-y-0 rounded-full bg-bronze transition-[left,width] duration-300"
                style={{ left: `${progress.start * 100}%`, width: `${progress.size * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {openIndex !== null && <ProjectDetail key="detail" index={openIndex} onClose={close} onNavigate={navigate} />}
      </AnimatePresence>
    </section>
  );
}
