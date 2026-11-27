import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Capabilities from './components/Capabilities.jsx';
import Projects from './components/Projects.jsx';
import Manufacturing from './components/Manufacturing.jsx';
import Process from './components/Process.jsx';
import Clients from './components/Clients.jsx';
import CtaBand from './components/CtaBand.jsx';
import QuotationForm from './components/QuotationForm.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-charcoal focus:px-4 focus:py-2 focus:text-ivory"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Capabilities />
        <Projects />
        <Manufacturing />
        <Process />
        <Clients />
        <CtaBand />
        <QuotationForm />
      </main>
      <Footer />
    </MotionConfig>
  );
}
