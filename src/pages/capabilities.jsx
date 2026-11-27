import { renderPage } from '../lib/renderPage.jsx';
import InnerHero from '../components/inner/InnerHero.jsx';
import { CapabilityChapters, CapabilityIndex, EngagementModels, FilmFeature } from '../components/inner/CapabilitySections.jsx';
import SplitCta from '../components/inner/SplitCta.jsx';

renderPage(
  <>
    <InnerHero
      index="02"
      page="Capabilities"
      title="End-to-End"
      accent="Interior Solutions."
      intro="Design, turnkey execution, modular manufacturing, building services and project management, delivered by one team under one roof."
      image="film/factory"
      imageAlt="Our modular furniture factory floor"
      facts={[
        { label: 'Disciplines', value: '6 in-house' },
        { label: 'Factory', value: 'CNC · Edge-banding · Boring' },
        { label: 'Services', value: 'HVAC · Electrical · Fire · IT' },
        { label: 'Contact', value: 'One team, start to finish' },
      ]}
    />
    <CapabilityIndex />
    <CapabilityChapters />
    <EngagementModels />
    <FilmFeature />
    <SplitCta title="Not sure which scope you need?" accent="We’ll help you decide." image="film/materials" />
  </>,
);
