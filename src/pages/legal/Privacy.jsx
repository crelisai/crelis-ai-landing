import { Reveal } from '../../components/ui/Primitives.jsx'

function H({ children }) { return <h2 className="mt-10 font-display text-xl font-semibold text-white">{children}</h2> }
function P({ children }) { return <p className="mt-3 text-sm leading-relaxed text-slatemute">{children}</p> }
function LI({ children }) { return <li className="text-sm leading-relaxed text-slatemute">{children}</li> }

export default function Privacy() {
  return (
    <section className="pt-28 sm:pt-36 pb-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow mb-3">Legal</p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-gradient">Privacy Policy</h1>
          <p className="mt-3 font-mono text-xs text-slatemute">Last updated: 2026 · Crelis.ai, Singapore</p>

          <P>This Privacy Policy explains how Crelis.ai (“Crelis”, “we”) handles information in connection with our website and our AI governance services. We are based in Singapore and aim to handle personal data in line with the Singapore Personal Data Protection Act (PDPA).</P>

          <H>1. Information we collect</H>
          <P>From our website, we may collect: information you submit when you contact us (such as your name, email, company, and message); and limited technical and usage data (such as IP address, browser type, and pages visited) via cookies and basic analytics.</P>

          <H>2. How we use information</H>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <LI>To respond to enquiries and operate the design-partner program.</LI>
            <LI>To provide, maintain, and improve our website and services.</LI>
            <LI>To send you information you’ve requested.</LI>
            <LI>To comply with legal obligations.</LI>
          </ul>

          <H>3. Product data — no raw customer PII</H>
          <P>The Crelis governance platform is designed to operate on decision metadata — action types, results, and policy outcomes — and not on raw end-customer personal data. In pilot and customer deployments, the customer controls their environment and data; where a separate data-processing arrangement is required, it is documented separately.</P>

          <H>4. Cookies</H>
          <P>We use essential cookies to run the site and may use analytics cookies to understand usage. You can control cookies through your browser settings.</P>

          <H>5. Sharing</H>
          <P>We do not sell personal data. We may share information with service providers who help us operate the website and communications, under appropriate confidentiality obligations, and where required by law.</P>

          <H>6. Retention</H>
          <P>We retain personal data only as long as necessary for the purposes described here or as required by law, after which it is deleted or anonymized.</P>

          <H>7. Your rights (PDPA)</H>
          <P>Subject to applicable law, you may request access to or correction of your personal data, or withdraw consent to its use. To make a request, contact us at the address below.</P>

          <H>8. International transfers</H>
          <P>Where data is processed outside Singapore by our service providers, we take reasonable steps to ensure a comparable standard of protection.</P>

          <H>9. Security</H>
          <P>We use reasonable technical and organizational measures to protect personal data, including encryption in transit. No method of transmission or storage is completely secure.</P>

          <H>10. Contact &amp; Data Protection</H>
          <P>For privacy questions or PDPA requests, contact our data protection contact at <a href="mailto:support@crelis.ai" className="text-electric hover:underline">support@crelis.ai</a> or +65 8110 8085.</P>

          <H>11. Changes</H>
          <P>We may update this policy from time to time. The “last updated” date above reflects the latest version.</P>
        </Reveal>
      </div>
    </section>
  )
}
