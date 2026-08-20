import { useEffect, useRef, useState } from 'react';

const DEFAULT_OPTIONS = { threshold: 0.2 };

export const useReveal = (options = DEFAULT_OPTIONS) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const optsRef = useRef(options);

  useEffect(() => {
    const target = ref.current;
    if (!target || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, optsRef.current);

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
};
