import { Section, SectionHead, Reveal, GlowCard, PrimaryCTA } from '../components/ui/Primitives.jsx'
import AgentNetwork from '../components/visuals/AgentNetwork.jsx'

const BELIEFS = [
  { title: 'AI will act, not just answer', desc: 'The shift from chat to execution is already underway. The question is no longer capability — it\u2019s control.' },
  { title: 'Trust is infrastructure', desc: 'Governance can\u2019t live in a PDF policy. It has to run in the execution path, per action, in real time.' },
  { title: 'Humans stay in the loop — by design', desc: 'The future workforce reviews, approves, and corrects AI. That work deserves identity, reputation, and pay.' },
]

export default function About() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-36 pb-10">
        <div className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:42px_42px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <p className="eyebrow mb-3">About Crelis</p>
              <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl text-gradient">
                Crelis is not another AI company
              </h1>
              <p className="mt-5 text-slatemute leading-relaxed">
                We don't build agents. We build the layer they answer to. As agentic AI becomes
                capable of taking real actions, enterprises need governance, escalation,
                auditability, and accountability — Crelis is that trust layer between AI systems
                and execution.
              </p>
              <p className="mt-4 font-mono text-xs tracking-wide text-slatemute">
                AI executes · Crelis governs · Humans intervene when trust matters
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="glass p-4">
                <p className="telemetry px-2 pb-2">Agent network · governed by Crelis</p>
                <AgentNetwork />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Section>
        <SectionHead
          eyebrow="What we believe"
          title="The operating system of trusted AI execution"
          sub="Three convictions shape everything we build."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {BELIEFS.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.1}>
              <GlowCard className="h-full">
                <p className="font-mono text-xs text-electric">0{i + 1}</p>
                <h2 className="mt-3 font-display text-lg font-semibold text-white">{b.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slatemute">{b.desc}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-gradient">
            Building the trust layer takes partners
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slatemute">
            We're working with early enterprise design partners and expert reviewers. If that's you, let's talk.
          </p>
          <div className="mt-8">
            <PrimaryCTA to="/demo">Get in touch</PrimaryCTA>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
