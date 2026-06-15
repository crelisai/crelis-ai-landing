import { useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Inbox, Gauge, Scale, AlertTriangle, GitBranch, Check } from 'lucide-react'
import { useLive, useInterval } from './Console.jsx'
import { STATE } from '../ui/Primitives.jsx'

/* ============================================================================
   DECISION PIPELINE — five readable steps with an animated progress fill and
   small status badges. Cycles while on-screen; static (all complete) under
   prefers-reduced-motion or off-screen. CSS transitions for the fills, so it
   never blocks the main thread.
   ========================================================================= */

const STEPS = [
  { id: 'received',  label: 'Request Received',     icon: Inbox,         state: 'ai',     result: 'received' },
  { id: 'score',     label: 'Trust Score Calculated', icon: Gauge,       state: 'ai',     result: 'trust 88' },
  { id: 'policy',    label: 'Policy Checked',        icon: Scale,         state: 'ai',     result: 'WIRE-HIGH' },
  { id: 'risk',      label: 'Risk Classified',       icon: AlertTriangle, state: 'review', result: 'risk 91 · high' },
  { id: 'route',     label: 'Routed to AI or Human', icon: GitBranch,     state: 'review', result: '→ human review' },
]

function Badge({ step, status }) {
  if (status === 'pending') {
    return <span className="rounded-md border border-hairline bg-panel px-2 py-0.5 font-mono text-[10px] text-slatemute">pending</span>
  }
  const s = STATE[step.state]
  const active = status === 'active'
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[10px] ${s.text} ${s.ring} ${s.soft} ${active ? 'animate-pulse' : ''}`}
    >
      {status === 'done' && <Check className="h-3 w-3" aria-hidden />}
      {step.result}
    </span>
  )
}

export default function DecisionPipeline({ className = '' }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const live = useLive(ref)
  const running = live && !reduce
  const [active, setActive] = useState(0)
  useInterval(() => setActive((a) => (a + 1) % STEPS.length), 1300, running)

  // When static, present every step as complete.
  const idx = running ? active : STEPS.length - 1
  const statusOf = (i) => (running ? (i < active ? 'done' : i === active ? 'active' : 'pending') : 'done')
  const pct = (idx / (STEPS.length - 1)) * 100

  return (
    <div ref={ref} className={`glass overflow-hidden ${className}`}>
      <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5 sm:px-5">
        <p className="telemetry flex items-center gap-2">
          <GitBranch className="h-3.5 w-3.5 text-electric" aria-hidden /> Decision pipeline
        </p>
        <p className="font-mono text-[10px] text-slatemute">
          step <span className="text-white">{idx + 1}</span>/5
        </p>
      </div>

      {/* DESKTOP — 3D decision pane */}
      <div className="relative hidden px-6 py-10 sm:block" style={{ perspective: '1200px' }}>
        {/* receding floor grid (the "control room" depth) */}
        <div className="pointer-events-none absolute inset-x-6 bottom-3 h-28 opacity-40 [mask-image:linear-gradient(to_top,black,transparent)]" aria-hidden>
          <div className="h-full w-full bg-grid-faint [background-size:30px_30px]" style={{ transform: 'perspective(420px) rotateX(60deg)', transformOrigin: 'bottom' }} />
        </div>

        <div className="relative preserve-3d" style={{ transform: 'rotateX(7deg)' }}>
          {/* glowing progress beam */}
          <div className="absolute left-[6%] right-[6%] top-9 h-[3px] rounded-full bg-hairline" aria-hidden />
          <div
            className="absolute left-[6%] top-9 h-[3px] rounded-full bg-gradient-to-r from-electric to-cyan"
            style={{ width: `calc(${pct}% * 0.88)`, boxShadow: '0 0 12px 1px rgba(61,123,255,0.6)', transition: 'width .6s cubic-bezier(.16,1,.3,1)' }}
            aria-hidden
          />
          <ol className="relative grid grid-cols-5 gap-3">
            {STEPS.map((s, i) => {
              const status = statusOf(i)
              const Icon = s.icon
              const sc = STATE[s.state]
              const lit = status !== 'pending'
              const isActive = status === 'active'
              return (
                <li
                  key={s.id}
                  className="preserve-3d"
                  style={{ transform: isActive ? 'translateZ(34px)' : 'translateZ(0)', transition: 'transform .5s cubic-bezier(.16,1,.3,1)' }}
                >
                  <div
                    className="flex h-full flex-col items-center rounded-2xl border bg-panel/50 px-2 py-4 text-center transition duration-300"
                    style={{
                      borderColor: lit ? `${sc.hex}66` : 'rgba(255,255,255,0.08)',
                      boxShadow: isActive ? `0 18px 40px -18px ${sc.hex}, 0 0 0 1px ${sc.hex}55` : '0 14px 30px -24px rgba(0,0,0,0.9)',
                    }}
                  >
                    <span
                      className="grid h-11 w-11 place-items-center rounded-xl border bg-ink"
                      style={{ borderColor: lit ? sc.hex : 'rgba(255,255,255,0.12)', boxShadow: isActive ? `0 0 18px -2px ${sc.hex}` : 'none' }}
                    >
                      <Icon className="h-5 w-5" style={{ color: lit ? sc.hex : '#5C6679' }} aria-hidden />
                    </span>
                    <p className={`mt-3 font-display text-xs font-semibold ${lit ? 'text-white' : 'text-slatemute'}`}>{s.label}</p>
                    <span className="mt-2"><Badge step={s} status={status} /></span>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>

      {/* MOBILE — vertical */}
      <ol className="space-y-0 px-4 py-4 sm:hidden">
        {STEPS.map((s, i) => {
          const status = statusOf(i)
          const Icon = s.icon
          const sc = STATE[s.state]
          const lit = status !== 'pending'
          return (
            <li key={s.id} className="relative flex items-start gap-3 pb-4 last:pb-0">
              {i < STEPS.length - 1 && (
                <span className="absolute left-[19px] top-10 h-[calc(100%-16px)] w-px" style={{ background: lit ? `${sc.hex}55` : 'rgba(255,255,255,0.1)' }} aria-hidden />
              )}
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border bg-ink transition"
                style={{ borderColor: lit ? sc.hex : 'rgba(255,255,255,0.12)', boxShadow: status === 'active' ? `0 0 14px -2px ${sc.hex}` : 'none' }}
              >
                <Icon className="h-4 w-4" style={{ color: lit ? sc.hex : '#5C6679' }} aria-hidden />
              </span>
              <div className="min-w-0 pt-1.5">
                <p className={`font-display text-sm font-semibold ${lit ? 'text-white' : 'text-slatemute'}`}>{s.label}</p>
                <span className="mt-1.5 inline-block"><Badge step={s} status={status} /></span>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
