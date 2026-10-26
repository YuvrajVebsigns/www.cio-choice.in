import { createSeoMetadata } from '@/lib/seo-metadata';
import VideoGalleryPage from './page-client';

export const metadata = createSeoMetadata({
  title: 'CIO Choice Video Gallery | Event Highlights',
  description:
    'Watch CIO Choice video highlights from 2013 to 2024, featuring recognition moments, event highlights and technology brand stories.',
  keywords: [
    'CIO Choice video gallery',
    'CIO Choice event videos',
    'CIO Choice 2024',
    'CIO Choice 2023',
    'CIO Choice recognition highlights',
    'CIO Choice event moments',
    'technology brand stories',
  ],
  openGraphTitle: 'CIO Choice Video Gallery – Event Highlights',
  canonicalUrl: 'https://ciochoice.com/video-gallery',
  siteName: 'CIO Choice',
});

export default function VideoGalleryRoute() {
  return <VideoGalleryPage />;
}
