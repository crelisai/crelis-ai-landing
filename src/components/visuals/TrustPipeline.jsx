import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Radar, Scale, Gauge, ShieldCheck, ScrollText, ArrowDown } from 'lucide-react'
import { useLive, useInterval, tnum } from './Console.jsx'

/* ============================================================================
   TRUST PIPELINE — the decision spine, rendered as a 3D-style circuit:
   Request → Detection → Policy → Risk → Decision → Audit.
   Hexagonal "chips" on a perspective floor; packets stream the rail (SMIL);
   stages light up in sequence while on-screen. Static snapshot under
   prefers-reduced-motion / off-screen. Pure SVG + CSS — no 3D library.
   ========================================================================= */

const STAGES = [
  { id: 'request', label: 'Request', sub: 'agent proposes', icon: Send, color: '#3D7BFF' },
  { id: 'detection', label: 'Detection', sub: 'intent classified', icon: Radar, color: '#22D3EE' },
  { id: 'policy', label: 'Policy', sub: 'rules applied', icon: Scale, color: '#3D7BFF' },
  { id: 'risk', label: 'Risk', sub: 'impact scored', icon: Gauge, color: '#FBBF24' },
  { id: 'decision', label: 'Decision', sub: 'allow · review · block', icon: ShieldCheck, color: '#34D399' },
  { id: 'audit', label: 'Audit', sub: 'record sealed', icon: ScrollText, color: '#34D399' },
]

const Y = 84 // rail height
const xAt = (i) => 90 + i * 156

// Flat-top hexagon points around (x, y).
function hexPoints(x, y, r) {
  return Array.from({ length: 6 }, (_, k) => {
    const a = (Math.PI / 3) * k
    return `${(x + r * Math.cos(a)).toFixed(1)},${(y + r * Math.sin(a)).toFixed(1)}`
  }).join(' ')
}

function Packet({ color, dur, begin, r = 4 }) {
  return (
    <circle r={r} fill={color}>
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={`M ${xAt(0)} ${Y} H ${xAt(5)}`} />
      <animate attributeName="opacity" dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" values="0;1;1;1;0" keyTimes="0;0.06;0.5;0.94;1" />
    </circle>
  )
}

