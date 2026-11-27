import Logo from './ui/Logo.jsx';
import { InstagramIcon, WhatsAppIcon } from './ui/BrandIcons.jsx';
import { navLinks, site, whatsappLink } from '../data/site.js';
import { CONTACT_URL, homeLink } from '../lib/links.js';

export default function Footer() {
  const wa = whatsappLink();
  return (
    <footer className="mt-10 bg-[#33231a] text-white/75 md:mt-14">
      <div className="container-x pt-20 pb-10 md:pt-24">
        <p className="display max-w-[900px] text-[32px] leading-[1.15] text-ivory md:text-[48px]">
          Designed with purpose. <em className="text-[#e2c393]">Built with precision.</em>
        </p>

        <div className="mt-16 grid gap-12 border-t border-white/15 pt-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-[320px] text-[14.5px] leading-[1.75]">
              Design, build and manufacture: interiors and turnkey fit-out from Ahmedabad, with our own furniture
              factory. Led by {site.founder}.
            </p>
          </div>

          <nav className="md:col-span-2" aria-label="Footer">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-bronze uppercase">Explore</p>
            <ul className="mt-5 space-y-2.5 text-[14.5px]">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={l.id === 'contact' ? CONTACT_URL : homeLink(l.id === 'sectors' ? 'projects' : l.id)} className="hover:text-white">{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-bronze uppercase">Contact</p>
            <ul className="mt-5 space-y-2.5 text-[14.5px]">
              {site.phones.map((p) => (
                <li key={p.href}><a href={p.href} className="hover:text-white">{p.label}</a></li>
              ))}
              <li><a href={`mailto:${site.email}`} className="break-all hover:text-white">{site.email}</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-bronze uppercase">Studio</p>
            <address className="mt-5 text-[14.5px] leading-[1.75] not-italic">
              <a href={site.address.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {site.legalName}<br />{site.address.street}<br />{site.address.city}, {site.address.region} {site.address.postalCode}
              </a>
            </address>
            <div className="mt-6 flex gap-3">
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 hover:border-white hover:text-white">
                <InstagramIcon />
              </a>
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 hover:border-white hover:text-white">
                  <WhatsAppIcon />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/15 pt-6 text-[12.5px] text-white/50 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
