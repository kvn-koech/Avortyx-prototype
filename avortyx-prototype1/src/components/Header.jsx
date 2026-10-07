import Logo from './Logo';

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080f25]"><div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-6 lg:px-10"><a id="nav-brand-link" href="#top" className="flex items-center gap-3 text-sm font-semibold tracking-[.18em]"><Logo size={34} /> AVORTYX</a><nav className="hidden items-center gap-7 lg:flex"><a id="nav-platform-link" href="#platform" className="mono text-muted hover:text-white">Platform</a><a id="nav-how-link" href="#how" className="mono text-muted hover:text-white">How it works</a><a id="nav-live-link" href="#live" className="mono text-muted hover:text-white">Live monitor</a><a id="nav-pricing-link" href="#pricing" className="mono text-muted hover:text-white">Pricing</a><a id="nav-faq-link" href="#faq" className="mono text-muted hover:text-white">FAQ</a></nav><div className="flex items-center gap-3"><a id="nav-demo-link" href="#cta" className="hidden rounded-full border border-white/20 px-5 py-3 text-xs sm:inline-flex">Book a demo</a><a id="nav-start-link" href="#cta" className="rounded-full bg-gradient-to-r from-cyan to-indigo px-5 py-3 text-xs font-medium text-[#071226] shadow-lg shadow-cyan/15 transition duration-300 hover:-translate-y-1 hover:shadow-indigo/30">Request access</a></div></div></header>
  );
}
