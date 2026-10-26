import { createPhotoGalleryMetadata } from '@/lib/seo-metadata';
import PhotoGalleryPage from './page-client';

export const metadata = createPhotoGalleryMetadata('2018');

export default function PhotoGallery2018Route() {
  return <PhotoGalleryPage />;
}
