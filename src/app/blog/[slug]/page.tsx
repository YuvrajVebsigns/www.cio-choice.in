// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// // import { useParams } from 'next/navigation';
// import useScrollAnimation from '../../../hooks/useScrollAnimation';

// const article = {
//   category: 'Blog',
//   title: 'Healthcare & Life Sciences Accelerate Digital Transformation with AI/ML & Hybrid Cloud',
//   author: 'CIO Dialogues Team',
//   date: 'June 13, 2022',
//   image: '/assets/blogs/blog-1.png',
//   hero: '/assets/blogs/blog-1.webp',

//   content: [
//     'Healthcare and Life Sciences companies are accelerating digital transformation using AI/ML and Hybrid Cloud technologies.',

//     'CIOs are focusing on cloud solutions for R&D, drug discovery, data management, and improving patient outcomes.',

//     'Key challenges include data security, compliance, audits, and managing cloud infrastructure costs.',
//   ],

//   sections: [
//     {
//       heading: 'Accelerating with Hybrid Cloud',
//       paragraphs: [
//         'Healthcare companies are adopting Hybrid Cloud to improve scalability, customer experience, and operational efficiency.',

//         'Cloud enables agile supply chains, automation, and faster digital innovation while maintaining critical on-premise systems.',

//         'Google Cloud highlighted Hybrid Cloud solutions like Anthos to balance flexibility, compliance, and data protection.',
//       ],
//     },

//     {
//       heading: 'Data Privacy and Connectivity',
//       paragraphs: [
//         'Cloud technologies support innovation, collaboration, and advanced analytics across healthcare ecosystems.',

//         'CIOs remain concerned about data privacy, regulatory compliance, and audit readiness.',

//         'Google Cloud emphasized Zero-Trust security models and GxP-compliant infrastructure to address these challenges.',

//         'Organizations are carefully selecting technologies that align with business transformation goals rather than adopting technology blindly.',
//       ],
//     },
//   ],
// };

// function AnimatedBlock({
//   children,
//   className = '',
//   animationClass = 'animate-fade-in',
//   initialTransform = 'translateY(24px)',
// }: {
//   children: React.ReactNode;
//   className?: string;
//   animationClass?: string;
//   initialTransform?: string;
// }) {
//   const ref = useScrollAnimation<HTMLDivElement>({ animationClass, initialTransform });

//   return (
//     <div ref={ref} className={className}>
//       {children}
//     </div>
//   );
// }
// export default function BlogDetailsPage() {
//   // const params = useParams<{ slug: string }>();
//   // const slug = Array.isArray(params?.slug) ? params.slug[0] : (params?.slug ?? '');
//   // const readableSlug = slug.replace(/-/g, ' ');

//   return (
//     <main className="blog-detail-page">
//       <div className="blogpage-container" style={{ paddingBottom: '80px' }}>
//         {/* <article className="blogpage-card blogpage-stacked"> */}
//         <AnimatedBlock
//           className="blogpage-media"
//           animationClass="animate-fade-in"
//           initialTransform="translateY(28px)"
//         >
//           <Image
//             src={article.hero}
//             alt={article.title}
//             fill
//             priority
//             className="blogpage-media-image"
//           />
//         </AnimatedBlock>

//         <div className="blogpage-body">
//           <AnimatedBlock
//             className="blogpage-content"
//             animationClass="animate-fade-in-left"
//             initialTransform="translateX(-24px)"
//           >
//             <div className="blogpage-meta">
//               <span className="blogpage-category">{article.category}</span>
//               <p>
//                 By <span>{article.author}</span>
//               </p>
//             </div>

//             <h1 className="blogpage-title">{article.title}</h1>
//             <div className="blogpage-meta" style={{ marginBottom: '18px' }}>
//               Published on {article.date}
//             </div>

//             <p style={{ marginBottom: '18px', lineHeight: 1.8 }}>{article.content[0]}</p>

//             <AnimatedBlock
//               className="project-overview"
//               animationClass="animate-fade-in"
//               initialTransform="translateY(18px)"
//             >
//               <h3>Project Overview</h3>
//               <p className="project-overview-sub">
//                 A dynamic market, a strong and consistent brand identity is key to standing out and
//                 driving growth.
//               </p>

