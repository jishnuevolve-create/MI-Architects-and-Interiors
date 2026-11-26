import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Building2, GraduationCap, Home, ShoppingBag, Stethoscope } from 'lucide-react';
import Picture from './ui/Picture.jsx';
import { sectors } from '../data/projects.js';
import { showSector } from '../lib/sectorEvents.js';

const ease = [0.22, 0.61, 0.36, 1];
export const sectorIcons = {
  residential: Home,
  corporate: Building2,
  retail: ShoppingBag,
  education: GraduationCap,
  health: Stethoscope,
};

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section id="home" ref={ref} className="relative bg-ivory pt-[72px] md:pt-[84px]">
      <div className="relative flex flex-col lg:block">
        {/* Photo with a sweeping arch on its left edge (desktop); full-bleed card on mobile */}
        <motion.div
          className="relative order-2 mx-5 mb-6 h-[300px] overflow-hidden rounded-[24px] sm:h-[420px] lg:order-none lg:mb-0 lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:mt-0 lg:h-auto lg:w-[64%] lg:rounded-none lg:rounded-tl-[46%_100%] lg:border-l-[26px] lg:border-cream"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease }}
        >
          <motion.div className="h-full w-full origin-center" style={reduce ? undefined : { scale: imgScale }}>
            <Picture
              name="work/double-height-residence/02"
              alt="Double-height living room with stone feature walls, layered lighting and a full-height artwork"
              sizes="(min-width: 1024px) 64vw, 100vw"
              priority
              className="h-full w-full"
            />
          </motion.div>
        </motion.div>
        <div className="container-x relative order-1 !max-w-[1440px] pt-8 pb-8 md:py-16 lg:flex lg:min-h-[500px] lg:items-center lg:py-14 xl:min-h-[540px]">
          <div className="max-w-[560px] lg:max-w-[42%] xl:max-w-[520px]">
            <motion.h1
              className="display text-[40px] font-normal text-charcoal sm:text-[50px] lg:text-[50px] xl:text-[58px]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease }}
            >
              Spaces Designed <span className="whitespace-nowrap">with Purpose.</span>
              <em className="mt-1 block text-bronze-deep">Built with Precision.</em>
            </motion.h1>
            <motion.span
              aria-hidden="true"
              className="mt-8 block h-[3px] w-20 origin-left bg-bronze"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.6, ease }}
            />
            <motion.p
              className="mt-7 max-w-[440px] text-[16px] leading-[1.75] text-ink"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease }}
            >
              Interiors designed in our studio, made in our own factory and built by our own site teams, from
              Ahmedabad.
            </motion.p>
            <motion.div
              className="mt-9 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85, ease }}
            >
              <a href="#projects" className="btn btn-dark">
                Explore Projects <ArrowRight size={16} strokeWidth={1.8} className="btn-arrow" />
              </a>
              <a href="#contact" className="btn border border-espresso/30 text-espresso hover:bg-espresso hover:text-white">
                Get a Free Quotation
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Sector strip */}
      <div className="relative z-10 border-y border-line bg-paper">
        <ul className="container-x !max-w-[1440px] no-scrollbar flex overflow-x-auto md:grid md:grid-cols-5 md:overflow-visible">
          {sectors.map((s, i) => {
            const Icon = sectorIcons[s.id];
            return (
              <motion.li
                key={s.id}
                className="min-w-[132px] flex-1 md:min-w-0"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1 + i * 0.08, ease }}
              >
                <button
                  type="button"
                  onClick={() => showSector(s.id)}
                  className={`group flex w-full flex-col items-center gap-3 px-3 py-6 text-center md:py-8 ${
                    i > 0 ? 'md:border-l md:border-line' : ''
                  }`}
                >
                  <Icon size={30} strokeWidth={1.3} className="text-bronze transition-transform duration-500 group-hover:-translate-y-1" />
                  <span className="text-[15px] font-semibold text-charcoal md:text-[16.5px]">{s.name}</span>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
