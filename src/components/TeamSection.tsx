'use client';

import Image from 'next/image';
import { FaLinkedinIn } from 'react-icons/fa';
import { useEffect, useRef } from 'react';

export default function TeamSection() {
  const teamMembers = [
    {
      name: 'Anoop Mathur',
      role: 'Founder',
      image: '/assets/team/Anoop-Mathur.png',
      linkedin: 'https://www.linkedin.com/in/mathuranoop',
    },
    {
      name: 'Sudhir Kamath',
      role: 'Country Director',
      image: '/assets/team/Sudhir-Kamath.png',
      linkedin: 'https://www.linkedin.com/in/sudhir-kamath-9a6baa4',
    },
    {
      name: 'Sadanand Manda',
      role: 'Head Sales & Event Operations',
      image: '/assets/team/Sadanand-Manda.png',
      linkedin: 'https://www.linkedin.com/in/sadanandmanda',
    },
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const cards = Array.from(container.querySelectorAll<HTMLDivElement>('.team-card'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLDivElement;

          if (entry.isIntersecting) {
            el.classList.add('in-view');
          }
        });
      },
      { threshold: 0.15 },
    );

    cards.forEach((card, i) => {
      card.style.setProperty('--delay', `${i * 120}ms`);
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="team-section">
      <div className="team-container">
        <div className="team-layout">
          <div className="team-heading-box">
            <span className="team-subtitle">MEET OUR TEAM</span>

            <h2 className="team-title">
              Meet the
              <br />
              Mind Behind
              <br />
              Our Success.
            </h2>
          </div>

          {/* RIGHT GRID */}

          <div className="team-grid" ref={containerRef}>
            {teamMembers.map((member, index) => (
              <div className="team-card" key={index}>
                <div className="team-image-wrap">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={260}
                    height={260}
                    className="team-image"
                  />

                  {/* HOVER */}

                  <div className="team-overlay">
                    <a
                      href={member.linkedin}
                      className="team-linkedin"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedinIn size={22} />
                    </a>
                  </div>
                </div>

                <div className="team-content">
                  <h3>{member.name}</h3>

                  <p>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
