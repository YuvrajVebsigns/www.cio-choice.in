import { createPhotoGalleryMetadata } from '@/lib/seo-metadata';
import PhotoGalleryPage from './page-client';

export const metadata = createPhotoGalleryMetadata('2024');

export default function PhotoGallery2024Route() {
  return <PhotoGalleryPage />;
}
