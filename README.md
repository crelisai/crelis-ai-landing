# Crelis.ai — The Trust Layer for Agentic AI

Multi-page marketing site for **Crelis.ai**. AI executes. Crelis governs. Humans intervene when trust matters.

Built with **React 18 + Vite 5 + Tailwind CSS 3 + React Router 7 + Framer Motion**.
No backend, no stock images — all visuals are SVG / CSS / motion graphics. All data is mocked.

## Run locally

Requires **Node.js 18+**.

```bash
npm install      # install dependencies
npm run dev      # dev server → http://localhost:5173
npm run build    # production build → ./dist
npm run preview  # preview the production build
```

## Project structure

```
src/
  main.jsx                 # entry + BrowserRouter
  App.jsx                  # layout shell, routes, ScrollToTop, 404
  index.css                # Tailwind layers + glass/telemetry utilities
  data/mock.js             # ALL mock data — swap for API calls later
  components/
    Nav.jsx / Footer.jsx
    ui/Primitives.jsx      # Section, Reveal, GlowCard, CTAs, Logo, trust-state tokens
    visuals/
      DecisionLane.jsx     # hero signature: animated task routing
      AgentNetwork.jsx     # animated agent graph
      TrustEngine.jsx      # interactive risk/confidence routing demo
      Flows.jsx            # EscalationFlow + AuditTimeline
      Dashboards.jsx       # Marketplace experts, TrustScore, Governance
  pages/
    Home.jsx  TrustLayer.jsx  Marketplace.jsx  UseCases.jsx  About.jsx  Demo.jsx
```

### Trust-state color language

Used consistently across every component (defined in `tailwind.config.js` and
`ui/Primitives.jsx` → `STATE`):

| State  | Meaning              | Color            |
|--------|----------------------|------------------|
| ai     | AI / agent activity  | electric #3D7BFF |
| review | human review needed  | amber  #FBBF24   |
| verify | approved / verified  | green  #34D399   |
| block  | blocked by policy    | rose   #FB7185   |

## Editing content

- **Copy & cards:** mostly arrays at the top of each page in `src/pages/`
- **Mock demo data:** `src/data/mock.js` (single future API integration point)
- **Colors & fonts:** `tailwind.config.js`
- **SEO:** `index.html` · **Logo:** `ui/Primitives.jsx` (`Logo`) + `public/favicon.svg`

### Contact form

`src/pages/Demo.jsx` is a placeholder — submit shows a success state locally.
Wire `handleSubmit` to Formspree/Resend/Basin or a Vercel function. Use
`VITE_CONTACT_ENDPOINT` from `.env.local` (see `.env.example`).

## Deploy to Vercel

`vercel.json` is included (framework: vite, SPA rewrites for client-side routing).

1. Push to GitHub
2. Import the repo at vercel.com/new
3. Vercel auto-detects Vite — accept defaults and deploy

## Accessibility

- Skip-to-content link, keyboard-visible focus rings
- `prefers-reduced-motion` respected (CSS + Framer Motion `useReducedMotion`)
- SVG visuals carry `role="img"` + descriptive labels; decorative layers are `aria-hidden`
- Interactive demos use proper `aria-pressed` / radiogroup semantics
