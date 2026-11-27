import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Check, X } from 'lucide-react';
import Parallax from '../ui/Parallax.jsx';
import Picture from '../ui/Picture.jsx';
import Reveal from '../ui/Reveal.jsx';
import { site } from '../../data/site.js';
import { strengths } from '../../data/content.js';

const ease = [0.22, 0.61, 0.36, 1];

const comparison = [
  { topic: 'Who designs the space', usual: 'An independent designer', ours: 'Our in-house design studio' },
  { topic: 'Who makes the furniture', usual: 'An outside carpenter or vendor', ours: 'Our own furniture factory' },
  { topic: 'Who builds on site', usual: 'A contractor hired separately', ours: 'Our own site teams' },
  { topic: 'Building services', usual: 'Added later by other trades', ours: 'Planned with the design' },
  { topic: 'Your point of contact', usual: 'Three or more parties', ours: 'One project team' },
  { topic: 'When something needs fixing', usual: 'Each party points to another', ours: 'One team is accountable' },
];

/** The usual way vs the MiArq way: why one team for design, build and manufacture matters. */
export function Comparison() {
  return (
    <section className="py-14 md:py-20">
      <div className="container-x !max-w-[1440px]">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="eyebrow">Why one team</p>
            <h2 className="display mt-5 text-[34px] md:text-[48px]">
              One Team <em className="text-bronze-deep">Instead of Three.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[400px] text-[15.5px] leading-[1.75] text-ink">
              Most interiors pass through a designer, a contractor and a furniture maker. Here is what changes when
              they are the same company.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-10 overflow-hidden rounded-[28px] border border-line bg-paper md:mt-12">
          {/* Column heads */}
          <div className="grid grid-cols-2 md:grid-cols-[1.1fr_1fr_1fr]">
            <div className="hidden p-6 md:block lg:p-8" />
            <div className="border-line p-5 md:border-l md:p-6 lg:p-8">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-taupe uppercase">The usual way</p>
              <p className="display mt-2 text-[20px] text-ink/70 md:text-[24px]">Separate contractors</p>
            </div>
            <div className="relative bg-espresso p-5 text-white md:p-6 lg:p-8">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-[#e2c393] uppercase">The MiArq way</p>
              <p className="display mt-2 text-[20px] md:text-[24px]">
                <span className="md:hidden">One company</span>
                <span className="hidden md:inline">Design · Build · Manufacture</span>
              </p>
            </div>
          </div>

          <ul>
            {comparison.map((row, i) => (
              <motion.li
                key={row.topic}
                className="grid grid-cols-2 border-t border-line md:grid-cols-[1.1fr_1fr_1fr]"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                transition={{ duration: 0.6, delay: i * 0.06, ease }}
              >
                <p className="col-span-2 px-5 pt-5 text-[12px] font-semibold tracking-[0.14em] text-charcoal uppercase md:col-span-1 md:flex md:items-center md:p-6 md:text-[15.5px] md:font-medium md:tracking-normal md:normal-case lg:px-8">
                  {row.topic}
                </p>
                <p className="flex items-start gap-3 px-5 py-4 text-[14.5px] text-ink/70 md:items-center md:border-l md:border-line md:p-6 lg:px-8">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line text-taupe md:mt-0">
                    <X size={12} strokeWidth={2.2} />
                  </span>
                  {row.usual}
                </p>
                <p className="flex items-start gap-3 bg-espresso px-5 py-4 text-[14.5px] font-medium text-white md:items-center md:p-6 lg:px-8">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e2c393] text-espresso md:mt-0">
                    <Check size={13} strokeWidth={2.6} />
                  </span>
                  {row.ours}
                </p>
              </motion.li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/** Story: sticky heading and photo collage beside the long-form text. */
export function Story() {
  return (
    <section className="py-4 md:py-6">
      <div className="container-x !max-w-[1440px]">
        <div className="rounded-[32px] border border-line bg-paper p-6 sm:p-10 lg:p-16">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <Reveal>
                  <p className="eyebrow">Our story</p>
                  <h2 className="display mt-5 text-[34px] md:text-[48px]">
                    One Studio. <em className="block text-bronze-deep">Every Trade.</em>
                  </h2>
                </Reveal>
                <div className="relative mt-10 hidden pb-16 lg:block">
                  <Parallax amount={6} className="aspect-[4/5] w-[78%] rounded-[22px]">
                    <Picture name="film/studio" alt="The glass-walled design studio on our campus" sizes="30vw" className="h-full w-full" />
                  </Parallax>
                  <div className="absolute right-0 bottom-0 w-[48%] rounded-[20px] border-[8px] border-paper shadow-[0_24px_50px_-24px_rgba(42,33,27,0.5)]">
                    <Picture name="film/assembly" alt="Our craftsmen assembling furniture in the factory" sizes="20vw" className="aspect-square w-full rounded-[12px]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-8 text-[16.5px] leading-[1.9] text-ink lg:col-span-7 lg:pt-20">
              <Reveal>
                <p className="display text-[24px] leading-[1.5] text-charcoal md:text-[28px]">
                  {site.legalName} keeps every stage of an interior with one team, so the space that is built is the
                  space that was designed.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  Led by {site.founder}, we bring every stage of an interior under one roof. Our designers plan the
                  space and select every material. Our own factory makes the kitchens, wardrobes and furniture on CNC,
                  edge-banding and multi-boring machines. Our site teams carry out the civil works, fit-out and
                  building services, and install what the factory makes.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  Because one team owns the whole job, decisions travel quickly, details survive from drawing to
                  finish, and you have a single point of contact from the first site visit to the day you move in.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  Today we work across residential, commercial, retail, education and healthcare projects, for
                  families, growing businesses and national brands alike.
                </p>
              </Reveal>
              <Reveal className="grid grid-cols-2 gap-4 pt-4 lg:hidden">
                <Picture name="film/studio" alt="The glass-walled design studio on our campus" sizes="50vw" className="aspect-[4/5] w-full rounded-[18px]" />
                <Picture name="film/assembly" alt="Our craftsmen assembling furniture in the factory" sizes="50vw" className="aspect-[4/5] w-full rounded-[18px]" />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Counts up to a figure such as "200+" when it comes into view. */
function Counter({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduce = useReducedMotion();
  const target = parseInt(value, 10);
  const suffix = value.replace(/^\d+/, '');
  const [n, setN] = useState(reduce ? target : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / 1600);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, target]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/** Figures from the company profile, large on espresso. */
export function Numbers() {
  return (
    <section className="py-4 md:py-6">
      <div className="container-x !max-w-[1440px]">
        <div className="relative overflow-hidden rounded-[32px] bg-espresso px-6 py-14 text-white sm:px-10 md:py-20 lg:px-16">
          <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full border border-[#e2c393]/20" />
          <div aria-hidden="true" className="pointer-events-none absolute -top-10 -right-10 h-44 w-44 rounded-full border border-[#e2c393]/15" />
          <Reveal>
            <p className="eyebrow !text-[#e2c393] before:!bg-[#e2c393]">By the numbers</p>
          </Reveal>
          <dl className="mt-10 grid grid-cols-2 gap-y-12 lg:grid-cols-4">
            {site.facts.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.08} className={`${i % 2 ? 'border-l border-white/15 pl-6' : ''} lg:border-l lg:border-white/15 lg:pl-8 ${i === 0 ? 'lg:border-l-0 lg:pl-0' : ''}`}>
                <dd className="display text-[56px] leading-none text-[#e2c393] md:text-[80px]">
                  <Counter value={f.value} />
                </dd>
                <dt className="mt-4 text-[13.5px] tracking-wide text-white/70">{f.label}</dt>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/** Principles: numbered editorial list with fine rules. */
export function Principles() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-x !max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">What we stand for</p>
            <h2 className="display mt-5 text-[34px] md:text-[46px]">
              Four <em className="text-bronze-deep">Principles.</em>
            </h2>
            <p className="mt-5 max-w-[340px] text-[15.5px] leading-[1.8] text-ink">
              The standards every project is held to, whatever its size or sector.
            </p>
          </Reveal>
          <ol className="grid border-t border-line sm:grid-cols-2 lg:col-span-8">
            {strengths.map((s, i) => (
              <Reveal
                as="li"
                key={s.title}
                delay={i * 0.06}
                className={`group border-b border-line py-8 sm:pr-8 ${i % 2 ? 'sm:border-l sm:pl-8' : ''}`}
              >
                <span className="display text-[40px] leading-none text-bronze/40 transition-colors duration-500 group-hover:text-bronze">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="display mt-5 text-[24px] text-charcoal">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.75] text-ink">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

const roof = [
  { name: 'film/aerial', label: 'Our campus, Ahmedabad' },
  { name: 'film/design-team', label: 'Design studio' },
  { name: 'film/materials', label: 'Material library' },
  { name: 'film/factory', label: 'Furniture factory' },
  { name: 'film/edge-banding', label: 'Precision machinery' },
  { name: 'work/apartment-handover/01', label: 'On site, at handover' },
];

/**
 * Under one roof. Desktop: the section pins while scrolling moves the photographs sideways,
 * starting with the first fully in view and releasing once the last is fully in view.
 * Phones: a swipeable row.
 */
export function UnderOneRoof() {
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: pinRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance], { clamp: true });
  const bar = useTransform(scrollYProgress, [0.05, 0.95], [0, 1], { clamp: true });

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

  const heading = (
    <div className="container-x !max-w-[1440px]">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Under one roof</p>
          <h2 className="display mt-5 text-[34px] md:text-[46px]">
            Studio, Factory <em className="text-bronze-deep">and Site.</em>
          </h2>
        </div>
        <p className="max-w-[380px] text-[15px] leading-[1.75] text-ink">
          Everything needed to take a space from idea to handover, run by our own people.
        </p>
      </div>
    </div>
  );

  const caption = (r, i) => (
    <p className="mt-3 flex items-center gap-3 text-[13.5px] text-ink">
      <span className="text-[11px] font-semibold tracking-[0.2em] text-bronze-deep">{String(i + 1).padStart(2, '0')}</span>
      {r.label}
    </p>
  );

  return (
    <section aria-label="Studio, factory and site" className="overflow-x-clip">
      {/* Desktop: pinned horizontal scroll */}
      <div ref={pinRef} className="relative hidden md:block" style={{ height: `calc(100vh + ${distance}px)` }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-24">
          {heading}
          <motion.ol
            ref={trackRef}
            style={{ x }}
            className="mt-10 flex w-max gap-6 pr-[max(20px,calc((100vw-1440px)/2+40px))] pl-[max(20px,calc((100vw-1440px)/2+40px))]"
          >
            {roof.map((r, i) => (
              <li key={r.name} className="w-[min(520px,42vw)] shrink-0">
                <Picture name={r.name} alt={r.label} sizes="520px" className="aspect-[3/2] w-full rounded-[22px]" />
                {caption(r, i)}
              </li>
            ))}
          </motion.ol>
          {/* Progress */}
          <div className="container-x !max-w-[1440px] mt-8">
            <div className="h-[2px] w-full overflow-hidden rounded-full bg-line" aria-hidden="true">
              <motion.span className="block h-full origin-left bg-bronze" style={{ scaleX: bar }} />
            </div>
          </div>
        </div>
      </div>

      {/* Phones: swipe */}
      <div className="py-14 md:hidden">
        {heading}
        <ol className="no-scrollbar mt-8 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5">
          {roof.map((r, i) => (
            <li key={r.name} className="w-[80%] shrink-0 snap-start">
              <Picture name={r.name} alt={r.label} sizes="80vw" className="aspect-[3/2] w-full rounded-[20px]" />
              {caption(r, i)}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Client names in a fine-ruled grid. */
export function ClientWall() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-x !max-w-[1440px]">
        <Reveal className="text-center">
          <p className="eyebrow justify-center">Clients &amp; brands</p>
          <h2 className="display mt-5 text-[34px] md:text-[46px]">
            Trusted by <em className="text-bronze-deep">Leading Names.</em>
          </h2>
        </Reveal>
        <ul className="mt-12 grid grid-cols-2 overflow-hidden rounded-[28px] border border-line bg-paper sm:grid-cols-3 lg:grid-cols-5">
          {site.clients.map((c, i) => (
            <Reveal
              as="li"
              key={c}
              delay={(i % 5) * 0.04}
              className="group -mt-px -ml-px flex min-h-[110px] items-center justify-center border-t border-l border-line px-4 text-center"
            >
              <span className="display text-[19px] text-charcoal/75 transition-colors duration-300 group-hover:text-bronze-deep md:text-[22px]">
                {c}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
