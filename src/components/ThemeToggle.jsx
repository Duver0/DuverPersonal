const ThemeToggle = ({ isDark, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label="Cambiar tema"
    className="fixed bottom-6 right-6 rounded-full border border-white/60 bg-white/80 p-3 shadow-lg shadow-slate-900/10 backdrop-blur transition hover:scale-105 dark:border-slate-800/80 dark:bg-slate-900/80 sm:bottom-auto sm:left-6 sm:right-auto sm:top-1/2 sm:-translate-y-1/2"
  >
    <i className={`fa-solid ${isDark ? 'fa-sun text-amber-300' : 'fa-moon text-brand-600'}`} />
  </button>
);

export default ThemeToggle;
