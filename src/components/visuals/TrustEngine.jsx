import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, UserCheck, Ban, CircleCheck } from 'lucide-react'
import { SAMPLE_TASKS } from '../../data/mock.js'
import { STATE } from '../ui/Primitives.jsx'
import { AgentGlyph, useLive, useInterval } from './Console.jsx'

/* ============================================================================
   TRUST ENGINE — interactive demo.
   User selects a task; gauges animate to its confidence/risk; the routing
   decision (auto / review / block) renders with explanation.
   ========================================================================= */

const DECISION = {
  auto: { state: 'verify', icon: CircleCheck, label: 'Auto-approved', verb: 'Proceeds without intervention' },
  review: { state: 'review', icon: UserCheck, label: 'Human review', verb: 'Routed to a verified expert' },
  block: { state: 'block', icon: Ban, label: 'Blocked', verb: 'Held until policy owner acts' },
}

function Gauge({ label, value, color }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="telemetry">{label}</span>
        <span className="font-mono text-lg font-medium" style={{ color }}>{value}</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={false}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

export default function TrustEngine({ className = '' }) {
  const ref = useRef(null)
  const live = useLive(ref)
  const [task, setTask] = useState(SAMPLE_TASKS[1])
  const [paused, setPaused] = useState(false)
  const d = DECISION[task.decision]
  const Icon = d.icon

  // Auto-cycle through tasks while live; pauses on hover/focus.
  useInterval(() => {
    setTask((cur) => {
      const i = SAMPLE_TASKS.findIndex((t) => t.id === cur.id)
      return SAMPLE_TASKS[(i + 1) % SAMPLE_TASKS.length]
    })
  }, 2800, live && !paused)

  return (
    <div
      ref={ref}
      className={`glass overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="flex items-center justify-between border-b border-hairline px-5 py-3">
        <p className="telemetry flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-electric" aria-hidden /> Trust engine · {live && !paused ? 'live' : 'interactive'}
        </p>
        <p className="font-mono text-[10px] text-slatemute">{live && !paused ? 'auto-cycling' : 'mock data'}</p>
      </div>

      <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
        {/* Task selector */}
        <div className="border-b border-hairline p-5 md:border-b-0 md:border-r">
          <p className="telemetry mb-3">Incoming agent task — select one</p>
          <div className="space-y-2" role="group" aria-label="Sample tasks">
            {SAMPLE_TASKS.map((t) => {
              const active = t.id === task.id
              return (
                <button
                  key={t.id}
                  onClick={() => setTask(t)}
                  aria-pressed={active}
                  className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left text-sm transition ${
                    active
                      ? 'border-electric/50 bg-electric/10 text-white'
                      : 'border-hairline bg-panel2/40 text-slatemute hover:border-electric/30 hover:text-white'
                  }`}
                >
                  <AgentGlyph className={`h-4 w-4 shrink-0 ${active ? 'text-electric' : 'text-slatemute'}`} />
                  <span className="flex-1">{t.label}</span>
                  <span className="hidden font-mono text-[10px] text-slatemute sm:block">{t.agent}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Scoring + decision */}
        <div className="p-5">
          <div className="space-y-5">
            <Gauge label="AI confidence" value={task.confidence} color="#22D3EE" />
            <Gauge label="Risk score" value={task.risk} color={task.risk > 60 ? '#FB7185' : '#34D399'} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className={`mt-6 rounded-xl border p-4 ${STATE[d.state].ring} ${STATE[d.state].soft}`}
            >
              <p className={`flex items-center gap-2 font-display text-sm font-semibold ${STATE[d.state].text}`}>
                <Icon className="h-4 w-4" aria-hidden /> {d.label}
              </p>
              <p className="mt-1 text-xs text-slatemute">{d.verb}.</p>
              <p className="mt-3 border-t border-white/5 pt-3 font-mono text-[11px] leading-relaxed text-slatemute">
                {task.reason}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
