import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { BadgeCheck, Star } from 'lucide-react'
import { EXPERTS, GOVERNANCE } from '../../data/mock.js'
import { STATE, StatusDot, Reveal } from '../ui/Primitives.jsx'
import { Sparkline, useLive, useInterval, fmt, tnum } from './Console.jsx'

/* ── TRUST SCORE WIDGET (radial) ───────────────────────────────────────── */
export function TrustScore({ value, size = 56 }) {
  const r = (size - 8) / 2
  const c = 2 * Math.PI * r
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }} aria-label={`Trust score ${value} out of 100`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#34D399"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c * (1 - value / 100) }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <span className="absolute font-mono text-xs font-medium text-verify">{value}</span>
    </div>
  )
}

/* ── EXPERT CARD ───────────────────────────────────────────────────────── */
export function ExpertCard({ expert, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className="glass h-full p-5 transition hover:border-verify/30 hover:shadow-glow-green">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-electric/30 to-cyan/20 font-display text-sm font-semibold text-white">
              {expert.initials}
            </span>
            <div>
              <p className="flex items-center gap-1.5 font-display text-sm font-semibold text-white">
                {expert.name} <BadgeCheck className="h-3.5 w-3.5 text-electric" aria-label="Verified" />
              </p>
              <p className="text-xs text-slatemute">{expert.role}</p>
            </div>
          </div>
          <TrustScore value={expert.trust} size={48} />
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {expert.skills.map((s) => (
            <span key={s} className="rounded-md border border-hairline bg-panel2/60 px-2 py-1 font-mono text-[10px] text-slatemute">
              {s}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-hairline pt-3">
          <span className="flex items-center gap-1.5 text-xs text-slatemute">
            <Star className="h-3 w-3 text-review" aria-hidden /> {expert.reviews.toLocaleString()} reviews
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-slatemute">
            <StatusDot state={expert.status === 'online' ? 'verify' : 'review'} pulse={expert.status === 'online'} />
            {expert.status}
          </span>
        </div>
      </div>
    </Reveal>
  )
}

export function MarketplaceDashboard({ className = '' }) {
  return (
    <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {EXPERTS.map((e, i) => (
        <ExpertCard key={e.id} expert={e} delay={i * 0.08} />
      ))}
    </div>
  )
}

/* ── GOVERNANCE DASHBOARD (live) ────────────────────────────────────────── */
// One ticking metric tile with a trend sparkline.
function LiveStat({ stat, live }) {
  const cfg = stat.live
  const [val, setVal] = useState(cfg.base)
  useInterval(() => {
    setVal((v) => {
      if (cfg.kind === 'pct') {
        const next = cfg.base + (Math.random() - 0.5) * 2 * (cfg.drift || 0)
        return Math.round(next * 10) / 10
      }
      return v + (cfg.step || 0) + Math.round((Math.random() - 0.5) * 2 * (cfg.jitter || 0))
    })
  }, cfg.interval, live)

  const display = !live ? stat.value : cfg.kind === 'pct' ? `${val.toFixed(1)}%` : fmt(Math.round(val))
  const color = STATE[stat.state].hex
  return (
    <div className="flex flex-col justify-between gap-3 bg-panel/80 p-5">
      <div>
        <p className={`text-2xl font-semibold ${STATE[stat.state].text} ${tnum}`}>{display}</p>
        <p className="mt-1 text-xs text-slatemute">{stat.label}</p>
      </div>
      <Sparkline data={stat.series} color={color} w={96} h={26} className="w-full opacity-80" />
    </div>
  )
}

export function GovernanceDashboard({ className = '' }) {
  const ref = useRef(null)
  const live = useLive(ref)
  return (
    <div ref={ref} className={`glass overflow-hidden ${className}`}>
      <div className="flex items-center justify-between border-b border-hairline px-5 py-3">
        <p className="telemetry">Governance · today</p>
        <p className="flex items-center gap-2 font-mono text-[10px] text-slatemute">
          <StatusDot state="verify" pulse={live} /> all policies active
        </p>
      </div>
      <div className="grid grid-cols-2 gap-px bg-hairline lg:grid-cols-4">
        {GOVERNANCE.stats.map((s) => (
          <LiveStat key={s.key} stat={s} live={live} />
        ))}
      </div>
      <div className="border-t border-hairline p-5">
        <p className="telemetry mb-3">Open exceptions</p>
        <ul className="space-y-2">
          {GOVERNANCE.exceptions.map((x) => (
            <li key={x.id} className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-sm ${STATE[x.state].ring} ${STATE[x.state].soft}`}>
              <StatusDot state={x.state} pulse={live} />
              <span className="text-white/90">{x.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
