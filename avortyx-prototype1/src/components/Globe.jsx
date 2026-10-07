import { useRef } from 'react';
import { useCanvasLoop } from '../hooks';

const toXYZ = (lat, lon) => {
  const la = (lat * Math.PI) / 180;
  const lo = (lon * Math.PI) / 180;
  return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)];
};

// Evenly spread points on a sphere (Fibonacci lattice)
const DOTS = Array.from({ length: 520 }, (_, i) => {
  const y = 1 - (i / 519) * 2;
  const r = Math.sqrt(1 - y * y);
  const th = i * 2.399963;
  return [Math.cos(th) * r, y, Math.sin(th) * r];
});
const HUB = toXYZ(39, -98);
const NODES = [[40.7, -74], [34, -118], [31, -97], [28, -82], [41.9, -87.6], [47.6, -122.3], [33.7, -84.4], [39.9, -83]].map(([a, b]) => toXYZ(a, b));

// Point along the great circle between a and b, lifted off the surface to form an arc
function arc(a, b, t) {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const om = Math.acos(dot);
  const s = Math.sin(om) || 1;
  const k1 = Math.sin((1 - t) * om) / s;
  const k2 = Math.sin(t * om) / s;
  const lift = 1 + 0.28 * Math.sin(Math.PI * t);
  return [(a[0] * k1 + b[0] * k2) * lift, (a[1] * k1 + b[1] * k2) * lift, (a[2] * k1 + b[2] * k2) * lift];
}

function draw(c, ctx, d, s) {
  s.t += 0.004;
  const w = c.width, h = c.height;
  const R = Math.min(w, h) * 0.34;
  const cx = w / 2, cy = h / 2;
  const ay = s.t, ax = 0.45;
  const project = (p) => {
    const x1 = p[0] * Math.cos(ay) + p[2] * Math.sin(ay);
    const z1 = -p[0] * Math.sin(ay) + p[2] * Math.cos(ay);
    const y2 = p[1] * Math.cos(ax) - z1 * Math.sin(ax);
    const z2 = p[1] * Math.sin(ax) + z1 * Math.cos(ax);
    return [cx + x1 * R, cy - y2 * R, z2];
  };

  ctx.clearRect(0, 0, w, h);
  const glow = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.5);
  glow.addColorStop(0, 'rgba(108,114,255,.18)');
  glow.addColorStop(1, 'rgba(108,114,255,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  for (const p of DOTS) {
    const [x, y, z] = project(p);
    ctx.globalAlpha = z > 0 ? 0.25 + z * 0.55 : 0.07;
    ctx.fillStyle = '#aeb9e1';
    ctx.fillRect(x, y, 1.6 * d, 1.6 * d);
  }

  NODES.forEach((n, i) => {
    ctx.strokeStyle = i % 2 ? '#6c72ff' : '#57c3ff';
    ctx.lineWidth = 1.2 * d;
    ctx.beginPath();
    for (let k = 0; k <= 40; k++) {
      const [x, y, z] = project(arc(HUB, n, k / 40));
      ctx.globalAlpha = z > -0.1 ? 0.55 : 0.08;
      if (k) ctx.lineTo(x, y); else ctx.moveTo(x, y);
    }
    ctx.stroke();

    const [px, py, pz] = project(arc(HUB, n, (s.t * 8 + i * 0.17) % 1));
    ctx.globalAlpha = pz > -0.1 ? 1 : 0.15;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(px, py, 2.4 * d, 0, 7);
    ctx.fill();

    const [nx, ny, nz] = project(n);
    ctx.globalAlpha = nz > 0 ? 1 : 0.2;
    ctx.fillStyle = '#00ca72';
    ctx.beginPath();
    ctx.arc(nx, ny, 3.2 * d, 0, 7);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

export default function Globe({ className = '' }) {
  const ref = useRef(null);
  useCanvasLoop(ref, draw);
  return <canvas ref={ref} className={className} aria-label="Rotating globe showing calls routed to buyers" role="img" />;
}
