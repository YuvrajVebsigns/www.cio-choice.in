// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { fetchWebsitePageBySlug, type WebsitePage } from '@/services/pages.services';

// type Testimonial = {
//   author?: string;
//   role?: string;
//   quote?: string;
//   avatar?: string;
// };

// type ContentBlock = {
//   data?: {
//     testimonials?: Testimonial[];
//   };
// };

// function extractTestimonials(page: WebsitePage | null): Testimonial[] {
//   const blocks = page?.content?.blocks as ContentBlock[] | undefined;

//   if (!Array.isArray(blocks)) return [];

//   return blocks.flatMap((block: ContentBlock) => {
//     const testimonials = block?.data?.testimonials;
//     return Array.isArray(testimonials) ? testimonials : [];
//   });
// }

// export default function RedCarpetNight2024Page() {
//   const [page, setPage] = useState<WebsitePage | null>(null);
//   const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     async function loadPage() {
//       try {
//         const data = await fetchWebsitePageBySlug('red-carpet-night-2024');

//         setPage(data);
//         setTestimonials(extractTestimonials(data));
//       } catch (error) {
//         // Handle error silently
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     loadPage();
//   }, []);

//   if (isLoading) {
//     return <div className="rcn-loading">Loading...</div>;
//   }

//   return (
//     <main className="rcn-main">
//       <section className="rcn-hero">
//         <div className="rcn-hero-overlay" />

//         <div className="rcn-hero-content">
//           <span className="rcn-hero-badge">Red Carpet Night</span>

//           <h1 className="rcn-title">{page?.title || 'Red Carpet Night 2024'}</h1>

//           <p className="rcn-subtitle">
//             A premium CIO Choice gala that honors the top ICT brands and leaders in the industry for
//             2024.
//           </p>

//           <div className="rcn-cta-row">
//             <Link href="/contact" className="rcn-cta-button">
//               Book Your Spotlight
//             </Link>

//             <span className="rcn-cta-note">
//               Explore the event detail page for year-specific recognition and participation updates.
//             </span>
//           </div>
//         </div>
//       </section>

//       <section className="rcn-event-section">
//         <div className="rcn-event-container">
//           {testimonials.length === 0 ? (
//             <p className="rcn-empty">No API data available.</p>
//           ) : (
//             <div className="rcn-event-grid">
//               {testimonials.map((item, index) => (
//                 <article key={index} className="rcn-event-card">
//                   {item.avatar ? (
//                     <div className="rcn-event-image-wrap">
//                       <Image
//                         src={item.avatar}
//                         alt={item.author || 'Event image'}
//                         fill
//                         className="rcn-event-image"
//                         unoptimized
//                       />
//                     </div>
//                   ) : null}

//                   <div className="rcn-event-content">
//                     {item.quote ? <blockquote>{item.quote}</blockquote> : null}
//                     {item.author ? <h3>{item.author}</h3> : null}
//                     {item.role ? <p>{item.role}</p> : null}
//                   </div>
//                 </article>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>
//     </main>
//   );
// }

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchWebsitePageBySlug, type WebsitePage } from '@/services/pages.services';

type Testimonial = {
  author?: string;
  role?: string;
  quote?: string;
  avatar?: string;
};

type ContentBlock = {
  data?: {
    testimonials?: Testimonial[];
  };
};

type EventImageProps = {
  src?: string;
  alt: string;
};

const FALLBACK_EVENT_IMAGE = '/assets/team/1.jpg';

/**
 * API image empty ya broken hone par
 * static fallback image show karega.
 */
function EventImage({ src, alt }: EventImageProps) {
  const [imageSrc, setImageSrc] = useState(src?.trim() || FALLBACK_EVENT_IMAGE);

  useEffect(() => {
    setImageSrc(src?.trim() || FALLBACK_EVENT_IMAGE);
  }, [src]);

  function handleImageError() {
    if (imageSrc !== FALLBACK_EVENT_IMAGE) {
      setImageSrc(FALLBACK_EVENT_IMAGE);
    }
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className="rcn-event-image"
      loading="lazy"
      onError={handleImageError}
    />
  );
}

function extractTestimonials(page: WebsitePage | null): Testimonial[] {
  const blocks = page?.content?.blocks as ContentBlock[] | undefined;

  if (!Array.isArray(blocks)) {
    return [];
  }

  return blocks.flatMap((block) => {
    const testimonials = block?.data?.testimonials;

    if (!Array.isArray(testimonials)) {
      return [];
    }

    return testimonials.map((testimonial) => ({
      author: typeof testimonial.author === 'string' ? testimonial.author.trim() : '',
      role: typeof testimonial.role === 'string' ? testimonial.role.trim() : '',
      quote: typeof testimonial.quote === 'string' ? testimonial.quote.trim() : '',
      avatar: typeof testimonial.avatar === 'string' ? testimonial.avatar.trim() : '',
    }));
  });
}

export default function RedCarpetNight2024Page() {
  const [page, setPage] = useState<WebsitePage | null>(null);

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadPage() {
      try {
        setIsLoading(true);
        setErrorMessage('');

        const data = await fetchWebsitePageBySlug('red-carpet-night-2024');

        if (!isMounted) {
          return;
        }

        setPage(data);
        setTestimonials(extractTestimonials(data));
      } catch (error) {
        // console.error('Failed to load Red Carpet Night 2024:', error);

        if (isMounted) {
          setPage(null);
          setTestimonials([]);
          setErrorMessage('Unable to load event details. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadPage();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return <div className="rcn-loading">Loading...</div>;
  }

  return (
    <main className="rcn-main">
      <section className="rcn-hero">
        <div className="rcn-hero-overlay" />

        <div className="rcn-hero-content">
          <span className="rcn-hero-badge">Red Carpet Night</span>

          <h1 className="rcn-title">{page?.title || 'Red Carpet Night 2024'}</h1>

          <p className="rcn-subtitle">
            A premium CIO Choice gala that honors the top ICT brands and leaders in the industry for
            2024.
          </p>

          <div className="rcn-cta-row">
            <Link href="/contact" className="rcn-cta-button">
              Book Your Spotlight
            </Link>

            <span className="rcn-cta-note">
              Explore the event detail page for year-specific recognition and participation updates.
            </span>
          </div>
        </div>
      </section>

      <section className="rcn-event-section">
        <div className="rcn-event-container">
          {errorMessage ? (
            <p className="rcn-empty rcn-error">{errorMessage}</p>
          ) : testimonials.length === 0 ? (
            <p className="rcn-empty">No API data available.</p>
          ) : (
            <div className="rcn-event-grid">
              {testimonials.map((item, index) => (
                <article key={`${item.author || 'event'}-${index}`} className="rcn-event-card">
                  <div className="rcn-event-image-wrap">
                    <EventImage src={item.avatar} alt={item.author || 'Event image'} />
                  </div>

                  <div className="rcn-event-content">
                    {item.quote ? <blockquote>{item.quote}</blockquote> : null}

                    {item.author ? <h3>{item.author}</h3> : null}

                    {item.role ? <p>{item.role}</p> : null}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
