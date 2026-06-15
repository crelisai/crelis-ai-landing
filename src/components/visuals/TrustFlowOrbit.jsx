import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Bot, Scale, UserCheck, ScrollText } from 'lucide-react'

/* ============================================================================
   TRUST FLOW ORBIT — premium dimensional hero (dark enterprise SaaS).
   The Crelis mark is a dimensional medallion: an extruded base for depth, a
   glass front face with rim light + a soft sweeping highlight. It revolves
   continuously in-plane while a gentle 3D parallax tilt gives it volume — the
   logo stays readable at all times (no edge-on flip, no gaming glow). The four
   nodes EMERGE FROM BEHIND the core (deep → forward) and activate in sequence;
   once revealed they stay dimmed. A soft beam pulses toward the active node.
   Pure CSS 3D — no WebGL, no new deps. Static, all-cards state under
   prefers-reduced-motion.
   ========================================================================= */

const NODES = [
  { key: 'agent',  label: 'AI Agent',      icon: Bot,        color: '#3D7BFF', x: 50, y: 12, desc: 'proposes an action' },
  { key: 'policy', label: 'Policy Engine', icon: Scale,      color: '#22D3EE', x: 88, y: 50, desc: 'rules applied' },
  { key: 'human',  label: 'Human Review',  icon: UserCheck,  color: '#FBBF24', x: 50, y: 88, desc: 'expert sign-off' },
  { key: 'audit',  label: 'Audit Log',     icon: ScrollText, color: '#34D399', x: 12, y: 50, desc: 'record sealed' },
]

const PLATES = [-12, -8, -4, 0, 4, 8, 12] // mid-layer extrusion → solid lit edge
const PARTICLES = [
  { left: '26%', top: '32%', d: 0 }, { left: '76%', top: '38%', d: 1.4 },
  { left: '68%', top: '72%', d: 2.6 }, { left: '32%', top: '68%', d: 3.8 },
]
const ACTIVATE_MS = 2600

