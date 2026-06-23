// 'use client';

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

// const highlights = [
//   {
//     image: '/assets/photogallery/2013/photo1.jpg',
//     name: 'Media Coverage',
//     date: 'January 2017',
//   },
//   {
//     image: '/assets/photogallery/2013/photo2.jpg',
//     name: 'Leadership Interview',
//     date: 'March 2017',
//   },
//   {
//     image: '/assets/photogallery/2013/photo3.jpg',
//     name: 'Technology Summit',
//     date: 'June 2017',
//   },
//   {
//     image: '/assets/photogallery/2013/photo4.jpg',
//     name: 'Industry Recognition',
//     date: 'September 2017',
//   },
//   {
//     image: '/assets/photogallery/2013/photo5.jpg',
//     name: 'Awards Coverage',
//     date: 'December 2017',
//   },
// ];

// export default function MediaCoverage2017Page() {
//   return (
//     <main className="page-container">
//       <section className="page-header">
//         <h1>Media Coverage - 2017</h1>
//         <p>
//           Interactive recap of CORE Media’s 2017 media coverage and press momentum.
//         </p>
//       </section>

//       <section className="media-two-sections">
//         <div className="media-section-card">
//           <h2>Advisory Leaders</h2>

//           <div className="leaders-grid">
//             {leaders.map((item) => (
//               <div className="media-profile-card" key={item.name}>
//                 <img src={item.image} alt={item.name} />
//                 <h3>{item.name}</h3>
//                 <p>{item.designation}</p>
//                 <span>{item.company}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="media-section-card">
//           <h2>Media Highlights</h2>

//           <div className="highlights-grid">
//             {highlights.map((item) => (
//               <div className="media-profile-card" key={item.name}>
//                 <img src={item.image} alt={item.name} />
//                 <h3>{item.name}</h3>
//                 <p>{item.date}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

'use client';

const leaders = [
  {
    image: '/assets/media/aarti-singh.png',
    name: 'Aarti Singh',
    designation: 'Enterprise CIO',
    company: 'Mahindra Group',
  },
  {
    image: '/assets/media/gautam-datta.png',
    name: 'Gautam Datta',
    designation: 'Chief Digital Officer',
    company: 'Bajaj Allianz',
  },
  {
    image: '/assets/media/jayant-goyal.png',
    name: 'Jayant Goyal',
    designation: 'CIO',
    company: 'Coforge',
  },
];

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
