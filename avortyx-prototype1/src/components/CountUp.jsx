import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../hooks';

export default function CountUp({ to, decimals = 0, suffix = '', duration = 1800, className = '' }) {
  const ref = useRef(null);
  const [v, setV] = useState(prefersReducedMotion() ? to : 0);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t) => {
        const k = Math.min(1, (t - t0) / duration);
        setV(to * (1 - Math.pow(1 - k, 4)));
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return <span ref={ref} className={className}>{v.toFixed(decimals)}{suffix}</span>;
}
