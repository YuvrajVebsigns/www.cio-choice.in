'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const dialogues = [
  {
    id: 1,
    slug: 'arpanarghya-saha-nimf-digital-first',
    quote:
      'Arpanarghya Saha, Chief Digital Officer at Nippon India Mutual Fund (NIMF), is an industry veteran with 24 years of experience spanning e-commerce, BFSI, and retail. At NIMF, Arpan sparked a digital-first mindset through iterative delivery.',
    author: 'Sendil Kumar Venkatesan',
    role: 'Chief Digital Officer at Nippon India Mutual Fund (NIMF)',
    avatar: '/assets/dialoges/ArpanarghyaSaha.png',
  },
  {
    id: 2,
    slug: 'future-of-aviation-tech-and-sustainability',
    quote:
      'Foresees an exciting future for the aviation sector driven by high-tech, omnipresent customer experiences, contactless technologies, and sustainable operating models reshaping the future of flying.',
    author: 'Vinod Bhat',
    role: 'CIO of Vistara Airlines',
    avatar: '/assets/dialoges/VinodBhat.png',
  },
  {
    id: 3,
    slug: 'cios-driving-digital-business-innovation',
    quote:
      'CIO Dialogues helped broaden my perspective and connected me with peers facing similar challenges in technology leadership.',
    author: 'Ashok Nayak',
    role: 'CIO of Ipca Laboratories',
    avatar: '/assets/dialoges/AshokNayak.png',
  },
  {
    id: 4,
    slug: 'cybersecurity-strategy-for-banking-and-finance',
    quote:
      'Cybersecurity is an essential component of any organization’s business strategy, and an efficient security strategy can help reduce risk in the banking and finance sector.',
    author: 'Ninad Varadkar',
    role: 'Group CISO, Edelweiss Financial Services Ltd ',
    avatar: '/assets/dialoges/NinadVaradkar.png',
  },
  {
    id: 5,
    slug: 'cios-as-strategic-business-partners',
    quote:
      'A global turnaround leader and entrepreneur discussing how CIOs must evolve into strategic business partners in the digital age.',
    author: 'Nitin Seth',
    role: 'CEO, Incedo',
    avatar: '/assets/dialoges/NitinSeth.png',
  },
  {
    id: 6,
    slug: 'building-a-technology-roadmap-for-success',
    quote:
      'Shares insights about key priorities while building the company’s technology roadmap for success.',
    author: 'Kunal Mehta',
    role: ' Global CTO, Fabindia',
    avatar: '/assets/dialoges/KunalMehta.png',
  },
  {
    id: 7,
    slug: 'accelerating-digital-transformation-for-cxos',
    quote:
      'Explains how enterprises can accelerate digital transformation efforts and how CXOs can thrive as digital leaders.',
    author: 'Rahul Ghodke',
    role: 'Editorial Team',
    avatar: '/assets/dialoges/RahulGhodke.png',
  },
  {
    id: 8,
    slug: 'data-driven-business-and-evolving-cios',
    quote:
      'Discusses how data has become one of the essential pillars of business operations and the evolving role of CIOs in a data-driven era.',
    author: ' Kiran Komatla',
    role: 'Group CTO, Restaurant Brands Asia',
    avatar: '/assets/dialoges/KiranKomatla.png',
  },
  {
    id: 9,
    slug: 'leadership-transitions-driving-enterprise-transformation',
    quote:
      'Highlights leadership transitions and executive movements shaping digital and operational transformation in enterprises..',
    author: 'Rishi Sareen',
    role: 'Chief Operating Officer, DTDC Express',
    avatar: '/assets/dialoges/RishiSareen.png',
  },
  {
    id: 10,
    slug: 'leadership-transformation-and-business-growth',
    quote:
      'Focuses on leadership transformation and  strategic business growth driven by experienced industry leaders.',
    author: 'Raghunath Bal',
    role: 'Global Head, Cumii Fine Sciences (CFS)',
    avatar: '/assets/dialoges/RaghunathBal.png',
  },
  {
    id: 11,
    slug: 'cybersecurity-and-secure-digital-transformation',
    quote:
      'shares insights on cybersecurity, IT leadership, and building secure digital transformation strategies in the financial sector.',
    author: 'Devinder Singh',
    role: 'Sr. VP IT & CISO, Religare Broking',
    avatar: '/assets/dialoges/DevinderSingh.png',
  },
];

export default function OurDialogues() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

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
        <div className="dialogues-heading" ref={headingRef}>
          <span className="dialogues-badge">
            <span className="dialogues-badge-mark">⬢</span>
            <span className="dialogues-badge-text">SUCCESS STORIES</span>
          </span>
        </div>

        <div className="dialogues-top-bar">
          <h2 className="dialogues-title">
            Our <span>Dialogues</span>
          </h2>
        </div>

        <div className="dialogues-controls">
          <button aria-label="Previous" className="dialogues-nav" onClick={() => scrollByCard(-1)}>
            <ChevronLeft />
          </button>

          <button aria-label="Next" className="dialogues-nav" onClick={() => scrollByCard(1)}>
            <ChevronRight />
          </button>
        </div>

        <div ref={carouselWrapRef}>
          <div ref={containerRef} className="dialogues-carousel">
            {dialogues.map((dialogue) => {
              const isExpanded = expandedCard === dialogue.id;

              return (
                <article className="dialogue-card" key={dialogue.id}>
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
                      onClick={() => setExpandedCard(isExpanded ? null : dialogue.id)}
                    >
                      {isExpanded ? 'Read Less' : 'Read More'}
                    </button>
                  </div>

                  <div className="dialogue-divider" />

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
              );
            })}
          </div>
        </div>

        <div className="blogs-more">
          <Link href="/dialoges" className="blogs-more-btn">
            <span>More Dialogues</span>

            <span className="blogs-more-icon">
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
