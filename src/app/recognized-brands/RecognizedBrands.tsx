'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchWebsitePageBySlug, type WebsitePage } from '@/services/pages.services';

type RecognizedBrandsProps = {
  year: string;
};

type BrandItem = {
  author: string;
  role: string;
  quote: string;
  avatar: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function getImageUrl(value: unknown): string {
  if (typeof value === 'string') return value.trim();
  if (!isRecord(value)) return '';

  const variants = isRecord(value.urlVariants) ? value.urlVariants : null;

  return (
    getString(value.url) ||
    getString(value.src) ||
    getString(value.original) ||
    getString(value.large) ||
    getString(value.medium) ||
    getString(value.small) ||
    getString(value.thumbnail) ||
    getString(variants?.large) ||
    getString(variants?.medium) ||
    getString(variants?.thumbnail)
  );
}

function extractItems(page: WebsitePage | null): BrandItem[] {
  if (!page) return [];

  const items: BrandItem[] = [];
  const seen = new Set<string>();
  const pageTitle = getString(page.title).toLowerCase();

  function addItem(value: Record<string, unknown>) {
    const author =
      getString(value.author) ||
      getString(value.brandName) ||
      getString(value.name) ||
      getString(value.fullName);
    if (!author) return;

    const role =
      getString(value.role) ||
      getString(value.designation) ||
      getString(value.position) ||
      getString(value.company) ||
      getString(value.subtitle);
    const quote =
      getString(value.quote) ||
      getString(value.description) ||
      getString(value.message) ||
      getString(value.content);
    const avatar =
      getImageUrl(value.avatar) ||
      getImageUrl(value.image) ||
      getImageUrl(value.photo) ||
      getImageUrl(value.logo) ||
      getImageUrl(value.brandLogo) ||
      getImageUrl(value.profileImage);
    const normalizedAuthor = author.toLowerCase();

    if (normalizedAuthor === pageTitle || /^recognized brands \d{4}$/.test(normalizedAuthor)) {
      return;
    }

    const key = `${normalizedAuthor}-${role.toLowerCase()}`;
    if (seen.has(key)) return;

    seen.add(key);
    items.push({ author, role, quote, avatar });
  }

  function search(value: unknown) {
    if (Array.isArray(value)) {
      value.forEach(search);
      return;
    }

    if (!isRecord(value)) return;

    addItem(value);
    Object.values(value).forEach(search);
  }

  search(page);

  return items;
}

export default function RecognizedBrands({ year }: RecognizedBrandsProps) {
  const [page, setPage] = useState<WebsitePage | null>(null);
  const [items, setItems] = useState<BrandItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const usesHistoricalHero = Number(year) <= 2019 || year === '2023';

  useEffect(() => {
    let isMounted = true;

    async function loadPage() {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const data = await fetchWebsitePageBySlug(`recognized-brands-${year}`);
        if (!isMounted) return;

        setPage(data);
        setItems(extractItems(data));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Failed to load recognized brands for ${year}.`, error);
        if (isMounted) {
          setPage(null);
          setItems([]);
          setErrorMessage('Unable to load recognized brands. Please try again later.');
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void loadPage();

    return () => {
      isMounted = false;
    };
  }, [year]);

  if (isLoading) {
    return <div className="rcn-loading">Loading...</div>;
  }

  return (
    <main className="rcn-main">
      <section className={`rcn-hero rcn-hero-${year}`}>
        <div className="rcn-hero-overlay" />

        <div className="rcn-hero-content">
          <span className="rcn-hero-badge">
            Red Carpet Night{usesHistoricalHero ? ` ${year}` : ''}
          </span>

          <h1 className="rcn-title">{page?.title || `Recognized Brands ${year}`}</h1>

          <p className="rcn-subtitle">
            {usesHistoricalHero
              ? `Celebrating the most trusted ICT brands, technology leaders, and innovators recognized by CIO Choice in ${year}.`
              : `A premium CIO Choice gala that honors the top ICT brands and leaders in the industry for ${year}.`}
          </p>

          <div className="rcn-cta-row">
            <Link href="/contact" className="rcn-cta-button">
              Book Your Spotlight
            </Link>

            {usesHistoricalHero ? (
              <Link href="/events" className="rcn-secondary-button">
                Explore Events
              </Link>
            ) : (
              <span className="rcn-cta-note">
                Explore the event detail page for year-specific recognition and participation
                updates.
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="advisory-panel-section">
        <div className="advisory-container">
          {errorMessage ? (
            <p className="rcn-empty rcn-error">{errorMessage}</p>
          ) : items.length === 0 ? (
            <p className="rcn-empty">No recognized brands available.</p>
          ) : (
            <div className="advisory-grid">
              {items.map((item, index) => (
                <article
                  key={`${item.author}-${item.role}-${index}`}
                  className="advisory-card rcn-brand-card"
                >
                  <h3>{item.author}</h3>
                  {item.avatar ? (
                    <Image
                      src={item.avatar}
                      alt={item.author}
                      width={128}
                      height={128}
                      className="rcn-brand-image"
                      unoptimized
                    />
                  ) : (
                    <div className="rcn-brand-image advisory-avatar-placeholder" />
                  )}
                  {item.role ? <p>{item.role}</p> : null}
                  {item.quote ? <blockquote>{item.quote}</blockquote> : null}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
