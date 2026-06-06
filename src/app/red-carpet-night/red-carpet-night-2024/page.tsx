import Link from 'next/link';

export const metadata = {
  title: 'Red Carpet Night 2024',
  description:
    'Celebrate Red Carpet Night 2024 with CIO Choice recognition and curated brand honors.',
};

export default function RedCarpetNight2024Page() {
  return (
    <main className="rcn-main">
      <section className="rcn-hero">
        <div className="rcn-hero-overlay" />
        <div className="rcn-hero-content">
          <span className="rcn-hero-badge">Red Carpet Night</span>
          <h1 className="rcn-title">Red Carpet Night 2024</h1>
          <p className="rcn-subtitle">
            A premium CIO Choice gala that honors the top ICT brands and leaders in the industry for
            2024.
          </p>

          <div className="rcn-cta-row">
            <Link href="/contact" className="rcn-cta-button">
              Book Your Spotlight
            </Link>
            <span className="rcn-cta-note">
              Explore the event detail page for year-specific recognition and participation updates.
            </span>
          </div>
        </div>
      </section>

      <section className="rcn-cards-section">
        <div className="rcn-cards-grid">
          <article className="rcn-card">
            <h2>Exclusive Gala</h2>
            <p>
              Experience the premier CIO Choice event where brands receive live recognition in front
              of industry leaders.
            </p>
          </article>
          <article className="rcn-card">
            <h2>Yearly Honors</h2>
            <p>
              The 2024 edition celebrates innovation, trust, and customer excellence across the CIO
              ecosystem.
            </p>
          </article>
          <article className="rcn-card">
            <h2>Brand Spotlight</h2>
            <p>
              Showcase your company on the red carpet and gain visibility with a curated CIO
              audience.
            </p>
          </article>
        </div>
      </section>

      <section className="rcn-summary-section">
        <div className="rcn-summary-content">
          <h2>Why Red Carpet Night Matters</h2>
          <p>
            Red Carpet Night is the flagship event for CIO Choice recognition. It brings together
            technology leaders, industry experts, and celebrated brands under one premium
            experience.
          </p>
          <div className="rcn-summary-list">
            <div className="rcn-summary-item">
              <span>01</span>
              <p>Exclusive awards for top performing ICT brands.</p>
            </div>
            <div className="rcn-summary-item">
              <span>02</span>
              <p>High-value networking and media exposure for participants.</p>
            </div>
            <div className="rcn-summary-item">
              <span>03</span>
              <p>Official recognition from CIO Choice trusted community and panels.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
