import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDownRight, Check, Hammer, Layers, PencilRuler, Play } from 'lucide-react';
import Picture, { imageInfo } from '../ui/Picture.jsx';
import Reveal from '../ui/Reveal.jsx';
import { services } from '../../data/services.js';
import { asset } from '../../lib/asset.js';
import { CONTACT_URL } from '../../lib/links.js';

const pad = (n) => String(n).padStart(2, '0');
const slug = (t) => t.toLowerCase().replace(/[^a-z]+/g, '-');

/** Index of capabilities; each entry jumps to its chapter. */
export function CapabilityIndex() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-x !max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="mc lg:col-span-5">
            <p className="eyebrow">What we do</p>
            <h2 className="display mt-5 text-[34px] md:text-[48px]">
              Six Disciplines. <em className="block text-bronze-deep">One Team.</em>
            </h2>
            <p className="mt-6 max-w-[420px] text-[15.5px] leading-[1.8] text-ink">
              Take a single service, or hand us the whole project. Every discipline is run by our own people, so
              nothing is lost between contractors.
            </p>
          </Reveal>
          <ol className="border-t border-line lg:col-span-7">
            {services.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.05}>
                <a
                  href={`#${slug(s.title)}`}
                  className="group flex items-center gap-5 border-b border-line py-5 transition-colors hover:bg-paper md:gap-8 md:px-4"
                >
                  <span className="w-8 text-[12px] font-semibold tracking-[0.2em] text-bronze-deep">{pad(i + 1)}</span>
                  <span className="display flex-1 text-[22px] text-charcoal transition-transform duration-500 group-hover:translate-x-2 md:text-[28px]">
                    {s.title}
                  </span>
                  <ArrowDownRight size={20} strokeWidth={1.4} className="text-taupe transition-colors group-hover:text-bronze" />
                </a>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/**
 * Chapters: the photograph stays pinned on the left and changes as each capability
 * scrolls past on the right. On phones each chapter shows its own photo.
 */
