import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'
import { Logo } from './ui/Primitives.jsx'

/* Each link is internal (to) or external (href). */
const COLS = [
  {
    head: 'Platform',
    links: [
      { label: 'AI Trust Layer', to: '/trust-layer' },
      { label: 'Human Marketplace', to: '/marketplace' },
      { label: 'Use Cases', to: '/use-cases' },
      { label: 'Live Demo', href: 'https://demo.crelis.ai', external: true },
    ],
  },
  {
    head: 'Trust & Resources',
    links: [
      { label: 'Security & Trust', to: '/security' },
      { label: 'Design Partner Program', to: '/design-partners' },
      { label: 'Responsible Disclosure', to: '/legal/responsible-disclosure' },
    ],
  },
  {
    head: 'Company',
    links: [
      { label: 'About Crelis', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Request a Demo', to: '/demo' },
    ],
  },
  {
    head: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/legal/privacy' },
      { label: 'Terms of Service', to: '/legal/terms' },
    ],
  },
]

function FootLink({ link }) {
  const cls = 'text-sm text-slatemute hover:text-white transition-colors'
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {link.label}
      </a>
    )
  }
  return (
    <Link to={link.to} className={cls}>
      {link.label}
    </Link>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Identity + contact */}
          <div className="lg:col-span-4">
            <Link to="/" aria-label="Crelis.ai home">
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-slatemute leading-relaxed">
              The trust layer for agentic AI. AI executes. Crelis governs. Humans intervene when trust matters.
            </p>
            <ul className="mt-5 space-y-2.5">
              <li>
                <a href="mailto:crelisai@outlook.com" className="inline-flex items-center gap-2 text-sm text-slatemute hover:text-white transition-colors">
                  <Mail className="h-4 w-4 text-electric" aria-hidden /> crelisai@outlook.com
                </a>
              </li>
              <li>
                <a href="tel:+6581108085" className="inline-flex items-center gap-2 text-sm text-slatemute hover:text-white transition-colors">
                  <Phone className="h-4 w-4 text-electric" aria-hidden /> +65 8110 8085
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-sm text-slatemute">
                <MapPin className="h-4 w-4 text-electric" aria-hidden /> Singapore
              </li>
            </ul>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {COLS.map((c) => (
              <div key={c.head}>
                <p className="telemetry mb-4">{c.head}</p>
                <ul className="space-y-2.5">
                  {c.links.map((l) => (
                    <li key={(l.to || l.href) + l.label}>
                      <FootLink link={l} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Utility bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-slatemute">© {year} Crelis.ai · Singapore — all rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/legal/privacy" className="font-mono text-xs text-slatemute hover:text-white transition-colors">Privacy</Link>
            <Link to="/legal/terms" className="font-mono text-xs text-slatemute hover:text-white transition-colors">Terms</Link>
            <Link to="/security" className="font-mono text-xs text-slatemute hover:text-white transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
