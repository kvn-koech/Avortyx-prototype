import { useEffect, useState } from 'react';
import Logo from './Logo';
import { useModal } from '../modalContext';

export default function Header() {
  const { open } = useModal();
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    if (!menu) return undefined;
    const onKey = (e) => e.key === 'Escape' && setMenu(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menu]);
  const links = [['Live demo', '#demo'], ['Platform', '#platform'], ['How it works', '#how'], ['Live monitor', '#live'], ['Pricing', '#pricing'], ['FAQ', '#faq']];
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#030612]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-6 lg:px-10">
        <a id="nav-brand-link" href="#top" className="flex items-center gap-3 text-[15px] font-medium tracking-[.3em] text-white">
          <Logo size={34} /> AVORTYX
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          <a id="nav-demo-nav-link" href="#demo" className="text-[13px] font-medium text-slate-300 transition-colors duration-300 hover:text-white">Live demo</a>
          <a id="nav-platform-link" href="#platform" className="text-[13px] font-medium text-slate-300 transition-colors duration-300 hover:text-white">Platform</a>
          <a id="nav-how-link" href="#how" className="text-[13px] font-medium text-slate-300 transition-colors duration-300 hover:text-white">How it works</a>
          <a id="nav-live-link" href="#live" className="text-[13px] font-medium text-slate-300 transition-colors duration-300 hover:text-white">Live monitor</a>
          <a id="nav-pricing-link" href="#pricing" className="text-[13px] font-medium text-slate-300 transition-colors duration-300 hover:text-white">Pricing</a>
          <a id="nav-faq-link" href="#faq" className="text-[13px] font-medium text-slate-300 transition-colors duration-300 hover:text-white">FAQ</a>
        </nav>
        <div className="flex items-center gap-4">
          <button type="button" aria-label="Open command palette" onClick={() => window.dispatchEvent(new Event('avortyx:palette'))} className="hidden items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[13px] font-normal text-slate-400 transition hover:bg-white/10 hover:text-white xl:flex">
            Search <span className="mono text-white/40">⌘K</span>
          </button>
          <button type="button" id="nav-demo-link" onClick={() => open('demo')} className="hidden rounded-full border border-white/20 px-5 py-2.5 text-[13px] font-medium transition hover:bg-white hover:text-black sm:inline-flex">
            Book a demo
          </button>
          <button type="button" id="nav-start-link" onClick={() => open('access')} className="relative overflow-hidden rounded-full p-[1px] shadow-lg shadow-cyan/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo/40 group">
            <span className="absolute inset-0 bg-gradient-to-r from-cyan via-indigo to-purple-500 opacity-80 transition-opacity duration-500 group-hover:opacity-100"></span>
            <span className="relative flex items-center justify-center rounded-full bg-[#030612] px-5 py-2.5 text-[13px] font-medium text-white transition-all duration-500 group-hover:bg-opacity-0 group-hover:text-white">
              Request access
            </span>
          </button>
          <button type="button" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu((x) => !x)} className="grid h-10 w-10 place-items-center rounded-full border border-white/20 transition-colors hover:bg-white/10 lg:hidden">
            <span className="text-lg leading-none">{menu ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>
      {menu && (
        <nav className="border-t border-white/10 bg-[#030612]/95 px-6 pb-6 pt-2 backdrop-blur-md lg:hidden">
          {links.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setMenu(false)} className="block border-b border-white/5 py-4 text-sm font-medium text-slate-300 hover:text-white">
              {l}
            </a>
          ))}
          <button type="button" onClick={() => { setMenu(false); open('demo'); }} className="mt-6 w-full rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium transition hover:bg-white hover:text-black sm:hidden">
            Book a demo
          </button>
        </nav>
      )}
    </header>
  );
}
