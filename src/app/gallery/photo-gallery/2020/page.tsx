import { createPhotoGalleryMetadata } from '@/lib/seo-metadata';
import PhotoGalleryPage from './page-client';

export const metadata = createPhotoGalleryMetadata('2020');

export default function PhotoGallery2020Route() {
  return <PhotoGalleryPage />;
}
