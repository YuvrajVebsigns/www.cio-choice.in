'use client';

import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function SurveyStudyPage() {
  const [currentSpread, setCurrentSpread] = useState<number>(0);
  const [pages, setPages] = useState<string[]>([]);

  const heroContentRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.12,
    once: false,
  });

  useEffect(() => {
    let cancelled = false;

    const loadYearbookPages = async () => {
      const foundPages: string[] = [];
      const MAX_PAGES = 200;

      for (let pageNumber = 1; pageNumber <= MAX_PAGES; pageNumber++) {
        const page = String(pageNumber).padStart(3, '0');
        const imagePath = `/assets/yearbook/2018/page-${page}.jpg`;

        const imageExists = await new Promise<boolean>((resolve) => {
          const image = new Image();

          image.onload = () => resolve(true);
          image.onerror = () => resolve(false);

          image.src = imagePath;
        });

        if (!imageExists) {
          break;
        }

        foundPages.push(imagePath);
      }

      if (!cancelled) {
        setPages(foundPages);
      }
    };

    loadYearbookPages();

    return () => {
      cancelled = true;
    };
  }, []);

  const spreads: string[][] = [];

  if (pages.length > 0 && pages[0]) {
    // Cover page
    spreads.push([pages[0]]);

    // Remaining pages in pairs
    for (let i = 1; i < pages.length; i += 2) {
      const spreadPages = pages.slice(i, i + 2);

      if (spreadPages.length > 0) {
        spreads.push(spreadPages);
      }
    }
  }

  const currentPages = spreads[currentSpread] ?? [];

  const nextPage = () => {
    setCurrentSpread((prev) => Math.min(prev + 1, Math.max(spreads.length - 1, 0)));
  };

  const prevPage = () => {
    setCurrentSpread((prev) => Math.max(prev - 1, 0));
  };

  return (
    <>
      {/* =========================================================
          HERO / INTRO SECTION
      ========================================================= */}
      <section className="survey-study-section" style={{ padding: '40px 24px' }}>
        <div className="survey-study-container">
          <div className="survey-study-row">
            <div className="survey-study-content" ref={heroContentRef}>
              <h2>CIO Choice 2018 Year Book</h2>

              <p className="survey-study-intro">
                The <strong>CIO Choice 2018 Year Book</strong> showcases India&apos;s most trusted
                ICT brands recognized by CIO Choice based on the stated preferences of CIOs and
                technology decision-makers.
              </p>

              <div className="survey-study-card">
                <div className="survey-study-book">
                  <img
                    src="/assets/yearbook/2018/page-001.jpg"
                    alt="CIO Choice Year Book 2018"
                    className="survey-study-book-image"
                  />

                  <div className="survey-study-book-content">
                    <h3>Year Book 2018</h3>

                    <p>
                      Enterprises honored with the prestigious CIO Choice 2018 Recognition are
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
                      <strong>CIO Choice 2018 Coffee Table Book.</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          YEAR BOOK VIEWER
      ========================================================= */}
      <section className="book-section">
        <div className="book-container">
          <h2>CIO Choice Year Book</h2>

          <div className="book-wrapper">
            <button
              type="button"
              className="book-arrow left"
              onClick={prevPage}
              disabled={currentSpread === 0 || spreads.length === 0}
              aria-label="Previous page"
            >
              &#10094;
            </button>

            <div className={`book-spread ${currentSpread === 0 ? 'book-cover' : ''}`}>
              {currentPages.length > 0 ? (
                currentPages.map((page, index) => (
                  <div className="book-page" key={page}>
                    <img
                      src={page}
                      alt={`CIO Choice 2018 Year Book Page ${
                        currentSpread === 0 ? 1 : currentSpread * 2 + index
                      }`}
                    />
                  </div>
                ))
              ) : (
                <div className="book-page">
                  <p>Loading Year Book...</p>
                </div>
              )}
            </div>

            <button
              type="button"
              className="book-arrow right"
              onClick={nextPage}
              disabled={spreads.length === 0 || currentSpread === spreads.length - 1}
              aria-label="Next page"
            >
              &#10095;
            </button>
          </div>

          <div className="book-indicator">
            {spreads.length === 0
              ? 'Loading...'
              : currentSpread === 0
                ? 'Cover Page'
                : `Pages ${currentSpread * 2} - ${Math.min(currentSpread * 2 + 1, pages.length)}`}
          </div>
        </div>
      </section>

      {/* =========================================================
          EXPLORE YEAR BOOKS
      ========================================================= */}
      <section className="yearbook-cards-section">
        <div className="yearbook-cards-container">
          <h2>Explore Year Books</h2>

          <div className="yearbook-cards-grid">
            {Array.from({ length: 14 }, (_, index) => {
              const year = 2026 - index;

              const yearbookImages: Record<number, string> = {
                2026: '/assets/yearbook/2026/page-01.jpg',
                2025: '/assets/yearbook/2025/page-001.jpg',
                2024: '/assets/yearbook/2024/page-001.jpg',
                2023: '/assets/yearbook/2023/page-001.jpg',
                2022: '/assets/yearbook/2022/page-001.jpg',
                2021: '/assets/yearbook/2021/page-001.jpg',
                2020: '/assets/yearbook/2020/page-001.jpg',
                2019: '/assets/yearbook/2019/page-001.jpg',
                2018: '/assets/yearbook/2018/page-001.jpg',
                2017: '/assets/yearbook/2017/page-001.jpg',
                2016: '/assets/yearbook/2016/page-001.jpg',
                2015: '/assets/yearbook/2015/page-001.jpg',
                2014: '/assets/yearbook/2014/page-01.jpg',
                2013: '/assets/yearbook/2013/page-01.jpg',
              };

              return (
                <div className="yearbook-card" key={year}>
                  <div className="yearbook-card-image">
                    <img src={yearbookImages[year]} alt={`CIO Choice Year Book ${year}`} />
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
