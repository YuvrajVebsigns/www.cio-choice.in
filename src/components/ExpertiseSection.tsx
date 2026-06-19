'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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
      title: '2026 Red Carpet Night',
      description:
        'CORE Media proudly celebrates the 14th Anniversary of the CIO Choice Recognition Program, honoring Indias most trusted ICT brands as chosen by CIOs and Digital Leaders.',
      image: '/assets/aboutus/red-carpet-2026.png',
    },
    {
      title: '2025 Red Carpet Night',
      description:
        'CORE Media proudly welcomes you to the 13th Anniversary of the CIO Choice Recognition Program, celebrating trusted ICT brands voted by CIOs and Digital Leaders across India.',
      image: '/assets/aboutus/red-carpet-2025.png',
    },
    {
      title: 'Recognized Brands',
      description:
        'It gives us immense pleasure and privilege in announcing the following brands that have been recognized as CIO CHOICE 2026 in their respective categories.',
      image: '/assets/aboutus/recognized-brandss.png',
    },
    {
      title: '2025 Year Book',
      description:
        'CIO Choice 2025 recognizes leading ICT organizations for excellence and trusted customer value. The recognition enhances brand credibility and features winners in the CIO Choice 2025 Coffee Table Book.',
      image: '/assets/aboutus/year-book.png',
    },
  ];

  const cardRefs = [cardRef1, cardRef2, cardRef3, cardRef4];

  return (
    <section ref={sectionRef} className="about-cio-section">
      <div className="about-cio-container">
        <div className="about-cio-heading">
          <div className="about-cio-label">
            <span className="about-cio-label-icon">⬢</span>
            <span className="about-cio-label-text">About Us</span>
          </div>

          <h2 className="about-cio-title">
            ABOUT <span>CIO CHOICE</span>
          </h2>

          <p className="about-cio-description">
            “CIO CHOICE” is a very powerful tool for organizations in the Information &
            Communications Technology space to promote and market their products, services and
            solutions.
          </p>
        </div>

        <div className="about-cio-grid">
          {cards.map((card, index) => (
            <div key={card.title} ref={cardRefs[index]} className="about-cio-card">
              <div className="about-cio-image-wrap">
                <img src={card.image} alt={card.title} className="about-cio-card-img" />
              </div>

              <h3 className="about-cio-card-title">{card.title}</h3>

              <p className="about-cio-card-description">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
