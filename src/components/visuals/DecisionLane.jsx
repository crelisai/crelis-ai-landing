import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, UserCheck, ScrollText, ArrowDown } from 'lucide-react'
import { AgentGlyph, useLive, useLiveCount, fmt, tnum } from './Console.jsx'

/* ============================================================================
   DECISION LANE — the signature live flow.
   Agent tasks (blue) stream into the trust gate; the gate "scores" and emits
   the decision: most flow straight to verified execution (green), some detour
   through a human reviewer (amber), all sealed in the audit trail.
   Packets visibly CHANGE COLOR at the gate — the decision made visible.
   Pure SVG + Framer Motion. No images.
   ========================================================================= */

const PATHS = {
  approach: 'M 118 130 H 336',
  auto: 'M 404 130 H 648',
  review: 'M 404 130 C 432 130 432 58 470 58 C 512 58 540 130 566 130 L 648 130',
}

// One moving packet along a path (SMIL animateMotion — cheap, GPU-friendly).
function Packet({ path, color, dur, begin, r = 4.5 }) {
  return (
    <circle r={r} fill={color}>
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={path} />
      <animate attributeName="opacity" dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite"
        values="0;1;1;1;0" keyTimes="0;0.12;0.5;0.88;1" />
    </circle>
  )
}

function Node({ x, y, icon: Icon, label, sub, color, delay = 0 }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <circle cx={x} cy={y} r="27" fill="#0B1120" stroke={color} strokeOpacity="0.5" strokeWidth="1.5" />
      <circle cx={x} cy={y} r="27" fill="none" stroke={color} strokeOpacity="0.16" strokeWidth="7" />
      <foreignObject x={x - 11} y={y - 11} width="22" height="22">
        <Icon className="h-[22px] w-[22px]" style={{ color }} aria-hidden />
      </foreignObject>
      <text x={x} y={y + 45} textAnchor="middle" fill="#fff" fontSize="12.5" fontFamily="Space Grotesk, sans-serif" fontWeight="600">{label}</text>
      <text x={x} y={y + 60} textAnchor="middle" fill="#93A3BC" fontSize="9.5" fontFamily="JetBrains Mono, monospace">{sub}</text>
    </motion.g>
  )
}

/* ── Mobile vertical lane (legible at 375px, no horizontal scroll) ──────── */
const MOBILE_STEPS = [
  { icon: AgentGlyph, label: 'AI agents', sub: 'propose actions', color: '#3D7BFF' },
  { icon: ShieldCheck, label: 'Trust gate', sub: 'risk · confidence', color: '#3D7BFF' },
  { icon: UserCheck, label: 'Human review', sub: 'when risk is high', color: '#FBBF24' },
  { icon: ScrollText, label: 'Audit trail', sub: 'sealed record', color: '#34D399' },
]

function MobileLane({ live }) {
  return (
    <ol className="sm:hidden space-y-0 px-1 py-2">
      {MOBILE_STEPS.map((s, i) => (
        <li key={s.label} className="relative flex items-center gap-3 pb-4 last:pb-0">
          {i < MOBILE_STEPS.length - 1 && (
            <span className="absolute left-[18px] top-9 h-[calc(100%-12px)] w-px bg-white/10" aria-hidden />
          )}
          <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl border" style={{ borderColor: `${s.color}66`, background: `${s.color}14` }}>
            <s.icon className="h-[18px] w-[18px]" style={{ color: s.color }} aria-hidden />
            {live && <span className="absolute inset-0 rounded-xl" style={{ boxShadow: `0 0 0 1px ${s.color}33` }} />}
          </span>
          <div className="min-w-0">
            <p className="font-display text-sm font-semibold text-white">{s.label}</p>
            <p className="font-mono text-[11px] text-slatemute">{s.sub}</p>
          </div>
          {i < MOBILE_STEPS.length - 1 && (
            <ArrowDown className="absolute left-[13px] top-[30px] h-3 w-3 text-white/20" aria-hidden />
          )}
        </li>
      ))}
    </ol>
  )
}

