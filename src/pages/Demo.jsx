import { useState } from 'react'
import { CircleCheck, Building2, Users, ExternalLink } from 'lucide-react'
import { Reveal, GlowCard } from '../components/ui/Primitives.jsx'

const INTERESTS = [
  { id: 'enterprise', icon: Building2, label: 'Enterprise pilot', desc: 'Deploy the trust layer with your AI agents' },
  { id: 'expert', icon: Users, label: 'Expert network', desc: 'Join the marketplace as a verified reviewer' },
]

const inputCls =
  'w-full rounded-lg border border-hairline bg-panel2/60 px-3.5 py-2.5 text-sm text-white placeholder:text-slatemute/60 focus:border-electric/60 focus:outline-none transition'

export default function Demo() {
  const [sent, setSent] = useState(false)
  const [interest, setInterest] = useState('enterprise')

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36 pb-20">
      <div
        className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:42px_42px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[380px] w-[640px] -translate-x-1/2 rounded-full bg-electric/12 blur-[120px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <p className="eyebrow mb-3">Request demo</p>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl text-gradient">
              See the trust layer on your workflows
            </h1>
            <p className="mt-5 max-w-md text-slatemute leading-relaxed">
              Tell us where your AI agents touch something that matters — money, customers,
              records, infrastructure. We'll show you how Crelis scores, routes, and audits it.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                '30-minute walkthrough with the founding team',
                'Live trust engine demo on a sample workflow',
                'Pilot scoping for design partners',
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-slatemute">
                  <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-verify" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>

            <a
              href="https://demo.crelis.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-lg border border-electric/40 bg-panel2/60 px-5 py-3 text-sm font-medium text-electric transition hover:-translate-y-0.5 hover:border-electric hover:bg-electric/10"
            >
              Launch interactive demo
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </Reveal>

          <Reveal delay={0.12}>
            <GlowCard className="p-6 sm:p-8">
              {sent ? (
                <div className="py-10 text-center">
                  <CircleCheck className="mx-auto h-10 w-10 text-verify" aria-hidden />
                  <h2 className="mt-4 font-display text-xl font-semibold text-white">
                    Request received
                  </h2>
                  <p className="mt-2 text-sm text-slatemute">
                    We'll reply within two business days to schedule your walkthrough.
                  </p>

                  <a
                    href="https://demo.crelis.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-lg border border-electric/40 bg-panel2/60 px-5 py-3 text-sm font-medium text-electric transition hover:-translate-y-0.5 hover:border-electric hover:bg-electric/10"
                  >
                    Open interactive demo
                    <ExternalLink className="h-4 w-4" aria-hidden />
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div role="radiogroup" aria-label="I'm interested in" className="grid gap-3 sm:grid-cols-2">
                    {INTERESTS.map((o) => {
                      const active = interest === o.id
                      return (
                        <button
                          type="button"
                          key={o.id}
                          role="radio"
                          aria-checked={active}
                          onClick={() => setInterest(o.id)}
                          className={`rounded-xl border p-3.5 text-left transition ${
                            active
                              ? 'border-electric/50 bg-electric/10'
                              : 'border-hairline bg-panel2/40 hover:border-electric/30'
                          }`}
                        >
                          <o.icon className={`h-4 w-4 ${active ? 'text-electric' : 'text-slatemute'}`} aria-hidden />
                          <p className="mt-2 text-sm font-medium text-white">{o.label}</p>
                          <p className="mt-0.5 text-xs text-slatemute">{o.desc}</p>
                        </button>
                      )
                    })}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="telemetry mb-1.5 block">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        className={inputCls}
                        placeholder="Jordan Lee"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="telemetry mb-1.5 block">
                        Work email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className={inputCls}
                        placeholder="jordan@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="telemetry mb-1.5 block">
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      autoComplete="organization"
                      className={inputCls}
                      placeholder="Company or organization"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="telemetry mb-1.5 block">
                      Where do your agents need a trust layer?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      className={inputCls}
                      placeholder="e.g. Our support agents issue refunds and we need approval flows above $500…"
                    />
                  </div>

                  <div className="space-y-3">
                    <button
                      type="submit"
                      className="w-full rounded-lg bg-electric px-5 py-3 text-sm font-medium text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-electric/90"
                    >
                      Request demo
                    </button>

                    <a
                      href="https://demo.crelis.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-electric/40 bg-panel2/60 px-5 py-3 text-sm font-medium text-electric transition hover:-translate-y-0.5 hover:border-electric hover:bg-electric/10"
                    >
                      Launch interactive demo
                      <ExternalLink className="h-4 w-4" aria-hidden />
                    </a>
                  </div>

                  <p className="text-center font-mono text-[10px] text-slatemute">
                    Demo form — submissions aren't sent anywhere yet.
                  </p>
                </form>
              )}
            </GlowCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
