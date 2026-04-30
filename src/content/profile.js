import profilePhoto from '../assets/img/ProfilePhoto.png';
import cvPdf from '../assets/pdf/DuverBetancurCV.pdf';
import projectsData from '../data/projects.json';

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

export const PROJECTS = projectsData;
