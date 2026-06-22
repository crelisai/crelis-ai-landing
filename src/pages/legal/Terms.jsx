import { Reveal } from '../../components/ui/Primitives.jsx'

function H({ children }) { return <h2 className="mt-10 font-display text-xl font-semibold text-white">{children}</h2> }
function P({ children }) { return <p className="mt-3 text-sm leading-relaxed text-slatemute">{children}</p> }

export default function Terms() {
  return (
    <section className="pt-28 sm:pt-36 pb-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow mb-3">Legal</p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-gradient">Terms of Service</h1>
          <p className="mt-3 font-mono text-xs text-slatemute">Last updated: 2026 · Crelis.ai, Singapore</p>

          <P>These Terms govern your access to and use of the Crelis.ai website and any related materials and demonstrations (the “Services”). By using the Services, you agree to these Terms.</P>

          <H>1. Use of the Services</H>
          <P>You may use the Services for lawful, informational, and evaluation purposes. You agree not to misuse the Services, interfere with their operation, attempt unauthorized access, or use them to build a competing product.</P>

          <H>2. Eligibility &amp; accounts</H>
          <P>Where access to a demo or pilot environment is provided, you are responsible for safeguarding your credentials and for activity under your account, and you will use such environments only for evaluation.</P>

          <H>3. Intellectual property</H>
          <P>The Services, including all software, content, designs, and trademarks, are owned by Crelis or its licensors. No rights are granted except the limited right to access the Services as described here.</P>

          <H>4. Demonstrations &amp; pilots</H>
          <P>Demos and pilots are provided for evaluation and may change or be withdrawn at any time. They are not intended for production reliance and may not reflect final functionality.</P>

          <H>5. No warranties</H>
          <P>The Services are provided “as is” and “as available,” without warranties of any kind, whether express or implied, including merchantability, fitness for a particular purpose, and non-infringement. Crelis does not warrant that the Services will be uninterrupted or error-free.</P>

          <H>6. Limitation of liability</H>
          <P>To the maximum extent permitted by law, Crelis will not be liable for any indirect, incidental, special, or consequential damages, or loss of profits or data, arising from your use of the Services.</P>

          <H>7. Indemnity</H>
          <P>You agree to indemnify Crelis against claims arising from your misuse of the Services or breach of these Terms.</P>

          <H>8. Governing law</H>
          <P>These Terms are governed by the laws of Singapore, and the courts of Singapore have exclusive jurisdiction over any dispute.</P>

          <H>9. Changes</H>
          <P>We may update these Terms from time to time; continued use of the Services constitutes acceptance of the updated Terms.</P>

          <H>10. Contact</H>
          <P>Questions about these Terms: <a href="mailto:crelisai@outlook.com" className="text-electric hover:underline">crelisai@outlook.com</a>.</P>
        </Reveal>
      </div>
    </section>
  )
}
