import { renderPage } from '../lib/renderPage.jsx';
import InnerHero from '../components/inner/InnerHero.jsx';
import { ClientWall, Numbers, Pillars, Principles, Story, UnderOneRoof } from '../components/inner/AboutSections.jsx';
import SplitCta from '../components/inner/SplitCta.jsx';

renderPage(
  <>
    <InnerHero
      index="01"
      page="About Us"
      title="Design-Led."
      accent="Execution-Driven."
      intro="An integrated interiors and turnkey company from Ahmedabad, with our own design studio, furniture factory and site teams."
      image="work/garden-villa/01"
      imageAlt="Two-storey garden villa with a timber-lined overhang and glass balustrades"
      facts={[
        { label: 'Founded by', value: 'Ar. Mihir Patel' },
        { label: 'Based in', value: 'Sola, Ahmedabad' },
        { label: 'Model', value: 'Design · Build · Manufacture' },
        { label: 'Sectors', value: '5 sectors served' },
      ]}
    />
    <Pillars />
    <Story />
    <Numbers />
    <Principles />
    <UnderOneRoof />
    <ClientWall />
    <SplitCta image="work/double-height-residence/01" />
  </>,
);
