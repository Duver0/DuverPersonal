import { useCallback, useMemo, useState } from 'react';

/**
 * El estado del pliego del Archivo (§8.5 y §9 de design-direction.md).
 *
 * Vive aparte del componente por un motivo concreto: la sección es la pieza
 * «viva» de la página y su lógica (orden, fichas, tirada, conteos) es la que la
 * auditoría mide. Aquí no hay ni una cifra escrita a mano: los conteos de las
 * fichas salen del JSON en tiempo de ejecución, de modo que si un lenguaje baja
 * de `MINIMO` entradas su ficha desaparece sola y el pliego sigue diciendo la
 * verdad.
 */

/** §9: la tirada del pliego. Ocho entradas por página: 24 ÷ 8 = tres tiradas exactas. */
export const POR_TIRADA = 8;

/**
 * Fichas curadas. El archivo trae 11 lenguajes distintos, pero una ficha no es
 * un volcado del JSON: es lo que alguien pediría en una entrevista. Los seis
 * lenguajes de esta lista son los únicos que llegan a `MINIMO` hoy.
 */
const CURADAS = ['JavaScript', 'TypeScript', 'Java', 'Gherkin', 'Python'];

/** Por debajo de tres entradas, una ficha no se sostiene y no se dibuja. */
const MINIMO = 3;

/** El archivo se lee de lo más reciente a lo más antiguo, como lo lee hoy el sitio. */
export const ordenarPorFecha = (proyectos) =>
  [...proyectos].sort((a, b) => new Date(b.pushed_at || 0) - new Date(a.pushed_at || 0));

const contarPorLenguaje = (proyectos) => {
  const cuenta = new Map();
  for (const proyecto of proyectos) {
    for (const lenguaje of proyecto.stack || []) {
      cuenta.set(lenguaje, (cuenta.get(lenguaje) || 0) + 1);
    }
  }
  return cuenta;
};

/**
 * Las fichas del filtro, derivadas del dato: `Todos` con el total real del
 * archivo y, después, los lenguajes curados que llegan al mínimo, ordenados de
 * mayor a menor conteo.
 *
 * @param {Array<object>} proyectos
 * @returns {Array<{id: string, label: string, n: number}>}
 */
export const fichasDe = (proyectos) => {
  const cuenta = contarPorLenguaje(proyectos);
  const curadas = CURADAS.map((id, orden) => ({ id, label: id, n: cuenta.get(id) || 0, orden }))
    .filter((ficha) => ficha.n >= MINIMO)
    .sort((a, b) => b.n - a.n || a.orden - b.orden)
    .map(({ id, label, n }) => ({ id, label, n }));

  return [{ id: 'todos', label: 'Todos', n: proyectos.length }, ...curadas];
};

/**
 * @param {Array<object>} proyectos las entradas del archivo (`PROJECTS`).
 * @returns {{
 *   fichas: Array<{id: string, label: string, n: number}>,
 *   ficha: string, filtrar: (id: string) => void,
 *   filtrados: Array<object>, total: number,
 *   tirada: number, totalTiradas: number, irATirada: (n: number) => void,
 *   enPliego: (i: number) => boolean, visibles: number,
 * }}
 */
export const useProjectFilter = (proyectos) => {
  const orden = useMemo(() => ordenarPorFecha(proyectos), [proyectos]);
  const fichas = useMemo(() => fichasDe(orden), [orden]);

  /* Una sola ficha activa, nunca multi-selección: multiplicar filtros puede
     dejar la vista vacía y complica la paginación (§9). */
  const [ficha, setFicha] = useState('todos');
  const [tirada, setTirada] = useState(1);

  const filtrados = useMemo(
    () => (ficha === 'todos' ? orden : orden.filter((p) => (p.stack || []).includes(ficha))),
    [orden, ficha],
  );

  const totalTiradas = Math.max(1, Math.ceil(filtrados.length / POR_TIRADA));
  const tiradaActual = Math.min(tirada, totalTiradas);

  /* Cambiar de ficha devuelve el pliego a la primera tirada (§9). */
  const filtrar = useCallback((id) => {
    setFicha(id);
    setTirada(1);
  }, []);

  const irATirada = useCallback(
    (n) => setTirada(Math.min(Math.max(1, n), totalTiradas)),
    [totalTiradas],
  );

  /* Qué entradas caen en la tirada en curso. El componente no recorta la lista:
     dibuja el pliego entero y marca la tirada, porque la ocultación la aplica
     una regla de CSS que cuelga de la clase `js` (ver el bloque del Archivo en
     `src/index.css`): sin script, las 24 entradas se ven. */
  const enPliego = useCallback(
    (i) => Math.floor(i / POR_TIRADA) === tiradaActual - 1,
    [tiradaActual],
  );

  let visibles = 0;
  filtrados.forEach((_, i) => {
    if (enPliego(i)) visibles += 1;
  });

  return {
    fichas,
    ficha,
    filtrar,
    filtrados,
    total: orden.length,
    tirada: tiradaActual,
    totalTiradas,
    irATirada,
    enPliego,
    visibles,
  };
};

export default useProjectFilter;
