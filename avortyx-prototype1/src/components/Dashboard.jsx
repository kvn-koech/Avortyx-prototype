import { useRef } from 'react';
import IntentMap from './IntentMap';
import { CITIES } from './markets';

const top = [...CITIES].sort((a, b) => b[3] - a[3]).slice(0, 5);

const stats = [
  ['Routed signals', '1,284,615', '+12.4% / hourly', 'text-indigo'],
  ['Decision latency', '14.8 ms', 'sub-50ms target', 'text-cyan'],
  ['Match win rate', '94.4%', 'optimal distribution', 'text-indigo'],
];

export default function Dashboard() {
  const idxRef = useRef(null);
  return (
    <section id="dashboard" className="section-wash border-t border-white/10 px-6 py-[clamp(6rem,12vw,10rem)] lg:px-10">
      <div className="mx-auto max-w-[1320px]">
        <div className="reveal mb-14 flex items-center gap-4">
          <span className="mono text-cyan">02 · Signal telemetry</span>
          <div className="line flex-1" />
        </div>
        <div className="grid gap-5 lg:grid-cols-[.7fr_1.3fr]">
          <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
            {stats.map(([l, v, n, c]) => (
              <div key={l} className="card p-7">
                <span className="mono text-muted">{l}</span>
                <div className={'mt-5 text-4xl font-light ' + c}>{v}</div>
                <div className="mt-2 text-xs text-emerald">{n}</div>
              </div>
            ))}
          </div>
          <div className="panel glass luxury-shadow relative overflow-hidden rounded-[28px] p-6 sm:p-9">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo/20 blur-3xl" />
            <div className="relative flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="mono flex items-center gap-2 text-cyan"><span className="ticker-dot h-2 w-2 rounded-full bg-emerald" />Global Signal Analytics</span>
                <h2 className="mt-4 text-3xl font-light tracking-[-.03em]">A live map of <span className="gradient-text">intent.</span></h2>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[.03] px-4 py-3 text-right">
                <div className="mono text-muted">Intent index</div>
                <div ref={idxRef} className="mt-1 text-2xl font-light tabular-nums text-cyan">0.0</div>
              </div>
            </div>
            <div className="relative mt-6 grid gap-4 md:grid-cols-[1fr_190px]">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#060b1b]/70">
              <div className="grid-bg absolute inset-0 opacity-60" />
              <IntentMap indexRef={idxRef} className="relative block h-[300px] w-full cursor-crosshair sm:h-[360px]" />
              <div className="absolute left-4 top-4 flex gap-2">
                <span className="mono rounded-full border border-emerald/30 bg-ground/70 px-3 py-1 text-emerald">19 live markets</span>
                <span className="mono hidden rounded-full border border-white/15 bg-ground/70 px-3 py-1 text-muted sm:block">Hover a market</span>
              </div>
            </div>
              <div className="hidden rounded-xl border border-white/10 bg-white/[.03] p-4 md:block">
                <div className="mono mb-3 text-muted">Top markets</div>
                {top.map(([n, , , sc, calls]) => (
                  <div key={n} className="mb-2 last:mb-0">
                    <div className="flex justify-between text-xs"><span className="text-white">{n}</span><span className="text-muted">{calls}/h · <span className="text-cyan">{sc}</span></span></div>
                    <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-cyan to-indigo" style={{ width: sc + '%' }} /></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative mt-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="mono text-muted">Low</span>
                <span className="h-1.5 w-40 rounded-full bg-gradient-to-r from-[#3c4a78] via-cyan to-[#a096ff]" />
                <span className="mono text-muted">High intent</span>
              </div>
              <span className="mono text-muted">Inbound volume · Endpoint fit · Buyer capacity</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
