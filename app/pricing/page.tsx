import Navigation from '../components/Navigation'
import Pricing from '../components/Pricing'
import CTA from '../components/CTA'
import Footer from '../components/Footer'
import Particles from '../components/Particles'

export const metadata = {
  title: 'Pricing — GrowIQ',
  description:
    'Website builds from $1,500 one-time. Monthly plans: Foundation $197/mo, Growth $497/mo, Scale $997/mo. Month to month, no long-term contract.',
}

export default function PricingPage() {
  return (
    <>
      <Particles />
      <Navigation />
      <main style={{ paddingTop: 80 }}>
        <Pricing />
      </main>
      <CTA />
      <Footer />
    </>
  )
}
