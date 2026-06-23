'use client';

const leaders = [
  {
    image: '/assets/photogallery/2024/image1.png',
    name: 'VINOD GOPINATHAN',
    designation: 'CIO',
    company: 'ASHOK LEYLAND',
  },
  {
    image: '/assets/photogallery/2024/image2.png',
    name: 'VIPIN GUPTA',
    designation: 'CTO',
    company: 'STARBUCKS INDIA',
  },
  {
    image: '/assets/photogallery/2024/image3.png',
    name: 'VV BALAJI',
    designation: 'CTO',
    company: 'ICICI BANK',
  },
  {
    image: '/assets/photogallery/2024/image4.png',
    name: 'NARROTTAM SHARMA',
    designation: 'CIO',
    company: 'JUBILANT FOODWORKS',
  },
  {
    image: '/assets/photogallery/2024/image5.png',
    name: 'SAURABH TIWARI',
    designation: 'CTO',
    company: 'POLICYBAZAAR',
  },
  {
    image: '/assets/photogallery/2024/image6.png',
    name: 'SUMI VIVEK',
    designation: 'CHIEF DIGITAL & TRANSFORMATION OFFICER',
    company: 'TATA ELECTRONICS',
  },
  {
    image: '/assets/photogallery/2024/image7.png',
    name: 'AYAN DE',
    designation: 'HEAD - ENTERPRISE TECHNOLOGY',
    company: 'HDFC LIFE',
  },
  {
    image: '/assets/photogallery/2024/image8.png',
    name: 'KAUSTUBH DABRAL',
    designation: 'GLOBAL CIO',
    company: 'DABUR INDIA',
  },
  {
    image: '/assets/photogallery/2024/image9.png',
    name: 'MAHESH RAMAMOORTHY',
    designation: 'CIO',
    company: 'YES BANK',
  },
];

const highlights = Array.from({ length: 25 }, (_, index) => ({
  image: `/assets/photogallery/2024/photo${index + 1}.jpg`,
  name: `CIO-Choice ${index + 1}`,
  date: '2024',
}));

export default function MediaCoverage2017Page() {
  return (
    <main className="page-container">
      <section className="page-header">
        <h1>Gallery of Excellence – 2024</h1>
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
