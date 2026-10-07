import { useRef } from 'react';
import { useCanvasLoop } from '../hooks';

const drawTile = (type) => (c, x, d, s) => {
  const w = c.width, h = c.height;
  x.strokeStyle = '#57c3ff';
  x.fillStyle = '#6c72ff';
  x.lineWidth = d;
  s.t += 0.025;
  const t = s.t;
  if (type === 1) {
    x.beginPath();
    for (let i = 0; i < w; i++) {
      const y = h / 2 + Math.sin(i * 0.04 + t) * Math.sin(i * 0.012 + t) * h * 0.35;
      if (i) x.lineTo(i, y); else x.moveTo(i, y);
    }
    x.stroke();
  }
  if (type === 2) {
    for (let i = 0; i < 10; i++) {
      x.globalAlpha = 0.2 + Math.abs(Math.sin(t + i)) * 0.5;
      x.fillRect((i * w) / 10, h * 0.25, w / 14, h * 0.5);
    }
  }
  if (type === 3) {
    for (let i = 0; i < 4; i++) {
      x.globalAlpha = 0.25 + i * 0.18;
      x.beginPath();
      for (let j = 0; j < w; j++) {
        const y = (h * (i + 1)) / 5 + Math.sin(j * 0.035 + t * (i + 1)) * 4 * d;
        if (j) x.lineTo(j, y); else x.moveTo(j, y);
      }
      x.stroke();
    }
  }
  if (type === 4) {
    x.globalAlpha = 0.7;
    x.beginPath();
    x.arc(w / 2, h / 2, 22 * d, t, t + Math.PI * 1.35);
    x.stroke();
    x.globalAlpha = 1;
    x.beginPath();
    x.arc(w / 2, h / 2, 2 * d, 0, 7);
    x.fill();
  }
};

const draws = [1, 2, 3, 4].map(drawTile);

export default function Capabilities() {
  const tile1 = useRef(null);
  const tile2 = useRef(null);
  const tile3 = useRef(null);
  const tile4 = useRef(null);
  useCanvasLoop(tile1, draws[0]);
  useCanvasLoop(tile2, draws[1]);
  useCanvasLoop(tile3, draws[2]);
  useCanvasLoop(tile4, draws[3]);
  return (
    <section id="capabilities" className="section-wash border-t border-white/10 px-6 py-[clamp(6rem,12vw,10rem)] lg:px-10"><div className="mx-auto max-w-[1320px]"><div className="mb-14 flex items-center gap-4 reveal"><span className="mono text-cyan">01 · Capabilities</span><div className="line flex-1" /></div><div className="mb-16 grid gap-10 lg:grid-cols-2"><h2 className="max-w-[16ch] text-5xl font-light leading-[.92] tracking-[-.03em]">Architected for every connection.</h2><p className="max-w-[44ch] self-end text-base leading-8 text-muted">Route, score, and optimize every inbound call through a single high-performance intelligence layer built for pay-per-call teams.</p></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          <div className="gcard reveal flex flex-col p-8 lg:col-span-2 lg:row-span-2">
            <div className="mono text-cyan">Latency</div>
            <div className="mt-4 text-7xl font-extralight"><span className="gradient-text">&lt;50</span><span className="text-3xl text-muted"> ms</span></div>
            <canvas ref={tile1} className="my-8 min-h-[140px] w-full flex-1" />
            <h3 className="text-xl">Millisecond Precision</h3>
            <p className="mt-3 max-w-[40ch] text-sm leading-7 text-muted">Sub-50ms routing decisions keep qualified callers moving without drop-off.</p>
          </div>
          <div className="gcard reveal p-7">
            <canvas ref={tile2} className="mb-7 h-16 w-full" />
            <h3 className="text-lg">Real-time Adaptation</h3>
            <p className="mt-3 text-sm leading-7 text-muted">Predictive scoring and dynamic traffic shifting respond to live buyer conditions.</p>
          </div>
          <div className="gcard reveal p-7">
            <canvas ref={tile3} className="mb-7 h-16 w-full" />
            <h3 className="text-lg">Compliance Built-in</h3>
            <p className="mt-3 text-sm leading-7 text-muted">TCPA-aware screening, consent signals, and audit trails are part of the route.</p>
          </div>
          <div className="gcard reveal flex items-center gap-6 p-7 md:col-span-2">
            <canvas ref={tile4} className="h-24 w-24 shrink-0" />
            <div>
              <h3 className="text-lg">Predictive Scoring</h3>
              <p className="mt-3 text-sm leading-7 text-muted">Intent models turn every signal into a clearer buyer decision.</p>
            </div>
          </div>
        </div></div></section>
  );
}
