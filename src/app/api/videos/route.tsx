import { NextResponse } from 'next/server';

export async function GET() {
  const videos = [
    {
      id: 1,
      title: 'Showcase Reel: Creative Campaigns',
      slug: 'showcase-reel-creative-campaigns',
      category: 'Showreel',
      author: 'CORE Media',
      date: '10 MAY',
      image: '/assets/blogs/blog-1.webp',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    {
      id: 2,
      title: 'Behind The Scenes: Production Day',
      slug: 'behind-the-scenes-production-day',
      category: 'BTS',
      author: 'CORE Media',
      date: '22 APR',
      image: '/assets/blogs/blog-3.webp',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    {
      id: 3,
      title: 'Client Spotlight: Launch Story',
      slug: 'client-spotlight-launch-story',
      category: 'Case Study',
      author: 'CORE Media',
      date: '01 MAR',
      image: '/assets/blogs/blog-1.webp',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    {
      id: 4,
      title: 'Studio Techniques: Lighting & Grip',
      slug: 'studio-techniques-lighting-grip',
      category: 'Tutorial',
      author: 'CORE Media',
      date: '15 FEB',
      image: '/assets/blogs/blog-2.webp',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    {
      id: 5,
      title: 'Creative Direction: Concept to Screen',
      slug: 'creative-direction-concept-to-screen',
      category: 'Case Study',
      author: 'CORE Media',
      date: '02 JAN',
      image: '/assets/blogs/blog-3.webp',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    {
      id: 6,
      title: 'Client Testimonial: Campaign Results',
      slug: 'client-testimonial-campaign-results',
      category: 'Testimonial',
      author: 'CORE Media',
      date: '28 DEC',
      image: '/assets/blogs/blog-2.webp',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
  ];

  return NextResponse.json(videos);
}
