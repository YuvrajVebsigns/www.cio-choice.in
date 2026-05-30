
// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { ArrowUpRight } from 'lucide-react';
// import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// export default function ProjectsSection() {
//   const customEvents = [
//     {
//       category: 'Custom Events',
//       title: 'Event Management Platform',
//       image: '/assets/Shaping-the1.png',
//     },
//     {
//       category: 'Custom Events',
//       title: 'Digital Event Experience',
//       image: '/assets/Unlocking-Agility.png',
//     },
//   ];

//   const videos = [
//     {
//       category: 'Videos',
//       title: 'Interactive Learning Platform',
//       videoUrl: 'https://www.youtube.com/embed/o4LM01aE1PQ',
//     },
//     {
//       category: 'Videos',
//       title: 'Environmental Impact Dashboard',
//       videoUrl: 'https://www.youtube.com/embed/aQbU67vShTo',
//     },
//   ];

//   const customLeftRef = useScrollAnimation({
//     animationClass: 'animate-fade-in-left',
//     initialTransform: 'translateX(-40px)',
//     threshold: 0.12,
//   });

//   const customRightRef = useScrollAnimation({
//     animationClass: 'animate-fade-in-right',
//     initialTransform: 'translateX(40px)',
//     threshold: 0.12,
//   });

//   const videoLeftRef = useScrollAnimation({
//     animationClass: 'animate-fade-in-left',
//     initialTransform: 'translateX(-40px)',
//     threshold: 0.12,
//   });

//   const videoRightRef = useScrollAnimation({
//     animationClass: 'animate-fade-in-right',
//     initialTransform: 'translateX(40px)',
//     threshold: 0.12,
//   });

//   return (
//     <section className="project-section">
//       <div className="project-container">
//         {/* HEADER */}

//         <div className="project-heading">
//           <h2 className="project-title">
//             Our Work <span>Highlights.</span>
//           </h2>
//         </div>

//         {/* CUSTOM EVENTS */}

//         <div className="project-top-bar">
//           <h6 className="project-subtitle">⬢ Custom Events</h6>

//           <Link href="/events" className="talk-btn">
//             <span>More Events</span>

//             <div className="talk-btn-icon">
//               <ArrowUpRight size={18} />
//             </div>
//           </Link>
//         </div>

//         <div className="project-grid">
//           {customEvents.map((item, index) => {
//             const slug = item.title
//               .toLowerCase()
//               .replace(/\s+/g, '-')
//               .replace(/[^a-z0-9-]/g, '');

//             return (
//               <Link key={index} href={`/events/${slug}`}>
//                 <div className="project-card" ref={index === 0 ? customLeftRef : customRightRef}>
//                   <div className="project-image-wrap">
//                     <Image src={item.image} alt={item.title} fill className="project-image" />
//                   </div>

//                   <div className="project-overlay">
//                     <span className="project-category">{item.category}</span>

//                     <div className="project-content">
//                       <h3>{item.title}</h3>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>

//         {/* VIDEO SECTION */}

//         <div className="project-top-bar">
//           <h6 className="project-subtitle">⬢ Video Showcase</h6>

//           <Link href="/videos" className="talk-btn">
//             <span>More Videos</span>

//             <div className="talk-btn-icon">
//               <ArrowUpRight size={18} />
//             </div>
//           </Link>
//         </div>

//         <div className="project-grid">
//           {videos.map((item, index) => (
//             <div
//               key={index}
//               className="project-card"
//               ref={index === 0 ? videoLeftRef : videoRightRef}
//             >
//               <div className="project-video-wrap">
//                 <iframe
//                   src={`${item.videoUrl}?rel=0`}
//                   title={item.title}
//                   loading="lazy"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 />
//               </div>

//               <div className="project-overlay">
//                 <span className="project-category">{item.category}</span>

//                 <div className="project-content">
//                   <h3>{item.title}</h3>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fetchWebsiteEvents, WebsiteEvent } from '@/services/events.service';

