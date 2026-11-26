import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowRight, Check, Loader2, Mail, MapPin, Phone } from 'lucide-react';
import Reveal from './ui/Reveal.jsx';
import { WhatsAppIcon } from './ui/BrandIcons.jsx';
import { site, whatsappLink } from '../data/site.js';
import { submitEnquiry } from '../lib/submitEnquiry.js';

const projectTypes = ['Residential', 'Corporate / Office', 'Education', 'Hospitality', 'Retail', 'Health / Clinic', 'Renovation', 'Other'];

/** Project type for each portfolio sector, used when a visitor starts from a project. */
const typeForSector = {
  residential: 'Residential',
  corporate: 'Corporate / Office',
  education: 'Education',
  hospitality: 'Hospitality',
  retail: 'Retail',
  health: 'Health / Clinic',
};
const budgets = ['Under ₹5 lakh', '₹5 – 10 lakh', '₹10 – 25 lakh', '₹25 – 50 lakh', 'Above ₹50 lakh', 'Not sure yet'];
const contactMethods = ['Phone call', ...(site.whatsapp ? ['WhatsApp'] : []), 'Email'];

const empty = {
  fullName: '',
  phone: '',
  email: '',
  projectType: '',
  location: '',
  budget: '',
  requirements: '',
  contactMethod: 'Phone call',
  website: '', // honeypot: real visitors never see or fill this
};

function validate(v) {
  const e = {};
  if (v.fullName.trim().length < 2) e.fullName = 'Enter your full name.';
  const digits = v.phone.replace(/\D/g, '');
  if (!digits) e.phone = 'Enter a phone number so we can reach you.';
  else if (digits.length < 10 || digits.length > 13) e.phone = 'Enter a valid phone number, e.g. 98765 43210.';
  if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter a valid email address, e.g. name@example.com.';
  if (v.contactMethod === 'Email' && !v.email.trim()) e.email = 'Add your email address, as you prefer to be contacted by email.';
  if (!v.projectType) e.projectType = 'Choose the type of project.';
  if (v.location.trim().length < 2) e.location = 'Enter the city or area of the project.';
  if (!v.budget) e.budget = 'Choose an approximate budget, or "Not sure yet".';
  return e;
}

