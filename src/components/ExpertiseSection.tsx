// 'use client';

// import Image from 'next/image';

// export default function AboutCioChoiceSection() {
//   const cards = [
//     {
//       // title: '2026 Red Carpet Night',
//       image: '/assets/aboutus/red-carpet-2026.png',
//     },
//     {
//       title: '2025 Red Carpet Night',
//       image: '/assets/aboutus/red-carpet-2025.png',
//     },
//     {
//       title: 'Recognized Brands',
//       image: '/assets/aboutus/recognized-brandss.png',
//     },
//     {
//       title: '2025 Year Book',
//       image: '/assets/aboutus/year-book.png',
//     },
//   ];

//   return (
//     <section className="about-cio-section">
//       <div className="about-cio-container">
//         <h2 className="about-cio-title">ABOUT CIO CHOICE</h2>

//         <p className="about-cio-description">
//           “CIO CHOICE” is a very powerful tool for organizations in the Information & Communications
//           Technology space to promote and market their products, services and solutions.
//         </p>

//         <div className="about-cio-grid">
//           {cards.map((card, index) => (
//             <div className="about-cio-card" key={index}>
//               <Image
//                 src={card.image}
//                 alt={card.title}
//                 width={260}
//                 height={320}
//                 className="about-cio-card-img"
//               />

//               {/* <div className="about-cio-card-content">
//                 <h3>{card.title}</h3>
//                 <span>view more &gt;&gt;</span>
//               </div> */}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import Image from 'next/image';

type AboutCard = {
  title: string;
  image: string;
};

export default function AboutCioChoiceSection() {
  const cards: AboutCard[] = [
    {
      title: '2026 Red Carpet Night',
      image: '/assets/aboutus/red-carpet-2026.png',
    },
    {
      title: '2025 Red Carpet Night',
      image: '/assets/aboutus/red-carpet-2025.png',
    },
    {
      title: 'Recognized Brands',
      image: '/assets/aboutus/recognized-brandss.png',
    },
    {
      title: '2025 Year Book',
      image: '/assets/aboutus/year-book.png',
    },
  ];

  return (
    <section className="about-cio-section">
      <div className="about-cio-container">
        <h2 className="about-cio-title">ABOUT CIO CHOICE</h2>

        <p className="about-cio-description">
          “CIO CHOICE” is a very powerful tool for organizations in the Information & Communications
          Technology space to promote and market their products, services and solutions.
        </p>

        <div className="about-cio-grid">
          {cards.map((card) => (
            <div className="about-cio-card" key={card.title}>
              <Image
                src={card.image}
                alt={card.title}
                width={260}
                height={320}
                className="about-cio-card-img"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
