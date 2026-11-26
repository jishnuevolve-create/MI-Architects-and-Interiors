import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Parallax from './ui/Parallax.jsx';
import Picture from './ui/Picture.jsx';
import Reveal from './ui/Reveal.jsx';
import { site } from '../data/site.js';

export default function About() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // The inset dining photo rises faster than the main image, for depth.
  const insetY = useTransform(scrollYProgress, [0, 1], [70, -70]);

  return (
    <section id="about" ref={ref} className="relative py-24 md:py-32 lg:py-40">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Images: main living room with an overlapping detail of the dining space */}
        <Reveal className="relative lg:col-span-7">
          <Parallax amount={8} className="aspect-[4/3] w-full md:aspect-[16/10] lg:w-[92%]">
            <Picture
              name="photos/living-room"
              alt="Family living room with soft neutral sofas, tan leather armchairs and a nested stone-top coffee table"
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="h-full w-full"
            />
          </Parallax>
          <motion.div
            style={{ y: reduce ? 0 : insetY }}
            className="absolute -bottom-10 right-0 hidden w-[36%] border-[10px] border-ivory md:block"
          >
            <Picture
              name="photos/dining-room"
              alt="Dining space with curved upholstered chairs and a stone-top table"
              sizes="22vw"
              className="aspect-[4/5] w-full"
            />
          </motion.div>
          <p className="mt-4 text-[12px] tracking-wide text-taupe md:hidden">Family living room</p>
        </Reveal>

        <div className="lg:col-span-5 lg:pl-8">
          <Reveal>
            <p className="eyebrow">About {site.name}</p>
            <h2 className="display mt-5 text-[40px] md:text-[54px] lg:text-[60px]">
              Design Thinking. <em className="text-bronze-deep">Builder&rsquo;s Discipline.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 text-[17px] leading-[1.75] text-ink">
              {site.legalName} is a design + build practice. We plan the space, make the furniture and build it on
              site, so one team stays accountable for the result from the first drawing to the day you move in.
            </p>
            <p className="mt-5 text-[15px] leading-[1.8] text-ink/80">
              Led by founder {site.founder}, our Ahmedabad studio works across residential, corporate, education,
              hospitality, retail and health projects, with modular furniture made in our own factory.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mt-10 grid grid-cols-2 border-t border-line">
              {site.facts.map((f, i) => (
                <div
                  key={f.label}
                  className={`border-b border-line py-5 ${i % 2 === 0 ? 'pr-4' : 'border-l pl-5'}`}
                >
                  <dt className="text-[12px] tracking-wide text-ink/70">{f.label}</dt>
                  <dd className="display mt-1 text-[38px] text-charcoal">{f.value}</dd>
                </div>
              ))}
            </dl>
            <a href="#design-build" className="link-underline mt-9 inline-flex items-center gap-2 text-[14px] font-semibold text-charcoal">
              See How We Design + Build <ArrowRight size={15} strokeWidth={1.6} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
