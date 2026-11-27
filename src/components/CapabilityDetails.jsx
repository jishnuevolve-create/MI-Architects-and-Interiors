import { Check } from 'lucide-react';
import Parallax from './ui/Parallax.jsx';
import Picture from './ui/Picture.jsx';
import Reveal from './ui/Reveal.jsx';
import { services } from '../data/services.js';

/** Capabilities page: one row per capability, photo and text alternating sides. */
export default function CapabilityDetails() {
  return (
    <section id="capabilities" className="py-3 md:py-5">
      <div className="container-x !max-w-[1440px]">
        <div className="rounded-[28px] border border-line bg-paper p-6 sm:p-10 lg:p-12 xl:p-14">
          <Reveal className="max-w-[720px]">
            <p className="eyebrow">What we do</p>
            <h2 className="display mt-5 text-[32px] md:text-[42px]">
              Six Capabilities. <em className="text-bronze-deep">One Accountable Team.</em>
            </h2>
            <p className="mt-5 text-[15.5px] leading-[1.8] text-ink">
              Take a single service or the full design + build package. Either way, the same studio, factory and site
              teams carry the work through.
            </p>
          </Reveal>

          <ol className="mt-12 space-y-12 md:mt-16 md:space-y-20">
            {services.map((s, i) => (
              <li key={s.title} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
                <Reveal className={`lg:col-span-6 ${i % 2 ? 'lg:order-2' : ''}`}>
                  <Parallax amount={6} className="aspect-[4/3] w-full rounded-[20px]">
                    <Picture name={s.image} alt={s.title} sizes="(min-width: 1024px) 45vw, 100vw" className="h-full w-full" />
                  </Parallax>
                </Reveal>
                <Reveal delay={0.1} className="lg:col-span-6">
                  <p className="text-[12px] font-semibold tracking-[0.2em] text-bronze-deep">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="display mt-2 text-[28px] md:text-[36px]">{s.title}</h3>
                  <p className="mt-4 max-w-[520px] text-[16px] leading-[1.8] text-ink">{s.description}</p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {s.includes.map((item) => (
                      <li key={item} className="flex gap-3 text-[14.5px] text-charcoal">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bronze text-white">
                          <Check size={12} strokeWidth={2.6} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
