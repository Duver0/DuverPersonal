import profilePhoto from '../assets/img/ProfilePhoto.png';
import projectsData from '../data/projects.json';

export const EXPERIENCE_START_YEAR = 2019;

/*
  El CV vive en `public/` y no en `src/assets/`: así se puede enlazar también
  desde el `<noscript>` de `index.html`, que se compone antes de que exista el
  bundle. La ruta se construye con `import.meta.env.BASE_URL` para que respete el
  `base` del despliegue (`./` en local, `/DuverPersonal/` en GitHub Pages).
*/
export const CV_PDF = `${import.meta.env.BASE_URL}DuverBetancurCV.pdf`;

export const HERO_PROFILE = {
  name: 'Duver Betancur',
  headline: 'Desarrollador Full Stack & Automation Engineer',
  summary:
    'Desarrollo web, ciberseguridad y automatización: productos estables, monitoreables y listos para crecer.',
  location: 'Medellín, CO',
  availability: 'Disponible para freelance',
  photo: profilePhoto,
};

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
    href: CV_PDF,
    icon: 'fa-file-arrow-down',
  },
];

export const STATS = [
  { value: '+6', label: 'Años en la industria tech' },
  { value: '+3', label: 'Años como Full Stack developer' },
  { value: '24', label: 'Lanzamientos en producción' },
];

/**
 * Disciplinas (§8.3) — la frase del pliego de herramientas, en dos piezas.
 *
 * Este campo faltaba: la sección lo transcribía dentro del componente. Las doce
 * herramientas no se pueden derivar de ningún otro campo (llegan como frases con
 * descriptores), así que el contenido vive aquí, que es su sitio.
 */
export const DISCIPLINAS = {
  estructura: 'Frontend, backend y automatización:',
  herramientas: [
    'React',
    'Redux',
    'Vite',
    'TailwindCSS',
    'Laravel',
    'PHP',
    'MySQL',
    'Python',
    'Selenium',
    'ETL',
    'OWASP',
    'Docker',
  ],
};

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
