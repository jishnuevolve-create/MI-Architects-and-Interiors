import { Factory, Gem, Layers, Users } from 'lucide-react';
import Reveal from './ui/Reveal.jsx';
import { strengths } from '../data/content.js';

const icons = [Layers, Factory, Users, Gem];

/** About page: why clients work with us (from the company profile). */
export default function Strengths() {
  return (
    <section id="why-us" className="py-3 md:py-5">
      <div className="container-x !max-w-[1440px]">
        <div className="rounded-[28px] bg-espresso p-6 text-white sm:p-10 lg:p-12 xl:p-14">
          <Reveal className="max-w-[640px]">
            <p className="eyebrow !text-[#e2c393] before:!bg-[#e2c393]">Why work with us</p>
            <h2 className="display mt-5 text-[32px] md:text-[42px]">
              Good Design Is <em className="text-[#e2c393]">in the Details.</em>
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {strengths.map((s, i) => {
              const Icon = icons[i % icons.length];
              return (
                <Reveal as="li" key={s.title} delay={i * 0.07}>
                  <div className="h-full rounded-[18px] border border-white/12 bg-white/[0.04] p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e2c393]/15 text-[#e2c393]">
                      <Icon size={20} strokeWidth={1.5} />
                    </span>
                    <h3 className="mt-5 text-[16.5px] font-semibold text-white">{s.title}</h3>
                    <p className="mt-2 text-[14.5px] leading-[1.7] text-white/70">{s.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
