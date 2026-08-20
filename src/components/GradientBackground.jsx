import { useRef } from 'react';
import { useScrollEffect } from '../hooks/useScrollEffect.js';

const GradientBackground = () => {
  const slowRef = useRef(null);
  const fastRef = useRef(null);
  const violetRef = useRef(null);
  const auroraRef = useRef(null);

  useScrollEffect((scrollY) => {
    const y = scrollY * 0.15;
    if (slowRef.current) slowRef.current.style.transform = `translateY(${-y * 0.4}px)`;
    if (fastRef.current) fastRef.current.style.transform = `translateY(${y * 0.25}px)`;
    if (violetRef.current) violetRef.current.style.transform = `translateY(${-y * 0.18}px)`;
    if (auroraRef.current) auroraRef.current.style.transform = `translate(-50%, ${-y * 0.12}px)`;
  });

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div ref={slowRef} className="absolute right-[-60px] top-[-100px] will-change-transform">
        <div className="h-96 w-96 animate-float-fast rounded-full bg-brand-500/35 blur-[120px]" />
      </div>
      <div ref={fastRef} className="absolute bottom-16 left-[-80px] will-change-transform">
        <div className="h-80 w-80 animate-float-slow rounded-full bg-rose-400/25 blur-[110px]" />
      </div>
      <div ref={violetRef} className="absolute right-[10%] top-1/2 will-change-transform">
        <div className="h-72 w-72 animate-float-slow rounded-full bg-violet-500/25 blur-[120px]" />
      </div>
      <div
        ref={auroraRef}
        className="absolute left-1/2 top-1/4 h-[48rem] w-[48rem] -translate-x-1/2 will-change-transform"
      >
        <div className="h-full w-full animate-float-slow animate-hue-slow rounded-full bg-gradient-to-br from-brand-500/25 via-accent-500/20 to-violet-500/10 blur-[150px]" />
      </div>
    </div>
  );
};

export default GradientBackground;
