import { site } from '../../data/site.js';

/** The studio's supplied logo, made transparent (not redrawn). `tone` picks the ink colour. */
export default function Logo({ tone = 'dark', className = '' }) {
  return (
    <img
      src={tone === 'light' ? '/brand/logo-light.png' : '/brand/logo-dark.png'}
      alt={site.name}
      width="139"
      height="52"
      className={`h-[44px] w-auto md:h-[52px] ${className}`}
    />
  );
}
