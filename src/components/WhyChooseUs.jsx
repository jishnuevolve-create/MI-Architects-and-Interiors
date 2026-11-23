import Picture, { imageInfo } from './ui/Picture.jsx';
import Reveal from './ui/Reveal.jsx';
import AnnotatedLayer from './ui/AnnotatedImage.jsx';
import { detailAnnotations, strengths } from '../data/content.js';
import { site } from '../data/site.js';

const factoryShots = [
  { name: 'photos/factory-floor', alt: 'Furniture manufacturing unit with panels staged on the factory floor', label: 'Factory floor' },
  { name: 'photos/factory-panel-saw', alt: 'Team members cutting panels on a sliding panel saw', label: 'Panel processing' },
  { name: 'photos/factory-finishing', alt: 'Craftsman finishing a furniture panel by hand', label: 'Hand finishing' },
];

export default function WhyChooseUs() {
  const kitchen = imageInfo('photos/modular-kitchen');

  return (
    <section id="why-us" className="bg-charcoal py-24 text-ivory md:py-32 lg:py-40">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow !text-bronze">Why work with us</p>
              <h2 className="display mt-5 text-[42px] md:text-[60px] lg:text-[68px]">
                Good Design Is <em className="text-[#d9c2a3]">in the Details.</em>
              </h2>
            </Reveal>

            <ul className="mt-12 space-y-0 border-t border-white/15">
              {strengths.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 0.06} className="border-b border-white/15 py-6">
                  <h3 className="text-[17px] font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.7] text-white/70">{s.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal className="lg:col-span-7 lg:pt-4" delay={0.1}>
            <figure>
              <div className="relative">
                <Picture
                  name="photos/modular-kitchen"
                  alt="L-shaped modular kitchen in matte grey with glass-front upper cabinets and under-cabinet lighting"
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  className="aspect-[4/5] w-full md:aspect-[5/4]"
                />
                <div className="absolute inset-0 hidden md:block">
                  <AnnotatedLayer
                    points={detailAnnotations}
                    imgWidth={kitchen.width}
                    imgHeight={kitchen.height}
                    tone="dark"
                    delay={0.3}
                  />
                </div>
              </div>
              <figcaption className="mt-4 flex justify-between gap-4 text-[12px] tracking-wide text-white/60">
                <span>Modular kitchen — detailing</span>
                <span>Matte grey · Glass · Stone</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* In-house manufacturing */}
        <div className="mt-24 border-t border-white/15 pt-14 md:mt-32">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow !text-bronze">In-house manufacturing</p>
              <h3 className="display mt-4 text-[34px] md:text-[42px]">Made by our own hands.</h3>
              <p className="mt-5 text-[15px] leading-[1.75] text-white/70">
                Our furniture unit runs CNC, edge-banding and multi-boring machines. Designers, engineers and
                production teams work from the same drawings, and our site teams install what we make.
              </p>
            </Reveal>
            <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:col-span-8">
              {factoryShots.map((f, i) => (
                <Reveal key={f.name} delay={i * 0.08} className="w-[78%] shrink-0 snap-start md:w-auto">
                  <figure>
                    <Picture name={f.name} alt={f.alt} sizes="(min-width: 768px) 22vw, 78vw" className="aspect-[3/4] w-full" />
                    <figcaption className="mt-3 text-[12px] tracking-wide text-white/60">{f.label}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Sectors and clients from the company profile */}
        <div className="mt-24 grid gap-10 border-t border-white/15 pt-14 md:mt-28 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow !text-bronze">Sectors</p>
            <p className="mt-4 text-[15px] leading-[1.9] text-white/80">{site.sectors.join(' · ')}</p>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.08}>
            <p className="eyebrow !text-bronze">Clients &amp; brands we have worked with</p>
            <ul className="display mt-4 flex flex-wrap gap-x-7 gap-y-2 text-[24px] text-white/85 md:text-[28px]">
              {site.clients.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
