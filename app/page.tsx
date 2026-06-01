import Navigation from './components/Navigation'
import Hero from './components/Hero'
import LogoBar from './components/LogoBar'
import Services from './components/Services'
import AIAgents from './components/AIAgents'
import CommandCenter from './components/CommandCenter'
import HowItWorks from './components/HowItWorks'
import Results from './components/Results'
import CaseStudy from './components/CaseStudy'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Particles from './components/Particles'

export default function Home() {
  return (
    <>
      <Particles />
      <Navigation />
      <Hero />
      <LogoBar />
      <Services />
      <AIAgents />
      <CommandCenter />
      <HowItWorks />
      <Results />
      <CaseStudy />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </>
  )
}
