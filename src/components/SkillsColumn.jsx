import { SKILLS } from '../content/profile.js';
import Reveal from './Reveal.jsx';
import { useCardMotion } from '../hooks/useCardMotion.js';

const SkillCard = ({ skill, delay }) => {
  const fx = useCardMotion(5);

  return (
    <Reveal delay={delay} variant="slide-left">
      <article
        ref={fx.ref}
        onMouseMove={fx.onMove}
        onMouseLeave={fx.onLeave}
        className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-md transition-transform duration-300 ease-out dark:border-slate-800/80 dark:bg-transparent"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(260px circle at var(--x,50%) var(--y,50%), rgba(99,102,241,0.18), transparent 70%)',
          }}
          aria-hidden="true"
        />
        <div className={`absolute inset-0 opacity-40 bg-gradient-to-br ${skill.gradient}`} aria-hidden="true" />
        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-xl text-brand-600 dark:text-brand-300">
              <i className={`fa-solid ${skill.icon}`} />
            </span>
            <div>
              <h3 className="font-heading text-xl">{skill.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-300">{skill.description}</p>
            </div>
          </div>
          <ul className="mt-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            {skill.items.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {skill.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-slate-100/70 px-3 py-1 text-xs font-semibold dark:bg-slate-800/70"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
};

const SkillsColumn = () => (
    <section id="skills" className="space-y-5 scroll-mt-24">
    {SKILLS.map((skill, idx) => (
      <SkillCard key={skill.title} skill={skill} delay={idx * 120} />
    ))}
  </section>
);

export default SkillsColumn;
