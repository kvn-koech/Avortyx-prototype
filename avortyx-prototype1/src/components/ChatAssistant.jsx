import { useEffect, useRef, useState } from 'react';
import { useModal } from '../modalContext';
import { answer, SUGGESTIONS } from '../assistantKb';
import { scrollToId } from '../scroll';

const GREETING = { from: 'bot', text: "Hi, I'm the Avortyx assistant. Ask me about pricing, compliance, routing speed or buyers." };

export default function ChatAssistant() {
  const { open: openModal } = useModal();
  const [show, setShow] = useState(false);
  const [msgs, setMsgs] = useState([GREETING]);
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);
  const end = useRef(null);
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    end.current?.scrollIntoView({ block: 'end' });
  }, [msgs, typing, show]);
  useEffect(() => {
    if (!show) return undefined;
    const esc = (e) => e.key === 'Escape' && setShow(false);
    addEventListener('keydown', esc);
    return () => removeEventListener('keydown', esc);
  }, [show]);

  const send = (q) => {
    const v = q.trim();
    if (!v || typing) return;
    setMsgs((m) => [...m, { from: 'me', text: v }]);
    setText('');
    setTyping(true);
    const r = answer(v);
    timer.current = setTimeout(() => {
      setMsgs((m) => [...m, { from: 'bot', text: r.a, act: r.act }]);
      setTyping(false);
    }, 500 + Math.min(900, r.a.length * 4));
  };
  const act = ([target]) => {
    if (target.startsWith('#')) {
      setShow(false);
      scrollToId(target.slice(1));
    } else openModal(target);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[56] flex flex-col items-end gap-3">
      {show && (
        <div role="dialog" aria-label="Avortyx assistant" className="glass flex h-[min(32rem,calc(100svh-7rem))] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl bg-[#0a1129]/95">
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
            <span className="h-2 w-2 rounded-full bg-emerald" />
            <div className="flex-1">
              <div className="text-sm">Avortyx assistant</div>
              <div className="mono text-muted">Instant answers</div>
            </div>
            <button type="button" aria-label="Close chat" onClick={() => setShow(false)} className="text-muted hover:text-white">✕</button>
          </div>
          <div data-lenis-prevent className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {msgs.map((m, i) => (
              <div key={i} className={m.from === 'me' ? 'flex justify-end' : 'flex'}>
                <div className={'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-6 ' + (m.from === 'me' ? 'bg-gradient-to-r from-cyan to-indigo text-[#071226]' : 'border border-white/10 bg-white/[.04]')}>
                  {m.text}
                  {m.act && <button type="button" onClick={() => act(m.act)} className="mono mt-2 block text-cyan hover:underline">{m.act[1]} →</button>}
                </div>
              </div>
            ))}
            {typing && <div className="mono text-muted">Typing…</div>}
            {msgs.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button key={s} type="button" onClick={() => send(s)} className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-muted transition hover:border-cyan/60 hover:text-white">{s}</button>
                ))}
              </div>
            )}
            <div ref={end} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(text); }} className="flex gap-2 border-t border-white/10 p-3">
            <input value={text} maxLength={200} onChange={(e) => setText(e.target.value)} placeholder="Ask a question…" aria-label="Your question" className="min-w-0 flex-1 rounded-full border border-white/15 bg-[#0b1330] px-4 py-2.5 text-sm text-white outline-none focus:border-cyan/60" />
            <button type="submit" className="rounded-full bg-gradient-to-r from-cyan to-indigo px-4 text-sm font-medium text-[#071226]">Send</button>
          </form>
        </div>
      )}
      <button type="button" aria-label={show ? 'Close assistant' : 'Open assistant'} onClick={() => setShow((s) => !s)} className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-cyan to-indigo text-[#071226] shadow-[0_10px_30px_rgba(87,195,255,.35)] transition hover:scale-105">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /></svg>
      </button>
    </div>
  );
}
