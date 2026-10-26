import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import FoundersMessage from '@/components/FoundersMessage';
import ExpertiseSection from '@/components/ExpertiseSection';
// import TeamSection from '@/components/TeamSection';
// import KeyClient from '@/components/KeyClient';
import ProjectsSection from '@/components/ProjectsSection';
// import ResearchSection from '@/components/ResearchSection';
// import Brands from '@/components/Brands';
// import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import BlogsSection from '@/components/BlogsSection';
// import DialoguesSection from '@/components/DialoguesSection';

export const metadata: Metadata = {
  title: "CIO Choice | India's Most Trusted ICT Brand Recognition",
  description:
    "Discover CIO Choice, recognising ICT brands preferred by India's leading technology decision-makers through trust and industry recognition.",
  keywords: [
    'CIO Choice',
    'CIO Choice India',
    'ICT brand recognition',
    'trusted technology brands',
    'preferred ICT brands',
    'technology decision-makers India',
    'CIO awards',
    'IT brand recognition',
    'enterprise technology brands',
    'CORE Media',
  ],
  alternates: {
    canonical: 'https://ciochoice.com/',
  },
  openGraph: {
    title: 'CIO Choice | The Gold Seal of Trust',
    description:
      "Discover CIO Choice, recognising ICT brands preferred by India's leading technology decision-makers through trust and industry recognition.",
    type: 'website',
    siteName: 'CIO Choice',
    url: 'https://ciochoice.com/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CIO Choice | The Gold Seal of Trust',
    description:
      "Discover CIO Choice, recognising ICT brands preferred by India's leading technology decision-makers through trust and industry recognition.",
  },
};

export default function Home() {
  return (
    <main>
      {/* <div className="max-w-[1480px] mx-auto"> */}
      <HeroSection />
      <FoundersMessage />
      <ExpertiseSection />
      {/* <TeamSection />
      <KeyClient /> */}
      <ProjectsSection />
      {/* <ResearchSection /> */}
      {/* <Brands />
      <FAQSection /> */}
      <BlogsSection />
      <ContactSection />

      {/* <DialoguesSection /> */}
      {/* </div> */}
    </main>
  );
}
