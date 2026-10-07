import Logo from './Logo';
import { useModal } from '../modalContext';
const cols = [
  { title: 'Product', links: [['Live monitor', '#live'], ['Routing rules', '#platform'], ['Marketplace', '#platform'], ['Pricing', '#pricing']] },
  { title: 'Resources', links: [['Documentation', 'modal:docs'], ['API reference', 'modal:docs'], ['Webhooks', 'modal:docs'], ['Status', 'modal:status']] },
  { title: 'Company', links: [['About', 'modal:about'], ['Customers', '#customers'], ['Careers', 'modal:careers'], ['Contact', 'mailto:team@avortyx.com']] },
  { title: 'Legal', links: [['Privacy', 'modal:privacy'], ['Terms', 'modal:terms'], ['TCPA', '#faq'], ['Security', 'modal:security']] },
];

export default function Footer() {
  const { open } = useModal();
  return (
    <footer id="footer" className="border-t border-white/10 bg-[#030612] px-6 py-20 lg:px-10 lg:py-24">
      <div id="docs" className="mx-auto grid max-w-[1320px] gap-12 md:grid-cols-[1.6fr_repeat(4,1fr)]">
        <div>
          <div className="flex items-center gap-3 font-semibold tracking-[.18em]">
            <Logo size={34} /> AVORTYX
          </div>
          <p className="mt-6 max-w-xs text-[15px] font-normal leading-relaxed text-slate-400">Real-time call scoring, routing and analytics for pay-per-call networks.</p>
          <div className="mono mt-8 flex gap-6 text-slate-400">
            <button type="button" onClick={() => open('social')} className="transition-colors hover:text-white">Telegram</button>
            <button type="button" onClick={() => open('social')} className="transition-colors hover:text-white">X</button>
            <button type="button" onClick={() => open('social')} className="transition-colors hover:text-white">LinkedIn</button>
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="mono mb-6 text-[11px] font-medium text-slate-300">{c.title}</div>
            {c.links.map(([label, href]) => href.startsWith('modal:') ? (
              <button key={label} type="button" onClick={() => open(href.slice(6))} className="mb-4 block text-left text-[14px] font-normal text-slate-400 transition-colors hover:text-white">{label}</button>
            ) : (
              <a key={label} href={href} className="mb-4 block text-[14px] font-normal text-slate-400 transition-colors hover:text-white">{label}</a>
            ))}
          </div>
        ))}
      </div>
      <div className="mx-auto mt-20 flex max-w-[1320px] flex-col justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
        <span className="mono text-slate-400">© 2026 Avortyx</span>
        <span className="mono text-slate-400">Pay-per-call intelligence platform</span>
      </div>
    </footer>
  );
}
