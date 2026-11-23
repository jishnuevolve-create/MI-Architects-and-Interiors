import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Picture from './ui/Picture.jsx';
import Reveal from './ui/Reveal.jsx';
import { services } from '../data/services.js';

/**
 * Editorial list. Desktop: a sticky photograph on the left changes as you hover a service.
 * Mobile: each service opens like an accordion and shows its photograph inline.
 */
function ServiceBody({ s }) {
  return (
    <>
      <p className="max-w-[560px] text-[15.5px] leading-[1.75] text-ink">{s.description}</p>
      <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
        {s.includes.map((x) => (
          <li key={x} className="flex items-center gap-2 text-[13px] text-ink/80">
            <span className="h-px w-3 bg-bronze" />
            {x}
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="py-24 md:py-32 lg:py-40">
      <div className="container-x">
        <div className="max-w-[820px]">
          <Reveal>
            <p className="eyebrow">What we do</p>
            <h2 className="display mt-5 text-[42px] md:text-[60px] lg:text-[72px]">
              Thoughtful Design. <em className="text-bronze-deep">Every Detail Matters.</em>
            </h2>
            <p className="mt-6 max-w-[560px] text-[16px] leading-[1.75] text-ink">
              From the first sketch to the last fitting, our teams design, build and furnish the space, so you
              deal with one studio instead of a dozen contractors.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-12">
          {/* Sticky photograph (desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 aspect-[4/5] w-full overflow-hidden">
              <AnimatePresence initial={false}>
                <motion.div
                  key={services[active].image}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <Picture
                    name={services[active].image}
                    alt={`${services[active].title}: example from our work`}
                    sizes="40vw"
                    className="h-full w-full"
                  />
                </motion.div>
              </AnimatePresence>
              <p className="absolute bottom-0 left-0 bg-ivory px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-charcoal uppercase">
                {services[active].title}
              </p>
            </div>
          </div>

          <ul className="border-t border-charcoal/80 lg:col-span-7 lg:col-start-6">
            {services.map((s, i) => {
              const isActive = active === i;
              return (
                <li key={s.title} className="border-b border-line">
                  <button
                    type="button"
                    className="group flex w-full items-start gap-5 py-7 text-left md:py-8"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-expanded={isActive}
                  >
                    <span className="flex-1">
                      <span
                        className={`display block text-[28px] transition-colors duration-300 md:text-[36px] ${
                          isActive ? 'text-charcoal' : 'text-charcoal/55 group-hover:text-charcoal'
                        }`}
                      >
                        {s.title}
                      </span>
                    </span>
                    <Plus
                      size={20}
                      strokeWidth={1.3}
                      className={`mt-3 shrink-0 text-bronze transition-transform duration-500 lg:hidden ${isActive ? 'rotate-45' : ''}`}
                    />
                  </button>
                  {/* Desktop: always open, hover only changes the photograph. */}
                  <div className="-mt-3 hidden pb-8 lg:block" onMouseEnter={() => setActive(i)}>
                    <ServiceBody s={s} />
                  </div>
                  {/* Mobile/tablet: accordion with an inline photograph. */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
                        className="overflow-hidden lg:hidden"
                      >
                        <div className="pb-8">
                          <Picture
                            name={s.image}
                            alt={`${s.title}: example from our work`}
                            sizes="100vw"
                            className="mb-6 aspect-[16/10] w-full"
                          />
                          <ServiceBody s={s} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
