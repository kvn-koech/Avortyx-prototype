import { useState } from 'react';

// The auto-insurance campaign is from avortyx.com; the others use illustrative values
const campaigns = [
  { name: 'medicare-open-enrollment', vertical: 'medicare', payout: '$58.00', daily: 400, concurrency: 20, states: ['FL', 'AZ', 'OH'], number: '+1 800 555 0141' },
  { name: 'auto-insurance-high-intent', vertical: 'auto', payout: '$42.00', daily: 600, concurrency: 30, states: ['CA', 'TX', 'GA'], number: '+1 844 555 0192' },
  { name: 'roofing-storm-damage', vertical: 'home', payout: '$65.00', daily: 250, concurrency: 15, states: ['TX', 'OK', 'FL'], number: '+1 833 555 0117' },
  { name: 'mass-tort-intake', vertical: 'legal', payout: '$120.00', daily: 120, concurrency: 10, states: ['NY', 'IL', 'PA'], number: '+1 888 555 0163' },
  { name: 'debt-relief-consultation', vertical: 'finance', payout: '$36.00', daily: 500, concurrency: 25, states: ['NC', 'GA', 'OH'], number: '+1 877 555 0129' },
];

export default function Launch() {
  const [i, setI] = useState(1);
  const c = campaigns[i];

  return (
    <section id="launch" className="section-wash border-t border-white/10 px-6 py-[clamp(6rem,12vw,10rem)] lg:px-10">
      <div className="mx-auto max-w-[1320px]">
        <div className="reveal mb-14 flex items-center gap-4">
          <span className="mono text-cyan">Get started</span>
          <div className="line flex-1" />
        </div>
        <div className="mb-14 grid gap-10 lg:grid-cols-2">
          <h2 className="max-w-[16ch] text-5xl font-light leading-[.92] tracking-[-.06em]">
            Launch a campaign in <span className="gradient-text">under 60 seconds</span>
          </h2>
          <p className="max-w-[44ch] self-end leading-8 text-muted">
            Define the campaign, attach a number, and calls start routing. No carriers to wire up, no spreadsheets, no waiting on an integration.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2" role="tablist">
          {campaigns.map((x, k) => (
            <button
              key={x.name}
              type="button"
              role="tab"
              aria-selected={k === i}
              onClick={() => setI(k)}
              className={'mono rounded-full border px-4 py-2 transition ' + (k === i ? 'border-cyan/60 bg-cyan/10 text-cyan' : 'border-white/15 text-muted hover:text-white')}
            >
              {x.name}
            </button>
          ))}
        </div>

        <div className="grid gap-6 [perspective:1600px] lg:grid-cols-2">
          <div className="panel glass luxury-shadow rounded-[24px] p-6 lg:[transform:rotateY(5deg)]">
            <div className="mb-4 flex gap-2 border-b border-white/10 pb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald" />
              <span className="ml-3 font-mono text-[10px] text-muted">campaign.js</span>
            </div>
            <pre className="overflow-x-auto font-mono text-[13px] leading-7 text-muted">
              <code>
                <span className="text-white/40">{'// Define your campaign'}</span>{'\n'}
                <span className="text-indigo">export default</span>{' defineCampaign({\n'}
                {'  name: '}<span className="text-emerald">"{c.name}"</span>{',\n  vertical: '}<span className="text-emerald">"{c.vertical}"</span>{',\n  payout: '}<span className="text-emerald">"{c.payout}"</span>{',\n  caps: { daily: '}
                <span className="text-cyan">{c.daily}</span>{', concurrency: '}<span className="text-cyan">{c.concurrency}</span>{' },\n  states: ['}{c.states.map((s) => '"' + s + '"').join(', ')}{'],\n})'}
              </code>
            </pre>
            <p className="mt-4 font-mono text-xs text-emerald">✓ deployed · routing on {c.number}</p>
          </div>

          <div key={c.name} className="panel glass luxury-shadow row-in rounded-[24px] p-6 lg:[transform:rotateY(-5deg)]">
            <div className="mb-6 flex items-center justify-between">
              <span className="mono flex items-center gap-2 text-emerald"><span className="ticker-dot h-2 w-2 rounded-full bg-emerald" />Live</span>
              <span className="mono rounded-full border border-white/15 px-3 py-1 text-muted">{c.vertical}</span>
            </div>
            <h3 className="text-2xl font-light">{c.name}</h3>
            <p className="gradient-text mt-4 text-5xl font-extralight">{c.payout}</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4"><p className="mono text-muted">Daily cap</p><p className="mt-2 text-2xl">{c.daily}</p></div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4"><p className="mono text-muted">Concurrency</p><p className="mt-2 text-2xl">{c.concurrency}</p></div>
            </div>
            <div className="mt-6 flex gap-2">
              {c.states.map((s) => <span key={s} className="mono rounded-md border border-cyan/30 px-3 py-1 text-cyan">{s}</span>)}
            </div>
            <p className="mt-6 border-t border-white/10 pt-4 text-sm text-muted">Number attached <span className="ml-2 text-white">{c.number}</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}
