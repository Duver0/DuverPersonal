import { useReveal } from '../hooks/useReveal.js';

const HIDDEN = {
  fade: 'opacity-0 translate-y-6',
  'slide-left': 'opacity-0 -translate-x-4',
  'zoom-in': 'opacity-0 scale-[0.96]',
  'blur-in': 'opacity-0 blur-[8px] scale-[0.98]',
};

const VISIBLE = 'opacity-100 translate-y-0 translate-x-0 scale-100 blur-0';

const Reveal = ({ children, delay = 0, className = '', variant = 'fade' }) => {
  const { ref, visible } = useReveal();
  const hidden = HIDDEN[variant] || HIDDEN.fade;

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? VISIBLE : hidden} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default Reveal;
