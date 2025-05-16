const toggleBtn = document.getElementById('theme-toggle');
const toggleIcon = document.getElementById('theme-toggle-icon');
const root = document.documentElement;

// Aplicar tema guardado al cargar
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  root.classList.toggle('dark', savedTheme === 'dark');
  toggleIcon.className = savedTheme === 'dark'
    ? 'fa-solid fa-sun text-yellow-500'
    : 'fa-solid fa-moon text-indigo-600';
}

// Alternar tema al hacer clic
toggleBtn.addEventListener('click', () => {
  const isDark = root.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  toggleIcon.className = isDark
    ? 'fa-solid fa-sun text-yellow-500'
    : 'fa-solid fa-moon text-indigo-600';
});
