'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fetchWebsiteEvents, WebsiteEvent } from '@/services/events.service';

function getStoredWebsiteId(): string | undefined {
  if (typeof window === 'undefined') return undefined;

  try {
    const raw = window.localStorage.getItem('websiteAuth');
    if (!raw) return undefined;

    const parsed = JSON.parse(raw) as { websiteId?: unknown };
    return typeof parsed.websiteId === 'string' ? parsed.websiteId : undefined;
  } catch {
    return undefined;
  }
}

export default function ProjectsSection() {
  const [events, setEvents] = useState<WebsiteEvent[] | null>(null);

  const customLeftRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.12,
  });

  const customRightRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-right',
    initialTransform: 'translateX(40px)',
    threshold: 0.12,
  });

  useEffect(() => {
    fetchWebsiteEvents(getStoredWebsiteId())
      .then((data) => {
        setEvents(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setEvents([]);
      });
  }, []);

  return (
    <section className="project-section">
      <div className="project-container">
        <div className="project-heading">
          <h2 className="project-title">
            Our Work <span>Highlights.</span>
          </h2>
        </div>

        <div className="project-top-bar">
          <h6 className="project-subtitle">⬢ Custom Events</h6>

          <Link href="/events" className="talk-btn">
            <span>More Events</span>
            <div className="talk-btn-icon">
              <ArrowUpRight size={18} />
            </div>
          </Link>
        </div>

        <div className="project-grid">
          {events === null && <div className="events-loading">Loading events…</div>}

          {events !== null && events.length === 0 && (
            <div className="events-empty">No events available.</div>
          )}

          {events !== null &&
            events.slice(0, 2).map((item, index) => {
              const title = item.title || String(item.name || item.eventName || 'Event');

              const slug =
                typeof item.id === 'string'
                  ? item.id
                  : title
                      .toLowerCase()
                      .replace(/\s+/g, '-')
                      .replace(/[^a-z0-9-]/g, '');

              const imageSrc =
                item.image || item.heroImage || item.banner || '/assets/blogs/blog-1.webp';

              const category = item.category || 'Events';

              return (
                <Link key={slug} href={`/events/${slug}`} className="project-link">
                  <div className="project-card" ref={index === 0 ? customLeftRef : customRightRef}>
                    <div className="project-image-wrap">
                      <Image src={String(imageSrc)} alt={title} fill className="project-image" />
                    </div>

                    <div className="project-overlay">
                      <span className="project-category">{String(category)}</span>

                      <div className="project-content">
                        <h3>{title}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
}
