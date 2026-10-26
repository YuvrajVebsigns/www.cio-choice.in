import { notFound } from 'next/navigation';
import RecognizedBrands from '../RecognizedBrands';

type RecognizedBrandsPageProps = {
  params: Promise<{
    year: string;
  }>;
};

export default async function RecognizedBrandsYearPage({ params }: RecognizedBrandsPageProps) {
  const { year } = await params;

  if (!/^\d{4}$/.test(year)) {
    notFound();
  }

  return <RecognizedBrands year={year} />;
}
