import profilePhoto from '/assets/img/ProfilePhoto.png';
import defaultProjectImage from '/assets/img/default.jpg';
import cvPdf from '/assets/pdf/DuverBetancurCV.pdf';

export const EXPERIENCE_START_YEAR = 2022;

export const HERO_PROFILE = {
  name: 'Duver Betancur',
  headline: 'Desarrollador Full Stack & Automation Engineer',
  summary:
    'Combino desarrollo web, ciberseguridad y automatización para crear productos estables, monitoreables y listos para crecer desde el día uno.',
  location: 'Medellín, CO',
  availability: 'Disponible para freelance',
  photo: profilePhoto,
  highlightMetrics: [
    { label: 'Lanzamientos', value: '24' },
    { label: 'Módulos desarrollados end-to-end', value: '+12' },
  ],
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
  },
  {
    label: 'Descargar CV',
    href: cvPdf,
    icon: 'fa-file-arrow-down',
  },
];

export const SECONDARY_STATS = [
  { label: 'Stack principal React · Laravel · MySQL', value: 'Full Stack' },
  { label: 'Experiencia en indexación y data scraping', value: 'Data Ops' },
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
    role: 'Desarrollador Full Stack',
    company: '621 Corporación',
    period: '07/2024 — Actualidad',
    description:
      'Creación de aplicaciones con React, Redux, Laravel y MySQL, integrando APIs RESTful y pipelines con Webpack, NPM y Git.',
    stack: ['React', 'Redux', 'Laravel', 'MySQL'],
  },
  {
    role: 'Indexer · PPC Indexation',
    company: 'Talent.com',
    period: '08/2022 — 06/2024',
    description:
      'Diseño de algoritmos y scripts en JavaScript y PHP para extracción de datos, optimizando procesos de indexación y reporting.',
    stack: ['JavaScript', 'PHP', 'APIs REST', 'Data parsing'],
  },
  {
    role: 'Security Analyst',
    company: 'FluidAttacks',
    period: '05/2019 — 11/2019',
    description:
      'Administración de accesos empresariales, análisis de riesgos y soporte a implementaciones seguras en JavaScript.',
    stack: ['Security', 'Access management', 'JavaScript'],
  },
];

export const PROJECTS = [
  {
    title: 'Preguntas y Respuestas',
    description:
      'Plataforma interactiva tipo AMA para equipos internos, actualizada en tiempo real mediante WebSockets.',
    image: 'https://opengraph.githubassets.com/1/Duver0/Preguntas-y-Respuestas',
    stack: ['React', 'Laravel', 'Echo'],
    link: 'https://duver0.github.io/Preguntas-y-Respuestas/',
    metric: 'Laravel Echo + WebSockets en vivo',
  },
  {
    title: 'CESW4',
    description:
      'Módulo académico con panel administrativo, autenticación y control de versiones para contenido técnico.',
    image: defaultProjectImage,
    stack: ['Laravel', 'PostgreSQL', 'Tailwind'],
    link: null,
    metric: '100% uptime en QA',
  },
  {
    title: 'Automatizador financiero',
    description: 'Robot RPA que integra bancos locales con dashboards internos y alertas por Telegram.',
    image: defaultProjectImage,
    stack: ['Python', 'Playwright', 'Supabase'],
    link: null,
    metric: '4h ahorradas a diario',
  },
];
