import { Reveal, Section, SectionHead, GlowCard } from '../components/ui/Primitives.jsx'
import { EyeOff, ShieldOff, Server, ArrowRight } from 'lucide-react'

const HOW = [
  { icon: EyeOff, title: 'No PII', desc: 'Crelis evaluates decision metadata only — never your customers’ raw data.' },
  { icon: ShieldOff, title: 'Shadow mode', desc: 'Read-only and out-of-band during the pilot. It observes and records; it enforces nothing and changes nothing in your systems.' },
  { icon: Server, title: 'Your VPC', desc: 'Runs as a single-tenant instance in your environment. Start on synthetic traffic, graduate to a UAT mirror when you’re ready.' },
]

const GET = [
  'A findings report: every agent action your current controls would have missed',
  'Early access and direct influence over the roadmap',
  'A reusable policy set for your use cases, authored with you',
  'Named or anonymous reference — entirely your choice',
]
const ASK = [
  'Five real scenarios your AI agents handle (e.g. refunds, data export, account changes)',
  'One technical point of contact for a non-prod setup',
  'Two to three short sessions across the 4–6 weeks',
  'Honest feedback',
]
const TIMELINE = [
  { w: 'Week 0', t: 'Setup', d: 'NDA, scenarios, single-tenant deploy in your environment.' },
  { w: 'Week 1–2', t: 'Shadow', d: 'Crelis evaluates traffic; we author your policies together.' },
  { w: 'Week 3–4', t: 'Findings', d: 'What was caught, explainability, audit integrity, readout.' },
  { w: 'Optional', t: 'Enforce', d: 'Decide whether to move to a binding integration.' },
]

export default function DesignPartners() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-36 pb-10">
        <div className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:42px_42px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow mb-3">Design Partner Program · 2026 Cohort</p>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl text-gradient">Govern what your AI agents do — before they do it</h1>
            <p className="mt-5 max-w-2xl text-slatemute leading-relaxed">
              A five-slot, co-creation program for regulated teams in Singapore / APAC piloting AI agents that take real actions. Free, time-boxed, and zero risk to your production systems.
            </p>
            <div className="mt-8">
              <a href="mailto:crelisai@outlook.com?subject=Design%20Partner%20Pilot%20%E2%80%94%20%5BCompany%5D" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-electric px-6 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-electric/90">
                Apply for the pilot <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <SectionHead eyebrow="How it works" title="Zero risk by design" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {HOW.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.08}>
              <GlowCard className="h-full">
                <h.icon className="h-6 w-6 text-electric" aria-hidden />
                <h2 className="mt-3 font-display text-lg font-semibold text-white">{h.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slatemute">{h.desc}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <GlowCard className="h-full">
              <p className="telemetry mb-3">What you get</p>
              <ul className="space-y-2.5 text-sm text-slatemute">{GET.map((g) => <li key={g}>· {g}</li>)}</ul>
            </GlowCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlowCard className="h-full">
              <p className="telemetry mb-3">What we ask</p>
              <ul className="space-y-2.5 text-sm text-slatemute">{ASK.map((a) => <li key={a}>· {a}</li>)}</ul>
            </GlowCard>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Timeline" title="Four to six weeks, end to end" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TIMELINE.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.06}>
              <GlowCard className="h-full">
                <p className="font-mono text-xs uppercase tracking-wide text-electric">{s.w}</p>
                <h3 className="mt-2 font-display text-base font-semibold text-white">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slatemute">{s.d}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-gradient">Five slots. One conversation to start.</h2>
          <p className="mx-auto mt-4 max-w-xl text-slatemute">Bring one agent scenario to a 30-minute working session and we’ll show you the decision, the explanation, and the audit trail — live.</p>
          <div className="mt-8">
            <a href="mailto:crelisai@outlook.com?subject=Design%20Partner%20Pilot%20%E2%80%94%20%5BCompany%5D" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-electric px-6 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-electric/90">
              Apply for the pilot <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
