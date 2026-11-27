import { ArrowRight } from 'lucide-react';
import Picture from './ui/Picture.jsx';
import Reveal from './ui/Reveal.jsx';
import { services } from '../data/services.js';
import { pageLink } from '../lib/links.js';

export default function Capabilities() {
  return (
    <section id="capabilities" className="py-3 md:py-5">
      <div className="container-x !max-w-[1440px]">
        <div className="rounded-[28px] border border-line bg-paper p-6 sm:p-10 lg:p-12 xl:p-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal className="mc lg:col-span-4">
              <p className="eyebrow">Our capabilities</p>
              <h2 className="display mt-5 text-[34px] md:text-[44px] xl:text-[48px]">
                End-to-End <em className="text-bronze-deep">Interior Solutions.</em>
              </h2>
              <p className="mt-6 text-[15.5px] leading-[1.8] text-ink">
                From concept to completion, we bring design intent, engineering coordination and manufacturing
                under one roof, so nothing is lost between contractors.
              </p>
              <a href={pageLink('capabilities')} className="btn btn-dark mt-8">
                View All Capabilities <ArrowRight size={16} strokeWidth={1.8} className="btn-arrow" />
              </a>
            </Reveal>

            <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:col-span-8">
              {services.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 0.06}>
                  <div className="group relative h-full overflow-hidden rounded-[16px] border border-line bg-ivory transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-bronze/50 hover:shadow-[0_18px_40px_-24px_rgba(74,51,38,0.45)]">
                    <div className="overflow-hidden">
                      <Picture
                        name={s.image}
                        alt=""
                        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 30vw, 50vw"
                        className="aspect-[16/10] w-full"
                        imgClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.06]"
                      />
                    </div>
                    <div className="p-4 text-center md:p-5 md:text-left">
                      <h3 className="text-[14.5px] font-semibold text-charcoal md:text-[15.5px]">{s.title}</h3>
                      <p className="mt-2 hidden text-[13.5px] leading-[1.65] text-ink/85 sm:block">{s.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
