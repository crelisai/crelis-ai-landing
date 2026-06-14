import { Link, useLocation } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

/* Mobile-only sticky CTA. One primary action: Apply for Pilot Access.
   Hidden on the /demo page (where the application already lives). */
export default function StickyMobileCTA() {
  const { pathname } = useLocation()
  if (pathname === '/demo') return null

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-ink/90 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="px-4 py-3">
        <Link
          to="/demo"
          aria-label="Apply for Pilot Access"
          className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-electric text-sm font-semibold text-white shadow-glow"
        >
          Apply for Pilot Access <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  )
}
