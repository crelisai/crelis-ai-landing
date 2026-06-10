import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ShieldAlert, GitBranch, Gauge, UserCheck, ScrollText, Lock, ArrowRight, Network } from 'lucide-react'
import { Section, SectionHead, Reveal, GlowCard, PrimaryCTA, GhostCTA, STATE } from '../components/ui/Primitives.jsx'
import DecisionLane from '../components/visuals/DecisionLane.jsx'
import TrustEngine from '../components/visuals/TrustEngine.jsx'
import { EscalationFlow } from '../components/visuals/Flows.jsx'
import { MarketplaceDashboard } from '../components/visuals/Dashboards.jsx'
import { USE_CASES } from '../data/mock.js'

/* ── HERO ──────────────────────────────────────────────────────────────── */
function Hero() {
  const reduce = useReducedMotion()
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36 pb-16 sm:pb-20">
      {/* atmosphere: grid + radial glow, pure CSS */}
      <div className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:42px_42px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" aria-hidden />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-electric/15 blur-[120px]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-4 py-1.5"
          >
            <Network className="h-3.5 w-3.5" aria-hidden /> Mission control for agentic AI
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-6xl text-gradient"
          >
            The Trust Layer for Agentic AI
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slatemute sm:text-lg"
          >
            Crelis helps enterprises deploy AI agents safely by routing uncertain, sensitive, or
            high-risk tasks to verified human experts — with approval flows, audit trails, and
            governance built in.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <PrimaryCTA to="/demo">Request demo</PrimaryCTA>
            <a
              href="https://demo.crelis.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-electric/40 bg-panel2/60 px-5 py-3 text-sm font-medium text-electric transition hover:border-electric hover:bg-electric/10"
            >
              Launch Interactive Demo
            </a>
          </motion.div>

          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 font-mono text-xs tracking-wide text-slatemute"
          >
            AI executes · Crelis governs · Humans intervene when trust matters
          </motion.p>
        </div>

        {/* signature visual */}
        <Reveal className="mt-14" delay={0.15}>
          <DecisionLane />
        </Reveal>
      </div>
    </section>
  )
}

/* ── PROBLEM ───────────────────────────────────────────────────────────── */
const PROBLEMS = [
  { icon: ShieldAlert, title: 'Actions without accountability', desc: 'Agents now move money, change records, and touch customers. One ungoverned action can become a regulatory event.' },
  { icon: Gauge, title: 'Confidence is not certainty', desc: 'Models act with the same authority at 99% confidence and at 60%. Nothing in the stack tells them when to stop.' },
  { icon: Lock, title: 'Compliance can\u2019t see inside', desc: 'Risk and audit teams are asked to approve AI programs they cannot inspect, replay, or attribute decisions to.' },
]

function Problem() {
  return (
    <Section id="problem">
      <SectionHead
        eyebrow="The problem"
        title="AI agents are powerful. Ungoverned, they're a liability."
        sub="Agentic AI is crossing from suggesting to executing. Most enterprises have no layer between an agent's decision and the real world."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {PROBLEMS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1}>
            <GlowCard className="h-full">
              <p.icon className="h-6 w-6 text-block" aria-hidden />
              <h3 className="mt-4 font-display text-lg font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slatemute">{p.desc}</p>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ── SOLUTION ──────────────────────────────────────────────────────────── */
const PILLARS = [
  { icon: GitBranch, state: 'ai', title: 'Route', desc: 'Every agent action passes through Crelis before touching your systems.' },
  { icon: Gauge, state: 'ai', title: 'Score', desc: 'The trust engine scores confidence and risk against your policies.' },
  { icon: UserCheck, state: 'review', title: 'Approve', desc: 'High-risk tasks detour to verified human experts for sign-off.' },
  { icon: ScrollText, state: 'verify', title: 'Audit', desc: 'Every decision is sealed in a tamper-evident execution record.' },
]

function Solution() {
  return (
    <Section id="solution">
      <SectionHead
        eyebrow="The solution"
        title="Crelis sits between AI and execution"
        sub="A control plane that decides — per action, in real time — whether AI proceeds, a human reviews, or execution stops."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <GlowCard className="h-full">
              <span className={`inline-grid h-10 w-10 place-items-center rounded-xl border ${STATE[p.state].ring} ${STATE[p.state].soft}`}>
                <p.icon className={`h-5 w-5 ${STATE[p.state].text}`} aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slatemute">{p.desc}</p>
            </GlowCard>
          </Reveal>
        ))}
      </div>

      {/* live trust engine demo */}
      <Reveal className="mt-12" delay={0.1}>
        <TrustEngine />
      </Reveal>
    </Section>
  )
}

/* ── HOW IT WORKS ──────────────────────────────────────────────────────── */
function HowItWorks() {
  return (
    <Section id="how">
      <SectionHead
        eyebrow="How it works"
        title="Task → score → human if needed → verified output"
        sub="One path for every action. Safe tasks flow through at machine speed; sensitive ones earn a human checkpoint — and everything lands in the audit trail."
      />
      <Reveal className="mt-12">
        <EscalationFlow />
      </Reveal>
    </Section>
  )
}

/* ── MARKETPLACE TEASER ────────────────────────────────────────────────── */
function Marketplace() {
  return (
    <Section id="marketplace">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHead
          eyebrow="Human workforce"
          title="A marketplace of verified experts, on standby"
          sub="When AI confidence drops or stakes rise, Crelis routes the task to credentialed reviewers with live availability and earned trust scores."
        />
        <Reveal delay={0.1}>
          <Link to="/marketplace" className="inline-flex items-center gap-1.5 text-sm text-electric hover:text-white transition-colors">
            Explore the marketplace <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
      <div className="mt-12">
        <MarketplaceDashboard />
      </div>
    </Section>
  )
}

/* ── USE CASES TEASER ──────────────────────────────────────────────────── */
function UseCasesTeaser() {
  const featured = USE_CASES.slice(0, 3)
  return (
    <Section id="use-cases">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHead
          eyebrow="Enterprise use cases"
          title="Wherever AI touches something that matters"
          sub="Crelis runs the same trust loop across finance, healthcare, legal, support, and infrastructure."
        />
        <Reveal delay={0.1}>
          <Link to="/use-cases" className="inline-flex items-center gap-1.5 text-sm text-electric hover:text-white transition-colors">
            All use cases <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {featured.map((u, i) => (
          <Reveal key={u.id} delay={i * 0.1}>
            <GlowCard className="h-full">
              <p className="telemetry">{u.tag}</p>
              <h3 className="mt-3 font-display text-lg font-semibold text-white">{u.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slatemute">{u.desc}</p>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ── FINAL CTA ─────────────────────────────────────────────────────────── */
function FinalCTA() {
  return (
    <Section id="cta">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-electric/30 bg-gradient-to-br from-panel2 via-panel to-ink p-10 text-center sm:p-16">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[560px] -translate-x-1/2 rounded-full bg-electric/20 blur-[100px]" aria-hidden />
          <h2 className="relative font-display text-3xl font-semibold tracking-tight text-gradient sm:text-4xl">
            Deploy AI without losing control
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-slatemute">
            Join the pilot program and put a trust layer between your agents and the real world.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PrimaryCTA to="/demo">Request demo</PrimaryCTA>
            <a
              href="https://demo.crelis.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-electric/40 bg-panel2/60 px-5 py-3 text-sm font-medium text-electric transition hover:border-electric hover:bg-electric/10"
            >
              Launch Interactive Demo
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Marketplace />
      <UseCasesTeaser />
      <FinalCTA />
    </>
  )
}
