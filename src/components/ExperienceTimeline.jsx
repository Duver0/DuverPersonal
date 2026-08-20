import { EXPERIENCE } from '../content/profile.js';
import { useReveal } from '../hooks/useReveal.js';

const JobItem = ({ job, idx }) => {
  const { ref, visible } = useReveal();
  const isLast = idx === EXPERIENCE.length - 1;

  return (
    <article
      ref={ref}
      className={`flex gap-5 transition-all duration-700 ease-out group ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="relative">
        <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-brand-500 bg-white dark:bg-slate-900">
          <span
            className={`h-2.5 w-2.5 rounded-full bg-brand-500 ${
              visible ? 'animate-node-pulse-slow' : ''
            }`}
          />
        </span>
        {!isLast && (
          <span
            className={`absolute left-1/2 top-5 h-full w-px -translate-x-1/2 origin-top bg-slate-200 transition-transform duration-700 ease-out dark:bg-slate-700 ${
              visible ? 'scale-y-100' : 'scale-y-0'
            }`}
          />
        )}
      </div>
      <div className="flex-1 transition-all duration-300 group-hover:translate-x-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-xl font-heading">{job.role}</h3>
          <p className="text-sm font-medium text-slate-500">{job.period}</p>
        </div>
        <p className="text-sm font-semibold text-brand-500">{job.company}</p>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{job.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {job.stack.map((tool) => (
            <span
              key={tool}
              className="rounded-full bg-slate-100/80 px-3 py-1 text-xs font-semibold dark:bg-slate-800/80"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

const ExperienceTimeline = () => (
    <section id="experiencia" className="rounded-3xl border border-slate-100 bg-white/75 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-sm scroll-mt-24 dark:border-slate-800 dark:bg-slate-900/40">
    <p className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-500">Experiencia</p>
    <div className="mt-6 max-h-[720px] space-y-8 overflow-y-auto pr-2 scrollbar-thin">
      {EXPERIENCE.map((job, idx) => (
        <JobItem key={job.role} job={job} idx={idx} />
      ))}
    </div>
  </section>
);

export default ExperienceTimeline;
