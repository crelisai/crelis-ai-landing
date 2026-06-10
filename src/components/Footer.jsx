import { Link } from 'react-router-dom'
import { Logo } from './ui/Primitives.jsx'

const COLS = [
  {
    head: 'Platform',
    links: [
      { label: 'AI Trust Layer', to: '/trust-layer' },
      { label: 'Human Marketplace', to: '/marketplace' },
      { label: 'Use Cases', to: '/use-cases' },
    ],
  },
  {
    head: 'Company',
    links: [
      { label: 'About Crelis', to: '/about' },
      { label: 'Request demo', to: '/demo' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link to="/" aria-label="Crelis.ai home">
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-slatemute leading-relaxed">
              The trust layer for agentic AI. AI executes. Crelis governs. Humans intervene when trust matters.
            </p>
          </div>
          {COLS.map((c) => (
            <div key={c.head}>
              <p className="telemetry mb-4">{c.head}</p>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.to + l.label}>
                    <Link to={l.to} className="text-sm text-slatemute hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-slatemute">© {new Date().getFullYear()} Crelis.ai — all rights reserved.</p>
          <p className="font-mono text-xs text-slatemute">Built for trusted AI execution.</p>
        </div>
      </div>
    </footer>
  )
}
