import Link from 'next/link';

const galleryItems = [
  {
    title: 'Event Highlights',
    description: 'Moments from our biggest CORE Media events.',
    image: '/assets/hero/gallery-1.jpg',
  },
  {
    title: 'Brand Stories',
    description: 'Campaign visuals and winner showcases.',
    image: '/assets/hero/gallery-2.jpg',
  },
  {
    title: 'Media Moments',
    description: 'Press, video, and brand media coverage highlights.',
    image: '/assets/hero/gallery-3.jpg',
  },
  {
    title: 'Team & Culture',
    description: 'Behind the scenes from CORE Media production and strategy.',
    image: '/assets/hero/gallery-4.jpg',
  },
];

export default function GalleryPage() {
  return (
    <main className="page-container">
      <section className="page-header">
        <h1>Gallery</h1>
        <p>Explore selected visuals from CORE Media’s campaigns, events, and brand stories.</p>
      </section>

      <section className="gallery-grid">
        {galleryItems.map((item) => (
          <article key={item.title} className="gallery-card">
            <div className="gallery-card-image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="gallery-card-content">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="page-actions">
        <Link href="/" className="button-link secondary-link">
          Back to Home
        </Link>
      </section>
    </main>
  );
}
