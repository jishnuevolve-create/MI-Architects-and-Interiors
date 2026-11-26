# Miarq Spaces — website

Single-page site built with React, Vite, Tailwind CSS v4, Framer Motion and Lucide icons.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in /dist
npm run preview   # serve the production build
```

## Where things live

| What | File |
| --- | --- |
| Business details (phones, email, address, WhatsApp, Instagram, figures, clients) | `src/data/site.js` |
| Portfolio projects | `src/data/projects.js` |
| Services | `src/data/services.js` |
| Process steps, strengths, photo annotations, Instagram posts | `src/data/content.js` |
| Form delivery | `src/lib/submitEnquiry.js` + `.env` |
| SEO tags and structured data | `index.html` |
| Sections | `src/components/*.jsx` |

## Photos

Source photos are in `assets-src/` (from the studio's company profile and Instagram).
To add or replace one:

1. Put the JPG/PNG in `assets-src/photos/` (or `assets-src/instagram/`).
2. Run `npm run images` — this creates responsive WebP files in `public/images/` and updates `src/data/image-manifest.json`.
3. Reference it by key, e.g. `photos/master-bedroom`, in the data files.

A key that has no photo yet renders a clearly labelled placeholder instead of breaking.

## Quotation form — must be set up before launch

The form only shows the "Thank you" message when the email service confirms delivery.
Choose one option and put it in a `.env` file (see `.env.example`):

- **Web3Forms (recommended):** create a free access key at web3forms.com using the studio's
  business email, then set `VITE_WEB3FORMS_KEY=...`.
- **Formspree:** set `VITE_FORMSPREE_ID=...`.
- **No key set:** the form posts to FormSubmit for `info.miarch@gmail.com`. The first enquiry
  sends an activation email to that inbox; nothing is delivered until the link is clicked, and
  visitors see an error (with the phone number and email) until then.

## Before launch

- Set `SITE_URL` (e.g. `https://www.your-domain.com`) so `sitemap.xml`, `robots.txt`, canonical
  and Open Graph URLs are generated with the real domain.
- Set `whatsapp` in `src/data/site.js` to show the WhatsApp buttons.
- Replace `assets-src/brand/logo-original.png` with a high-resolution or SVG logo and run `npm run images`.
- Review the figures and client names in `src/data/site.js` (taken from the company profile).

## Deploying

**GitHub Pages (set up):** `.github/workflows/deploy-pages.yml` builds and publishes the site on
every push to `main`. One-time setting: repo **Settings → Pages → Source: GitHub Actions**.
To deliver form enquiries there, add `VITE_WEB3FORMS_KEY` (or `VITE_FORMSPREE_ID`) under
**Settings → Secrets and variables → Actions**. The workflow sets `BASE_PATH` to the repo name,
since Pages serves the site from `/<repo-name>/`.

Any other static host works (Netlify, Vercel, Cloudflare Pages, Hostinger). Build command `npm run build`,
output folder `dist`, and add the same environment variables in the host's settings.
