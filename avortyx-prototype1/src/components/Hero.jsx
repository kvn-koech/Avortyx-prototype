import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { useCanvasLoop } from '../hooks';
import Tilt from './Tilt';
import { useModal } from '../modalContext';

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
    const u = (s.t * 0.9 + i * 0.37) % 1;
    x.fillStyle = '#fff';
    x.globalAlpha = 1 - u;
    x.beginPath();
    x.arc(c.width / 2 + (nx - c.width / 2) * u, c.height / 2 + (ny - c.height / 2) * u, 1.8 * q, 0, 7);
    x.fill();
    if (u > 0.92) {
      x.strokeStyle = '#00ca72';
      x.globalAlpha = 0.7;
      x.beginPath();
      x.arc(nx, ny, (4 + (u - 0.92) * 120) * q, 0, 7);
      x.stroke();
    }
  }
}

const NAV = ['Dashboard', 'Traffic Streams', 'Predictive Routing', 'Buyers & Endpoints', 'Analytics', 'Settings'];
const FEED = [
  ['CA', 'Meridian Health', '$58.00'], ['TX', 'Apex Insurance', '$65.00'], ['NY', 'Northwind Benefits', '$61.00'], ['FL', 'HomeShield Pros', '$42.00'],
  ['WA', 'Cascade Solar', '$54.00'], ['GA', 'Peachtree Legal', '$72.00'], ['IL', 'Lakeshore Roofing', '$48.50'], ['OH', 'DriveSure Auto', '$37.50'],
];
const rand = (a, b) => a + Math.random() * (b - a);

function useLive() {
  const [live, setLive] = useState({ signals: 1284615, delta: 12.4, latency: 14.8, win: 94.4, tab: 0, cps: 42, feed: 'Waiting for next call…' });
  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      const f = FEED[Math.floor(Math.random() * FEED.length)];
      setLive((p) => ({
        signals: p.signals + Math.floor(rand(8, 40)),
        delta: Math.min(15.5, Math.max(9.5, p.delta + rand(-0.3, 0.3))),
        latency: Math.min(19, Math.max(11.5, p.latency + rand(-0.7, 0.7))),
        win: Math.min(96.5, Math.max(92.5, p.win + rand(-0.25, 0.25))),
        tab: n % 3 === 0 ? (p.tab + 1) % NAV.length : p.tab,
        cps: Math.round(rand(34, 58)),
        feed: f[0] + ' → ' + f[1] + ' · ' + f[2] + ' · ' + rand(0.9, 2).toFixed(1) + 's',
      }));
    }, 1200);
    return () => clearInterval(id);
  }, []);
  return live;
}