export default function TrustFlowOrbit({ className = '' }) {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [revealed, setRevealed] = useState(() => new Set([0]))

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => {
      setActive((a) => {
        const n = (a + 1) % NODES.length
        setRevealed((r) => (r.has(n) ? r : new Set(r).add(n)))
        return n
      })
    }, ACTIVATE_MS)
    return () => clearInterval(id)
  }, [reduce])

  const isActive = (i) => !reduce && active === i

  // Cards start deep behind the core (blurred), emerge forward when revealed,
  // lift + sharpen when active. Reduced motion shows every card forward.
  const cardStyle = (i) => {
    const base = { left: `${NODES[i].x}%`, top: `${NODES[i].y}%`, transition: 'transform .9s cubic-bezier(.16,1,.3,1), opacity .9s ease, filter .9s ease' }
    if (reduce) return { ...base, transform: 'translate(-50%,-50%) translateZ(20px) scale(1)', opacity: 1, filter: 'none' }
    if (isActive(i)) return { ...base, transform: 'translate(-50%,-50%) translateZ(44px) scale(1)', opacity: 1, filter: 'blur(0)' }
    if (revealed.has(i)) return { ...base, transform: 'translate(-50%,-50%) translateZ(0px) scale(0.9)', opacity: 0.5, filter: 'blur(0.4px)' }
    return { ...base, transform: 'translate(-50%,-50%) translateZ(-120px) scale(0.82)', opacity: 0, filter: 'blur(6px)' }
  }

  return (
    <div
      className={`relative mx-auto aspect-square w-full max-w-[380px] sm:max-w-[440px] ${className}`}
      style={{ perspective: '1200px' }}
      role="group"
      aria-label="Trust Flow Orbit: a revolving Crelis core; the AI Agent, Policy Engine, Human Review, and Audit Log emerge from behind it and activate in sequence."
    >
      {/* glow bed */}
      <div className="pointer-events-none absolute inset-12 rounded-full bg-electric/15 blur-[70px]" aria-hidden />

      {/* depth rings + faint orbital grid + connectors */}
      <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
        <circle cx="50" cy="50" r="46" fill="none" stroke="#3D7BFF" strokeOpacity="0.07" strokeWidth="0.4" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="#3D7BFF" strokeOpacity="0.1" strokeWidth="0.3" strokeDasharray="1 4" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="#22D3EE" strokeOpacity="0.08" strokeWidth="0.3" />
        {NODES.map((n, i) => {
          const on = isActive(i)
          return (
            <line
              key={n.key}
              x1="50" y1="50" x2={n.x} y2={n.y}
              stroke={n.color}
              strokeOpacity={on ? 0.85 : 0.15}
              strokeWidth={on ? 0.9 : 0.5}
              style={{
                transition: 'stroke-opacity .8s ease, stroke-width .8s ease',
                filter: on ? `drop-shadow(0 0 2px ${n.color})` : 'none',
                animation: on && !reduce ? 'beam-pulse 2.4s ease-in-out infinite' : 'none',
              }}
            />
          )
        })}
      </svg>

      {/* lightweight drifting particles */}
      {!reduce && PARTICLES.map((p, i) => (
        <span key={i} className="pointer-events-none absolute h-1 w-1 rounded-full bg-cyan/50 animate-pulse" style={{ left: p.left, top: p.top, animationDelay: `${p.d}s`, animationDuration: '4s' }} aria-hidden />
      ))}

      {/* ── CORE: cinematic multi-axis medallion ── */}
      <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 sm:h-32 sm:w-32" style={{ perspective: '1000px' }}>
        {/* security halo (static glow — cheaper than animating a large blur) */}
        <span className="absolute inset-0 rounded-[26%] bg-electric/25 blur-xl" aria-hidden />

        {/* the emblem — continuous multi-axis tumble (rotateY/X/Z + translateZ + scale) */}
        <div
          className={`preserve-3d relative h-full w-full ${reduce ? '' : 'emblem-spin'}`}
          style={reduce ? { transform: 'rotateY(-24deg) rotateX(13deg)' } : undefined}
        >
          {/* back-plate */}
          <span className="absolute inset-0 rounded-[26%]" style={{ transform: 'translateZ(-16px)', background: 'linear-gradient(180deg,#22325a,#0a1120)' }} aria-hidden />
          {/* mid-layer extrusion — fakes a thick, lit metallic edge */}
          {PLATES.map((z) => (
            <span
              key={z}
              className="absolute inset-0 rounded-[26%]"
              style={{ transform: `translateZ(${z}px)`, background: 'linear-gradient(180deg,#2a3c66,#0c1526)', boxShadow: 'inset 0 0 8px rgba(0,0,0,0.5)' }}
              aria-hidden
            />
          ))}
          {/* BACK logo face (so the mark shows through the full turn) */}
          <span
            className="absolute inset-0 grid place-items-center rounded-[26%] bg-gradient-to-br from-electric to-cyan"
            style={{ transform: 'rotateY(180deg) translateZ(16px)', backfaceVisibility: 'hidden' }}
            aria-hidden
          >
            <span className="h-[34%] w-[34%] rounded-[22%] bg-ink" />
            <span className="pointer-events-none absolute inset-0 rounded-[26%] ring-1 ring-white/15" aria-hidden />
          </span>
          {/* FRONT logo face — glass + inner glow + rim + moving specular */}
          <span
            className="absolute inset-0 grid place-items-center overflow-hidden rounded-[26%] bg-gradient-to-br from-electric to-cyan"
            style={{ transform: 'translateZ(16px)', backfaceVisibility: 'hidden', boxShadow: 'inset 0 2px 12px rgba(255,255,255,0.3), inset 0 -10px 20px rgba(0,0,0,0.42), 0 0 30px -8px rgba(61,123,255,0.78)' }}
            role="img"
            aria-label="Crelis"
          >
            <span className="relative h-[34%] w-[34%] rounded-[22%] bg-ink" style={{ boxShadow: 'inset 0 0 8px rgba(0,0,0,0.85)' }} />
            {/* glass highlight */}
            <span className="pointer-events-none absolute inset-0 rounded-[26%]" style={{ background: 'radial-gradient(120% 90% at 28% 16%, rgba(255,255,255,0.42), rgba(255,255,255,0) 55%)' }} aria-hidden />
            {/* moving specular */}
            {!reduce && <span className="sheen-sweep pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/45 to-transparent" aria-hidden />}
            {/* rim light */}
            <span className="pointer-events-none absolute inset-0 rounded-[26%] ring-1 ring-white/20" aria-hidden />
          </span>
        </div>

        {/* dynamic ground shadow (breathes with the tumble) */}
        <div className={`absolute -bottom-7 left-1/2 h-4 w-[78%] rounded-[50%] bg-black/55 blur-md ${reduce ? '' : 'shadow-breathe'}`} style={reduce ? { transform: 'translateX(-50%)' } : undefined} aria-hidden />
        {/* soft floor reflection */}
        <div className="absolute -bottom-3 left-1/2 h-12 w-[82%] rounded-[26%] bg-gradient-to-b from-electric/25 to-transparent blur-md" style={{ transform: 'translateX(-50%) scaleY(-0.55)', opacity: 0.3 }} aria-hidden />
      </div>

      {/* ── NODES: emerge from behind the core ── */}
      {NODES.map((n, i) => {
        const Icon = n.icon
        const on = isActive(i)
        return (
          <button
            key={n.key}
            type="button"
            aria-label={`${n.label} — ${n.desc}`}
            className="group absolute outline-none"
            style={cardStyle(i)}
          >
            <span className="relative grid h-11 w-11 place-items-center sm:h-12 sm:w-12">
              {on && !reduce && (
                <span className="absolute inset-0 rounded-xl animate-ping" style={{ background: `${n.color}2e`, animationDuration: '2s' }} aria-hidden />
              )}
              <span
                className="relative grid h-full w-full place-items-center rounded-xl border bg-panel/80 backdrop-blur"
                style={{
                  borderColor: `${n.color}${on ? 'CC' : '55'}`,
                  boxShadow: on ? `0 0 22px -3px ${n.color}` : '0 14px 28px -22px #000',
                  transition: 'border-color .8s ease, box-shadow .8s ease',
                }}
              >
                <Icon className="h-5 w-5" style={{ color: n.color }} aria-hidden />
              </span>
            </span>
            <span
              className="mt-1 block whitespace-nowrap text-center font-mono text-[10px] sm:text-[11px]"
              style={{ color: on ? '#fff' : '#93A3BC', transition: 'color .8s ease' }}
            >
              {n.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
