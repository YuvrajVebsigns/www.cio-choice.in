'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function ExpertiseSection() {
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

  const features = [
    {
      title: 'CIO & ICT Community Reach',
      description:
        'Engaging over 36,000 ICT decision-makers and influencers across key industries through our trusted platforms and events.',
      image: '/assets/aboutus/builb-logo.png',
      hoverImage: '/assets/aboutus/builb-logo-dark.png',
    },
    {
      title: 'Flagship Recognition Platforms',
      description:
        'From CIO Choice to CIO Power List and Digital Genius Awards, we celebrate excellence across enterprises and startups.',
      image: '/assets/aboutus/Award-logo1.png',
      hoverImage: '/assets/aboutus/Award-logo-dark1.png',
    },
    {
      title: 'Digital & ABM Solutions',
      description:
        'Delivering impactful ABM campaigns, digital roundtables, and custom content solutions that help brands connect meaningfully.',
      image: '/assets/aboutus/dedicated-logo.png',
      hoverImage: '/assets/aboutus/dedicated-logo-dark.png',
    },
  ];

  const cardRefs = [cardRef1, cardRef2, cardRef3];

  return (
    <section ref={sectionRef} className="expertise-section">
      <div className="expertise-container">
        <div className="expertise-heading">
          <div className="expertise-label">
            <span className="expertise-label-icon">⬢</span>

            <span className="expertise-label-text">About Us</span>
          </div>

          <h2 className="expertise-title">
            Connecting Enterprises,
            <br />
            Startups & <span>Innovators.</span>
          </h2>
        </div>

        <div className="expertise-grid">
          {features.map((feature, index) => (
            <div key={index} ref={cardRefs[index]} className="expertise-card">
              <br />
              <div className="expertise-image-wrapper">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className={`expertise-image default-image ${index === 0 ? 'expertise-image--small' : ''}`}
                />

                <img
                  src={feature.hoverImage}
                  alt={feature.title}
                  className={`expertise-image hover-image ${index === 0 ? 'expertise-image--small' : ''}`}
                />
              </div>

              <br />
              <br />
              <h3 className="expertise-card-title">{feature.title}</h3>

              <p className="expertise-card-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
