'use client';

const leaders = [
  {
    image: '/assets/photogallery/2023/image1.png',
    name: 'ABHIJEET SINGH',
    designation: 'MEMBER OF EXECUTIVE MANAGEMENT & CHIEF TECHNOLOGY & DIGITAL OFFICER',
    company: 'HDFC LTD',
  },
  {
    image: '/assets/photogallery/2023/image2.png',
    name: 'BALJINDER SINGH',
    designation: 'GLOBAL HEAD OF ENTERPRISE DIGITAL TRANSFORMATION AND CIO EXL',
    company: 'EXL',
  },
  {
    image: '/assets/photogallery/2023/image3.png',
    name: 'EKHLAQUE BARI',
    designation: 'CIO',
    company: 'JUBILANT FOODWORKS',
  },
  {
    image: '/assets/photogallery/2023/image4.png',
    name: 'MAYANK BHARGAVA',
    designation: 'CHIEF INFORMATION & DIGITAL OFFICER',
    company: 'FORTIS HEALTHCARE',
  },
  {
    image: '/assets/photogallery/2023/image5.png',
    name: 'MANI MULKI',
    designation: 'OPERATING DIRECTOR TECHNOLOGY',
    company: 'KEDAARA CAPITAL',
  },
  {
    image: '/assets/photogallery/2023/image6.png',
    name: 'RAJESH UPPAL',
    designation: 'SENIOR EXECUTIVE DIRECTOR (HR & IT)',
    company: 'MARUTI SUZUKI',
  },
  {
    image: '/assets/photogallery/2023/image7.png',
    name: 'SANKARSON BANERJEE',
    designation: 'CONSULTANT - TECHNOLOGY',
    company: 'RBL BANK',
  },
  {
    image: '/assets/photogallery/2023/image8.png',
    name: 'SUHAIL GHAI',
    designation: 'CHIEF DIGITAL AND INFORMATION OFFICE',
    company: 'MAX LIFE',
  },
  {
    image: '/assets/photogallery/2023/image9.png',
    name: 'VINOD BHAT',
    designation: 'CIO & CHIEF ETHICS COUNSELLOR',
    company: 'TATA SIA AIRLINES LTD',
  },
];

const highlights = Array.from({ length: 60 }, (_, index) => ({
  image: `/assets/photogallery/2023/photo${index + 1}.jpg`,
  name: `CIO-Choice ${index + 1}`,
  date: '2023',
}));

export default function MediaCoverage2017Page() {
  return (
    <main className="page-container">
      <section className="page-header">
        <h1>Gallery of Excellence – 2023</h1>
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