export default function Hero() {
  const { open } = useModal();
  const live = useLive();
  const heroRef = useRef(null);
  const graphRef = useRef(null);
  useCanvasLoop(heroRef, drawBands);
  useCanvasLoop(graphRef, drawGraph);
  return (
    <section className="grid-bg section-wash relative flex min-h-[100svh] items-center overflow-hidden px-6 pb-[clamp(3rem,6vw,5rem)] pt-[clamp(6rem,8vw,7.5rem)] lg:px-10"><canvas ref={heroRef} className="absolute inset-0 h-full w-full opacity-60" /><div className="premium-glow" aria-hidden="true" /><div className="hero-fade absolute inset-0" /><div className="relative mx-auto grid w-full max-w-[1320px] items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10"><div className="reveal"><div className="mb-8 flex items-center justify-between border-b border-white/15 pb-3"><span className="text-xs font-semibold tracking-wider uppercase text-cyan-400">Avortyx Platform</span><span className="text-xs font-semibold tracking-wider uppercase text-cyan-400 hidden sm:block">ROUTE-ENGINE // ACTIVE</span></div><h1 className="max-w-3xl text-[clamp(3.2rem,6.2vw,7rem)] font-extrabold leading-[.84] tracking-tight text-slate-50">Routing built for <em className="gradient-text font-extrabold not-italic">performance.</em></h1><p className="mt-9 max-w-[38ch] text-lg font-normal leading-relaxed text-slate-300">High-frequency decision engine for performance marketing. Distribute calls and leads with millisecond precision, predictive intent scoring, and dynamic payout optimization.</p><div className="mt-10 flex flex-wrap items-center gap-7"><button type="button" id="hero-demo-link" onClick={() => open('demo')} className="rounded-full bg-gradient-to-r from-cyan to-indigo px-8 py-4 text-sm font-bold text-center text-[#071226] shadow-lg shadow-cyan/20 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo/30">Book Demo</button><a id="hero-explore-link" href="#capabilities" className="flex items-center gap-2 text-sm font-bold text-cyan hover:text-white">Explore Platform <Icon icon="lucide:arrow-right" /></a></div><div className="mt-10 flex flex-wrap items-center gap-3"><span className="mono text-muted">Screened on every call</span><span className="mono rounded-full border border-emerald/30 px-3 py-1 text-emerald">✓ TCPA</span><span className="mono rounded-full border border-emerald/30 px-3 py-1 text-emerald">✓ DNC</span><span className="mono rounded-full border border-emerald/30 px-3 py-1 text-emerald">✓ VoIP</span></div></div><Tilt max={9}><div className="panel glass luxury-shadow floating reveal relative perspective-1000 overflow-hidden rounded-[28px] p-4" style={{ transitionDelay: ".15s", transformStyle: "preserve-3d" }}><div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-3"><span className="h-2.5 w-2.5 rounded-full bg-rose-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /><span className="h-2.5 w-2.5 rounded-full bg-emerald" /><span className="ml-4 font-mono text-[10px] text-indigo">avortyx-en2Z6&amp;VRNUT03B7T5AR</span><span className="ml-auto text-cyan">•••</span></div><div className="grid grid-cols-1 gap-4 sm:grid-cols-[132px_1fr]"><aside className="space-y-2">{NAV.map((n, i) => (<div key={n} className={'rounded-lg px-3 py-3 text-sm transition-colors duration-500 ' + (i === live.tab ? 'border border-indigo/40 bg-indigo/15 font-bold text-white' : 'border border-transparent text-slate-300 hover:text-white')}>{i === live.tab ? '▣' : '□'} &nbsp; {n}</div>))}</aside><div><div className="grid gap-3 sm:grid-cols-3">{[['Total Routed Signals', live.signals.toLocaleString(), (live.delta >= 0 ? '+' : '') + live.delta.toFixed(1) + '% vs last hour'], ['Routing Latency', live.latency.toFixed(1) + ' ms', 'Ultra-low performance'], ['Match Win Rate', live.win.toFixed(1) + '%', 'Optimal distribution']].map(([l, v, n]) => (<div key={l} className="glass rounded-2xl border-white/10 p-3 sm:p-4 transition duration-300 hover:-translate-y-1 overflow-hidden"><div className="text-xs font-medium text-slate-300 whitespace-nowrap truncate">{l}</div><div className="mt-1.5 text-xl font-bold text-white font-mono tabular-nums tracking-tight drop-shadow-sm whitespace-nowrap truncate">{v}</div><div className="mt-1 text-[11px] font-medium text-emerald-400 whitespace-nowrap truncate">{n}</div></div>))}</div><div className="relative mt-3 h-[235px] overflow-hidden rounded-xl border border-white/10 bg-[#09142d] p-5"><div className="relative z-10"><div className="text-xl font-bold text-white">Global Signal Analytics</div><div className="mt-2 text-xs font-medium text-slate-300">Real-time endpoint matching and data flow</div></div><div className="absolute inset-x-4 bottom-3 z-10 flex items-center justify-between gap-3 rounded-lg border border-white/20 bg-[#060b1b]/90 px-4 py-3 text-sm backdrop-blur shadow-xl"><span className="flex items-center gap-2 font-bold text-emerald-400"><span className="ticker-dot h-2 w-2 rounded-full bg-emerald-400" />Live</span><span key={live.feed} className="row-in truncate font-medium text-white">{live.feed}</span><span className="font-mono font-bold tabular-nums text-cyan-300 whitespace-nowrap">{live.cps} calls/s</span></div><canvas ref={graphRef} className="absolute inset-0 h-full w-full" /></div></div></div></div></Tilt></div></section>
  );
}
