import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../hooks';
import Avatar from './Avatar';
import SocialIcon from './Social';

const items = [
  ['We moved 40 campaigns off a legacy tracker in a weekend. Time-to-connect dropped from 9 seconds to under 2, and our connect rate followed.', 'Head of Media Buying, Northaven Leads'],
  ['The live monitor alone is worth it. For the first time we can see what our buyers are actually doing with the calls we send them.', 'Avortyx customer'],
  ['Avortyx lets us focus on traffic instead of plumbing. Setting up a new buyer went from a two-day ticket to a ten-minute form.', 'Operations Lead, Calibr Media'],
  ['Finally, a router that actually understands intent. The scoring pays for itself on the first week of health traffic.', 'Founder, Tenpoint Performance'],
  ['We went from six spreadsheets and a carrier portal to one campaign config. Our publishers noticed the payout accuracy immediately.', 'VP Partnerships, Meridian Call Network'],
  ['Our buyers fill caps 3x faster because calls hit the right desk on the first ring. Nothing else we tried came close.', 'Avortyx customer'],
  ['TCPA screening on every attempt cut our compliance exceptions to zero. Our legal team stopped asking for weekly exports.', 'Avortyx customer'],
  ['Automated payouts closed the month in a day instead of a week. Our publishers get paid on time, every time.', 'Avortyx customer'],
];
const socialNames = ['X', 'LinkedIn', 'Facebook', 'Instagram', 'YouTube', 'Telegram'];
const via = ['LinkedIn', 'X', 'LinkedIn', 'X', 'LinkedIn', 'Instagram', 'X', 'LinkedIn'];
const N = items.length;
const STEP = 360 / N;
// Ring radius so neighbouring 300px cards just touch
const RADIUS = Math.round(150 / Math.tan(Math.PI / N));
const SPEED = 0.9; // degrees per frame at 60fps

export default function Testimonials() {
  const ringRef = useRef(null);
  const st = useRef({ angle: 0, target: null, paused: false, drag: null });
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    let raf;
    let last = performance.now();
    const loop = (now) => {
      const k = Math.min(3, (now - last) / 16.67);
      last = now;
      const s = st.current;
      if (s.target !== null) {
        s.angle += (s.target - s.angle) * Math.min(1, 0.09 * k);
        if (Math.abs(s.target - s.angle) < 0.05) { s.angle = s.target; s.target = null; }
      } else if (!s.paused && !s.drag && !prefersReducedMotion()) {
        s.angle += SPEED * k * 0.35;
      }
      if (ringRef.current) ringRef.current.style.transform = 'translateZ(-' + RADIUS + 'px) rotateY(' + -s.angle + 'deg)';
      const idx = ((Math.round(s.angle / STEP) % N) + N) % N;
      if (idx !== activeRef.current) { activeRef.current = idx; setActive(idx); }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const go = (dir) => {
    const s = st.current;
    s.target = (Math.round((s.target ?? s.angle) / STEP) + dir) * STEP;
  };
  const goTo = (i) => {
    const s = st.current;
    const cur = Math.round(s.angle / STEP);
    const diff = ((i - cur) % N + N + N / 2) % N - N / 2;
    s.target = (cur + diff) * STEP;
  };

  const onDown = (e) => { st.current.drag = { x: e.clientX, a: st.current.angle }; st.current.target = null; e.currentTarget.setPointerCapture(e.pointerId); };
  const onMove = (e) => { const d = st.current.drag; if (d) st.current.angle = d.a - (e.clientX - d.x) * 0.35; };
  const onUp = () => {
    const s = st.current;
    if (s.drag) { s.drag = null; s.target = Math.round(s.angle / STEP) * STEP; }
  };

  return (
    <section id="customers" className="section-wash overflow-hidden border-t border-white/10 px-6 py-[clamp(6rem,12vw,10rem)] lg:px-10">
      <div className="mx-auto max-w-[1320px]">
        <div className="reveal mb-14 flex items-center gap-4">
          <span className="mono text-cyan">Testimonials</span>
          <div className="line flex-1" />
        </div>
        <h2 className="mb-10 max-w-[16ch] text-5xl font-light leading-[.92] tracking-[-.03em]">
          Loved by <span className="gradient-text">performance marketers</span>
        </h2>

        <div
          className="relative mx-auto h-[380px] cursor-grab touch-pan-y select-none active:cursor-grabbing [perspective:1400px]"
          onMouseEnter={() => { st.current.paused = true; }}
          onMouseLeave={() => { st.current.paused = false; }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo/20 blur-3xl" />
          <div ref={ringRef} className="ring-3d absolute left-1/2 top-1/2 -ml-[150px] -mt-[130px] h-[260px] w-[300px]">
            {items.map(([q, who], k) => (
              <figure
                key={k}
                className="absolute inset-0 [backface-visibility:hidden]"
                style={{ transform: 'rotateY(' + k * STEP + 'deg) translateZ(' + RADIUS + 'px)' }}
              >
                <div
                  className={'glass tcard flex h-full flex-col justify-between rounded-2xl p-6 transition-all duration-700 ' + (active === k ? 'is-front' : 'opacity-60 saturate-50')}
                  style={{ animationDelay: -k * 0.8 + 's' }}
                >
                  <span className="pointer-events-none absolute -top-4 left-5 text-6xl leading-none text-cyan/30">“</span>
                  <blockquote className="text-sm leading-7 text-white/90">{q}</blockquote>
                  <figcaption className="flex items-center gap-3">
                    <Avatar n={k} size={40} className="ring-2 ring-cyan/40" />
                    <span className="mono min-w-0 flex-1 leading-5 text-cyan">{who}</span>
                    <SocialIcon name={via[k]} size={16} className="text-muted" />
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-5">
          <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="h-11 w-11 rounded-full border border-white/20 transition hover:border-cyan hover:text-cyan">←</button>
          <div className="flex items-center gap-2">
            {items.map((_, k) => (
              <button key={k} type="button" onClick={() => goTo(k)} aria-label={'Show testimonial ' + (k + 1)} className={'h-1.5 rounded-full transition-all duration-500 ' + (active === k ? 'w-8 bg-gradient-to-r from-cyan to-indigo' : 'w-1.5 bg-white/25 hover:bg-white/50')} />
            ))}
          </div>
          <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="h-11 w-11 rounded-full border border-white/20 transition hover:border-cyan hover:text-cyan">→</button>
        </div>

        <div className="reveal mt-14 flex flex-col items-center gap-6 border-t border-white/10 pt-10 md:flex-row md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <Avatar key={n} n={n} size={44} className="ring-2 ring-ground" />
              ))}
            </div>
            <p className="max-w-[26ch] text-sm leading-6 text-muted">Performance marketers routing calls with Avortyx every day.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="mono text-muted">Follow the community</span>
            {socialNames.map((n) => (
              <a key={n} href="#top" aria-label={n} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-muted transition hover:-translate-y-1 hover:border-cyan hover:text-cyan">
                <SocialIcon name={n} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
