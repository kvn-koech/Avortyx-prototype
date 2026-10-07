const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' };

const companies = [
  { name: 'Ringwell', mark: <><circle cx="16" cy="16" r="10" {...S} /><circle cx="16" cy="16" r="4" fill="currentColor" /></> },
  { name: 'Northaven', mark: <path d="M16 4 27 26 16 20 5 26Z" {...S} /> },
  { name: 'Calibr', mark: <><path d="M25 9a11 11 0 1 0 0 14" {...S} /><circle cx="16" cy="16" r="2.5" fill="currentColor" /></> },
  { name: 'Tenpoint', mark: <><path d="M16 4v24M4 16h24M7.5 7.5l17 17M24.5 7.5l-17 17" {...S} /></> },
  { name: 'Meridian', mark: <><circle cx="16" cy="16" r="11" {...S} /><ellipse cx="16" cy="16" rx="4.5" ry="11" {...S} /><path d="M5 16h22" {...S} /></> },
  { name: 'Halcyon', mark: <><path d="M6 24 16 6l10 18" {...S} /><path d="M11 24l5-9 5 9" {...S} /></> },
  { name: 'Bellcast', mark: <><path d="M8 24c0-8 2-14 8-14s8 6 8 14Z" {...S} /><path d="M13 27h6" {...S} /><circle cx="16" cy="6" r="1.8" fill="currentColor" /></> },
  { name: 'Signalfront', mark: <><path d="M6 20a14 14 0 0 1 20 0M10 23.5a8.5 8.5 0 0 1 12 0" {...S} /><circle cx="16" cy="27" r="1.8" fill="currentColor" /></> },
];

export default function Trusted() {
  const row = [...companies, ...companies];
  return (
    <section className="border-t border-white/10 px-6 py-14 lg:px-10">
      <p className="mono mb-8 text-center text-muted">Trusted by performance networks at</p>
      <div className="marquee-wrap mx-auto max-w-[1320px] overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="marquee flex w-max gap-14">
          {row.map((c, i) => (
            <span key={i} className="group flex items-center gap-3 text-xl font-light tracking-tight text-white/55 transition hover:text-white" aria-hidden={i >= companies.length}>
              <svg width="30" height="30" viewBox="0 0 32 32" className="text-cyan transition group-hover:text-indigo">{c.mark}</svg>
              {c.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
