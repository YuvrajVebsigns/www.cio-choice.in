// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useScrollAnimation } from '@/hooks/useScrollAnimation';
// import { useEffect, useState } from 'react';
// import {
//   fetchWebsiteEvents,
//   getWebsiteEventImageUrl,
//   getWebsiteEventSlug,
//   WebsiteEvent,
// } from '@/services/events.service';

// export default function EventsPage() {
//   const [events, setEvents] = useState<WebsiteEvent[] | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true;

//     async function loadEvents() {
//       setIsLoading(true);

//       const data = await fetchWebsiteEvents();

//       if (isMounted) {
//         setEvents(Array.isArray(data) ? data : []);
//         setIsLoading(false);
//       }
//     }

//     loadEvents();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   const heroMediaRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-right',
//     initialTransform: 'translateX(40px)',
//     threshold: 0.12,
//     once: false,
//   });

//   const heroContentRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-left',
//     initialTransform: 'translateX(-40px)',
//     threshold: 0.12,
//     once: false,
//   });

//   const leftRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-left',
//     initialTransform: 'translateX(-40px)',
//     threshold: 0.12,
//     once: false,
//   });

//   const rightRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-right',
//     initialTransform: 'translateX(40px)',
//     threshold: 0.12,
//     once: false,
//   });

//   return (
//     <>
//       <section className="blog-hero">
//         <div className="blog-hero-media" ref={heroMediaRef}>
//           <Image
//             src="/assets/blogs/blog-1.webp"
//             alt="Events"
//             fill
//             priority
//             sizes="100vw"
//             className="blog-hero-image"
//           />
//         </div>

//         <div className="blog-hero-overlay" />

//         <div className="blog-hero-content" ref={heroContentRef}>
//           <h1>Event Calendar</h1>

//           {/* <div className="blog-breadcrumb">
//             <Link href="/" className="blog-breadcrumb-home">
//               🏦 Home
//             </Link>

//             <span>&gt;</span>

//             <p>Events</p>
//           </div> */}

//           <div className="blog-breadcrumb">
//             <Link href="/" className="blog-breadcrumb-home">
//               <Image
//                 src="/assets/home/home.png" // Replace with your image path
//                 alt="Home"
//                 width={38}
//                 height={48}
//                 className="blog-home-icon"
//               />
//               <span>Home</span>
//             </Link>

//             <span>&gt;</span>

//             <p>Event</p>
//           </div>
//         </div>
//       </section>

//       <section className="project-section">
//         <div className="project-container">
//           {isLoading ? (
//             <div className="events-loading" style={{ padding: '60px 20px', textAlign: 'center' }}>
//               Loading events…
//             </div>
//           ) : events && events.length > 0 ? (
//             <div className="project-grid">
//               {events.map((item: WebsiteEvent, index: number) => {
//                 const title = String(item.title ?? item.name ?? item.eventName ?? 'Event');
//                 const slug = getWebsiteEventSlug({ ...item, title });

//                 const imageSrc = getWebsiteEventImageUrl(item);
//                 const category =
//                   typeof item.category === 'string' && item.category.trim()
//                     ? item.category
//                     : 'Events';

//                 const ref = index % 2 === 0 ? leftRef : rightRef;

//                 return (
//                   <Link key={slug} href={`/events/${slug}`}>
//                     <div className="project-card" ref={ref}>
//                       <div className="project-image-wrap">
//                         <Image
//                           src={imageSrc}
//                           alt={title}
//                           fill
//                           sizes="(max-width: 768px) 100vw, 50vw"
//                           className="project-image"
//                           unoptimized
//                         />
//                       </div>

//                       <div className="project-overlay">
//                         <span className="project-category">{category}</span>

