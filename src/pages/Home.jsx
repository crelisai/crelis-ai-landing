import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ShieldAlert, ShieldCheck, GitBranch, Gauge, UserCheck, ScrollText, Lock, ArrowRight, ExternalLink, Network } from 'lucide-react'
import { Section, SectionHead, Reveal, GlowCard, PilotCTA, DemoCTA, STATE } from '../components/ui/Primitives.jsx'
import ControlPlane from '../components/visuals/ControlPlane.jsx'
import TrustEngine from '../components/visuals/TrustEngine.jsx'
import TrustFlowOrbit from '../components/visuals/TrustFlowOrbit.jsx'
import DecisionPipeline from '../components/visuals/DecisionPipeline.jsx'
import GovernanceSignals from '../components/visuals/GovernanceSignals.jsx'
import ProductPreviews from '../components/visuals/ProductPreviews.jsx'
import CursorGlow from '../components/effects/CursorGlow.jsx'
import { MarketplaceDashboard } from '../components/visuals/Dashboards.jsx'
import { USE_CASES } from '../data/mock.js'

/* ── Hero atmosphere — grid, aurora, flowing lines, drifting particles ───── */
const PARTICLES = [
  { left: '6%', top: '68%', size: 3, delay: 0, dur: 9 },
  { left: '14%', top: '34%', size: 2, delay: 1.4, dur: 12 },
  { left: '22%', top: '78%', size: 2, delay: 3.1, dur: 10 },
  { left: '31%', top: '24%', size: 2, delay: 5.0, dur: 11 },
  { left: '44%', top: '82%', size: 3, delay: 2.2, dur: 9 },
  { left: '55%', top: '30%', size: 2, delay: 6.3, dur: 13 },
  { left: '63%', top: '72%', size: 2, delay: 0.8, dur: 10 },
  { left: '72%', top: '20%', size: 3, delay: 4.4, dur: 12 },
  { left: '81%', top: '64%', size: 2, delay: 7.2, dur: 9 },
  { left: '90%', top: '38%', size: 2, delay: 2.9, dur: 11 },
  { left: '95%', top: '76%', size: 3, delay: 5.7, dur: 10 },
]

function Atmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {/* grid */}
      <div className="absolute inset-0 bg-grid-faint [background-size:42px_42px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,black,transparent)]" />
      {/* aurora glows */}
      <div className="absolute -top-40 left-1/2 h-[480px] w-[760px] -translate-x-1/2 rounded-full bg-electric/15 blur-[120px]" />
      <div className="absolute top-20 right-[-120px] h-[320px] w-[420px] rounded-full bg-cyan/10 blur-[110px]" />
      {/* flowing lines */}
      <svg viewBox="0 0 1440 600" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-30">
        <defs>
          <linearGradient id="hero-flow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#3D7BFF" stopOpacity="0" />
            <stop offset="0.5" stopColor="#3D7BFF" stopOpacity="0.6" />
            <stop offset="1" stopColor="#22D3EE" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M -60 430 C 320 330 760 520 1500 380" fill="none" stroke="url(#hero-flow)" strokeWidth="1" strokeDasharray="5 9" className="animate-dash" />
        <path d="M -60 510 C 420 440 900 580 1500 460" fill="none" stroke="url(#hero-flow)" strokeWidth="1" strokeDasharray="4 10" className="animate-dash" style={{ animationDuration: '1.8s' }} />
        <path d="M -60 340 C 360 260 980 420 1500 300" fill="none" stroke="url(#hero-flow)" strokeWidth="1" strokeDasharray="3 11" className="animate-dash" style={{ animationDuration: '2.4s' }} />
      </svg>
      {/* drifting particles */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className={`absolute rounded-full animate-drift ${i % 3 === 0 ? 'bg-cyan/70' : 'bg-electric/70'}`}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ── HERO ──────────────────────────────────────────────────────────────── */
function Hero() {
  const reduce = useReducedMotion()
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 pb-16 sm:pb-20">
      <Atmosphere />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* MVP / Pilot-stage credibility banner */}
        <Reveal className="mb-10">
          <div className="flex flex-col items-start gap-3 rounded-2xl border border-electric/25 bg-electric/[0.07] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-start gap-3 text-sm leading-relaxed text-slatemute">
              <span className="mt-0.5 shrink-0 rounded-md border border-electric/40 bg-electric/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-electric">
                MVP · Pilot stage
              </span>
              <span>
                Crelis is currently in prototype stage and accepting pilot design partners for
                runtime authorization of AI agent actions — allow, approve, escalate, or block.
              </span>
            </p>
            <Link to="/demo" aria-label="Apply for Pilot Access" className="shrink-0 whitespace-nowrap text-sm font-semibold text-electric transition-colors hover:text-white">
              Apply for Pilot Access →
            </Link>
          </div>
        </Reveal>

        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-4 py-1.5"
            >
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden /> Runtime Authorization for AI Agents
            </motion.p>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="mt-6 font-display text-4xl font-semibold tracking-tight text-white sm:text-6xl"
            >
              Every AI agent can execute work. Crelis decides whether it{' '}
              <span className="bg-gradient-to-r from-electric via-cyan to-electric bg-clip-text text-transparent">
                should
              </span>
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slatemute sm:text-lg lg:mx-0"
            >
              The independent, deterministic authorization layer that sits in front of AI agent
              actions — allow, require human approval, escalate, or block — in real time, across
              any model or vendor, with tamper-evident proof.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start"
            >
              <PilotCTA />
              <DemoCTA />
            </motion.div>

            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.32 }}
              className="mt-6 telemetry"
            >
              Built for banks · insurers · government · regulated enterprises
            </motion.p>

            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 font-mono text-xs tracking-wide text-slatemute"
            >
              Everyone guards what AI says · Crelis governs what it does
            </motion.p>
          </div>

          <Reveal delay={0.2}>
            <TrustFlowOrbit />
          </Reveal>
        </div>

        {/* signature visual — live enterprise control plane */}
        <Reveal className="mt-16" delay={0.15}>
          <ControlPlane />
        </Reveal>
      </div>
    </section>
  )
}

