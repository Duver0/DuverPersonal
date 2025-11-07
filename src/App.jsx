import GradientBackground from './components/GradientBackground.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import Hero from './components/Hero.jsx';
import StatsGrid from './components/StatsGrid.jsx';
import SkillsColumn from './components/SkillsColumn.jsx';
import AboutSection from './components/AboutSection.jsx';
import ExperienceTimeline from './components/ExperienceTimeline.jsx';
import ProjectsCarousel from './components/ProjectsCarousel.jsx';
import FooterCTA from './components/FooterCTA.jsx';
import { useTheme } from './hooks/useTheme.js';

const App = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-slate-100">
      <GradientBackground />
      <div className="relative z-10">
        <div className="container mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6">
          <Hero />
          <StatsGrid />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <div className="min-w-0">
              <SkillsColumn />
            </div>
            <div className="space-y-8 min-w-0">
              <AboutSection />
              <ExperienceTimeline />
            </div>
          </div>
          <ProjectsCarousel />
          <FooterCTA />
        </div>
      </div>
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
    </div>
  );
};

export default App;
