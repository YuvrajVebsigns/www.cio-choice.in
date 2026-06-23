'use client';

const leaders = [
  {
    image: '/assets/photogallery/2021/image1.png',
    name: 'GOUTAM DATTA',
    designation: 'CIO & CDO',
    company: 'BAJAJ ALLIANZ LIFE INSURANCE',
  },
  {
    image: '/assets/photogallery/2021/image2.png',
    name: 'NITIN AGARWAL',
    designation: 'PRESIDENT & GROUP CIO, CTO & CDO',
    company: 'EDELWEISS FINANCIAL SERVICES',
  },
  {
    image: '/assets/photogallery/2021/image3.png',
    name: 'PRAKASH RAMCHANDRAN',
    designation: 'CTO',
    company: "BYJU'S",
  },
  {
    image: '/assets/photogallery/2021/image4.png',
    name: 'PRASAD BADIWALE',
    designation: 'JOINT PRESIDENT',
    company: 'BIRLA MANAGEMENT SERVICES',
  },
  {
    image: '/assets/photogallery/2021/image5.png',
    name: 'SANJAY KOTHA',
    designation: 'JOINT PRESIDENT & GROUP CIO',
    company: 'ADANI ENTERPRISES',
  },
  {
    image: '/assets/photogallery/2021/image6.png',
    name: 'SREEJI GOPINATH',
    designation: 'GLOBAL CIO',
    company: 'LUPIN',
  },
  {
    image: '/assets/photogallery/2021/image7.png',
    name: 'TARUN ANAND',
    designation: 'HEAD - GLOBAL IT',
    company: 'DABUR',
  },
  {
    image: '/assets/photogallery/2021/image8.png',
    name: 'VINOD SIVARAMA KRISHNAN',
    designation: 'CIO',
    company: 'INDUS TOWERS',
  },
  {
    image: '/assets/photogallery/2021/image9.png',
    name: 'VV BALAJI',
    designation: 'HEAD - BUSINESS TECHNOLOGY GROUP',
    company: 'ICICI BANK',
  },
];

const highlights = Array.from({ length: 49 }, (_, index) => ({
  image: `/assets/photogallery/2021/photo${index + 1}.jpg`,
  name: `CIO-Choice ${index + 1}`,
  date: '2021',
}));

export default function MediaCoverage2017Page() {
  return (
    <main className="page-container">
      <section className="page-header">
        <h1>Gallery of Excellence – 2021</h1>
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