function Field({ id, label, required, optional, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required && <span className="ml-1 text-bronze-deep" aria-hidden="true">*</span>}
        {optional && <span className="ml-2 font-normal tracking-normal text-ink/60 normal-case">(optional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-1.5 text-[13px] text-[#a3402e]">
          <AlertCircle size={14} strokeWidth={1.8} /> {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 text-[12.5px] text-ink/60">{hint}</p>
      ) : null}
    </div>
  );
}

export default function QuotationForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [serverError, setServerError] = useState('');
  const formRef = useRef(null);

  // "Plan a space like this" in a project gallery: pre-fill the project and bring the form into view.
  useEffect(() => {
    const onPrefill = (e) => {
      const { title, sector } = e.detail || {};
      setStatus((s) => (s === 'success' ? 'idle' : s));
      setValues((v) => ({
        ...v,
        projectType: typeForSector[sector] || v.projectType,
        requirements: v.requirements.trim() ? v.requirements : `I'd like a space like your "${title}" project.`,
      }));
      requestAnimationFrame(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        formRef.current?.querySelector('#fullName')?.focus({ preventScroll: true });
      });
    };
    window.addEventListener('enquiry:prefill', onPrefill);
    return () => window.removeEventListener('enquiry:prefill', onPrefill);
  }, []);

  const set = (k) => (e) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [k]: value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const aria = (k) => ({
    'aria-invalid': errors[k] ? 'true' : undefined,
    'aria-describedby': errors[k] ? `${k}-error` : undefined,
  });

  async function onSubmit(e) {
    e.preventDefault();
    if (status === 'sending') return;
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      formRef.current?.querySelector(`#${first}`)?.focus();
      return;
    }
    if (values.website) {
      // Bot filled the hidden field: pretend nothing happened.
      return;
    }
    setStatus('sending');
    setServerError('');
    try {
      await submitEnquiry(values);
      setStatus('success');
      setValues(empty);
    } catch (err) {
      setServerError(err.message);
      setStatus('error');
    }
  }

  const wa = whatsappLink("Hello MiArq Spaces, I'd like a free quotation for my project.");

  return (
    <section id="contact" className="relative overflow-hidden bg-[linear-gradient(180deg,var(--color-ivory)_0%,var(--color-cream)_100%)] py-24 md:py-32 lg:py-40">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-12">
        {/* Left: invitation + direct contact */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">Free quotation</p>
            <h2 className="display mt-5 text-[34px] md:text-[44px] lg:text-[46px]">
              Let&rsquo;s Create a Space You&rsquo;ll Love <em className="text-bronze-deep">Coming Home To.</em>
            </h2>
            <p className="mt-7 max-w-[480px] text-[16.5px] leading-[1.75] text-ink">
              Planning a new interior or transforming your existing space? Tell us a little about your project. Our
              team will connect with you to understand your requirements and discuss the next steps.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-12 border-t border-line text-[15px]">
              <li className="flex gap-4 border-b border-line py-5">
                <Phone size={18} strokeWidth={1.4} className="mt-0.5 shrink-0 text-bronze-deep" />
                <div className="flex flex-col gap-1">
                  {site.phones.map((p) => (
                    <a key={p.href} href={p.href} className="hover:text-bronze-deep">{p.label}</a>
                  ))}
                </div>
              </li>
              <li className="flex gap-4 border-b border-line py-5">
                <Mail size={18} strokeWidth={1.4} className="mt-0.5 shrink-0 text-bronze-deep" />
                <a href={`mailto:${site.email}`} className="break-all hover:text-bronze-deep">{site.email}</a>
              </li>
              <li className="flex gap-4 border-b border-line py-5">
                <MapPin size={18} strokeWidth={1.4} className="mt-0.5 shrink-0 text-bronze-deep" />
                <a href={site.address.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-bronze-deep">
                  {site.address.display}
                </a>
              </li>
            </ul>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn mt-8 border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory">
                <WhatsAppIcon size={18} /> Enquire on WhatsApp
              </a>
            )}
          </Reveal>
        </div>

        {/* Right: form */}
        <Reveal className="lg:col-span-7" delay={0.1}>
          <div className="relative bg-white p-6 shadow-[0_30px_80px_-40px_rgba(36,37,34,0.35)] sm:p-10">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[520px] flex-col items-start justify-center"
                  role="status"
                  aria-live="polite"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-bronze text-white">
                    <Check size={26} strokeWidth={1.6} />
                  </span>
                  <h3 className="display mt-8 text-[30px] md:text-[36px]">Enquiry received.</h3>
                  <p className="mt-4 max-w-[460px] text-[16.5px] leading-[1.75] text-ink">
                    Thank you for reaching out. We&rsquo;ve received your project enquiry and will get in touch with you soon.
                  </p>
                  <button type="button" onClick={() => setStatus('idle')} className="link-underline mt-10 text-[14px] font-semibold">
                    Send another enquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={onSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  aria-describedby="form-note"
                >
                  <h3 className="display text-[26px] md:text-[28px]">Request a free quotation</h3>
                  <p id="form-note" className="mt-2 text-[13px] text-ink/70">
                    Fields marked <span className="text-bronze-deep">*</span> are required. It takes about a minute.
                  </p>

                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    <Field id="fullName" label="Full name" required error={errors.fullName}>
                      <input id="fullName" className="field" autoComplete="name" placeholder="Your name"
                        value={values.fullName} onChange={set('fullName')} {...aria('fullName')} />
                    </Field>
                    <Field id="phone" label="Phone number" required error={errors.phone}>
                      <input id="phone" type="tel" inputMode="tel" className="field" autoComplete="tel"
                        placeholder="+91 98765 43210" value={values.phone} onChange={set('phone')} {...aria('phone')} />
                    </Field>
                    <Field id="email" label="Email address" optional={values.contactMethod !== 'Email'} required={values.contactMethod === 'Email'} error={errors.email}>
                      <input id="email" type="email" inputMode="email" className="field" autoComplete="email"
                        placeholder="name@example.com" value={values.email} onChange={set('email')} {...aria('email')} />
                    </Field>
                    <Field id="projectType" label="Project type" required error={errors.projectType}>
                      <select id="projectType" className="field" value={values.projectType} onChange={set('projectType')} {...aria('projectType')}>
                        <option value="" disabled>Select a project type</option>
                        {projectTypes.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </Field>
                    <Field id="location" label="Project location" required error={errors.location}>
                      <input id="location" className="field" autoComplete="address-level2"
                        placeholder="e.g. Bopal, Ahmedabad" value={values.location} onChange={set('location')} {...aria('location')} />
                    </Field>
                    <Field id="budget" label="Approximate budget" required error={errors.budget}>
                      <select id="budget" className="field" value={values.budget} onChange={set('budget')} {...aria('budget')}>
                        <option value="" disabled>Select a range</option>
                        {budgets.map((b) => <option key={b}>{b}</option>)}
                      </select>
                    </Field>
                  </div>

                  <div className="mt-6">
                    <Field id="requirements" label="Project requirements" optional hint="Rooms, size, timeline, style you like — anything that helps us understand the project.">
                      <textarea id="requirements" rows={4} className="field resize-y" placeholder="e.g. 3 BHK apartment, living room, kitchen and two bedrooms. Possession in March."
                        value={values.requirements} onChange={set('requirements')} aria-describedby="requirements-hint" />
                    </Field>
                  </div>

                  <fieldset className="mt-6">
                    <legend className="field-label">Preferred contact method</legend>
                    <div className="flex flex-wrap gap-3">
                      {contactMethods.map((m) => (
                        <label key={m}
                          className={`flex min-h-[44px] cursor-pointer items-center gap-2 border px-4 text-[14px] transition-colors ${
                            values.contactMethod === m ? 'border-bronze bg-bronze/10 text-charcoal' : 'border-line text-ink hover:border-taupe'
                          }`}
                        >
                          <input type="radio" name="contactMethod" value={m} checked={values.contactMethod === m}
                            onChange={set('contactMethod')} className="accent-[#a98762]" />
                          {m}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  {/* Honeypot */}
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input id="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
                  </div>

                  {status === 'error' && (
                    <div role="alert" className="mt-8 flex gap-3 border-l-2 border-[#a3402e] bg-[#a3402e]/5 p-4 text-[14px] text-[#7a2f21]">
                      <AlertCircle size={18} strokeWidth={1.6} className="mt-0.5 shrink-0" />
                      <p>
                        {serverError} Or call{' '}
                        <a className="underline" href={site.phones[0].href}>{site.phones[0].label}</a> or email{' '}
                        <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.
                      </p>
                    </div>
                  )}

                  <button type="submit" disabled={status === 'sending'} className="btn btn-primary mt-8 w-full sm:w-auto disabled:cursor-wait disabled:opacity-80">
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={17} className="animate-spin" /> Sending enquiry…
                      </>
                    ) : (
                      <>
                        Request Free Quotation <ArrowRight size={16} strokeWidth={1.6} className="btn-arrow" />
                      </>
                    )}
                  </button>
                  <p className="mt-4 text-[12.5px] text-ink/60">
                    We use these details only to respond to your enquiry.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
