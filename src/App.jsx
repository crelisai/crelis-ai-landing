/* ============================================================================
   Crelis.ai — Enterprise AI Control Plane
   Single-file landing page. All copy lives in this file.

   HOW TO EDIT:
   • Text copy is marked with  // EDIT:  comments throughout.
   • Repeated cards (capabilities / use cases) are plain arrays near the top of
     each section — change the array to change the cards.
   • Colors & fonts are defined in tailwind.config.js (ink, panel, electric…).
   ========================================================================== */

import { useEffect, useRef, useState } from 'react'
import {
  Shield,
  GitBranch,
  Gauge,
  ScrollText,
  ArrowRight,
  Check,
  Cloud,
  Server,
  Cpu,
  Users,
  Menu,
  X,
  Headphones,
  Boxes,
  Globe,
  ShieldAlert,
  UserCheck,
  FileSearch,
} from 'lucide-react'

/* ----------------------------------------------------------------------------
   Small reveal-on-scroll hook (no library). Adds a fade/rise when an element
   enters the viewport. Respects prefers-reduced-motion via the CSS in index.css.
---------------------------------------------------------------------------- */
function useReveal() {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, shown]
}

function Reveal({ children, className = '', delay = 0 }) {
  const [ref, shown] = useReveal()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  )
}

/* Reusable section title block ------------------------------------------------ */
function SectionHead({ eyebrow, title, sub, center }) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight tracking-tight">
        {title}
      </h2>
      {sub && <p className="mt-4 text-slatemute text-base sm:text-lg leading-relaxed">{sub}</p>}
    </div>
  )
}

/* ============================================================================
   1. HEADER / NAV
   ========================================================================== */