export default function DecisionLane({ className = '' }) {
  const ref = useRef(null)
  const live = useLive(ref)
  const actions = useLiveCount(48212, { step: 6, jitter: 4, interval: 1000, active: live })

  return (
    <div ref={ref} className={`glass relative overflow-hidden ${className}`}>
      {/* header */}
      <div className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-2.5 sm:px-5">
        <p className="telemetry flex items-center gap-2">
          <span className={`relative inline-flex h-2 w-2 ${live ? '' : 'opacity-60'}`}>
            {live && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-60" />}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-electric" />
          </span>
          Decision lane · live
        </p>
        <p className="hidden items-center gap-4 font-mono text-[10px] text-slatemute sm:flex">
          <span className="flex items-center gap-1.5"><i className="inline-block h-1.5 w-1.5 rounded-full bg-verify" /> auto</span>
          <span className="flex items-center gap-1.5"><i className="inline-block h-1.5 w-1.5 rounded-full bg-review" /> review</span>
        </p>
      </div>

      {/* scanline atmosphere */}
      <div className="pointer-events-none absolute inset-x-0 top-10 h-20 bg-gradient-to-b from-electric/10 to-transparent animate-scan" aria-hidden />

      {/* DESKTOP / TABLET — SVG flow */}
      <svg
        viewBox="0 0 760 210"
        role="img"
        aria-label="Agent tasks stream into the Crelis trust gate; safe tasks auto-execute (green) while risky tasks detour through human review (amber), all sealed in the audit trail."
        className="hidden w-full sm:block"
      >
        <defs>
          <pattern id="dl-grid" width="26" height="26" patternUnits="userSpaceOnUse">
            <path d="M 26 0 L 0 0 0 26" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          </pattern>
          <linearGradient id="dl-auto" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#3D7BFF" /><stop offset="1" stopColor="#34D399" />
          </linearGradient>
          <linearGradient id="dl-rev" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#3D7BFF" /><stop offset="1" stopColor="#FBBF24" />
          </linearGradient>
        </defs>
        <rect width="760" height="210" fill="url(#dl-grid)" />

        {/* lane rails */}
        <path d={PATHS.approach} fill="none" stroke="#3D7BFF" strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="5 6" className={live ? 'animate-dash' : ''} />
        <path d={PATHS.auto} fill="none" stroke="url(#dl-auto)" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="5 6" className={live ? 'animate-dash' : ''} />
        <path d={PATHS.review} fill="none" stroke="url(#dl-rev)" strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="5 6" className={live ? 'animate-dash' : ''} />

        {/* trust gate band + scoring pulse */}
        <rect x="346" y="36" width="48" height="138" rx="10" fill="#3D7BFF" opacity="0.08" />
        <rect x="346" y="36" width="48" height="138" rx="10" fill="none" stroke="#3D7BFF" strokeOpacity="0.4" strokeWidth="1" />
        {live && (
          <rect x="346" y="36" width="48" height="138" rx="10" fill="#3D7BFF">
            <animate attributeName="opacity" values="0;0.18;0" dur="2.2s" repeatCount="indefinite" />
          </rect>
        )}

        {/* packets — blue IN, recoloured OUT at the gate */}
        {live ? (
          <>
            <Packet path={PATHS.approach} color="#3D7BFF" dur={2.2} begin={0} />
            <Packet path={PATHS.approach} color="#22D3EE" dur={2.2} begin={0.9} />
            <Packet path={PATHS.approach} color="#3D7BFF" dur={2.2} begin={1.55} />
            <Packet path={PATHS.auto} color="#34D399" dur={2.4} begin={0.4} />
            <Packet path={PATHS.auto} color="#34D399" dur={2.4} begin={1.5} />
            <Packet path={PATHS.auto} color="#34D399" dur={2.4} begin={2.1} />
            <Packet path={PATHS.review} color="#FBBF24" dur={3.0} begin={1.0} />
            <Packet path={PATHS.review} color="#FBBF24" dur={3.0} begin={3.3} />
          </>
        ) : (
          <>
            <circle cx="230" cy="130" r="4.5" fill="#3D7BFF" />
            <circle cx="540" cy="130" r="4.5" fill="#34D399" />
            <circle cx="470" cy="58" r="4.5" fill="#FBBF24" />
          </>
        )}

        {/* nodes */}
        <Node x={90} y={130} icon={AgentGlyph} label="AI agents" sub="propose actions" color="#3D7BFF" delay={0.05} />
        <Node x={370} y={130} icon={ShieldCheck} label="Trust gate" sub="risk · confidence" color="#3D7BFF" delay={0.18} />
        <Node x={470} y={58} icon={UserCheck} label="Human review" sub="verified expert" color="#FBBF24" delay={0.3} />
        <Node x={680} y={130} icon={ScrollText} label="Audit trail" sub="sealed record" color="#34D399" delay={0.42} />
      </svg>

      {/* MOBILE — vertical lane */}
      <MobileLane live={live} />

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
