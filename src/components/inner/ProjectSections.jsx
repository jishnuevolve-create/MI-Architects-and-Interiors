import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Images } from 'lucide-react';
import Picture from '../ui/Picture.jsx';
import Reveal from '../ui/Reveal.jsx';
import ProjectDetail from '../ProjectDetail.jsx';
import { projects, sectorName, sectors } from '../../data/projects.js';

const HASH_PREFIX = '#project/';
const ease = [0.22, 0.61, 0.36, 1];

/* Repeating editorial rhythm for the gallery (desktop): wide, narrow, then three across. */
const rhythm = [
  { span: 'lg:col-span-7', ratio: 'aspect-[4/3] lg:aspect-[16/11]' },
  { span: 'lg:col-span-5', ratio: 'aspect-[4/3] lg:aspect-[4/5]' },
  { span: 'lg:col-span-4', ratio: 'aspect-[4/3] lg:aspect-[4/5]' },
  { span: 'lg:col-span-4', ratio: 'aspect-[4/3] lg:aspect-[4/5]' },
  { span: 'lg:col-span-4', ratio: 'aspect-[4/3] lg:aspect-[4/5]' },
  { span: 'lg:col-span-5', ratio: 'aspect-[4/3] lg:aspect-[4/5]' },
  { span: 'lg:col-span-7', ratio: 'aspect-[4/3] lg:aspect-[16/11]' },
];

/** Projects page: one state for the spotlight, the gallery and the project viewer. */
export default function ProjectsShowcase() {
  const [filter, setFilter] = useState('all');
  const [openIndex, setOpenIndex] = useState(null);

  const open = useCallback((i) => {
    setOpenIndex(i);
    history.replaceState(null, '', `${location.pathname}${location.search}${HASH_PREFIX}${projects[i].slug}`);
  }, []);
  const navigate = useCallback((i) => open((i + projects.length) % projects.length), [open]);
  const close = useCallback(() => {
    setOpenIndex(null);
    history.replaceState(null, '', `${location.pathname}${location.search}`);
  }, []);

  // ?sector=<id> from the home page; #project/<slug> for shared links.
  useEffect(() => {
    const id = new URLSearchParams(location.search).get('sector');
    if (id && sectors.some((s) => s.id === id)) {
      setFilter(id);
      setTimeout(() => document.getElementById('projects')?.scrollIntoView({ block: 'start' }), 500);
    }
    if (location.hash.startsWith(HASH_PREFIX)) {
      const i = projects.findIndex((p) => p.slug === location.hash.slice(HASH_PREFIX.length));
      if (i >= 0) setOpenIndex(i);
    }
  }, []);

  return (
    <>
      <Spotlight onOpen={open} />
      <Gallery filter={filter} setFilter={setFilter} onOpen={open} />
      <AnimatePresence>
        {openIndex !== null && <ProjectDetail key="detail" index={openIndex} onClose={close} onNavigate={navigate} />}
      </AnimatePresence>
    </>
  );
}

