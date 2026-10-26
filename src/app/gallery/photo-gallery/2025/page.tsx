import { createPhotoGalleryMetadata } from '@/lib/seo-metadata';
import PhotoGalleryPage from './page-client';

export const metadata = createPhotoGalleryMetadata('2025');

export default function PhotoGallery2025Route() {
  return <PhotoGalleryPage />;
}
