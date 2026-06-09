# Crelis.ai — Landing Page

A single-page, responsive landing site for **Crelis.ai**, the Enterprise AI Control Plane.
Built with **React 18 + Vite + Tailwind CSS**. No paid assets, no backend required.

---

## Tech stack

- **Vite** — build tooling / dev server
- **React 18** — UI
- **Tailwind CSS 3** — styling (tokens in `tailwind.config.js`)
- **lucide-react** — open-source icons (MIT)
- **Google Fonts** — Space Grotesk, Inter, JetBrains Mono (free)

---

## Run locally

Requires **Node.js 18+**.

```bash
npm install      # install dependencies
npm run dev      # start dev server → http://localhost:5173
npm run build    # production build → ./dist
npm run preview  # preview the production build locally
```

---

## Where to edit content

Everything lives in **`src/App.jsx`**. Search for `// EDIT:` comments — each marks
a piece of copy (headline, CTA labels, card text, etc.). Repeated cards (capabilities,
use cases, deployment models) are simple arrays at the top of their section.

- **Colors & fonts:** `tailwind.config.js` (`ink`, `panel`, `electric`, `cyan`, …)
- **Page title / SEO:** `index.html`
- **Favicon:** `public/favicon.svg`

### Connecting the contact form

The form in `Contact()` is a **placeholder** — on submit it logs to the console and
shows a success state. To make it real, replace the `handleSubmit` function with a
POST to a form service (Formspree, Resend, Basin) or a Vercel serverless function.

---

## Deploy to Vercel

### Option A — Git + Vercel dashboard (recommended)

1. Push this project to a GitHub / GitLab / Bitbucket repo:
   ```bash
   git init
   git add .
   git commit -m "Crelis.ai landing page"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. Go to **https://vercel.com/new** and **Import** the repo.
3. Vercel auto-detects Vite. Confirm the settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Click **Deploy**. You'll get a live `*.vercel.app` URL in ~1 minute.
5. (Optional) Add a custom domain under **Project → Settings → Domains**.

### Option B — Vercel CLI (no Git needed)

```bash
npm i -g vercel        # install the CLI once
vercel login           # authenticate
vercel                 # deploy a preview (answer the prompts; accept defaults)
vercel --prod          # promote to production
```

When prompted, accept the detected Vite settings (build `npm run build`, output `dist`).

---

## Deploy elsewhere

- **Netlify:** build command `npm run build`, publish directory `dist`.
- **Cloudflare Pages:** framework preset *Vite*, build command `npm run build`, output `dist`.

---

© 2026 Crelis.ai. All rights reserved.
