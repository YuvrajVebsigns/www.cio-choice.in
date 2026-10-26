import type { Metadata } from 'next';

type SeoMetadataOptions = {
  title: string;
  description: string;
  keywords: string[];
  openGraphTitle: string;
  canonicalUrl: string;
  siteName: string;
  metaTitle?: string;
};

export function createSeoMetadata({
  title,
  description,
  keywords,
  openGraphTitle,
  canonicalUrl,
  siteName,
  metaTitle,
}: SeoMetadataOptions): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: openGraphTitle,
      description,
      type: 'website',
      siteName,
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: openGraphTitle,
      description,
    },
    ...(metaTitle ? { other: { title: metaTitle } } : {}),
  };
}

export function createPhotoGalleryMetadata(year: string): Metadata {
  const description = `Explore the CIO Choice ${year} photo gallery featuring snapshots of innovation, recognition and industry leadership throughout the year.`;

  return createSeoMetadata({
    title: `CIO Choice ${year} Photo Gallery | Highlights`,
    description,
    keywords: [
      `CIO Choice ${year} gallery`,
      `CIO Choice photo gallery ${year}`,
      `Gallery of Excellence ${year}`,
      'CIO Choice event photos',
      'technology industry recognition',
      'ICT industry leadership',
    ],
    openGraphTitle: `CIO Choice ${year} – Gallery of Excellence`,
    canonicalUrl: `https://ciochoice.com/gallery/photo-gallery/${year}`,
    siteName: 'CIO Choice',
  });
}

export function createMediaCoverageMetadata(year: string): Metadata {
  const description = `Explore CORE Media's ${year} press coverage, industry stories, leadership insights and media highlights showcasing brand growth and recognition.`;

  return createSeoMetadata({
    title: `CORE Media Coverage ${year} | Press Highlights`,
    description,
    keywords: [
      `CORE Media coverage ${year}`,
      'CORE Media press highlights',
      'CORE Media media coverage',
      `${year} press coverage`,
      'digital media thought leadership',
      'branding and media',
      'CORE Media industry recognition',
    ],
    openGraphTitle: `CORE Media – ${year} Media Coverage`,
    canonicalUrl: `https://ciochoice.com/media/media-coverage/${year}-media-coverage`,
    siteName: 'CORE Media',
  });
}
