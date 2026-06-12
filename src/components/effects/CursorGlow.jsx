import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/* ============================================================================
   CURSOR GLOW — a soft electric halo that trails the pointer.
   • rAF-throttled, transform-only (no layout, no paint storms)
   • renders only on fine pointers (desktop) — never on touch
   • disabled entirely under prefers-reduced-motion
   ========================================================================= */
export default function CursorGlow() {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return undefined
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) return undefined
    let raf = 0
    const onMove = (e) => {
      if (raf) return
      const { clientX, clientY } = e
      raf = requestAnimationFrame(() => {
        raf = 0
        if (ref.current) {
          ref.current.style.transform = `translate3d(${clientX - 280}px, ${clientY - 280}px, 0)`
          ref.current.style.opacity = '1'
        }
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduce])

  if (reduce) return null
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[560px] w-[560px] rounded-full opacity-0 mix-blend-screen transition-opacity duration-700 lg:block"
      style={{
        transform: 'translate3d(-600px, -600px, 0)',
        background: 'radial-gradient(circle, rgba(61,123,255,0.14) 0%, rgba(34,211,238,0.05) 38%, transparent 65%)',
      }}
    />
  )
}
