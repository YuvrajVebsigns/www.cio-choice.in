import Link from 'next/link';

const mediaItems = [
  { href: '/media/media-coverage/2019-media-coverage', title: 'Media Coverage 2019' },
  { href: '/media/media-coverage/2017-media-coverage', title: 'Media Coverage 2017' },
  { href: '/media/winning-brand-videos/2019', title: 'Winning Brand Videos 2019' },
  { href: '/media/winning-brand-videos/2017', title: 'Winning Brand Videos 2017' },
];

export default function MediaPage() {
  return (
    <main className="page-container">
      <section className="page-header">
        <h1>Media</h1>
        <p>Explore CORE Media coverage and winning brand video highlights from 2017 and 2019.</p>
      </section>

      <section className="media-overview-links">
        <div className="link-grid">
          {mediaItems.map((item) => (
            <Link key={item.href} href={item.href} className="media-card-link">
              <div className="media-card">
                <h2>{item.title}</h2>
                <p>Open the interactive recap for {item.title.split(' ')[2]}.</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
