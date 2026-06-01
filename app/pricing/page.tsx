import Navigation from '../components/Navigation'
import Pricing from '../components/Pricing'
import CTA from '../components/CTA'
import Footer from '../components/Footer'
import Particles from '../components/Particles'

export const metadata = {
  title: 'Pricing — GrowIQ',
  description:
    'Foundation starting at $3,500. Foundation Care from $500/mo. Growth Partner from $1,500/mo. Custom AI Systems scoped per business.',
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
