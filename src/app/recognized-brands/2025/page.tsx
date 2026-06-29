// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { fetchWebsitePageBySlug, type WebsitePage } from '@/services/pages.services';

// type BrandItem = {
//   author: string;
//   role: string;
//   quote?: string;
//   avatar?: string;
// };

// function isRecord(value: unknown): value is Record<string, unknown> {
//   return typeof value === 'object' && value !== null;
// }

// function extractItems(page: WebsitePage | null): BrandItem[] {
//   if (!page) return [];

//   const items: BrandItem[] = [];
//   const seen = new Set<string>();

//   function search(value: unknown) {
//     if (Array.isArray(value)) {
//       value.forEach(search);
//       return;
//     }

//     if (!isRecord(value)) return;

//     const author = typeof value.author === 'string' ? value.author.trim() : '';
//     const role = typeof value.role === 'string' ? value.role.trim() : '';
//     const quote = typeof value.quote === 'string' ? value.quote : '';
//     const avatar = typeof value.avatar === 'string' ? value.avatar : '';

//     if (author) {
//       const key = `${author.toLowerCase()}-${role.toLowerCase()}`;

//       if (!seen.has(key)) {
//         seen.add(key);
//         items.push({ author, role, quote, avatar });
//       }
//     }

//     Object.values(value).forEach(search);
//   }

//   search(page);
//   return items;
// }

// export default function RecognizedBrands2025Page() {
//   const [page, setPage] = useState<WebsitePage | null>(null);
//   const [items, setItems] = useState<BrandItem[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     async function loadPage() {
//       setIsLoading(true);

//       const data = await fetchWebsitePageBySlug('recognized-brands-2025');

//       setPage(data);
//       setItems(extractItems(data));
//       setIsLoading(false);
//     }

//     loadPage();
//   }, []);

//   if (isLoading) {
//     return <div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>;
//   }

//   return (
//     <main className="rcn-main">
//       <section className="rcn-hero">
//         <div className="rcn-hero-overlay" />

//         <div className="rcn-hero-content">
//           <span className="rcn-hero-badge">Red Carpet Night</span>

//           <h1 className="rcn-title">{page?.title || 'Recognized Brands 2025'}</h1>

//           <p className="rcn-subtitle">
//             A premium CIO Choice gala that honors the top ICT brands and leaders in the industry for
//             2025.
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

//       <section className="advisory-panel-section">
//         <div className="advisory-container">
//           {items.length === 0 ? (
//             <p style={{ textAlign: 'center', padding: '40px 0' }}>
//               No recognized brands available.
//             </p>
//           ) : (
//             <div className="advisory-grid">
//               {items.map((item, index) => (
//                 <article key={`${item.author}-${index}`} className="advisory-card">
//                   {item.avatar ? (
//                     <Image
//                       src={item.avatar}
//                       alt={item.author}
//                       width={120}
//                       height={120}
//                       className="advisory-avatar"
//                       unoptimized
//                     />
//                   ) : (
//                     <div className="advisory-avatar advisory-avatar-placeholder" />
//                   )}

//                   <h3>{item.author}</h3>
//                   <p>{item.role}</p>

//                   {item.quote ? <blockquote>{item.quote}</blockquote> : null}
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

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchWebsitePageBySlug, type WebsitePage } from '@/services/pages.services';

type BrandItem = {
  author: string;
  role: string;
  quote?: string;
  avatar?: string;
};

type BrandImageProps = {
  src?: string;
  alt: string;
};

const FALLBACK_BRAND_IMAGE = '/assets/blogs/blog-2.png';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function getImageUrl(value: unknown): string {
  if (typeof value === 'string') {
    return value.trim();
  }

  if (!isRecord(value)) {
    return '';
  }

  return (
    getString(value.url) ||
    getString(value.original) ||
    getString(value.large) ||
    getString(value.medium) ||
    getString(value.small) ||
    getString(value.thumbnail)
  );
}

/**
 * API image missing ya load fail hone par
 * fallback static image show karega.
 */
function BrandImage({ src, alt }: BrandImageProps) {
  const [imageSrc, setImageSrc] = useState(src?.trim() || FALLBACK_BRAND_IMAGE);

  useEffect(() => {
    setImageSrc(src?.trim() || FALLBACK_BRAND_IMAGE);
  }, [src]);

  function handleImageError() {
    if (imageSrc !== FALLBACK_BRAND_IMAGE) {
      setImageSrc(FALLBACK_BRAND_IMAGE);
    }
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={120}
      height={120}
      className="advisory-avatar"
      unoptimized
      onError={handleImageError}
    />
  );
}

