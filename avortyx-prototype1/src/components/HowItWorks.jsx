const steps = [
  { n: '01', status: 'Pending', title: 'Point a number at Avortyx', body: 'Buy or port a tracking number and attach it to a campaign with your caps, geos and schedule.', ry: '14deg' },
  { n: '02', status: 'Qualifying…', title: 'Set the routing rules', body: "Score on intent, filter by state and daypart, and respect every buyer's concurrency and daily caps.", ry: '0deg' },
  { n: '03', status: 'Connected', title: 'Connect and get paid', body: 'The best-fit buyer answers. Duration, qualification and payout are recorded on the call automatically.', ry: '-14deg' },
];

export default function HowItWorks() {
  return (
    <section id="how" className="section-wash border-t border-white/10 px-6 py-[clamp(6rem,12vw,10rem)] lg:px-10">
      <div className="mx-auto max-w-[1320px]">
        <div className="reveal mb-14 flex items-center gap-4">
          <span className="mono text-cyan">How it works</span>
          <div className="line flex-1" />
        </div>
        <h2 className="reveal mb-20 max-w-[18ch] text-5xl font-light leading-[.92] tracking-[-.06em]">
          From first ring to <span className="gradient-text">paid call</span> in seconds
        </h2>
        <div className="relative grid gap-6 lg:grid-cols-3">
          <div className="absolute left-0 right-0 top-[3.25rem] hidden h-px bg-gradient-to-r from-cyan/0 via-cyan/50 to-indigo/0 lg:block" aria-hidden="true" />
          {steps.map((s) => (
            <div key={s.n} className="reveal">
              <div className="step-card card relative rounded-2xl p-8" style={{ '--ry': s.ry }}>
                <div className="mb-10 flex items-center justify-between">
                  <span className="gradient-text text-5xl font-extralight">{s.n}</span>
                  <span className="mono flex items-center gap-2 rounded-full border border-cyan/30 px-3 py-1 text-cyan">
                    <span className="ticker-dot h-1.5 w-1.5 rounded-full bg-cyan" />
                    {s.status}
                  </span>
                </div>
                <h3 className="text-xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
