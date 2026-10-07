import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { useCanvasLoop } from '../hooks';
import Tilt from './Tilt';
import { useModal } from '../modalContext';

function drawDataOcean(c, ctx, dpr, s) {
  ctx.clearRect(0, 0, c.width, c.height);
  if (!s.init) {
    s.init = true;
    s.t = 0;
  }
  s.t += 0.002;

  const cx = c.width / 2;
  const cy = c.height / 2 + 180 * dpr; // Push it down into the floor
  const fov = 500 * dpr;
  const cols = 35;
  const rows = 35;
  const spacingX = 85 * dpr;
  const spacingZ = 85 * dpr;

  // Pre-calculate points to build the mesh
  let pts = [];
  for (let iz = 0; iz < rows; iz++) {
    let row = [];
    let z = iz * spacingZ + 120 * dpr;
    for (let ix = 0; ix < cols; ix++) {
      let x = (ix - cols / 2) * spacingX;
      let d = Math.sqrt(x * x + z * z);
      
      // Complex undulating wave dynamics
      let y = Math.sin(d * 0.0025 - s.t * 3) * 70 * dpr 
            + Math.sin(x * 0.015 + s.t * 1.5) * 45 * dpr 
            + Math.cos(z * 0.01 - s.t) * 55 * dpr;

      let scale = fov / z;
      row.push({
        x: cx + x * scale,
        y: cy + y * scale,
        alpha: Math.max(0, Math.min(1, (2600 * dpr - z) / (2000 * dpr)))
      });
    }
    pts.push(row);
  }

  // Draw the wireframe mesh
  ctx.lineWidth = 1 * dpr;
  ctx.strokeStyle = '#57c3ff';
  
  for (let iz = 0; iz < rows; iz++) {
    for (let ix = 0; ix < cols; ix++) {
      let p = pts[iz][ix];
      if (p.alpha <= 0) continue;
      
      ctx.globalAlpha = p.alpha * 0.25;
      
      // Add glowing routing nodes at specific intersections
      if (ix % 4 === 0 && iz % 4 === 0) {
          ctx.fillStyle = '#00ca72';
          ctx.globalAlpha = p.alpha * 0.7;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.8 * dpr, 0, 7);
          ctx.fill();
          ctx.globalAlpha = p.alpha * 0.25;
      }
      
      ctx.beginPath();
      if (ix < cols - 1) {
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(pts[iz][ix+1].x, pts[iz][ix+1].y);
      }
      if (iz < rows - 1) {
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(pts[iz+1][ix].x, pts[iz+1][ix].y);
      }
      ctx.stroke();
    }
  }
}



