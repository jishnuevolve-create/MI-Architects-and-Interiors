import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import DesignBuild from './components/DesignBuild.jsx';
import Services from './components/Services.jsx';
import WhyChooseUs from './components/WhyChooseUs.jsx';
import Process from './components/Process.jsx';
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
        <Projects />
        <DesignBuild />
        <Services />
        <WhyChooseUs />
        <Process />
        <QuotationForm />
      </main>
      <Footer />
    </MotionConfig>
  );
}
