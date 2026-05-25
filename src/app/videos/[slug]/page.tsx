'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

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

export default function VideoDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [video, setVideo] = useState<VideoItem | null>(null);

  useEffect(() => {
    fetch('/api/videos')
      .then((res) => res.json())
      .then((data: VideoItem[]) => {
        const found = data.find((d) => d.slug === slug) || null;
        setVideo(found);
      })
      .catch(() => setVideo(null));
  }, [slug]);

  if (!video) return <div className="video-not-found">Video not found</div>;

  return (
    <section className="video-detail">
      <div className="video-player">
        {video.videoUrl ? (
          <iframe
            width="100%"
            height={520}
            src={video.videoUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <Image src={video.image} alt={video.title} width={1200} height={700} />
        )}
      </div>

      <div className="video-detail-meta">
        <h1>{video.title}</h1>
        <div className="video-detail-info">
          <span>{video.category}</span>
          <span>{video.author}</span>
          <span>{video.date}</span>
        </div>

        <p>
          This page shows the selected video with a focused player and metadata. Replace this
          placeholder with the full description or transcript as needed.
        </p>
      </div>
    </section>
  );
}
