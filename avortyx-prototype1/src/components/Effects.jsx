import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { prefersReducedMotion } from '../hooks';

const MAGNETIC = '.mag, #hero-demo-link, #nav-start-link, #nav-demo-link, #final-demo-link, #hero-explore-link';

function splitWords(root) {
  let i = 0;
  const walk = (node, inGradient) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        if (!n.textContent.trim()) return;
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.append(part);
            return;
          }
          const s = document.createElement('span');
          s.className = 'w' + (inGradient ? ' gradient-text' : '');
          s.style.setProperty('--i', i++);
          s.textContent = part;
          frag.append(s);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) {
        walk(n, inGradient || n.classList.contains('gradient-text'));
      }
    });
  };
  walk(root, false);
}

// Smooth scroll, cursor spotlight, card glow, magnetic buttons and headline reveal
export default function Effects() {
  const spot = useRef(null);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const cleanups = [];

    if (!reduced) {
      const lenis = new Lenis({ anchors: { offset: -72 }, lerp: 0.1 });
      window.__lenis = lenis;
      let raf;
      const tick = (t) => {
        lenis.raf(t);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      cleanups.push(() => {
        cancelAnimationFrame(raf);
        lenis.destroy();
        window.__lenis = undefined;
      });
    }

    const fine = matchMedia('(pointer:fine)').matches;
    if (fine) {
      const el = spot.current;
      let tx = innerWidth / 2, ty = innerHeight / 3, x = tx, y = ty, raf;
      const loop = () => {
        x += (tx - x) * 0.12;
        y += (ty - y) * 0.12;
        el.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      const move = (e) => {
        tx = e.clientX;
        ty = e.clientY;
        el.classList.add('on');
        const g = e.target.closest?.('.gcard');
        if (g) {
          const r = g.getBoundingClientRect();
          g.style.setProperty('--mx', e.clientX - r.left + 'px');
          g.style.setProperty('--my', e.clientY - r.top + 'px');
        }
      };
      const leave = () => el.classList.remove('on');
      document.addEventListener('pointermove', move);
      document.documentElement.addEventListener('pointerleave', leave);
      cleanups.push(() => {
        cancelAnimationFrame(raf);
        document.removeEventListener('pointermove', move);
        document.documentElement.removeEventListener('pointerleave', leave);
      });

      if (!reduced) {
        document.querySelectorAll(MAGNETIC).forEach((b) => {
          const m = (e) => {
            const r = b.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            b.style.transform = 'translate(' + dx * 0.25 + 'px,' + dy * 0.35 + 'px)';
          };
          const out = () => {
            b.style.transform = '';
          };
          b.addEventListener('pointermove', m);
          b.addEventListener('pointerleave', out);
          cleanups.push(() => {
            b.removeEventListener('pointermove', m);
            b.removeEventListener('pointerleave', out);
          });
        });
      }
    }

    // Headings are static markup, so replacing their text nodes is safe
    const heads = [...document.querySelectorAll('main h1, main h2')];
    if (!reduced) {
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in');
              io.unobserve(e.target);
            }
          }),
        { threshold: 0.2 },
      );
      heads.forEach((h) => {
        if (!h.classList.contains('wsplit')) splitWords(h);
        h.classList.add('wsplit');
        io.observe(h);
      });
      cleanups.push(() => io.disconnect());
    }

    return () => cleanups.forEach((f) => f());
  }, []);

  return <div ref={spot} className="spotlight" aria-hidden="true" />;
}
