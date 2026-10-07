import { useEffect, useRef, useState } from 'react';
import { useModal } from '../modalContext';

const VERTICALS = {
  'Auto insurance': [['Apex Insurance', 62], ['DriveSure Auto', 48], ['Northwind Benefits', 55]],
  'Solar': [['Cascade Solar', 74], ['Lakeshore Roofing', 58], ['HomeShield Pros', 51]],
  'Legal': [['Peachtree Legal', 88], ['Northwind Benefits', 60], ['Apex Insurance', 52]],
  'Home services': [['HomeShield Pros', 46], ['Lakeshore Roofing', 52], ['Cascade Solar', 44]],
  'Health': [['Meridian Health', 66], ['Northwind Benefits', 58], ['DriveSure Auto', 40]],
};
const STATES = ['CA', 'TX', 'FL', 'NY', 'IL', 'OH', 'GA', 'WA'];
const INTENTS = [['Browsing', 36], ['Comparing', 63], ['Ready to buy', 88]];
const STEPS = ['Call received', 'Scoring intent', 'Compliance check', 'Buyer auction', 'Routed'];
const AT = [0, 450, 950, 1500, 2150];

const KEY = 'avortyx-custom-campaigns';
const load = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
};
const blank = { name: '', vertical: 'Auto insurance', payout: 45, minScore: 60, states: ['TX'], cap: 500 };

const hash = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

function simulate(vertical, state, intent, custom) {
  const h = hash(vertical + state + intent);
  const base = INTENTS.find((i) => i[0] === intent)[1];
  const score = Math.min(99, base + (h % 9));
  const mine = custom.filter((c) => c.vertical === vertical && c.states.includes(state) && score >= c.minScore);
  const skipped = custom.filter((c) => c.vertical === vertical && !mine.includes(c)).map((c) => c.name);
  const bids = [...VERTICALS[vertical], ...mine.map((c) => [c.name, c.payout, true])]
    .map(([name, pay, own], k) => ({ name, own, bid: Math.round(pay * (0.78 + score / 140) * 100 + ((h >> (k + 2)) % 400)) / 100 }))
    .sort((a, b) => b.bid - a.bid);
  return { score, bids, skipped, ms: 11 + (h % 9), conn: (1 + (h % 7) / 10).toFixed(1) };
}

const sel = 'w-full rounded-xl border border-white/15 bg-[#0b1330] px-4 py-3 text-sm text-white outline-none focus:border-cyan/60';

