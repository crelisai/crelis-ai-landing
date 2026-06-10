import { Check } from 'lucide-react'
import { Section, SectionHead, Reveal, GlowCard, PrimaryCTA } from '../components/ui/Primitives.jsx'
import { USE_CASES } from '../data/mock.js'
import { AuditTimeline } from '../components/visuals/Flows.jsx'

export default function UseCases() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-36 pb-10">
        <div className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:42px_42px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-3">Enterprise use cases</p>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl text-gradient">
              One trust loop, every regulated workflow
            </h1>
            <p className="mt-5 max-w-2xl text-slatemute leading-relaxed">
              The pattern is constant — score, route, approve, audit. The policies, reviewers,
              and thresholds adapt to each industry.
            </p>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((u, i) => (
            <Reveal key={u.id} delay={(i % 3) * 0.08}>
              <GlowCard className="flex h-full flex-col">
                <p className="telemetry">{u.tag}</p>
                <h2 className="mt-3 font-display text-lg font-semibold text-white">{u.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slatemute">{u.desc}</p>
                <ul className="mt-4 space-y-2 border-t border-hairline pt-4">
                  {u.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-xs text-slatemute">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-verify" aria-hidden /> {p}
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHead
            eyebrow="The common thread"
            title="Evidence, not assurances"
            sub="Whatever the industry, the output is the same: a sealed record proving what AI did, what humans approved, and which policy governed it. That's what auditors, regulators, and boards actually ask for."
          />
          <Reveal delay={0.1}>
            <AuditTimeline />
          </Reveal>
        </div>
        <Reveal className="mt-14 text-center" delay={0.1}>
          <PrimaryCTA to="/demo">Discuss your use case</PrimaryCTA>
        </Reveal>
      </Section>
    </>
  )
}
