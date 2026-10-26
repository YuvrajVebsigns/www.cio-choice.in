import { createPhotoGalleryMetadata } from '@/lib/seo-metadata';
import PhotoGalleryPage from './page-client';

export const metadata = createPhotoGalleryMetadata('2026');

export default function PhotoGallery2026Route() {
  return <PhotoGalleryPage />;
}
