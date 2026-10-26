import { createMediaCoverageMetadata } from '@/lib/seo-metadata';
import MediaCoveragePage from './page-client';

export const metadata = createMediaCoverageMetadata('2018');

export default function MediaCoverage2018Route() {
  return <MediaCoveragePage />;
}
