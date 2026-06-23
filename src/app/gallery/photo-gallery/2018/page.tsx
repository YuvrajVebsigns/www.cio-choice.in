'use client';

const leaders = [
  {
    image: '/assets/photogallery/2018/image1.png',
    name: 'BHAVIN PUROHIT',
    // designation: 'Enterprise CIO',
    company: 'CIO - Welspun',
  },
  {
    image: '/assets/photogallery/2018/image2.png',
    name: 'GS RAVI KUMAR',
    // designation: 'Chief Digital Officer',
    company: 'CIO - GATI LTD',
  },
  {
    image: '/assets/photogallery/2018/image3.png',
    name: 'MAYUR DANAIT',
    // designation: 'CIO',
    company: 'LUPIN',
  },
  {
    image: '/assets/photogallery/2018/image4.png',
    name: 'MONIKA PHARTYAL',
    // designation: 'Enterprise CIO',
    company: 'HEAD IT - 3M INDIA',
  },
  {
    image: '/assets/photogallery/2018/image5.png',
    name: 'MRINAL CHATTERGEE',
    // designation: 'Chief Digital Officer',
    company: 'DIRECTOR TECH - INDIA PAYMENTS AMAZON INDIA',
  },
  {
    image: '/assets/photogallery/2018/image6.png',
    name: 'MUKESG RATHI',
    // designation: 'CIO',
    company: 'CIO DR. REDDY LABORATORIES',
  },
  {
    image: '/assets/photogallery/2018/image7.png',
    name: 'RAMANDEEP SINGH VIRDI',
    // designation: 'Enterprise CIO',
    company: 'SR VICE PRESIDENT IT JUBILANT FOODWORKS',
  },
  {
    image: '/assets/photogallery/2018/image8.png',
    name: 'SUBODH DUBEY',
    // designation: 'Chief Digital Officer',
    company: 'GROUP CIO SHAPOORJI PALLONJI GROUP',
  },
  {
    image: '/assets/photogallery/2018/image9.png',
    name: 'THOMSON THOMAS',
    // designation: 'CIO',
    company: 'EXECUTIVE VICE PRESIDENT BUSINESS SYSTEMS & TECHNOLOGY HDFC STANDARD LIFE INSURANCE',
  },
];

const highlights = Array.from({ length: 52 }, (_, index) => ({
  image: `/assets/photogallery/2018/photo${index + 1}.jpg`,
  name: `CIO-Choice ${index + 1}`,
  date: '2018',
}));

export default function MediaCoverage2017Page() {
  return (
    <main className="page-container">
      <section className="page-header">
        <h1>Gallery of Excellence – 2018</h1>
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
                {/* <p>{item.designation}</p> */}
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
