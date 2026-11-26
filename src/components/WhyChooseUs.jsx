import Picture, { imageInfo } from './ui/Picture.jsx';
import Reveal from './ui/Reveal.jsx';
import AnnotatedLayer from './ui/AnnotatedImage.jsx';
import { detailAnnotations, strengths } from '../data/content.js';
import { site } from '../data/site.js';

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
