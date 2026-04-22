import profilePhoto from '../assets/img/ProfilePhoto.png';
import defaultProjectImage from '../assets/img/default.jpg';
import cvPdf from '../assets/pdf/DuverBetancurCV.pdf';

export const EXPERIENCE_START_YEAR = 2019;

export const HERO_PROFILE = {
  name: 'Duver Betancur',
  headline: 'Desarrollador Full Stack & Automation Engineer',
  summary:
    'Combino desarrollo web, ciberseguridad y automatización para crear productos estables, monitoreables y listos para crecer desde el día uno.',
  location: 'Medellín, CO',
  availability: 'Disponible para freelance',
  photo: profilePhoto,
};

export const HERO_BADGES = ['React & Tailwind', 'Laravel & APIs', 'Automatización', 'Ciberseguridad'];

export const CTA_LINKS = [
  {
    label: 'Agenda una llamada',
    href: 'mailto:duverbetancurbedoya@outlook.com',
    primary: true,
    icon: 'fa-phone',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/duver-betancur-bedoya-385748201/',
    icon: 'fa-linkedin',
    brands: true,
  },
  {
    label: 'Descargar CV',
    href: cvPdf,
    icon: 'fa-file-arrow-down',
  },
];

export const STATS = [
  { value: '+6', label: 'Años en la industria tech' },
  { value: '+3', label: 'Años como Full Stack developer' },
  { value: '24', label: 'Lanzamientos en producción' },
];

export const SKILLS = [
  {
    title: 'Frontend Engineering',
    icon: 'fa-code',
    gradient: 'from-brand-500/20 via-brand-500/10 to-transparent',
    description: 'Construcción de interfaces con React + Redux priorizando performance y mantenibilidad.',
    items: ['React, Redux, Vite', 'TailwindCSS, design systems', 'Testing UI y accesibilidad'],
    badges: ['Component libraries', 'SSR / CSR'],
  },
  {
    title: 'Backend & APIs',
    icon: 'fa-database',
    gradient: 'from-amber-400/20 via-amber-400/10 to-transparent',
    description: 'Servicios Laravel/PHP con MySQL aplicando MVC y autenticación basada en roles.',
    items: ['Laravel, PHP, MySQL', 'APIs RESTful, integración externa', 'ORM & optimización de queries'],
    badges: ['API Design', 'DB Hardening'],
  },
  {
    title: 'Automation & Data Engineering',
    icon: 'fa-shield-halved',
    gradient: 'from-emerald-400/20 via-emerald-400/10 to-transparent',
    description: 'Automatización de tareas con Python/Selenium y procesos ETL para indexación y scraping de datos.',
    items: ['Python, Selenium, automatización QA', 'Diseño de pipelines ETL', 'Gobernanza de accesos y OWASP'],
    badges: ['Data Compliance', 'Security monitoring'],
  },
];

export const ABOUT_TAGS = ['Discovery técnico', 'Arquitectura ligera', 'DevSecOps', 'Mentoría de equipos'];

export const EXPERIENCE = [
  {
    role: 'Consultor de Desarrollo · AI Native Full Cycle',
    company: 'Sofka Technologies',
    period: 'Feb 2026 — Actualidad',
    description:
      'Ejecución de proyectos full cycle con estándares altos de calidad, prácticas ágiles y KPIs de desarrollo. Código limpio y mantenible en equipos multidisciplinarios.',
    stack: ['Full Cycle', 'AI Native', 'Agile'],
  },
  {
    role: 'Programador Full Stack',
    company: 'Tecnología Jurídica',
    period: 'Jul 2024 — Feb 2026',
    description:
      'Aplicaciones web con React + Redux y APIs RESTful en Laravel/PHP sobre MySQL. Optimización de queries, Webpack y flujo Git en equipo.',
    stack: ['React', 'Redux', 'Laravel', 'MySQL'],
  },
  {
    role: 'PPC Indexation · Indexer',
    company: 'Talent.com',
    period: 'Feb 2023 — Jun 2024',
    description:
      'Web scraping multi-portal con JavaScript (fetch, selectores, promesas) e indexación XML con PHP para clientes premium. Optimización continua de scripts.',
    stack: ['JavaScript', 'PHP', 'Web Scraping'],
  },
  {
    role: 'Content Intern',
    company: 'Talent.com',
    period: 'Ago 2022 — Ene 2023',
    description: 'Prácticas en gestión de contenido para plataforma global de empleos.',
    stack: ['Content Ops'],
  },
  {
    role: 'Servicio Técnico · N2 Support',
    company: 'Emtelco',
    period: 'Ago 2020 — Jul 2022',
    description:
      'Soporte técnico remoto y escalamiento a segundo nivel. Colaboración con dev/ops para optimizar servicios y capacitación de nuevos miembros.',
    stack: ['Soporte N2', 'Troubleshooting'],
  },
  {
    role: 'Security Analyst',
    company: 'Fluid Attacks',
    period: 'May 2019 — Nov 2019',
    description:
      'Revisión de código estático, resolución de issues web y soporte a infraestructura. Onboarding técnico de nuevos integrantes.',
    stack: ['Security', 'Code Review'],
  },
];

