import { notFound } from 'next/navigation';
// import Link from 'next/link';
import styles from './page.module.css';

type RecognizedBrandsPageProps = {
  params: {
    year?: string[];
  };
};

const featuredBrands = [
  {
    logo: 'CC',
    name: 'CIO Cloud Connect',
    category: 'Cloud Infrastructure',
    description:
      'Trusted for secure enterprise cloud adoption and scalable managed services across the ICT landscape.',
  },
  {
    logo: 'DN',
    name: 'DataNexus',
    category: 'AI & Analytics',
    description:
      'Recognized for delivering data intelligence and analytics platforms that transform enterprise decision-making.',
  },
  {
    logo: 'VY',
    name: 'Vertex Cyber',
    category: 'Cybersecurity',
    description:
      'A leader in proactive security services, helping companies protect digital assets and customer trust.',
  },
  {
    logo: 'ION',
    name: 'Ionix Solutions',
    category: 'Digital Transformation',
    description:
      'Innovating seamless customer experiences with end-to-end digital strategy and delivery.',
  },
  {
    logo: 'NXT',
    name: 'NextGen Networks',
    category: 'Networking',
    description:
      'Delivering reliable connectivity and enterprise-grade networking infrastructure across industries.',
  },
  {
    logo: 'AV',
    name: 'Avela Systems',
    category: 'Enterprise Software',
    description:
      'Building modern enterprise platforms that power collaboration, operations, and customer engagement.',
  },
];

function isRecognizedBrands2026Slug(yearParam?: string[] | string) {
  const rawYear = Array.isArray(yearParam) ? (yearParam[0] ?? '') : (yearParam ?? '');
  return rawYear === '2026';
}

export const metadata = {
  title: 'Recognized Brands 2026',
  description:
    'Discover CIO Choice recognized brands for 2026, featuring top technology companies and innovation leaders.',
};

export default function RecognizedBrandsPage({ params }: RecognizedBrandsPageProps) {
  if (!isRecognizedBrands2026Slug(params.year)) {
    notFound();
  }

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
              {featuredBrands.map((brand) => (
                <article key={brand.name} className={styles.featureGridCard}>
                  <div className={styles.featuredBrandMeta}>
                    <div className={styles.brandLogo}>{brand.logo}</div>
                    <div>
                      <p className={styles.brandName}>{brand.name}</p>
                      <p className={styles.brandCategory}>{brand.category}</p>
                    </div>
                  </div>
                  <p className={styles.brandDescription}>{brand.description}</p>
                  <span className={styles.brandTag}>Recognized brand</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
