import { renderPage } from '../lib/renderPage.jsx';
import PageHero from '../components/PageHero.jsx';
import Projects from '../components/Projects.jsx';
import CtaBand from '../components/CtaBand.jsx';

renderPage(
  <>
    <PageHero
      eyebrow="Projects"
      title="Spaces that"
      accent="Make an Impact."
      intro="Residential, commercial, retail, education and healthcare projects, each designed in our studio and built by our own teams."
      image="work/stone-and-timber-home/01"
      imageAlt="Living room with a dark marble feature wall and warm wall lights"
    />
    <Projects onPage />
    <CtaBand />
  </>,
);
