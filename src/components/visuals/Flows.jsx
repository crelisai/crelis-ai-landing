import { motion } from 'framer-motion'
import { Bot, Gauge, UserCheck, FileSignature, Play, ScrollText } from 'lucide-react'
import { ESCALATION_STAGES, AUDIT_EVENTS } from '../../data/mock.js'
import { STATE, Reveal } from '../ui/Primitives.jsx'

const STAGE_ICONS = { task: Bot, score: Gauge, review: UserCheck, approve: FileSignature, execute: Play, audit: ScrollText }

/* ── HUMAN ESCALATION FLOW ─────────────────────────────────────────────── */
export function EscalationFlow({ className = '' }) {
  return (
    <div className={`glass p-5 sm:p-6 ${className}`}>
      <p className="telemetry mb-5">Escalation path · high-risk task</p>
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:gap-2">
        {ESCALATION_STAGES.map((s, i) => {
          const Icon = STAGE_ICONS[s.id]
          const st = STATE[s.state]
          return (
            <Reveal key={s.id} delay={i * 0.08} y={12}>
              <li className="relative h-full">
                <div className={`flex h-full flex-col rounded-xl border ${st.ring} ${st.soft} p-3.5`}>
                  <span className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest ${st.text}`}>
                    <Icon className="h-3.5 w-3.5" aria-hidden /> {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-2 font-display text-sm font-semibold text-white">{s.label}</p>
                  <p className="mt-1 text-xs leading-snug text-slatemute">{s.sub}</p>
                </div>
                {i < ESCALATION_STAGES.length - 1 && (
                  <span className="absolute -right-2 top-1/2 hidden h-px w-2 bg-white/15 lg:block" aria-hidden />
                )}
              </li>
            </Reveal>
          )
        })}
      </ol>
    </div>
  )
}

/* ── AUDIT TIMELINE ────────────────────────────────────────────────────── */
export function AuditTimeline({ className = '' }) {
  return (
    <div className={`glass p-5 sm:p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <p className="telemetry">Audit trail · TXN-88231</p>
        <p className="font-mono text-[10px] text-verify">sealed</p>
      </div>
      <ol className="mt-5 space-y-0">
        {AUDIT_EVENTS.map((e, i) => {
          const st = STATE[e.state]
          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="relative flex gap-4 pb-5 last:pb-0"
            >
              {/* rail */}
              {i < AUDIT_EVENTS.length - 1 && (
                <span className="absolute left-[5px] top-4 h-full w-px bg-white/10" aria-hidden />
              )}
              <span className={`relative mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full border-2 border-ink ${st.dot}`} />
              <div className="min-w-0">
                <p className="font-mono text-[10px] text-slatemute">{e.t} · {e.actor}</p>
                <p className="mt-0.5 text-sm text-white/90">{e.action}</p>
              </div>
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}
