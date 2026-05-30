import { NextResponse } from 'next/server';

export async function GET() {
  const videos = [
    {
      id: 1,
      title: 'Netmagic DC5 BuildUp Film',
      slug: 'showcase-reel-creative-campaigns',
      category: 'Showreel',
      author: 'CORE Media',
      date: '10 MAY',
      // image: '/assets/blogs/blog-1.webp',
      videoUrl: 'https://www.youtube.com/embed/o4LM01aE1PQ',
    },
    {
      id: 2,
      title: 'Behind The Scenes: Production Day',
      slug: 'behind-the-scenes-production-day',
      category: 'BTS',
      author: 'CORE Media',
      date: '22 APR',
      // image: '/assets/blogs/blog-3.webp',
      videoUrl: 'https://www.youtube.com/embed/aQbU67vShTo',
    },
    {
      id: 3,
      title: 'Adstringo Launch Film',
      slug: 'client-spotlight-launch-story',
      category: 'Case Study',
      author: 'CORE Media',
      date: '01 MAR',
      image: '/assets/blogs/blog-1.webp',
      videoUrl: 'https://www.youtube.com/embed/t0G9AuwNJyI',
    },
    {
      id: 4,
      title: 'NetApp - SBI',
      slug: 'studio-techniques-lighting-grip',
      category: 'Tutorial',
      author: 'CORE Media',
      date: '15 FEB',
      image: '/assets/blogs/blog-2.webp',
      videoUrl: 'https://www.youtube.com/embed/-tW3ffpdTpE',
    },
    {
      id: 5,
      title: 'BSNL Dimension Data Global Cloud Exchange AV',
      slug: 'creative-direction-concept-to-screen',
      category: 'Case Study',
      author: 'CORE Media',
      date: '02 JAN',
      image: '/assets/blogs/blog-3.webp',
      videoUrl: 'https://www.youtube.com/embed/aQbU67vShTo',
    },
    {
      id: 6,
      title: 'CIOs singing the National Song - Vande Mataram',
      slug: 'client-testimonial-campaign-results',
      category: 'Testimonial',
      author: 'CORE Media',
      date: '28 DEC',
      image: '/assets/blogs/blog-2.webp',
      videoUrl: 'https://www.youtube.com/embed/hqLGiBrTOxU',
    },
  ];

  return NextResponse.json(videos);
}