export default function Demo() {
  const { open } = useModal();
  const [vertical, setVertical] = useState('Auto insurance');
  const [state, setState] = useState('TX');
  const [intent, setIntent] = useState('Ready to buy');
  const [stage, setStage] = useState(-1);
  const [res, setRes] = useState(null);
  const timers = useRef([]);
  const [custom, setCustom] = useState(load);
  const [form, setForm] = useState(blank);
  const [err, setErr] = useState('');
  const saveAll = (list) => {
    setCustom(list);
    localStorage.setItem(KEY, JSON.stringify(list));
  };
  const toggleState = (st) =>
    setForm((f) => ({ ...f, states: f.states.includes(st) ? f.states.filter((x) => x !== st) : [...f.states, st] }));
  const addCampaign = (e) => {
    e.preventDefault();
    const name = form.name.trim();
    if (!name) return setErr('Give your campaign a name.');
    if (!form.states.length) return setErr('Select at least one state.');
    if (custom.some((c) => c.name.toLowerCase() === name.toLowerCase())) return setErr('You already have a campaign with that name.');
    saveAll([...custom, { ...form, name, id: Date.now() }]);
    setVertical(form.vertical);
    setForm({ ...blank, vertical: form.vertical });
    setErr('');
  };

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const run = () => {
    timers.current.forEach(clearTimeout);
    setRes(simulate(vertical, state, intent, custom));
    setStage(0);
    timers.current = AT.slice(1).map((ms, i) => setTimeout(() => setStage(i + 1), ms));
  };
  const running = stage >= 0 && stage < STEPS.length - 1;
  const done = stage === STEPS.length - 1;

  return (
    <section id="demo" className="section-wash border-t border-white/10 px-6 py-[clamp(6rem,12vw,10rem)] lg:px-10">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-14 flex items-center gap-4 reveal">
          <span className="mono text-cyan">Live demo</span>
          <div className="line flex-1" />
        </div>
        <div className="mb-14 grid gap-10 lg:grid-cols-2">
          <h2 className="max-w-[16ch] text-5xl font-light leading-[.92] tracking-[-.03em]">
            Route a call. <span className="gradient-text">Right now.</span>
          </h2>
          <p className="max-w-[44ch] self-end leading-8 text-muted">
            Pick a campaign, a caller and an intent signal, then watch Avortyx score, screen and auction it. This is a simulation with sample buyers.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <div className="gcard p-7 reveal">
            <div className="grid gap-5">
              <label className="block text-xs text-muted">Campaign vertical
                <select value={vertical} onChange={(e) => setVertical(e.target.value)} className={sel + ' mt-1.5'}>
                  {Object.keys(VERTICALS).map((v) => <option key={v}>{v}</option>)}
                </select>
              </label>
              <label className="block text-xs text-muted">Caller state
                <select value={state} onChange={(e) => setState(e.target.value)} className={sel + ' mt-1.5'}>
                  {STATES.map((v) => <option key={v}>{v}</option>)}
                </select>
              </label>
              <div>
                <div className="text-xs text-muted">Intent signal</div>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {INTENTS.map(([n]) => (
                    <button key={n} type="button" onClick={() => setIntent(n)} className={'rounded-xl border px-2 py-3 text-xs transition ' + (intent === n ? 'border-cyan/60 bg-cyan/10 text-cyan' : 'border-white/15 text-muted hover:text-white')}>{n}</button>
                  ))}
                </div>
              </div>
            </div>
            <button type="button" onClick={run} disabled={running} className="mt-7 w-full rounded-full bg-gradient-to-r from-cyan to-indigo px-7 py-4 text-sm font-medium text-[#071226] transition hover:-translate-y-0.5 disabled:opacity-60">
              {running ? 'Routing…' : done ? 'Route another call' : 'Route a call →'}
            </button>
          </div>

          <div className="gcard p-7 reveal">
            <ol className="grid gap-3">
              {STEPS.map((s, i) => {
                const on = stage >= i;
                return (
                  <li key={s} className={'flex items-center gap-4 rounded-xl border px-4 py-3 transition duration-500 ' + (on ? 'border-cyan/40 bg-white/[.05]' : 'border-white/10 opacity-50')}>
                    <span className={'grid h-7 w-7 place-items-center rounded-full border text-xs ' + (on ? 'border-emerald/60 text-emerald' : 'border-white/20 text-muted')}>{on && (stage > i || done) ? '✓' : i + 1}</span>
                    <span className="flex-1 text-sm">{s}</span>
                    <span className="mono text-muted">
                      {on && i === 1 && res ? 'Score ' + res.score : ''}
                      {on && i === 2 ? 'TCPA clear' : ''}
                      {on && i === 3 && res ? res.bids.length + ' bids' : ''}
                      {on && i === 4 && res ? res.ms + ' ms' : ''}
                    </span>
                  </li>
                );
              })}
            </ol>
            <div className="mt-5 min-h-[168px] rounded-2xl border border-white/10 bg-[#0a1129]/70 p-5">
              {stage < 3 && <p className="text-sm text-muted">{stage < 0 ? 'Choose your inputs and press “Route a call”.' : 'Working…'}</p>}
              {stage >= 3 && res && (
                <div>
                  <div className="mono text-muted">Auction · {vertical} · {state}</div>
                  <ul className="mt-3 space-y-2">
                    {res.bids.map((b, k) => (
                      <li key={b.name} className="flex items-center gap-3 text-sm">
                        <span className="w-36 truncate">{b.name}{b.own && <span className="mono ml-1 text-cyan">you</span>}</span>
                        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                          <span className="block h-full rounded-full bg-gradient-to-r from-cyan to-indigo transition-all duration-700" style={{ width: (b.bid / res.bids[0].bid) * 100 + '%' }} />
                        </span>
                        <span className={k === 0 && done ? 'text-emerald' : 'text-muted'}>${b.bid.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  {done && res.skipped.length > 0 && (
                    <p className="mono mt-3 text-muted">Not eligible this call: {res.skipped.join(', ')}</p>
                  )}
                  {done && (
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                      <div className="text-sm">Connected to <span className="text-emerald">{res.bids[0].name}</span> in {res.conn}s · payout <span className="text-emerald">${res.bids[0].bid.toFixed(2)}</span></div>
                      <button type="button" onClick={() => open('demo')} className="rounded-full border border-white/20 px-5 py-2 text-xs transition hover:border-cyan/60">Book a demo</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <form onSubmit={addCampaign} className="gcard reveal mt-6 p-7">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="mono text-cyan">Custom campaign</div>
              <h3 className="mt-2 text-xl">Add your own campaign to the auction</h3>
            </div>
            <p className="max-w-[40ch] text-xs leading-6 text-muted">Saved in this browser only. Your campaign bids alongside the sample buyers whenever the vertical, state and score rules match.</p>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <label className="block text-xs text-muted">Campaign name
              <input value={form.name} maxLength={40} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Summit Roofing – Spring" className={sel + ' mt-1.5'} />
            </label>
            <label className="block text-xs text-muted">Vertical
              <select value={form.vertical} onChange={(e) => setForm({ ...form, vertical: e.target.value })} className={sel + ' mt-1.5'}>
                {Object.keys(VERTICALS).map((v) => <option key={v}>{v}</option>)}
              </select>
            </label>
            <label className="block text-xs text-muted">Base payout per call ($)
              <input type="number" min="5" max="500" value={form.payout} onChange={(e) => setForm({ ...form, payout: Math.max(5, Math.min(500, +e.target.value || 0)) })} className={sel + ' mt-1.5'} />
            </label>
            <label className="block text-xs text-muted">Daily call cap
              <input type="number" min="1" max="100000" value={form.cap} onChange={(e) => setForm({ ...form, cap: Math.max(1, +e.target.value || 1) })} className={sel + ' mt-1.5'} />
            </label>
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <label className="block text-xs text-muted">Minimum intent score: <span className="text-cyan">{form.minScore}</span>
              <input type="range" min="0" max="95" value={form.minScore} onChange={(e) => setForm({ ...form, minScore: +e.target.value })} className="mt-3 w-full accent-[#57c3ff]" />
            </label>
            <div>
              <div className="text-xs text-muted">Target states</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {STATES.map((st) => (
                  <button key={st} type="button" onClick={() => toggleState(st)} className={'mono rounded-full border px-3 py-1.5 transition ' + (form.states.includes(st) ? 'border-cyan/60 bg-cyan/10 text-cyan' : 'border-white/15 text-muted hover:text-white')}>{st}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button type="submit" className="rounded-full bg-gradient-to-r from-cyan to-indigo px-7 py-3 text-sm font-medium text-[#071226] transition hover:-translate-y-0.5">Add campaign</button>
            {err && <span role="alert" className="text-sm text-[#ff8a8a]">{err}</span>}
          </div>
          {custom.length > 0 && (
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {custom.map((c) => (
                <li key={c.id} className="flex items-center gap-4 rounded-xl border border-white/10 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm">{c.name}</div>
                    <div className="mono mt-1 truncate text-muted">{c.vertical} · ${c.payout} · score ≥ {c.minScore} · {c.states.join(' ')} · cap {c.cap}/day</div>
                  </div>
                  <button type="button" onClick={() => { setVertical(c.vertical); setState(c.states[0]); setIntent('Ready to buy'); }} className="mono text-cyan hover:underline">Use</button>
                  <button type="button" aria-label={'Remove ' + c.name} onClick={() => saveAll(custom.filter((x) => x.id !== c.id))} className="text-muted hover:text-white">✕</button>
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
    </section>
  );
}
