// export default function PhotoGalleryPage() {
//   return (
//     <main>
//       <h1>Photo Gallery</h1>
//     </main>
//   );
// }

import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{
    year: string;
  }>;
};

const validYears = [
  '2026',
  '2025',
  '2024',
  '2023',
  '2022',
  '2021',
  '2020',
  '2019',
  '2018',
  '2017',
  '2016',
  '2015',
  '2014',
  '2013',
];

export default async function PhotoGalleryYearPage({ params }: Props) {
  const { year } = await params;

  if (!validYears.includes(year)) {
    notFound();
  }

  return (
    <main className="photo-gallery-page">
      <div className="photo-gallery-container">
        <h1>Photo Gallery {year}</h1>
        <p>Explore memorable moments from Photo Gallery {year}.</p>
      </div>
    </main>
  );
}
