import { useRef } from 'react'
import { GOVERNANCE_SIGNALS } from '../../data/mock.js'
import { STATE, StatusDot, Reveal, WindowFrame } from '../ui/Primitives.jsx'
import { Sparkline, useLive, useLiveCount, fmt, tnum } from './Console.jsx'

/* ============================================================================
   GOVERNANCE SIGNALS — four live proof-points the homepage leads with:
   policies evaluated · audit chain verified · false allows · human review.
   Numbers tick while on-screen (and motion is allowed); otherwise they hold
   at a meaningful static snapshot.
   ========================================================================= */

function SignalCard({ signal, live }) {
  const value = useLiveCount(signal.base, {
    step: signal.step,
    jitter: signal.jitter,
    interval: signal.interval,
    active: live && signal.step > 0,
  })
  const tone = STATE[signal.tone || signal.state]
  return (
    <WindowFrame title={`signal://${signal.key}`} className="h-full transition duration-300 hover:-translate-y-1 hover:border-electric/30 hover:shadow-glow">
      <div className="relative p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="telemetry">{signal.label}</p>
          <StatusDot state={signal.state} pulse={live} />
        </div>
        <p className={`mt-4 text-3xl font-semibold ${tone.text} ${tnum}`}>{fmt(value)}</p>
        <p className="mt-1 font-mono text-[11px] text-slatemute">{signal.note}</p>
        <Sparkline data={signal.series} color={STATE[signal.state].hex} w={120} h={28} className="mt-4 w-full opacity-80" />
      </div>
    </WindowFrame>
  )
}

export default function GovernanceSignals({ className = '' }) {
  const ref = useRef(null)
  const live = useLive(ref)
  return (
    <div ref={ref} className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {GOVERNANCE_SIGNALS.map((s, i) => (
        <Reveal key={s.key} delay={i * 0.08} className="h-full">
          <SignalCard signal={s} live={live} />
        </Reveal>
      ))}
    </div>
  )
}
