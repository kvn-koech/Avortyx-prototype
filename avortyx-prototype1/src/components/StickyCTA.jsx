import { useEffect, useState } from 'react';
import { useModal } from '../modalContext';

export default function StickyCTA() {
  const { open } = useModal();
  const [vis, setVis] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const cta = document.querySelector('#cta')?.getBoundingClientRect();
      const nearEnd = cta && cta.top < innerHeight * 0.8;
      setVis(scrollY > innerHeight * 0.9 && !nearEnd);
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  if (gone) return null;
  return (
    <div className={'fixed inset-x-0 bottom-5 z-[55] flex justify-center px-4 pr-24 transition duration-500 ' + (vis ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-8 opacity-0')}>
      <div className="glass flex items-center gap-4 rounded-full py-2 pl-6 pr-2">
        <span className="hidden text-sm sm:inline">Ready to route your first call?</span>
        <button type="button" onClick={() => open('demo')} className="rounded-full bg-gradient-to-r from-cyan to-indigo px-5 py-2.5 text-xs font-medium text-[#071226]">Book a demo</button>
        <button type="button" aria-label="Dismiss" onClick={() => setGone(true)} className="grid h-8 w-8 place-items-center rounded-full text-muted hover:text-white">✕</button>
      </div>
    </div>
  );
}
