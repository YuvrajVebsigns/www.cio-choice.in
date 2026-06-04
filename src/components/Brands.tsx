'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function Brands() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const [activePage, setActivePage] = useState(0);
  const cardsPerPage = 3;

  const headerRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-30px)',
    threshold: 0.1,
  });

  const sliderWrapRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in',
    initialTransform: 'translateY(24px)',
    threshold: 0.1,
  });

  const testimonials = [
    {
      heading: 'CIO Choice',
      text: "India's largest online pan-India voting platform, where CIOs vote for their preferred and trusted ICT brands. The voting determines which ICT brands are presented with CIO Choice recognition at the annual Red Carpet Night.",
      name: 'CIO Choice',
      role: 'CIO Choice',
      image: '/assets/brands/CIO-Choice.png',
    },
    {
      heading: 'CIO Powerlist',
      text: "India's only algorithm-based selection and annual shortlist of India's most influential technology leaders. Complementing this distinguished recognition, CIO Choice stands as India's largest pan-India online voting platform.",
      name: 'CIO Powerlist',
      role: 'VP IT | Shriram Value Services',
      image: '/assets/brands/CIO-Powerlist.png',
    },
    {
      heading: 'CFO Powerlist',
      text: 'CFO Power List is a distinguished initiative and forum that recognizes influential CFO leaders committed to addressing major opportunities in the digital world as an integral part of their core business strategies.',
      name: 'CIO Powerlist',
      role: 'VP IT | Shriram Value Services',
      image: '/assets/brands/CFO.png',
    },
    {
      heading: 'CIO Crown',
      text: 'Meticulously curated gathering of CIOs and CTOs looking to explore and collaborate through highly interactive formats designed to provide a deeper understanding of new emerging technologies and leadership issues.',
      name: 'CIO Crown',
      role: 'VP IT | Shriram Value Services',
      image: '/assets/brands/CIO-Crown.png',
    },
    {
      heading: 'IT Genius Award',
      text: 'The awards recognize ICT leaders who have implemented transformational, critical, and disruptive projects with revolutionary impact. Day-to-day IT implementation projects are excluded from consideration.',
      name: 'IT Genius Award',
      role: 'CTO | Tech Solutions',
      image: '/assets/brands/Genius.png',
    },
    {
      heading: 'Hospitality & Healthcare Honours',
      text: 'The honours recognize outstanding ICT leaders from the hospitality and healthcare industries who have played a pivotal role in driving organizations toward innovation through strategic technology leadership.',
      name: 'Hospitality & Healthcare Honours',
      role: 'H H H',
      image: '/assets/brands/HHH.png',
    },
    {
      heading: 'CIO Dialogues',
      text: 'Informal, highly interactive sessions limited to a select few CIOs to engage in candid conversations and build connections in a relaxed setting crafted to deliver a unique experience.',
      name: 'CIO Dialogues',
      role: 'CTO | Tech Solutions',
      image: '/assets/brands/CIO-Dialogues.png',
    },
    {
      heading: 'Leadernext',
      text: 'The honours recognize outstanding ICT leaders from the hospitality and healthcare industries who have played a pivotal role in driving their organizations toward innovation through strategic technology leadership.',
      name: 'Leadernext',
      role: 'CTO | Tech Solutions',
      image: '/assets/brands/Leadernext.png',
    },
  ];

  const scrollLeft = () => {
    scrollToPage(activePage - 1);
  };

  const scrollRight = () => {
    scrollToPage(activePage + 1);
  };

  const getPageCount = useCallback(
    () => Math.ceil(testimonials.length / cardsPerPage),
    [testimonials.length],
  );

  const scrollToPage = useCallback(
    (pageIndex: number) => {
      const el = sliderRef.current;
      if (!el) return;

      const maxPage = getPageCount() - 1;
      const nextPage = Math.max(0, Math.min(pageIndex, maxPage));
      const targetIndex = nextPage * cardsPerPage;
      const child = el.children[targetIndex] as HTMLElement;

      if (!child) return;

      el.scrollTo({ left: child.offsetLeft, behavior: 'smooth' });
      setActivePage(nextPage);
    },
    [getPageCount],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPausedRef.current) return;
      if (!sliderRef.current) return;

      const maxPage = getPageCount() - 1;

      if (activePage >= maxPage) {
        scrollToPage(0);
      } else {
        scrollToPage(activePage + 1);
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [activePage, getPageCount, scrollToPage]);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const onScroll = () => {
      const children = Array.from(el.children) as HTMLElement[];
      if (!children.length) return;

      const scrollLeftPos = el.scrollLeft;
      let nearestPage = 0;
      let nearestDist = Infinity;

      for (let page = 0; page < getPageCount(); page += 1) {
        const targetIndex = page * cardsPerPage;
        const child = children[targetIndex];
        if (!child) continue;

        const dist = Math.abs(child.offsetLeft - scrollLeftPos);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestPage = page;
        }
      }

      setActivePage(nearestPage);
    };

    el.addEventListener('scroll', onScroll);
    onScroll();

    return () => el.removeEventListener('scroll', onScroll);
  }, [getPageCount]);

  const scrollToIndex = (idx: number) => {
    const el = sliderRef.current;
    if (!el) return;

    const child = el.children[idx * cardsPerPage] as HTMLElement;
    if (!child) return;

    el.scrollTo({ left: child.offsetLeft, behavior: 'smooth' });
    setActivePage(idx);
  };

  return (
    <section className="dialogue-section">
      <div className="dialogue-container">
        <div className="dialogue-header" ref={headerRef}>
          <div>
            <span className="dialogue-subtitle">
              <span className="dialogue-subtitle-mark">⬢</span>
              <span className="dialogue-subtitle-text">CLIENTS FEEDBACK</span>
            </span>

            <h2 className="dialogue-title">
              Our <span>Brands</span>
            </h2>
          </div>

          <div className="dialogue-arrows">
            <button className="dialogue-arrow-btn" onClick={scrollLeft}>
              <ChevronLeft size={22} />
            </button>

            <button className="dialogue-arrow-btn" onClick={scrollRight}>
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        <div ref={sliderWrapRef}>
          <div
            className="dialogue-slider"
            ref={sliderRef}
            onMouseEnter={() => (isPausedRef.current = true)}
            onMouseLeave={() => (isPausedRef.current = false)}
          >
            {testimonials.map((item, index) => (
              <div className="dialogue-card" key={index}>
                <p className="dialogue-text">{item.text}</p>

                <div className="dialogue-divider" />

                <div className="dialogue-user">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={70}
                    height={70}
                    className="dialogue-user-image"
                  />

                  <div>
                    <h4>{item.name}</h4>
                    <span>{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="dialogue-dots">
            {Array.from({ length: getPageCount() }).map((_, idx) => (
              <button
                key={idx}
                className={idx === activePage ? 'dialogue-dot active' : 'dialogue-dot'}
                onClick={() => scrollToIndex(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
