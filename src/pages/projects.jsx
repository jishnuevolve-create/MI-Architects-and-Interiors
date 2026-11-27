import { renderPage } from '../lib/renderPage.jsx';
import InnerHero from '../components/inner/InnerHero.jsx';
import ProjectsShowcase from '../components/inner/ProjectSections.jsx';
import SplitCta from '../components/inner/SplitCta.jsx';
import { projects, sectors } from '../data/projects.js';

renderPage(
  <>
    <InnerHero
      index="03"
      page="Projects"
      title="Spaces that"
      accent="Make an Impact."
      intro="Residential, commercial, retail, education and healthcare projects, each designed in our studio and built by our own teams."
      image="work/double-height-residence/02"
      imageAlt="Double-height living room with stone walls, layered lighting and a full-height artwork"
      facts={[
        { label: 'Projects shown', value: String(projects.length) },
        { label: 'Sectors', value: `${sectors.length}, residential to healthcare` },
        { label: 'Photographs', value: 'Our own projects' },
        { label: 'Scope', value: 'Design · Build · Manufacture' },
      ]}
    />
    <ProjectsShowcase />
    <SplitCta title="Seen a space you like?" accent="Let’s plan yours." image="photos/residence-lounge" />
  </>,
);
