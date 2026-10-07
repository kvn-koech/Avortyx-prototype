import Intro from './components/Intro';
import Header from './components/Header';
import Hero from './components/Hero';
import Trusted from './components/Trusted';
import Capabilities from './components/Capabilities';
import Platform from './components/Platform';
import HowItWorks from './components/HowItWorks';
import Dashboard from './components/Dashboard';
import LiveRouting from './components/LiveRouting';
import Launch from './components/Launch';
import Performance from './components/Performance';
import Testimonials from './components/Testimonials';
import Comparison from './components/Comparison';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import { useReveal } from './hooks';

export default function App() {
  useReveal();
  return (
    <div className="min-h-screen overflow-x-hidden bg-ground">
      <Intro />
      <Header />
      <main id="top">
        <Hero />
        <Trusted />
        <Capabilities />
        <Platform />
        <HowItWorks />
        <Dashboard />
        <LiveRouting />
        <Launch />
        <Performance />
        <Testimonials />
        <Comparison />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
