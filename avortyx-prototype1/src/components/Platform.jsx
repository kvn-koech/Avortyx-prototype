import Tilt from './Tilt';
import RoutingStack from './RoutingStack';

const items = [
  { icon: '⚡', title: 'Decisions on the first ring', body: "Every call is scored and routed while it's still ringing. The buyer picks up before the caller ever hears hold music." },
  { icon: '☎', title: 'Nationwide number inventory', body: 'Local and toll-free numbers across 50 states. Buy, port and pool them from one place.' },
  { icon: '✓', title: 'Compliance built in', body: 'TCPA, DNC and two-party recording rules on every attempt.' },
  { icon: '◉', title: 'Live call monitoring', body: 'Watch every in-flight call as it happens, with barge and whisper for supervisors. Nothing to refresh.' },
  { icon: '▤', title: 'Real-time reporting', body: 'Connected, qualified and payout figures per campaign, buyer and publisher — as they land.' },
  { icon: '⑂', title: 'Visual routing rules', body: 'Geo, schedule, intent and cap rules as a tree you can see — not a spreadsheet.' },
  { icon: '⇄', title: 'Buyer marketplace', body: 'Publish inventory and let vetted buyers bid on your traffic in real time.' },
];

// First two cards are wide, the next three are narrow, the last two are wide again
const span = (i) => (i < 2 || i > 4 ? 'lg:col-span-3' : 'lg:col-span-2');

export default function Platform() {
  return (
    <section id="platform" className="section-wash border-t border-white/10 px-6 py-[clamp(6rem,12vw,10rem)] lg:px-10">
      <div className="mx-auto max-w-[1320px]">
        <div className="reveal mb-14 flex items-center gap-4">
          <span className="mono text-cyan">Platform</span>
          <div className="line flex-1" />
        </div>
        <div className="mb-16 grid gap-10 lg:grid-cols-2">
          <h2 className="max-w-[16ch] text-5xl font-light leading-[.92] tracking-[-.03em]">
            A routing stack that <span className="gradient-text">understands calls</span>
          </h2>
          <p className="max-w-[44ch] self-end text-base leading-8 text-muted">
            Purpose-built primitives for scoring, routing, and settling pay-per-call traffic.
          </p>
        </div>
        <RoutingStack />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {items.map((it, i) => (
            <Tilt key={it.title} max={8} className={'reveal ' + span(i)}>
              <div className="card flex h-full flex-col rounded-2xl p-8">
                <span className="mb-8 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-cyan/25 to-indigo/30 text-xl text-cyan [transform:translateZ(40px)]">{it.icon}</span>
                <h3 className="text-xl [transform:translateZ(24px)]">{it.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{it.body}</p>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
