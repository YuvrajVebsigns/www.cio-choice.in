import { createMediaCoverageMetadata } from '@/lib/seo-metadata';
import MediaCoveragePage from './page-client';

export const metadata = createMediaCoverageMetadata('2024');

export default function MediaCoverage2024Route() {
  return <MediaCoveragePage />;
}
