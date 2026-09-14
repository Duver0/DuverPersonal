import { useEffect, useState } from 'react';

/**
 * Observa la clase `dark` de <html> y retorna si el tema oscuro está activo.
 * Encapsula el único MutationObserver de tema (los fondos no deben crear
 * el suyo propio). Incluye cleanup al desmontar.
 */
export const useIsDark = () => {
  const [isDark, setIsDark] = useState(
    () =>
      typeof document !== 'undefined' && document.documentElement.classList.contains('dark'),
  );

  useEffect(() => {
    const el = document.documentElement;
    const sync = () => setIsDark(el.classList.contains('dark'));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(el, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return isDark;
};

export default useIsDark;
