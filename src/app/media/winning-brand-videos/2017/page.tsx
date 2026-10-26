import { createSeoMetadata } from '@/lib/seo-metadata';
import WinningBrandVideos2017Page from './page-client';

export const metadata = createSeoMetadata({
  title: 'CORE Media Winning Brand Videos 2017 | Highlights',
  metaTitle: 'Winning Brand Videos 2017 | CORE Media',
  description:
    "Explore CORE Media's 2017 winning brand videos, featuring creative storytelling, visual identity, campaign highlights and brand impact.",
  keywords: [
    'CORE Media winning brand videos 2017',
    'winning brand videos',
    '2017 brand video campaigns',
    'brand storytelling',
    'video marketing',
    'creative campaigns',
    'brand impact',
  ],
  openGraphTitle: 'CORE Media – Winning Brand Videos 2017',
  canonicalUrl: 'https://ciochoice.com/media/winning-brand-videos/2017',
  siteName: 'CORE Media',
});

export default function WinningBrandVideos2017Route() {
  return <WinningBrandVideos2017Page />;
}
