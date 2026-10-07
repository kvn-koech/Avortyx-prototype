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
  const links = [['Platform', '#platform'], ['How it works', '#how'], ['Live monitor', '#live'], ['Pricing', '#pricing'], ['FAQ', '#faq']];
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080f25]"><div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-6 lg:px-10"><a id="nav-brand-link" href="#top" className="flex items-center gap-3 text-sm font-semibold tracking-[.18em]"><Logo size={34} /> AVORTYX</a><nav className="hidden items-center gap-7 lg:flex"><a id="nav-platform-link" href="#platform" className="mono text-muted hover:text-white">Platform</a><a id="nav-how-link" href="#how" className="mono text-muted hover:text-white">How it works</a><a id="nav-live-link" href="#live" className="mono text-muted hover:text-white">Live monitor</a><a id="nav-pricing-link" href="#pricing" className="mono text-muted hover:text-white">Pricing</a><a id="nav-faq-link" href="#faq" className="mono text-muted hover:text-white">FAQ</a></nav><div className="flex items-center gap-3"><button type="button" id="nav-demo-link" onClick={() => open('demo')} className="hidden rounded-full border border-white/20 px-5 py-3 text-xs transition hover:border-cyan/60 sm:inline-flex">Book a demo</button><button type="button" id="nav-start-link" onClick={() => open('access')} className="rounded-full bg-gradient-to-r from-cyan to-indigo px-5 py-3 text-xs font-medium text-[#071226] shadow-lg shadow-cyan/15 transition duration-300 hover:-translate-y-1 hover:shadow-indigo/30">Request access</button><button type="button" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu((x) => !x)} className="grid h-11 w-11 place-items-center rounded-full border border-white/20 lg:hidden"><span className="text-lg leading-none">{menu ? '✕' : '☰'}</span></button></div></div>{menu && (<nav className="border-t border-white/10 bg-[#080f25] px-6 pb-5 pt-2 lg:hidden">{links.map(([l, h]) => (<a key={h} href={h} onClick={() => setMenu(false)} className="mono block border-b border-white/5 py-4 text-muted hover:text-white">{l}</a>))}<button type="button" onClick={() => { setMenu(false); open('demo'); }} className="mt-4 w-full rounded-full border border-white/20 px-5 py-3 text-sm sm:hidden">Book a demo</button></nav>)}</header>
  );
}
