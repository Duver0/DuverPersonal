import SectionNav from './components/SectionNav.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import Inicio from './components/Inicio.jsx';
import Prologo from './components/Prologo.jsx';
import Cifras from './components/Cifras.jsx';
import Disciplinas from './components/Disciplinas.jsx';
import Trayectoria from './components/Trayectoria.jsx';
import Archivo from './components/Archivo.jsx';
import SobreMi from './components/SobreMi.jsx';
import Contacto from './components/Contacto.jsx';
import PlacaFinal from './components/PlacaFinal.jsx';
import { useTheme } from './hooks/useTheme.js';

/*
  §9 / §10: las entradas por sección sólo ocultan contenido si el documento
  lleva la clase `js`. Se pone aquí, en el ámbito del módulo, antes del primer
  render; `Reveal` la consulta en cada render. Sin script, el contenido se ve.
*/
if (typeof document !== 'undefined') document.documentElement.classList.add('js');

/**
 * El campo de papel lo pintan `html`/`body` desde `src/index.css`: esta capa
 * sólo monta el grano y ordena los planos. El contenido va por encima del grano
 * (`z-10`) para que la capa de papel no interfiera con nada que se pinte encima.
 *
 * Composición final (§8): las ocho secciones del índice son **hermanas**, al ras
 * de este contenedor, cada una con su propio `Shell` y su ritmo. Ninguna va dentro
 * de un `Shell` común: anidarlas sumaría dos `--pad-x` (40 px en vez de 20) y
 * rompería la medida del Prólogo y de la tira de fichas. El orden es el del índice
 * (`SectionNav.SECCIONES`), y los `id` de cada sección coinciden con sus anclas.
 *
 * `PlacaFinal` es el `<footer>`: va **fuera** de `<main>` (semántica) y con
 * `z-10` (lo aporta el propio componente) para no quedar bajo el grano fijo. Es
 * el noveno bloque (créditos y nombre completo) y NO lleva ancla del índice: su
 * `id` es `placa-final`.
 */
const App = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="relative">
      <div className="field-grain" aria-hidden="true" />
      <SectionNav />
      <main className="relative z-10">
        <Inicio />
        <Prologo />
        <Cifras />
        <Disciplinas />
        <Trayectoria />
        <Archivo />
        <SobreMi />
        <Contacto />
      </main>
      <PlacaFinal />
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
    </div>
  );
};

export default App;
