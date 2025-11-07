const GradientBackground = () => (
  <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute right-[-40px] top-[-80px] h-80 w-80 animate-float-fast rounded-full bg-brand-500/20 blur-[130px]" />
    <div className="absolute bottom-10 left-[-60px] h-72 w-72 animate-float-slow rounded-full bg-rose-400/10 blur-[120px]" />
  </div>
);

export default GradientBackground;
