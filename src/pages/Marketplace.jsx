import { BadgeCheck, Clock, ShieldCheck, Wallet } from 'lucide-react'
import { Section, SectionHead, Reveal, GlowCard, PilotCTA, GhostCTA } from '../components/ui/Primitives.jsx'
import ReviewerMarketplace from '../components/visuals/ReviewerMarketplace.jsx'
import { EscalationFlow } from '../components/visuals/Flows.jsx'

const HOW = [
  { icon: ShieldCheck, title: 'Verified onboarding', desc: 'Experts pass identity, credential, and domain checks before they can review a single task.' },
  { icon: Clock, title: 'Live availability', desc: 'Routing considers who is online, qualified, and within SLA — so escalations resolve in minutes, not days.' },
  { icon: BadgeCheck, title: 'Earned trust scores', desc: 'Every decision is quality-scored. Trust compounds with accuracy; routing favors the best track records.' },
  { icon: Wallet, title: 'Paid per decision', desc: 'Experts earn for verified judgment, not hours. Enterprises pay only when human review actually happens.' },
]

export default function Marketplace() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-36 pb-10">
        <div className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:42px_42px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" aria-hidden />
        <div className="pointer-events-none absolute -top-40 right-0 h-[380px] w-[520px] rounded-full bg-verify/10 blur-[120px]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-3">Human workforce marketplace</p>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl text-gradient">
              Verified human judgment, on demand
            </h1>
            <p className="mt-5 max-w-2xl text-slatemute leading-relaxed">
              The other half of the trust layer: a network of credentialed experts who review,
              approve, and correct AI work when confidence is low or the stakes are high.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <PilotCTA />
              <GhostCTA to="/demo">Join as an expert</GhostCTA>
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <SectionHead
          eyebrow="Live network"
          title="Experts on standby right now"
          sub="Filter the reviewer pool by sector. Each profile shows expertise, availability, average review time, and trust clearance. Illustrative data."
        />
        <div className="mt-10">
          <ReviewerMarketplace />
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="How it works"
          title="Judgment as infrastructure"
          sub="The marketplace isn't a help desk. It's a routed, scored, accountable layer of human decision-making inside your AI workflows."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HOW.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.08}>
              <GlowCard className="h-full">
                <h.icon className="h-6 w-6 text-electric" aria-hidden />
                <h2 className="mt-4 font-display text-lg font-semibold text-white">{h.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slatemute">{h.desc}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Where humans plug in"
          title="A defined seat in the execution path"
          sub="Experts enter at the review stage with full task context, and their approval is sealed into the same audit record as the AI's work."
        />
        <Reveal className="mt-10">
          <EscalationFlow />
        </Reveal>
      </Section>
    </>
  )
}
