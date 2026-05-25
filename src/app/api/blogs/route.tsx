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
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
    },
    {
      id: 2,
      title: 'Harnessing Digital Transform a Roadmap Businesses.',
      slug: 'slug-2',
      category: 'Business',
      author: 'Ellinien Loma',
      date: '28 FEB',
      image: '/assets/blogs/blog-3.webp',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
    },
    {
      id: 3,
      title: 'Harnessing Digital Transform a Roadmap Businesses.',
      slug: 'slug-3',
      category: 'Business',
      author: 'Ellinien Loma',
      date: '28 FEB',
      image: '/assets/blogs/blog-3.webp',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
    },
    {
      id: 4,
      title: 'Harnessing Digital Transform a Roadmap Businesses.',
      slug: 'slug-4',
      category: 'Business',
      author: 'Ellinien Loma',
      date: '28 FEB',
      image: '/assets/blogs/blog-3.webp',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
    },
    {
      id: 5,
      title: 'Harnessing Digital Transform a Roadmap Businesses.',
      slug: 'slug-5',
      category: 'Business',
      author: 'Ellinien Loma',
      date: '28 FEB',
      image: '/assets/blogs/blog-3.webp',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
    },
    {
      id: 6,
      title: 'Harnessing Digital Transform a Roadmap Businesses.',
      slug: 'slug-6',
      category: 'Business',
      author: 'Ellinien Loma',
      date: '28 FEB',
      image: '/assets/blogs/blog-3.webp',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
    },
  ];

  return NextResponse.json(blogs);
}
