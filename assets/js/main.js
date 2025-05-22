// Esperar a que el DOM cargue completamente
document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.swiper', {
    loop: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
    },
  });

  // Dark mode toggle\ n  const toggleBtn = document.getElementById('theme-toggle');
  const toggleIcon = document.getElementById('theme-toggle-icon');
  const root = document.documentElement;

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    root.classList.toggle('dark', savedTheme === 'dark');
    toggleIcon.className = savedTheme === 'dark'
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
});