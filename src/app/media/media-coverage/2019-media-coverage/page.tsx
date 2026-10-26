import { createMediaCoverageMetadata } from '@/lib/seo-metadata';
import MediaCoveragePage from './page-client';

export const metadata = createMediaCoverageMetadata('2019');

export default function MediaCoverage2019Route() {
  return <MediaCoveragePage />;
}
