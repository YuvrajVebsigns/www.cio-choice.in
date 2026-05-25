import { NextResponse } from 'next/server';

export async function GET() {
  const events = [
    {
      id: 1,
      title: 'Corporate Leadership Summit',
      slug: 'corporate-leadership-summit',
      category: 'Corporate',
      organizer: 'CORE Media',
      date: '12 NOV',
      image: '/assets/blogs/blog-1.webp',
    },
    {
      id: 2,
      title: 'Digital Transformation Spotlight',
      slug: 'digital-transformation-spotlight',
      category: 'Conference',
      organizer: 'CORE Media',
      date: '04 DEC',
      image: '/assets/blogs/blog-3.webp',
    },
    {
      id: 3,
      title: 'Experiential Video Launch Event',
      slug: 'experiential-video-launch-event',
      category: 'Product Launch',
      organizer: 'CORE Media',
      date: '20 JAN',
      image: '/assets/blogs/blog-1.webp',
    },
  ];

  return NextResponse.json(events);
}
