import { createMediaCoverageMetadata } from '@/lib/seo-metadata';
import MediaCoveragePage from './page-client';

export const metadata = createMediaCoverageMetadata('2017');

export default function MediaCoverage2017Route() {
  return <MediaCoveragePage />;
}
