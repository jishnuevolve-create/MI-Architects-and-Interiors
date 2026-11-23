/**
 * Central business details. Every value here comes from the supplied company profile
 * (MI Architect & Associates, 2025/26) or the studio's Instagram profile.
 * Update this one file when details change.
 */
export const site = {
  name: 'MI Architects & Interiors',
  legalName: 'MI Architect & Associates',
  tagline: 'The Space Makers',
  founder: 'Ar. Mihir Patel',
  description:
    'Architecture, interior design and fit-out studio in Ahmedabad, led by Ar. Mihir Patel. Residential, commercial, retail, hospitality and healthcare interiors with in-house modular furniture manufacturing.',

  phones: [
    { label: '+91 99044 49410', href: 'tel:+919904449410' },
    { label: '+91 90169 94161', href: 'tel:+919016994161' },
  ],
  email: 'info.miarch@gmail.com',

  /**
   * WhatsApp number in international format without "+" or spaces, e.g. "919904449410".
   * Leave empty until the studio confirms which number is on WhatsApp —
   * every WhatsApp button on the site stays hidden while this is empty.
   */
  whatsapp: '919016994161',

  address: {
    street: 'Plot No. 781, Sola',
    city: 'Ahmedabad',
    region: 'Gujarat',
    postalCode: '380060',
    country: 'IN',
    display: 'Plot No. 781, Sola, Ahmedabad, Gujarat 380060',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=MI+Architect+%26+Associates+Plot+No.+781+Sola+Ahmedabad+380060',
  },

  instagram: {
    handle: '@mi_architects_interiors',
    url: 'https://www.instagram.com/mi_architects_interiors/',
  },

  /** Figures from the supplied company profile (updated edition). Edit or remove as needed. */
  facts: [
    { value: '15+', label: 'Years of practice' },
    { value: '200+', label: 'Clients served' },
    { value: '50+', label: 'Team members' },
    { value: '50+', label: 'Onboarded vendors' },
  ],

  sectors: ['Residential', 'Commercial', 'Retail', 'Hospitality', 'Healthcare'],

  /** Client and brand names listed in the company profile. Shown as text only. */
  clients: [
    'Asian Paints', 'Voltas', 'CBRE', 'Hitachi Energy', 'Calvin Klein', 'Pandora',
    'French Connection', 'OYO', 'Indian Potash Limited', 'Sanjivani Hospital',
    'Sahjanand Group', 'Flourish', 'LOFY', 'M.Ewin', 'Chandni',
  ],
};

export const whatsappLink = (text = '') =>
  site.whatsapp
    ? `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
    : null;

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];
