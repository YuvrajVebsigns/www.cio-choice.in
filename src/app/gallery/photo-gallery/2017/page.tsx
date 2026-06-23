'use client';

// const leaders = [
//   {
//     image: '/assets/media/aarti-singh.png',
//     name: 'Aarti Singh',
//     designation: 'Enterprise CIO',
//     company: 'Mahindra Group',
//   },
//   {
//     image: '/assets/media/gautam-datta.png',
//     name: 'Gautam Datta',
//     designation: 'Chief Digital Officer',
//     company: 'Bajaj Allianz',
//   },
//   {
//     image: '/assets/media/jayant-goyal.png',
//     name: 'Jayant Goyal',
//     designation: 'CIO',
//     company: 'Coforge',
//   },
// ];

const highlights = Array.from({ length: 56 }, (_, index) => ({
  image: `/assets/photogallery/2017/photo${index + 1}.jpg`,
  name: `CIO-Choice ${index + 1}`,
  date: '2017',
}));

export default function MediaCoverage2017Page() {
  return (
    <main className="page-container">
      <section className="page-header">
        <h1>Gallery of Excellence – 2017</h1>
        <p>Snapshots of innovation, recognition, and industry leadership throughout the year.</p>
      </section>

      <section className="media-two-sections">
        {/* <div className="media-section-card">
          <h2>Advisory Leaders</h2>

          <div className="leaders-grid">
            {leaders.map((item) => (
              <div className="media-profile-card" key={item.name}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.designation}</p>
                <span>{item.company}</span>
              </div>
            ))}
          </div>
        </div> */}

        <div className="media-section-card">
          <h2>Media Highlights</h2>

          <div className="highlights-grid">
            {highlights.map((item) => (
              <div className="media-profile-card" key={item.image}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
