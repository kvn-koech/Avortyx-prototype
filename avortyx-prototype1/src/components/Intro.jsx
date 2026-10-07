import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../hooks';

export default function Intro() {
  const textRef = useRef(null);
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const timers = [
      setTimeout(() => {
        textRef.current.style.opacity = 1;
        textRef.current.style.transform = 'translateY(0)';
      }, 150),
      setTimeout(() => setFading(true), 1200),
      setTimeout(() => setGone(true), 1900),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (gone) return null;
  return (
    <div id="intro" className="fixed inset-0 z-[100] flex items-center justify-center bg-ground transition-opacity duration-700" style={fading ? { opacity: 0 } : undefined}>
      <div id="introText" ref={textRef} className="gradient-text text-5xl font-light tracking-[-.035em] opacity-0">avortyx</div>
    </div>
  );
}
