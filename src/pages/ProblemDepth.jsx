import { Link } from 'react-router-dom'
import { Home, ArrowRight, ArrowLeft, ShieldAlert, Gauge, Lock, Check } from 'lucide-react'
import { Section, Reveal, GlowCard, PilotCTA, DemoCTA } from '../components/ui/Primitives.jsx'

/* In-depth article for "The Problem". One page holds all three problems.
   Reachable from the home Problem cards and from a Use Cases subsection —
   intentionally NOT in the top navigation. */

const PROBLEMS = [
  {
    id: 'accountability',
    icon: ShieldAlert,
    color: '#FB7185',
    eyebrow: 'Problem 01',
    title: 'Actions without accountability',
    lede: 'Agents have crossed from suggesting to executing — and execution is where liability begins.',
    body: [
      'For years, AI sat behind a human. It drafted, recommended, and predicted, but a person clicked the button. Agentic systems remove that person: they now issue refunds, move funds, change customer records, revoke access, and trigger downstream systems on their own.',
      'The instant an action touches the real world it becomes accountable — to a customer, a regulator, or a court. Yet most agent stacks have no layer between the decision and execution. There is no checkpoint that can say “this one needs a human,” and no record that can later explain who, or what, authorised it.',
      'The failure mode is rarely dramatic. It is a single over-broad action — a bulk update applied to the wrong segment, a deletion run at scale, a payment to an unverified account — that becomes a reportable event because nothing stopped it and nothing recorded it.',
    ],
    points: [
      'Agents act directly on money, records, and customers.',
      'No enforced checkpoint between an agent’s decision and execution.',
      'No attributable record of who or what approved each action.',
    ],
    crelis:
      'Crelis sits in front of execution. Every action is evaluated against policy before it runs, high-risk actions are routed to a verified human, and the decision — allow, review, or block — is sealed in a tamper-evident record.',
  },
  {
    id: 'confidence',
    icon: Gauge,
    color: '#FBBF24',
    eyebrow: 'Problem 02',
    title: 'Confidence is not certainty',
    lede: 'A model acts with the same authority at 99% confidence and at 60%.',
    body: [
      'Models emit a confidence score, but they act with identical authority whether that score is high or low. A 60%-confident decision to wire a large sum executes exactly like a 99%-confident password reset. The system has no notion of stakes.',
      'Risk is not just probability — it is probability multiplied by consequence. A confident action on a trivial task is safe; a slightly-less-confident action on an irreversible, high-value, or regulated task is not. Nothing in a raw model pipeline weighs that consequence or knows when to stop and ask.',
      'The result is a flat risk surface: every action is treated as equally safe to automate. The rare, expensive mistakes hide inside the long tail of low-certainty, high-stakes decisions that never should have run unattended.',
    ],
    points: [
      'Confidence scores don’t map to real-world consequence.',
      'High-stakes, low-certainty actions execute like routine ones.',
      'No threshold that escalates when the cost of being wrong is high.',
    ],
    crelis:
      'Crelis scores each action on confidence and risk together, against your thresholds. When stakes rise or certainty drops, the action is held and routed for human sign-off instead of executing blindly.',
  },
  {
    id: 'compliance',
    icon: Lock,
    color: '#22D3EE',
    eyebrow: 'Problem 03',
    title: 'Compliance can’t see inside',
    lede: 'Risk and audit teams are asked to approve AI programs they cannot inspect.',
    body: [
      'Compliance, risk, and audit functions are accountable for AI behaviour, yet the systems they must sign off on are opaque. They cannot inspect why an action was allowed, replay how a decision was reached, or attribute an outcome to a specific policy and approver.',
      'Under frameworks like the EU AI Act, MAS guidelines, and internal model-risk policies, “the model decided” is not a defensible answer. Auditors ask for evidence: what was requested, what governed it, what the risk was, who approved it, and proof the record hasn’t been altered.',
      'Without that evidence trail, governance becomes a matter of trust rather than proof — and trust does not survive an audit, an incident review, or a regulator’s request for the decision history.',
    ],
    points: [
      'No way to inspect, replay, or attribute AI decisions.',
      '“The model decided” fails EU AI Act / MAS / model-risk scrutiny.',
      'Governance rests on assurances instead of evidence.',
    ],
    crelis:
      'Crelis is the system of record for AI behaviour. Every decision — its inputs, the policy that governed it, the risk score, and the human who approved it — is written to a hash-chained, tamper-evident audit trail your compliance team can hand to a regulator.',
  },
]

