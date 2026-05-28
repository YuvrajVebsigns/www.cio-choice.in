// 'use client';

// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// interface VideoItem {
//   id: number;
//   slug: string;
//   title: string;
//   category: string;
//   author: string;
//   date: string;
//   image: string;
//   videoUrl?: string;
// }

// export default function VideosPage() {
//   const [videos, setVideos] = useState<VideoItem[]>([]);
//   const [activeVideo, setActiveVideo] = useState<number | null>(null);

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

//   useEffect(() => {
//     fetch('/api/videos')
//       .then((res) => res.json())
//       .then((data) => setVideos(data))
//       .catch(() => setVideos([]));
//   }, []);

//   return (
//     <>
//       {/* HERO */}
//       <section className="blog-hero">
//         <div className="blog-hero-media" ref={heroMediaRef}>
//           <img
//             src="/assets/blogs/blog-1.webp"
//             alt="Read Videos"
//             style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//           />
//         </div>

//         <div className="blog-hero-overlay"></div>

//         <div className="blog-hero-content" ref={heroContentRef}>
//           <h1>Play Videos</h1>

//           <div className="blog-breadcrumb">
//             <Link href="/" className="blog-breadcrumb-home">
//               🏦 Home
//             </Link>
//             <span>&gt;</span>
//             <p>Videos</p>
//           </div>
//         </div>
//       </section>

//       {/* VIDEO GRID */}
//       <section className="videopage-section" style={{ margin: '40px 24px 0' }}>
//         <div className="videopage-container">
//           <div className="videopage-grid">

//             {videos.slice(0, 6).map((v) => (
//               <article key={v.id} className="videopage-card">
//                 <div className="videopage-video-wrap">

//                   {/* IFRAME ALWAYS LOADED (NO BLACK SCREEN) */}
//                   <iframe
//                     src={`${v.videoUrl}?rel=0&enablejsapi=1`}
//                     title={v.title}
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                     style={{
//                       position: 'absolute',
//                       inset: 0,
//                       width: '100%',
//                       height: '100%',
//                       border: 0,
//                       pointerEvents: activeVideo === v.id ? 'auto' : 'none',
//                     }}
//                   />

//                   {/* TRANSPARENT PAUSE OVERLAY */}
//                   {activeVideo !== v.id && (
//                     <div
//                       onClick={() => setActiveVideo(v.id)}
//                       style={{
//                         position: 'absolute',
//                         inset: 0,
//                         background: 'rgba(0,0,0,0.35)',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         cursor: 'pointer',
//                         zIndex: 2,
//                       }}
//                     >
//                       <div
//                         style={{
//                           width: '72px',
//                           height: '72px',
//                           borderRadius: '50%',
//                           background: 'rgba(180,0,0,0.85)',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           color: '#fff',
//                           fontSize: '18px',
//                           fontWeight: 700,
//                         }}
//                       >
//                         ▶
//                       </div>
//                     </div>
//                   )}

//                 </div>
//               </article>
//             ))}

//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface VideoItem {
  id: number;
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  image: string;
  videoUrl?: string;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

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

  useEffect(() => {
    fetch('/api/videos')
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch(() => setVideos([]));
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="blog-hero">
        <div className="blog-hero-media" ref={heroMediaRef}>
          <img
            src="/assets/blogs/blog-1.webp"
            alt="Read Videos"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        <div className="blog-hero-overlay"></div>

        <div className="blog-hero-content" ref={heroContentRef}>
          <h1>Play Videos</h1>

          <div className="blog-breadcrumb">
            <Link href="/" className="blog-breadcrumb-home">
              🏦 Home
            </Link>

            <span>&gt;</span>

            <p>Videos</p>
          </div>
        </div>
      </section>

      {/* VIDEO GRID */}
      <section className="videopage-section" style={{ margin: '40px 24px 0' }}>
        <div className="videopage-container">
          <div className="videopage-grid">
            {videos.slice(0, 6).map((v) => (
              <article key={v.id} className="videopage-card">
                <div className="videopage-video-wrap">
                  {/* VIDEO */}
                  <iframe
                    src={
                      activeVideo === v.id
                        ? `${v.videoUrl}?autoplay=1&rel=0`
                        : `${v.videoUrl}?rel=0`
                    }
                    title={v.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      border: 0,
                    }}
                  />

                  {/* OVERLAY */}
                  {activeVideo !== v.id && (
                    <div
                      onClick={() => setActiveVideo(v.id)}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 2,
                        transition: '0.3s ease',
                      }}
                    >
                      <div
                        style={{
                          width: '72px',
                          height: '72px',
                          borderRadius: '50%',
                          background: 'rgba(180,0,0,0.85)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontSize: '24px',
                          fontWeight: 700,
                          boxShadow: '0 8px 30px rgba(164,0,0,0.25)',
                        }}
                      >
                        ▶
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
