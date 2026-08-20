import { useEffect, useRef, useState } from 'react';
import { useScrollEffect } from '../hooks/useScrollEffect.js';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

const SECTIONS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'skills', label: 'Habilidades' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'contacto', label: 'Contacto' },
];

const SectionNav = () => {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(SECTIONS[0].id);
  const fillRef = useRef(null);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!els.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useScrollEffect((_, progress) => {
    if (fillRef.current) fillRef.current.style.transform = `scaleY(${progress})`;
  });

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <nav
      aria-label="Navegación de secciones"
      className="group fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:flex"
    >
      <div className="relative flex flex-col items-end gap-1 transition-all duration-300 group-hover:gap-5">
        <span
          className="absolute right-[3px] top-3 bottom-3 w-px rounded-full bg-slate-200 transition-[width,right] duration-300 group-hover:right-[5px] group-hover:w-0.5 dark:bg-slate-700"
          aria-hidden="true"
        />
        <span
          ref={fillRef}
          className="absolute right-[3px] top-3 bottom-3 w-px origin-top rounded-full bg-gradient-to-b from-brand-500 to-accent-500 transition-[width,right] duration-300 group-hover:right-[5px] group-hover:w-0.5 will-change-transform"
          style={{ transform: 'scaleY(0)' }}
          aria-hidden="true"
        />
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => go(s.id)}
              aria-current={isActive ? 'true' : undefined}
              className="relative flex h-6 items-center gap-3 outline-none"
            >
              <span
                className={`pointer-events-none whitespace-nowrap rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-600 opacity-0 shadow-sm backdrop-blur transition-all duration-200 group-hover:opacity-100 dark:bg-slate-900/90 dark:text-slate-200 ${
                  isActive ? 'opacity-100 text-brand-600 dark:text-brand-300' : ''
                }`}
              >
                {s.label}
              </span>
              <span
                className={`relative z-10 h-1.5 w-1.5 rounded-full border-2 transition-all duration-300 group-hover:h-2.5 group-hover:w-2.5 ${
                  isActive
                    ? 'scale-125 border-brand-500 bg-brand-500'
                    : 'border-slate-300 bg-white group-hover:border-brand-400 dark:border-slate-600 dark:bg-slate-900'
                }`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default SectionNav;
