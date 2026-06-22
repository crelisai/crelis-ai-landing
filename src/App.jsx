import { useEffect } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import StickyMobileCTA from './components/StickyMobileCTA.jsx'
import Watermark from './components/Watermark.jsx'
import Home from './pages/Home.jsx'
import TrustLayer from './pages/TrustLayer.jsx'
import Marketplace from './pages/Marketplace.jsx'
import UseCases from './pages/UseCases.jsx'
import ProblemDepth from './pages/ProblemDepth.jsx'
import About from './pages/About.jsx'
import Demo from './pages/Demo.jsx'
import Security from './pages/Security.jsx'
import DesignPartners from './pages/DesignPartners.jsx'
import Contact from './pages/Contact.jsx'
import Privacy from './pages/legal/Privacy.jsx'
import Terms from './pages/legal/Terms.jsx'
import ResponsibleDisclosure from './pages/legal/ResponsibleDisclosure.jsx'

/* Scroll to top on route change */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function NotFound() {
  return (
    <section className="pt-40 pb-28 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-gradient">Page not found</h1>
      <p className="mt-4 text-slatemute">This route isn't governed by Crelis — yet.</p>
      <Link to="/" className="mt-8 inline-block rounded-lg bg-electric px-5 py-3 text-sm font-medium text-white shadow-glow">
        Back to home
      </Link>
    </section>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-ink pb-[76px] md:pb-0">
      <Watermark />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-electric focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <Nav />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trust-layer" element={<TrustLayer />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/use-cases/problem" element={<ProblemDepth />} />
          <Route path="/about" element={<About />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/security" element={<Security />} />
          <Route path="/design-partners" element={<DesignPartners />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal/privacy" element={<Privacy />} />
          <Route path="/legal/terms" element={<Terms />} />
          <Route path="/legal/responsible-disclosure" element={<ResponsibleDisclosure />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  )
}
