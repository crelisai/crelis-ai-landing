import { Gauge, GitBranch, ScrollText, ShieldCheck } from 'lucide-react'
import { Section, SectionHead, Reveal, GlowCard, PrimaryCTA, STATE } from '../components/ui/Primitives.jsx'
import TrustEngine from '../components/visuals/TrustEngine.jsx'
import { EscalationFlow, AuditTimeline } from '../components/visuals/Flows.jsx'
import { GovernanceDashboard } from '../components/visuals/Dashboards.jsx'
import { ROADMAP } from '../data/mock.js'

const PRINCIPLES = [
  { icon: Gauge, state: 'ai', title: 'Score every action', desc: 'Confidence, blast radius, reversibility, and policy sensitivity combine into a per-action risk score — before anything executes.' },
  { icon: GitBranch, state: 'review', title: 'Route by trust', desc: 'Policies decide the path: auto-approve, human review, dual sign-off, or hard block. Thresholds are yours to tune.' },
  { icon: ShieldCheck, state: 'verify', title: 'Execute with proof', desc: 'Approved actions run through Crelis executors, so the approval and the execution are the same record.' },
  { icon: ScrollText, state: 'verify', title: 'Seal the evidence', desc: 'Every decision — model, human, policy version — is hashed into a tamper-evident audit trail you can export.' },
]

export default function TrustLayer() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-36 pb-10">
        <div className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:42px_42px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-3">AI trust layer</p>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl text-gradient">
              The decision engine between AI and the real world
            </h1>
            <p className="mt-5 max-w-2xl text-slatemute leading-relaxed">
              When AI is confident, it proceeds. When it's uncertain, risky, regulated, or sensitive,
              Crelis intervenes — scoring, routing, escalating, and recording every step.
            </p>
            <div className="mt-7">
              <PrimaryCTA to="/demo">Request demo</PrimaryCTA>
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <GlowCard className="h-full">
                <span className={`inline-grid h-10 w-10 place-items-center rounded-xl border ${STATE[p.state].ring} ${STATE[p.state].soft}`}>
                  <p.icon className={`h-5 w-5 ${STATE[p.state].text}`} aria-hidden />
                </span>
                <h2 className="mt-4 font-display text-lg font-semibold text-white">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slatemute">{p.desc}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Trust engine"
          title="See the routing decision happen"
          sub="Pick a task. Watch confidence and risk resolve into a decision — auto-approve, human review, or block."
        />
        <Reveal className="mt-10">
          <TrustEngine />
        </Reveal>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Human escalation"
          title="A checkpoint, not a bottleneck"
          sub="Escalation is a first-class path. Reviewers see full context, decide in minutes, and their sign-off becomes part of the execution record."
        />
        <Reveal className="mt-10">
          <EscalationFlow />
        </Reveal>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHead
              eyebrow="Audit engine"
              title="Every action leaves evidence"
              sub="Who proposed it, how it was scored, who approved it, what executed — replayable and exportable for auditors and regulators."
            />
            <Reveal className="mt-8" delay={0.1}>
              <AuditTimeline />
            </Reveal>
          </div>
          <div>
            <SectionHead
              eyebrow="Governance"
              title="One pane for AI activity"
              sub="Approvals, exceptions, and compliance events across every agent in your environment."
            />
            <Reveal className="mt-8" delay={0.15}>
              <GovernanceDashboard />
            </Reveal>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Platform roadmap"
          title="Built as an operating system for trusted execution"
          sub="The trust layer is the core. These modules extend it — reserved here as the platform comes online."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ROADMAP.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.06}>
              <GlowCard className="h-full">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-base font-semibold text-white">{r.label}</h3>
                  <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${r.status === 'Pilot' ? 'border-verify/40 text-verify' : 'border-hairline text-slatemute'}`}>
                    {r.status}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slatemute">{r.desc}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  )
}
