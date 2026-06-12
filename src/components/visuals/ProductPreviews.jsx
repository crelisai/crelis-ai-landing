import { motion } from 'framer-motion'
import { CheckCircle2, AlertTriangle, Link2, ShieldCheck } from 'lucide-react'
import { PRODUCT_MODULES } from '../../data/mock.js'
import { Reveal, StatusDot } from '../ui/Primitives.jsx'
import { ChromeDots } from './Console.jsx'

/* ============================================================================
   PRODUCT PREVIEWS — four stylized console windows, one per platform surface:
   Decision Studio · Policy Library · QA Center · Audit Center.
   Pure CSS/SVG mini-UIs (no screenshots), consistent with the control-plane
   chrome used across the site.
   ========================================================================= */

function MiniGauge({ label, value, color }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-[4.5rem] shrink-0 font-mono text-[10px] uppercase tracking-wider text-slatemute">{label}</span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <span className="w-7 text-right font-mono text-[10px]" style={{ color }}>{value}</span>
    </div>
  )
}

function StudioMini() {
  return (
    <div className="space-y-3">
      <p className="truncate font-mono text-[10px] text-slatemute">intent: wire_transfer · $250,000 → ACME-7741</p>
      <MiniGauge label="confidence" value={88} color="#22D3EE" />
      <MiniGauge label="risk" value={91} color="#FB7185" />
      <span className="inline-flex items-center gap-2 rounded-lg border border-review/40 bg-review/10 px-2.5 py-1.5 font-mono text-[10px] text-review">
        route → human review · treasury pool
      </span>
    </div>
  )
}

const POLICIES = [
  { name: 'WIRE-HIGH', ver: 'v12', status: 'active', state: 'verify' },
  { name: 'PHI-GUARD', ver: 'v8', status: 'active', state: 'verify' },
  { name: 'DELETE-SCALE', ver: 'v4', status: 'active', state: 'verify' },
  { name: 'VENDOR-PAY', ver: 'v2', status: 'draft', state: 'review' },
]

function PolicyMini() {
  return (
    <ul className="space-y-1.5">
      {POLICIES.map((p) => (
        <li key={p.name} className="flex items-center gap-2.5 rounded-lg border border-hairline bg-panel2/40 px-2.5 py-1.5">
          <StatusDot state={p.state} />
          <span className="flex-1 truncate font-mono text-[11px] text-white/90">{p.name}</span>
          <span className="rounded border border-hairline px-1.5 py-0.5 font-mono text-[9px] text-slatemute">{p.ver}</span>
          <span className="w-10 text-right font-mono text-[9px] uppercase tracking-wider text-slatemute">{p.status}</span>
        </li>
      ))}
    </ul>
  )
}

const REPLAYS = [
  { id: '#4811', task: 'wire_transfer', ok: true },
  { id: '#4812', task: 'refund_issue', ok: true },
  { id: '#4813', task: 'dosage_update', ok: false },
]

function QAMini() {
  return (
    <div className="space-y-1.5">
      {REPLAYS.map((r) => (
        <div key={r.id} className="flex items-center gap-2.5 rounded-lg border border-hairline bg-panel2/40 px-2.5 py-1.5">
          {r.ok
            ? <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-verify" aria-hidden />
            : <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-review" aria-hidden />}
          <span className="font-mono text-[11px] text-white/90">{r.id}</span>
          <span className="flex-1 truncate font-mono text-[10px] text-slatemute">{r.task}</span>
          <span className={`font-mono text-[9px] uppercase tracking-wider ${r.ok ? 'text-verify' : 'text-review'}`}>
            {r.ok ? 'pass' : 'drift'}
          </span>
        </div>
      ))}
      <div className="flex items-center gap-3 pt-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-slatemute">decision parity</span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full rounded-full bg-verify"
            initial={{ width: 0 }}
            whileInView={{ width: '99.2%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <span className="font-mono text-[10px] text-verify">99.2%</span>
      </div>
    </div>
  )
}

const CHAIN = [
  { t: '14:06:49Z', hash: '0x91f3…aa07' },
  { t: '14:06:12Z', hash: '0x8c21…4be9' },
  { t: '14:05:58Z', hash: '0x77d0…c3f2' },
]

function AuditMini() {
  return (
    <ol className="relative space-y-1.5">
      {CHAIN.map((b, i) => (
        <li key={b.hash} className="relative flex items-center gap-2.5 rounded-lg border border-hairline bg-panel2/40 px-2.5 py-1.5">
          <Link2 className="h-3.5 w-3.5 shrink-0 text-verify/70" aria-hidden />
          <span className="font-mono text-[10px] text-slatemute">{b.t}</span>
          <span className="flex-1 truncate font-mono text-[11px] text-white/90">{b.hash}</span>
          <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-verify">
            <ShieldCheck className="h-3 w-3" aria-hidden /> sealed
          </span>
          {i < CHAIN.length - 1 && <span className="absolute -bottom-[7px] left-[16px] h-[7px] w-px bg-verify/30" aria-hidden />}
        </li>
      ))}
    </ol>
  )
}

const MINIS = { studio: StudioMini, policy: PolicyMini, qa: QAMini, audit: AuditMini }

export default function ProductPreviews({ className = '' }) {
  return (
    <div className={`grid gap-4 sm:gap-5 md:grid-cols-2 ${className}`}>
      {PRODUCT_MODULES.map((m, i) => {
        const Mini = MINIS[m.id]
        return (
          <Reveal key={m.id} delay={i * 0.08} className="h-full">
            <div className="glass group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-electric/30 hover:shadow-glow">
              <div className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-2.5 sm:px-5">
                <p className="flex min-w-0 items-center gap-3">
                  <ChromeDots />
                  <span className="truncate font-display text-sm font-semibold text-white">{m.name}</span>
                </p>
                <span className="shrink-0 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider" style={{ borderColor: `${m.accent}55`, color: m.accent }}>
                  {m.tag}
                </span>
              </div>
              <div className="p-4 sm:p-5">
                <Mini />
              </div>
              <p className="mt-auto border-t border-hairline px-4 py-3 text-xs leading-relaxed text-slatemute sm:px-5">
                {m.desc}
              </p>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}