function HomeBar() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link
        to="/"
        className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-hairline bg-panel/70 px-4 text-sm font-medium text-white backdrop-blur transition hover:border-electric/40 hover:bg-panel"
      >
        <Home className="h-4 w-4" aria-hidden /> Home
      </Link>
      <Link
        to="/use-cases"
        className="inline-flex min-h-[44px] items-center gap-2 rounded-lg px-3 text-sm text-slatemute transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> Back to Use Cases
      </Link>
    </div>
  )
}

export default function ProblemDepth() {
  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden pt-28 sm:pt-36 pb-10">
        <div className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:42px_42px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" aria-hidden />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-block/10 blur-[130px]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <HomeBar />
          </Reveal>
          <Reveal className="mt-8 max-w-3xl" delay={0.05}>
            <p className="eyebrow mb-3">The problem · in depth</p>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">
              AI agents are powerful. Ungoverned, they’re a liability.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slatemute sm:text-lg">
              Agentic AI is crossing from suggesting to executing. Most enterprises have no layer
              between an agent’s decision and the real world — and no way to prove what happened
              afterward. Three structural gaps make ungoverned agents a liability.
            </p>
          </Reveal>
        </div>
      </section>

      {/* problems */}
      {PROBLEMS.map((p, idx) => {
        const Icon = p.icon
        return (
          <Section key={p.id} bordered={idx !== 0}>
            <div id={p.id} className="scroll-mt-28 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
              <Reveal>
                <p className="telemetry" style={{ color: p.color }}>{p.eyebrow}</p>
                <span
                  className="mt-4 inline-grid h-12 w-12 place-items-center rounded-2xl border bg-panel/70"
                  style={{ borderColor: `${p.color}55`, boxShadow: `0 0 26px -8px ${p.color}` }}
                >
                  <Icon className="h-6 w-6" style={{ color: p.color }} aria-hidden />
                </span>
                <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {p.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-slatemute">{p.lede}</p>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="space-y-4">
                  {p.body.map((para, i) => (
                    <p key={i} className="text-sm leading-relaxed text-slatemute sm:text-base">{para}</p>
                  ))}
                </div>
                <ul className="mt-6 grid gap-2.5">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm text-white/90">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.color }} aria-hidden />
                      {pt}
                    </li>
                  ))}
                </ul>
                <GlowCard className="mt-6 border-electric/20">
                  <p className="eyebrow mb-2">How Crelis closes it</p>
                  <p className="flex items-start gap-2.5 text-sm leading-relaxed text-slatemute">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-verify" aria-hidden /> {p.crelis}
                  </p>
                </GlowCard>
              </Reveal>
            </div>
          </Section>
        )
      })}

      {/* closing CTA + home */}
      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-electric/30 bg-gradient-to-br from-panel2 via-panel to-ink p-10 text-center sm:p-14">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[560px] -translate-x-1/2 rounded-full bg-electric/20 blur-[100px]" aria-hidden />
            <h2 className="relative font-display text-2xl font-semibold tracking-tight text-gradient sm:text-3xl">
              This is the gap Crelis governs
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-slatemute">
              A trust plane between AI and the real world — detecting intent, applying policy,
              routing risk, and proving every decision.
            </p>
            <div className="relative mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
              <PilotCTA />
              <DemoCTA />
            </div>
            <div className="relative mt-8 flex justify-center">
              <HomeBar />
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
