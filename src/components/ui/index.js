/**
 * La capa de primitivas de la casa (fase 2A). Es el contrato para las secciones
 * que escriban otras fases: tono, ritmo, escala de texto, acción, icono y
 * entrada, y nada más. Ni una dependencia nueva.
 */
export { default as Shell } from './Shell.jsx';
export { default as Section } from './Section.jsx';
export { default as Surface } from './Surface.jsx';
export { Action } from './Action.jsx';
export { Icon } from './Icon.jsx';
export { Reveal } from './Reveal.jsx';
export { Monument, Display, Lead, Body, Nano } from './Type.jsx';
export { TONES } from './tones.js';
export { cx } from './cx.js';
