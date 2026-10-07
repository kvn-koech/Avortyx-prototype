const rows = [
  ['Intent scoring on the first ring', 'Scored from live signals before the buyer picks up', 'Post-call only', 'Not available'],
  ['Real-time buyer bidding', 'Every eligible buyer bids on every call', 'Static price tiers', 'Manual rate cards'],
  ['TCPA & DNC screening built in', 'Every attempt screened before it rings', 'Third-party add-on', 'Your own integration'],
  ['Live barge & whisper', 'Supervisors join any in-flight call', 'Listen-only', 'Carrier dependent'],
  ['Per-buyer caps & concurrency', 'Hourly, daily, monthly and concurrent limits', 'Daily caps', 'Hand-built limits'],
  ['Automated publisher payouts', 'Settled from the call record, no spreadsheets', 'Export & reconcile', 'Manual'],
  ['Visual routing rules', 'Geo, daypart, intent and caps in one builder', 'Config forms', 'Custom code'],
];

export default function Comparison() {
  return (
    <section id="compare" className="section-wash border-t border-white/10 px-6 py-[clamp(6rem,12vw,10rem)] lg:px-10">
      <div className="mx-auto max-w-[1320px]">
        <div className="reveal mb-14 flex items-center gap-4">
          <span className="mono text-cyan">Comparison</span>
          <div className="line flex-1" />
        </div>
        <div className="mb-14 grid gap-10 lg:grid-cols-2">
          <h2 className="max-w-[16ch] text-5xl font-light leading-[.92] tracking-[-.06em]">
            Why networks choose <span className="gradient-text">Avortyx</span>
          </h2>
          <p className="max-w-[44ch] self-end leading-8 text-muted">
            Everything a pay-per-call network needs, without stitching a tracker to a carrier to a spreadsheet.
          </p>
        </div>

        <div className="reveal overflow-x-auto [perspective:1600px]">
          <table className="panel glass luxury-shadow w-full min-w-[760px] border-separate border-spacing-0 overflow-hidden rounded-[24px] text-left lg:[transform:rotateX(3deg)]">
            <thead>
              <tr className="mono text-muted">
                <th className="p-5 font-normal">Capability</th>
                <th className="bg-cyan/10 p-5 font-normal text-cyan">Avortyx</th>
                <th className="p-5 font-normal">Legacy trackers</th>
                <th className="p-5 font-normal">DIY carrier</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([cap, av, legacy, diy]) => (
                <tr key={cap} className="text-sm">
                  <td className="border-t border-white/10 p-5">{cap}</td>
                  <td className="border-t border-white/10 bg-cyan/5 p-5"><span className="mr-2 text-emerald">✓</span><span className="text-muted">{av}</span></td>
                  <td className="border-t border-white/10 p-5 text-muted/80">{legacy}</td>
                  <td className="border-t border-white/10 p-5 text-muted/80">{diy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
