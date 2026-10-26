import { notFound } from 'next/navigation';
import RedCarpetNight from '../RedCarpetNight';

type RedCarpetNightPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function RedCarpetNightPage({ params }: RedCarpetNightPageProps) {
  const { slug } = await params;

  if (!/^red-carpet-night-\d{4}$/.test(slug)) {
    notFound();
  }

  return <RedCarpetNight slug={slug} />;
}
