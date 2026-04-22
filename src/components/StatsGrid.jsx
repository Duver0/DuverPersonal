import { STATS } from '../content/profile.js';

const StatsGrid = () => {

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {STATS.map((item) => (
        <article
          key={item.label}
          className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 text-center shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/40"
        >
          <p className="text-4xl font-heading text-brand-600 dark:text-brand-400">{item.value}</p>
          <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">{item.label}</p>
        </article>
      ))}
    </section>
  );
};

export default StatsGrid;
