import { createMediaCoverageMetadata } from '@/lib/seo-metadata';
import MediaCoveragePage from './page-client';

export const metadata = createMediaCoverageMetadata('2023');

export default function MediaCoverage2023Route() {
  return <MediaCoveragePage />;
}
