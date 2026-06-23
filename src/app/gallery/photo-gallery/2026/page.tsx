'use client';

const leaders = [
  {
    image: '/assets/photogallery/2026/image1.jpg',
    name: 'AARTI SINGH',
    designation: 'ENTERPRISE CIO',
    company: 'MAHINDRA GROUP',
  },
  {
    image: '/assets/photogallery/2026/image2.jpg',
    name: 'GOUTAM DATTA',
    designation: 'CIDO',
    company: 'BAJAJ LIFE',
  },
  {
    image: '/assets/photogallery/2026/image3.jpg',
    name: 'JAYANT GOYAL',
    designation: 'CIO',
    company: 'COFORGE',
  },
  {
    image: '/assets/photogallery/2026/image4.jpg',
    name: 'PROSENJIT SENGUPTA',
    designation: 'GROUP CHIEF DIGITAL & INFORMATION OFFICER (CDIO)',
    company: 'ITC',
  },
  {
    image: '/assets/photogallery/2026/image5.jpg',
    name: 'RAJIV ARORA',
    designation: 'GLOBAL HEAD OF IT HUBS (REGIONS) & REGIONAL COUNTRIES',
    company: 'SIEMENS',
  },
  {
    image: '/assets/photogallery/2026/image6.jpg',
    name: 'RAVI PICHAN',
    designation: 'CIO & HEAD – DIGITAL BANKING',
    company: 'RBL BANK',
  },
  {
    image: '/assets/photogallery/2026/image7.jpg',
    name: 'SAMPATH MANICKAM',
    designation: 'CTO',
    company: 'NSE',
  },
  {
    image: '/assets/photogallery/2026/image8.jpg',
    name: 'SHIV KUMAR BHASIN',
    designation: 'CHIEF TRANSFORMATION OFFICER',
    company: 'INDUSIND BANK',
  },
  {
    image: '/assets/photogallery/2026/image9.jpg',
    name: 'DR TAPAN SAHOO',
    designation: 'EXECUTIVE OFFICER DIGITAL ENTERPRISE, INFORMATION & CYBER SECURITY',
    company: 'MARUTI SUZUKI',
  },
];

const highlights = Array.from({ length: 57 }, (_, index) => ({
  image: `/assets/photogallery/2026/photo${index + 1}.jpg`,
  name: `CIO-Choice ${index + 1}`,
  date: '2026',
}));

export default function MediaCoverage2017Page() {
  return (
    <main className="page-container">
      <section className="page-header">
        <h1>Gallery of Excellence – 2026</h1>
        <p>Snapshots of innovation, recognition, and industry leadership throughout the year.</p>
      </section>

      <section className="media-two-sections">
        <div className="media-section-card">
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
        </div>

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
