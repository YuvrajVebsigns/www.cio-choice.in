'use client';

const leaders = [
  {
    image: '/assets/photogallery/2019/image1.png',
    name: 'ARIVAZHAGAN R',
    designation: 'HEAD - IT & MEMBER OF EXEC MANAGEMENT',
    company: 'HDFC LTD',
  },

  {
    image: '/assets/photogallery/2019/image2.png',
    name: 'ARVIND SIVARAMAKRISHNAN',
    designation: 'CIO',
    company: 'APOLLO HOSPITALS',
  },
  {
    image: '/assets/photogallery/2019/image3.png',
    name: 'EKHLAQUE BARI',
    designation: 'EXECUTIVE VP & CTO',
    company: 'FULLERTON INDIA',
  },
  {
    image: '/assets/photogallery/2019/image1.png',
    name: 'ARIVAZHAGAN R',
    designation: 'HEAD - IT & MEMBER OF EXEC MANAGEMENT',
    company: 'HDFC LTD',
  },
  {
    image: '/assets/photogallery/2019/image2.png',
    name: 'ARVIND SIVARAMAKRISHNAN',
    designation: 'CIO',
    company: 'APOLLO HOSPITALS',
  },
  {
    image: '/assets/photogallery/2019/image3.png',
    name: 'EKHLAQUE BARI',
    designation: 'EXECUTIVE VP & CTO',
    company: 'FULLERTON INDIA',
  },
  {
    image: '/assets/photogallery/2019/image4.png',
    name: 'KALPANA MANIAR',
    designation: 'PRESIDENT & GROUP CIO',
    company: 'EDELWEISS FINANCIAL SERVICES',
  },
  {
    image: '/assets/photogallery/2019/image5.png',
    name: 'MANI MULKI',
    designation: 'CIO',
    company: 'TATA CAPITAL',
  },
  {
    image: '/assets/photogallery/2019/image6.png',
    name: 'SANJAY KOTHA',
    designation: 'PRESIDENT & GROUP CIO',
    company: 'ADANI GROUP',
  },
  {
    image: '/assets/photogallery/2019/image7.png',
    name: 'SENDIL KUMAR V',
    designation: 'VP - IT',
    company: 'VALUE SERVICES',
  },
  {
    image: '/assets/photogallery/2019/image8.png',
    name: 'SUBRATA DEY',
    designation: 'EXECUTIVE VP & HEAD - GLOBAL IT',
    company: 'GODREJ CONSUMER PRODUCTS',
  },
  {
    image: '/assets/photogallery/2019/image9.png',
    name: 'VIJAY SETHI',
    designation: 'CIO, CHRO, HEAD CSR',
    company: 'HERO MOTOCORP',
  },
];

const highlights = Array.from({ length: 42 }, (_, index) => ({
  image: `/assets/photogallery/2019/photo${index + 1}.jpg`,
  name: `CIO-Choice ${index + 1}`,
  date: '2019',
}));

export default function MediaCoverage2017Page() {
  return (
    <main className="page-container">
      <section className="page-header">
        <h1>Gallery of Excellence – 2019</h1>
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
