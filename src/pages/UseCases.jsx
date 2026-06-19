import { Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'
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
        <Reveal>
          <Link
            to="/use-cases/problem"
            className="group relative block overflow-hidden rounded-3xl border border-electric/25 bg-gradient-to-br from-panel2 via-panel to-ink p-8 transition hover:border-electric/40 sm:p-10"
          >
            <div className="pointer-events-none absolute -top-20 right-0 h-56 w-72 rounded-full bg-electric/10 blur-[100px]" aria-hidden />
            <p className="eyebrow mb-3">Why this matters · the problem</p>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              The problem Crelis governs
            </h2>
            <p className="mt-3 max-w-2xl text-slatemute leading-relaxed">
              Ungoverned agents create three structural gaps — accountability, certainty, and
              compliance visibility. Read the in-depth breakdown of each.
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-electric transition-colors group-hover:text-white">
              Read the full problem breakdown
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
          </Link>
        </Reveal>
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
