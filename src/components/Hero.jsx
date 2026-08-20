import { useRef } from 'react';
import { CTA_LINKS, HERO_BADGES, HERO_PROFILE } from '../content/profile.js';
import Reveal from './Reveal.jsx';
import MagneticLink from './MagneticLink.jsx';
import { useScrollEffect } from '../hooks/useScrollEffect.js';
import { useReducedMotion } from '../hooks/useReducedMotion.js';
import { useTypewriter } from '../hooks/useTypewriter.js';
import { useCardMotion } from '../hooks/useCardMotion.js';

const Hero = () => {
  const heroRef = useRef(null);
  const reduced = useReducedMotion();
  const photoFx = useCardMotion(0);
  const typed = useTypewriter(HERO_PROFILE.headline);

  useScrollEffect((scrollY) => {
    const start = window.innerHeight * 0.3;
    const end = window.innerHeight * 0.85;
    const t = Math.min(1, Math.max(0, (scrollY - start) / (end - start)));
    if (heroRef.current) {
      heroRef.current.style.opacity = String(1 - t);
      heroRef.current.style.transform = `translateY(${t * 40}px)`;
    }
  });

  return (
    <section
      ref={heroRef}
      id="inicio"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-violet-600 px-8 py-10 text-white shadow-glow will-change-transform scroll-mt-24"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_55%)] opacity-30"
        aria-hidden="true"
      />
      <div className="relative flex flex-col items-center gap-10 lg:flex-row">
        <div className="flex-1">
          <Reveal delay={100}>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-100">
              {HERO_PROFILE.name}
            </p>
          </Reveal>
          <Reveal delay={250}>
            <h1
              className="mt-3 font-heading text-4xl leading-tight md:text-5xl"
              aria-label={HERO_PROFILE.headline}
            >
              <span aria-hidden="true">{typed}</span>
              {!reduced && (
                <span
                  aria-hidden="true"
                  className="ml-0.5 inline-block w-[2px] animate-pulse bg-white/80 align-middle"
                  style={{ height: '0.9em' }}
                />
              )}
            </h1>
          </Reveal>
          <Reveal delay={400}>
            <p className="mt-5 max-w-2xl text-lg text-brand-100/90">{HERO_PROFILE.summary}</p>
          </Reveal>
          <Reveal delay={550}>
            <div className="mt-8 flex flex-wrap gap-3">
              {HERO_BADGES.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur transition-all duration-300 hover:bg-white/25 hover:scale-105"
                >
                  {badge}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={700}>
            <div className="mt-10 flex flex-wrap gap-4">
              {CTA_LINKS.map((cta) => (
                <MagneticLink
                  key={cta.label}
                  href={cta.href}
                  target={cta.href.startsWith('http') ? '_blank' : undefined}
                  rel={cta.href.startsWith('http') ? 'noreferrer' : undefined}
                  className={`group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all ${
                    cta.primary
                      ? 'bg-white text-brand-700 hover:-translate-y-0.5 hover:shadow-lg'
                      : 'bg-white/15 text-white hover:bg-white/25'
                  }`}
                >
                  <i className={`${cta.brands ? 'fa-brands' : 'fa-solid'} ${cta.icon} text-sm`} />
                  {cta.label}
                </MagneticLink>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={500} className="relative w-full max-w-sm">
          <div
            ref={photoFx.ref}
            onMouseMove={photoFx.onMove}
            onMouseLeave={photoFx.onLeave}
            className="group relative rounded-[32px] border border-white/30 bg-white/10 p-6 text-center backdrop-blur-xl transition-transform duration-300"
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-[32px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(240px circle at var(--x,50%) var(--y,50%), rgba(255,255,255,0.18), transparent 70%)',
              }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-8 rounded-[32px] bg-white/10 blur-3xl"
              aria-hidden="true"
            />
            <img
              src={HERO_PROFILE.photo}
              alt={HERO_PROFILE.name}
              className="relative mx-auto h-36 w-36 rounded-3xl object-cover shadow-2xl shadow-brand-900/20 transition-transform duration-500 hover:scale-105"
            />
            <p className="mt-4 text-sm uppercase tracking-[0.4em] text-brand-100">
              {HERO_PROFILE.location}
            </p>
            <p className="text-2xl font-heading">{HERO_PROFILE.availability}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
