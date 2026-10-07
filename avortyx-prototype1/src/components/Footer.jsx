import Logo from './Logo';
const cols = [
  { title: 'Product', links: [['Live monitor', '#live'], ['Routing rules', '#platform'], ['Marketplace', '#platform'], ['Pricing', '#pricing']] },
  { title: 'Resources', links: [['Documentation', '#docs'], ['API reference', '#docs'], ['Webhooks', '#docs'], ['Status', '#docs']] },
  { title: 'Company', links: [['About', '#top'], ['Customers', '#customers'], ['Careers', '#top'], ['Contact', 'mailto:team@avortyx.com']] },
  { title: 'Legal', links: [['Privacy', '#top'], ['Terms', '#top'], ['TCPA', '#faq'], ['Security', '#top']] },
];

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-white/10 bg-[#060b1b] px-6 py-16 lg:px-10">
      <div id="docs" className="mx-auto grid max-w-[1320px] gap-12 md:grid-cols-[1.6fr_repeat(4,1fr)]">
        <div>
          <div className="flex items-center gap-3 font-semibold tracking-[.18em]">
            <Logo size={34} /> AVORTYX
          </div>
          <p className="mt-6 max-w-xs text-sm leading-7 text-muted">Real-time call scoring, routing and analytics for pay-per-call networks.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="mono border border-cyan/30 px-3 py-2 text-cyan">Illustrative demo</span>
            <span className="mono border border-emerald/30 px-3 py-2 text-emerald">No live traffic</span>
          </div>
          <div className="mono mt-6 flex gap-5 text-muted">
            <a href="#top" className="hover:text-white">Telegram</a>
            <a href="#top" className="hover:text-white">X</a>
            <a href="#top" className="hover:text-white">LinkedIn</a>
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="mono mb-5 text-white/50">{c.title}</div>
            {c.links.map(([label, href]) => (
              <a key={label} href={href} className="mb-3 block text-sm text-muted hover:text-white">{label}</a>
            ))}
          </div>
        ))}
      </div>
      <div className="mx-auto mt-16 flex max-w-[1320px] flex-col justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
        <span className="mono text-muted">© 2026 Avortyx</span>
        <span className="mono text-muted">Pay-per-call intelligence platform</span>
      </div>
    </footer>
  );
}
