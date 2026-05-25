'use client';

import { useEffect } from 'react';

export default function ScrollAnimator() {
  useEffect(() => {
    const selector = '[data-animate], .animate-on-scroll';
    const els = Array.from(document.querySelectorAll<HTMLElement>(selector));

    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          const animClass =
            el.dataset.animate || el.classList.contains('animate-on-scroll')
              ? 'animate-fade-in'
              : '';

          if (entry.isIntersecting) {
            if (animClass) el.classList.add(animClass);
            el.style.opacity = '1';
            el.style.transform = 'none';
          } else {
            if (animClass) el.classList.remove(animClass);
            el.style.opacity = '0';
            const init = el.dataset.animateInit || 'translateY(24px)';
            el.style.transform = init;
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.12 },
    );

    els.forEach((el) => {
      el.style.opacity = '0';
      const init = el.dataset.animateInit || 'translateY(24px)';
      el.style.transform = init;
      el.style.transition = 'opacity 0.5s ease, transform 0.55s ease';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
