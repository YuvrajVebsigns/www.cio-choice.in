'use client';

const leaders = [
  {
    image: '/assets/photogallery/2025/image1.png',
    name: 'DHEERAJ SINHA',
    designation: 'EVP & GLOBAL CIO',
    company: 'SUN PHARMA',
  },
  {
    image: '/assets/photogallery/2025/image2.png',
    name: 'AASHISH KSHETRY',
    designation: 'CIO & VP-IT',
    company: 'ASIAN PAINTS',
  },
  {
    image: '/assets/photogallery/2025/image3.png',
    name: 'NARENDRA SONAVANE',
    designation: 'SVP & GLOBAL HEAD, IS',
    company: 'INFOSYS',
  },
  {
    image: '/assets/photogallery/2025/image4.png',
    name: 'JYOTHIRLATHA B',
    designation: 'CIO',
    company: 'GODREJ CAPITAL',
  },
  {
    image: '/assets/photogallery/2025/image5.png',
    name: 'ROHIT KILAM',
    designation: 'CTO',
    company: 'HDFC LIFE',
  },
  {
    image: '/assets/photogallery/2025/image6.png',
    name: 'RAMESH NARAYANASWAMY',
    designation: 'CTO',
    company: 'ADITYA BIRLA CAPITAL',
  },
  {
    image: '/assets/photogallery/2025/image7.png',
    name: 'SUBHASH KELKAR',
    designation: 'CIO',
    company: 'BSE',
  },
  {
    image: '/assets/photogallery/2025/image8.png',
    name: 'RUCHA NANAVATI',
    designation: 'CIO',
    company: 'MAHINDRA GROUP',
  },
  {
    image: '/assets/photogallery/2025/image9.png',
    name: 'VISHAL BHATIA',
    designation: 'CDO',
    company: 'CANARA BANK',
  },
  {
    image: '/assets/photogallery/2025/image10.png',
    name: 'VINOD SIVARAMAKRISHNAN',
    designation: 'CDIO',
    company: 'ESSAR CAPITAL',
  },
];

const highlights = Array.from({ length: 56 }, (_, index) => ({
  image: `/assets/photogallery/2025/photo${index + 1}.jpg`,
  name: `CIO-Choice ${index + 1}`,
  date: '2025',
}));

export default function MediaCoverage2017Page() {
  return (
    <main className="page-container">
      <section className="page-header">
        <h1>Gallery of Excellence – 2025</h1>
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
