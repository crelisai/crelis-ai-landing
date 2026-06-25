import { useReducedMotion } from 'framer-motion'

/* ============================================================================
   TRUST ORB — hero signature. A rotating "decision sphere" with the Crelis
   mark at its core: tilted orbital rings (CSS rotation), state-colored nodes
   travelling the orbits (SMIL), and a sealing pulse.
   Pure SVG — no images, no 3D library. Rotation classes freeze automatically
   under prefers-reduced-motion (global CSS rule); SMIL is gated in JS.
   ========================================================================= */

const C = 220 // center

// Circular path of radius r around the center (for animateMotion).
const orbitPath = (r) => `M ${C + r} ${C} a ${r} ${r} 0 1 1 ${-2 * r} 0 a ${r} ${r} 0 1 1 ${2 * r} 0`

const ORBIT_DOTS = [
  { r: 186, color: '#3D7BFF', dur: 16, begin: 0, size: 5 },
  { r: 186, color: '#22D3EE', dur: 16, begin: -8, size: 4 },
  { r: 150, color: '#FBBF24', dur: 22, begin: -5, size: 4 },
  { r: 118, color: '#34D399', dur: 12, begin: -3, size: 4.5 },
]

const CHIPS = [
  { text: 'policy WIRE-HIGH applied', cls: 'text-electric', pos: 'left-0 top-[16%]', delay: '0s' },
  { text: 'risk 91 → human review', cls: 'text-review', pos: 'right-0 top-[44%]', delay: '1.6s' },
  { text: 'record sealed ✓', cls: 'text-verify', pos: 'left-[4%] bottom-[12%]', delay: '3.2s' },
]

export default function TrustOrb({ className = '' }) {
  const reduce = useReducedMotion()
  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[380px] sm:max-w-[440px] ${className}`}>
      {/* glow bed */}
      <div className="absolute inset-10 rounded-full bg-electric/15 blur-[70px]" aria-hidden />

      <svg
        viewBox="0 0 440 440"
        className="relative h-full w-full"
        role="img"
        aria-label="The Crelis trust orb: agent requests orbit the trust core, where policy, risk, and audit decisions are made."
      >
        <defs>
          <radialGradient id="orb-core" cx="0.5" cy="0.4" r="0.7">
            <stop offset="0" stopColor="#142347" />
            <stop offset="1" stopColor="#2C313A" />
          </radialGradient>
          <linearGradient id="orb-mark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3D7BFF" />
            <stop offset="1" stopColor="#22D3EE" />
          </linearGradient>
          <linearGradient id="orb-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3D7BFF" stopOpacity="0.7" />
            <stop offset="0.5" stopColor="#22D3EE" stopOpacity="0.25" />
            <stop offset="1" stopColor="#3D7BFF" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* tick ring — instrument bezel */}
        <g opacity="0.5">
          {Array.from({ length: 36 }).map((_, i) => (
            <line
              key={i}
              x1={C} y1="14" x2={C} y2={i % 9 === 0 ? '24' : '19'}
              stroke="#fff" strokeOpacity={i % 9 === 0 ? 0.3 : 0.12} strokeWidth="1"
              transform={`rotate(${i * 10} ${C} ${C})`}
            />
          ))}
        </g>

        {/* outer dashed orbit — slow rotation */}
        <g className="orb-rotate" style={{ animationDuration: '48s' }}>
          <circle cx={C} cy={C} r="186" fill="none" stroke="#3D7BFF" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="2 12" />
        </g>

        {/* tilted gyroscope rings — counter-rotating */}
        <g className="orb-rotate" style={{ animationDuration: '30s' }}>
          <ellipse cx={C} cy={C} rx="150" ry="58" fill="none" stroke="url(#orb-ring)" strokeWidth="1" transform={`rotate(-24 ${C} ${C})`} />
        </g>
        <g className="orb-rotate" style={{ animationDuration: '38s', animationDirection: 'reverse' }}>
          <ellipse cx={C} cy={C} rx="150" ry="58" fill="none" stroke="url(#orb-ring)" strokeWidth="1" transform={`rotate(36 ${C} ${C})`} />
        </g>
        <g className="orb-rotate" style={{ animationDuration: '54s' }}>
          <circle cx={C} cy={C} r="118" fill="none" stroke="#fff" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="4 8" />
        </g>

        {/* state nodes travelling the orbits */}
        {!reduce && ORBIT_DOTS.map((d, i) => (
          <g key={i}>
            <circle r={d.size} fill={d.color}>
              <animateMotion dur={`${d.dur}s`} begin={`${d.begin}s`} repeatCount="indefinite" path={orbitPath(d.r)} />
            </circle>
            <circle r={d.size * 2.4} fill={d.color} opacity="0.18">
              <animateMotion dur={`${d.dur}s`} begin={`${d.begin}s`} repeatCount="indefinite" path={orbitPath(d.r)} />
            </circle>
          </g>
        ))}
        {reduce && ORBIT_DOTS.map((d, i) => (
          <circle key={i} cx={C + d.r * Math.cos((i * Math.PI) / 2 + 0.5)} cy={C + d.r * Math.sin((i * Math.PI) / 2 + 0.5)} r={d.size} fill={d.color} />
        ))}

        {/* sealing pulse */}
        {!reduce && (
          <>
            <circle cx={C} cy={C} r="76" fill="none" stroke="#3D7BFF" strokeWidth="1">
              <animate attributeName="r" values="76;112" dur="3.2s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.45;0" dur="3.2s" repeatCount="indefinite" />
            </circle>
            <circle cx={C} cy={C} r="76" fill="none" stroke="#22D3EE" strokeWidth="1">
              <animate attributeName="r" values="76;112" dur="3.2s" begin="1.6s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.35;0" dur="3.2s" begin="1.6s" repeatCount="indefinite" />
            </circle>
          </>
        )}

        {/* core — the Crelis mark, large and slowly rotating */}
        <circle cx={C} cy={C} r="74" fill="url(#orb-core)" stroke="#3D7BFF" strokeOpacity="0.45" strokeWidth="1" />
        <circle cx={C} cy={C} r="74" fill="none" stroke="#3D7BFF" strokeOpacity="0.12" strokeWidth="10" />
        <g className="orb-rotate" style={{ animationDuration: '16s' }}>
          <rect x={C - 31} y={C - 31} width="62" height="62" rx="14" fill="url(#orb-mark)" />
          <rect x={C - 12} y={C - 12} width="24" height="24" rx="5.5" fill="#272B31" />
        </g>
      </svg>

      {/* floating decision chips */}
      {CHIPS.map((c) => (
        <span
          key={c.text}
          className={`glass absolute hidden px-3 py-1.5 font-mono text-[10px] sm:block ${c.cls} ${c.pos} animate-floaty`}
          style={{ animationDelay: c.delay }}
          aria-hidden
        >
          {c.text}
        </span>
      ))}
    </div>
  )
}
