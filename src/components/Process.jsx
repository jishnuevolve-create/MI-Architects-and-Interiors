import { motion } from 'framer-motion';
import Reveal from './ui/Reveal.jsx';
import { processSteps } from '../data/content.js';

export default function Process() {
  return (
    <section id="process" className="py-24 md:py-32 lg:py-40">
      <div className="container-x">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-8">
            <p className="eyebrow">How we work</p>
            <h2 className="display mt-5 text-[42px] md:text-[60px] lg:text-[68px]">
              From Your First Idea <em className="text-bronze-deep">to Your Finished Space.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4">
            <p className="text-[15.5px] leading-[1.75] text-ink">
              Four clear stages, with one team accountable from the first site visit to handover.
            </p>
          </Reveal>
        </div>

        <ol className="relative mt-16 grid gap-0 md:mt-24 lg:grid-cols-4 lg:gap-10">
          {/* Horizontal line (desktop) */}
          <motion.span
            aria-hidden="true"
            className="absolute top-[34px] left-0 hidden h-px w-full origin-left bg-line lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-20% 0px' }}
            transition={{ duration: 1.6, ease: [0.22, 0.61, 0.36, 1] }}
          />
          {processSteps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={0.15 + i * 0.15}
              className="relative grid grid-cols-[56px_1fr] gap-x-5 pb-12 last:pb-0 lg:block lg:pb-0"
            >
              {/* Vertical line (mobile/tablet) */}
              {i < processSteps.length - 1 && (
                <span aria-hidden="true" className="absolute top-[64px] bottom-2 left-[27px] w-px bg-line lg:hidden" />
              )}
              <span className="display relative z-10 flex h-[56px] w-[56px] items-center justify-center rounded-full border border-bronze bg-ivory text-[22px] text-bronze-deep lg:mb-10 lg:h-[68px] lg:w-[68px] lg:text-[26px]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="pt-2 lg:pt-0">
                <h3 className="display text-[28px] md:text-[32px]">{step.title}</h3>
                <p className="mt-3 max-w-[340px] text-[15px] leading-[1.75] text-ink">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
