import { useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

const useMagnetic = (strength = 0.3, max = 8) => {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const raf = useRef(0);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const x = Math.max(-max, Math.min(max, dx * strength));
      const y = Math.max(-max, Math.min(max, dy * strength));
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = '';
  };

  return {
    ref,
    onMove: reduced ? undefined : onMove,
    onLeave: reduced ? undefined : onLeave,
    enabled: !reduced,
  };
};

const MagneticLink = ({ href, className = '', children, target, rel, onClick }) => {
  const { ref, onMove, onLeave } = useMagnetic(0.3, 8);

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${className} transition-transform duration-200 ease-out`}
    >
      {children}
    </a>
  );
};

export default MagneticLink;
