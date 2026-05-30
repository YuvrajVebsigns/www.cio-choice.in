'use client';

import { useRef, useEffect } from 'react';

type Options = {
  animationClass?: string;
  initialTransform?: string;
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
};

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(options: Options = {}) {
  const {
    animationClass = 'animate-fade-in',
    initialTransform = 'translateY(24px)',
    rootMargin = '0px',
    threshold = 0.12,
    once = true,
  } = options;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // set initial state
    el.style.opacity = '0';
    if (initialTransform) el.style.transform = initialTransform;
    // Slower transition for smoother, easier-to-follow scroll animations
    el.style.transition = 'opacity 0.95s ease, transform 1.05s ease';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add(options.animationClass || animationClass);
            el.style.opacity = '1';
            el.style.transform = 'none';

            if (once) {
              observer.disconnect();
            }
          } else if (!once) {
            // remove animation when element leaves viewport so it animates on scroll up/down
            el.classList.remove(options.animationClass || animationClass);
            el.style.opacity = '0';
            if (initialTransform) el.style.transform = initialTransform;
          }
        });
      },
      { root: null, rootMargin, threshold },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [animationClass, initialTransform, options.animationClass, rootMargin, threshold, once]);

  return ref;
}

export default useScrollAnimation;
