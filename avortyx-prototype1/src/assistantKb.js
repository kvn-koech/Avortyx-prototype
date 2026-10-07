// Rule-based knowledge base for the on-page assistant (no external AI service)
export const SUGGESTIONS = ['How does pricing work?', 'Is it TCPA compliant?', 'How fast is routing?', 'Can I bring my own buyers?'];

const KB = [
  { k: ['price', 'pricing', 'cost', 'plan', 'starter', 'growth', 'billing', 'charge', 'how much', 'pay'],
    a: 'Pricing is per routed call. Starter is $49/month with 500 routed calls, Growth is $199/month with 5,000, and Enterprise is custom. Screened-out and unanswered calls are never billed.', act: ['access', 'Request access'] },
  { k: ['enterprise', 'sales', 'agency', 'carrier', 'volume'],
    a: 'Enterprise includes unlimited routed calls, dedicated number pools, 24/7 support, a 99.99% SLA, private routing infrastructure and an account manager. Our sales team can scope it with you.', act: ['sales', 'Contact sales'] },
  { k: ['tcpa', 'dnc', 'compliance', 'compliant', 'consent', 'legal', 'recording', 'hipaa', 'soc'],
    a: 'Every call is screened before it rings a buyer: federal, state and internal DNC lists, TCPA consent proof, VoIP and velocity fraud signals, and per-state recording rules. The decision log is stored on the call record and exportable for audit.' },
  { k: ['fast', 'speed', 'latency', 'ms', 'millisecond', 'slow', 'quick', 'second'],
    a: 'Scoring and buyer selection happen while the call is still ringing, typically well under a second, so callers connect on the first ring instead of waiting in a queue.' },
  { k: ['buyer', 'buyers', 'marketplace', 'bid', 'bids', 'auction', 'bidding'],
    a: 'You can add your own buyers with destinations, bids and caps, publish inventory to the marketplace so vetted buyers bid in real time, or run both side by side. Try the live demo to watch an auction run.', act: ['#demo', 'Open live demo'] },
  { k: ['number', 'numbers', 'phone', 'toll', 'port', 'local'],
    a: 'You can buy local or toll-free numbers in all 50 states, or port your own. Numbers can be pooled per campaign, and each has its own concurrency and daily caps.' },
  { k: ['sla', 'uptime', 'reliable', 'status', 'support'],
    a: 'Growth includes a 99.9% routing uptime SLA. Enterprise includes 99.99%, guaranteed response times and a dedicated support channel.' },
  { k: ['score', 'scoring', 'intent', 'ai', 'predict', 'model'],
    a: 'Intent scoring rates each caller from live signals so the best-fit buyer is chosen before the call connects. You can see it in action in the live demo.', act: ['#demo', 'Open live demo'] },
  { k: ['demo', 'trial', 'try', 'book', 'talk', 'meeting', 'call me'],
    a: 'The fastest way to see it on your own traffic is a short demo with our team.', act: ['demo', 'Book a demo'] },
  { k: ['campaign', 'custom'],
    a: 'In the live demo you can add your own campaign with a payout, minimum intent score and target states, and watch it bid against the sample buyers.', act: ['#demo', 'Open live demo'] },
  { k: ['contact', 'email', 'human', 'person', 'help'],
    a: 'You can reach the team at team@avortyx.com, or book a demo and someone will follow up.', act: ['demo', 'Book a demo'] },
  { k: ['hello', 'hi', 'hey', 'good morning', 'good afternoon'],
    a: 'Hi! I can answer questions about pricing, compliance, routing speed, buyers and numbers.' },
];

const norm = (s) => ' ' + s.toLowerCase().replace(/[^a-z0-9$ ]/g, ' ').replace(/\s+/g, ' ') + ' ';

export function answer(q) {
  const t = norm(q);
  let best = null;
  let top = 0;
  KB.forEach((e) => {
    const score = e.k.reduce((n, w) => n + (t.includes(' ' + w + ' ') || (w.length > 3 && t.includes(' ' + w)) ? 1 : 0), 0);
    if (score > top) {
      top = score;
      best = e;
    }
  });
  if (best) return best;
  return { a: "I'm not sure about that one. I can help with pricing, compliance, routing speed, buyers and numbers, or you can book a demo and the team will answer directly.", act: ['demo', 'Book a demo'] };
}
