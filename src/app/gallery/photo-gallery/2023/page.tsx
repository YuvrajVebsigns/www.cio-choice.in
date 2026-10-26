import { createPhotoGalleryMetadata } from '@/lib/seo-metadata';
import PhotoGalleryPage from './page-client';

export const metadata = createPhotoGalleryMetadata('2023');

export default function PhotoGallery2023Route() {
  return <PhotoGalleryPage />;
}
