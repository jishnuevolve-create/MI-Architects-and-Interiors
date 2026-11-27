import { ArrowRight, Award, Factory, Handshake, Users } from 'lucide-react';
import Parallax from './ui/Parallax.jsx';
import Picture from './ui/Picture.jsx';
import Reveal from './ui/Reveal.jsx';
import { site } from '../data/site.js';
import { pageLink } from '../lib/links.js';

const factIcons = [Award, Handshake, Users, Factory];

/** `onPage`: shown on the About page, where the button leads on to Capabilities. */
export default function About({ onPage = false }) {
  return (
    <section id="about" className="pt-10 pb-3 md:pt-14 md:pb-5">
      <div className="container-x !max-w-[1440px]">
        <div className="overflow-hidden rounded-[28px] border border-line bg-paper shadow-[0_30px_80px_-50px_rgba(42,33,27,0.35)]">
          <div className="grid lg:grid-cols-2">
            <div className="p-7 sm:p-10 lg:p-14 xl:p-16">
              <Reveal>
                <p className="eyebrow">About us</p>
                <h2 className="display mt-5 text-[34px] md:text-[46px] lg:text-[42px] xl:text-[52px]">
                  Design-Led. <em className="block whitespace-nowrap text-bronze-deep">Execution-Driven.</em>
                </h2>
                <p className="mt-6 max-w-[520px] text-[16px] leading-[1.8] text-ink">
                  {site.name} is an integrated interiors and turnkey solutions company. We design spaces with intent,
                  make their furniture in our own factory and build them with our own site teams, across residential,
                  commercial, retail, education and healthcare projects.
                </p>
                <p className="mt-4 max-w-[520px] text-[15px] leading-[1.8] text-ink/80">
                  Led by founder {site.founder}, with one team accountable from the first site visit to handover.
                </p>
                <a href={pageLink(onPage ? 'capabilities' : 'about')} className="btn btn-dark mt-9">
                  {onPage ? 'Our Capabilities' : 'Know More'} <ArrowRight size={16} strokeWidth={1.8} className="btn-arrow" />
                </a>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:p-5 lg:pl-0">
              <Parallax amount={7} className="aspect-[4/3] h-full w-full lg:aspect-auto lg:min-h-[460px] lg:rounded-[20px]">
                <Picture
                  name="work/double-height-residence/01"
                  alt="Dining space under a full-height artwork, with dark stone walls and grey upholstered chairs"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-full w-full"
                />
              </Parallax>
            </Reveal>
          </div>

          {/* Figures from the company profile */}
          <dl className="grid grid-cols-2 border-t border-line md:grid-cols-4">
            {site.facts.map((f, i) => {
              const Icon = factIcons[i % factIcons.length];
              return (
                <Reveal
                  key={f.label}
                  delay={i * 0.06}
                  className={`flex flex-col items-center px-4 py-8 text-center ${i % 2 ? 'border-l border-line' : ''} ${
                    i > 1 ? 'border-t border-line md:border-t-0' : ''
                  } ${i === 2 ? 'md:border-l' : ''}`}
                >
                  <Icon size={28} strokeWidth={1.3} className="text-bronze" />
                  <dd className="display mt-3 text-[34px] text-charcoal md:text-[40px]">{f.value}</dd>
                  <dt className="mt-1 text-[13px] text-ink/80">{f.label}</dt>
                </Reveal>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
