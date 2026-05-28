'use client';

import Link from 'next/link';
import Image from 'next/image';
// import { useParams } from 'next/navigation';
import useScrollAnimation from '../../../hooks/useScrollAnimation';

const article = {
  category: 'Blog',
  title: 'Healthcare & Life Sciences Accelerate Digital Transformation with AI/ML & Hybrid Cloud',
  author: 'CIO Dialogues Team',
  date: 'June 13, 2022',
  image: '/assets/blogs/blog-1.png',
  hero: '/assets/blogs/blog-1.webp',

  content: [
    'Healthcare and Life Sciences companies are accelerating digital transformation using AI/ML and Hybrid Cloud technologies.',

    'CIOs are focusing on cloud solutions for R&D, drug discovery, data management, and improving patient outcomes.',

    'Key challenges include data security, compliance, audits, and managing cloud infrastructure costs.',
  ],

  sections: [
    {
      heading: 'Accelerating with Hybrid Cloud',
      paragraphs: [
        'Healthcare companies are adopting Hybrid Cloud to improve scalability, customer experience, and operational efficiency.',

        'Cloud enables agile supply chains, automation, and faster digital innovation while maintaining critical on-premise systems.',

        'Google Cloud highlighted Hybrid Cloud solutions like Anthos to balance flexibility, compliance, and data protection.',
      ],
    },

    {
      heading: 'Data Privacy and Connectivity',
      paragraphs: [
        'Cloud technologies support innovation, collaboration, and advanced analytics across healthcare ecosystems.',

        'CIOs remain concerned about data privacy, regulatory compliance, and audit readiness.',

        'Google Cloud emphasized Zero-Trust security models and GxP-compliant infrastructure to address these challenges.',

        'Organizations are carefully selecting technologies that align with business transformation goals rather than adopting technology blindly.',
      ],
    },
  ],
};

function AnimatedBlock({
  children,
  className = '',
  animationClass = 'animate-fade-in',
  initialTransform = 'translateY(24px)',
}: {
  children: React.ReactNode;
  className?: string;
  animationClass?: string;
  initialTransform?: string;
}) {
  const ref = useScrollAnimation<HTMLDivElement>({ animationClass, initialTransform });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
export default function BlogDetailsPage() {
  // const params = useParams<{ slug: string }>();
  // const slug = Array.isArray(params?.slug) ? params.slug[0] : (params?.slug ?? '');
  // const readableSlug = slug.replace(/-/g, ' ');

  return (
    <main className="blog-detail-page">
      <div className="blogpage-container" style={{ paddingBottom: '80px' }}>
        {/* <article className="blogpage-card blogpage-stacked"> */}
        <AnimatedBlock
          className="blogpage-media"
          animationClass="animate-fade-in"
          initialTransform="translateY(28px)"
        >
          <Image
            src={article.hero}
            alt={article.title}
            fill
            priority
            className="blogpage-media-image"
          />
        </AnimatedBlock>

        <div className="blogpage-body">
          <AnimatedBlock
            className="blogpage-content"
            animationClass="animate-fade-in-left"
            initialTransform="translateX(-24px)"
          >
            <div className="blogpage-meta">
              <span className="blogpage-category">{article.category}</span>
              <p>
                By <span>{article.author}</span>
              </p>
            </div>

            <h1 className="blogpage-title">{article.title}</h1>
            <div className="blogpage-meta" style={{ marginBottom: '18px' }}>
              Published on {article.date}
            </div>

            <p style={{ marginBottom: '18px', lineHeight: 1.8 }}>{article.content[0]}</p>

            <AnimatedBlock
              className="project-overview"
              animationClass="animate-fade-in"
              initialTransform="translateY(18px)"
            >
              <h3>Project Overview</h3>
              <p className="project-overview-sub">
                A dynamic market, a strong and consistent brand identity is key to standing out and
                driving growth.
              </p>

              <ul className="overview-list">
                <li>
                  <strong>Brand Audit & Research</strong>
                </li>
                <li>
                  <strong>Stakeholder Workshops</strong>
                </li>
                <li>
                  <strong>Customer Experience</strong>
                </li>
                <li>
                  <strong>Launch & Marketing</strong>
                </li>
                <li>
                  <strong>Creative Direction</strong>
                </li>
                <li>
                  <strong>Touchpoints</strong>
                </li>
              </ul>
            </AnimatedBlock>

            {article.sections.map((section) => (
              <AnimatedBlock
                key={section.heading}
                className="blog-section-block"
                animationClass="animate-fade-in"
                initialTransform="translateY(24px)"
              >
                <section>
                  <h2>{section.heading}</h2>

                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              </AnimatedBlock>
            ))}

            <AnimatedBlock
              className="blog-back-link"
              animationClass="animate-fade-in"
              initialTransform="translateY(18px)"
            >
              <Link href="/blog" className="talk-btn">
                ← Back to Blog
              </Link>
            </AnimatedBlock>
          </AnimatedBlock>
        </div>
        {/* </article> */}
      </div>
    </main>
  );
}
