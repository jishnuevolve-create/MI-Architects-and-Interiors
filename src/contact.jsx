import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import '@fontsource/libre-caslon-text/latin-400.css';
import '@fontsource/libre-caslon-text/latin-400-italic.css';
import '@fontsource/libre-caslon-text/latin-700.css';
import '@fontsource-variable/manrope';
import './index.css';
import Navbar from './components/Navbar.jsx';
import QuotationForm from './components/QuotationForm.jsx';
import Footer from './components/Footer.jsx';

/** Contact page: the quotation form on its own page (served at <base>contact/). */
function ContactPage() {
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
        <QuotationForm />
      </main>
      <Footer />
    </MotionConfig>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContactPage />
  </StrictMode>,
);
