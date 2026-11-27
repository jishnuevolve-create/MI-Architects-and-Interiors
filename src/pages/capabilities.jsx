import { renderPage } from '../lib/renderPage.jsx';
import PageHero from '../components/PageHero.jsx';
import CapabilityDetails from '../components/CapabilityDetails.jsx';
import Manufacturing from '../components/Manufacturing.jsx';
import CtaBand from '../components/CtaBand.jsx';

renderPage(
  <>
    <PageHero
      eyebrow="Capabilities"
      title="End-to-End"
      accent="Interior Solutions."
      intro="Design, turnkey execution, modular manufacturing, building services and project management, delivered by one team under one roof."
      image="work/apartment-handover/01"
      imageAlt="Apartment interior at handover with cove-lit ceilings and marble-effect feature walls"
    />
    <CapabilityDetails />
    <Manufacturing />
    <CtaBand />
  </>,
);
