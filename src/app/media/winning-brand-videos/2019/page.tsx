import { createSeoMetadata } from '@/lib/seo-metadata';
import WinningBrandVideos2019Page from './page-client';

export const metadata = createSeoMetadata({
  title: 'CORE Media Winning Brand Videos 2019 | Highlights',
  metaTitle: 'Winning Brand Videos 2019 | CORE Media',
  description:
    "Explore CORE Media's 2019 winning brand videos, featuring creative storytelling, visual identity, campaign highlights and brand impact.",
  keywords: [
    'CORE Media winning brand videos 2019',
    'winning brand videos',
    '2019 brand video campaigns',
    'brand storytelling',
    'video marketing',
    'creative campaigns',
    'brand impact',
  ],
  openGraphTitle: 'CORE Media – Winning Brand Videos 2019',
  canonicalUrl: 'https://ciochoice.com/media/winning-brand-videos/2019',
  siteName: 'CORE Media',
});

export default function WinningBrandVideos2019Route() {
  return <WinningBrandVideos2019Page />;
}
