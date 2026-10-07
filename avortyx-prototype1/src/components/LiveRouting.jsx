import { useEffect, useState } from 'react';
import Globe from './Globe';

const pool = [
  ['NY', 'Northwind Benefits', '$61.00', '1.6s'],
  ['CA', 'Meridian Health', '$58.00', '1.2s'],
  ['OH', 'DriveSure Auto', '$37.50', '1.8s'],
  ['FL', 'HomeShield Pros', '$42.00', '1.1s'],
  ['TX', 'Apex Insurance', '$65.00', '1.4s'],
  ['GA', 'Peachtree Legal', '$72.00', '1.3s'],
  ['IL', 'Lakeshore Roofing', '$48.50', '1.5s'],
  ['WA', 'Cascade Solar', '$54.00', '1.0s'],
];

export default function LiveRouting() {
  const [rows, setRows] = useState(() => pool.slice(0, 5).map((r, i) => ({ id: i, r })));
  const [calls, setCalls] = useState(1284);

  useEffect(() => {
    let n = 5;
    const id = setInterval(() => {
      const k = n;
      n += 1;
      setRows((prev) => [{ id: k, r: pool[k % pool.length] }, ...prev.slice(0, 4)]);
      setCalls((c) => c + 1 + Math.floor(Math.random() * 3));
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="live" className="section-wash border-t border-white/10 px-6 py-[clamp(6rem,12vw,10rem)] lg:px-10">
      <div className="mx-auto max-w-[1320px]">
        <div className="reveal mb-14 flex items-center gap-4">
          <span className="mono text-cyan">Live monitor</span>
          <div className="line flex-1" />
        </div>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal relative aspect-square w-full">
            <Globe className="absolute inset-0 h-full w-full" />
          </div>
          <div className="reveal">
            <h2 className="max-w-[14ch] text-5xl font-light leading-[.92] tracking-[-.06em]">
              Watch every call <span className="gradient-text">land.</span>
            </h2>
            <p className="mt-6 max-w-[44ch] leading-8 text-muted">
              Live calls, in-flight counts and connect rates update as they happen, with barge and whisper for supervisors.
            </p>
            <div className="panel glass luxury-shadow mt-10 rounded-[24px] p-5 [perspective:1000px]">
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                <span className="mono flex items-center gap-2 text-emerald"><span className="ticker-dot h-2 w-2 rounded-full bg-emerald" />Live</span>
                <span className="mono text-muted">{calls.toLocaleString()} calls today</span>
              </div>
              <ul>
                {rows.map(({ id, r }) => (
                  <li key={id} className="row-in grid grid-cols-[2rem_1rem_1fr_auto_auto] items-center gap-3 border-b border-white/5 py-3 text-sm last:border-0">
                    <span className="mono text-cyan">{r[0]}</span>
                    <span className="text-muted">→</span>
                    <span>{r[1]}</span>
                    <span className="text-emerald">{r[2]}</span>
                    <span className="mono w-10 text-right text-muted">{r[3]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
