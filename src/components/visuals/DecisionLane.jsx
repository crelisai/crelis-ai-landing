import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, UserCheck, Ban } from 'lucide-react'
import { DECISION_FEED } from '../../data/mock.js'
import { STATE } from '../ui/Primitives.jsx'
import { useLive, useInterval, useLiveCount, fmt, tnum } from './Console.jsx'

/* ============================================================================
   DECISION LANE — the signature live queue, styled as a real trust console
   (Stripe-Radar / Datadog live-tail vernacular, not a node map).
   Agent actions stream in, hold for a beat while the engine scores them,
   then receive their verdict: ALLOW (green) · REVIEW (amber) · BLOCK (rose).
   Self-gates on visibility + reduced-motion → static snapshot.
   ========================================================================= */

const DECISION = {
  allow: { state: 'verify', label: 'Allow', icon: ShieldCheck },
  review: { state: 'review', label: 'Review', icon: UserCheck },
  block: { state: 'block', label: 'Block', icon: Ban },
}

const riskColor = (r) => (r >= 60 ? '#FB7185' : r >= 30 ? '#FBBF24' : '#34D399')

function RiskMeter({ value }) {
  const color = riskColor(value)
  return (
    <span className="flex items-center gap-2" aria-label={`Risk score ${value} out of 100`}>
      <span className="h-1 w-12 overflow-hidden rounded-full bg-white/5">
        <span className="block h-full rounded-full" style={{ width: `${value}%`, background: color }} />
      </span>
      <span className={`w-6 text-right text-[10px] ${tnum}`} style={{ color }}>{value}</span>
    </span>
  )
}

function VerdictBadge({ decision, settled }) {
  if (!settled) {
    return (
      <span className="inline-flex animate-pulse items-center justify-center rounded-md border border-hairline bg-panel2/60 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-slatemute">
        scoring
      </span>
    )
  }
  const d = DECISION[decision]
  const Icon = d.icon
  return (
    <span className={`inline-flex items-center justify-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[9px] uppercase tracking-wider ${STATE[d.state].ring} ${STATE[d.state].soft} ${STATE[d.state].text}`}>
      <Icon className="h-3 w-3" aria-hidden /> {d.label}
    </span>
  )
}

function FeedRow({ row }) {
  const d = DECISION[row.decision]
  return (
    <motion.li
      layout="position"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-3 border-b border-hairline px-4 py-2.5 last:border-b-0 sm:px-5"
    >
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300"
        style={{ background: row.settled ? STATE[d.state].hex : '#93A3BC' }}
        aria-hidden
      />
      <span className={`hidden w-[4.2rem] shrink-0 text-[10px] text-slatemute md:block ${tnum}`}>{row.time}</span>
      <span className="hidden w-28 shrink-0 truncate font-mono text-[10px] text-slatemute sm:block">{row.agent}</span>
      <span className="min-w-0 flex-1 truncate text-xs text-white/90">{row.action}</span>
      <span className="hidden shrink-0 rounded border border-hairline bg-panel2/60 px-1.5 py-0.5 font-mono text-[9px] text-slatemute lg:block">
        {row.policy}
      </span>
      <span className="hidden shrink-0 sm:block"><RiskMeter value={row.risk} /></span>
      <span className="w-[4.8rem] shrink-0 text-right">
        <VerdictBadge decision={row.decision} settled={row.settled} />
      </span>
    </motion.li>
  )
}

const VISIBLE = 5

