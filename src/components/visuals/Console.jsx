import { useEffect, useId, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { StatusDot } from '../ui/Primitives.jsx'

/* ============================================================================
   CONSOLE — shared "command plane" primitives for the live enterprise visuals.
   Inspired by the chrome of Datadog / Palantir / Linear, rendered in the
   Crelis dark theme. Pure SVG + React. No images, no robots.

   Everything that animates is gated on:
     • prefers-reduced-motion  → renders a meaningful static snapshot
     • on-screen visibility     → loops never run off-screen (perf budget)
   ========================================================================= */

/* ── Hooks ─────────────────────────────────────────────────────────────── */

// setInterval that survives re-renders and pauses when `active` is false.
export function useInterval(callback, delay, active = true) {
  const saved = useRef(callback)
  useEffect(() => { saved.current = callback }, [callback])
  useEffect(() => {
    if (!active || delay == null) return undefined
    const id = setInterval(() => saved.current(), delay)
    return () => clearInterval(id)
  }, [delay, active])
}

// True while the element is in the viewport. Falls back to true if IO missing.
export function useInView(ref, { margin = '0px', threshold = 0.15 } = {}) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (typeof IntersectionObserver === 'undefined') { setInView(true); return undefined }
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: margin, threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, margin, threshold])
  return inView
}

// Convenience: should live motion run? (in view AND motion allowed)
export function useLive(ref) {
  const reduce = useReducedMotion()
  const inView = useInView(ref)
  return inView && !reduce
}

// A counter that drifts upward while `active`, otherwise holds at `start`.
export function useLiveCount(start, { step = 1, jitter = 0, interval = 1600, active = true } = {}) {
  const [value, setValue] = useState(start)
  useInterval(() => {
    setValue((v) => v + step + Math.round((Math.random() - 0.5) * 2 * jitter))
  }, interval, active)
  return value
}

/* ── Number formatting (tabular, no layout shift) ──────────────────────── */
export const fmt = (n) => n.toLocaleString('en-US')
export const tnum = 'font-mono [font-variant-numeric:tabular-nums]'

/* ── Agent node glyph — replaces the generic robot icon ────────────────── */
// An orchestration node: hexagon shell, central core, spokes to peers.
export function AgentGlyph({ className = '', strokeWidth = 1.7, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M12 2.6 19.5 7v10L12 21.4 4.5 17V7z" />
      <circle cx="12" cy="12" r="2.2" />
      <path d="M12 9.8V4.9M12 14.2v4.9M13.9 13.1l3.4 2M10.1 13.1l-3.4 2M13.9 10.9l3.4-2M10.1 10.9 6.7 8.9" />
    </svg>
  )
}

/* ── Panel chrome (Datadog/Linear console card) ────────────────────────── */
export function Panel({
  title,
  status = 'verify',
  env,
  live = true,
  headerRight,
  children,
  className = '',
  bodyClassName = '',
}) {
  return (
    <div className={`glass overflow-hidden ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-2.5 sm:px-5">
        <p className="telemetry flex min-w-0 items-center gap-2">
          <StatusDot state={status} pulse={live} />
          <span className="truncate">{title}</span>
        </p>
        {headerRight ?? (env && (
          <p className={`hidden shrink-0 text-[10px] text-slatemute sm:block ${tnum}`}>{env}</p>
        ))}
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  )
}

/* ── Sparkline (Datadog tile trend) ────────────────────────────────────── */
export function Sparkline({ data, color = '#3D7BFF', w = 88, h = 28, className = '' }) {
  const gid = useId().replace(/:/g, '')
  if (!data || data.length < 2) return null
  const min = Math.min(...data)
  const max = Math.max(...data)
  const span = max - min || 1
  const step = w / (data.length - 1)
  const y = (v) => (h - 3 - ((v - min) / span) * (h - 6)).toFixed(1)
  const pts = data.map((v, i) => `${(i * step).toFixed(1)},${y(v)}`)
  const line = `M ${pts.join(' L ')}`
  const area = `${line} L ${w},${h} L 0,${h} Z`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} className={className} aria-hidden preserveAspectRatio="none">
      <defs>
        <linearGradient id={`spark-${gid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.28" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#spark-${gid})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={(w).toFixed(1)} cy={y(data[data.length - 1])} r="2" fill={color} />
    </svg>
  )
}

/* ── Faux window chrome dots (Linear/Vercel console header) ─────────────── */
export function ChromeDots({ className = '' }) {
  return (
    <span className={`flex items-center gap-1.5 ${className}`} aria-hidden>
      <i className="h-2 w-2 rounded-full bg-block/70" />
      <i className="h-2 w-2 rounded-full bg-review/70" />
      <i className="h-2 w-2 rounded-full bg-verify/70" />
    </span>
  )
}
