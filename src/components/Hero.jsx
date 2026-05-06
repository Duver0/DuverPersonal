import { useState, useEffect } from 'react';
import { CTA_LINKS, HERO_BADGES, HERO_PROFILE } from '../content/profile.js';

const AnimatedItem = ({ children, delay, className = '' }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const Hero = () => (
  <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-violet-600 px-8 py-10 text-white shadow-glow">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_55%)] opacity-30" aria-hidden="true" />
    <div className="relative flex flex-col items-center gap-10 lg:flex-row">
      <div className="flex-1">
        <AnimatedItem delay={100}>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-100">{HERO_PROFILE.name}</p>
        </AnimatedItem>
        <AnimatedItem delay={250}>
          <h1 className="mt-3 font-heading text-4xl leading-tight md:text-5xl">{HERO_PROFILE.headline}</h1>
        </AnimatedItem>
        <AnimatedItem delay={400}>
          <p className="mt-5 max-w-2xl text-lg text-brand-100/90">{HERO_PROFILE.summary}</p>
        </AnimatedItem>
        <AnimatedItem delay={550}>
          <div className="mt-8 flex flex-wrap gap-3">
            {HERO_BADGES.map((badge, idx) => (
              <span
                key={badge}
                className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur transition-all duration-300 hover:bg-white/25 hover:scale-105"
              >
                {badge}
              </span>
            ))}
          </div>
        </AnimatedItem>
        <AnimatedItem delay={700}>
          <div className="mt-10 flex flex-wrap gap-4">
            {CTA_LINKS.map((cta) => (
              <a
                key={cta.label}
                href={cta.href}
                target={cta.href.startsWith('http') ? '_blank' : undefined}
                rel={cta.href.startsWith('http') ? 'noreferrer' : undefined}
                className={`group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all ${
                  cta.primary ? 'bg-white text-brand-700 hover:-translate-y-0.5 hover:shadow-lg' : 'bg-white/15 text-white hover:bg-white/25'
                }`}
              >
                <i className={`${cta.brands ? 'fa-brands' : 'fa-solid'} ${cta.icon} text-sm`} />
                {cta.label}
              </a>
            ))}
          </div>
        </AnimatedItem>
      </div>
      <AnimatedItem delay={500} className="relative w-full max-w-sm">
        <div className="absolute inset-8 rounded-[32px] bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="relative rounded-[32px] border border-white/30 bg-white/10 p-6 text-center backdrop-blur-xl">
          <img
            src={HERO_PROFILE.photo}
            alt={HERO_PROFILE.name}
            className="mx-auto h-36 w-36 rounded-3xl object-cover shadow-2xl shadow-brand-900/20 transition-transform duration-500 hover:scale-105"
          />
          <p className="mt-4 text-sm uppercase tracking-[0.4em] text-brand-100">{HERO_PROFILE.location}</p>
          <p className="text-2xl font-heading">{HERO_PROFILE.availability}</p>
        </div>
      </AnimatedItem>
    </div>
  </section>
);

export default Hero;
