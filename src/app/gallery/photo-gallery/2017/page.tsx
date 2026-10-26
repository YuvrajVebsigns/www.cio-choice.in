import { createPhotoGalleryMetadata } from '@/lib/seo-metadata';
import PhotoGalleryPage from './page-client';

export const metadata = createPhotoGalleryMetadata('2017');

export default function PhotoGallery2017Route() {
  return <PhotoGalleryPage />;
}
