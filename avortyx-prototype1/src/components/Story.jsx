import { useEffect, useRef, useState } from 'react';

const STEPS = [
  { k: 'Capture', t: 'Every call, captured at the edge.', d: 'Calls and leads enter one intelligence layer with source, geography and consent signals attached from the first ring.', m: ['Inbound calls', '1.28M', 'per day'] },
  { k: 'Score', t: 'Intent scored in milliseconds.', d: 'Predictive models turn every signal into a clear buyer-intent score before the caller hears a second of silence.', m: ['Median score time', '14.8', 'ms'] },
  { k: 'Route', t: 'Sent to the buyer most likely to close.', d: 'Caps, hours, bids and compliance rules are resolved in one pass, so each call lands on the right desk first time.', m: ['Match win rate', '94.4', '%'] },
  { k: 'Settle', t: 'Paid out with full transparency.', d: 'Every call carries its own audit trail and payout, so publishers and buyers see the same numbers.', m: ['Payout accuracy', '99.9', '%'] },
];
const LAYER_COLORS = ['#57c3ff', '#6c72ff', '#00ca72', '#aeb9e1'];

export default function Story() {
  const wrap = useRef(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const r = wrap.current.getBoundingClientRect();
      const v = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
      setP(Math.round(v * 200) / 200);
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
    };
  }, []);

  const step = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length));
  const local = Math.min(1, p * STEPS.length - step);
  const s = STEPS[step];

  return (
    <section id="story" ref={wrap} className="relative h-[340vh] border-t border-white/10">
      <div className="sticky top-0 flex h-screen items-center px-6 pt-[72px] lg:px-10">
        <div className="mx-auto grid w-full max-w-[1320px] items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="mono text-cyan">The call, step by step</div>
            <div className="mt-6 flex gap-2">
              {STEPS.map((x, i) => (
                <div key={x.k} className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan to-indigo" style={{ width: (i < step ? 1 : i === step ? local : 0) * 100 + '%' }} />
                </div>
              ))}
            </div>
            <div key={step} className="mt-8 animate-[fadeUp_.6s_both]">
              <div className="mono text-muted">0{step + 1} · {s.k}</div>
              <h3 className="mt-4 max-w-[18ch] text-4xl font-light leading-[1.02] tracking-[-.03em] sm:text-5xl">{s.t}</h3>
              <p className="mt-5 max-w-[44ch] leading-8 text-muted">{s.d}</p>
              <div className="mt-8 inline-flex items-baseline gap-2 rounded-2xl border border-white/10 bg-white/[.03] px-6 py-4">
                <span className="text-4xl font-extralight gradient-text">{s.m[1]}</span>
                <span className="text-sm text-muted">{s.m[2]}</span>
                <span className="mono ml-3 text-muted">{s.m[0]}</span>
              </div>
            </div>
          </div>

          <div className="relative mx-auto h-[300px] w-full max-w-[520px] sm:h-[420px]" style={{ perspective: '1400px' }}>
            <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(58deg) rotateZ(' + (-28 + p * 40) + 'deg)', transition: 'transform .3s linear' }}>
              {STEPS.map((x, i) => {
                const active = i === step;
                const lift = active ? 70 : i < step ? 14 : 0;
                return (
                  <div
                    key={x.k}
                    className="story-layer absolute inset-x-[6%] rounded-3xl border p-5"
                    style={{
                      top: 6 + i * 22 + '%', height: '34%', background: 'linear-gradient(145deg, rgba(20,34,70,.85), rgba(10,17,40,.85))',
                      borderColor: active ? LAYER_COLORS[i] : 'rgba(174,185,225,.2)',
                      boxShadow: active ? '0 0 60px -6px ' + LAYER_COLORS[i] + '88' : '0 20px 40px rgba(5,10,30,.5)',
                      opacity: active ? 1 : 0.55, transform: 'translateZ(' + (i * 8 + lift) + 'px)',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="mono" style={{ color: LAYER_COLORS[i] }}>{x.k}</span>
                      <span className="mono text-muted">0{i + 1}</span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      {[0, 1, 2, 3, 4, 5].map((b) => (
                        <span key={b} className="h-8 flex-1 rounded-md" style={{ background: LAYER_COLORS[i], opacity: active ? 0.25 + ((b + step + Math.round(local * 5)) % 4) * 0.2 : 0.15 }} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
