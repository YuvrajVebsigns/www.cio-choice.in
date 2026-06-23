'use client';

const leaders = [
  {
    image: '/assets/photogallery/2020/image1.png',
    name: 'MAYUR DANAIT',
    designation: 'CIO',
    company: 'PIDILITE',
  },
  {
    image: '/assets/photogallery/2020/image2.png',
    name: 'NAFEES AHMED',
    designation: 'CIO',
    company: 'INDIABULLS',
  },
  {
    image: '/assets/photogallery/2020/image3.png',
    name: 'RAJESH UPPAL',
    designation: 'SR. ED-IT & HR',
    company: 'MARUTI SUZUKI INDIA',
  },
  {
    image: '/assets/photogallery/2020/image4.png',
    name: 'SANKARSON BANERJEE',
    designation: 'CIO',
    company: 'RBL BANK',
  },
  {
    image: '/assets/photogallery/2020/image5.png',
    name: 'SHIV KUMAR BHASIN',
    designation: 'COO & CTO',
    company: 'NSE',
  },
  {
    image: '/assets/photogallery/2020/image6.png',
    name: 'SOURAV SINHA',
    designation: 'CIO',
    company: 'INDIGO AIRLINES',
  },
  {
    image: '/assets/photogallery/2020/image7.png',
    name: 'SUMI VIVEK',
    designation: 'CIO',
    company: 'DIAGEO',
  },
  {
    image: '/assets/photogallery/2020/image8.png',
    name: 'UDAYRAJ PRABHU',
    designation: 'EVP BUSINESS PROCESS TRANSFORMATION & IT',
    company: 'MARICO',
  },
  {
    image: '/assets/photogallery/2020/image9.png',
    name: 'VENKATESH NATARAJAN',
    designation: 'CDO',
    company: 'ASHOK LEYLAND',
  },
];

const highlights = Array.from({ length: 34 }, (_, index) => ({
  image: `/assets/photogallery/2020/photo${index + 1}.jpg`,
  name: `CIO-Choice ${index + 1}`,
  date: '2020',
}));

export default function MediaCoverage2017Page() {
  return (
    <main className="page-container">
      <section className="page-header">
        <h1>Gallery of Excellence – 2020</h1>
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