export default function DecisionLane({ className = '' }) {
  const ref = useRef(null)
  const live = useLive(ref)
  const poolIdx = useRef(VISIBLE % DECISION_FEED.length)
  const seq = useRef(0)
  const [rows, setRows] = useState(() =>
    DECISION_FEED.slice(0, VISIBLE).map((e, i) => ({
      ...e,
      key: `init-${i}`,
      time: `14:02:${String(11 + i).padStart(2, '0')}Z`,
      settled: true,
    })),
  )
  const actions = useLiveCount(48212, { step: 6, jitter: 4, interval: 1000, active: live })

  useInterval(() => {
    const entry = DECISION_FEED[poolIdx.current]
    poolIdx.current = (poolIdx.current + 1) % DECISION_FEED.length
    const key = `r-${seq.current++}`
    const time = new Date().toISOString().slice(11, 19) + 'Z'
    setRows((rs) => [{ ...entry, key, time, settled: false }, ...rs].slice(0, VISIBLE))
    // verdict lands after the engine "scores" the action
    setTimeout(() => {
      setRows((rs) => rs.map((r) => (r.key === key ? { ...r, settled: true } : r)))
    }, 800)
  }, 2400, live)

  return (
    <div ref={ref} className={`glass relative overflow-hidden ${className}`}>
      {/* header */}
      <div className="flex items-center justify-between gap-3 border-b border-electric/25 bg-gradient-to-r from-electric/[0.14] via-transparent to-cyan/[0.07] px-4 py-2.5 sm:px-5">
        <p className="telemetry flex items-center gap-2 text-white/90">
          <span className={`relative inline-flex h-2 w-2 ${live ? '' : 'opacity-60'}`}>
            {live && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-60" />}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-electric" />
          </span>
          Decision lane · live
        </p>
        <p className="hidden items-center gap-4 font-mono text-[10px] text-slatemute sm:flex">
          <span className="flex items-center gap-1.5"><i className="inline-block h-1.5 w-1.5 rounded-full bg-verify" /> allow</span>
          <span className="flex items-center gap-1.5"><i className="inline-block h-1.5 w-1.5 rounded-full bg-review" /> review</span>
          <span className="flex items-center gap-1.5"><i className="inline-block h-1.5 w-1.5 rounded-full bg-block" /> block</span>
        </p>
      </div>

      {/* column legend */}
      <div className="hidden items-center gap-3 border-b border-hairline bg-panel2/30 px-4 py-1.5 sm:flex sm:px-5" aria-hidden>
        <span className="w-1.5 shrink-0" />
        <span className="hidden w-[4.2rem] shrink-0 font-mono text-[9px] uppercase tracking-wider text-slatemute/70 md:block">time</span>
        <span className="w-28 shrink-0 font-mono text-[9px] uppercase tracking-wider text-slatemute/70">agent</span>
        <span className="flex-1 font-mono text-[9px] uppercase tracking-wider text-slatemute/70">action</span>
        <span className="hidden font-mono text-[9px] uppercase tracking-wider text-slatemute/70 lg:block">policy</span>
        <span className="w-20 font-mono text-[9px] uppercase tracking-wider text-slatemute/70">risk</span>
        <span className="w-[4.8rem] text-right font-mono text-[9px] uppercase tracking-wider text-slatemute/70">verdict</span>
      </div>

      {/* live queue */}
      <ul role="log" aria-live="off" aria-label="Live queue of AI agent actions and their trust verdicts">
        {rows.map((row) => <FeedRow key={row.key} row={row} />)}
      </ul>

      {/* live counter strip */}
      <div className="grid grid-cols-3 divide-x divide-hairline border-t border-hairline">
        <div className="px-4 py-3">
          <p className={`text-base font-semibold text-electric sm:text-lg ${tnum}`}>{fmt(actions)}</p>
          <p className="telemetry mt-0.5">actions today</p>
        </div>
        <div className="px-4 py-3">
          <p className={`text-base font-semibold text-verify sm:text-lg ${tnum}`}>94.6%</p>
          <p className="telemetry mt-0.5">auto-approved</p>
        </div>
        <div className="px-4 py-3">
          <p className={`text-base font-semibold text-review sm:text-lg ${tnum}`}>2,431</p>
          <p className="telemetry mt-0.5">in review</p>
        </div>
      </div>
    </div>
  )
}
