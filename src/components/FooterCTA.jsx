import Reveal from './Reveal.jsx';

const FooterCTA = () => (
  <Reveal>
    <section className="mt-6 rounded-3xl bg-gradient-to-r from-brand-600 to-purple-600 p-10 text-white shadow-glow">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-white/70">¿Listo para crear?</p>
          <h2 className="mt-3 text-3xl font-heading">Diseñemos el próximo sprint juntos</h2>
          <p className="mt-2 max-w-2xl text-base text-white/80">
            Puedo sumarme como freelancer o refuerzo temporal para reducir tu backlog y dejar procesos automatizados.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <a
            href="mailto:duverbetancurbedoya@outlook.com"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-600"
          >
            <i className="fa-solid fa-calendar" />
            Reservar discovery call
          </a>
          <a
            href="https://github.com/Duver0"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-3 text-sm font-semibold"
          >
            <i className="fa-brands fa-github" />
            GitHub
          </a>
        </div>
      </div>
    </section>
  </Reveal>
);

export default FooterCTA;