function getStoredWebsiteId(): string | undefined {
  if (typeof window === 'undefined') return undefined;

  try {
    const raw = window.localStorage.getItem('websiteAuth');
    if (!raw) return undefined;

    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed === 'object' && parsed !== null && 'websiteId' in parsed) {
      const websiteId = (parsed as { websiteId?: unknown }).websiteId;
      return typeof websiteId === 'string' ? websiteId : undefined;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

export default function ProjectsSection() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const [events, setEvents] = useState<WebsiteEvent[] | null>(null);

  useEffect(() => {
    fetchWebsiteEvents(getStoredWebsiteId())
      .then((data) => {
        if (Array.isArray(data) && data.length) setEvents(data);
        else setEvents([]);
      })
      .catch(() => setEvents([]));
  }, []);

  const videos = [
    {
      category: 'Videos',
      title: 'Interactive Learning Platform',
      videoUrl: 'https://www.youtube.com/embed/o4LM01aE1PQ',
    },
    {
      category: 'Videos',
      title: 'Environmental Impact Dashboard',
      videoUrl: 'https://www.youtube.com/embed/aQbU67vShTo',
    },
  ];

  const customLeftRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.12,
  });

  const customRightRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-right',
    initialTransform: 'translateX(40px)',
    threshold: 0.12,
  });

  const videoLeftRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.12,
  });

  const videoRightRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-right',
    initialTransform: 'translateX(40px)',
    threshold: 0.12,
  });

  return (
    <section className="project-section">
      <div className="project-container">
        <div className="project-heading">
          <h2 className="project-title">
            Our Work <span>Highlights.</span>
          </h2>
        </div>

        <div className="project-top-bar">
          <h6 className="project-subtitle">⬢ Custom Events</h6>

          <Link href="/events" className="talk-btn">
            <span>More Events</span>
            <div className="talk-btn-icon">
              <ArrowUpRight size={18} />
            </div>
          </Link>
        </div>

        <div className="project-grid">
          {events === null ? (
            <div className="events-loading">Loading events…</div>
          ) : events.length === 0 ? (
            <div className="events-empty">No events available.</div>
          ) : (
            // show only the first two events
            events.slice(0, 2).map((item: WebsiteEvent, index: number) => {
              const title = String(
                item.title ??
                  (item['name'] as unknown) ??
                  (item['eventName'] as unknown) ??
                  'Event',
              );
              const slug =
                item.id && typeof item.id === 'string'
                  ? String(item.id)
                  : title
                      .toLowerCase()
                      .replace(/\s+/g, '-')
                      .replace(/[^a-z0-9-]/g, '');

              const imageSrc = String(
                item.image ?? item.heroImage ?? item.banner ?? '/assets/blogs/blog-1.webp',
              );
              const category = String(item.category ?? 'Events');

              return (
                <Link key={slug} href={`/events/${slug}`}>
                  <div className="project-card" ref={index === 0 ? customLeftRef : customRightRef}>
                    <div className="project-image-wrap">
                      <Image src={imageSrc} alt={title} fill className="project-image" />
                    </div>

                    <div className="project-overlay">
                      <span className="project-category">{category}</span>

                      <div className="project-content">
                        <h3>{title}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        <div className="project-top-bar">
          <h6 className="project-subtitle">⬢ Video Showcase</h6>

          <Link href="/videos" className="talk-btn">
            <span>More Videos</span>
            <div className="talk-btn-icon">
              <ArrowUpRight size={18} />
            </div>
          </Link>
        </div>

        <div className="project-grid">
          {videos.map((item, index) => (
            <div
              key={index}
              className="project-card"
              ref={index === 0 ? videoLeftRef : videoRightRef}
            >
              <div className="project-video-wrap" style={{ position: 'relative' }}>
                <iframe
                  key={activeVideo === index ? `play-${index}` : `pause-${index}`}
                  src={
                    activeVideo === index
                      ? `${item.videoUrl}?autoplay=1&rel=0`
                      : `${item.videoUrl}?rel=0`
                  }
                  title={item.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />

                {activeVideo !== index && (
                  <div
                    onClick={() => setActiveVideo(index)}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      cursor: 'pointer',
                      zIndex: 5,
                    }}
                  />
                )}
              </div>

              <div className="project-overlay">
                <span className="project-category">{item.category}</span>

                <div className="project-content">
                  <h3>{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
