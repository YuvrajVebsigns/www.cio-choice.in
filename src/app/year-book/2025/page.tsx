'use client';

import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const spreads: string[][] = [
  ['/assets/book2025/1.png'],
  ['/assets/book2025/2.png', '/assets/book2025/3.png'],
  ['/assets/book2025/4.png', '/assets/book2025/5.png'],
  ['/assets/book2025/6.png', '/assets/book2025/7.png'],
  ['/assets/book2025/8.png', '/assets/book2025/9.png'],
];

export default function SurveyStudyPage() {
  const [currentSpread, setCurrentSpread] = useState<number>(0);

  const heroContentRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.12,
    once: false,
  });

  const currentPages = spreads[currentSpread] ?? [];

  const nextPage = () => {
    setCurrentSpread((prev) => Math.min(prev + 1, spreads.length - 1));
  };

  const prevPage = () => {
    setCurrentSpread((prev) => Math.max(prev - 1, 0));
  };

  return (
    <>
      <section className="survey-study-section" style={{ padding: '40px 24px' }}>
        <div className="survey-study-container">
          <div className="survey-study-row">
            <div className="survey-study-content" ref={heroContentRef}>
              <h2>CIO Choice 2026 Year Book</h2>

              <p className="survey-study-intro">
                The <strong>CIO Choice 2026 Year Book</strong> showcases India&apos;s most trusted
                ICT brands recognized by CIO Choice based on the stated preferences of CIOs and
                technology decision-makers.
              </p>

              <div className="survey-study-card">
                <div className="survey-study-book">
                  <img
                    src="/assets/year-book/2025/1.png"
                    alt="CIO Choice Year Book 2026"
                    className="survey-study-book-image"
                  />

                  <div className="survey-study-book-content">
                    <h3>Year Book 2026</h3>

                    <p>
                      Enterprises honored with the prestigious CIO Choice 2026 Recognition are
                      acknowledged for delivering exceptional IT products, services, and solutions.
                    </p>

                    <p>
                      CIO Choice is distinguished as a mark of customer satisfaction and endorsement
                      by CIOs. Participation in CIO Choice is exclusive and reserved for industry
                      leaders in the ICT sector.
                    </p>

                    <p>
                      Achieving CIO Choice Recognition enhances brand value and serves as a powerful
                      tool for accelerating sales, providing assurance to customers and end users
                      alike that they are investing in top-tier offerings within their respective
                      categories.
                    </p>

                    <p>
                      Recognized organizations are prominently featured in the{' '}
                      <strong>CIO Choice 2026 Coffee Table Book.</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="book-section">
        <div className="book-container">
          <h2>CIO Choice Year Book</h2>

          <div className="book-wrapper">
            <button
              type="button"
              className="book-arrow left"
              onClick={prevPage}
              disabled={currentSpread === 0}
              aria-label="Previous page"
            >
              &#10094;
            </button>

            <div className={`book-spread ${currentSpread === 0 ? 'book-cover' : ''}`}>
              {currentPages.map((page, index) => (
                <div className="book-page" key={page}>
                  <img src={page} alt={`CIO Choice Year Book Page ${index + 1}`} />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="book-arrow right"
              onClick={nextPage}
              disabled={currentSpread === spreads.length - 1}
              aria-label="Next page"
            >
              &#10095;
            </button>
          </div>

          <div className="book-indicator">
            {currentSpread === 0
              ? 'Cover Page'
              : `Pages ${currentSpread * 2} - ${currentSpread * 2 + 1}`}
          </div>
        </div>
      </section>

      <section className="yearbook-cards-section">
        <div className="yearbook-cards-container">
          <h2>Explore Year Books</h2>

          <div className="yearbook-cards-grid">
            {Array.from({ length: 14 }, (_, index) => {
              const year = 2026 - index;

              return (
                <div className="yearbook-card" key={year}>
                  <div className="yearbook-card-image">
                    {/* <img src={`/assets/yearbook/${year}.png`} alt={`CIO Choice Year Book ${year}`} /> */}
                    <img src={`/assets/book2025/1.png`} alt={`CIO Choice Year Book ${year}`} />
                  </div>

                  <h3>{year} Year Book</h3>

                  <a href={`/year-book/${year}`} className="yearbook-card-btn">
                    View Book
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
