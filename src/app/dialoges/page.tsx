'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Dialogue {
  id: number;
  slug: string;
  title: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  date: string;
}

export default function DialoguesPage() {
  const [dialogues, setDialogues] = useState<Dialogue[]>([]);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

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

  const featuredDialogues = dialogues.slice(0, 3);
  const repeatedDialogues = Array.from({ length: 3 }, () => featuredDialogues).flat();

  useEffect(() => {
    fetch('/api/dialoges')
      .then((res) => res.json())
      .then((data) => setDialogues(data))
      .catch(() => setDialogues([]));
  }, []);

  return (
    <>
      <section className="blog-hero dialogues-hero">
        <div className="blog-hero-media" ref={heroMediaRef}>
          <Image
            src="/assets/blogs/blog-1.webp"
            alt="Read Dialogues"
            fill
            className="blog-hero-image"
          />
        </div>

        <div className="blog-hero-overlay" />

        <div className="blog-hero-content" ref={heroContentRef}>
          <h1>Read Dialogues</h1>

          <div className="blog-breadcrumb">
            <Link href="/" className="blog-breadcrumb-home">
              🏦 Home
            </Link>

            <span>&gt;</span>

            <p>Dialogues</p>
          </div>
        </div>
      </section>

      <section className="dialogues-section">
        <div className="dialogues-container">
          <br />
          <br />

          <div className="dialogues-list">
            {repeatedDialogues.map((d, index) => {
              const variant =
                index % 3 === 0
                  ? 'animate-fade-in-left'
                  : index % 3 === 1
                    ? 'animate-fade-in'
                    : 'animate-fade-in-right';

              const cardKey = `${d.id}-${index}`;

              return (
                <AnimatedDialogueCard
                  key={cardKey}
                  cardKey={cardKey}
                  dialogue={d}
                  index={index}
                  variant={variant}
                  expandedCard={expandedCard}
                  setExpandedCard={setExpandedCard}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

type AnimatedDialogueCardProps = {
  cardKey: string;
  dialogue: Dialogue;
  index: number;
  variant?: string;
  expandedCard: string | null;
  setExpandedCard: React.Dispatch<React.SetStateAction<string | null>>;
};

function AnimatedDialogueCard({
  cardKey,
  dialogue,
  index,
  variant = 'animate-fade-in',
  expandedCard,
  setExpandedCard,
}: AnimatedDialogueCardProps) {
  const initialTransform = variant.includes('left')
    ? 'translateX(-40px)'
    : variant.includes('right')
      ? 'translateX(40px)'
      : 'translateY(40px)';

  const ref = useScrollAnimation<HTMLDivElement>({
    animationClass: variant,
    initialTransform,
    threshold: 0.12,
    once: false,
  });

  const isExpanded = expandedCard === cardKey;

  return (
    <article ref={ref} className="dialogue-card" style={{ transitionDelay: `${index * 60}ms` }}>
      <Image
        src="/assets/dialoges/quote.png"
        alt="Quote"
        width={56}
        height={56}
        className="dialogue-quote"
      />

      <div className="dialogue-text">
        <p className={`dialogue-description ${isExpanded ? 'expanded' : 'collapsed'}`}>
          {dialogue.quote}
        </p>

        <button
          type="button"
          className="dialogue-read-more"
          onClick={() => setExpandedCard(isExpanded ? null : cardKey)}
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      </div>

      <div className="dialogue-divider" />

      <div className="dialogue-footer">
        <Image
          src={dialogue.avatar}
          alt={dialogue.author}
          width={65}
          height={65}
          className="dialogue-avatar"
        />

        <div>
          <h4 className="dialogue-author">{dialogue.author}</h4>
          <p className="dialogue-role">{dialogue.role}</p>
        </div>
      </div>
    </article>
  );
}
