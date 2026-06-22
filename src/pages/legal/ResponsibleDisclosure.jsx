import { Reveal } from '../../components/ui/Primitives.jsx'

function H({ children }) { return <h2 className="mt-10 font-display text-xl font-semibold text-white">{children}</h2> }
function P({ children }) { return <p className="mt-3 text-sm leading-relaxed text-slatemute">{children}</p> }
function LI({ children }) { return <li className="text-sm leading-relaxed text-slatemute">{children}</li> }

export default function ResponsibleDisclosure() {
  return (
    <section className="pt-28 sm:pt-36 pb-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow mb-3">Security</p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-gradient">Responsible Disclosure</h1>
          <p className="mt-3 font-mono text-xs text-slatemute">Last updated: 2026 · Crelis.ai, Singapore</p>

          <P>We take security seriously and welcome reports from researchers acting in good faith. If you believe you’ve found a vulnerability in Crelis, please tell us before disclosing it publicly.</P>

          <H>How to report</H>
          <P>Email <a href="mailto:crelisai@outlook.com?subject=Security%20disclosure" className="text-electric hover:underline">crelisai@outlook.com</a> with the subject “Security disclosure”. Please include enough detail to reproduce the issue — affected URL or component, steps, and impact.</P>

          <H>Our commitment</H>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <LI>We aim to acknowledge your report within two business days.</LI>
            <LI>We’ll keep you updated as we investigate and remediate.</LI>
            <LI>We will not pursue legal action against good-faith research that follows this policy.</LI>
          </ul>

          <H>Please do</H>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <LI>Give us reasonable time to fix an issue before any public disclosure.</LI>
            <LI>Avoid privacy violations, data destruction, and service disruption.</LI>
            <LI>Only test against accounts and data you own or are authorized to use.</LI>
          </ul>

          <H>Out of scope</H>
          <P>Findings such as missing best-practice headers without demonstrated impact, volumetric/denial-of-service testing, and social-engineering of staff are generally out of scope.</P>
        </Reveal>
      </div>
    </section>
  )
}
