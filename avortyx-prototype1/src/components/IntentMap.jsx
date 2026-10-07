import { useRef } from 'react';
import { useCanvasLoop } from '../hooks';
import US from './usOutline';
import { CITIES } from './markets';

const ROUTES = [[17, 11], [3, 7], [11, 13], [7, 13], [0, 6], [17, 18], [13, 14], [2, 3], [7, 11], [8, 13], [16, 17], [5, 7]];

const K = Math.cos(0.66);
const LON0 = -125.2, LAT1 = 49.6;
const px = (lon) => (lon - LON0) * K;
const py = (lat) => LAT1 - lat;
const W = 59 * K, H = 25.6;

const PTS = US.map(([lo, la]) => [px(lo), py(la)]);
function inside(x, y) {
  let c = false;
  for (let i = 0, j = PTS.length - 1; i < PTS.length; j = i++) {
    const [xi, yi] = PTS[i], [xj, yj] = PTS[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

const CXY = CITIES.map((c) => [px(c[1]), py(c[2])]);
const DOTS = [];
for (let y = 0; y < H; y += 0.42) {
  for (let x = 0; x < W; x += 0.42 * K + 0.1) {
    if (!inside(x, y)) continue;
    const w = CXY.map((c, i) => {
      const d = Math.hypot(x - c[0], y - c[1]);
      return [d, (CITIES[i][3] / 100) * Math.exp(-(d * d) / 7)];
    });
    DOTS.push({ x, y, w, base: w.reduce((a, b) => a + b[1], 0) });
  }
}

const mix = (a, b, t) => [Math.round(a[0] + (b[0] - a[0]) * t), Math.round(a[1] + (b[1] - a[1]) * t), Math.round(a[2] + (b[2] - a[2]) * t)];
const LOW = [48, 62, 108], MID = [87, 195, 255], HIGH = [170, 160, 255];

export default function IntentMap({ indexRef, className = '' }) {
  const ref = useRef(null);
  const ptr = useRef(null);

  useCanvasLoop(ref, (c, x, d, s) => {
    s.t += 0.016;
    if (!s.hv) s.hv = CITIES.map(() => 0);
    const t = s.t;
    const w = c.width, h = c.height;
    const sc = Math.min(w / W, h / H) * 0.96;
    const ox = (w - W * sc) / 2, oy = (h - H * sc) / 2;
    const X = (v) => ox + v * sc, Y = (v) => oy + v * sc;
    x.clearRect(0, 0, w, h);

    // hovered market
    let hover = -1;
    if (ptr.current) {
      const mx = ptr.current[0] * d, my = ptr.current[1] * d;
      let best = 26 * d;
      CXY.forEach((cc, i) => {
        const dd = Math.hypot(X(cc[0]) - mx, Y(cc[1]) - my);
        if (dd < best) { best = dd; hover = i; }
      });
    }
    s.hv.forEach((v, i) => { s.hv[i] += ((i === hover ? 1 : 0) - v) * 0.15; });

    // ambient haze under the land
    const hz = x.createRadialGradient(w * 0.5, h * 0.55, 0, w * 0.5, h * 0.55, w * 0.5);
    hz.addColorStop(0, 'rgba(108,114,255,.14)');
    hz.addColorStop(1, 'rgba(108,114,255,0)');
    x.fillStyle = hz;
    x.fillRect(0, 0, w, h);

    // outline with soft glow
    x.save();
    x.beginPath();
    PTS.forEach(([a, b], i) => (i ? x.lineTo(X(a), Y(b)) : x.moveTo(X(a), Y(b))));
    x.closePath();
    x.shadowColor = 'rgba(87,195,255,.55)';
    x.shadowBlur = 14 * d;
    x.strokeStyle = 'rgba(87,195,255,.5)';
    x.lineWidth = 1.1 * d;
    x.stroke();
    x.restore();

    // dot matrix coloured by intent
    const scan = ((t * 0.16) % 1.3) * W - 0.15 * W;
    let total = 0;
    for (const p of DOTS) {
      let v = p.base * 1.1;
      for (let i = 0; i < p.w.length; i++) {
        const dist = p.w[i][0];
        const ring = Math.exp(-Math.pow(dist - ((t * 1.5 + i * 1.3) % 8), 2) * 3);
        v += ring * 0.45 * (CITIES[i][3] / 100) + s.hv[i] * Math.exp(-dist * dist / 2.5) * 0.35;
      }
      const sd = p.x - scan;
      v += Math.exp(-sd * sd * 5) * 0.22;
      v = Math.min(1, v);
      total += v;
      const col = v < 0.5 ? mix(LOW, MID, v * 2) : mix(MID, HIGH, (v - 0.5) * 2);
      x.fillStyle = 'rgba(' + col.join(',') + ',' + (0.16 + v * 0.84).toFixed(2) + ')';
      const r = (0.55 + v * 1.25) * d;
      x.beginPath();
      x.arc(X(p.x), Y(p.y), r, 0, 7);
      x.fill();
    }
    if (indexRef.current) indexRef.current.textContent = (60 + (total / DOTS.length) * 70 + Math.sin(t) * 1.2).toFixed(1);

    // routes with comet trails
    ROUTES.forEach(([a, b], i) => {
      const x1 = X(CXY[a][0]), y1 = Y(CXY[a][1]), x2 = X(CXY[b][0]), y2 = Y(CXY[b][1]);
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - Math.hypot(x2 - x1, y2 - y1) * 0.3;
      const at = (u) => [(1 - u) * (1 - u) * x1 + 2 * (1 - u) * u * mx + u * u * x2, (1 - u) * (1 - u) * y1 + 2 * (1 - u) * u * my + u * u * y2];
      x.strokeStyle = 'rgba(87,195,255,.16)';
      x.lineWidth = 1 * d;
      x.beginPath();
      x.moveTo(x1, y1);
      x.quadraticCurveTo(mx, my, x2, y2);
      x.stroke();
      const u = (t * 0.32 + i * 0.29) % 1;
      for (let k = 0; k < 10; k++) {
        const uu = u - k * 0.012;
        if (uu < 0) break;
        const [bx, by] = at(uu);
        x.fillStyle = 'rgba(160,230,255,' + (0.9 * (1 - k / 10)).toFixed(2) + ')';
        x.beginPath();
        x.arc(bx, by, (2.2 - k * 0.14) * d, 0, 7);
        x.fill();
      }
      const [bx, by] = at(u);
      const g = x.createRadialGradient(bx, by, 0, bx, by, 10 * d);
      g.addColorStop(0, 'rgba(255,255,255,.9)');
      g.addColorStop(0.35, 'rgba(87,195,255,.45)');
      g.addColorStop(1, 'rgba(87,195,255,0)');
      x.fillStyle = g;
      x.beginPath();
      x.arc(bx, by, 10 * d, 0, 7);
      x.fill();
    });

    // markets
    x.font = '500 ' + 9.5 * d + 'px JetBrains Mono, monospace';
    CITIES.forEach((cty, i) => {
      const cx = X(CXY[i][0]), cy = Y(CXY[i][1]);
      const hot = cty[3] > 85;
      const pulse = (t * 0.6 + i * 0.27) % 1;
      x.strokeStyle = (hot ? 'rgba(0,202,114,' : 'rgba(87,195,255,') + (0.5 * (1 - pulse)).toFixed(2) + ')';
      x.lineWidth = 1.1 * d;
      x.beginPath();
      x.arc(cx, cy, (3 + pulse * 15) * d, 0, 7);
      x.stroke();
      x.fillStyle = hot ? '#00ca72' : '#fff';
      x.beginPath();
      x.arc(cx, cy, (2.4 + s.hv[i] * 2) * d, 0, 7);
      x.fill();
      if (w > 460 * d && (cty[3] >= 79 || s.hv[i] > 0.1)) {
        x.fillStyle = 'rgba(255,255,255,.8)';
        x.fillText(cty[0], cx + 8 * d, cy - 5 * d);
      }
    });

    // hover card
    if (hover >= 0) {
      const cty = CITIES[hover];
      const cx = X(CXY[hover][0]), cy = Y(CXY[hover][1]);
      const bw = 138 * d, bh = 66 * d;
      let bx = cx + 14 * d, by = cy - bh - 10 * d;
      if (bx + bw > w - 6 * d) bx = cx - bw - 14 * d;
      if (by < 6 * d) by = cy + 12 * d;
      x.save();
      x.fillStyle = 'rgba(10,18,44,.92)';
      x.strokeStyle = 'rgba(87,195,255,.55)';
      x.lineWidth = 1 * d;
      x.beginPath();
      x.roundRect(bx, by, bw, bh, 10 * d);
      x.fill();
      x.stroke();
      x.fillStyle = '#fff';
      x.font = '600 ' + 12 * d + 'px Manrope, sans-serif';
      x.fillText(cty[0] + ' · ' + cty[5], bx + 12 * d, by + 20 * d);
      x.font = '400 ' + 10.5 * d + 'px Manrope, sans-serif';
      x.fillStyle = '#aeb9e1';
      x.fillText('Intent score', bx + 12 * d, by + 38 * d);
      x.fillText('Calls / hour', bx + 12 * d, by + 54 * d);
      x.textAlign = 'right';
      x.fillStyle = '#57c3ff';
      x.fillText(String(cty[3]), bx + bw - 12 * d, by + 38 * d);
      x.fillStyle = '#fff';
      x.fillText(String(cty[4]), bx + bw - 12 * d, by + 54 * d);
      x.restore();
    }
  });

  return (
    <canvas
      ref={ref}
      className={className}
      role="img"
      aria-label="Animated map of caller intent across the United States"
      onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); ptr.current = [e.clientX - r.left, e.clientY - r.top]; }}
      onPointerLeave={() => { ptr.current = null; }}
    />
  );
}
