'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const dialogues = [
  {
    id: 1,
    quote:
      'CIO Dialogues is a unique experience that helped us in connecting with top CIOs and to better understand each other through an intimate conversation.',
    author: 'Sendil Kumar Venkatesan',
    role: 'VP IT | Shriram Value Services',
    avatar: '/assets/dialoges/client-2.webp',
  },
  {
    id: 2,
    quote:
      'It was a great experience being a part of CIO Dialogues. It provides an interesting informal opportunity for knowledge sharing, learning from industry peers.',
    author: 'Sendil Kumar Venkatesan',
    role: 'VP IT | Shriram Value Services',
    avatar: '/assets/dialoges/client-2.webp',
  },
  {
    id: 3,
    quote:
      'CIO Dialogues helped broaden my perspective and connected me with peers facing similar challenges in technology leadership.',
    author: 'Sendil Kumar Venkatesan',
    role: 'VP IT | Shriram Value Services',
    avatar: '/assets/dialoges/client-2.webp',
  },
  {
    id: 4,
    quote:
      'CIO Dialogues is a unique experience that helped us in connecting with top CIOs and to better understand each other through an intimate conversation.',
    author: 'Sendil Kumar Venkatesan',
    role: 'VP IT | Shriram Value Services',
    avatar: '/assets/dialoges/client-2.webp',
  },
  {
    id: 5,
    quote:
      'It was a great experience being a part of CIO Dialogues. It provides an interesting informal opportunity for knowledge sharing, learning from industry peers.',
    author: 'Sendil Kumar Venkatesan',
    role: 'VP IT | Shriram Value Services',
    avatar: '/assets/dialoges/client-2.webp',
  },
  {
    id: 6,
    quote:
      'CIO Dialogues helped broaden my perspective and connected me with peers facing similar challenges in technology leadership.',
    author: 'Sendil Kumar Venkatesan',
    role: 'VP IT | Shriram Value Services',
    avatar: '/assets/dialoges/client-2.webp',
  },
];

export default function OurDialogues() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-28px)',
    threshold: 0.1,
  });
  const carouselWrapRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in',
    initialTransform: 'translateY(24px)',
    threshold: 0.1,
  });

  const scrollByCard = (direction: number) => {
    const el = containerRef.current;

    if (!el) return;

    const firstCard = el.querySelector<HTMLElement>('.dialogue-card');

    const cardWidth = firstCard ? firstCard.clientWidth : Math.floor(el.clientWidth / 3);

    const gap = 28;

    el.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: 'smooth',
    });
  };

  return (
    <section className="dialogues-section">
      <div className="dialogues-container">
        {/* Header */}
        <div className="dialogues-heading" ref={headingRef}>
          <span className="dialogues-badge">
            <span className="dialogues-badge-mark">⬢</span>

            <span className="dialogues-badge-text">CLIENT&apos;S FEEDBACK</span>
          </span>
        </div>

        <h2 className="dialogues-title">
          Our <span>Dialogues</span>
        </h2>

        {/* Controls */}
        <div className="dialogues-controls">
          <button aria-label="Previous" className="dialogues-nav" onClick={() => scrollByCard(-1)}>
            <ChevronLeft />
          </button>

          <button aria-label="Next" className="dialogues-nav" onClick={() => scrollByCard(1)}>
            <ChevronRight />
          </button>
        </div>

        {/* Carousel */}
        <div ref={carouselWrapRef}>
          <div ref={containerRef} className="dialogues-carousel">
            {dialogues.map((dialogue) => (
              <article className="dialogue-card" key={dialogue.id}>
                {/* Quote */}
                <Image
                  src="/assets/dialoges/quote.png"
                  alt="Quote"
                  width={56}
                  height={56}
                  className="dialogue-quote"
                />

                {/* Text */}
                <p className="dialogue-text">{dialogue.quote}</p>

                {/* Divider */}
                <div className="dialogue-divider" />

                {/* Footer */}
                <div className="dialogue-footer">
                  <Image
                    src={dialogue.avatar}
                    alt={dialogue.author}
                    width={58}
                    height={58}
                    className="dialogue-avatar"
                  />

                  <div>
                    <h4 className="dialogue-author">{dialogue.author}</h4>

                    <p className="dialogue-role">{dialogue.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Dots */}
        {/* <div className="dialogues-dots">
          {dialogues.map((_, index) => (
            <span
              key={index}
              className={`dialogue-dot ${
                index === 0 ? 'active' : ''
              }`}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
}
