import { createPhotoGalleryMetadata } from '@/lib/seo-metadata';
import PhotoGalleryPage from './page-client';

export const metadata = createPhotoGalleryMetadata('2015');

export default function PhotoGallery2015Route() {
  return <PhotoGalleryPage />;
}
