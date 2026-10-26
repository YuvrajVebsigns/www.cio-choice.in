import { createPhotoGalleryMetadata } from '@/lib/seo-metadata';
import PhotoGalleryPage from './page-client';

export const metadata = createPhotoGalleryMetadata('2016');

export default function PhotoGallery2016Route() {
  return <PhotoGalleryPage />;
}
