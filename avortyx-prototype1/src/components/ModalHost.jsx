import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ModalContext } from '../modalContext';

const INFO = {
  about: ['About Avortyx', 'Avortyx is a real-time call scoring, routing and analytics platform for pay-per-call networks. This page is an illustrative prototype of the product experience.'],
  careers: ['Careers', 'We are not listing open roles in this prototype. Send a short intro and your CV to team@avortyx.com and we will keep it on file.'],
  privacy: ['Privacy', 'This prototype collects nothing on its own servers. Anything you type into the forms stays in your browser until you choose to email it.'],
  terms: ['Terms', 'This site is an illustrative demo. Figures, campaigns and testimonials are sample data and do not represent live traffic or guarantees.'],
  security: ['Security', 'Production Avortyx traffic is encrypted in transit and at rest. For a security questionnaire, contact team@avortyx.com.'],
  docs: ['Documentation', 'Docs, API reference and webhooks are shared with accounts during onboarding. Request access and we will send them across.'],
  status: ['Status', 'All systems operational in this demo. A public status page is provided to production accounts.'],
  social: ['Social channels', 'Our public channels are being set up. In the meantime the fastest way to reach us is team@avortyx.com.'],
};

const FORMS = {
  demo: { title: 'Book a demo', blurb: 'See live routing, scoring and payout rules on your own traffic.', cta: 'Request demo' },
  access: { title: 'Request access', blurb: 'Tell us about your volume and we will set up your workspace.', cta: 'Request access' },
  sales: { title: 'Contact sales', blurb: 'Agencies, carriers and enterprise networks: let us scope it together.', cta: 'Contact sales' },
};

const SAMPLES = [
  ['Amara Okafor', 'amara@northhaven.io', 'Northhaven Media'],
  ['Mateo Rivera', 'mateo@summitleads.co', 'Summit Leads'],
  ['Priya Nair', 'priya@lumenreach.com', 'Lumen Reach'],
  ['Lars Eriksson', 'lars@fjordcalls.com', 'Fjord Calls'],
  ['Sofia Marchetti', 'sofia@bluepeak.agency', 'Bluepeak Agency'],
  ['Kenji Watanabe', 'kenji@orbitpay.jp', 'Orbit Pay'],
  ['Zainab Hassan', 'zainab@crestline.net', 'Crestline Networks'],
  ['Tobias Keller', 'tobias@alpenmedia.ch', 'Alpen Media'],
];

const field = 'w-full rounded-xl border border-white/15 bg-white/[.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-cyan/60';

