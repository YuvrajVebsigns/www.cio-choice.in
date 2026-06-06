import Link from 'next/link';

export const metadata = {
  title: 'Advisory Panel 2025',
  description:
    'Explore the Advisory Panel 2025 page for CIO Choice advisory members, insights, and recognition highlights.',
};

export default function AdvisoryPanel2025Page() {
  return (
    <main className="advisory-page">
      <section className="advisory-page-hero">
        <span className="advisory-page-badge">Advisory Panel</span>
        <h1 className="advisory-page-title">Advisory Panel 2025</h1>
        <p className="advisory-page-subtitle">
          Meet the CIO Choice Advisory Panel for 2025: an expert community guiding technology
          recognition, governance, and member-driven insights across the ICT industry.
        </p>
        <Link href="/contact" className="advisory-page-link-button">
          Connect with the Panel
        </Link>
      </section>

      <section className="advisory-page-section">
        <article className="advisory-page-card">
          <h2 className="advisory-page-card-heading">Trusted Industry Leadership</h2>
          <p className="advisory-page-card-text">
            Advisory Panel 2025 unites senior CIOs and IT decision-makers who shape the methodology
            and credibility of CIO Choice recognition programs.
          </p>
        </article>

        <article className="advisory-page-card">
          <h2 className="advisory-page-card-heading">Why This Panel Matters</h2>
          <p className="advisory-page-card-text">
            The panel validates award selection, supports community-driven research, and ensures
            recognition is aligned with real enterprise priorities.
          </p>
        </article>

        <div className="advisory-page-card">
          <h2 className="advisory-page-card-heading">Panel Highlights</h2>
          <ul className="advisory-page-list">
            <li className="advisory-page-list-item">
              <span className="advisory-page-list-item-label">01 Expert governance</span>
              <p className="advisory-page-list-item-text">
                A curated community of CIO leaders reviewing industry performance and category
                recognition.
              </p>
            </li>
            <li className="advisory-page-list-item">
              <span className="advisory-page-list-item-label">02 Strategic insight</span>
              <p className="advisory-page-list-item-text">
                Actionable guidance for brands that want to align with CIO priorities and enterprise
                trust.
              </p>
            </li>
            <li className="advisory-page-list-item">
              <span className="advisory-page-list-item-label">03 Broad industry credibility</span>
              <p className="advisory-page-list-item-text">
                Panel endorsement strengthens recognition value and amplifies member reputation.
              </p>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
