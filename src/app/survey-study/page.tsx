'use client';

import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function SurveyStudyPage() {
  const heroContentRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.12,
    once: false,
  });

  return (
    <>
      <section className="survey-study-section" style={{ padding: '40px 24px' }}>
        <div className="survey-study-container">
          <div className="survey-study-row">
            <div className="survey-study-content" ref={heroContentRef}>
              <h2>Survey / Study</h2>

              <p>
                In the fiercely competitive business world we live in today, organisations that can
                interlock their product/service offering and market feedback are the ones that will
                gain a strong competitive advantage, garner more loyal customers, and earn customer
                advocacy.
              </p>

              <div className="survey-study-card">
                <h3>CORE Media has expertise in delivering surveys that will:</h3>

                <ul className="survey-study-list">
                  <li>
                    Provide actionable insight to improve customer experience and thereby increase
                    customer retention.
                  </li>

                  <li>
                    Help you understand market perception about your company and products/services.
                  </li>

                  <li>
                    Gather tangible data for better business decisions and help spot trends ahead of
                    time, giving you a significant market advantage.
                  </li>
                </ul>
              </div>

              <div className="survey-study-card">
                <h3>We provide valuable data and feedback from the ITDM community by:</h3>

                <ul className="survey-study-list">
                  <li>Crafting the right questions to get the answers you need.</li>

                  <li>
                    Interpreting responses and delivering infographics/highlights to easily
                    understand the data.
                  </li>

                  <li>Assisting with action planning and workshops for implementing changes.</li>
                </ul>
              </div>

              <p>
                Whether you want a short dipstick survey or a detailed study of your target
                market—we&apos;ll get you the insights you need!
              </p>

              <div className="survey-study-back">
                <Link href="/" className="survey-study-back-btn">
                  ← Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