//               <ul className="overview-list">
//                 <li>
//                   <strong>Brand Audit & Research</strong>
//                 </li>
//                 <li>
//                   <strong>Stakeholder Workshops</strong>
//                 </li>
//                 <li>
//                   <strong>Customer Experience</strong>
//                 </li>
//                 <li>
//                   <strong>Launch & Marketing</strong>
//                 </li>
//                 <li>
//                   <strong>Creative Direction</strong>
//                 </li>
//                 <li>
//                   <strong>Touchpoints</strong>
//                 </li>
//               </ul>
//             </AnimatedBlock>

//             {article.sections.map((section) => (
//               <AnimatedBlock
//                 key={section.heading}
//                 className="blog-section-block"
//                 animationClass="animate-fade-in"
//                 initialTransform="translateY(24px)"
//               >
//                 <section>
//                   <h2>{section.heading}</h2>

//                   {section.paragraphs.map((paragraph) => (
//                     <p key={paragraph}>{paragraph}</p>
//                   ))}
//                 </section>
//               </AnimatedBlock>
//             ))}

//             <AnimatedBlock
//               className="blog-back-link"
//               animationClass="animate-fade-in"
//               initialTransform="translateY(18px)"
//             >
//               <Link href="/blog" className="talk-btn">
//                 ← Back to Blog
//               </Link>
//             </AnimatedBlock>
//           </AnimatedBlock>
//         </div>
//         {/* </article> */}
//       </div>
//     </main>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useScrollAnimation from '../../../hooks/useScrollAnimation';
import {
  fetchWebsiteBlogBySlug,
  type WebsiteBlogContentBlock,
  type WebsiteBlogDetailItem,
} from '@/services/blogs.service';

type FallbackArticle = {
  category: string;
  title: string;
  author: string;
  date: string;
  image: string;
  hero: string;
  content: string[];
  sections: Array<{
    heading: string;
    paragraphs: string[];
  }>;
};