export function CapabilityChapters() {
  const [active, setActive] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number(e.target.dataset.i))),
      { rootMargin: '-45% 0px -45% 0px' },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="capabilities" className="py-4 md:py-6">
      <div className="container-x !max-w-[1440px]">
        <div className="rounded-[32px] border border-line bg-paper p-6 sm:p-10 lg:p-14">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16">
            {/* Pinned photograph (desktop) */}
            <div className="hidden lg:col-span-6 lg:block">
              <div className="sticky top-28 h-[calc(100vh-9rem)] max-h-[720px] overflow-hidden rounded-[24px]">
                {services.map((s, i) => (
                  <motion.div
                    key={s.title}
                    className="absolute inset-0"
                    initial={false}
                    animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.06 }}
                    transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
                  >
                    <Picture name={s.image} alt={s.title} sizes="45vw" className="h-full w-full" />
                  </motion.div>
                ))}
                <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(36,25,19,0.7))] p-6 text-white">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={active}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.35 }}
                      className="flex items-baseline gap-3"
                    >
                      <span className="display text-[34px] text-[#e2c393]">{pad(active + 1)}</span>
                      <span className="text-[13px] tracking-[0.18em] uppercase">{services[active].title}</span>
                    </motion.p>
                  </AnimatePresence>
                </div>
                {/* Progress rail */}
                <div className="absolute top-6 right-6 flex flex-col gap-2">
                  {services.map((s, i) => (
                    <span
                      key={s.title}
                      className={`block w-1.5 rounded-full transition-all duration-500 ${active === i ? 'h-8 bg-[#e2c393]' : 'h-1.5 bg-white/60'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <ol className="lg:col-span-6">
              {services.map((s, i) => (
                <li
                  key={s.title}
                  id={slug(s.title)}
                  data-i={i}
                  ref={(el) => (refs.current[i] = el)}
                  className="flex scroll-mt-28 flex-col justify-center border-b border-line py-12 last:border-b-0 lg:min-h-[78vh] lg:py-16"
                >
                  <Picture name={s.image} alt={s.title} sizes="100vw" className="mb-8 aspect-[4/3] w-full rounded-[20px] lg:hidden" />
                  <Reveal className="mc">
                    <p className="display text-[56px] leading-none text-bronze/30 md:text-[72px]">{pad(i + 1)}</p>
                    <h3 className="display mt-4 text-[30px] md:text-[40px]">{s.title}</h3>
                    <p className="mt-5 max-w-[520px] text-[16.5px] leading-[1.85] text-ink">{s.description}</p>
                    <ul className="mc-list mt-8 space-y-3.5">
                      {s.includes.map((item) => (
                        <li key={item} className="flex items-center gap-3 border-b border-line/70 pb-3.5 text-[15px] text-charcoal">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-bronze/50 text-bronze-deep">
                            <Check size={12} strokeWidth={2.4} />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

const models = [
  {
    icon: PencilRuler,
    title: 'Design',
    text: 'Concepts, layouts, material selection and working drawings, ready for any contractor to build.',
    points: ['Site survey and brief', 'Concept and space planning', 'Working drawings'],
  },
  {
    icon: Layers,
    title: 'Design + Build',
    text: 'Our complete turnkey service: one team designs, manufactures and builds, with a single point of contact.',
    points: ['Everything in Design', 'Factory-made furniture', 'Civil, fit-out and services', 'Handover'],
    featured: true,
  },
  {
    icon: Hammer,
    title: 'Build & Manufacture',
    text: 'Execution of an approved design, with modular furniture made and installed by our own teams.',
    points: ['Site execution', 'Modular kitchens and wardrobes', 'Quality checks'],
  },
];

/** Ways to work with us. */
export function EngagementModels() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-x !max-w-[1440px]">
        <Reveal className="text-center">
          <p className="eyebrow justify-center">Ways to work with us</p>
          <h2 className="display mt-5 text-[34px] md:text-[46px]">
            Choose Your <em className="text-bronze-deep">Scope.</em>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {models.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.08}>
              <div
                className={`mc flex h-full flex-col rounded-[28px] p-8 transition-transform duration-500 hover:-translate-y-1 md:p-10 ${
                  m.featured ? 'bg-espresso text-white shadow-[0_30px_70px_-30px_rgba(74,51,38,0.7)] lg:-my-4 lg:py-14' : 'border border-line bg-paper'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-full ${m.featured ? 'bg-white/10 text-[#e2c393]' : 'bg-ivory text-bronze-deep'}`}>
                    <m.icon size={20} strokeWidth={1.5} />
                  </span>
                  {m.featured && (
                    <span className="rounded-full border border-[#e2c393]/50 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-[#e2c393] uppercase">
                      Complete service
                    </span>
                  )}
                </div>
                <h3 className="display mt-8 text-[30px]">{m.title}</h3>
                <p className={`mt-4 text-[15px] leading-[1.75] ${m.featured ? 'text-white/75' : 'text-ink'}`}>{m.text}</p>
                <ul className={`mc-list mt-7 flex-1 space-y-3 border-t pt-6 ${m.featured ? 'border-white/15' : 'border-line'}`}>
                  {m.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-[14.5px]">
                      <Check size={15} strokeWidth={2} className={m.featured ? 'text-[#e2c393]' : 'text-bronze'} />
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href={CONTACT_URL}
                  className={`btn mt-9 !rounded-full ${m.featured ? 'bg-paper text-espresso hover:bg-ivory' : 'border border-espresso/30 text-espresso hover:bg-espresso hover:text-white'}`}
                >
                  Enquire
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Full-width studio film. */
export function FilmFeature() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const poster = imageInfo('film/aerial');

  return (
    <section className="py-4 md:py-6">
      <div className="container-x !max-w-[1440px]">
        <div className="relative overflow-hidden rounded-[32px] bg-charcoal">
          <video
            ref={videoRef}
            className="aspect-[4/3] w-full object-cover sm:aspect-video"
            src={asset('/media/miarq-film.mp4')}
            poster={poster ? `${poster.base}-1920.webp` : undefined}
            preload="none"
            playsInline
            controls={playing}
            aria-label="Studio film: our campus, design studio and furniture factory"
          />
          {!playing && (
            <button
              type="button"
              onClick={() => {
                setPlaying(true);
                requestAnimationFrame(() => videoRef.current?.play());
              }}
              className="group absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,rgba(36,25,19,0.25),rgba(36,25,19,0.75))] text-center text-white"
              aria-label="Play the studio film (1 minute 22 seconds)"
            >
              <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-paper text-espresso transition-transform duration-500 group-hover:scale-110 md:h-28 md:w-28">
                <span className="absolute inset-0 animate-ping rounded-full bg-paper/30 motion-reduce:animate-none" />
                <Play size={30} strokeWidth={1.5} className="relative ml-1.5" fill="currentColor" />
              </span>
              <span className="mt-8 text-[11px] font-semibold tracking-[0.28em] text-white/80 uppercase">Watch the film · 1:22</span>
              <span className="display mt-3 px-6 text-[30px] md:text-[48px]">See where it all gets made.</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
