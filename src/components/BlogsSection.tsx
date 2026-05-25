'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function BlogsSection() {
  const blogRefs = [
    useScrollAnimation({
      animationClass: 'animate-fade-in-left',
      initialTransform: 'translateX(-40px)',
      threshold: 0.12,
      once: false,
    }),

    useScrollAnimation({
      animationClass: 'animate-fade-in',
      initialTransform: 'translateY(40px)',
      threshold: 0.12,
      once: false,
    }),

    useScrollAnimation({
      animationClass: 'animate-fade-in-right',
      initialTransform: 'translateX(40px)',
      threshold: 0.12,
      once: false,
    }),
  ];

  const blogs = [
    {
      id: 1,
      slug: 'innovative-solutions',
      title: 'Innovative Solutions for every Business Success.',
      category: 'Business',
      author: 'Ellinien Loma',
      date: '28',
      month: 'FEB',
      image: '/assets/blogs/blog-1.webp',
    },

    {
      id: 2,
      slug: 'digital-transformation',
      title: 'Harnessing Digital Transform a Roadmap Businesses.',
      category: 'Business',
      author: 'Ellinien Loma',
      date: '28',
      month: 'FEB',
      image: '/assets/blogs/blog-1.webp',
    },

    {
      id: 3,
      slug: 'change-management',
      title: 'Mastering Change Management Lessons for Businesses.',
      category: 'Business',
      author: 'Ellinien Loma',
      date: '28',
      month: 'FEB',
      image: '/assets/blogs/blog-3.webp',
    },
  ];

  return (
    <section className="blogs-section">
      <div className="blogs-container">
        {/* HEADING */}
        <div className="blogs-heading">
          <span className="blogs-subtitle">
            <span className="blogs-subtitle-mark">⬢</span>

            <span className="blogs-subtitle-text">INSIGHTS & IDEAS</span>
          </span>

          <h2 className="blogs-title">
            Our <span>Blogs</span>
          </h2>
        </div>

        {/* BLOG GRID */}
        <div className="blogs-grid">
          {blogs.map((blog, index) => (
            <div className="blog-card" key={blog.id} ref={blogRefs[index]}>
              {/* IMAGE */}
              <div className="blog-image-wrapper">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={420}
                  height={320}
                  className="blog-image"
                  unoptimized
                />

                {/* DATE */}
                <div className="blog-date">
                  <h3>{blog.date}</h3>
                  <span>{blog.month}</span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="blog-category">{blog.category}</span>

                  <p>
                    By <span>{blog.author}</span>
                  </p>
                </div>

                <h4 className="blog-heading">{blog.title}</h4>

                <Link href={`/blog/${blog.slug}`} className="blog-readmore">
                  Read More
                  <span className="blog-arrow">
                    <ArrowUpRight size={16} />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* MORE BLOGS BUTTON */}
        <div className="blogs-more">
          <Link href="/blog" className="blogs-more-btn">
            <span>More Blogs</span>

            <span className="blogs-more-icon">
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