//                         <div className="project-content">
//                           <h3>{title}</h3>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 );
//               })}
//             </div>
//           ) : (
//             <div className="events-empty" style={{ padding: '60px 20px', textAlign: 'center' }}>
//               No events available at the moment.
//             </div>
//           )}
//         </div>
//       </section>
//     </>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useEffect, useState } from 'react';
import {
  fetchWebsiteEvents,
  getWebsiteEventImageUrl,
  getWebsiteEventSlug,
  WebsiteEvent,
} from '@/services/events.service';

type EventFilter = 'ALL' | 'ONLINE' | 'OFFLINE';

export default function EventsPage() {
  const [selectedType, setSelectedType] = useState<EventFilter>('ALL');
  const [events, setEvents] = useState<WebsiteEvent[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadEvents() {
      try {
        const data = await fetchWebsiteEvents();

        if (isMounted) {
          setEvents(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        // console.error('Failed to load events:', error);

        if (isMounted) {
          setEvents([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter events according to the selected type.
  const filteredEvents = (events ?? []).filter((item) => {
    const type = String(item.type ?? 'OFFLINE').toUpperCase();

    return selectedType === 'ALL' || type === selectedType;
  });

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

  const leftRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.12,
    once: false,
  });

  const rightRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-right',
    initialTransform: 'translateX(40px)',
    threshold: 0.12,
    once: false,
  });

  return (
    <>
      <section className="blog-hero">
        <div className="blog-hero-media" ref={heroMediaRef}>
          <Image
            src="/assets/blogs/blog-1.webp"
            alt="Events"
            fill
            priority
            sizes="100vw"
            className="blog-hero-image"
          />
        </div>

        <div className="blog-hero-overlay" />

        <div className="blog-hero-content" ref={heroContentRef}>
          <h1>Event Calendar</h1>

          <div className="blog-breadcrumb">
            <Link href="/" className="blog-breadcrumb-home">
              <Image
                src="/assets/home/home.png"
                alt="Home"
                width={38}
                height={48}
                className="blog-home-icon"
              />
              <span>Home</span>
            </Link>

            <span>&gt;</span>
            <p>Event</p>
          </div>
        </div>
      </section>

      <section className="project-section">
        <div className="project-container">
          {/* Event type filters */}
          <div className="events-filter">
            {(['ALL', 'ONLINE', 'OFFLINE'] as const).map((type) => (
              <button
                key={type}
                type="button"
                className={`events-filter-button ${selectedType === type ? 'active' : ''}`}
                onClick={() => setSelectedType(type)}
                aria-pressed={selectedType === type}
              >
                {type === 'ALL' ? 'All' : type.charAt(0) + type.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="events-loading" style={{ padding: '60px 20px', textAlign: 'center' }}>
              Loading events…
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="project-grid">
              {filteredEvents.map((item: WebsiteEvent, index: number) => {
                const title = String(item.title ?? item.name ?? item.eventName ?? 'Event');
                const slug = getWebsiteEventSlug({ ...item, title });
                const imageSrc = getWebsiteEventImageUrl(item);
                const type = String(item.type ?? 'OFFLINE').toUpperCase();
                const ref = index % 2 === 0 ? leftRef : rightRef;

                return (
                  <Link key={slug} href={`/events/${slug}`}>
                    <div className="project-card" ref={ref}>
                      <div className="project-image-wrap">
                        <Image
                          src={imageSrc}
                          alt={title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="project-image"
                          unoptimized
                        />
                      </div>

                      <div className="project-overlay">
                        <span className="project-category">{type}</span>

                        <div className="project-content">
                          <h3>{title}</h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            // <div
            //   className="events-empty"
            //   style={{ padding: '60px 20px', textAlign: 'center' }}
            // >
            //   No {selectedType === 'ALL' ? '' : `${selectedType.toLowerCase()} `}
            //   events available at the moment.
            // </div>
            <div className="events-empty">
              <Image
                src="/assets/no-events.png"
                alt="No events available"
                width={300}
                height={220}
                className="events-empty-image"
                unoptimized
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
