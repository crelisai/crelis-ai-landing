import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Clock, ShieldCheck, Check } from 'lucide-react'
import { REVIEWERS, REVIEWER_SECTORS } from '../../data/mock.js'

/* ============================================================================
   REVIEWER MARKETPLACE — filterable, interactive cards.
   Filters by sector; cards show role, expertise, availability, average review
   time, and trust clearance. Hover lifts + glows; click selects (highlighted
   ring). Layout animates between filters (skipped under reduced motion).
   Illustrative reviewer pool — mock data, no real individuals.
   ========================================================================= */

const FILTERS = ['All', ...REVIEWER_SECTORS]

function Avail({ status }) {
  const online = status === 'online'
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`relative inline-flex h-2 w-2`}>
        {online && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verify opacity-60" />}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${online ? 'bg-verify' : 'bg-review'}`} />
      </span>
      <span className={online ? 'text-verify' : 'text-review'}>{online ? 'Online' : 'Busy'}</span>
    </span>
  )
}

function ReviewerCard({ r, selected, onSelect, reduce }) {
  return (
    <motion.button
      type="button"
      layout={!reduce}
      onClick={() => onSelect(selected ? null : r.id)}
      aria-pressed={selected}
      aria-label={`${r.role}, ${r.sector}. Availability ${r.status === 'online' ? 'online' : 'busy'}, average review ${r.avgReview}, clearance ${r.clearance}. ${selected ? 'Selected.' : 'Select reviewer.'}`}
      className={`glass group relative w-full p-5 text-left outline-none transition duration-300 hover:-translate-y-1 hover:border-electric/40 hover:shadow-glow focus-visible:border-electric/60 ${
        selected ? 'border-electric/70 shadow-glow' : ''
      }`}
    >
      {selected && (
        <span className="absolute right-4 top-4 grid h-6 w-6 place-items-center rounded-full bg-electric text-white" aria-hidden>
          <Check className="h-3.5 w-3.5" />
        </span>
      )}
      <p className="telemetry">{r.sector}</p>
      <h3 className="mt-2 font-display text-base font-semibold text-white">{r.role}</h3>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {r.expertise.map((e) => (
          <span key={e} className="rounded-md border border-hairline bg-panel px-2 py-0.5 font-mono text-[10px] text-slatemute">
            {e}
          </span>
        ))}
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-hairline pt-4 text-xs">
        <div>
          <dt className="telemetry mb-1">Availability</dt>
          <dd><Avail status={r.status} /></dd>
        </div>
        <div>
          <dt className="telemetry mb-1">Avg review</dt>
          <dd className="inline-flex items-center gap-1.5 text-white"><Clock className="h-3.5 w-3.5 text-slatemute" aria-hidden />{r.avgReview}</dd>
        </div>
        <div className="col-span-2">
          <dt className="telemetry mb-1">Trust clearance</dt>
          <dd className="inline-flex items-center gap-1.5 text-verify"><ShieldCheck className="h-3.5 w-3.5" aria-hidden />{r.clearance}</dd>
        </div>
      </dl>
    </motion.button>
  )
}

export default function ReviewerMarketplace({ className = '' }) {
  const reduce = useReducedMotion()
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const shown = filter === 'All' ? REVIEWERS : REVIEWERS.filter((r) => r.sector === filter)

  return (
    <div className={className}>
      {/* filters */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter reviewers by sector">
        {FILTERS.map((f) => {
          const on = filter === f
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={on}
              className={`min-h-[40px] rounded-lg border px-4 text-sm font-medium transition ${
                on ? 'border-electric/50 bg-electric/15 text-electric' : 'border-hairline bg-panel/50 text-slatemute hover:border-electric/30 hover:text-white'
              }`}
            >
              {f}
            </button>
          )
        })}
      </div>

      {/* cards */}
      <motion.div layout={!reduce} className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((r) => (
          <ReviewerCard key={r.id} r={r} selected={selected === r.id} onSelect={setSelected} reduce={reduce} />
        ))}
      </motion.div>

      <p className="mt-4 font-mono text-[11px] text-slatemute">
        Illustrative reviewer pool · {shown.length} shown{filter !== 'All' ? ` · ${filter}` : ''}
      </p>
    </div>
  )
}
