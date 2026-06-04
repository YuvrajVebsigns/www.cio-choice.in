'use client';

import Link from 'next/link';

export default function SocialMediaPage() {
  // heroContentRef removed (not used)

  return (
    <>
      {/* <section className="social-media-hero">
        <div className="social-media-hero-overlay"></div>

        <div className="social-media-hero-content" ref={heroContentRef}>
          <h1>Social Media</h1>

          <div className="social-media-breadcrumb">
            <Link href="/" className="social-media-breadcrumb-home">
              🏦 Home
            </Link>
            <span>&gt;</span>
            <p>Social Media</p>
          </div>
        </div>
      </section> */}

      <section className="social-media-section" style={{ padding: '40px 24px' }}>
        <div className="social-media-container">
          <div className="social-media-row">
            <div className="social-media-content">
              <h2>Social Media Strategy </h2>

              <p>
                In today&apos;s digital-first world, social media has become one of the most
                powerful tools for organizations to build brand awareness, engage with their target
                audience, and drive meaningful business outcomes. A well-planned social media
                strategy not only increases visibility but also helps businesses establish
                credibility, strengthen customer relationships, and stay ahead of the competition.
              </p>

              <p>
                At CORE Media, we help organizations create impactful social media strategies and
                campaigns that amplify their message, enhance audience engagement, and deliver
                measurable results. Whether your goal is to increase brand awareness, generate
                leads, promote an event, launch a product, or strengthen customer loyalty, our team
                develops customized campaigns tailored to your business objectives.
              </p>

              <h3>How We Drive Social Media Success</h3>

              <ul className="social-media-list">
                <li>
                  Developing comprehensive social media strategies aligned with your business goals.
                </li>
                <li>
                  Creating engaging and relevant content that resonates with your target audience.
                </li>
                <li>Managing multi-platform campaigns across leading social media channels.</li>
                <li>Building brand awareness and increasing audience engagement.</li>
              </ul>

              <div className="social-media-back">
                <Link href="/" className="social-media-back-btn">
                  ← Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
