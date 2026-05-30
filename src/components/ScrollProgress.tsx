'use client';

import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const progressRef = useScrollAnimation({
    animationClass: 'animate-fade-in-right',
    initialTransform: 'translateX(50px)',
  });

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent =
        scrollHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100)) : 0;
      setProgress(percent);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  const ringStyle = {
    background: `conic-gradient(#b40000 ${progress * 3.6}deg, rgba(180, 0, 0, 0.12) 0deg)`,
  };

  return (
    <div ref={progressRef} className="scroll-progress-indicator" aria-hidden="true">
      <div className="scroll-progress-indicator__ring" style={ringStyle}>
        <div className="scroll-progress-indicator__inner">
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
}
