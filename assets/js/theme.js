const toggleBtn = document.getElementById('theme-toggle');
const toggleIcon = document.getElementById('theme-toggle-icon');
const root = document.documentElement;

// Carga tema guardado
const saved = localStorage.getItem('theme');
if (saved) {
  root.classList.toggle('dark', saved === 'dark');
  toggleIcon.className = saved === 'dark'
    ? 'fa-solid fa-sun text-yellow-400'
    : 'fa-solid fa-moon text-indigo-600';
}

toggleBtn.addEventListener('click', () => {
  const isDark = root.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  toggleIcon.className = isDark
    ? 'fa-solid fa-sun text-yellow-400'
    : 'fa-solid fa-moon text-indigo-600';
});
