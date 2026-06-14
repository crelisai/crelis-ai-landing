import { useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Bot, Scale, UserCheck, ScrollText } from 'lucide-react'

/* ============================================================================
   TRUST FLOW ORBIT — hero signature.
   Hub-and-spoke: the Crelis Trust Engine at the core, with AI Agent, Policy
   Engine, Human Review, and Audit Log orbiting it. Glowing connectors carry
   the request in and the decision out. Hover / focus a node to light its path.
   Pure SVG + HTML overlay — no 3D library. Motion freezes under
   prefers-reduced-motion (CSS rule + the `reduce` guard below).
   ========================================================================= */

// viewBox is 0..100 so SVG line coords line up 1:1 with the % node positions.
const NODES = [
  { key: 'agent',  label: 'AI Agent',      icon: Bot,        color: '#3D7BFF', x: 50, y: 13, dir: 'in',  desc: 'proposes an action' },
  { key: 'policy', label: 'Policy Engine', icon: Scale,      color: '#22D3EE', x: 87, y: 50, dir: 'out', desc: 'rules applied' },
  { key: 'audit',  label: 'Audit Log',     icon: ScrollText, color: '#34D399', x: 50, y: 87, dir: 'out', desc: 'record sealed' },
  { key: 'human',  label: 'Human Review',  icon: UserCheck,  color: '#FBBF24', x: 13, y: 50, dir: 'out', desc: 'expert sign-off' },
]

export default function TrustFlowOrbit({ className = '' }) {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(null)

  return (
    <div
      className={`relative mx-auto aspect-square w-full max-w-[380px] sm:max-w-[440px] ${className}`}
      role="group"
      aria-label="Trust Flow Orbit: an AI Agent request flows into the Crelis Trust Engine, which consults the Policy Engine, routes to Human Review, and seals an Audit Log."
    >
      {/* glow bed */}
      <div className="pointer-events-none absolute inset-12 rounded-full bg-electric/15 blur-[70px]" aria-hidden />

      {/* rotating decorative ring (freezes under reduced motion) */}
      <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
        <g className="orb-rotate" style={{ animationDuration: '60s' }}>
          <circle cx="50" cy="50" r="44" fill="none" stroke="#3D7BFF" strokeOpacity="0.18" strokeWidth="0.4" strokeDasharray="1 4" />
        </g>
        {/* connectors */}
        {NODES.map((n) => {
          const on = active === n.key
          return (
            <line
              key={n.key}
              x1="50" y1="50" x2={n.x} y2={n.y}
              stroke={n.color}
              strokeOpacity={on ? 0.95 : active ? 0.18 : 0.4}
              strokeWidth={on ? 0.9 : 0.5}
              strokeDasharray="1.5 2.5"
              className={!reduce ? 'animate-dash' : ''}
              style={{
                transition: 'stroke-opacity .3s, stroke-width .3s',
                animationDirection: n.dir === 'in' ? 'reverse' : 'normal',
                animationDuration: '1.6s',
              }}
            />
          )
        })}
      </svg>

      {/* center — large, slowly revolving Crelis brand mark (the security core) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="relative mx-auto h-24 w-24 sm:h-28 sm:w-28">
          {/* security pulse */}
          {!reduce && (
            <span className="absolute inset-0 rounded-[26%] bg-electric/40 blur-xl animate-ping" style={{ animationDuration: '3.6s' }} aria-hidden />
          )}
          {/* counter-rotating guard ring */}
          <span
            className={`absolute -inset-3 rounded-full border border-electric/20 ${reduce ? '' : 'orb-rotate'}`}
            style={{ animationDuration: '26s', animationDirection: 'reverse' }}
            aria-hidden
          />
          {/* the Crelis logo mark — gradient square + ink aperture — revolving */}
          <span
            className={`relative grid h-full w-full place-items-center rounded-[26%] bg-gradient-to-br from-electric to-cyan shadow-glow ${reduce ? '' : 'orb-rotate'}`}
            style={{ animationDuration: '44s' }}
            role="img"
            aria-label="Crelis"
          >
            <span className="h-[34%] w-[34%] rounded-[22%] bg-ink" />
          </span>
        </div>
        <p className="mt-3 font-display text-sm font-semibold text-white">Crelis</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-electric">Security for AI</p>
      </div>

      {/* orbiting nodes */}
      {NODES.map((n) => {
        const Icon = n.icon
        const on = active === n.key
        return (
          <button
            key={n.key}
            type="button"
            onMouseEnter={() => setActive(n.key)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(n.key)}
            onBlur={() => setActive(null)}
            aria-label={`${n.label} — ${n.desc}`}
            className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-xl outline-none"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <span
              className="grid h-11 w-11 place-items-center rounded-xl border bg-panel/80 backdrop-blur transition duration-300 sm:h-12 sm:w-12"
              style={{
                borderColor: `${n.color}${on ? 'CC' : '55'}`,
                boxShadow: on ? `0 0 22px -2px ${n.color}AA` : 'none',
                transform: on ? 'scale(1.08)' : 'scale(1)',
              }}
            >
              <Icon className="h-5 w-5" style={{ color: n.color }} aria-hidden />
            </span>
            <span className="mt-1 block whitespace-nowrap text-center font-mono text-[10px] text-slatemute transition-colors group-hover:text-white group-focus-visible:text-white sm:text-[11px]">
              {n.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
