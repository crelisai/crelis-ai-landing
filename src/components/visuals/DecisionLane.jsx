import { motion, useReducedMotion } from 'framer-motion'
import { Bot, ShieldCheck, UserCheck, ScrollText } from 'lucide-react'

/* ============================================================================
   DECISION LANE — the signature visual.
   Tasks spawn from AI agents (left), pass the trust gate (center) and either
   flow straight to verified execution (green) or detour through a human
   reviewer (amber) before joining the audit trail (right).
   Pure SVG + Framer Motion. No images.
   ========================================================================= */

const LANE = {
  straight: 'M 120 150 C 240 150 300 150 420 150 C 520 150 560 150 660 150',
  detour: 'M 120 150 C 220 150 260 150 330 150 C 380 150 390 70 450 70 C 510 70 520 150 580 150 C 610 150 635 150 660 150',
}

function TaskDot({ path, color, dur, delay }) {
  const reduce = useReducedMotion()
  if (reduce) return null
  return (
    <circle r="5" fill={color} opacity="0.95">
      <animateMotion dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" path={path} />
    </circle>
  )
}

function Node({ x, y, icon: Icon, label, sub, color, delay = 0 }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <circle cx={x} cy={y} r="30" fill="#0B1120" stroke={color} strokeOpacity="0.5" strokeWidth="1.5" />
      <circle cx={x} cy={y} r="30" fill="none" stroke={color} strokeOpacity="0.18" strokeWidth="8" />
      <foreignObject x={x - 12} y={y - 12} width="24" height="24">
        <Icon className="h-6 w-6" style={{ color }} aria-hidden />
      </foreignObject>
      <text x={x} y={y + 50} textAnchor="middle" fill="#fff" fontSize="12" fontFamily="Space Grotesk, sans-serif" fontWeight="600">
        {label}
      </text>
      <text x={x} y={y + 66} textAnchor="middle" fill="#93A3BC" fontSize="9.5" fontFamily="JetBrains Mono, monospace">
        {sub}
      </text>
    </motion.g>
  )
}

export default function DecisionLane({ className = '' }) {
  return (
    <div className={`glass relative overflow-hidden p-4 sm:p-6 ${className}`}>
      {/* scanline atmosphere */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-electric/10 to-transparent animate-scan" aria-hidden />

      <div className="flex items-center justify-between pb-3">
        <p className="telemetry">Live decision lane · simulated</p>
        <p className="hidden sm:flex items-center gap-4 font-mono text-[10px] text-slatemute">
          <span className="flex items-center gap-1.5"><i className="h-1.5 w-1.5 rounded-full bg-verify inline-block" /> auto</span>
          <span className="flex items-center gap-1.5"><i className="h-1.5 w-1.5 rounded-full bg-review inline-block" /> human review</span>
        </p>
      </div>

      <svg viewBox="0 0 780 240" role="img" aria-label="Tasks flow from AI agents through the Crelis trust gate; safe tasks auto-execute while risky tasks detour through human review, all recorded in the audit trail." className="w-full">
        {/* faint grid */}
        <defs>
          <pattern id="dl-grid" width="26" height="26" patternUnits="userSpaceOnUse">
            <path d="M 26 0 L 0 0 0 26" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="780" height="240" fill="url(#dl-grid)" />

        {/* lanes */}
        <path d={LANE.straight} fill="none" stroke="#34D399" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="6 6" className="animate-dash" />
        <path d={LANE.detour} fill="none" stroke="#FBBF24" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="6 6" className="animate-dash" />

        {/* trust gate band */}
        <rect x="395" y="40" width="50" height="180" rx="10" fill="#3D7BFF" opacity="0.07" />
        <rect x="395" y="40" width="50" height="180" rx="10" fill="none" stroke="#3D7BFF" strokeOpacity="0.35" strokeWidth="1" />

        {/* moving tasks */}
        <TaskDot path={LANE.straight} color="#34D399" dur={5} delay={0} />
        <TaskDot path={LANE.straight} color="#34D399" dur={5} delay={1.7} />
        <TaskDot path={LANE.straight} color="#34D399" dur={5} delay={3.4} />
        <TaskDot path={LANE.detour} color="#FBBF24" dur={7} delay={0.8} />
        <TaskDot path={LANE.detour} color="#FBBF24" dur={7} delay={4.2} />

        {/* nodes */}
        <Node x={90} y={150} icon={Bot} label="AI agents" sub="propose actions" color="#3D7BFF" delay={0.1} />
        <Node x={420} y={150} icon={ShieldCheck} label="Trust gate" sub="risk · confidence" color="#3D7BFF" delay={0.25} />
        <Node x={450} y={70} icon={UserCheck} label="Human review" sub="verified expert" color="#FBBF24" delay={0.4} />
        <Node x={690} y={150} icon={ScrollText} label="Audit trail" sub="sealed record" color="#34D399" delay={0.55} />
      </svg>
    </div>
  )
}
