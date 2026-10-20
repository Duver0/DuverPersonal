/**
 * Fotos de archivo de la portada y del prólogo (fase 2A).
 *
 * DECISIÓN DE IMAGEN, con números:
 * los originales de dominio público miden 414–799 KB en 1800–1920 px, así que
 * ni son «razonables» ni son desmesurados: se hornean. El tratamiento es el que
 * fija `design-direction.md` §8.9 (gris → mapa de dos paradas, sombra `--ink` y
 * luz `--ground`, con tramado ordenado 8x8 para no producir bandas) y la salida
 * es WebP q78, con el script reproducible `node .taste-skill/imagery/bake-duotone.mjs`.
 *
 *   calle-san-juan-1930      640/1280/1920 →  22 /  73 / 147 KB  (414 KB original)
 *   catedral-medellin-1930   640/1280/1920 →  25 /  82 / 173 KB  (448 KB original)
 *   banco-republicano-1930   640/1280/1920 →  34 /  98 / 193 KB  (469 KB original)
 *   riachuelo-santa-elena    1280/1920     → 164 / 285 KB        (799 KB original)
 *   cajon-fichero            320/640       →  11 /  27 KB        (417 KB original)
 *
 * Desviaciones declaradas:
 * 1. El duotono se hornea UNA vez, con las paradas claras. La variante oscura
 *    de §8.9 (`#14140f` → `#ecebe4`) es un delta de ~2 % de luminancia: hornear
 *    dos juegos duplicaría peso y DOM, y `prefers-color-scheme` no sirve porque
 *    el tema es por clase.
 * 2. La banda del Prólogo es la única que se hornea ya recortada a 21:9: su
 *    marco tira el 33 % de los píxeles y sin recortar el WebP de 1280 pesaba
 *    232 KB (>180). El recorte es la **ventana inferior** del original (`y: 1`),
 *    no la central (`50% 42%` de partida): con la central se perdía la lámina de
 *    agua y la leyenda grabada de la postal quedaba cortada; con la inferior
 *    entran la banda de agua completa y la leyenda «Riachuelo Santa Elena. Av.
 *    Dcha. Medellín. Colombia.» entera. El `object-position` se declara igual,
 *    como pide §8.9 (es un no-op: el archivo ya trae el encuadre).
 *
 * Los créditos NO se escriben a mano: se transcriben de
 * `.taste-skill/imagery/credits.md`, que genera
 * `node .opencode/skills/design-taste-frontend/scripts/assets.mjs --credits`.
 */

import sanJuan640 from '../assets/archivo/calle-san-juan-1930-640.webp';
import sanJuan1280 from '../assets/archivo/calle-san-juan-1930-1280.webp';
import sanJuan1920 from '../assets/archivo/calle-san-juan-1930-1920.webp';
import catedral640 from '../assets/archivo/catedral-medellin-1930-640.webp';
import catedral1280 from '../assets/archivo/catedral-medellin-1930-1280.webp';
import catedral1920 from '../assets/archivo/catedral-medellin-1930-1920.webp';
import banco640 from '../assets/archivo/banco-republicano-1930-640.webp';
import banco1280 from '../assets/archivo/banco-republicano-1930-1280.webp';
import banco1920 from '../assets/archivo/banco-republicano-1930-1920.webp';
import riachuelo1280 from '../assets/archivo/riachuelo-santa-elena-1930-1280.webp';
import riachuelo1920 from '../assets/archivo/riachuelo-santa-elena-1930-1920.webp';
import cajon320 from '../assets/archivo/cajon-fichero-1930-320.webp';
import cajon640 from '../assets/archivo/cajon-fichero-1930-640.webp';

const PD = 'https://creativecommons.org/publicdomain/mark/1.0/';
const COMMONS = 'https://commons.wikimedia.org/wiki/File:';

/**
 * Recorte de marco del Inicio: 2:3 (móvil por ancho, escritorio hasta el borde
 * inferior). Medido en Chrome: a 768 el marco mide 46vw de ancho (353 px) y a 1440
 * baja a ~37,5vw (540 px, viewport alto: 46vw es el techo por `max-h-[69vw]`), así
 * que 46vw es la cota superior real de ≥768 px. Antes declaraba 88vw y el navegador
 * pedía el archivo de 1280 para un hueco de 640: sobre-descarga.
 */
const MARCO_INICIO = '(min-width: 768px) 46vw, 78vw';
/** La banda del Prólogo es a sangre: 100vw. */
const MARCO_BANDA = '100vw';

const creditos = (titulo, autor, archivo) => ({
  title: titulo,
  author: autor,
  license: 'dominio público',
  licenseUrl: PD,
  page: `${COMMONS}${archivo}`,
  via: 'Wikimedia Commons',
});

/**
 * Las tres fotos del crossfade de la portada, en el orden de tirada que fijó
 * `design-direction.md` §8.0 y confirmó el informe de imagen.
 * @type {Array<{id:string,src:string,srcSet:string,sizes:string,width:number,height:number,objectPosition:string,alt:string,credit:object}>}
 */
