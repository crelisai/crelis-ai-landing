import { Reveal, Section, SectionHead, GlowCard } from '../components/ui/Primitives.jsx'
import { ShieldCheck, EyeOff, Server, Layers, Mail } from 'lucide-react'

const PILLARS = [
  { icon: EyeOff, title: 'No raw PII', desc: 'Crelis governs on decision metadata — action types and results, e.g. “identity: not verified”, “amount > limit”. Your customers’ raw data never enters Crelis.' },
  { icon: Server, title: 'Your perimeter', desc: 'Deploy as a single-tenant instance inside your VPC or private cloud. Nothing leaves your environment; you choose the region.' },
  { icon: Layers, title: 'Tenant isolation', desc: 'Server-enforced isolation with a production guard. Cross-tenant access is denied — not merely hidden in the UI.' },
  { icon: ShieldCheck, title: 'Tamper-evident audit', desc: 'Every decision is written to a hash-chained audit log on durable Postgres, verifiable end-to-end.' },
]

const DEPLOY = [
  { t: 'Single-tenant in your VPC', d: 'Dedicated instance inside your cloud account; data never leaves your perimeter.', s: 'Available' },
  { t: 'Private cloud (managed)', d: 'Dedicated, isolated instance operated for you in your chosen region.', s: 'Available' },
  { t: 'Multi-tenant SaaS', d: 'Shared platform with server-enforced tenant isolation.', s: 'Available' },
  { t: 'On-premise', d: 'Fully air-gapped deployment for the most sensitive environments.', s: 'Roadmap' },
]

const FRAMEWORKS = [
  { t: 'MAS FEAT', d: 'Fairness, ethics, accountability, transparency — deterministic, explainable, human-in-the-loop decisions with audit.' },
  { t: 'IMDA Model AI Governance / AI Verify', d: 'Explainability, human oversight, and record-keeping for AI-driven actions.' },
  { t: 'ISO/IEC 42001', d: 'An AI management-system mindset: policy lifecycle, roles, logging, continual oversight.' },
]

export default function Security() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-36 pb-10">
        <div className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:42px_42px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow mb-3">Security &amp; Trust</p>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl text-gradient">Security &amp; trust, by design</h1>
            <p className="mt-5 max-w-2xl text-slatemute leading-relaxed">
              Crelis is built to be handed to a security review. It runs in your environment, never stores raw customer data, and records every decision in a tamper-evident audit trail.
            </p>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <GlowCard className="h-full">
                <p.icon className="h-6 w-6 text-electric" aria-hidden />
                <h2 className="mt-3 font-display text-lg font-semibold text-white">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slatemute">{p.desc}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Deployment" title="You choose where it runs" sub="Crelis sits beside your systems, not inside your model — and you control the environment." />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {DEPLOY.map((d, i) => (
            <Reveal key={d.t} delay={i * 0.06}>
              <GlowCard className="flex h-full items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-base font-semibold text-white">{d.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slatemute">{d.d}</p>
                </div>
                <span className={`shrink-0 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wide ${d.s === 'Available' ? 'border-verify/40 text-verify bg-verify/10' : 'border-review/40 text-review bg-review/10'}`}>{d.s}</span>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Data handling" title="No raw PII — decision metadata only" />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Reveal>
            <GlowCard className="h-full">
              <p className="telemetry mb-3">What Crelis stores</p>
              <ul className="space-y-2 text-sm text-slatemute">
                <li>· Decision metadata — action types, results, policy outcomes</li>
                <li>· Trust signals as types/results (e.g. “identity: not verified”)</li>
                <li>· Tamper-evident audit records of each decision</li>
              </ul>
            </GlowCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlowCard className="h-full">
              <p className="telemetry mb-3">What Crelis does not store</p>
              <ul className="space-y-2 text-sm text-slatemute">
                <li>· Raw identity, card, or document numbers</li>
                <li>· Customer names, contact details, or message contents</li>
                <li>· Any field the calling system doesn’t send for a decision</li>
              </ul>
            </GlowCard>
          </Reveal>
        </div>
        <p className="mt-6 max-w-3xl text-sm text-slatemute leading-relaxed">
          The PII-minimizing shape is structural — the Canonical Envelope carries categories and outcomes, not sensitive values, so it can’t be misconfigured away. In transit, all traffic uses TLS 1.2+; at rest, provider-managed encryption applies; the Trust Engine key is held server-side and never exposed to the browser.
        </p>
      </Section>

      <Section>
        <SectionHead eyebrow="Frameworks" title="Aligned with how your examiners think" sub="Crelis is built around the principles in these frameworks. This denotes design alignment, not certification — Crelis does not currently hold SOC 2, ISO 27001, or ISO 42001 certification; formal certification is planned as we mature." />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {FRAMEWORKS.map((f, i) => (
            <Reveal key={f.t} delay={i * 0.08}>
              <GlowCard className="h-full">
                <h3 className="font-display text-base font-semibold text-white">{f.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slatemute">{f.d}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-gradient">Reviewing Crelis for your team?</h2>
          <p className="mx-auto mt-4 max-w-xl text-slatemute">Request the full Security &amp; Trust Pack, or send your security questionnaire — we’ll turn it around quickly.</p>
          <div className="mt-8">
            <a href="mailto:support@crelis.ai?subject=Security%20%26%20Trust%20Pack%20request" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-electric px-6 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-electric/90">
              <Mail className="h-4 w-4" aria-hidden /> Request the Security &amp; Trust Pack
            </a>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
