import { createPhotoGalleryMetadata } from '@/lib/seo-metadata';
import PhotoGalleryPage from './page-client';

export const metadata = createPhotoGalleryMetadata('2014');

export default function PhotoGallery2014Route() {
  return <PhotoGalleryPage />;
}
