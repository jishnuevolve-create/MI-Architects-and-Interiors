import { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ClipboardList, HardHat, KeyRound, PencilRuler, Search } from 'lucide-react';
import { processSteps } from '../data/content.js';

const stepIcons = [Search, PencilRuler, ClipboardList, HardHat, KeyRound];

const N = processSteps.length;
const pad = (n) => String(n).padStart(2, '0');

/**
 * Pinned process timeline: the section holds in place while scrolling moves the
 * highlight from step 1 to step 4, then the page carries on to the next section.
 */
export default function Process() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setStep(Math.min(N - 1, Math.max(0, Math.floor(v * N))));
  });

  // Desktop line runs under four equal columns; mobile line runs between evenly spaced circles.
  const lineDesktop = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineMobile = useTransform(scrollYProgress, (v) => Math.min(1, (v * N) / (N - 1)));

  const goTo = (i) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((i + 0.5) / N) * travel, behavior: reduce ? 'auto' : 'smooth' });
  };

  const current = processSteps[step];

  return (
    <section id="process" ref={ref} className="relative h-[340vh] lg:h-[360vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-[84px] pb-6 md:pt-24">
        <div className="container-x w-full">
          <div className="mc grid gap-4 md:grid-cols-12 md:items-end md:gap-8">
            <div className="md:col-span-8">
              <p className="eyebrow">Our process</p>
              <h2 className="display mt-4 text-[30px] sm:text-[38px] md:mt-5 md:text-[46px] lg:text-[52px]">
                A Seamless Path <em className="text-bronze-deep">from Idea to Handover.</em>
              </h2>
            </div>
            <p className="hidden text-[15.5px] leading-[1.75] text-ink sm:block md:col-span-4">
              Five clear stages, with one team accountable from the first site visit to handover.
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 text-[11px] font-semibold tracking-[0.24em] text-taupe uppercase md:mt-14 md:justify-start">
            <span className="text-bronze-deep">Step {pad(step + 1)}</span>
            <span className="h-px w-8 bg-line" />
            <span>{pad(N)}</span>
          </div>

          <ol className="relative mt-5 flex justify-between lg:mt-8 lg:grid lg:grid-cols-5 lg:gap-8">
            {/* Track and fill (mobile: between circle centres) */}
            <span aria-hidden="true" className="absolute top-6 right-6 left-6 h-px bg-line lg:hidden" />
            <motion.span
              aria-hidden="true"
              className="absolute top-6 right-6 left-6 h-px origin-left bg-bronze lg:hidden"
              style={{ scaleX: lineMobile }}
            />
            {/* Track and fill (desktop: under the columns) */}
            <span aria-hidden="true" className="absolute top-[34px] right-0 left-[34px] hidden h-px bg-line lg:block" />
            <motion.span
              aria-hidden="true"
              className="absolute top-[34px] right-0 left-[34px] hidden h-px origin-left bg-bronze lg:block"
              style={{ scaleX: lineDesktop }}
            />

            {processSteps.map((s, i) => {
              const state = i < step ? 'done' : i === step ? 'active' : 'next';
              const Icon = stepIcons[i % stepIcons.length];
              return (
                <li key={s.title} className="relative" aria-current={state === 'active' ? 'step' : undefined}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Step ${i + 1}: ${s.title}`}
                    className={`display relative z-10 flex h-12 w-12 items-center justify-center rounded-full border text-[19px] transition-all duration-500 lg:h-[68px] lg:w-[68px] lg:text-[26px] ${
                      state === 'active'
                        ? 'scale-110 border-espresso bg-espresso text-white shadow-[0_0_0_6px_var(--color-ivory),0_0_0_7px_var(--color-bronze)]'
                        : state === 'done'
                          ? 'border-bronze bg-bronze text-white'
                          : 'border-line bg-ivory text-taupe hover:border-bronze hover:text-bronze-deep'
                    }`}
                  >
                    <Icon size={22} strokeWidth={1.5} className="lg:h-[26px] lg:w-[26px]" />
                  </button>

                  {/* Desktop: all four columns, the current one in focus. Mobile: read by screen readers only. */}
                  <div
                    className={`sr-only transition-opacity duration-500 lg:not-sr-only lg:mt-10 ${
                      state === 'active' ? 'lg:opacity-100' : state === 'done' ? 'lg:opacity-50' : 'lg:opacity-30'
                    }`}
                  >
                    <p className="text-[12px] font-semibold tracking-[0.2em] text-bronze-deep">{pad(i + 1)}</p>
                    <h3 className="display mt-1 text-[24px] xl:text-[26px]">{s.title}</h3>
                    <p className="mt-3 max-w-[300px] text-[14.5px] leading-[1.7] text-ink">{s.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Mobile and tablet: the current step, large */}
          <div className="mc relative mt-8 min-h-[190px] md:min-h-[170px] lg:hidden" aria-hidden="true">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <p className="text-[12px] font-semibold tracking-[0.2em] text-bronze-deep">{pad(step + 1)}</p>
                <h3 className="display mt-1 text-[28px] md:text-[34px]">{current.title}</h3>
                <p className="mt-3 max-w-[520px] text-[15.5px] leading-[1.75] text-ink">{current.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
