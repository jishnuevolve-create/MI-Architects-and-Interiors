import { renderPage } from '../lib/renderPage.jsx';
import PageHero from '../components/PageHero.jsx';
import About from '../components/About.jsx';
import Strengths from '../components/Strengths.jsx';
import Manufacturing from '../components/Manufacturing.jsx';
import Process from '../components/Process.jsx';
import Clients from '../components/Clients.jsx';
import CtaBand from '../components/CtaBand.jsx';

renderPage(
  <>
    <PageHero
      eyebrow="About Us"
      title="Design-Led."
      accent="Execution‑Driven."
      intro="An integrated interiors and turnkey company from Ahmedabad: our own design studio, furniture factory and site teams, accountable for every project from first visit to handover."
      image="work/garden-villa/01"
      imageAlt="Two-storey garden villa with a timber-lined overhang and glass balustrades"
    />
    <About onPage />
    <Strengths />
    <Manufacturing />
    <Process />
    <Clients />
    <CtaBand />
  </>,
);
