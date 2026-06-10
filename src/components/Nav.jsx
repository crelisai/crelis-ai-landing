import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Logo } from './ui/Primitives.jsx'

const LINKS = [
  { label: 'Trust Layer', to: '/trust-layer' },
  { label: 'Marketplace', to: '/marketplace' },
  { label: 'Use Cases', to: '/use-cases' },
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
              className="inline-flex items-center gap-1.5 rounded-lg bg-electric px-4 py-2 text-sm font-medium text-white shadow-glow transition hover:-translate-y-0.5"
            >
              Request demo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            className="md:hidden grid h-9 w-9 place-items-center rounded-lg border border-hairline text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
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
                className="rounded-lg px-3 py-2.5 text-sm text-slatemute hover:bg-panel hover:text-white"
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/demo"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-electric px-4 py-2.5 text-sm font-medium text-white"
            >
              Request demo <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
