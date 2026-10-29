'use client';

import Image from 'next/image';
// import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchWebsitePageBySlug, type WebsitePage } from '@/services/pages.services';

type RedCarpetNightProps = {
  slug: string;
};

type Testimonial = {
  author?: string;
  role?: string;
  quote?: string;
  avatar?: string;
};

type ContentBlock = {
  data?: {
    testimonials?: unknown[];
  };
};

type EventImageProps = {
  src?: string;
  alt: string;
};

const FALLBACK_EVENT_IMAGE = '/assets/team/1.jpg';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function EventImage({ src, alt }: EventImageProps) {
  const [imageSrc, setImageSrc] = useState(src?.trim() || FALLBACK_EVENT_IMAGE);

  useEffect(() => {
    setImageSrc(src?.trim() || FALLBACK_EVENT_IMAGE);
  }, [src]);

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      className="rcn-event-image"
      unoptimized
      onError={() => {
        if (imageSrc !== FALLBACK_EVENT_IMAGE) {
          setImageSrc(FALLBACK_EVENT_IMAGE);
        }
      }}
    />
  );
}

function extractTestimonials(page: WebsitePage | null): Testimonial[] {
  const blocks = page?.content?.blocks as ContentBlock[] | undefined;

  if (!Array.isArray(blocks)) return [];

  return blocks.flatMap((block) => {
    const testimonials = block?.data?.testimonials;

    if (!Array.isArray(testimonials)) return [];

    return testimonials.flatMap((testimonial) => {
      if (!isRecord(testimonial)) return [];

      return [
        {
          author: getString(testimonial.author),
          role: getString(testimonial.role),
          quote: getString(testimonial.quote),
          avatar: getString(testimonial.avatar),
        },
      ];
    });
  });
}

export default function RedCarpetNight({ slug }: RedCarpetNightProps) {
  const year = slug.slice(-4);
  const useFallbackImages = Number(year) >= 2024;
  const [page, setPage] = useState<WebsitePage | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadPage() {
      setIsLoading(true);

      try {
        setErrorMessage('');
        const data = await fetchWebsitePageBySlug(slug);
        if (!isMounted) return;

        setPage(data);
        setTestimonials(extractTestimonials(data));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Failed to load Red Carpet Night page for ${year}.`, error);
        if (isMounted) {
          setPage(null);
          setTestimonials([]);
          setErrorMessage('Unable to load event details. Please try again later.');
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void loadPage();

    return () => {
      isMounted = false;
    };
  }, [slug, year]);

  if (isLoading) {
    return <div className="rcn-loading">Loading...</div>;
  }

  return (
    <main className="rcn-main">
      <section className="rcn-hero">
        <div className="rcn-hero-overlay" />

        <div className="rcn-hero-content">
          <span className="rcn-hero-badge">Red Carpet Night</span>

          <h1 className="rcn-title">{page?.title || `Red Carpet Night ${year}`}</h1>

          <p className="rcn-subtitle">
            A premium CIO Choice gala that honors the top ICT brands and leaders in the industry for
            {` ${year}.`}
          </p>

          {/* <div className="rcn-cta-row">
            <Link href="/contact" className="rcn-cta-button">
              Book Your Spotlight
            </Link>

            <span className="rcn-cta-note">
              Explore the event detail page for year-specific recognition and participation updates.
            </span>
          </div> */}
        </div>
      </section>

      <section className="rcn-event-section">
        <div className="rcn-event-container">
          {errorMessage ? (
            <p className="rcn-empty rcn-error">{errorMessage}</p>
          ) : testimonials.length === 0 ? (
            <p className="rcn-empty">No API data available.</p>
          ) : (
            <div className="rcn-event-grid">
              {testimonials.map((item, index) => (
                <article key={`${item.author || 'event'}-${index}`} className="rcn-event-card">
                  {useFallbackImages || item.avatar ? (
                    <div className="rcn-event-image-wrap">
                      <EventImage src={item.avatar} alt={item.author || 'Event image'} />
                    </div>
                  ) : null}

                  <div className="rcn-event-content">
                    {item.quote ? <blockquote>{item.quote}</blockquote> : null}
                    {item.author ? <h3>{item.author}</h3> : null}
                    {item.role ? <p>{item.role}</p> : null}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
