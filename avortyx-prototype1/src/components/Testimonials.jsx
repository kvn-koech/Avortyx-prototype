import { useEffect, useState } from 'react';
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
const STEP = 360 / items.length;
// Ring radius so neighbouring 300px cards just touch
const RADIUS = Math.round(150 / Math.tan(Math.PI / items.length));

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((x) => x + 1), 4500);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section id="customers" className="section-wash overflow-hidden border-t border-white/10 px-6 py-[clamp(6rem,12vw,10rem)] lg:px-10">
      <div className="mx-auto max-w-[1320px]">
        <div className="reveal mb-14 flex items-center gap-4">
          <span className="mono text-cyan">Testimonials</span>
          <div className="line flex-1" />
        </div>
        <h2 className="mb-10 max-w-[16ch] text-5xl font-light leading-[.92] tracking-[-.06em]">
          Loved by <span className="gradient-text">performance marketers</span>
        </h2>

        <div className="relative mx-auto h-[360px] [perspective:1400px]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div
            className="ring-3d absolute left-1/2 top-1/2 -ml-[150px] -mt-[130px] h-[260px] w-[300px]"
            style={{ transform: 'translateZ(-' + RADIUS + 'px) rotateY(' + -i * STEP + 'deg)' }}
          >
            {items.map(([q, who], k) => (
              <figure
                key={k}
                className="glass absolute inset-0 flex flex-col justify-between rounded-2xl p-6 [backface-visibility:hidden]"
                style={{ transform: 'rotateY(' + k * STEP + 'deg) translateZ(' + RADIUS + 'px)' }}
              >
                <blockquote className="text-sm leading-7 text-white/90">“{q}”</blockquote>
                <figcaption className="flex items-center gap-3">
                  <Avatar n={k} size={40} className="ring-2 ring-cyan/40" />
                  <span className="mono min-w-0 flex-1 leading-5 text-cyan">{who}</span>
                  <SocialIcon name={via[k]} size={16} className="text-muted" />
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <button type="button" onClick={() => setI((x) => x - 1)} aria-label="Previous testimonial" className="h-11 w-11 rounded-full border border-white/20 transition hover:border-cyan hover:text-cyan">←</button>
          <button type="button" onClick={() => setI((x) => x + 1)} aria-label="Next testimonial" className="h-11 w-11 rounded-full border border-white/20 transition hover:border-cyan hover:text-cyan">→</button>
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
        <p className="mono mt-6 text-center text-white/30">Portraits are illustrative mock avatars</p>
      </div>
    </section>
  );
}
