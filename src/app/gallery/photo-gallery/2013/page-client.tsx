'use client';

const highlights = Array.from({ length: 22 }, (_, index) => ({
  image: `/assets/photogallery/2013/photo${index + 1}.jpg`,
  name: `Photo ${index + 1}`,
  date: '2013',
}));

export default function MediaCoverage2017Page() {
  return (
    <main className="page-container">
      <section className="page-header">
        <h1>Gallery of Excellence – 2013</h1>
        <p>Snapshots of innovation, recognition, and industry leadership throughout the year.</p>
      </section>

      <section className="media-two-sections">
        <div className="media-section-card">
          <h2>Media Highlights</h2>
          <div className="highlights-grid">
            {highlights.map((item) => (
              <div className="media-profile-card" key={item.image}>
                <img src={item.image} alt={item.name} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
