import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { PROJECTS } from '../content/profile.js';

const ProjectsCarousel = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [navReady, setNavReady] = useState(false);

  return (
    <section id="projects" className="rounded-3xl border border-slate-100 bg-white/90 p-8 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-500">Proyectos</p>
          <h2 className="mt-3 text-3xl font-heading">Casos recientes</h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            ref={prevRef}
            type="button"
            className="projects-prev inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-900 sm:h-12 sm:w-12"
          >
            <i className="fa-solid fa-arrow-left" />
          </button>
          <button
            ref={nextRef}
            type="button"
            className="projects-next inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-900 sm:h-12 sm:w-12"
          >
            <i className="fa-solid fa-arrow-right" />
          </button>
        </div>
      </div>
      <div className="relative mt-8">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={28}
          slidesPerView={1.05}
          centeredSlides={false}
          loop
          autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          breakpoints={{
            500: { slidesPerView: 1.15 },
            768: { slidesPerView: 1.4 },
            1024: { slidesPerView: 1.7 },
            1280: { slidesPerView: 2 },
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
            setNavReady(true);
          }}
          navigation={navReady ? { prevEl: prevRef.current, nextEl: nextRef.current } : undefined}
          pagination={{ el: '.projects-pagination', clickable: true }}
        >
          {PROJECTS.map((project) => (
            <SwiperSlide key={project.title} className="pt-6">
              <article className="group h-full min-h-[460px] rounded-3xl border border-slate-100 bg-gradient-to-b from-white to-slate-50 p-6 shadow-lg shadow-slate-900/5 transition duration-500 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:from-slate-900 dark:to-slate-900/30">
                <div className="relative overflow-hidden rounded-3xl">
                  <img
                    src={project.image}
                    alt={`Proyecto ${project.title}`}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm">
                    {project.metric}
                  </span>
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <div>
                    <h3 className="text-xl font-heading">{project.title}</h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span key={tech} className="rounded-full bg-slate-100/80 px-3 py-1 text-xs font-semibold dark:bg-slate-800/80">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target={project.link.startsWith('http') ? '_blank' : undefined}
                    rel={project.link.startsWith('http') ? 'noreferrer' : undefined}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-500"
                  >
                    Ver detalle
                    <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
                  </a>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="projects-pagination mt-6" />
      </div>
    </section>
  );
};

export default ProjectsCarousel;
