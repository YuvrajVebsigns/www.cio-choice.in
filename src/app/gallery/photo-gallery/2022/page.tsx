import { createPhotoGalleryMetadata } from '@/lib/seo-metadata';
import PhotoGalleryPage from './page-client';

export const metadata = createPhotoGalleryMetadata('2022');

export default function PhotoGallery2022Route() {
  return <PhotoGalleryPage />;
}
