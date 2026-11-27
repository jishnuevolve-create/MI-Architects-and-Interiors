import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Picture from './ui/Picture.jsx';
import { pageLink } from '../lib/links.js';

const ease = [0.22, 0.61, 0.36, 1];

/**
 * Banner at the top of inner pages: breadcrumb, title and intro on the left, a photo with
 * the same arched edge as the home page hero on the right.
 */
export default function PageHero({ eyebrow, title, accent, intro, image, imageAlt }) {
  return (
    <section className="relative bg-ivory pt-[84px] md:pt-[100px]" aria-labelledby="page-title">
      <div className="relative flex flex-col lg:block">
        <motion.div
          className="relative order-2 mx-5 mb-6 h-[240px] overflow-hidden rounded-[24px] sm:h-[320px] lg:absolute lg:inset-y-0 lg:right-0 lg:order-none lg:mx-0 lg:mb-0 lg:h-auto lg:w-[52%] lg:rounded-none lg:rounded-tl-[46%_100%] lg:border-l-[22px] lg:border-cream"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease }}
        >
          <Picture name={image} alt={imageAlt} sizes="(min-width: 1024px) 52vw, 100vw" priority className="h-full w-full" />
        </motion.div>

        <div className="container-x relative order-1 !max-w-[1440px] pt-8 pb-8 md:py-14 lg:flex lg:min-h-[440px] lg:items-center lg:py-16">
          <div className="max-w-[560px] lg:max-w-[44%]">
            <motion.nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-[13px] text-ink/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <a href={pageLink('home')} className="hover:text-charcoal">Home</a>
              <ChevronRight size={14} strokeWidth={1.6} className="text-taupe" />
              <span aria-current="page" className="text-charcoal">{eyebrow}</span>
            </motion.nav>
            <motion.h1
              id="page-title"
              className="display mt-6 text-[38px] text-charcoal sm:text-[48px] lg:text-[50px] xl:text-[58px]"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease }}
            >
              {title} {accent && <em className="text-bronze-deep">{accent}</em>}
            </motion.h1>
            <motion.span
              aria-hidden="true"
              className="mt-7 block h-[3px] w-20 origin-left bg-bronze"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.45, ease }}
            />
            {intro && (
              <motion.p
                className="mt-6 max-w-[480px] text-[16px] leading-[1.75] text-ink"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease }}
              >
                {intro}
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