function drawGraph(c, ctx, dpr, s) {
  ctx.clearRect(0, 0, c.width, c.height);
  if (!s.init) {
    s.init = true;
    s.nodes = Array.from({ length: 55 }, () => ({
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: (Math.random() - 0.5) * 2,
      label: Math.random() > 0.85 ? `US-${Math.floor(Math.random()*90 + 10)}` : null
    }));
    s.edges = [];
    for (let i = 0; i < s.nodes.length; i++) {
      for (let j = i + 1; j < s.nodes.length; j++) {
        let n1 = s.nodes[i], n2 = s.nodes[j];
        if (Math.hypot(n1.x - n2.x, n1.y - n2.y, n1.z - n2.z) < 0.7) {
          s.edges.push([i, j]);
        }
      }
    }
    s.packets = [];
  }
  
  s.t += 0.003;
  if (Math.random() < 0.25) {
    let edge = s.edges[Math.floor(Math.random() * s.edges.length)];
    if (edge) {
      s.packets.push({
        e: edge, p: 0,
        speed: 0.015 + Math.random() * 0.03,
        color: Math.random() > 0.3 ? '#00ca72' : '#57c3ff'
      });
    }
  }

  const cx = c.width / 2, cy = c.height / 2;
  const radius = Math.min(cx, cy) * 0.85;
  const cosT = Math.cos(s.t), sinT = Math.sin(s.t);
  const cosX = Math.cos(s.t * 0.6), sinX = Math.sin(s.t * 0.6);

  const projectedNodes = s.nodes.map(node => {
    let x1 = node.x * cosT - node.z * sinT;
    let z1 = node.z * cosT + node.x * sinT;
    let y2 = node.y * cosX - z1 * sinX;
    let z2 = z1 * cosX + node.y * sinX;
    let scale = 2.8 / (2.8 + z2);
    return { x: cx + x1 * radius * scale, y: cy + y2 * radius * scale, s: scale, z: z2, label: node.label };
  });

  ctx.lineWidth = 1 * dpr;
  for (let [i, j] of s.edges) {
    let p1 = projectedNodes[i], p2 = projectedNodes[j];
    let avgZ = (p1.z + p2.z) / 2;
    ctx.strokeStyle = `rgba(108, 114, 255, ${Math.max(0.02, 0.18 - avgZ * 0.15)})`;
    ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
  }

  ctx.font = `${10 * dpr}px ui-monospace, SFMono-Regular, Menlo, Monaco, monospace`;
  for (let p of projectedNodes) {
    let alpha = Math.max(0.05, 0.5 - p.z * 0.3);
    ctx.fillStyle = `rgba(87, 195, 255, ${alpha})`;
    ctx.beginPath(); ctx.arc(p.x, p.y, 1.5 * dpr * p.s, 0, 7); ctx.fill();
    if (p.label && p.z < 0) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(0.8, alpha + 0.2)})`;
      ctx.fillText(p.label, p.x + 6 * dpr, p.y - 2 * dpr);
    }
  }

  for (let i = s.packets.length - 1; i >= 0; i--) {
    let pkt = s.packets[i];
    pkt.p += pkt.speed;
    if (pkt.p >= 1) { s.packets.splice(i, 1); continue; }
    let p1 = projectedNodes[pkt.e[0]], p2 = projectedNodes[pkt.e[1]];
    let px = p1.x + (p2.x - p1.x) * pkt.p, py = p1.y + (p2.y - p1.y) * pkt.p;
    let ps = p1.s + (p2.s - p1.s) * pkt.p;
    
    ctx.fillStyle = pkt.color;
    ctx.globalAlpha = 1;
    ctx.beginPath(); ctx.arc(px, py, 2.2 * dpr * ps, 0, 7); ctx.fill();
    ctx.globalAlpha = 0.3;
    ctx.beginPath(); ctx.arc(px, py, 6 * dpr * ps, 0, 7); ctx.fill();
  }
  ctx.globalAlpha = 1;
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
  const streamRef = useRef(null);
  const graphRef = useRef(null);
  useCanvasLoop(streamRef, drawDataOcean);
  useCanvasLoop(graphRef, drawGraph);
  return (
    <section className="grid-bg relative flex min-h-[100svh] items-center overflow-hidden px-6 pb-[clamp(3rem,6vw,5rem)] pt-[clamp(6rem,8vw,7.5rem)] lg:px-10">
      <canvas ref={streamRef} className="absolute inset-0 h-full w-full opacity-[0.35]" />
      <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="premium-glow" aria-hidden="true" />
      <div className="relative mx-auto grid w-full max-w-[1320px] mt-2 lg:mt-2 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
        <div className="reveal">
          <h1 className="max-w-3xl text-[clamp(2.8rem,5.2vw,6rem)] font-medium leading-[.88] tracking-tight text-slate-50">Routing built for <em className="gradient-text font-semibold not-italic">performance.</em></h1>
          <p className="mt-9 max-w-[38ch] text-lg font-normal leading-relaxed text-slate-400">High-frequency decision engine for performance marketing. Distribute calls and leads with millisecond precision, predictive intent scoring, and dynamic payout optimization.</p>
          <div className="mt-10 flex flex-wrap items-center gap-7">
            <button type="button" id="hero-demo-link" onClick={() => open('demo')} className="relative overflow-hidden rounded-full p-[1px] shadow-lg shadow-cyan/20 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo/40 group">
              <span className="absolute inset-0 bg-gradient-to-r from-cyan via-indigo to-purple-500 opacity-80 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative flex items-center justify-center rounded-full bg-[#0a0e17] px-8 py-4 text-sm font-semibold text-white transition-all duration-500 group-hover:bg-opacity-0 group-hover:text-white">Book Demo</span>
            </button>
            <a id="hero-explore-link" href="#capabilities" className="flex items-center gap-2 text-sm font-medium text-cyan hover:text-white transition-colors">
              Explore Platform <Icon icon="lucide:arrow-right" className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="mono text-muted">Screened on every call</span>
            <span className="mono rounded-full border border-emerald/30 px-3 py-1 text-emerald">✓ TCPA</span>
            <span className="mono rounded-full border border-emerald/30 px-3 py-1 text-emerald">✓ DNC</span>
            <span className="mono rounded-full border border-emerald/30 px-3 py-1 text-emerald">✓ VoIP</span>
          </div>
        </div>
          <div className="panel glass luxury-shadow floating reveal relative overflow-hidden rounded-[24px] p-3 lg:p-4" style={{ transitionDelay: ".15s", WebkitFontSmoothing: "antialiased", textRendering: "optimizeLegibility" }}>
            <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ml-4 font-mono text-[10px] text-indigo-300 tracking-wider">avortyx-en2Z6&amp;VRNUT03B7T5AR</span>
              <span className="ml-auto text-cyan-300">•••</span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[120px_1fr]">
              <aside className="space-y-1.5">
                {NAV.map((n, i) => (
                  <div key={n} className={'rounded-lg px-2.5 py-2 text-[13px] transition-colors duration-500 ' + (i === live.tab ? 'border border-indigo/40 bg-indigo/20 font-medium text-white' : 'border border-transparent text-slate-50 hover:text-white')}>
                    {i === live.tab ? '▣' : '□'} &nbsp; {n}
                  </div>
                ))}
              </aside>
              <div>
                <div className="grid gap-2.5 sm:grid-cols-3">
                  {[['Total Routed Signals', live.signals.toLocaleString(), (live.delta >= 0 ? '+' : '') + live.delta.toFixed(1) + '% vs last hour'], ['Routing Latency', live.latency.toFixed(1) + ' ms', 'Ultra-low performance'], ['Match Win Rate', live.win.toFixed(1) + '%', 'Optimal distribution']].map(([l, v, n]) => (
                    <div key={l} className="glass rounded-xl border-white/10 p-3 sm:p-4 transition duration-300 hover:-translate-y-1 overflow-hidden">
                      <div className="text-[11.5px] font-normal text-white whitespace-nowrap truncate">{l}</div>
                      <div className="mt-1 text-lg font-medium text-white font-mono tabular-nums tracking-wide whitespace-nowrap truncate">{v}</div>
                      <div className="mt-0.5 text-[10px] font-normal text-emerald-400 whitespace-nowrap truncate">{n}</div>
                    </div>
                  ))}
                </div>
                <div className="relative mt-2.5 h-[200px] overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-black to-[#030612] shadow-inner p-4">
                  <div className="relative z-10">
                    <div className="text-lg font-medium text-white tracking-wide">Global Signal Analytics</div>
                    <div className="mt-1 text-[11.5px] font-normal text-white">Real-time endpoint matching and data flow</div>
                  </div>
                  <div className="absolute inset-x-3 bottom-3 z-10 flex items-center justify-between gap-3 rounded-lg border border-white/20 bg-[#0a0f1d]/90 px-3 py-2 text-[13px] backdrop-blur shadow-xl">
                    <span className="flex items-center gap-2 font-normal text-emerald-400">
                      <span className="ticker-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />Live
                    </span>
                    <span key={live.feed} className="row-in truncate font-normal text-white">{live.feed}</span>
                    <span className="font-mono font-normal tabular-nums text-cyan-300 whitespace-nowrap">{live.cps} calls/s</span>
                  </div>
                  <canvas ref={graphRef} className="absolute inset-0 h-full w-full opacity-80" />
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
