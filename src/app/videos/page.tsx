'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    fetch('/api/videos')
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch(() => setVideos([]));
  }, []);

  return (
    <section className="videos-section red-theme">
      <div className="videos-container">
        <br />

        <h2 className="videos-title">
          All <span>Videos</span>
        </h2>

        <br />

        {/* <div className="videos-header">
          <h2>Videos</h2>
          <p>Curated video content and case studies from our team.</p>
        </div> */}

        <div className="videos-grid">
          {videos.slice(0, 6).map((v) => (
            <article className="project-card" key={v.id}>
              <div className="project-video-wrap">
                {v.videoUrl ? (
                  <iframe
                    src={`${v.videoUrl}?rel=0`}
                    title={v.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <Image src={v.image} alt={v.title} width={800} height={450} />
                )}

                {/* Play button - clickable and sits above iframe */}
                <Link
                  href={`/videos/${v.slug}`}
                  className="play-btn"
                  aria-label={`Open ${v.title}`}
                >
                  <div className="play-icon">
                    <Play size={36} />
                  </div>
                </Link>
              </div>

              <div className="project-overlay">
                <span className="project-category">{v.category}</span>
                <div className="project-content">
                  <h3>
                    <Link href={`/videos/${v.slug}`}>{v.title}</Link>
                  </h3>
                  <div className="video-info">
                    <span>{v.author}</span>
                    <span>{v.date}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
