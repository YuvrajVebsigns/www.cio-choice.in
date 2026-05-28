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

          {/* <h2 className="dialogues-title">
            All <span>Dialogues</span>
          </h2> */}

          <div className="dialogues-list">
            {repeatedDialogues.map((d, index) => {
              const variant =
                index % 3 === 0
                  ? 'animate-fade-in-left'
                  : index % 3 === 1
                    ? 'animate-fade-in'
                    : 'animate-fade-in-right';

              return (
                <AnimatedDialogueCard
                  key={`${d.id}-${index}`}
                  dialogue={d}
                  index={index}
                  variant={variant}
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
  dialogue: Dialogue;
  index: number;
  variant?: string;
};

function AnimatedDialogueCard({
  dialogue,
  index,
  variant = 'animate-fade-in',
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

  const d = dialogue;

  return (
    <article ref={ref} className="dialogue-card" style={{ transitionDelay: `${index * 60}ms` }}>
      <Image
        src="/assets/dialoges/quote.png"
        alt="Quote"
        width={56}
        height={56}
        className="dialogue-quote"
      />

      <p className="dialogue-text">{d.quote}</p>

      <div className="dialogue-divider" />

      <div className="dialogue-footer">
        <Image src={d.avatar} alt={d.author} width={65} height={65} className="dialogue-avatar" />

        <div>
          <h4 className="dialogue-author">{d.author}</h4>
          <p className="dialogue-role">{d.role}</p>
        </div>
      </div>
    </article>
  );
}
