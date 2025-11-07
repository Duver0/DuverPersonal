import { useEffect, useRef, useState } from 'react';

export const useReveal = (options = { threshold: 0.2 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = ref.current;
    if (!target || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(target);
    return () => observer.disconnect();
  }, [options]);

  return { ref, visible };
};
