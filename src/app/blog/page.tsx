// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { ArrowUpRight, Search } from 'lucide-react';
// import { useEffect, useState } from 'react';

// interface Blog {
//   id: number;
//   slug: string;
//   title: string;
//   category: string;
//   author: string;
//   date: string;
//   image: string;
// }

// export default function BlogPage() {
//   const [blogs, setBlogs] = useState<Blog[]>([]);

//   useEffect(() => {
//     fetch('/api/blogs')
//       .then((res) => res.json())
//       .then((data) => setBlogs(data))
//       .catch(() => setBlogs([]));
//   }, []);

//   return (
//     <section className="blogpage-section">
//       <div className="blogpage-container">
//         {/* LEFT CONTENT */}
//         <div className="blogpage-left">
//           {blogs.map((blog) => (
//             <div className="blogpage-card" key={blog.id}>
//               <div className="blogpage-image-wrap">
//                 <Image
//                   src={blog.image}
//                   alt={blog.title}
//                   width={900}
//                   height={500}
//                   className="blogpage-image"
//                 />

//                 <div className="blogpage-date">
//                   <h3>{blog.date.split(' ')[0]}</h3>
//                   <span>{blog.date.split(' ')[1]}</span>
//                 </div>
//               </div>

//               <div className="blogpage-content">
//                 <div className="blogpage-meta">
//                   <span className="blogpage-category">{blog.category}</span>

//                   <p>By {blog.author}</p>
//                 </div>

//                 <h3>{blog.title}</h3>

//                 <Link href={`/blog/${blog.slug}`} className="blogpage-readmore">
//                   Read More
//                   <span>
//                     <ArrowUpRight size={16} />
//                   </span>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* SIDEBAR */}
//         <aside className="blogpage-sidebar">
//           {/* SEARCH */}
//           <div className="sidebar-box">
//             <h4>Search here</h4>

//             <div className="sidebar-search">
//               <input type="text" placeholder="Search here" />
//               <button>
//                 <Search size={16} />
//               </button>
//             </div>
//           </div>

//           {/* RELATED POSTS */}
//           <div className="sidebar-box">
//             <h4>Related post</h4>

//             {blogs.slice(0, 3).map((blog) => (
//               <div className="related-post" key={blog.id}>
//                 <Image src={blog.image} alt={blog.title} width={80} height={80} />

//                 <div>
//                   <p>{blog.title}</p>
//                   <span>{blog.date}</span>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* CATEGORIES */}
//           <div className="sidebar-box">
//             <h4>Categories</h4>

//             <ul className="sidebar-categories">
//               <li>
//                 Innovation <span>(03)</span>
//               </li>
//               <li>
//                 Leadership <span>(02)</span>
//               </li>
//               <li>
//                 Technology <span>(05)</span>
//               </li>
//               <li>
//                 Marketing <span>(06)</span>
//               </li>
//               <li>
//                 Management <span>(04)</span>
//               </li>
//             </ul>
//           </div>

//           {/* TAGS */}
//           <div className="sidebar-box">
//             <h4>Tags</h4>

//             <div className="sidebar-tags">
//               <span>Growth</span>
//               <span>Success</span>
//               <span>Innovation</span>
//               <span>Focus</span>
//               <span>Drive</span>
//               <span>Business</span>
//             </div>
//           </div>
//         </aside>
//       </div>
//     </section>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Blog {
  id: number;
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  image: string;
  text: string;
}

type AnimatedBlogCardProps = {
  blog: Blog;
  index: number;
  variant?: string;
};

function AnimatedBlogCard({ blog, index, variant = 'animate-fade-in' }: AnimatedBlogCardProps) {
  const initialTransform = variant.includes('left')
    ? 'translateX(-40px)'
    : variant.includes('right')
      ? 'translateX(40px)'
      : 'translateY(40px)';

  const ref = useScrollAnimation<HTMLDivElement>({
    animationClass: variant,
    initialTransform,
    threshold: 0.12,
    once: false,
  });

  return (
    <article ref={ref} className="blogpage-card" style={{ transitionDelay: `${index * 60}ms` }}>
      <div className="blogpage-image-wrap">
        <Image
          src={blog.image}
          alt={blog.title}
          width={420}
          height={260}
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

        <h4 className="blogpage-heading">{blog.title}</h4>

        <Link href={`/blog/${blog.slug}`} className="blogpage-readmore">
          Read More
          <span className="blogpage-arrow">
            <ArrowUpRight size={12} />
          </span>
        </Link>
      </div>
    </article>
  );
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const heroMediaRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-right',
    initialTransform: 'translateX(40px)',
    threshold: 0.12,
    once: false,
  });
  const heroContentRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.12,
    once: false,
  });

  const blogCards = Array.from({ length: 4 }, () => blogs.slice(0, 3)).flat();
  const filteredCards = blogCards.filter((blog) => {
    const searchValue = searchTerm.trim().toLowerCase();

    if (!searchValue) {
      return true;
    }

    return [blog.title, blog.category, blog.author, blog.text]
      .join(' ')
      .toLowerCase()
      .includes(searchValue);
  });

  useEffect(() => {
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch(() => setBlogs([]));
  }, []);

  return (
    <>
      {/* HERO SECTION */}

      {/* <br />
      <br /> */}
      {/* <br />
      <br /> */}

      <section className="blog-hero">
        <div className="blog-hero-media" ref={heroMediaRef}>
          <Image
            src="/assets/blogs/blog-1.webp"
            alt="Read Blog"
            fill
            priority
            className="blog-hero-image"
          />
        </div>

        <div className="blog-hero-overlay"></div>

        <div className="blog-hero-content" ref={heroContentRef}>
          <h1>Read Blog</h1>

          <div className="blog-breadcrumb">
            <Link href="/" className="blog-breadcrumb-home">
              🏦 Home
            </Link>

            <span>&gt;</span>

            <p>Blog</p>
          </div>
        </div>
      </section>

      <br />

      <section className="blogpage-section">
        <div className="blogpage-container">
          <form className="blogpage-searchbar" onSubmit={(event) => event.preventDefault()}>
            <input
              type="text"
              placeholder="Search blog here"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />

            <button type="submit" aria-label="Search blog">
              Search
            </button>
          </form>

          <br />
          <br />

          <div className="blogpage-grid">
            {filteredCards.map((blog, index) => {
              const variant =
                index % 3 === 0
                  ? 'animate-fade-in-left'
                  : index % 3 === 1
                    ? 'animate-fade-in'
                    : 'animate-fade-in-right';

              return (
                <AnimatedBlogCard
                  key={`${blog.id}-${index}`}
                  blog={blog}
                  index={index}
                  variant={variant}
                />
              );
            })}
          </div>

          <div className="blogpage-pagination" aria-label="Blog pagination">
            <button className="blogpage-page blogpage-page-active" type="button">
              01
            </button>

            <button className="blogpage-page" type="button">
              02
            </button>

            <button
              className="blogpage-page blogpage-page-arrow"
              type="button"
              aria-label="Next page"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