function extractItems(page: WebsitePage | null): BrandItem[] {
  if (!page) {
    return [];
  }

  const items: BrandItem[] = [];
  const seen = new Set<string>();

  const pageTitle = getString(page.title).toLowerCase();

  function addItem(value: Record<string, unknown>) {
    /*
     * value.title intentionally use nahi kiya gaya,
     * kyunki usse page title extra card ban raha tha.
     */
    const author = getString(value.author) || getString(value.brandName) || getString(value.name);

    const role =
      getString(value.role) ||
      getString(value.designation) ||
      getString(value.position) ||
      getString(value.company) ||
      getString(value.subtitle);

    const quote =
      getString(value.quote) ||
      getString(value.description) ||
      getString(value.message) ||
      getString(value.content);

    const avatar =
      getImageUrl(value.avatar) ||
      getImageUrl(value.image) ||
      getImageUrl(value.photo) ||
      getImageUrl(value.logo) ||
      getImageUrl(value.brandLogo) ||
      getImageUrl(value.profileImage);

    if (!author) {
      return;
    }

    const normalizedAuthor = author.toLowerCase();

    /*
     * Safety check:
     * Page heading ko card banne se rokega.
     */
    if (normalizedAuthor === pageTitle || normalizedAuthor === 'recognized brands 2025') {
      return;
    }

    const key = `${normalizedAuthor}-${role.toLowerCase()}`;

    if (seen.has(key)) {
      return;
    }

    seen.add(key);

    items.push({
      author,
      role,
      quote,
      avatar,
    });
  }

  function processCollection(value: unknown) {
    if (!Array.isArray(value)) {
      return;
    }

    value.forEach((item) => {
      if (isRecord(item)) {
        addItem(item);
      }
    });
  }

  function search(value: unknown) {
    if (Array.isArray(value)) {
      value.forEach(search);
      return;
    }

    if (!isRecord(value)) {
      return;
    }

    Object.entries(value).forEach(([key, nestedValue]) => {
      const isBrandCollection =
        key === 'testimonials' ||
        key === 'brands' ||
        key === 'recognizedBrands' ||
        key === 'brandItems';

      if (isBrandCollection) {
        processCollection(nestedValue);
        return;
      }

      /*
       * Nested objects search honge, lekin current object ko
       * directly card mein convert nahi kiya jayega.
       */
      search(nestedValue);
    });
  }

  search(page);

  return items;
}

export default function RecognizedBrands2025Page() {
  const [page, setPage] = useState<WebsitePage | null>(null);

  const [items, setItems] = useState<BrandItem[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadPage() {
      try {
        setIsLoading(true);
        setErrorMessage('');

        const data = await fetchWebsitePageBySlug('recognized-brands-2025');

        if (!isMounted) {
          return;
        }

        setPage(data);
        setItems(extractItems(data));
      } catch (error) {
        // console.error('Failed to load Recognized Brands 2025:', error);

        if (isMounted) {
          setPage(null);
          setItems([]);
          setErrorMessage('Unable to load recognized brands. Please try again later.');
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
    return (
      <div
        style={{
          padding: 40,
          textAlign: 'center',
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <main className="rcn-main">
      <section className="rcn-hero">
        <div className="rcn-hero-overlay" />

        <div className="rcn-hero-content">
          <span className="rcn-hero-badge">Red Carpet Night</span>

          <h1 className="rcn-title">{page?.title || 'Recognized Brands 2025'}</h1>

          <p className="rcn-subtitle">
            A premium CIO Choice gala that honors the top ICT brands and leaders in the industry for
            2025.
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

      <section className="advisory-panel-section">
        <div className="advisory-container">
          {errorMessage ? (
            <p
              style={{
                color: '#b00020',
                textAlign: 'center',
                padding: '40px 0',
              }}
            >
              {errorMessage}
            </p>
          ) : items.length === 0 ? (
            <p
              style={{
                textAlign: 'center',
                padding: '40px 0',
              }}
            >
              No recognized brands available.
            </p>
          ) : (
            <div className="advisory-grid">
              {items.map((item, index) => (
                <article key={`${item.author}-${item.role}-${index}`} className="advisory-card">
                  <BrandImage src={item.avatar} alt={item.author} />

                  <h3>{item.author}</h3>

                  {item.role ? <p>{item.role}</p> : null}

                  {item.quote ? <blockquote>{item.quote}</blockquote> : null}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
