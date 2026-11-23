import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Picture from './ui/Picture.jsx';
import Parallax from './ui/Parallax.jsx';
import Reveal from './ui/Reveal.jsx';
import ProjectDetail from './ProjectDetail.jsx';
import { projects } from '../data/projects.js';

/* Editorial placement for each tile (desktop). Mobile is a single column. */
const placement = [
  { wrap: 'md:col-span-8', ratio: 'aspect-[4/3]', sizes: '(min-width: 768px) 64vw, 100vw' },
  { wrap: 'md:col-span-4 md:mt-28', ratio: 'aspect-[4/5]', sizes: '(min-width: 768px) 32vw, 100vw' },
  { wrap: 'md:col-span-5', ratio: 'aspect-[4/5]', sizes: '(min-width: 768px) 40vw, 100vw' },
  { wrap: 'md:col-span-7 md:mt-24', ratio: 'aspect-[16/10]', sizes: '(min-width: 768px) 56vw, 100vw' },
  { wrap: 'md:col-span-5 md:col-start-2', ratio: 'aspect-square', sizes: '(min-width: 768px) 40vw, 100vw' },
  { wrap: 'md:col-span-5 md:col-start-8 md:-mt-16', ratio: 'aspect-[4/5]', sizes: '(min-width: 768px) 40vw, 100vw' },
];

const HASH_PREFIX = '#project/';

export default function Projects() {
  const [openIndex, setOpenIndex] = useState(null);

  const openProject = useCallback((i) => {
    setOpenIndex(i);
    history.replaceState(null, '', `${HASH_PREFIX}${projects[i].slug}`);
  }, []);

  const navigate = useCallback((i) => openProject((i + projects.length) % projects.length), [openProject]);

  const close = useCallback(() => {
    setOpenIndex(null);
    history.replaceState(null, '', '#projects');
  }, []);

  // Support shared links such as /#project/boardroom
  useEffect(() => {
    const fromHash = () => {
      if (!location.hash.startsWith(HASH_PREFIX)) return;
      const i = projects.findIndex((p) => p.slug === location.hash.slice(HASH_PREFIX.length));
      if (i >= 0) setOpenIndex(i);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

  return (
    <section id="projects" className="bg-cream/60 py-24 md:py-32 lg:py-40">
      <div className="container-x">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <p className="eyebrow">Selected work</p>
            <h2 className="display mt-5 text-[42px] md:text-[60px] lg:text-[72px]">
              Spaces We&rsquo;ve <em className="text-bronze-deep">Brought to Life.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
            <p className="text-[16px] leading-[1.75] text-ink">
              A closer look at spaces shaped by thoughtful design and attention to detail.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-x-8 gap-y-14 md:mt-20 md:grid-cols-12 md:gap-y-20">
          {projects.map((p, i) => {
            const pl = placement[i % placement.length];
            return (
              <Reveal as="li" key={p.slug} className={pl.wrap} delay={(i % 2) * 0.08}>
                <button
                  type="button"
                  onClick={() => openProject(i)}
                  className="group block w-full text-left"
                  aria-label={`View project: ${p.title}`}
                >
                  <div className="relative">
                    <Parallax amount={7} className={`${pl.ratio} w-full`}>
                      <Picture
                        name={p.cover}
                        alt={`${p.title}: ${p.space.toLowerCase()}`}
                        sizes={pl.sizes}
                        className="h-full w-full"
                        imgClassName="transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.045]"
                      />
                    </Parallax>
                    <span className="absolute top-4 left-4 bg-ivory/90 px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-charcoal uppercase backdrop-blur-sm">
                      {p.category}
                    </span>
                    <span className="absolute right-4 bottom-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-ivory text-charcoal opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <ArrowUpRight size={18} strokeWidth={1.5} />
                    </span>
                  </div>
                  <div className="mt-5 border-b border-line pb-4">
                    <span className="block text-[12px] tracking-wide text-ink/70">
                      {p.location ? `${p.space} · ${p.location}` : p.space}
                    </span>
                    <h3 className="display mt-1 text-[28px] transition-colors duration-300 group-hover:text-bronze-deep md:text-[32px]">
                      {p.title}
                    </h3>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </ul>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <ProjectDetail
            key="detail"
            index={openIndex}
            onClose={close}
            onNavigate={navigate}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
