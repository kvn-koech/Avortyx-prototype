import { useEffect, useMemo, useRef, useState } from 'react';
import { useModal } from '../modalContext';
import { scrollToId } from '../scroll';

function Palette({ onClose }) {
  const { open: openModal } = useModal();
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);
  const input = useRef(null);

  const items = useMemo(() => [
    ['Book a demo', 'Action', () => openModal('demo')],
    ['Request access', 'Action', () => openModal('access')],
    ['Contact sales', 'Action', () => openModal('sales')],
    ['Try the live demo', 'Go to', () => scrollToId('#demo')],
    ['Platform', 'Go to', () => scrollToId('#platform')],
    ['How it works', 'Go to', () => scrollToId('#how')],
    ['Live monitor', 'Go to', () => scrollToId('#live')],
    ['Customers', 'Go to', () => scrollToId('#customers')],
    ['Pricing', 'Go to', () => scrollToId('#pricing')],
    ['FAQ', 'Go to', () => scrollToId('#faq')],
    ['Documentation', 'Info', () => openModal('docs')],
    ['Security', 'Info', () => openModal('security')],
  ], [openModal]);
  const list = items.filter((i) => i[0].toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    const t = setTimeout(() => input.current?.focus(), 30);
    window.__lenis?.stop();
    return () => {
      clearTimeout(t);
      window.__lenis?.start();
    };
  }, []);

  const run = (it) => {
    onClose();
    setTimeout(it[2], 80);
  };
  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIdx((i) => Math.min(list.length - 1, i + 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setIdx((i) => Math.max(0, i - 1)); }
    if (e.key === 'Enter' && list[idx]) run(list[idx]);
  };

  return (
    <div className="fixed inset-0 z-[110] grid place-items-start bg-[#030617]/70 p-4 pt-[14vh] backdrop-blur-md" data-lenis-prevent onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-label="Command palette" className="glass mx-auto w-full max-w-xl overflow-hidden rounded-2xl">
        <input ref={input} value={q} onChange={(e) => { setQ(e.target.value); setIdx(0); }} onKeyDown={onKey} placeholder="Search sections and actions…" className="w-full border-b border-white/10 bg-transparent px-5 py-4 text-sm text-white outline-none placeholder:text-white/30" />
        <ul className="max-h-[50vh] overflow-y-auto p-2">
          {list.map((it, i) => (
            <li key={it[0]}>
              <button type="button" onMouseEnter={() => setIdx(i)} onClick={() => run(it)} className={'flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm ' + (i === idx ? 'bg-white/10 text-white' : 'text-muted')}>
                {it[0]}<span className="mono text-white/40">{it[1]}</span>
              </button>
            </li>
          ))}
          {!list.length && <li className="px-4 py-6 text-center text-sm text-muted">No results</li>}
        </ul>
        <div className="mono flex justify-between border-t border-white/10 px-5 py-3 text-white/40"><span>↑↓ navigate · ↵ select</span><span>esc close</span></div>
      </div>
    </div>
  );
}

export default function CommandPalette() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const key = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShow((x) => !x);
      }
      if (e.key === 'Escape') setShow(false);
    };
    const ev = () => setShow(true);
    addEventListener('keydown', key);
    addEventListener('avortyx:palette', ev);
    return () => {
      removeEventListener('keydown', key);
      removeEventListener('avortyx:palette', ev);
    };
  }, []);

  return show ? <Palette onClose={() => setShow(false)} /> : null;
}
