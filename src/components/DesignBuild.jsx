import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, PencilRuler, HardHat } from 'lucide-react';
import Picture, { imageInfo } from './ui/Picture.jsx';
import Reveal from './ui/Reveal.jsx';
import { asset } from '../lib/asset.js';

const design = [
  'Site visit, measurements and brief',
  'Space planning and concept design',
  'Material, finish and furniture selection',
  'Working drawings, coordinated with building services',
];

const build = [
  'Civil and interior works by our own site teams',
  'Modular furniture made in our own factory',
  'HVAC, electrical, plumbing, fire and IT works',
  'Supervision, quality checks and handover',
];

/** Frames from the studio film and project photos, in the order the work happens. */
const journey = [
  { name: 'film/studio', stage: 'Design', label: 'Our design studio' },
  { name: 'film/drawings', stage: 'Design', label: 'Working drawings' },
  { name: 'film/materials', stage: 'Design', label: 'Material selection' },
  { name: 'film/factory', stage: 'Make', label: 'Our furniture factory' },
  { name: 'film/edge-banding', stage: 'Make', label: 'Panel edge-banding' },
  { name: 'film/assembly', stage: 'Make', label: 'Assembly and finishing' },
  { name: 'work/apartment-handover/01', stage: 'Build', label: 'Fitted on site, handover day' },
  { name: 'work/garden-villa/01', stage: 'Build', label: 'Finished and lived in' },
];

function Film() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const poster = imageInfo('film/aerial');

  const play = () => {
    setPlaying(true);
    requestAnimationFrame(() => videoRef.current?.play());
  };

  return (
    <div className="relative overflow-hidden rounded-[24px] bg-charcoal">
      <video
        ref={videoRef}
        className="aspect-video w-full"
        src={asset('/media/miarq-film.mp4')}
        poster={poster ? `${poster.base}-1600.webp` : undefined}
        preload="none"
        playsInline
        controls={playing}
        aria-label="Studio film: our campus, design studio and furniture factory"
      />
      {!playing && (
        <button
          type="button"
          onClick={play}
          className="group absolute inset-0 flex items-end justify-between gap-4 bg-[linear-gradient(180deg,rgba(20,20,18,0)_40%,rgba(20,20,18,0.75)_100%)] p-5 text-left text-white md:p-8"
          aria-label="Play the studio film (1 minute 22 seconds)"
        >
          <span>
            <span className="block text-[11px] font-semibold tracking-[0.24em] text-white/75 uppercase">Watch · 1:22</span>
            <span className="display mt-2 block text-[28px] md:text-[40px]">Inside our studio and factory</span>
          </span>
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-ivory text-charcoal transition-transform duration-500 group-hover:scale-110 md:h-20 md:w-20">
            <Play size={24} strokeWidth={1.6} className="ml-1" fill="currentColor" />
          </span>
        </button>
      )}
    </div>
  );
}

export default function DesignBuild() {
  // Pinned horizontal strip: the section holds while vertical scroll moves the frames sideways.
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: pinRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <section id="design-build" className="overflow-x-clip pt-24 pb-24 md:pt-32 md:pb-16 lg:pt-40">
      <div className="container-x">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-8">
            <p className="eyebrow">Design + Build</p>
            <h2 className="display mt-5 text-[40px] md:text-[60px] lg:text-[72px]">
              One Team, from First Drawing <em className="text-bronze-deep">to Handover.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4">
            <p className="text-[15.5px] leading-[1.75] text-ink">
              The people who design your space work beside our factory and site teams. Nothing is handed over to
              an outside contractor to interpret, so what gets built is what was drawn.
            </p>
          </Reveal>
        </div>

        {/* Design and Build, side by side */}
        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-5">
          {[
            { title: 'Design', icon: PencilRuler, items: design, tone: 'light' },
            { title: 'Build', icon: HardHat, items: build, tone: 'dark' },
          ].map((col, i) => (
            <Reveal key={col.title} delay={i * 0.1}>
              <div
                className={`h-full rounded-[24px] p-7 md:p-10 ${
                  col.tone === 'dark' ? 'bg-charcoal text-ivory' : 'border border-line bg-ivory'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="display text-[40px] md:text-[48px]">{col.title}</h3>
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      col.tone === 'dark' ? 'bg-white/10 text-[#d9c2a3]' : 'bg-cream text-bronze-deep'
                    }`}
                  >
                    <col.icon size={20} strokeWidth={1.5} />
                  </span>
                </div>
                <ul className={`mt-6 border-t ${col.tone === 'dark' ? 'border-white/15' : 'border-line'}`}>
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className={`flex gap-3 border-b py-4 text-[15px] leading-[1.6] ${
                        col.tone === 'dark' ? 'border-white/15 text-white/80' : 'border-line text-ink'
                      }`}
                    >
                      <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-bronze" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-5">
          <Film />
        </Reveal>
      </div>

      {/* From drawing to handover. Desktop: pinned, scrolls sideways. Mobile: swipe. */}
      <div ref={pinRef} className="relative mt-20 hidden md:block" style={{ height: `calc(100vh + ${distance}px)` }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-20">
          <div className="container-x flex items-end justify-between gap-6">
            <h3 className="display text-[40px] lg:text-[48px]">
              From drawing <em className="text-bronze-deep">to handover.</em>
            </h3>
            <p className="text-[11px] font-semibold tracking-[0.24em] text-taupe uppercase">Design · Make · Build</p>
          </div>
          <motion.ol
            ref={trackRef}
            style={{ x }}
            className="mt-10 flex w-max gap-5 pr-[max(20px,calc((100vw-1280px)/2+40px))] pl-[max(20px,calc((100vw-1280px)/2+40px))]"
          >
            {journey.map((f, i) => (
              <li key={f.name} className="w-[min(420px,40vw)] shrink-0">
                <Picture name={f.name} alt={f.label} sizes="420px" className="aspect-[4/3] w-full rounded-[18px]" />
                <p className="mt-3 flex items-baseline gap-3 text-[13px] text-ink">
                  <span className="text-[11px] font-semibold tracking-[0.2em] text-bronze-deep uppercase">
                    {String(i + 1).padStart(2, '0')} · {f.stage}
                  </span>
                  {f.label}
                </p>
              </li>
            ))}
          </motion.ol>
        </div>
      </div>

      <div className="mt-20 md:hidden">
        <h3 className="container-x display text-[30px]">
          From drawing <em className="text-bronze-deep">to handover.</em>
        </h3>
        {/* Mobile: swipeable row */}
        <ol className="no-scrollbar mt-6 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 md:hidden">
          {journey.map((f, i) => (
            <li key={f.name} className="w-[78%] shrink-0 snap-start">
              <Picture name={f.name} alt={f.label} sizes="80vw" className="aspect-[4/3] w-full rounded-[18px]" />
              <p className="mt-3 text-[13px] text-ink">
                <span className="mr-2 text-[11px] font-semibold tracking-[0.2em] text-bronze-deep uppercase">
                  {String(i + 1).padStart(2, '0')} · {f.stage}
                </span>
                {f.label}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
