'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleWindowLoad = () => {
      setTimeout(() => {
        setIsLoaded(true);
      }, 500);

      setTimeout(() => {
        setIsVisible(false);
      }, 1000);
    };

    if (document.readyState === 'complete') {
      handleWindowLoad();
    } else {
      window.addEventListener('load', handleWindowLoad);
      return () => window.removeEventListener('load', handleWindowLoad);
    }
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`tj-preloader ${isLoaded ? 'is-loaded' : 'is-loading'}`}
      style={{
        display: isVisible ? 'block' : 'none',
      }}
    >
      <div className="tj-preloader-inner">
        <div className="tj-preloader-content-wrapper">
          <div className="tj-preloader-ball-inner-wrap">
            <div className="tj-preloader-ball-inner">
              <div className="tj-preloader-ball"></div>
            </div>
            <div className="tj-preloader-ball-shadow"></div>
          </div>
          {/* <div id="tj-weave-anim" className="tj-preloader-text">
            Loading...
          </div> */}

          <div id="tj-weave-anim" className="tj-preloader-text">
            {'Loading...'.split('').map((letter, index) => (
              <span
                key={index}
                style={{
                  animationDelay: `${index * 0.08}s`,
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="tj-preloader-overlay"></div>
    </div>
  );
}
