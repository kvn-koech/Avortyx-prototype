import { useRef } from 'react';
import { Icon } from '@iconify/react';
import { useCanvasLoop } from '../hooks';
import Tilt from './Tilt';

const COLORS = ['#6c72ff', '#57c3ff', '#00ca72'];

function drawBands(c, ctx, d, s) {
  ctx.clearRect(0, 0, c.width, c.height);
  s.t += 0.004;
  COLORS.forEach((col, k) => {
    ctx.strokeStyle = col;
    ctx.globalAlpha = 0.16;
    ctx.lineWidth = 38 * d;
    ctx.beginPath();
    for (let i = 0; i < c.width; i += 3) {
      const y = c.height * (0.42 + k * 0.11) + Math.sin(i * 0.003 + s.t * (k + 1)) * c.height * 0.12 + Math.sin(i * 0.009 + s.t) * 30 * d;
      if (i) ctx.lineTo(i, y); else ctx.moveTo(i, y);
    }
    ctx.stroke();
  });
}

function drawGraph(c, x, q, s) {
  x.clearRect(0, 0, c.width, c.height);
  s.t += 0.01;
  for (let i = 0; i < 28; i++) {
    const a = i * 0.92 + s.t;
    const rx = c.width * 0.35 + Math.sin(i * 2) * c.width * 0.12;
    const ry = c.height * 0.32 + Math.cos(i) * c.height * 0.2;
    const nx = c.width / 2 + Math.cos(a) * rx;
    const ny = c.height / 2 + Math.sin(a) * ry;
    x.strokeStyle = i % 2 ? '#6c72ff' : '#57c3ff';
    x.globalAlpha = 0.25;
    x.beginPath();
    x.moveTo(c.width / 2, c.height / 2);
    x.lineTo(nx, ny);
    x.stroke();
    x.fillStyle = '#57c3ff';
    x.globalAlpha = 0.8;
    x.beginPath();
    x.arc(nx, ny, 2 * q, 0, 7);
    x.fill();
  }
}

export default function Hero() {
  const heroRef = useRef(null);
  const graphRef = useRef(null);
  useCanvasLoop(heroRef, drawBands);
  useCanvasLoop(graphRef, drawGraph);
  return (
    <section className="grid-bg section-wash relative flex min-h-screen items-center overflow-hidden px-6 pb-[clamp(4rem,9vw,7rem)] pt-[clamp(9rem,14vw,12rem)] lg:px-10"><canvas ref={heroRef} className="absolute inset-0 h-full w-full opacity-60" /><div className="premium-glow" aria-hidden="true" /><div className="hero-fade absolute inset-0" /><div className="relative mx-auto grid w-full max-w-[1320px] items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10"><div className="reveal"><div className="mb-8 flex items-center justify-between border-b border-white/15 pb-3 text-cyan"><span className="mono">Avortyx Platform</span><span className="mono hidden sm:block">ROUTE-ENGINE // ACTIVE</span></div><h1 className="max-w-3xl text-[clamp(3.2rem,6.2vw,7rem)] font-light leading-[.84] tracking-[-.08em]">Routing built for <em className="gradient-text font-light not-italic">performance.</em></h1><p className="mt-9 max-w-[38ch] text-lg leading-8 text-muted">High-frequency decision engine for performance marketing. Distribute calls and leads with millisecond precision, predictive intent scoring, and dynamic payout optimization.</p><div className="mt-10 flex flex-wrap items-center gap-7"><a id="hero-demo-link" href="#cta" className="rounded-full bg-gradient-to-r from-cyan to-indigo px-8 py-4 text-sm font-medium text-[#071226] shadow-lg shadow-cyan/20 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo/30">Book Demo</a><a id="hero-explore-link" href="#capabilities" className="flex items-center gap-2 text-sm text-cyan hover:text-white">Explore Platform <Icon icon="lucide:arrow-right" /></a></div><div className="mt-10 flex flex-wrap items-center gap-3"><span className="mono text-muted">Screened on every call</span><span className="mono rounded-full border border-emerald/30 px-3 py-1 text-emerald">✓ TCPA</span><span className="mono rounded-full border border-emerald/30 px-3 py-1 text-emerald">✓ DNC</span><span className="mono rounded-full border border-emerald/30 px-3 py-1 text-emerald">✓ VoIP</span></div></div><Tilt max={9}><div className="panel glass luxury-shadow floating reveal relative perspective-1000 overflow-hidden rounded-[28px] p-4" style={{ transitionDelay: ".15s", transformStyle: "preserve-3d" }}><div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-3"><span className="h-2.5 w-2.5 rounded-full bg-rose-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /><span className="h-2.5 w-2.5 rounded-full bg-emerald" /><span className="ml-4 font-mono text-[10px] text-indigo">avortyx-en2Z6&amp;VRNUT03B7T5AR</span><span className="ml-auto text-cyan">•••</span></div><div className="grid grid-cols-1 gap-4 sm:grid-cols-[132px_1fr]"><aside className="space-y-2"><div className="rounded-lg border border-indigo/40 bg-indigo/15 px-3 py-3 text-xs">▣ &nbsp; Dashboard</div><div className="rounded-lg px-3 py-3 text-xs text-muted">□ &nbsp; Traffic Streams</div><div className="rounded-lg px-3 py-3 text-xs text-muted">□ &nbsp; Predictive Routing</div><div className="rounded-lg px-3 py-3 text-xs text-muted">□ &nbsp; Buyers &amp; Endpoints</div><div className="rounded-lg px-3 py-3 text-xs text-muted">□ &nbsp; Analytics</div><div className="rounded-lg px-3 py-3 text-xs text-muted">□ &nbsp; Settings</div></aside><div><div className="grid gap-3 sm:grid-cols-3"><div className="glass rounded-2xl border-white/10 p-4 transition duration-300 hover:-translate-y-1"><div className="text-[11px] text-muted">Total Routed Signals</div><div className="mt-2 text-xl font-semibold">1,284,615</div><div className="mt-1 text-[10px] text-emerald">+12.4% vs last hour</div></div><div className="glass rounded-2xl border-white/10 p-4 transition duration-300 hover:-translate-y-1"><div className="text-[11px] text-muted">Routing Latency</div><div className="mt-2 text-xl font-semibold">14.8 ms</div><div className="mt-1 text-[10px] text-emerald">Ultra-low performance</div></div><div className="glass rounded-2xl border-white/10 p-4 transition duration-300 hover:-translate-y-1"><div className="text-[11px] text-muted">Match Win Rate</div><div className="mt-2 text-xl font-semibold">94.4%</div><div className="mt-1 text-[10px] text-emerald">Optimal distribution</div></div></div><div className="relative mt-3 h-[235px] overflow-hidden rounded-xl border border-white/10 bg-[#09142d] p-5"><div className="relative z-10"><div className="text-lg font-semibold">Global Signal Analytics</div><div className="mt-2 text-xs text-muted">Real-time endpoint matching and data flow</div></div><canvas ref={graphRef} className="absolute inset-0 h-full w-full" /></div></div></div></div></Tilt></div></section>
  );
}
