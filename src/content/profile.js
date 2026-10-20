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
  intro:
    'Desde 2019 construyo software: empecé revisando código y atendiendo soporte de segundo nivel; hoy trabajo de la interfaz a la base de datos y automatizo lo que se repite.',
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

/**
 * Disciplinas (§8.3) — dos piezas de copy, no una lista.
 *
 * `estructura` dice qué hace (frontend, backend y automatización) y `detalle`
 * agrupa las doce herramientas por dónde se usan, no por orden de llegada. Vive
 * aquí, en el contenido, y no en el componente: las herramientas no se pueden
 * derivar de ningún otro campo y el copy factual tiene un solo sitio. La sección
 * sólo decide la jerarquía con la que se pinta cada pieza.
 */
export const DISCIPLINAS = {
  estructura:
    'Frontend, backend y automatización: interfaces que aguantan uso real, APIs que otros equipos consumen y procesos que dejan de hacerse a mano.',
  detalle:
    'React, Redux, Vite y TailwindCSS en la interfaz; Laravel, PHP y MySQL en el servidor; Python, Selenium y ETL para lo repetitivo; OWASP y Docker antes de producción.',
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

const YEARS = Math.max(1, Math.floor((Date.now() - Date.UTC(EXPERIENCE_START_YEAR, 4, 1)) / 31557600000));
const CASAS = new Set(EXPERIENCE.map((p) => p.company)).size;
const DESPLEGADAS = PROJECTS.filter((p) => p.kind === 'pages').length;
const TECNOLOGIAS = new Set(PROJECTS.flatMap((p) => p.stack ?? [])).size;

export const STATS = [
  { value: `+${YEARS}`, label: 'Años en la industria tech' },
  { value: String(PROJECTS.length), label: 'Proyectos con repositorio público' },
  { value: String(DESPLEGADAS), label: 'Aplicaciones desplegadas y enlazadas' },
  { value: String(CASAS), label: 'Empresas y equipos desde 2019' },
  { value: String(TECNOLOGIAS), label: 'Tecnologías en uso entre esos proyectos' },
  { value: '4', label: 'Áreas: web, backend, automatización y seguridad' },
];
