'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function EventsPage() {
  const customEvents = [
    {
      category: 'Custom Events',
      title: 'Event Management Platform',
      image: '/assets/Shaping-the1.png',
    },
    {
      category: 'Custom Events',
      title: 'Digital Event Experience',
      image: '/assets/Unlocking-Agility.png',
    },
  ];

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
            className="blog-hero-image"
          />
        </div>

        <div className="blog-hero-overlay"></div>

        <div className="blog-hero-content" ref={heroContentRef}>
          <h1>Read Events</h1>

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
          {/* <div className="project-heading">
            <h2 className="project-title">
              Our Work <span>Highlights.</span>
            </h2>
          </div> */}

          <div className="project-top-bar">
            <h6 className="project-subtitle">⬢ Custom Event Platforms</h6>

            <Link href="/events" className="talk-btn">
              <span>More Events</span>

              <div className="talk-btn-icon">
                <ArrowUpRight size={18} />
              </div>
            </Link>
          </div>

          <div className="project-grid">
            {customEvents.map((item, index) => (
              <div key={item.title} className="project-card" ref={index === 0 ? leftRef : rightRef}>
                <div className="project-image-wrap">
                  <Image src={item.image} alt={item.title} fill className="project-image" />
                </div>

                <div className="project-overlay">
                  <span className="project-category">{item.category}</span>

                  <div className="project-content">
                    <h3>{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
