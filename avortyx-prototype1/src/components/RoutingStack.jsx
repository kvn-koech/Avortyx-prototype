import { useEffect, useState } from 'react';

const layers = [
  { k: 'Capture', t: 'Ingest', d: 'Every inbound call is captured with caller, source and geo signals the instant it rings.', c: '#aeb9e1' },
  { k: 'Score', t: 'Intent scoring', d: 'A model scores purchase intent on the first ring — before any buyer picks up.', c: '#57c3ff' },
  { k: 'Comply', t: 'Compliance gate', d: 'TCPA, DNC, VoIP and recording rules are checked on every attempt, with an audit log.', c: '#6c72ff' },
  { k: 'Route', t: 'Buyer routing', d: 'Geo, caps, bids and daypart rules pick the buyer most likely to close — and settle the payout.', c: '#00ca72' },
];

export default function RoutingStack() {
  const [on, setOn] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setOn((x) => (x + 1) % layers.length), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="reveal mb-16 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
      <div className="relative mx-auto h-[420px] w-full max-w-[520px] [perspective:1400px]">
        <div className="absolute left-1/2 top-[58%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo/25 blur-3xl" />
        <div className="stack3d absolute left-1/2 top-1/2 h-[250px] w-[250px] -ml-[125px] -mt-[110px]">
          {layers.map((l, i) => (
            <div
              key={l.k}
              className={'stack-layer absolute inset-0 rounded-3xl border backdrop-blur ' + (on === i ? 'is-on' : '')}
              style={{ '--z': i * 62 + 'px', '--c': l.c, animationDelay: -i * 0.9 + 's' }}
            >
              <div className="absolute inset-3 rounded-2xl border border-white/10 [background-image:linear-gradient(rgba(174,185,225,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(174,185,225,.12)_1px,transparent_1px)] [background-size:25px_25px]" />
              <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2" style={{ borderColor: l.c, boxShadow: '0 0 24px ' + l.c }} />
              <span className="mono absolute bottom-3 right-4" style={{ color: l.c }}>0{i + 1} {l.k}</span>
            </div>
          ))}
          <span className="stack-pulse absolute left-1/2 top-1/2 -ml-2 -mt-2 h-4 w-4 rounded-full bg-white shadow-[0_0_24px_6px_rgba(87,195,255,.9)]" />
        </div>
      </div>

      <ol className="grid gap-3">
        {layers.map((l, i) => (
          <li key={l.k}>
            <button
              type="button"
              onClick={() => setOn(i)}
              className={'flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition duration-500 ' + (on === i ? 'border-cyan/50 bg-white/[.06] shadow-[0_20px_60px_rgba(87,195,255,.12)] [transform:translateX(8px)]' : 'border-white/10 bg-white/[.02] hover:border-white/25')}
            >
              <span className="mono grid h-9 w-9 shrink-0 place-items-center rounded-lg border" style={{ color: l.c, borderColor: l.c + '66' }}>0{i + 1}</span>
              <span>
                <span className="block text-base">{l.t}</span>
                <span className="mt-1 block text-sm leading-6 text-muted">{l.d}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