export const PROJECTS = [
  {
    title: 'Sistema de Turnos Médicos',
    problem: 'Gestionar turnos médicos en tiempo real requiere desacoplar registro, asignación y notificación.',
    solution: 'Arquitectura event-driven con NestJS + Next.js + RabbitMQ + MongoDB, notificaciones por WebSocket.',
    impact: 'Flujo asíncrono 202 Accepted; asignación automática de consultorios con scheduler dedicado.',
    image: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fgithub.com%2FDuver0%2FIA_P1/?w=1200',
    stack: ['NestJS', 'Next.js', 'RabbitMQ', 'MongoDB'],
    link: null,
    repo: 'https://github.com/Duver0/IA_P1',
    metric: 'Microservicios · Event-driven',
    kind: 'repo',
  },
  {
    title: 'Design Patterns Quiz',
    problem: 'Aprender los 23 patrones GoF con teoría plana no fija el conocimiento.',
    solution: 'Plataforma de quiz 100% estática con Strategy + Factory + Singleton y retroalimentación inmediata.',
    impact: '880+ preguntas curadas (40 por patrón) en 3 categorías; arquitectura que enseña patrones usándolos.',
    image: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fduver0.github.io%2Fdesign-patterns/?w=1200',
    stack: ['Vite', 'JS Modules', 'HTML5', 'CSS3'],
    link: 'https://duver0.github.io/design-patterns/',
    repo: 'https://github.com/Duver0/design-patterns',
    metric: '23 patrones · 880+ preguntas',
    kind: 'pages',
  },
  {
    title: 'Generador de historias interactivas',
    problem: 'Los talleres de narrativa colaborativa requerían coordinación manual por chat.',
    solution: 'Full stack con React + Express + Socket.IO para salas en vivo tipo "cadáver exquisito".',
    impact: 'Sincronización en tiempo real de participantes, segmentos y turnos; soporte para modo oscuro persistente.',
    image: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fduver0.github.io%2FGenerador-de-historias-interactivas/?w=1200',
    stack: ['React', 'Express', 'Socket.IO', 'Vite'],
    link: 'https://duver0.github.io/Generador-de-historias-interactivas/',
    repo: 'https://github.com/Duver0/Generador-de-historias-interactivas',
    metric: 'Websockets en vivo',
    kind: 'pages',
  },
  {
    title: 'Anthropic Skilljar Tracker',
    problem: 'Seguimiento manual de certificados de Anthropic Skilljar era tedioso y difícil de compartir.',
    solution: 'SPA estática con Astro + Tailwind v4 que scrapea credenciales con Playwright y las publica automáticamente.',
    impact: 'Deploy semanal automático vía GitHub Actions; credenciales siempre al día sin intervención.',
    image: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fduver0.github.io%2FAnthropicCertifications/?w=1200',
    stack: ['Astro', 'Tailwind v4', 'Playwright', 'Bun'],
    link: 'https://duver0.github.io/Anthropic-certifications/',
    repo: 'https://github.com/Duver0/Anthropic-certifications',
    metric: 'Auto-scrape semanal',
    kind: 'pages',
  },
  {
    title: 'Preguntas y Respuestas',
    problem: 'Necesitaba un quiz de dev web con rachas, ranking y explicaciones para reforzar aprendizaje.',
    solution: 'SPA React + Vite + Tailwind con engine propio (useQuizEngine), bonus por racha y highscores persistentes.',
    impact: '30+ preguntas categorizadas; historial detallado y ranking en localStorage sin backend.',
    image: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fduver0.github.io%2FPreguntas-y-Respuestas/?w=1200',
    stack: ['React', 'Vite', 'Tailwind', 'Bun'],
    link: 'https://duver0.github.io/Preguntas-y-Respuestas/',
    repo: 'https://github.com/Duver0/Preguntas-y-Respuestas',
    metric: 'Streak engine · localStorage',
    kind: 'pages',
  },
  {
    title: 'Natillera App',
    problem: 'Administrar fondos rotatorios (natilleras) familiares implica ahorros, créditos e intereses offline.',
    solution: 'App móvil React Native + Expo con SQLite local, contexto de auth y navegación por tabs.',
    impact: 'Funciona sin conexión; cada usuario gestiona sus propios clientes, cuotas e intereses.',
    image: defaultProjectImage,
    stack: ['React Native', 'Expo', 'SQLite', 'Bun'],
    link: null,
    repo: 'https://github.com/Duver0/Natillera',
    metric: 'Offline-first · SQLite',
    kind: 'repo',
  },
];
