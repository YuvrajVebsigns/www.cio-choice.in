'use client';

import { useEffect } from 'react';

export default function ScrollAnimator() {
  useEffect(() => {
    const selector = '[data-animate], .animate-on-scroll';
    const els = Array.from(document.querySelectorAll<HTMLElement>(selector));

    if (!els.length) return;

    const observed = new WeakSet<HTMLElement>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;

          const hasAttr = el.hasAttribute('data-animate');
          const attrVal = el.getAttribute('data-animate') || '';

          let animClass = '';
          if (hasAttr && attrVal)
            animClass = attrVal; // use provided class name
          else if (hasAttr && !attrVal)
            animClass = 'animate-fade-in'; // attribute present without value
          else if (el.classList.contains('animate-on-scroll')) animClass = 'animate-fade-in';

          if (entry.isIntersecting) {
            if (animClass) el.classList.add(animClass);
            el.style.opacity = '1';
            el.style.transform = 'none';
          } else {
            if (animClass) el.classList.remove(animClass);
            el.style.opacity = '0';

            // determine sensible init transform based on requested animation
            const initAttr = el.getAttribute('data-animate-init');
            let init = initAttr || el.dataset.animateInit || '';

            if (!init) {
              if (animClass.includes('left')) init = 'translateX(-24px)';
              else if (animClass.includes('right')) init = 'translateX(24px)';
              else if (animClass.includes('down') || animClass.includes('slide-down'))
                init = 'translateY(-12px)';
              else init = 'translateY(24px)';
            }

            el.style.transform = init;
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.12 },
    );

    function observeElement(el: HTMLElement) {
      if (observed.has(el)) return;
      observed.add(el);

      el.style.opacity = '0';
      const init =
        (el.getAttribute('data-animate-init') as string) ||
        el.dataset.animateInit ||
        'translateY(24px)';
      el.style.transform = init;
      el.style.transition = 'opacity 0.5s ease, transform 0.55s ease';
      observer.observe(el);
    }

    // observe existing elements
    els.forEach(observeElement);

    // watch for newly added elements (client fetched lists)
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of Array.from(m.addedNodes)) {
          if (!(node instanceof HTMLElement)) continue;

          // if the added node itself matches, observe it
          if (node.matches && node.matches(selector)) {
            observeElement(node as HTMLElement);
          }

          // also check descendants
          const descendants = Array.from(node.querySelectorAll<HTMLElement>(selector));
          descendants.forEach(observeElement);
        }
      }
    });

    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