/* ── TRUST PIPELINE ────────────────────────────────────────────────────── */
function Pipeline() {
  return (
    <Section id="how">
      <SectionHead
        eyebrow="Inside the trust engine"
        title="Every action earns its execution"
        sub="Each AI action moves through five steps in milliseconds — received, trust-scored, checked against policy, risk-classified, then routed to AI or to a human."
      />
      <Reveal className="mt-12">
        <DecisionPipeline />
      </Reveal>
    </Section>
  )
}

/* ── PROBLEM ───────────────────────────────────────────────────────────── */
const PROBLEMS = [
  { id: 'accountability', icon: ShieldAlert, title: 'Actions without accountability', desc: 'Agents now move money, change records, and touch customers directly. One ungoverned action — a wrong refund, an over-shared record, a deletion at scale — can become a regulatory event, with no one able to say why it happened.' },
  { id: 'confidence', icon: Gauge, title: 'Confidence is not certainty', desc: 'A model acts with the same authority at 99% confidence and at 60%. Nothing in the stack weighs the stakes or tells it when an action is too consequential to take alone.' },
  { id: 'compliance', icon: Lock, title: 'Compliance can’t see inside', desc: 'Risk and audit teams must sign off on AI they cannot inspect, replay, or attribute decisions to. Without an evidence trail, “trust us” is the only assurance — and it doesn’t pass an audit.' },
]

function Problem() {
  return (
    <Section id="problem">
      <SectionHead
        eyebrow="The problem"
        title="AI agents are powerful. Ungoverned, they're a liability."
        sub="Agentic AI is crossing from suggesting to executing. Most enterprises have no layer between an agent's decision and the real world — and no way to prove what happened after the fact."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {PROBLEMS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1}>
            <Link to="/use-cases/problem" aria-label={`${p.title} — read the full breakdown`} className="group block h-full">
              <GlowCard className="flex h-full flex-col">
                <p.icon className="h-6 w-6 text-block" aria-hidden />
                <h3 className="mt-4 font-display text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slatemute">{p.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-electric transition-colors group-hover:text-white">
                  Read the full breakdown
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </GlowCard>
            </Link>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-8" delay={0.1}>
        <Link to="/use-cases/problem" className="inline-flex items-center gap-1.5 text-sm text-electric transition-colors hover:text-white">
          Read the in-depth breakdown of all three <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </Reveal>
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

/* ── LIVE GOVERNANCE ───────────────────────────────────────────────────── */
function Governance() {
  return (
    <Section id="governance">
      <SectionHead
        eyebrow="Live governance"
        title="Proof, not promises"
        sub="Crelis is the system of record for AI behavior. These are the numbers your risk team asks for — evaluated continuously, verified cryptographically."
      />
      <GovernanceSignals className="mt-12" />
    </Section>
  )
}

/* ── PRODUCT PREVIEW ───────────────────────────────────────────────────── */
function Product() {
  return (
    <Section id="product">
      <SectionHead
        eyebrow="The platform"
        title="Four surfaces. One control plane."
        sub="Everything your governance, risk, and engineering teams need to run AI in production — built on the same decision spine."
      />
      <ProductPreviews className="mt-12" />
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
            Put a trust plane between AI and the real world
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-slatemute">
            See how Crelis detects, decides, and proves every AI action — live, in your browser.
          </p>
          <div className="relative mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
            <PilotCTA />
            <DemoCTA />
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

export default function Home() {
  return (
    <>
      <CursorGlow />
      <Hero />
      <Pipeline />
      <Problem />
      <Solution />
      <Governance />
      <Product />
      <Marketplace />
      <UseCasesTeaser />
      <FinalCTA />
    </>
  )
}
