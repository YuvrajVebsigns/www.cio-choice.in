// 'use client';

// import Link from 'next/link';
// import { useScrollAnimation } from '@/hooks/useScrollAnimation';
// import ContactSection from '@/components/ContactSection';

// export default function ContactPage() {
//   const heroContentRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-left',
//     initialTransform: 'translateX(-40px)',
//     threshold: 0.12,
//     once: false,
//   });

//   return (
//     <main>
//       <ContactSection />
//     </main>
//   );
// }

'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ContactSection from '@/components/ContactSection';

export default function ContactPage() {
  const heroContentRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.12,
    once: false,
  });

  return (
    <main>
      <div ref={heroContentRef} className="contact-page-wrapper">
        <ContactSection />
      </div>
    </main>
  );
}
