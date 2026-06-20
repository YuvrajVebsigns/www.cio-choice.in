'use client';

import { useState } from 'react';

const videos = [
  {
    id: 1,
    year: 2024,
    title: 'CIO Choice 2024',
    videoUrl: 'https://www.youtube.com/embed/TSDj7FJl0eY',
  },
  {
    id: 2,
    year: 2023,
    title: 'CIO Choice 2023',
    videoUrl: 'https://www.youtube.com/embed/RObhNIc5w2A',
  },
  {
    id: 3,
    year: 2022,
    title: 'CIO Choice 2022',
    videoUrl: 'https://www.youtube.com/embed/YL5dJPZ5A8o?si',
  },
  {
    id: 4,
    year: 2021,
    title: 'CIO Choice 2021',
    videoUrl: 'https://www.youtube.com/embed/dx3BkYesTmc',
  },
  {
    id: 5,
    year: 2020,
    title: 'CIO Choice 2020',
    videoUrl: 'https://www.youtube.com/embed/mHOW4KrXVXs',
  },
  {
    id: 6,
    year: 2019,
    title: 'CIO Choice 2019',
    videoUrl: 'https://www.youtube.com/embed/mHOW4KrXVXs',
  },
  {
    id: 7,
    year: 2018,
    title: 'CIO Choice 2018',
    videoUrl: 'https://www.youtube.com/embed/lpFwZ-B8m3I',
  },
  {
    id: 8,
    year: 2017,
    title: 'CIO Choice 2017',
    videoUrl: 'https://www.youtube.com/embed/https:/aDSM0PPKfYQ',
  },
  {
    id: 9,
    year: 2014,
    title: 'CIO Choice 2014',
    videoUrl: 'https://www.youtube.com/embed/KUR75UoRuvw',
  },
  {
    id: 10,
    year: 2013,
    title: 'CIO Choice 2013',
    videoUrl: 'https://www.youtube.com/embed/https:/lNwlLlszyNM',
  },
];

export default function VideoGalleryPage() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  return (
    <main className="video-gallery-page">
      <section className="video-gallery-section">
        <div className="video-gallery-container">
          <div className="video-gallery-heading">
            <span className="video-gallery-label11">VIDEO GALLERY</span>

            <h1>VIDEO GALLERY</h1>

            <p>
              Explore memorable moments, recognition highlights and brand stories from CIO Choice
              over the years.
            </p>
          </div>

          <div className="video-gallery-grid">
            {videos.map((video) => (
              <article key={video.id} className="video-gallery-card">
                <div className="video-gallery-frame">
                  <iframe
                    src={
                      activeVideo === video.id
                        ? `${video.videoUrl}?autoplay=1&rel=0`
                        : `${video.videoUrl}?rel=0`
                    }
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      border: 0,
                      width: '100%',
                      height: '100%',
                    }}
                  />

                  {activeVideo !== video.id && (
                    <button
                      type="button"
                      className="video-play-overlay"
                      onClick={() => setActiveVideo(video.id)}
                    >
                      <span className="video-play-button">▶</span>
                    </button>
                  )}
                </div>

                <div className="video-gallery-content">
                  <h3>{video.title}</h3>
                  <p>Recognition highlights and event moments from {video.title}.</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
