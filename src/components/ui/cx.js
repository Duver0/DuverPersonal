/** Junta clases ignorando lo vacío. El único helper de la capa. */
export const cx = (...parts) => parts.filter(Boolean).join(' ');
