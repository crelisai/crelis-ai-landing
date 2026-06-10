import { useMemo } from 'react'
import { useReducedMotion } from 'framer-motion'

/* ============================================================================
   AGENT NETWORK — animated agents exchanging tasks.
   Deterministic node layout (no hydration jitter), packets travel edges.
   ========================================================================= */

const NODES = [
  { id: 'core', x: 250, y: 150, r: 9, core: true },
  { id: 'a1', x: 80, y: 60, r: 6 },
  { id: 'a2', x: 420, y: 55, r: 6 },
  { id: 'a3', x: 60, y: 230, r: 6 },
  { id: 'a4', x: 440, y: 235, r: 6 },
  { id: 'a5', x: 250, y: 35, r: 5 },
  { id: 'a6', x: 160, y: 265, r: 5 },
  { id: 'a7', x: 350, y: 265, r: 5 },
]

const EDGES = [
  ['core', 'a1'], ['core', 'a2'], ['core', 'a3'], ['core', 'a4'],
  ['core', 'a5'], ['core', 'a6'], ['core', 'a7'], ['a1', 'a5'], ['a2', 'a5'],
]

const PACKET_COLORS = ['#3D7BFF', '#22D3EE', '#34D399', '#FBBF24']

export default function AgentNetwork({ className = '' }) {
  const reduce = useReducedMotion()
  const byId = useMemo(() => Object.fromEntries(NODES.map((n) => [n.id, n])), [])

  return (
    <svg viewBox="0 0 500 300" className={`w-full ${className}`} role="img" aria-label="Network of AI agents exchanging tasks through a central Crelis node.">
      <defs>
        <radialGradient id="an-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#3D7BFF" stopOpacity="0.55" />
          <stop offset="1" stopColor="#3D7BFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {EDGES.map(([a, b], i) => {
        const n1 = byId[a], n2 = byId[b]
        const path = `M ${n1.x} ${n1.y} L ${n2.x} ${n2.y}`
        return (
          <g key={`${a}-${b}`}>
            <path d={path} stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" />
            {!reduce && (
              <circle r="2.5" fill={PACKET_COLORS[i % PACKET_COLORS.length]}>
                <animateMotion dur={`${3 + (i % 4)}s`} begin={`${i * 0.45}s`} repeatCount="indefinite" path={path} />
              </circle>
            )}
          </g>
        )
      })}

      <circle cx="250" cy="150" r="46" fill="url(#an-core)" />
      {NODES.map((n) => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r={n.r + 5} fill="none" stroke={n.core ? '#3D7BFF' : 'rgba(255,255,255,0.15)'} strokeWidth="1" opacity="0.7" />
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.core ? '#3D7BFF' : '#0F1830'} stroke={n.core ? '#22D3EE' : '#3D7BFF'} strokeOpacity={n.core ? 1 : 0.5} strokeWidth="1.5" />
        </g>
      ))}
      <text x="250" y="186" textAnchor="middle" fill="#93A3BC" fontSize="9.5" fontFamily="JetBrains Mono, monospace">
        CRELIS CORE
      </text>
    </svg>
  )
}
