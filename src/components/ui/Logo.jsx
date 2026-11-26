import { site } from '../../data/site.js';
import { asset } from '../../lib/asset.js';

/**
 * The studio's supplied monogram (made transparent, not redrawn) beside the company
 * name set in type. Replace with the full Miarq Spaces logo file when it is available.
 * `tone` picks the ink colour.
 */
export default function Logo({ tone = 'dark', className = '' }) {
  const light = tone === 'light';
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={asset(light ? '/brand/logo-mark-light.png' : '/brand/logo-mark-dark.png')}
        alt=""
        width="49"
        height="52"
        className="h-[34px] w-auto md:h-[38px]"
      />
      <span className={`flex flex-col leading-none ${light ? 'text-white' : 'text-charcoal'}`}>
        <span className="display text-[21px] tracking-[0.14em] uppercase md:text-[23px]">Miarq</span>
        <span className={`mt-1 text-[8.5px] font-semibold tracking-[0.42em] uppercase ${light ? 'text-white/75' : 'text-taupe'}`}>
          Spaces
        </span>
      </span>
      <span className="sr-only">{site.name}</span>
    </span>
  );
}
