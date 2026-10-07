import CountUp from './CountUp';

const stats = [
  { to: 99.9, d: 1, suffix: '%', label: 'Delivery reliability', c: 'text-indigo' },
  { to: 14.8, d: 1, suffix: 'ms', label: 'Routing latency', c: 'text-cyan' },
  { to: 94.4, d: 1, suffix: '%', label: 'Match win rate', c: 'text-indigo' },
  { to: 24, d: 0, suffix: '/7', label: 'Network observability', c: 'text-cyan' },
];
const quotes = [
  ['Time-to-connect dropped from 9 seconds to under 2.', 'Head of Media Buying'],
  ['The live monitor alone is worth it.', 'Avortyx customer'],
  ['A new buyer went from a two-day ticket to a ten-minute form.', 'Operations Lead'],
  ['Finally, a router that actually understands intent.', 'Founder, performance network'],
  ['Our compliance exceptions dropped to zero.', 'Avortyx customer'],
  ['Automated payouts closed the month in a day.', 'Avortyx customer'],
];

export default function Performance() {
  return (
    <section id="performance" className="section-wash border-t border-white/10 px-6 py-[clamp(6rem,12vw,10rem)] lg:px-10">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-14 flex items-center gap-4 reveal">
          <span className="mono text-cyan">03 · Performance</span>
          <div className="line flex-1" />
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="gcard p-8 reveal">
              <div className="text-5xl font-light">
                <CountUp to={s.to} decimals={s.d} suffix={s.suffix} className={s.c} />
              </div>
              <div className="mono mt-4 text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="qstrip mt-16 overflow-hidden">
        <div className="qstrip-track flex w-max gap-4">
          {[...quotes, ...quotes].map(([q, a], i) => (
            <figure key={i} className="w-[340px] shrink-0 rounded-2xl border border-white/10 bg-white/[.03] p-6">
              <blockquote className="text-sm leading-6">“{q}”</blockquote>
              <figcaption className="mono mt-4 text-muted">{a}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
