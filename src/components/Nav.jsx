import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Logo } from './ui/Primitives.jsx'

const LINKS = [
  { label: 'Trust Layer', to: '/trust-layer' },
  { label: 'Marketplace', to: '/marketplace' },
  { label: 'Use Cases', to: '/use-cases' },
  { label: 'Design Partners', to: '/design-partners' },
  { label: 'Security', to: '/security' },
  { label: 'About', to: '/about' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  const linkCls = ({ isActive }) =>
    `text-sm transition-colors ${isActive ? 'text-white' : 'text-slatemute hover:text-white'}`

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-hairline bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" aria-label="Crelis.ai home" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkCls}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              to="/demo"
              aria-label="Apply for Pilot Access"
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-electric px-4 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5"
            >
              Apply for Pilot Access <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <button
            className="grid h-11 w-11 place-items-center rounded-lg border border-hairline text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-hairline bg-ink/95 px-5 py-4">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="flex min-h-[48px] items-center rounded-lg px-3 text-sm text-slatemute hover:bg-panel hover:text-white"
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/demo"
              onClick={() => setOpen(false)}
              aria-label="Apply for Pilot Access"
              className="mt-2 inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-lg bg-electric px-4 text-sm font-semibold text-white"
            >
              Apply for Pilot Access <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
