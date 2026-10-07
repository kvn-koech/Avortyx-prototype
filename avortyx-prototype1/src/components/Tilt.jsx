import { useRef } from 'react';

// Pointer-driven 3D tilt; the perspective lives on the wrapper so children can use translateZ
export default function Tilt({ children, max = 10, className = '', innerClassName = '' }) {
  const ref = useRef(null);

  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = 'rotateX(' + -py * max + 'deg) rotateY(' + px * max + 'deg)';
  };
  const leave = () => {
    ref.current.style.transform = '';
  };

  return (
    <div className={'[perspective:1000px] ' + className} onMouseMove={move} onMouseLeave={leave}>
      <div ref={ref} className={'tilt-inner h-full ' + innerClassName}>{children}</div>
    </div>
  );
}
