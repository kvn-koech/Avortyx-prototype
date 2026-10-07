import Tilt from './Tilt';
import { useModal } from '../modalContext';

const plans = [
  { name: 'Starter', price: '$49', unit: '/month', blurb: 'For running your first campaigns end to end', cta: 'Request access', kind: 'access',
    features: ['500 routed calls/month', '3 campaigns, 10 buyers', 'Local & toll-free numbers', 'Call log & basic reporting', 'Email support'] },
  { name: 'Growth', price: '$199', unit: '/month', blurb: 'For networks routing real volume', cta: 'Request access', kind: 'access', popular: true,
    features: ['5,000 routed calls/month', 'Unlimited campaigns & buyers', 'Intent scoring & real-time bidding', 'Live monitor with barge & whisper', 'TCPA / DNC screening', 'Automated publisher payouts', 'Priority support'] },
  { name: 'Enterprise', price: 'Custom', unit: '', blurb: 'For agencies and carriers at scale', cta: 'Contact sales', kind: 'sales',
    features: ['Unlimited routed calls', 'Dedicated number pools', '24/7 dedicated support', 'SLA guarantee', 'Private routing infrastructure', 'SOC 2 & HIPAA controls', 'Custom integrations', 'Dedicated account manager'] },
];

export default function Pricing() {
  const { open } = useModal();
  return (
    <section id="pricing" className="section-wash border-t border-white/10 px-6 py-[clamp(6rem,12vw,10rem)] lg:px-10">
      <div className="mx-auto max-w-[1320px]">
        <div className="reveal mb-14 flex items-center gap-4">
          <span className="mono text-cyan">Pricing</span>
          <div className="line flex-1" />
        </div>
        <div className="mb-14 grid gap-10 lg:grid-cols-2">
          <h2 className="max-w-[16ch] text-5xl font-light leading-[.92] tracking-[-.03em]">
            Simple, <span className="gradient-text">transparent</span> pricing
          </h2>
          <p className="max-w-[44ch] self-end leading-8 text-muted">
            Pick the volume you need and scale as you grow. No hidden fees, no surprises.
          </p>
        </div>
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <Tilt key={p.name} max={7} className="reveal">
              <div className={'relative flex h-full flex-col rounded-[24px] p-8 ' + (p.popular ? 'panel glass luxury-shadow !border-cyan/50' : 'card')}>
                {p.popular && <span className="mono absolute -top-3 left-8 rounded-full bg-gradient-to-r from-cyan to-indigo px-3 py-1 text-[#071226] [transform:translateZ(30px)]">Most popular</span>}
                <h3 className="text-xl">{p.name}</h3>
                <p className="mt-4 text-5xl font-extralight [transform:translateZ(30px)]">
                  <span className={p.popular ? 'gradient-text' : ''}>{p.price}</span>
                  <span className="ml-1 text-base text-muted">{p.unit}</span>
                </p>
                <p className="mt-3 text-sm text-muted">{p.blurb}</p>
                <button type="button" onClick={() => open(p.kind, { plan: p.name })} className={'mt-8 rounded-full px-6 py-3 text-center text-sm font-medium transition duration-300 hover:-translate-y-1 ' + (p.popular ? 'bg-gradient-to-r from-cyan to-indigo text-[#071226]' : 'border border-white/20')}>{p.cta}</button>
                <ul className="mt-8 space-y-3 text-sm text-muted">
                  {p.features.map((f) => <li key={f} className="flex gap-3"><span className="text-emerald">✓</span>{f}</li>)}
                </ul>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
