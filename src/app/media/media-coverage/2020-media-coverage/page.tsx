import { createMediaCoverageMetadata } from '@/lib/seo-metadata';
import MediaCoveragePage from './page-client';

export const metadata = createMediaCoverageMetadata('2020');

export default function MediaCoverage2020Route() {
  return <MediaCoveragePage />;
}
