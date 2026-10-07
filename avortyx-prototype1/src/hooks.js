import { useEffect } from 'react';

const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion:reduce)').matches;

// Fades elements with the `reveal` class in once they scroll into view
export function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// Runs draw(canvas, ctx, dpr, t) every frame while the canvas is on screen; resizes only when its box changes
export function useCanvasLoop(ref, draw) {
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext('2d');
    let raf = 0;
    let visible = false;
    const state = { t: 0 };
    const loop = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = Math.round(c.clientWidth * dpr);
      const h = Math.round(c.clientHeight * dpr);
      if (c.width !== w || c.height !== h) {
        c.width = w;
        c.height = h;
      } else {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, w, h);
      }
      draw(c, ctx, dpr, state);
      raf = requestAnimationFrame(loop);
    };
    const obs = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible) raf = requestAnimationFrame(loop);
      },
      { rootMargin: '80px' },
    );
    obs.observe(c);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export { prefersReducedMotion };
