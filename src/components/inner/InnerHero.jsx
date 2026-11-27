import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Picture from '../ui/Picture.jsx';
import { pageLink } from '../../lib/links.js';

const ease = [0.22, 0.61, 0.36, 1];

/**
 * Cinematic banner for inner pages: a full-width photograph in a rounded frame, title set
 * large over a deep espresso wash, chapter number and a strip of key facts beneath.
 */
export default function InnerHero({ index, page, title, accent, intro, image, imageAlt, facts = [] }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.16]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  return (
    <section ref={ref} className="bg-ivory pt-[84px] pb-4 md:pt-[100px] md:pb-6" aria-labelledby="page-title">
      <div className="container-x !max-w-[1440px]">
        <div className="relative isolate flex min-h-[560px] flex-col justify-end overflow-hidden rounded-[32px] md:h-[78vh] md:max-h-[820px] md:min-h-[600px]">
          <motion.div className="absolute inset-0 -z-20" style={reduce ? undefined : { scale, y }}>
            <Picture name={image} alt={imageAlt} sizes="100vw" priority className="h-full w-full" />
          </motion.div>
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(36,25,19,0.45)_0%,rgba(36,25,19,0.05)_28%,rgba(36,25,19,0.45)_55%,rgba(30,21,16,0.94)_100%),linear-gradient(90deg,rgba(30,21,16,0.55)_0%,rgba(30,21,16,0)_65%)]" />

          {/* Chapter mark */}
          <motion.div
            className="absolute top-7 left-1/2 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap text-white md:top-9 md:left-10 md:translate-x-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="display text-[34px] leading-none text-[#e2c393] md:text-[44px]">{index}</span>
            <span className="h-px w-10 bg-white/50" />
            <span className="text-[11px] font-semibold tracking-[0.28em] uppercase">{page}</span>
          </motion.div>

          <div className="mc px-6 pt-24 pb-8 text-white md:px-10 md:pt-0 md:pb-12 lg:px-14 lg:pb-14">
            <motion.nav
              aria-label="Breadcrumb"
              className="mc-row flex items-center gap-1.5 text-[13px] text-white/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <a href={pageLink('home')} className="hover:text-white">Home</a>
              <ChevronRight size={14} strokeWidth={1.6} />
              <span aria-current="page" className="text-white">{page}</span>
            </motion.nav>
            <div className="mt-5 grid min-w-0 gap-6 xl:grid-cols-12 xl:items-end">
              <motion.h1
                id="page-title"
                className="display min-w-0 text-[30px] leading-[1.1] break-words sm:text-[52px] md:text-[56px] lg:text-[68px] xl:col-span-8 xl:text-[84px]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.25, ease }}
              >
                {title}
                {accent && <em className="block text-[#e2c393]">{accent}</em>}
              </motion.h1>
              {intro && (
                <motion.p
                  className="max-w-[460px] text-[15.5px] leading-[1.75] text-white/85 xl:col-span-4 xl:justify-self-end"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.55, ease }}
                >
                  {intro}
                </motion.p>
              )}
            </div>

            {facts.length > 0 && (
              <motion.dl
                className="mt-9 grid grid-cols-2 gap-y-5 border-t border-white/20 pt-6 sm:grid-cols-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.8 }}
              >
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt className="text-[11px] font-semibold tracking-[0.2em] text-white/60 uppercase">{f.label}</dt>
                    <dd className="mt-1.5 text-[15px] font-medium text-white">{f.value}</dd>
                  </div>
                ))}
              </motion.dl>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
