import { useModal } from '../modalContext';

export default function CTA() {
  const { open } = useModal();
  return (
    <section id="cta" className="section-wash px-6 py-[clamp(8rem,16vw,13rem)] lg:px-10"><div className="panel glass luxury-shadow mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-12 p-8 sm:p-14 lg:flex-row lg:items-center"><div><div className="mono text-cyan">Ready to route your first call?</div><h2 className="mt-6 max-w-[13ch] text-5xl font-light leading-[.9] tracking-[-.03em]">Turn every inbound call into revenue.</h2><p className="mt-7 max-w-xl leading-7 text-muted">Join the networks turning inbound calls into predictable revenue. Live in under 60 seconds · Transparent per-call billing · Cancel anytime.</p></div><button type="button" id="final-demo-link" onClick={() => open('demo')} className="rounded-full bg-gradient-to-r from-cyan to-indigo px-8 py-4 text-sm font-medium text-[#071226] shadow-lg shadow-cyan/20 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo/30">Book a demo <span className="ml-2">→</span></button></div></section>
  );
}
