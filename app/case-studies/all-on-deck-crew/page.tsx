import Navigation from '../../components/Navigation'
import CaseStudy from '../../components/CaseStudy'
import CTA from '../../components/CTA'
import Footer from '../../components/Footer'
import Particles from '../../components/Particles'

export const metadata = {
  title: 'All On Deck Crew — GrowIQ Case Study',
  description:
    'How GrowIQ built a premium website, admin dashboard, and digital foundation for All On Deck Crew.',
}

export default function AllOnDeckCrewCaseStudy() {
  return (
    <>
      <Particles />
      <Navigation />
      <main style={{ paddingTop: 80 }}>
        <CaseStudy />
      </main>
      <CTA />
      <Footer />
    </>
  )
}
