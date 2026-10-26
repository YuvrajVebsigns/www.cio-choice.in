import { createMediaCoverageMetadata } from '@/lib/seo-metadata';
import MediaCoveragePage from './page-client';

export const metadata = createMediaCoverageMetadata('2021');

export default function MediaCoverage2021Route() {
  return <MediaCoveragePage />;
}
