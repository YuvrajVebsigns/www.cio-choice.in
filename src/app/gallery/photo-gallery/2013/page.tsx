import { createPhotoGalleryMetadata } from '@/lib/seo-metadata';
import PhotoGalleryPage from './page-client';

export const metadata = createPhotoGalleryMetadata('2013');

export default function PhotoGallery2013Route() {
  return <PhotoGalleryPage />;
}
