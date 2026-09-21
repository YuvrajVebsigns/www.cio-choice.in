'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchWebsiteMediaVideosPage, type WebsitePage } from '@/services/pages.services';

const tabs = ['Overview', 'Video Highlights', 'Campaign Results'];

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

  function search(value: unknown) {
    if (Array.isArray(value)) {
      value.forEach(search);
      return;
    }

    if (!isRecord(value)) return;

    const quote = getString(value.quote);
    const videoUrl =
      getVideoEmbedUrl(value.videoUrl) ||
      getVideoEmbedUrl(value.videoURL) ||
      getVideoEmbedUrl(value.embedUrl) ||
      getVideoEmbedUrl(value.video) ||
      getVideoEmbedUrl(value.youtubeUrl) ||
      getVideoEmbedUrl(value.videoLink) ||
      getVideoEmbedUrl(quote);
    const title =
      getString(value.title) ||
      getString(value.name) ||
      getString(value.heading) ||
      getString(value.author) ||
      getString(value.brandName) ||
      getString(value.label);
    const description =
      getString(value.description) ||
      getString(value.content) ||
      getString(value.text) ||
      getString(value.subtitle) ||
      (quote && !getVideoEmbedUrl(quote) ? quote : '') ||
      getString(value.message);
    const image =
      getMediaUrl(value.thumbnail) ||
      getMediaUrl(value.image) ||
      getMediaUrl(value.poster) ||
      getMediaUrl(value.avatar) ||
      getMediaUrl(value.logo);

    if (title && (videoUrl || description || image)) {
      const key = `${title.toLowerCase()}-${videoUrl.toLowerCase()}`;

      if (!seen.has(key)) {
        seen.add(key);
        cards.push({ title, description, videoUrl, image });
      }
    }

    Object.values(value).forEach(search);
  }

  search(page.content || page);
  return cards;
}

export default function WinningBrandVideos2017Page() {
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
        const data = await fetchWebsiteMediaVideosPage('media-videos-2');
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
      '2017 winning brand videos captured the brand vision with crisp storytelling and strong emotional appeal.',
      'This interactive page highlights the production themes and strategic outcomes.',
    ],
    'Campaign Results': [
      'Video launches generated improved audience recall and click-through rates.',
      'The campaign strengthened the brand’s presence in target segments.',
      'Integrated media execution delivered consistent messaging across channels.',
    ],
  };

  return (
    <main className="page-container">
      <section className="page-header">
        <h1>{page?.title || 'Winning Brand Videos - 2017'}</h1>
        <p>Interactive look at the 2017 winning brand video campaigns.</p>
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
