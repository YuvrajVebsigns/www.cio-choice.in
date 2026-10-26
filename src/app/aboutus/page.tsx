import type { Metadata } from 'next';
import AboutUsPage from './page-client';

export const metadata: Metadata = {
  title: 'About CIO Choice | ICT Brand Recognition Platform',
  description:
    'Learn how CIO Choice recognises preferred ICT products, services and solutions based on the choices of CIOs and technology decision-makers.',
  keywords: [
    'CIO Choice',
    'about CIO Choice',
    'ICT brand recognition',
    'CIO preferred brands',
    'ICT products and services',
    'technology decision-makers',
    'B2B technology platform',
    'CIO vendor collaboration',
    'trusted ICT brands',
    'CORE Media',
  ],
  alternates: { canonical: 'https://ciochoice.com/aboutus' },
  openGraph: {
    title: 'About CIO Choice | By the CIOs, For the CIOs',
    description:
      'Learn how CIO Choice recognises preferred ICT products, services and solutions based on the choices of CIOs and technology decision-makers.',
    type: 'website',
    siteName: 'CIO Choice',
    url: 'https://ciochoice.com/aboutus',
  },
};

export default function AboutUsRoute() {
  return <AboutUsPage />;
}
