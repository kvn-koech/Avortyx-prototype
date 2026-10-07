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

// Runs draw(canvas, ctx, dpr, t) every animation frame; the canvas is resized to its CSS box each frame
export function useCanvasLoop(ref, draw) {
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext('2d');
    let raf;
    const state = { t: 0 };
    const loop = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      c.width = c.clientWidth * dpr;
      c.height = c.clientHeight * dpr;
      draw(c, ctx, dpr, state);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export { prefersReducedMotion };
