/* Global Crelis watermark — a faint, repeating brand mark sitting behind all
   page content, giving the site a "secured / watermarked" feel. Purely
   decorative (aria-hidden, pointer-events-none) and very low opacity so it
   never competes with content. */

// A single Crelis mark (rounded tile + inner core) as a tileable SVG, URL-encoded.
const TILE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='176' height='176' viewBox='0 0 176 176'%3E%3Cg fill='none' stroke='%233D7BFF' stroke-width='2'%3E%3Crect x='42' y='42' width='92' height='92' rx='24'/%3E%3Crect x='74' y='74' width='28' height='28' rx='8'/%3E%3C/g%3E%3C/svg%3E"

export default function Watermark() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* repeating mark texture */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{ backgroundImage: `url("${TILE}")`, backgroundSize: '176px 176px' }}
      />
      {/* large ghost mark, centered */}
      <div className="absolute left-1/2 top-1/2 h-[min(72vmin,640px)] w-[min(72vmin,640px)] -translate-x-1/2 -translate-y-1/2 opacity-[0.04]">
        <div className="h-full w-full rounded-[22%] border-2 border-electric" />
        <div className="absolute left-1/2 top-1/2 h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-[20%] border-2 border-electric" />
      </div>
      {/* keep the edges dark and the center readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(5,7,13,0.6))]" />
    </div>
  )
}
