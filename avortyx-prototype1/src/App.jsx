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
import Effects from './components/Effects';
import Story from './components/Story';
import Demo from './components/Demo';
import CommandPalette from './components/CommandPalette';
import StickyCTA from './components/StickyCTA';
import ChatAssistant from './components/ChatAssistant';
import ModalHost from './components/ModalHost';
import { useReveal } from './hooks';

export default function App() {
  useReveal();
  return (
    <ModalHost>
    <div className="min-h-screen overflow-x-clip bg-ground">
      <Intro />
      <Effects />
      <CommandPalette />
      <StickyCTA />
      <ChatAssistant />
      <Header />
      <main id="top">
        <Hero />
        <Trusted />
        <Capabilities />
        <Story />
        <Platform />
        <HowItWorks />
        <Demo />
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
    </ModalHost>
  );
}
