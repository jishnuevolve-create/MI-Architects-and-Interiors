import { site } from '../data/site.js';

/**
 * Sends a quotation enquiry to the studio's inbox.
 *
 * Provider is chosen from environment variables (see .env.example):
 *  - VITE_WEB3FORMS_KEY   -> Web3Forms (recommended; free access key bound to the business email)
 *  - VITE_FORMSPREE_ID    -> Formspree form id
 *  - neither              -> FormSubmit, posting to site.email. The very first submission makes
 *                            FormSubmit email an activation link to that inbox; enquiries are
 *                            delivered once the link is clicked. Until then this returns an error.
 *  - VITE_FORM_ENDPOINT   -> any custom JSON endpoint (overrides all of the above)
 *
 * Resolves on confirmed delivery, throws an Error with a user-facing message otherwise.
 */
export async function submitEnquiry(data) {
  const env = import.meta.env;
  const subject = `New quotation request — ${data.projectType} — ${data.fullName}`;
  const payload = {
    'Full name': data.fullName,
    'Phone number': data.phone,
    'Email address': data.email || 'Not provided',
    'Project type': data.projectType,
    'Project location': data.location,
    'Approximate budget': data.budget,
    'Preferred contact method': data.contactMethod,
    'Project requirements': data.requirements || 'Not provided',
    'Submitted from': window.location.href,
  };

  let url;
  let body;
  if (env.VITE_FORM_ENDPOINT) {
    url = env.VITE_FORM_ENDPOINT;
    body = { subject, ...payload };
  } else if (env.VITE_WEB3FORMS_KEY) {
    url = 'https://api.web3forms.com/submit';
    body = { access_key: env.VITE_WEB3FORMS_KEY, subject, from_name: site.name, replyto: data.email || undefined, ...payload };
  } else if (env.VITE_FORMSPREE_ID) {
    url = `https://formspree.io/f/${env.VITE_FORMSPREE_ID}`;
    body = { _subject: subject, ...(data.email ? { email: data.email } : {}), ...payload };
  } else {
    url = `https://formsubmit.co/ajax/${site.email}`;
    body = { _subject: subject, _template: 'table', _captcha: 'false', ...(data.email ? { _replyto: data.email } : {}), ...payload };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  let res;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch {
    throw new Error('We could not reach our enquiry service. Check your internet connection and try again.');
  } finally {
    clearTimeout(timer);
  }

  let json = {};
  try {
    json = await res.json();
  } catch {
    /* some providers return an empty body */
  }

  // Each provider reports success differently; accept only an explicit success.
  const ok =
    res.ok &&
    (json.success === true || json.success === 'true' || json.ok === true || (json.next && !json.errors) || json.status === 'success');

  if (!ok) {
    throw new Error('Your enquiry was not sent. Please try again in a moment.');
  }
  return json;
}
