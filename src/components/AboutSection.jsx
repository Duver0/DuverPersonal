import { ABOUT_TAGS } from '../content/profile.js';
import Reveal from './Reveal.jsx';

const AboutSection = () => (
  <Reveal>
    <section className="rounded-3xl border border-slate-100 bg-white/90 p-8 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/40">
      <p className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-500">Sobre mí</p>
      <h2 className="mt-3 text-3xl font-heading">Diseño soluciones con foco en negocio</h2>
      <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
        Colaboro de cerca con producto y áreas operativas para automatizar procesos manuales, crear dashboards
        accionables y desplegar aplicaciones robustas. Me mantengo cerca del usuario final y documento cada entrega para
        acelerar la adopción.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        {ABOUT_TAGS.map((tag) => (
          <span key={tag} className="rounded-full border border-slate-200 px-4 py-1 text-sm text-slate-700 dark:border-slate-800 dark:text-slate-200">
            {tag}
          </span>
        ))}
      </div>
    </section>
  </Reveal>
);

export default AboutSection;
