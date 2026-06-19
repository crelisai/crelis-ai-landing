import { CONTROL_PLANE } from '../../data/mock.js'
import { StatusDot } from '../ui/Primitives.jsx'
import { ChromeDots } from './Console.jsx'
import DecisionLane from './DecisionLane.jsx'
import { AuditTimeline } from './Flows.jsx'
import { GovernanceDashboard } from './Dashboards.jsx'

/* ============================================================================
   ENTERPRISE CONTROL PLANE — the homepage signature.
   A single live operations console framing the three pillars of the product:
     • Decision lane     — agent actions routed through the trust gate (live)
     • Governance        — org-wide metrics + open exceptions (ticking)
     • Audit event stream — tamper-evident log streaming in real time
   Each panel self-gates on visibility + reduced-motion. No images.
   ========================================================================= */
export default function ControlPlane({ className = '' }) {
  return (
    <div className={`relative ${className}`}>
      {/* ambient command-center glow */}
      <div className="pointer-events-none absolute -inset-x-6 -top-10 h-44 rounded-full bg-electric/10 blur-[110px]" aria-hidden />

      <div className="relative space-y-3 sm:space-y-4">
        {/* chrome bar */}
        <div className="relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl border border-electric/30 bg-gradient-to-r from-electric/[0.16] via-panel2/60 to-cyan/[0.10] px-4 py-2.5 backdrop-blur-xl shadow-[0_0_34px_-12px_rgba(61,123,255,0.65)] sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <ChromeDots />
            <p className="telemetry truncate text-white/90">Crelis control plane</p>
          </div>
          <div className="hidden items-center gap-3 font-mono text-[10px] text-slatemute sm:flex">
            <span className="flex items-center gap-1.5"><StatusDot state="verify" pulse /> {CONTROL_PLANE.env}</span>
            <span className="text-white/25">·</span>
            <span>{CONTROL_PLANE.region}</span>
            <span className="text-white/25">·</span>
            <span>{CONTROL_PLANE.build}</span>
          </div>
        </div>

        {/* signature live decision flow */}
        <DecisionLane />

        {/* governance + audit stream */}
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-5">
          <GovernanceDashboard className="lg:col-span-3" />
          <AuditTimeline className="lg:col-span-2" />
        </div>
      </div>
    </div>
  )
}
