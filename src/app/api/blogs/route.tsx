import { NextResponse } from 'next/server';

export async function GET() {
  const blogs = [
    {
      id: 1,
      title: 'Innovative Solutions for every Business Success.',
      slug: 'slug-1',
      category: 'Business',
      author: 'Ellinien Loma',
      date: '28 FEB',
      image: '/assets/blogs/blog-1.webp',
    },
    {
      id: 2,
      title: 'Harnessing Digital Transform a Roadmap Businesses.',
      slug: 'slug-2',
      category: 'Business',
      author: 'Ellinien Loma',
      date: '28 FEB',
      image: '/assets/blogs/blog-3.webp',
    },
    {
      id: 3,
      title: 'Harnessing Digital Transform a Roadmap Businesses.',
      slug: 'slug-3',
      category: 'Business',
      author: 'Ellinien Loma',
      date: '28 FEB',
      image: '/assets/blogs/blog-3.webp',
    },
    {
      id: 4,
      title: 'Harnessing Digital Transform a Roadmap Businesses.',
      slug: 'slug-4',
      category: 'Business',
      author: 'Ellinien Loma',
      date: '28 FEB',
      image: '/assets/blogs/blog-3.webp',
    },
    {
      id: 5,
      title: 'Harnessing Digital Transform a Roadmap Businesses.',
      slug: 'slug-5',
      category: 'Business',
      author: 'Ellinien Loma',
      date: '28 FEB',
      image: '/assets/blogs/blog-3.webp',
    },
    {
      id: 6,
      title: 'Harnessing Digital Transform a Roadmap Businesses.',
      slug: 'slug-6',
      category: 'Business',
      author: 'Ellinien Loma',
      date: '28 FEB',
      image: '/assets/blogs/blog-3.webp',
    },
    {
      id: 7,
      title: 'Harnessing Digital Transform a Roadmap Businesses.',
      slug: 'slug-7',
      category: 'Business',
      author: 'Ellinien Loma',
      date: '28 FEB',
      image: '/assets/blogs/blog-3.webp',
    },
  ];

  return NextResponse.json(blogs);
}
