import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gauge, UserCheck, FileSignature, Play, ScrollText, Lock } from 'lucide-react'
import { ESCALATION_STAGES, AUDIT_EVENTS, AUDIT_STREAM } from '../../data/mock.js'
import { STATE, Reveal } from '../ui/Primitives.jsx'
import { AgentGlyph, useLive, useInterval, tnum } from './Console.jsx'

const STAGE_ICONS = { task: AgentGlyph, score: Gauge, review: UserCheck, approve: FileSignature, execute: Play, audit: ScrollText }

/* ── REAL-TIME DECISION PIPELINE ───────────────────────────────────────────
   A token advances stage → stage; the active stage lights up, the connector
   fills behind it, and each stage shows live throughput.
   ========================================================================= */
export function EscalationFlow({ className = '' }) {
  const ref = useRef(null)
  const live = useLive(ref)
  const [active, setActive] = useState(0)
  useInterval(() => setActive((i) => (i + 1) % ESCALATION_STAGES.length), 1100, live)

  return (
    <div ref={ref} className={`glass p-5 sm:p-6 ${className}`}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="telemetry flex items-center gap-2">
          <span className={`relative inline-flex h-2 w-2 ${live ? '' : 'opacity-60'}`}>
            {live && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-60" />}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-electric" />
          </span>
          Decision pipeline · live
        </p>
        <p className="hidden font-mono text-[10px] text-slatemute sm:block">avg 41ms · p99 180ms</p>
      </div>

      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:gap-2">
        {ESCALATION_STAGES.map((s, i) => {
          const Icon = STAGE_ICONS[s.id]
          const st = STATE[s.state]
          const isActive = live && i === active
          const passed = live && i < active
          return (
            <Reveal key={s.id} delay={i * 0.06} y={12}>
              <li className="relative h-full">
                <motion.div
                  animate={isActive ? { scale: 1.03 } : { scale: 1 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex h-full flex-col rounded-xl border p-3.5 transition-colors duration-300 ${
                    isActive ? `${st.ring} ${st.soft} shadow-glow` : passed ? `${st.ring} bg-panel2/40` : 'border-hairline bg-panel2/30'
                  }`}
                >
                  <span className={`flex items-center justify-between font-mono text-[10px] uppercase tracking-widest ${isActive || passed ? st.text : 'text-slatemute'}`}>
                    <span className="flex items-center gap-1.5"><Icon className="h-3.5 w-3.5" aria-hidden /> {String(i + 1).padStart(2, '0')}</span>
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                  </span>
                  <p className="mt-2 font-display text-sm font-semibold text-white">{s.label}</p>
                  <p className="mt-1 text-xs leading-snug text-slatemute">{s.sub}</p>
                  <p className={`mt-2 text-[10px] text-slatemute ${tnum}`}>{s.tp}</p>
                </motion.div>
                {/* connector — fills as the token passes */}
                {i < ESCALATION_STAGES.length - 1 && (
                  <span className="absolute -right-2 top-1/2 hidden h-px w-2 bg-white/12 lg:block" aria-hidden>
                    <span className={`block h-full bg-electric transition-all duration-300 ${passed ? 'w-full' : 'w-0'}`} />
                  </span>
                )}
              </li>
            </Reveal>
          )
        })}
      </ol>
    </div>
  )
}

/* ── AUDIT EVENT STREAM ─────────────────────────────────────────────────────
   A live, tamper-evident log: rows stream in from the top with timestamp,
   actor, action and a sealed hash. Falls back to a static trail when motion
   is reduced or the panel is off-screen.
   ========================================================================= */
const ROW_CAP = 7
const hex = (n) => n.toString(16).padStart(4, '0').slice(-4)
const fmtTime = (sec) => {
  const h = Math.floor(sec / 3600) % 24
  const m = Math.floor(sec / 60) % 60
  const s = sec % 60
  const p = (x) => String(x).padStart(2, '0')
  return `${p(h)}:${p(m)}:${p(s)}Z`
}

function makeRow(seq) {
  const ev = AUDIT_STREAM[seq % AUDIT_STREAM.length]
  return {
    id: seq,
    t: fmtTime(50531 + seq * 7), // 14:02:11Z + 7s per event
    actor: ev.actor,
    action: ev.action,
    state: ev.state,
    hash: `0x${hex(seq * 9176 + 0x91f3)}…${hex(seq * 433 + 0xaa07)}`,
  }
}

export function AuditTimeline({ className = '' }) {
  const ref = useRef(null)
  const live = useLive(ref)
  const [rows, setRows] = useState(() => Array.from({ length: ROW_CAP }, (_, i) => makeRow(ROW_CAP - 1 - i)))
  const [seq, setSeq] = useState(ROW_CAP)

  useInterval(() => {
    setRows((prev) => [makeRow(seq), ...prev].slice(0, ROW_CAP))
    setSeq((n) => n + 1)
  }, 1900, live)

  // Static, meaningful fallback for reduced-motion / off-screen.
  if (!live) {
    return (
      <div ref={ref} className={`glass p-5 sm:p-6 ${className}`}>
        <div className="flex items-center justify-between">
          <p className="telemetry flex items-center gap-2"><Lock className="h-3.5 w-3.5 text-verify" aria-hidden /> Audit event stream</p>
          <p className="font-mono text-[10px] text-verify">sealed</p>
        </div>
        <ol className="mt-5 space-y-0">
          {AUDIT_EVENTS.map((e, i) => {
            const st = STATE[e.state]
            return (
              <li key={i} className="relative flex gap-4 pb-5 last:pb-0">
                {i < AUDIT_EVENTS.length - 1 && <span className="absolute left-[5px] top-4 h-full w-px bg-white/10" aria-hidden />}
                <span className={`relative mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full border-2 border-ink ${st.dot}`} />
                <div className="min-w-0">
                  <p className={`text-[10px] text-slatemute ${tnum}`}>{e.t} · {e.actor}</p>
                  <p className="mt-0.5 text-sm text-white/90">{e.action}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    )
  }

  return (
    <div ref={ref} className={`glass overflow-hidden ${className}`}>
      <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5 sm:px-5">
        <p className="telemetry flex items-center gap-2">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verify opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-verify" />
          </span>
          Audit event stream · live
        </p>
        <p className="flex items-center gap-1.5 font-mono text-[10px] text-verify"><Lock className="h-3 w-3" aria-hidden /> sealed</p>
      </div>

      <div className="relative">
        {/* top fade — new rows emerge from here */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-panel/90 to-transparent" aria-hidden />
        <ul className="space-y-px p-2">
          <AnimatePresence initial={false}>
            {rows.map((r) => {
              const st = STATE[r.state]
              return (
                <motion.li
                  key={r.id}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-3 rounded-lg px-3 py-2 hover:bg-white/[0.03]"
                >
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${st.dot}`} aria-hidden />
                  <span className={`mt-px shrink-0 text-[10px] text-slatemute ${tnum}`}>{r.t}</span>
                  <span className="min-w-0 flex-1">
                    <span className="text-sm text-white/90">{r.action}</span>
                    <span className="mt-0.5 flex items-center gap-2">
                      <span className="font-mono text-[10px] text-slatemute">{r.actor}</span>
                      <span className={`rounded border border-hairline bg-panel2/60 px-1.5 py-px text-[9px] text-slatemute ${tnum}`}>{r.hash}</span>
                    </span>
                  </span>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </ul>
        {/* bottom fade — old rows age out */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-panel/95 to-transparent" aria-hidden />
      </div>
    </div>
  )
}
