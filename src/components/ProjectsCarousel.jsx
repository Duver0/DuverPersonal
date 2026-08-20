import { useState } from 'react';
import { PROJECTS } from '../content/profile.js';
import Reveal from './Reveal.jsx';
import { useCardMotion } from '../hooks/useCardMotion.js';

const ORDERED = [...PROJECTS].sort(
  (a, b) => new Date(b.pushed_at || 0) - new Date(a.pushed_at || 0),
);

const INITIAL = 6;
const STEP = 3;

const ProjectCard = ({ project }) => {
  const hasLink = typeof project.link === 'string' && project.link.trim().length > 0;
  const isExternalLink = hasLink && project.link.startsWith('http');
  const fx = useCardMotion(0);

  return (
    <Reveal variant="zoom-in">
      <article
        ref={fx.ref}
        onMouseMove={fx.onMove}
        onMouseLeave={fx.onLeave}
        className="group relative flex h-full flex-col rounded-3xl border border-slate-100 bg-gradient-to-b from-white/80 to-slate-100/70 p-6 shadow-lg shadow-slate-900/5 transition duration-500 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:from-slate-900/80 dark:to-slate-900/40"
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(300px circle at var(--x,50%) var(--y,50%), rgba(99,102,241,0.16), transparent 70%)',
          }}
          aria-hidden="true"
        />
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={project.image}
            alt={`Proyecto ${project.title}`}
            className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
          {project.description && (
            <p className="absolute bottom-10 left-4 right-4 line-clamp-2 text-xs text-white/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]">
              {project.description.length > 120
                ? project.description.slice(0, 120) + '…'
                : project.description}
            </p>
          )}
          <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm">
            {project.metric}
          </span>
        </div>
        <div className="relative mt-6 flex flex-1 flex-col gap-4">
          <div>
            <h3 className="text-xl font-heading">{project.title}</h3>
            <div className="mt-2 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              {project.problem && <p><span className="font-semibold">Problema:</span> {project.problem}</p>}
              {project.solution && <p><span className="font-semibold">Solución:</span> {project.solution}</p>}
              {project.impact && <p><span className="font-semibold">Impacto:</span> {project.impact}</p>}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-slate-100/80 px-3 py-1 text-xs font-semibold dark:bg-slate-800/80"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-auto flex items-center gap-2">
            {hasLink && (
              <a
                href={project.link}
                target={isExternalLink ? '_blank' : undefined}
                rel={isExternalLink ? 'noreferrer' : undefined}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-500"
              >
                Ver demo
                <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              >
                Código
                <i className="fa-brands fa-github text-xs" />
              </a>
            )}
            {!hasLink && !project.repo && (
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400">
                Demo privada
                <i className="fa-solid fa-lock text-xs" />
              </span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
};

const ProjectsCarousel = () => {
  const [visible, setVisible] = useState(INITIAL);
  const shown = ORDERED.slice(0, visible);
  const hasMore = visible < ORDERED.length;

  return (
    <section id="projects" className="rounded-3xl border border-slate-100 bg-white/75 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/40">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-500">Proyectos</p>
        <h2 className="mt-3 text-3xl font-heading">Casos recientes</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Mostrando {shown.length} de {ORDERED.length} proyectos públicos en GitHub
        </p>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + STEP)}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-accent-600 px-8 py-3 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-400/40"
          >
            Cargar más
            <i className="fa-solid fa-chevron-down text-xs" />
          </button>
        </div>
      )}
    </section>
  );
};

export default ProjectsCarousel;
