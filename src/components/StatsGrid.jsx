import { STATS } from '../content/profile.js';
import { useCountUp } from '../hooks/useCountUp.js';

const parseValue = (value) => {
  const match = String(value).match(/^([^\d]*)([\d.]+)(.*)$/);
  if (!match) return { prefix: '', num: 0, suffix: '' };
  return { prefix: match[1], num: parseFloat(match[2]), suffix: match[3] };
};

const StatCard = ({ item }) => {
  const { prefix, num, suffix } = parseValue(item.value);
  const { ref, value } = useCountUp(num, { duration: 1100 });

  return (
    <article
      ref={ref}
      className="rounded-2xl border border-slate-200/70 bg-white/75 p-5 text-center shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/40"
    >
      <p className="text-4xl font-heading text-brand-600 dark:text-brand-400">
        {prefix}
        {value}
        {suffix}
      </p>
      <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">{item.label}</p>
    </article>
  );
};

const StatsGrid = () => (
    <section id="estadisticas" className="grid gap-4 scroll-mt-24 sm:grid-cols-2 lg:grid-cols-3">
    {STATS.map((item) => (
      <StatCard key={item.label} item={item} />
    ))}
  </section>
);

export default StatsGrid;
