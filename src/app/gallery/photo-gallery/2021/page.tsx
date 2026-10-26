import { createPhotoGalleryMetadata } from '@/lib/seo-metadata';
import PhotoGalleryPage from './page-client';

export const metadata = createPhotoGalleryMetadata('2021');

export default function PhotoGallery2021Route() {
  return <PhotoGalleryPage />;
}
