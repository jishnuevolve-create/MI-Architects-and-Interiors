/**
 * Capabilities, grouped from the "Our Services" page of the company profile.
 * `image` is a key from src/data/image-manifest.json.
 */
export const services = [
  {
    title: 'Design & Planning',
    description: 'Space planning, concepts, material selection and working drawings for every room.',
    includes: ['Site survey and measurements', 'Space planning and concept design', 'Material and finish selection', 'Working drawings'],
    image: 'film/drawings',
  },
  {
    title: 'Turnkey Execution',
    description: 'Civil and interior works by our own site teams, coordinated as one job through to handover.',
    includes: ['Civil works and finishing', 'Interior fit-out', 'Renovation', 'Single point of contact to handover'],
    image: 'work/apartment-handover/01',
  },
  {
    title: 'Modular Manufacturing',
    description: 'Kitchens, wardrobes and custom furniture made on CNC, edge-banding and multi-boring machines.',
    includes: ['Modular kitchens', 'Wardrobes and storage', 'CNC, edge-banding and multi-boring', 'Fitted by our own teams'],
    image: 'film/edge-banding',
  },
  {
    title: 'Project Management',
    description: 'Scheduling, trade coordination and progress tracking, with one point of contact.',
    includes: ['Planning and scheduling', 'Trade coordination on site', 'Progress tracking', 'Quality checks'],
    image: 'film/design-team',
  },
  {
    title: 'Building Services',
    description: 'HVAC, electrical, plumbing, fire, IT and CCTV works planned with the interior design.',
    includes: ['HVAC and electrical', 'Plumbing and fire systems', 'IT, CCTV and access control', 'Coordinated with the interior design'],
    image: 'work/apartment-handover/02',
  },
  {
    title: 'Custom Furniture',
    description: 'Loose furniture, workstations and bespoke pieces sized and finished for each project.',
    includes: ['Bespoke loose furniture', 'Workstations and meeting tables', 'Reception and display units', 'Finishes matched to the scheme'],
    image: 'film/assembly',
  },
];