/** Project in focus: one project told large, with its photographs. */
function Spotlight({ onOpen }) {
  const index = projects.findIndex((p) => p.slug === 'garden-villa');
  const p = projects[index];
  const thumbs = p.gallery.slice(1, 4);

  return (
    <section className="py-16 md:py-24">
      <div className="container-x !max-w-[1440px]">
        <Reveal className="mc flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Project in focus</p>
            <h2 className="display mt-5 text-[34px] md:text-[50px]">
              {p.title} <em className="text-bronze-deep">· Architecture &amp; Interiors</em>
            </h2>
          </div>
          <p className="text-[13px] tracking-[0.18em] text-ink/70 uppercase">
            {sectorName(p.sector)}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <button type="button" onClick={() => onOpen(index)} className="group relative block w-full overflow-hidden rounded-[28px]" aria-label={`View project: ${p.title}`}>
              <Picture
                name={p.cover}
                alt={`${p.title}: ${p.space.toLowerCase()}`}
                sizes="(min-width: 1024px) 64vw, 100vw"
                className="aspect-[4/3] w-full lg:aspect-[16/11]"
                imgClassName="transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.04]"
              />
              <span className="absolute right-5 bottom-5 flex items-center gap-2 rounded-full bg-paper/95 px-5 py-3 text-[14px] font-semibold text-espresso shadow-lg backdrop-blur-sm">
                Open gallery <ArrowUpRight size={16} strokeWidth={1.8} />
              </span>
            </button>
          </Reveal>
          <div className="flex flex-col gap-4 lg:col-span-4">
            <Reveal delay={0.1} className="mc rounded-[28px] border border-line bg-paper p-7 md:p-9">
              <p className="text-[16px] leading-[1.8] text-ink">{p.summary}</p>
              <ul className="mc-list mt-6 space-y-3 border-t border-line pt-6">
                {p.details.map((d) => (
                  <li key={d} className="flex gap-3 text-[14.5px] text-charcoal">
                    <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-bronze" />
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.15} className="grid grid-cols-3 gap-3">
              {thumbs.map((g) => (
                <button key={g} type="button" onClick={() => onOpen(index)} className="overflow-hidden rounded-[16px]" aria-label={`View ${p.title} photographs`}>
                  <Picture name={g} alt="" sizes="12vw" className="aspect-square w-full" imgClassName="transition-transform duration-700 hover:scale-110" />
                </button>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Full portfolio: sticky sector filter and an editorial grid. */
function Gallery({ filter, setFilter, onOpen }) {
  const list = useMemo(() => (filter === 'all' ? projects : projects.filter((p) => p.sector === filter)), [filter]);
  const chips = [{ id: 'all', name: 'All projects' }, ...sectors];

  return (
    <section id="projects" className="scroll-mt-24 py-4 md:py-6">
      <div className="container-x !max-w-[1440px]">
        <div className="rounded-[32px] border border-line bg-paper p-5 sm:p-8 lg:p-12">
          <div className="mc flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <p className="eyebrow">The portfolio</p>
              <h2 className="display mt-5 text-[34px] md:text-[48px]">
                {projects.length} Projects. <em className="text-bronze-deep">{sectors.length} Sectors.</em>
              </h2>
            </Reveal>
            <p className="max-w-[380px] text-[15px] leading-[1.75] text-ink">
              Every space below was designed in our studio and built by our own teams. Select a project to see all
              its photographs.
            </p>
          </div>

          {/* Sticky filter */}
          <div className="sticky top-[84px] z-20 -mx-2 mt-8 md:top-[100px]">
            <div
              role="tablist"
              aria-label="Filter projects by sector"
              className="no-scrollbar flex gap-2 overflow-x-auto rounded-full border border-line bg-paper/90 p-1.5 shadow-[0_12px_30px_-20px_rgba(42,33,27,0.35)] backdrop-blur-md"
            >
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
                    className="relative shrink-0 rounded-full px-5 py-2.5 text-[14px] font-medium"
                  >
                    {on && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-espresso" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />}
                    <span className={`relative ${on ? 'text-white' : 'text-ink'}`}>
                      {c.name} <span className={on ? 'text-white/60' : 'text-taupe'}>{count}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <motion.ul layout className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-12">
            <AnimatePresence mode="popLayout" initial={false}>
              {list.map((p, i) => {
                const r = rhythm[i % rhythm.length];
                const index = projects.indexOf(p);
                return (
                  <motion.li
                    key={p.slug}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.55, delay: Math.min(i, 6) * 0.04, ease }}
                    className={r.span}
                  >
                    <button type="button" onClick={() => onOpen(index)} className="group block w-full text-left" aria-label={`View project: ${p.title}`}>
                      <div className="relative overflow-hidden rounded-[22px]">
                        <Picture
                          name={p.cover}
                          alt={`${p.title}: ${p.space.toLowerCase()}`}
                          sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                          className={`${r.ratio} w-full`}
                          imgClassName="transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.05]"
                        />
                        <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(36,25,19,0.65))] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <span className="absolute top-4 left-4 rounded-full bg-paper/92 px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-espresso uppercase backdrop-blur-sm">
                          {sectorName(p.sector)}
                        </span>
                        <span className="absolute right-4 bottom-4 flex h-12 w-12 translate-y-3 items-center justify-center rounded-full bg-paper text-espresso opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                          <ArrowUpRight size={18} strokeWidth={1.6} />
                        </span>
                      </div>
                      <div className="mt-4 flex flex-col items-center gap-2 text-center sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 sm:text-left">
                        <div>
                          <h3 className="display text-[22px] text-charcoal transition-colors group-hover:text-bronze-deep md:text-[26px]">{p.title}</h3>
                          <p className="mt-1 text-[13.5px] text-ink/75">{p.space}</p>
                        </div>
                        <span className="flex shrink-0 items-center gap-1.5 text-[12.5px] text-taupe">
                          <Images size={13} strokeWidth={1.7} /> {p.gallery.length}
                        </span>
                      </div>
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