function Nav() {
  const [open, setOpen] = useState(false)

  // EDIT: navigation links (label + anchor id)
  const links = [
    { label: 'Platform', href: '#platform' },
    { label: 'Use Cases', href: '#use-cases' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-hairline bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-electric to-cyan shadow-glow">
              <span className="h-2.5 w-2.5 rounded-sm bg-ink" />
            </span>
            {/* EDIT: logo wordmark */}
            <span className="font-display text-lg font-semibold tracking-tight">
              Crelis<span className="text-electric">.ai</span>
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-slatemute hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            {/* EDIT: header CTA label */}
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 rounded-lg bg-electric px-4 py-2 text-sm font-medium text-white shadow-glow transition-transform hover:-translate-y-0.5"
            >
              Request Early Access <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden grid h-9 w-9 place-items-center rounded-lg border border-hairline text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-hairline bg-ink/95 px-5 py-4">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-slatemute hover:bg-panel hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-electric px-4 py-2.5 text-sm font-medium text-white"
            >
              Request Early Access <ArrowRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

/* ============================================================================
   SIGNATURE VISUAL — the "control plane" decision lane.
   A request token flows through Score → Route → Govern → Audit.
   Used in the hero. Pure SVG + CSS, no assets.
   ========================================================================== */
function ControlPlaneVisual() {
  const stages = ['Score', 'Route', 'Govern', 'Audit'] // EDIT: stage labels
  return (
    <div className="relative rounded-2xl border border-hairline bg-panel/60 p-5 shadow-card backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slatemute">
          decision&nbsp;lane
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-cyan">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" /> live
        </span>
      </div>

      <svg viewBox="0 0 520 150" className="w-full" role="img" aria-label="Decision flow">
        {/* connecting rail */}
        <line x1="40" y1="75" x2="480" y2="75" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
        {/* animated flow pulse */}
        <line
          x1="40"
          y1="75"
          x2="480"
          y2="75"
          stroke="#3D7BFF"
          strokeWidth="2"
          strokeDasharray="6 18"
          className="animate-pulseline"
        />

        {stages.map((s, i) => {
          const x = 40 + i * (440 / 3)
          return (
            <g key={s}>
              <circle cx={x} cy="75" r="22" fill="#0F1830" stroke="#3D7BFF" strokeWidth="1.5" />
              <circle cx={x} cy="75" r="6" fill="#22D3EE" />
              <text
                x={x}
                y="118"
                textAnchor="middle"
                fill="#93A3BC"
                fontFamily="JetBrains Mono, monospace"
                fontSize="12"
              >
                {s}
              </text>
            </g>
          )
        })}
        {/* request token entering */}
        <circle cx="40" cy="75" r="9" fill="#fff" className="animate-floaty" />
      </svg>

      <div className="mt-2 grid grid-cols-2 gap-3 text-xs text-slatemute sm:grid-cols-4">
        {/* EDIT: micro-captions under the visual */}
        <span>Risk &amp; confidence</span>
        <span>Agent / human routing</span>
        <span>Policy enforcement</span>
        <span>Immutable record</span>
      </div>
    </div>
  )
}

/* ============================================================================
   2. HERO
   ========================================================================== */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-36 pb-20">
      {/* ambient gradient glow + faint grid (decorative) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-electric/20 blur-[120px]" />
        <div className="absolute inset-0 bg-grid-faint [background-size:46px_46px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            {/* trust line / eyebrow */}
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-hairline bg-panel/60 px-3 py-1 font-mono text-xs text-slatemute">
                <Shield className="h-3.5 w-3.5 text-electric" />
                {/* EDIT: trust line */}
                Built for regulated enterprises deploying AI at scale.
              </p>
            </Reveal>

            {/* headline */}
            <Reveal delay={80}>
              <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
                {/* EDIT: hero headline */}
                Enterprise AI <span className="text-gradient">Control Plane</span>
              </h1>
            </Reveal>

            {/* subheadline */}
            <Reveal delay={160}>
              <p className="mt-5 max-w-xl text-lg text-slatemute leading-relaxed">
                {/* EDIT: hero subheadline */}
                Securely score, route, govern, and audit AI-driven actions across agents,
                enterprise systems, and human workflows.
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {/* EDIT: primary + secondary CTA labels */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-electric px-5 py-3 text-sm font-medium text-white shadow-glow transition-transform hover:-translate-y-0.5"
                >
                  Request Early Access <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#architecture"
                  className="inline-flex items-center gap-2 rounded-lg border border-hairline bg-panel/40 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-panel"
                >
                  View Architecture
                </a>
              </div>
            </Reveal>
          </div>

          {/* signature visual */}
          <Reveal delay={200}>
            <ControlPlaneVisual />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ============================================================================
   3. PROBLEM
   ========================================================================== */
function Problem() {
  // EDIT: the five unanswered questions
  const gaps = [
    'Which AI should act',
    'When humans should approve',
    'What risk level exists',
    'Whether policy was followed',
    'How the decision can be audited',
  ]
  return (
    <section className="border-t border-hairline py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHead
              eyebrow="The gap"
              title="AI is moving faster than enterprise control."
              sub="Companies are deploying AI agents across customer service, operations, finance, legal, and IT. What they lack is a unified way to decide:"
            />
          </Reveal>

          <Reveal delay={120}>
            <ul className="grid gap-3 self-center">
              {gaps.map((g) => (
                <li
                  key={g}
                  className="flex items-center gap-3 rounded-xl border border-hairline bg-panel/50 px-4 py-3.5"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-electric/15 text-electric">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm sm:text-base text-white/90">{g}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ============================================================================
   4. SOLUTION — Score / Route / Govern / Audit
   ========================================================================== */
function Solution() {
  // EDIT: the four capability cards
  const caps = [
    {
      icon: Gauge,
      title: 'Score',
      body: 'Evaluate requests based on risk, confidence, cost, compliance, and business impact.',
    },
    {
      icon: GitBranch,
      title: 'Route',
      body: 'Send work to the right AI agent, enterprise application, human expert, or hybrid workflow.',
    },
    {
      icon: Shield,
      title: 'Govern',
      body: 'Apply policy controls, approval workflows, permissions, and compliance rules before execution.',
    },
    {
      icon: ScrollText,
      title: 'Audit',
      body: 'Create structured logs, decision records, and reporting for risk, legal, security, and regulatory teams.',
    },
  ]
  return (
    <section id="platform" className="border-t border-hairline py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHead
            center
            eyebrow="The platform"
            title="Crelis.ai sits between AI, humans, and enterprise systems."
            sub="A single decision layer for every AI-driven action — from automatic execution to human approval."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {caps.map((c, i) => (
            <Reveal key={c.title} delay={i * 90}>
              <div className="group h-full rounded-2xl border border-hairline bg-panel/50 p-6 shadow-card transition-colors hover:border-electric/40">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-electric/20 to-cyan/10 text-electric ring-1 ring-electric/20">
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slatemute">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================================
   ARCHITECTURE FLOW DIAGRAM — Customer Systems → Edge/Cloud → Targets → Audit
   ========================================================================== */
function FlowDiagram() {
  // EDIT: the four columns of the architecture flow
  const cols = [
    { icon: Server, label: 'Customer Systems', note: 'Contact center, SAP, web, apps' },
    { icon: Cpu, label: 'Crelis Edge / Cloud', note: 'Score · Route · Govern', accent: true },
    { icon: Boxes, label: 'AI · Apps · Humans', note: 'Models, systems, approval' },
    { icon: ScrollText, label: 'Auditable Decision', note: 'Logged & reportable' },
  ]
  return (
    <div className="rounded-2xl border border-hairline bg-panel/40 p-6 sm:p-8 shadow-card">
      <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center">
        {cols.map((c, i) => (
          <div key={c.label} className="flex flex-1 items-center gap-4 md:flex-col md:gap-3">
            <div
              className={`flex w-full flex-col items-center rounded-xl border px-4 py-5 text-center ${
                c.accent
                  ? 'border-electric/50 bg-electric/10 shadow-glow'
                  : 'border-hairline bg-panel/70'
              }`}
            >
              <c.icon className={`h-6 w-6 ${c.accent ? 'text-electric' : 'text-slatemute'}`} />
              <span className="mt-3 text-sm font-medium text-white">{c.label}</span>
              <span className="mt-1 text-xs text-slatemute">{c.note}</span>
            </div>
            {/* arrow between columns (hidden after last) */}
            {i < cols.length - 1 && (
              <ArrowRight className="h-5 w-5 shrink-0 rotate-90 text-electric md:rotate-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ============================================================================
   5. ARCHITECTURE
   ========================================================================== */
function Architecture() {
  // EDIT: the two deployment models
  const models = [
    {
      icon: Cloud,
      title: 'Fully Managed Cloud',
      body: 'Customer systems connect securely to Crelis.ai via APIs, permissions, identity, and policy controls.',
    },
    {
      icon: Server,
      title: 'Hybrid Runtime',
      body: 'A lightweight Crelis Edge Runtime runs inside your AWS, Azure, private cloud, or data center. Sensitive data stays inside your environment while Crelis Cloud manages policy, analytics, licensing, and governance.',
    },
  ]
  return (
    <section id="architecture" className="border-t border-hairline py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHead
            eyebrow="Architecture"
            title="Cloud-first. Hybrid-ready."
            sub="Run Crelis.ai as a managed service or keep sensitive data in your own environment with an edge runtime."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {models.map((m, i) => (
            <Reveal key={m.title} delay={i * 100}>
              <div className="h-full rounded-2xl border border-hairline bg-panel/50 p-7 shadow-card">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-electric/15 text-electric ring-1 ring-electric/20">
                  <m.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slatemute">{m.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-8">
            <FlowDiagram />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ============================================================================
   6. USE CASES
   ========================================================================== */
function UseCases() {
  // EDIT: the six use-case cards
  const items = [
    { icon: Headphones, title: 'Contact Center AI Orchestration' },
    { icon: Boxes, title: 'SAP and Enterprise Workflow Governance' },
    { icon: Globe, title: 'Website and Digital Bot Control' },
    { icon: ShieldAlert, title: 'AI Agent Risk Scoring' },
    { icon: UserCheck, title: 'Human-in-the-Loop Approval' },
    { icon: FileSearch, title: 'Compliance and Audit Reporting' },
  ]
  return (
    <section id="use-cases" className="border-t border-hairline py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHead
            center
            eyebrow="Use cases"
            title="Built for high-control AI environments."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 90}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-hairline bg-panel/50 p-6 transition-colors hover:border-electric/40">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-electric/15 text-electric ring-1 ring-electric/20">
                  <it.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-1 font-display text-base font-semibold leading-snug">
                  {it.title}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================================
   7. WHY NOW
   ========================================================================== */
function WhyNow() {
  return (
    <section className="border-t border-hairline py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
        <Reveal>
          <p className="eyebrow mb-4">Why now</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight tracking-tight">
            {/* EDIT: why-now headline */}
            The next AI problem is not generation. It is{' '}
            <span className="bg-gradient-to-r from-electric to-cyan bg-clip-text text-transparent">
              control
            </span>
            .
          </h2>
          <p className="mt-5 text-slatemute text-lg leading-relaxed">
            {/* EDIT: why-now body */}
            Enterprises will use many AI models, agents, bots, and automation platforms. The
            challenge is deciding what should act, when, under which policy, and with what
            accountability.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ============================================================================
   8. FINAL CTA
   ========================================================================== */
function FinalCTA() {
  return (
    <section className="border-t border-hairline py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-electric/30 bg-gradient-to-br from-panel2 to-panel px-7 py-14 text-center shadow-glow sm:px-12">
            <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-[640px] -translate-x-1/2 rounded-full bg-electric/20 blur-[100px]" />
            <h2 className="relative font-display text-3xl sm:text-4xl font-semibold tracking-tight">
              {/* EDIT: final CTA headline */}
              Deploy AI without losing control.
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-slatemute leading-relaxed">
              {/* EDIT: final CTA body */}
              Crelis.ai is building the orchestration and governance layer for enterprise AI
              decisions.
            </p>
            <a
              href="#contact"
              className="relative mt-8 inline-flex items-center gap-2 rounded-lg bg-electric px-6 py-3 text-sm font-medium text-white shadow-glow transition-transform hover:-translate-y-0.5"
            >
              Request Early Access <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ============================================================================
   9. CONTACT FORM  (placeholder handling only — wire up your endpoint later)
   ========================================================================== */
function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    message: '',
  })

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  // PLACEHOLDER: replace this with a POST to your API / form service
  // (e.g. Formspree, Resend, a Vercel serverless function, etc.)
  const handleSubmit = () => {
    if (!form.name || !form.email) return
    console.log('Crelis early-access request:', form)
    setSent(true)
  }

  const fields = [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'email', label: 'Work Email', type: 'email', required: true },
    { key: 'company', label: 'Company', type: 'text' },
    { key: 'role', label: 'Role', type: 'text' },
  ]

  return (
    <section id="contact" className="border-t border-hairline py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-5 sm:px-8">
        <Reveal>
          <SectionHead
            center
            eyebrow="Request early access"
            title="Tell us about your AI environment."
            sub="We're onboarding a small group of design partners. Share a few details and we'll be in touch."
          />
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 rounded-2xl border border-hairline bg-panel/50 p-6 sm:p-8 shadow-card">
            {sent ? (
              // Success state (placeholder)
              <div className="py-10 text-center">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-electric/15 text-electric ring-1 ring-electric/30">
                  <Check className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">Thanks — request received.</h3>
                <p className="mt-2 text-sm text-slatemute">
                  We'll reach out to {form.email || 'you'} shortly.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {fields.map((f) => (
                    <label key={f.key} className="block">
                      <span className="mb-1.5 block text-xs font-medium text-slatemute">
                        {f.label}
                        {f.required && <span className="text-electric"> *</span>}
                      </span>
                      <input
                        type={f.type}
                        value={form[f.key]}
                        onChange={update(f.key)}
                        className="w-full rounded-lg border border-hairline bg-ink/60 px-3.5 py-2.5 text-sm text-white placeholder-slatemute/60 outline-none transition-colors focus:border-electric/60 focus:ring-1 focus:ring-electric/40"
                        placeholder={f.label}
                      />
                    </label>
                  ))}
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-slatemute">Message</span>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={update('message')}
                    className="w-full resize-none rounded-lg border border-hairline bg-ink/60 px-3.5 py-2.5 text-sm text-white placeholder-slatemute/60 outline-none transition-colors focus:border-electric/60 focus:ring-1 focus:ring-electric/40"
                    placeholder="What are you building, and where do you need control?"
                  />
                </label>

                <button
                  onClick={handleSubmit}
                  className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-electric px-5 py-3 text-sm font-medium text-white shadow-glow transition-transform hover:-translate-y-0.5"
                >
                  Submit Interest <ArrowRight className="h-4 w-4" />
                </button>
                <p className="text-center text-xs text-slatemute/70">
                  Placeholder form — no data is sent until you connect an endpoint.
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ============================================================================
   FOOTER
   ========================================================================== */
function Footer() {
  return (
    <footer className="border-t border-hairline py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br from-electric to-cyan">
                <span className="h-2 w-2 rounded-sm bg-ink" />
              </span>
              <span className="font-display text-base font-semibold tracking-tight">
                Crelis<span className="text-electric">.ai</span>
              </span>
            </div>
            {/* EDIT: footer tagline */}
            <p className="mt-2 text-sm text-slatemute">Enterprise AI Control Plane</p>
          </div>
          {/* EDIT: copyright */}
          <p className="text-xs text-slatemute/70">
            © 2026 Crelis.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ============================================================================
   PAGE
   ========================================================================== */
export default function App() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <Architecture />
      <UseCases />
      <WhyNow />
      <FinalCTA />
      <Contact />
      <Footer />
    </main>
  )
}
