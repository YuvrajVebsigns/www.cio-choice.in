// import Link from 'next/link';
import styles from '../[...year]/page.module.css';

export const metadata = {
  title: 'Recognized Brands 2026',
  description:
    'Discover CIO Choice recognized brands for 2026, featuring top technology companies and innovation leaders.',
};

export default function RecognizedBrands2026Page() {
  const year = '2026';
  const heading = `Recognized Brands ${year}`;

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <p className={styles.heroBadge}>Premium CIO Choice</p>
          <h1 className={styles.heroTitle}>{heading}</h1>
          <p className={styles.heroText}>
            Discover the brands honored by CIO Choice with a bold red hero presentation and
            interactive detail cards.
          </p>

          <div className={styles.heroBanner}>
            <div className={styles.heroBannerContent}>
              <div className={styles.heroBannerIcon}>★</div>
              <div className={styles.heroBannerText}>
                <span className={styles.heroBannerLabel}>Interactive Highlight</span>
                <p className={styles.heroBannerTitle}>
                  Mouse over the featured brands to reveal recognition emphasis and visual action.
                </p>
              </div>
            </div>
            <p className={styles.heroBannerNote}>
              This hero section now uses a strong red theme and elegant transitions through the page
              module.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.infoCard}>
            <div className={styles.infoCardInner}>
              <div>
                <br />
                <p className={styles.heroBadge}>Premium CIO Choice</p>
                <h2 className={styles.infoCardTitle}>Recognized Brands {year}</h2>
              </div>
              <div className={styles.badgeYear}>
                <span className={styles.badgePill}>★</span>
                Year {year}
              </div>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoCardInner}>
              <div>
                <h3 className={styles.infoCardTitle}>Featured Brands</h3>
                <p className={styles.brandDescription}>
                  Discover the brands shaping the ICT ecosystem with trusted innovation,
                  reliability, and customer excellence.
                </p>
              </div>
            </div>

            <div className={styles.featuredGrid}>
              <article className={styles.featureGridCard}>
                <div className={styles.featuredBrandMeta}>
                  <div className={styles.brandLogo}>CC</div>
                  <div>
                    <p className={styles.brandName}>CIO Cloud Connect</p>
                    <p className={styles.brandCategory}>Cloud Infrastructure</p>
                  </div>
                </div>
                <p className={styles.brandDescription}>
                  Trusted for secure enterprise cloud adoption and scalable managed services across
                  the ICT landscape.
                </p>
                <span className={styles.brandTag}>Recognized brand</span>
              </article>
              <article className={styles.featureGridCard}>
                <div className={styles.featuredBrandMeta}>
                  <div className={styles.brandLogo}>DN</div>
                  <div>
                    <p className={styles.brandName}>DataNexus</p>
                    <p className={styles.brandCategory}>AI & Analytics</p>
                  </div>
                </div>
                <p className={styles.brandDescription}>
                  Recognized for delivering data intelligence and analytics platforms that transform
                  enterprise decision-making.
                </p>
                <span className={styles.brandTag}>Recognized brand</span>
              </article>
              <article className={styles.featureGridCard}>
                <div className={styles.featuredBrandMeta}>
                  <div className={styles.brandLogo}>VY</div>
                  <div>
                    <p className={styles.brandName}>Vertex Cyber</p>
                    <p className={styles.brandCategory}>Cybersecurity</p>
                  </div>
                </div>
                <p className={styles.brandDescription}>
                  A leader in proactive security services, helping companies protect digital assets
                  and customer trust.
                </p>
                <span className={styles.brandTag}>Recognized brand</span>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
