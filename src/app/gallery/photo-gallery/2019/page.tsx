import { createPhotoGalleryMetadata } from '@/lib/seo-metadata';
import PhotoGalleryPage from './page-client';

export const metadata = createPhotoGalleryMetadata('2019');

export default function PhotoGallery2019Route() {
  return <PhotoGalleryPage />;
}