export default function TrustPipeline({ className = '' }) {
  const ref = useRef(null)
  const live = useLive(ref)
  const [active, setActive] = useState(0)
  useInterval(() => setActive((a) => (a + 1) % STAGES.length), 1300, live)

  const stage = STAGES[active]

  return (
    <div ref={ref} className={`glass relative overflow-hidden ${className}`}>
      {/* header */}
      <div className="relative z-10 flex items-center justify-between gap-3 border-b border-hairline px-4 py-2.5 sm:px-5">
        <p className="telemetry flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-electric" aria-hidden />
          Trust engine · request to audit
        </p>
        <p className="font-mono text-[10px] text-slatemute" aria-live="off">
          stage: <span style={{ color: stage.color }}>{live ? stage.id : 'all'}</span>
        </p>
      </div>

      {/* perspective floor */}
      <div className="pointer-events-none absolute inset-x-0 bottom-10 h-36 opacity-50 [mask-image:linear-gradient(to_top,black,transparent)]" aria-hidden>
        <div className="h-full w-full origin-bottom bg-grid-faint [background-size:34px_34px] [transform:perspective(420px)_rotateX(56deg)]" />
      </div>

      {/* DESKTOP / TABLET — circuit */}
      <svg
        viewBox="0 0 960 196"
        role="img"
        aria-label="Every AI action flows through six gates: request, detection, policy, risk, decision, and audit."
        className="relative hidden w-full sm:block"
      >
        <defs>
          <linearGradient id="tp-rail" x1={xAt(0)} y1="0" x2={xAt(5)} y2="0" gradientUnits="userSpaceOnUse">
            {STAGES.map((s, i) => (
              <stop key={s.id} offset={i / (STAGES.length - 1)} stopColor={s.color} />
            ))}
          </linearGradient>
        </defs>

        {/* rail */}
        <line x1={xAt(0)} y1={Y} x2={xAt(5)} y2={Y} stroke="url(#tp-rail)" strokeOpacity="0.12" strokeWidth="8" strokeLinecap="round" />
        <line
          x1={xAt(0)} y1={Y} x2={xAt(5)} y2={Y}
          stroke="url(#tp-rail)" strokeOpacity="0.55" strokeWidth="1.5"
          strokeDasharray="5 7" className={live ? 'animate-dash' : ''}
        />

        {/* packets */}
        {live && (
          <>
            <Packet color="#22D3EE" dur={5.2} begin={0} />
            <Packet color="#3D7BFF" dur={5.2} begin={1.8} />
            <Packet color="#3D7BFF" dur={5.2} begin={3.4} r={3.2} />
          </>
        )}

        {/* stage chips */}
        {STAGES.map((s, i) => {
          const x = xAt(i)
          const on = live && i === active
          const Icon = s.icon
          return (
            <motion.g
              key={s.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* depth shadow + base plate (the "3D" stack) */}
              <ellipse cx={x} cy={Y + 42} rx="26" ry="5" fill="#000" opacity="0.45" />
              <polygon points={hexPoints(x, Y + 4, 30)} fill="#060B16" stroke={s.color} strokeOpacity="0.2" strokeWidth="1" />
              {/* active halo */}
              <circle cx={x} cy={Y} r="40" fill={s.color} opacity={on ? 0.14 : 0} style={{ transition: 'opacity 0.4s' }} />
              {/* face plate */}
              <polygon
                points={hexPoints(x, Y, 30)}
                fill="#0B1120"
                stroke={s.color}
                strokeOpacity={on ? 0.95 : 0.4}
                strokeWidth={on ? 1.8 : 1.2}
                style={{ transition: 'stroke-opacity 0.4s, stroke-width 0.4s' }}
              />
              <foreignObject x={x - 11} y={Y - 11} width="22" height="22">
                <Icon className="h-[22px] w-[22px]" style={{ color: s.color, opacity: on ? 1 : 0.75, transition: 'opacity 0.4s' }} aria-hidden />
              </foreignObject>
              <text x={x} y={Y + 62} textAnchor="middle" fill="#fff" fontSize="13" fontFamily="Space Grotesk, sans-serif" fontWeight="600">{s.label}</text>
              <text x={x} y={Y + 78} textAnchor="middle" fill="#93A3BC" fontSize="9.5" fontFamily="JetBrains Mono, monospace">{s.sub}</text>
              {i < STAGES.length - 1 && (
                <text x={x + 78} y={Y - 12} textAnchor="middle" fill="#fff" opacity="0.25" fontSize="11">▸</text>
              )}
            </motion.g>
          )
        })}
      </svg>

      {/* MOBILE — vertical gates */}
      <ol className="relative space-y-0 px-4 py-4 sm:hidden">
        {STAGES.map((s, i) => {
          const on = live && i === active
          const Icon = s.icon
          return (
            <li key={s.id} className="relative flex items-center gap-3 pb-4 last:pb-0">
              {i < STAGES.length - 1 && (
                <span className="absolute left-[18px] top-9 h-[calc(100%-12px)] w-px bg-white/10" aria-hidden />
              )}
              <span
                className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl border transition-shadow duration-300"
                style={{
                  borderColor: `${s.color}${on ? 'CC' : '55'}`,
                  background: `${s.color}14`,
                  boxShadow: on ? `0 0 18px -2px ${s.color}88` : 'none',
                }}
              >
                <Icon className="h-[18px] w-[18px]" style={{ color: s.color }} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold text-white">{s.label}</p>
                <p className="font-mono text-[11px] text-slatemute">{s.sub}</p>
              </div>
              {i < STAGES.length - 1 && (
                <ArrowDown className="absolute left-[13px] top-[30px] h-3 w-3 text-white/20" aria-hidden />
              )}
            </li>
          )
        })}
      </ol>

      {/* telemetry strip */}
      <div className="relative z-10 grid grid-cols-3 divide-x divide-hairline border-t border-hairline">
        <div className="px-4 py-3">
          <p className={`text-base font-semibold text-electric sm:text-lg ${tnum}`}>142ms</p>
          <p className="telemetry mt-0.5">median decision</p>
        </div>
        <div className="px-4 py-3">
          <p className={`text-base font-semibold text-white sm:text-lg ${tnum}`}>312</p>
          <p className="telemetry mt-0.5">policies active</p>
        </div>
        <div className="px-4 py-3">
          <p className={`text-base font-semibold text-verify sm:text-lg ${tnum}`}>100%</p>
          <p className="telemetry mt-0.5">actions audited</p>
        </div>
      </div>
    </div>
  )
}
