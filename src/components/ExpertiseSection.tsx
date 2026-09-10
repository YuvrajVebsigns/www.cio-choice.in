'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutCioChoiceSection() {
  const sectionRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-up',
    initialTransform: 'translateY(40px)',
  });

  const cardRef1 = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.2,
  });

  const cardRef2 = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.2,
  });

  const cardRef3 = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.2,
  });

  const cardRef4 = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.2,
  });

  const cards = [
    {
      title: '2027 Red Carpet Night',
      image: '/assets/aboutus/red-carpet-2026.png',
      link: '/red-carpet-night/red-carpet-night-2027',
    },
    {
      title: '2026 Red Carpet Night',
      image: '/assets/aboutus/red-carpet-2025.png',
      link: '/red-carpet-night/red-carpet-night-2026',
    },
    {
      title: 'Recognized Brands',
      image: '/assets/aboutus/recognized-brandss.png',
      link: '/recognized-brands/2026',
    },
    {
      title: '2026 Year Book',
      image: '/assets/aboutus/year-book.png',
      link: '/year-book/2026',
    },
  ];

  const cardRefs = [cardRef1, cardRef2, cardRef3, cardRef4];

  return (
    <section ref={sectionRef} className="about-cio-section">
      <div className="about-cio-container">
        <div className="about-cio-heading">
          <div className="about-cio-label">
            <Image
              src="/assets/icon.png"
              alt="CIO Choice"
              width={20}
              height={20}
              className="expertise-label-icon"
            />
            <span className="about-cio-label-text">ABOUT CIO CHOICE</span>
          </div>

          <p className="about-cio-description">
            CIO CHOICE is the GOLD SEAL of Trust, recognizing ICT brands preferred by Indias leading
            technology decision-makers.
          </p>
        </div>

        <div className="about-cio-grid">
          {cards.map((card, index) => (
            <div key={card.title} ref={cardRefs[index]} className="about-cio-card">
              <div className="about-cio-image-wrap">
                <img src={card.image} alt={card.title} className="about-cio-card-img" />
              </div>

              <h3 className="about-cio-card-title">{card.title}</h3>

              <Link href={card.link} className="about-cio-read-more">
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
