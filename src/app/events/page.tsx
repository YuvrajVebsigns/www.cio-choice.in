'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useEffect, useState } from 'react';
import { fetchWebsiteEvents, WebsiteEvent } from '@/services/events.service';

function getSafeImageSrc(item: WebsiteEvent): string {
  const image =
    typeof item.image === 'string' && item.image.trim()
      ? item.image
      : typeof item.heroImage === 'string' && item.heroImage.trim()
        ? item.heroImage
        : typeof item.banner === 'string' && item.banner.trim()
          ? item.banner
          : '';

  return image || '/assets/blogs/blog-1.webp';
}

export default function EventsPage() {
  const [events, setEvents] = useState<WebsiteEvent[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadEvents() {
      setIsLoading(true);

      const data = await fetchWebsiteEvents();

      if (isMounted) {
        setEvents(Array.isArray(data) ? data : []);
        setIsLoading(false);
      }
    }

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  const heroMediaRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-right',
    initialTransform: 'translateX(40px)',
    threshold: 0.12,
    once: false,
  });

  const heroContentRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.12,
    once: false,
  });

  const leftRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.12,
    once: false,
  });

  const rightRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-right',
    initialTransform: 'translateX(40px)',
    threshold: 0.12,
    once: false,
  });

  return (
    <>
      <section className="blog-hero">
        <div className="blog-hero-media" ref={heroMediaRef}>
          <Image
            src="/assets/blogs/blog-1.webp"
            alt="Events"
            fill
            priority
            sizes="100vw"
            className="blog-hero-image"
          />
        </div>

        <div className="blog-hero-overlay" />

        <div className="blog-hero-content" ref={heroContentRef}>
          <h1>Event Calendar</h1>

          <div className="blog-breadcrumb">
            <Link href="/" className="blog-breadcrumb-home">
              🏦 Home
            </Link>

            <span>&gt;</span>

            <p>Events</p>
          </div>
        </div>
      </section>

      <section className="project-section">
        <div className="project-container">
          {isLoading ? (
            <div className="events-loading" style={{ padding: '60px 20px', textAlign: 'center' }}>
              Loading events…
            </div>
          ) : events && events.length > 0 ? (
            <div className="project-grid">
              {events.map((item: WebsiteEvent, index: number) => {
                const title = String(item.title ?? item.name ?? item.eventName ?? 'Event');
                const slug =
                  item.id && typeof item.id === 'string'
                    ? item.id
                    : title
                        .toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/[^a-z0-9-]/g, '');

                const imageSrc = getSafeImageSrc(item);
                const category =
                  typeof item.category === 'string' && item.category.trim()
                    ? item.category
                    : 'Events';

                const ref = index % 2 === 0 ? leftRef : rightRef;

                return (
                  <Link key={slug} href={`/events/${slug}`}>
                    <div className="project-card" ref={ref}>
                      <div className="project-image-wrap">
                        <Image
                          src={imageSrc}
                          alt={title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="project-image"
                          unoptimized
                        />
                      </div>

                      <div className="project-overlay">
                        <span className="project-category">{category}</span>

                        <div className="project-content">
                          <h3>{title}</h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="events-empty" style={{ padding: '60px 20px', textAlign: 'center' }}>
              No events available at the moment.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
