'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchWebsiteMediaVideosPage, type WebsitePage } from '@/services/pages.services';

const tabs = ['Overview', 'Video Highlights', 'Brand Impact'];

type VideoCard = {
  title: string;
  description: string;
  videoUrl?: string;
  image?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function getMediaUrl(value: unknown): string {
  if (typeof value === 'string') return value.trim();

  if (isRecord(value)) {
    const urlVariants = isRecord(value.urlVariants) ? value.urlVariants : null;

    return (
      getString(value.url) ||
      getString(value.src) ||
      getString(value.original) ||
      getString(value.medium) ||
      getString(value.thumbnail) ||
      getString(urlVariants?.large) ||
      getString(urlVariants?.medium) ||
      getString(urlVariants?.thumbnail)
    );
  }

  return '';
}

function getVideoEmbedUrl(value: unknown): string {
  const mediaUrl = getMediaUrl(value);

  if (!mediaUrl) return '';

  try {
    const url = new URL(mediaUrl);
    const hostname = url.hostname.toLowerCase();
    const isYouTube =
      hostname === 'youtube.com' ||
      hostname.endsWith('.youtube.com') ||
      hostname === 'youtube-nocookie.com' ||
      hostname.endsWith('.youtube-nocookie.com');
    const isShortYouTube = hostname === 'youtu.be';

    if (!isYouTube && !isShortYouTube) return '';

    const videoId = isShortYouTube
      ? url.pathname.split('/').filter(Boolean)[0]
      : url.searchParams.get('v') || url.pathname.match(/\/(?:embed|shorts)\/([^/?]+)/)?.[1];

    return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : '';
  } catch {
    return '';
  }
}

function extractVideoCards(page: WebsitePage | null): VideoCard[] {
  if (!page) return [];

  const cards: VideoCard[] = [];
  const seen = new Set<string>();

  const blocks =
    isRecord(page.content) && Array.isArray(page.content.blocks) ? page.content.blocks : [];

  blocks.forEach((block) => {
    if (!isRecord(block)) return;

    const data = isRecord(block.data) ? block.data : null;
    if (!data || !Array.isArray(data.testimonials)) return;

    data.testimonials.forEach((testimonial, index) => {
      if (!isRecord(testimonial)) return;

      const videoUrl =
        getVideoEmbedUrl(testimonial.author) ||
        getVideoEmbedUrl(testimonial.videoUrl) ||
        getVideoEmbedUrl(testimonial.videoURL) ||
        getVideoEmbedUrl(testimonial.quote);
      if (!videoUrl) return;

      const title =
        getString(testimonial.title) ||
        getString(testimonial.name) ||
        getString(testimonial.role) ||
        `Video Highlight ${index + 1}`;
      const description =
        getString(testimonial.quote) ||
        getString(testimonial.description) ||
        getString(testimonial.subtitle);
      const image = getMediaUrl(testimonial.avatar);
      const key = `${title.toLowerCase()}-${videoUrl.toLowerCase()}`;

      if (!seen.has(key)) {
        seen.add(key);
        cards.push({ title, description, videoUrl, image });
      }
    });
  });

  return cards;
}

export default function WinningBrandVideos2019Page() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [page, setPage] = useState<WebsitePage | null>(null);
  const [videoCards, setVideoCards] = useState<VideoCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activeTab !== 'Video Highlights' || page) return;

    let isMounted = true;

    async function loadMediaVideosPage() {
      setIsLoading(true);

      try {
        const data = await fetchWebsiteMediaVideosPage('media-videos');
        if (isMounted) {
          setPage(data);
          setVideoCards(extractVideoCards(data));
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void loadMediaVideosPage();

    return () => {
      isMounted = false;
    };
  }, [activeTab, page]);

  const staticContent = {
    Overview: [
      '2019 winning brand videos showcased bold storytelling and strong visual identity.',
      'This page lets you switch between key themes and campaign success stories.',
    ],
    'Brand Impact': [
      'The video series supported stronger brand recall and user affinity.',
      'Media placements and social sharing expanded the campaign reach.',
      'Creative direction reinforced the brand’s premium market positioning.',
    ],
  };

  return (
    <main className="page-container">
      <section className="page-header">
        <h1>{page?.title || 'Winning Brand Videos - 2019'}</h1>
        <p>Interactive look at the 2019 winning brand video programs.</p>
      </section>

      <section className="media-coverage-tabs">
        <div className="tab-buttons">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`tab-button ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === 'Video Highlights' ? (
            isLoading ? (
              <p>Loading video highlights...</p>
            ) : videoCards.length === 0 ? (
              <p>No video highlights available.</p>
            ) : (
              <div className="media-video-card-grid">
                {videoCards.map((video, index) => (
                  <article key={`${video.title}-${index}`} className="media-video-card">
                    {video.videoUrl ? (
                      <div className="media-video-card-player">
                        <iframe
                          src={video.videoUrl}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : video.image ? (
                      <Image
                        src={video.image}
                        alt=""
                        width={640}
                        height={360}
                        className="media-video-card-image"
                        unoptimized
                      />
                    ) : null}

                    <div className="media-video-card-content">
                      <h3>{video.title}</h3>
                      {video.description ? <p>{video.description}</p> : null}
                    </div>
                  </article>
                ))}
              </div>
            )
          ) : (
            <ul>
              {staticContent[activeTab as keyof typeof staticContent].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