function Form({ kind, plan, onClose }) {
  const f = FORMS[kind];
  const [v, setV] = useState({ name: '', email: '', company: '', volume: '', note: '' });
  const [err, setErr] = useState({});
  const [done, setDone] = useState(false);
  const first = useRef(null);
  const [sample] = useState(() => SAMPLES[Math.floor(Math.random() * SAMPLES.length)]);
  useEffect(() => first.current?.focus(), []);

  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    const n = {};
    if (!v.name.trim()) n.name = 'Please enter your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) n.email = 'Enter a valid work email';
    if (!v.company.trim()) n.company = 'Please enter your company';
    setErr(n);
    if (!Object.keys(n).length) setDone(true);
  };

  if (done) {
    const body = [
      'Name: ' + v.name,
      'Email: ' + v.email,
      'Company: ' + v.company,
      'Monthly call volume: ' + (v.volume || 'n/a'),
      plan ? 'Plan: ' + plan : '',
      v.note ? '\n' + v.note : '',
    ].filter(Boolean).join('\n');
    const href = 'mailto:team@avortyx.com?subject=' + encodeURIComponent(f.title + ' - ' + v.company) + '&body=' + encodeURIComponent(body);
    return (
      <div className="text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-emerald/40 bg-emerald/10 text-2xl text-emerald">✓</div>
        <h3 id="modal-title" className="mt-5 text-2xl font-light">Thanks, {v.name.split(' ')[0]}.</h3>
        <p className="mt-3 text-sm leading-6 text-muted">Your details are ready. Send them to our team to finish the request.</p>
        <a href={href} className="mt-7 inline-flex rounded-full bg-gradient-to-r from-cyan to-indigo px-7 py-3 text-sm font-medium text-[#071226]">Send via email →</a>
        <button type="button" onClick={onClose} className="mt-4 block w-full text-sm text-muted hover:text-white">Close</button>
      </div>
    );
  }

  const Err = (k) => (err[k] ? <span className="mt-1 block text-xs text-[#ff8a8a]">{err[k]}</span> : null);
  return (
    <form onSubmit={submit} noValidate>
      <div className="mono text-cyan">{plan ? plan + ' plan' : 'Avortyx'}</div>
      <h3 id="modal-title" className="mt-3 text-3xl font-light">{f.title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{f.blurb}</p>
      <div className="mt-6 grid gap-4">
        <label className="block text-xs text-muted">Full name
          <input ref={first} value={v.name} onChange={set('name')} autoComplete="name" className={field + ' mt-1.5'} placeholder={sample[0]} />
          {Err("name")}
        </label>
        <label className="block text-xs text-muted">Work email
          <input type="email" value={v.email} onChange={set('email')} autoComplete="email" className={field + ' mt-1.5'} placeholder={sample[1]} />
          {Err("email")}
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-xs text-muted">Company
            <input value={v.company} onChange={set('company')} autoComplete="organization" className={field + ' mt-1.5'} placeholder={sample[2]} />
            {Err("company")}
          </label>
          <label className="block text-xs text-muted">Monthly calls
            <select value={v.volume} onChange={set('volume')} className={field + ' mt-1.5'}>
              <option value="" className="bg-[#0d1530]">Select</option>
              {['Under 5k', '5k – 50k', '50k – 500k', '500k+'].map((o) => <option key={o} value={o} className="bg-[#0d1530]">{o}</option>)}
            </select>
          </label>
        </div>
        <label className="block text-xs text-muted">Anything we should know? (optional)
          <textarea rows={3} value={v.note} onChange={set('note')} className={field + ' mt-1.5 resize-none'} />
        </label>
      </div>
      <button type="submit" className="mt-6 w-full rounded-full bg-gradient-to-r from-cyan to-indigo px-7 py-3.5 text-sm font-medium text-[#071226] transition hover:-translate-y-0.5">{f.cta}</button>
    </form>
  );
}

export default function ModalHost({ children }) {
  const [m, setM] = useState(null);
  const open = useCallback((kind, opts = {}) => setM({ kind, ...opts }), []);
  const close = useCallback(() => setM(null), []);
  const value = useMemo(() => ({ open, close }), [open, close]);

  useEffect(() => {
    if (!m) return undefined;
    const onKey = (e) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [m, close]);

  const info = m && INFO[m.kind];
  return (
    <ModalContext.Provider value={value}>
      {children}
      {m && (
        <div className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-[#030617]/80 p-4 backdrop-blur-md" onMouseDown={(e) => e.target === e.currentTarget && close()}>
          <div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="glass relative my-auto w-full max-w-md rounded-3xl p-7 sm:p-9">
            <button type="button" aria-label="Close" onClick={close} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/15 text-muted transition hover:text-white">✕</button>
            {info ? (
              <div>
                <div className="mono text-cyan">Avortyx</div>
                <h3 id="modal-title" className="mt-3 text-3xl font-light">{info[0]}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{info[1]}</p>
                <a href="mailto:team@avortyx.com" className="mt-7 inline-flex rounded-full border border-white/20 px-6 py-3 text-sm transition hover:border-cyan/60">Email the team</a>
              </div>
            ) : (
              <Form key={m.kind + (m.plan || '')} kind={m.kind} plan={m.plan} onClose={close} />
            )}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}
