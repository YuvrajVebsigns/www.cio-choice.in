'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchWebsitePageBySlug, type WebsitePage } from '@/services/pages.services';

type BrandItem = {
  author: string;
  role: string;
  quote?: string;
  avatar?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function extractItems(page: WebsitePage | null): BrandItem[] {
  if (!page) return [];

  const items: BrandItem[] = [];
  const seen = new Set<string>();

  function search(value: unknown) {
    if (Array.isArray(value)) {
      value.forEach(search);
      return;
    }

    if (!isRecord(value)) return;

    const author = typeof value.author === 'string' ? value.author.trim() : '';
    const role = typeof value.role === 'string' ? value.role.trim() : '';
    const quote = typeof value.quote === 'string' ? value.quote : '';
    const avatar = typeof value.avatar === 'string' ? value.avatar : '';

    if (author) {
      const key = `${author.toLowerCase()}-${role.toLowerCase()}`;

      if (!seen.has(key)) {
        seen.add(key);
        items.push({ author, role, quote, avatar });
      }
    }

    Object.values(value).forEach(search);
  }

  search(page);
  return items;
}

export default function RecognizedBrands2019Page() {
  const [page, setPage] = useState<WebsitePage | null>(null);
  const [items, setItems] = useState<BrandItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPage() {
      setIsLoading(true);

      const data = await fetchWebsitePageBySlug('recognized-brands-2019');

      setPage(data);
      setItems(extractItems(data));
      setIsLoading(false);
    }

    loadPage();
  }, []);

  if (isLoading) {
    return <div className="rcn-loading">Loading...</div>;
  }

  return (
    <main className="rcn-main">
      <section className="rcn-hero rcn-hero-2019">
        <div className="rcn-hero-overlay" />

        <div className="rcn-hero-content">
          <span className="rcn-hero-badge">Red Carpet Night 2019</span>

          <h1 className="rcn-title">{page?.title || 'Recognized Brands 2019'}</h1>

          <p className="rcn-subtitle">
            Celebrating the most trusted ICT brands, technology leaders, and innovators recognized
            by CIO Choice in 2019.
          </p>

          <div className="rcn-cta-row">
            <Link href="/contact" className="rcn-cta-button">
              Book Your Spotlight
            </Link>

            <Link href="/events" className="rcn-secondary-button">
              Explore Events
            </Link>
          </div>
        </div>
      </section>

      <section className="advisory-panel-section">
        <div className="advisory-container">
          {items.length === 0 ? (
            <p className="rcn-empty">No recognized brands available.</p>
          ) : (
            <div className="advisory-grid">
              {items.map((item, index) => (
                <article key={`${item.author}-${index}`} className="advisory-card rcn-brand-card">
                  {item.avatar ? (
                    <Image
                      src={item.avatar}
                      alt={item.author}
                      width={128}
                      height={128}
                      className="advisory-avatar"
                      unoptimized
                    />
                  ) : (
                    <div className="advisory-avatar advisory-avatar-placeholder" />
                  )}

                  <h3>{item.author}</h3>
                  <p>{item.role}</p>

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
