import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

/* ── Trust-state color language (used everywhere) ──────────────────────────
   ai = electric blue · review = amber · verify = green · block = rose      */
export const STATE = {
  ai: { dot: 'bg-electric', text: 'text-electric', ring: 'border-electric/40', soft: 'bg-electric/10', hex: '#3D7BFF' },
  review: { dot: 'bg-review', text: 'text-review', ring: 'border-review/40', soft: 'bg-review/10', hex: '#FBBF24' },
  verify: { dot: 'bg-verify', text: 'text-verify', ring: 'border-verify/40', soft: 'bg-verify/10', hex: '#34D399' },
  block: { dot: 'bg-block', text: 'text-block', ring: 'border-block/40', soft: 'bg-block/10', hex: '#FB7185' },
}

export function StatusDot({ state = 'ai', pulse = false, className = '' }) {
  return (
    <span className={`relative inline-flex h-2 w-2 ${className}`}>
      {pulse && (
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${STATE[state].dot}`} />
      )}
      <span className={`relative inline-flex h-2 w-2 rounded-full ${STATE[state].dot}`} />
    </span>
  )
}

/* ── Scroll reveal wrapper ─────────────────────────────────────────────── */
export function Reveal({ children, delay = 0, className = '', y = 18 }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ── Section scaffold ──────────────────────────────────────────────────── */
export function Section({ id, children, className = '', bordered = true }) {
  return (
    <section id={id} className={`${bordered ? 'border-t border-hairline' : ''} py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">{children}</div>
    </section>
  )
}

export function SectionHead({ eyebrow, title, sub, center = false }) {
  return (
    <Reveal className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-gradient">{title}</h2>
      {sub && <p className="mt-4 text-slatemute leading-relaxed">{sub}</p>}
    </Reveal>
  )
}

/* ── Glass card with optional glow on hover ────────────────────────────── */
export function GlowCard({ children, className = '', as: Tag = 'div' }) {
  return (
    <Tag className={`glass p-6 transition duration-300 hover:border-electric/30 hover:shadow-glow ${className}`}>
      {children}
    </Tag>
  )
}

/* ── CTA buttons ───────────────────────────────────────────────────────── */
export function PrimaryCTA({ to = '/demo', children = 'Request demo', className = '' }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 rounded-lg bg-electric px-5 py-3 text-sm font-medium text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-electric/90 ${className}`}
    >
      {children} <ArrowRight className="h-4 w-4" />
    </Link>
  )
}

export function GhostCTA({ to, children, className = '' }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 rounded-lg border border-hairline bg-panel/60 px-5 py-3 text-sm font-medium text-white transition hover:border-electric/40 hover:bg-panel ${className}`}
    >
      {children}
    </Link>
  )
}

/* ── Crelis logo (unchanged brand mark) ────────────────────────────────── */
export function Logo({ size = 'md' }) {
  const box = size === 'lg' ? 'h-9 w-9' : 'h-7 w-7'
  const inner = size === 'lg' ? 'h-3.5 w-3.5' : 'h-2.5 w-2.5'
  const text = size === 'lg' ? 'text-xl' : 'text-lg'
  return (
    <span className="flex items-center gap-2">
      <span className={`grid ${box} place-items-center rounded-md bg-gradient-to-br from-electric to-cyan shadow-glow`}>
        <span className={`${inner} rounded-sm bg-ink`} />
      </span>
      <span className={`font-display ${text} font-semibold tracking-tight text-white`}>
        Crelis<span className="text-electric">.ai</span>
      </span>
    </span>
  )
}