const fallbackArticle: FallbackArticle = {
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

function formatPublishedDate(value?: string) {
  if (!value) return fallbackArticle.date;

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return fallbackArticle.date;

  return parsed.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function getBlogImage(blog?: WebsiteBlogDetailItem | null) {
  return blog?.featureImage || blog?.seo?.ogImage || fallbackArticle.hero;
}

function getBlogCategory(blog?: WebsiteBlogDetailItem | null) {
  return blog?.websites?.[0]?.name || blog?.tags?.[0] || fallbackArticle.category;
}

function getBlogAuthor(blog?: WebsiteBlogDetailItem | null) {
  return blog?.author?.fullName || fallbackArticle.author;
}

function getBlogContentBlocks(blog?: WebsiteBlogDetailItem | null) {
  return Array.isArray(blog?.content?.blocks) ? blog.content.blocks : [];
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function renderBlock(block: WebsiteBlogContentBlock | null | undefined, index: number) {
  if (!isObject(block)) return null;

  const key = typeof block.id === 'string' ? block.id : `${String(block.type ?? 'block')}-${index}`;
  const type = typeof block.type === 'string' ? block.type.toLowerCase() : '';
  const data = isObject(block.data) ? block.data : undefined;

  if (type === 'header') {
    const level = typeof data?.level === 'number' ? data.level : 2;
    const text = typeof data?.text === 'string' ? data.text.trim() : '';
    if (!text) return null;

    if (level <= 2) return <h2 key={key}>{text}</h2>;
    return <h3 key={key}>{text}</h3>;
  }

  if (type === 'paragraph') {
    const text = typeof data?.text === 'string' ? data.text.trim() : '';
    if (!text) return null;
    return (
      <p
        key={key}
        style={{ marginBottom: '18px', lineHeight: 1.8 }}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  }

  if (type === 'list') {
    const items = Array.isArray(data?.items)
      ? data.items.filter((item): item is string => typeof item === 'string')
      : [];
    if (!items.length) return null;

    return (
      <ul key={key} className="overview-list">
        {items.map((item) => (
          <li key={item}>
            <strong>{item}</strong>
          </li>
        ))}
      </ul>
    );
  }

  if (type === 'image') {
    const file = isObject(data?.file) ? data.file : undefined;
    const url = typeof file?.url === 'string' ? file.url : '';
    if (!url) return null;

    return (
      <div key={key} style={{ margin: '24px 0' }}>
        <Image
          src={url}
          alt={typeof data?.caption === 'string' ? data.caption : 'Blog image'}
          width={1200}
          height={675}
          unoptimized
        />
      </div>
    );
  }

  if (type === 'quote') {
    const text = typeof data?.text === 'string' ? data.text.trim() : '';
    if (!text) return null;

    return (
      <blockquote
        key={key}
        style={{ margin: '24px 0', paddingLeft: '18px', borderLeft: '3px solid #d11f26' }}
      >
        {text}
      </blockquote>
    );
  }

  if (type === 'delimiter') {
    return <hr key={key} style={{ margin: '24px 0' }} />;
  }

  const fallbackText = typeof data?.text === 'string' ? data.text.trim() : '';
  if (!fallbackText) return null;

  return (
    <p
      key={key}
      style={{ marginBottom: '18px', lineHeight: 1.8 }}
      dangerouslySetInnerHTML={{ __html: fallbackText }}
    />
  );
}

export default function BlogDetailsPage() {
  const params = useParams<{ slug?: string | string[] }>();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : (params?.slug ?? '');

  const [blog, setBlog] = useState<WebsiteBlogDetailItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadBlog() {
      if (!slug) {
        if (isMounted) {
          setError('Blog slug is missing.');
          setIsLoading(false);
        }
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchWebsiteBlogBySlug(slug);

        if (isMounted) {
          setBlog(response);
          setError(response ? null : 'Blog not found.');
        }
      } catch (fetchError) {
        if (isMounted) {
          setBlog(null);
          setError(fetchError instanceof Error ? fetchError.message : 'Failed to load blog');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadBlog();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const displayTitle = blog?.title ?? fallbackArticle.title;
  const displayAuthor = getBlogAuthor(blog);
  const displayCategory = getBlogCategory(blog);
  const displayDate = formatPublishedDate(blog?.publishedAt);
  const displayImage = getBlogImage(blog);
  const contentBlocks = getBlogContentBlocks(blog);
  const hasBlocks = contentBlocks.length > 0;
  const fallbackSections = fallbackArticle.sections;

  return (
    <main className="blog-detail-page">
      <article className="blogpage-card blogpage-stacked">
        <AnimatedBlock
          className="blogpage-media"
          animationClass="animate-fade-in"
          initialTransform="translateY(28px)"
        >
          <Image
            src={displayImage}
            alt={displayTitle}
            fill
            priority
            className="blogpage-media-image"
            unoptimized
          />
        </AnimatedBlock>

        <div className="blogpage-body">
          <AnimatedBlock
            className="blogpage-content"
            animationClass="animate-fade-in-left"
            initialTransform="translateX(-24px)"
          >
            {isLoading ? <p style={{ marginBottom: '18px' }}>Loading blog...</p> : null}
            {!isLoading && error ? <p style={{ marginBottom: '18px' }}>{error}</p> : null}

            <div className="blogpage-meta">
              <span className="blogpage-category">{displayCategory}</span>
              <p>
                By <span>{displayAuthor}</span>
              </p>
            </div>

            <h1 className="blogpage-title">{displayTitle}</h1>
            <div className="blogpage-meta" style={{ marginBottom: '18px' }}>
              Published on {displayDate}
            </div>

            {hasBlocks ? (
              <div>{contentBlocks.map((block, index) => renderBlock(block, index))}</div>
            ) : (
              <>
                <p style={{ marginBottom: '18px', lineHeight: 1.8 }}>
                  {fallbackArticle.content[0]}
                </p>

                <AnimatedBlock
                  className="project-overview"
                  animationClass="animate-fade-in"
                  initialTransform="translateY(18px)"
                >
                  <h3>Project Overview</h3>
                  <p className="project-overview-sub">
                    A dynamic market, a strong and consistent brand identity is key to standing out
                    and driving growth.
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

                {fallbackSections.map((section) => (
                  <AnimatedBlock
                    key={section.heading}
                    className="blog-section-block"
                    animationClass="animate-fade-in"
                    initialTransform="translateY(24px)"
                  >
                    <section style={{ marginTop: '28px' }}>
                      <h2 style={{ marginBottom: '14px' }}>{section.heading}</h2>
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} style={{ marginBottom: '18px', lineHeight: 1.8 }}>
                          {paragraph}
                        </p>
                      ))}
                    </section>
                  </AnimatedBlock>
                ))}
              </>
            )}

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
      </article>
    </main>
  );
}
