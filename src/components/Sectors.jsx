import { ArrowRight } from 'lucide-react';
import Picture from './ui/Picture.jsx';
import Reveal from './ui/Reveal.jsx';
import { projectsBySector, sectors } from '../data/projects.js';
import { showSector } from '../lib/sectorEvents.js';

export default function Sectors() {
  return (
    <section id="sectors" className="py-3 md:py-5">
      <div className="container-x !max-w-[1440px]">
        <div className="rounded-[28px] border border-line bg-paper p-6 sm:p-10 lg:p-12 xl:p-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow">Our sectors</p>
              <h2 className="display mt-5 text-[34px] md:text-[44px] xl:text-[48px]">
                Diverse Spaces. <em className="text-bronze-deep">Specialized Expertise.</em>
              </h2>
              <p className="mt-6 text-[15.5px] leading-[1.8] text-ink">
                The same studio, factory and site teams deliver every sector. Choose one to see the work.
              </p>
            </Reveal>

            <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:col-span-8">
              {sectors.map((s, i) => {
                const count = projectsBySector(s.id).length;
                return (
                  <Reveal as="li" key={s.id} delay={i * 0.06}>
                    <button
                      type="button"
                      onClick={() => showSector(s.id)}
                      className="group relative block w-full overflow-hidden rounded-[16px] text-left"
                      aria-label={`See ${s.name.toLowerCase()} projects`}
                    >
                      <Picture
                        name={s.cover}
                        alt=""
                        sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 50vw"
                        className="aspect-[4/3] w-full"
                        imgClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.07]"
                      />
                      <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,33,27,0)_45%,rgba(42,33,27,0.82)_100%)]" />
                      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3.5 text-white md:p-4">
                        <span>
                          <span className="block text-[15px] font-semibold md:text-[16.5px]">{s.name}</span>
                          <span className="text-[12px] text-white/75">
                            {count} {count === 1 ? 'project' : 'projects'}
                          </span>
                        </span>
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-colors duration-300 group-hover:bg-bronze">
                          <ArrowRight size={15} strokeWidth={1.8} />
                        </span>
                      </span>
                    </button>
                  </Reveal>
                );
              })}
              {/* Sixth tile closes the grid with the next step */}
              <Reveal as="li" delay={sectors.length * 0.06} className="col-span-2 md:col-span-1">
                <a
                  href="#contact"
                  className="group flex h-full min-h-[140px] flex-col justify-between rounded-[16px] bg-espresso p-5 text-white"
                >
                  <span className="display text-[22px] leading-snug md:text-[24px]">Have a space in mind?</span>
                  <span className="flex items-center gap-2 text-[14px] font-semibold text-[#e2c393]">
                    Start your project <ArrowRight size={15} strokeWidth={1.8} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </Reveal>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
