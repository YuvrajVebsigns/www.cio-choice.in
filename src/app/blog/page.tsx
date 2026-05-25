'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Blog {
  id: number;
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  image: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch(() => setBlogs([]));
  }, []);

  return (
    <section className="blogpage-section">
      <div className="blogpage-container">
        {/* LEFT CONTENT */}
        <div className="blogpage-left">
          {blogs.map((blog) => (
            <div className="blogpage-card" key={blog.id}>
              <div className="blogpage-image-wrap">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={900}
                  height={500}
                  className="blogpage-image"
                />

                <div className="blogpage-date">
                  <h3>{blog.date.split(' ')[0]}</h3>
                  <span>{blog.date.split(' ')[1]}</span>
                </div>
              </div>

              <div className="blogpage-content">
                <div className="blogpage-meta">
                  <span className="blogpage-category">{blog.category}</span>

                  <p>By {blog.author}</p>
                </div>

                <h3>{blog.title}</h3>

                <Link href={`/blog/${blog.slug}`} className="blogpage-readmore">
                  Read More
                  <span>
                    <ArrowUpRight size={16} />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* SIDEBAR */}
        <aside className="blogpage-sidebar">
          {/* SEARCH */}
          <div className="sidebar-box">
            <h4>Search here</h4>

            <div className="sidebar-search">
              <input type="text" placeholder="Search here" />
              <button>
                <Search size={16} />
              </button>
            </div>
          </div>

          {/* RELATED POSTS */}
          <div className="sidebar-box">
            <h4>Related post</h4>

            {blogs.slice(0, 3).map((blog) => (
              <div className="related-post" key={blog.id}>
                <Image src={blog.image} alt={blog.title} width={80} height={80} />

                <div>
                  <p>{blog.title}</p>
                  <span>{blog.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* CATEGORIES */}
          <div className="sidebar-box">
            <h4>Categories</h4>

            <ul className="sidebar-categories">
              <li>
                Innovation <span>(03)</span>
              </li>
              <li>
                Leadership <span>(02)</span>
              </li>
              <li>
                Technology <span>(05)</span>
              </li>
              <li>
                Marketing <span>(06)</span>
              </li>
              <li>
                Management <span>(04)</span>
              </li>
            </ul>
          </div>

          {/* TAGS */}
          <div className="sidebar-box">
            <h4>Tags</h4>

            <div className="sidebar-tags">
              <span>Growth</span>
              <span>Success</span>
              <span>Innovation</span>
              <span>Focus</span>
              <span>Drive</span>
              <span>Business</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
