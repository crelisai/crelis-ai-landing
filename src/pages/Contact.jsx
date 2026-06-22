import { Reveal, Section, GlowCard } from '../components/ui/Primitives.jsx'
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react'

const CHANNELS = [
  { icon: Mail, label: 'Email', value: 'crelisai@outlook.com', href: 'mailto:crelisai@outlook.com' },
  { icon: Phone, label: 'Phone', value: '+65 8110 8085', href: 'tel:+6581108085' },
  { icon: MapPin, label: 'Location', value: 'Singapore', href: null },
]

const TOPICS = [
  { label: 'Design partner pilot', subject: 'Design Partner Pilot — [Company]' },
  { label: 'Security review', subject: 'Security review' },
  { label: 'Investor enquiry', subject: 'Investor enquiry' },
  { label: 'General enquiry', subject: 'General enquiry' },
]

export default function Contact() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-36 pb-10">
        <div className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:42px_42px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow mb-3">Contact</p>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl text-gradient">Let’s talk</h1>
            <p className="mt-5 max-w-2xl text-slatemute leading-relaxed">
              Whether you’re piloting AI agents, running a security review, or exploring investment — reach out. We typically reply within two business days.
            </p>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          {CHANNELS.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.08}>
              <GlowCard className="h-full">
                <c.icon className="h-6 w-6 text-electric" aria-hidden />
                <p className="telemetry mt-3">{c.label}</p>
                {c.href ? (
                  <a href={c.href} className="mt-1 inline-block font-display text-lg font-semibold text-white hover:text-electric transition-colors">{c.value}</a>
                ) : (
                  <p className="mt-1 font-display text-lg font-semibold text-white">{c.value}</p>
                )}
              </GlowCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <GlowCard>
            <p className="telemetry mb-4">What’s your enquiry about?</p>
            <div className="flex flex-wrap gap-3">
              {TOPICS.map((t) => (
                <a
                  key={t.label}
                  href={`mailto:crelisai@outlook.com?subject=${encodeURIComponent(t.subject)}`}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-hairline bg-panel/60 px-4 text-sm font-medium text-white transition hover:border-electric/40 hover:bg-panel"
                >
                  {t.label} <ArrowRight className="h-4 w-4 text-electric" aria-hidden />
                </a>
              ))}
            </div>
            <p className="mt-5 text-sm text-slatemute">
              Prefer the product first? Explore the{' '}
              <a href="https://demo.crelis.ai" target="_blank" rel="noopener noreferrer" className="text-electric hover:underline">live demo</a>.
            </p>
          </GlowCard>
        </Reveal>
      </Section>
    </>
  )
}