export const INICIO_FOTOS = [
  {
    id: 'calle-san-juan-1930',
    src: sanJuan1920,
    srcSet: `${sanJuan640} 640w, ${sanJuan1280} 1280w, ${sanJuan1920} 1920w`,
    sizes: MARCO_INICIO,
    width: 1920,
    height: 1226,
    objectPosition: '50% 34%',
    alt: 'Calle de San Juan, Medellín, 1930: el tranvía y los transeúntes entre las fachadas.',
    credit: creditos(
      'Calle de San Juan. Medellín, 1930',
      'Gonzalo Escovar Gaviria',
      'Calle_de_San_Juan._Medell%C3%ADn,_1930.jpg',
    ),
  },
  {
    id: 'catedral-medellin-1930',
    src: catedral1920,
    srcSet: `${catedral640} 640w, ${catedral1280} 1280w, ${catedral1920} 1920w`,
    sizes: MARCO_INICIO,
    width: 1920,
    height: 1213,
    objectPosition: '50% 38%',
    alt: 'Catedral de Medellín, 1930: la fachada y las torres desde la plaza.',
    credit: creditos(
      'Catedral de Medellin 1930 - Benjamín de la Calle Muñoz (1869-1934)',
      'Benjamín de la Calle Muñoz',
      'Catedral_de_Medellin_1930_-_Benjam%C3%ADn_de_la_Calle_Mu%C3%B1oz_(1869-1934).jpg',
    ),
  },
  {
    id: 'banco-republicano-1930',
    src: banco1920,
    srcSet: `${banco640} 640w, ${banco1280} 1280w, ${banco1920} 1920w`,
    sizes: MARCO_INICIO,
    width: 1920,
    height: 1227,
    objectPosition: '50% 40%',
    alt: 'Banco Republicano del Parque Berrío, Medellín, 1930: la fachada con el arco de entrada.',
    credit: creditos(
      'Banco Republicano del Parque Berrío. Medellín, 1930',
      'Studio of Gonzalo Escovar Gaviria',
      'Banco_Republicano_del_Parque_Berr%C3%ADo._Medell%C3%ADn,_1930.jpg',
    ),
  },
];

/**
 * Leyenda de la portada: apellidos completos y una sola salida enlazada
 * (§8.0 la quiere «bajo el marco, en `--t-nano --muted`»). El crédito legal
 * foto a foto vive en el pie de página, que genera §8.8.
 */
export const LEYENDA_INICIO = {
  place: 'Medellín, 1930',
  authors: 'Gonzalo Escovar Gaviria y Benjamín de la Calle Muñoz',
  via: 'Wikimedia Commons',
  href: 'https://commons.wikimedia.org/',
};

/** La postal coloreada a mano: única banda a sangre del Prólogo (§8.1). */
export const PROLOGO_FOTO = {
  id: 'riachuelo-santa-elena-1930',
  src: riachuelo1920,
  srcSet: `${riachuelo1280} 1280w, ${riachuelo1920} 1920w`,
  sizes: MARCO_BANDA,
  width: 1920,
  height: 823,
  /* No-op deliberado: el archivo ya trae el encuadre (ventana inferior, 21:9).
     Se declara igual porque §8.9 lo exige en toda foto. */
  objectPosition: '50% 100%',
  alt: 'Riachuelo Santa Elena, avenida Derecha, Medellín, 1930: la quebrada entre las márgenes arboladas.',
  credit: creditos(
    'Riachuelo Santa Elena. Av. Derecha. Medellín, 1930',
    'Gonzalo Escovar Gaviria',
    'Riachuelo_Santa_Elena._Av._Derecha._Medell%C3%ADn,_1930.jpg',
  ),
};

/**
 * Tarjeta del cajón de fichas: la pide §8.3 como inserto del bloque de Cifras.
 * Se hornea y se entrega aquí (320/640, marco 4:5) aunque la sección se escriba
 * en la fase 2B, para que no haya dos horneados del mismo original.
 */
export const CIFRAS_INSERTO = {
  id: 'cajon-fichero-1930',
  src: cajon640,
  srcSet: `${cajon320} 320w, ${cajon640} 640w`,
  sizes: '(min-width: 768px) 200px, 45vw',
  width: 640,
  height: 427,
  objectPosition: '50% 50%',
  alt: 'Cajón abierto de un fichero de biblioteca, con las tarjetas mecanografiadas a la vista.',
  credit: creditos(
    'Copyright Card Catalog Drawer',
    'Michael Holley Swtpc6800',
    'Copyright_Card_Catalog_Drawer.jpg',
  ),
};

/** Índice fotográfico completo, para el bloque de créditos del pie (§8.8). */
export const ARCHIVO = {
  inicio: INICIO_FOTOS,
  prologo: PROLOGO_FOTO,
  cifras: CIFRAS_INSERTO,
};
