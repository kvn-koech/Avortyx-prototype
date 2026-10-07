const items = [
  ['How does pricing work?', 'You pay per routed call. Starter is $49/month with 500 routed calls included; Growth is $199/month with 5,000. Additional calls are billed per call at the rate shown in your workspace. We only charge for calls that actually reach a buyer — screened-out and unanswered calls are never billed.'],
  ['Which numbers can I use?', 'Buy local or toll-free numbers across all 50 states directly from Avortyx, or port the numbers you already own. Numbers can be pooled per campaign for dynamic insertion, and every number carries its own concurrency and daily caps.'],
  ['How do you handle TCPA and DNC compliance?', 'Every attempt is screened before it rings a buyer: federal, state and your internal DNC lists, TCPA consent proof, VoIP and velocity fraud signals, and per-state two-party recording rules. The decision log is stored on the call record and exportable for audit.'],
  ['Can I bring my own buyers?', 'Yes. Add your buyers with their destinations, bids and caps and route to them directly. You can also publish inventory to the Avortyx marketplace and let vetted buyers bid on your traffic in real time — or run both side by side.'],
  ['How fast is a routing decision?', 'Scoring and buyer selection happen while the call is still ringing — typically well under a second — so the caller is connected on the first ring instead of sitting in a queue. Live calls, in-flight counts and connect rates update in the dashboard as they happen.'],
  ['Do you offer SLAs?', 'Growth plans include a 99.9% routing uptime SLA. Enterprise plans include 99.99% with guaranteed response times, a dedicated support channel and private routing infrastructure. Real-time status is published on our status page.'],
];

export default function FAQ() {
  return (
    <section id="faq" className="section-wash border-t border-white/10 px-6 py-[clamp(6rem,12vw,10rem)] lg:px-10">
      <div className="mx-auto max-w-[1000px]">
        <div className="reveal mb-14 flex items-center gap-4">
          <span className="mono text-cyan">FAQ</span>
          <div className="line flex-1" />
        </div>
        <h2 className="mb-10 text-5xl font-light leading-[.92] tracking-[-.06em]">
          Frequently asked <span className="gradient-text">questions</span>
        </h2>
        <div className="border-t border-white/10">
          {items.map(([q, a]) => (
            <details key={q} className="group border-b border-white/10">
              <summary className="flex items-center justify-between py-7 text-xl hover:text-cyan">
                {q}
                <span className="faq-plus relative h-4 w-4 shrink-0" />
              </summary>
              <p className="max-w-2xl pb-7 leading-7 text-muted">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
