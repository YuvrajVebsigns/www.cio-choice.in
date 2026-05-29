// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { ArrowUpRight } from 'lucide-react';
// import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// export default function BlogsSection() {
//   const blogRefs = [
//     useScrollAnimation({
//       animationClass: 'animate-fade-in-left',
//       initialTransform: 'translateX(-40px)',
//       threshold: 0.12,
//       once: false,
//     }),

//     useScrollAnimation({
//       animationClass: 'animate-fade-in',
//       initialTransform: 'translateY(40px)',
//       threshold: 0.12,
//       once: false,
//     }),

//     useScrollAnimation({
//       animationClass: 'animate-fade-in-right',
//       initialTransform: 'translateX(40px)',
//       threshold: 0.12,
//       once: false,
//     }),
//   ];

//   const blogs = [
//     {
//       id: 1,
//       slug: 'bfsi-ai-cloud-digital-transformation',
//       title: 'BFSI Leaders Drive Digital Transformation with AI & Cloud',
//       category: 'Business',
//       author: 'Ellinien Loma',
//       date: '28',
//       month: 'FEB',
//       image: '/assets/blogs/blog-1.png',
//     },

//     {
//       id: 2,
//       slug: 'digital-transformation',
//       title: 'Infrastructure Modernization and Virtual Workloads On Cloud.',
//       category: 'Business',
//       author: 'Ellinien Loma',
//       date: '28',
//       month: 'FEB',
//       image: '/assets/blogs/blog-2.png',
//     },

//     {
//       id: 3,
//       slug: 'healthcare-ai-hybrid-cloud',
//       title: 'Healthcare Firms Accelerate AI & Hybrid Cloud Adoption',
//       category: 'Business',
//       author: 'Ellinien Loma',
//       date: '28',
//       month: 'FEB',
//       image: '/assets/blogs/blog-3.png',
//     },
//   ];

//   return (
//     <section className="blogs-section">
//       <div className="blogs-container">
//         {/* HEADING */}
//         <div className="blogs-heading">
//           <span className="blogs-subtitle">
//             <span className="blogs-subtitle-mark">⬢</span>

//             <span className="blogs-subtitle-text">INSIGHTS & IDEAS</span>
//           </span>

//           <h2 className="blogs-title">
//             Our <span>Blogs</span>
//           </h2>
//         </div>

//         {/* BLOG GRID */}
//         <div className="blogs-grid">
//           {blogs.map((blog, index) => (
//             <div className="blog-card" key={blog.id} ref={blogRefs[index]}>
//               {/* IMAGE */}
//               <div className="blog-image-wrapper">
//                 <Image
//                   src={blog.image}
//                   alt={blog.title}
//                   width={420}
//                   height={320}
//                   className="blog-image"
//                   unoptimized
//                 />

//                 {/* DATE */}
//                 <div className="blog-date">
//                   <h3>{blog.date}</h3>
//                   <span>{blog.month}</span>
//                 </div>
//               </div>

//               {/* CONTENT */}
//               <div className="blog-content">
//                 <div className="blog-meta">
//                   <span className="blog-category">{blog.category}</span>

//                   <p>
//                     By <span>{blog.author}</span>
//                   </p>
//                 </div>

//                 <h4 className="blog-heading">{blog.title}</h4>

//                 <Link href={`/blog/${blog.slug}`} className="blog-readmore">
//                   Read More
//                   <span className="blog-arrow">
//                     <ArrowUpRight size={16} />
//                   </span>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* MORE BLOGS BUTTON */}
//         <div className="blogs-more">
//           <Link href="/blog" className="blogs-more-btn">
//             <span>More Blogs </span>

//             <span className="blogs-more-icon">
//               <ArrowUpRight size={16} />
//             </span>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Heart, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fetchWebsiteBlogs, type WebsiteBlogItem } from '@/services/blogs.service';

function getBlogCategory(blog: WebsiteBlogItem) {
  return blog.websites?.[0]?.name || blog.tags?.[0] || 'Blog';
}

function getBlogAuthor(blog: WebsiteBlogItem) {
  return blog.author?.fullName || 'CORE Media Team';
}

function getBlogImage(blog: WebsiteBlogItem) {
  return blog.featureImage || blog.seo?.ogImage || '/assets/blogs/blog-1.png';
}

export default function BlogsSection() {
  const [blogs, setBlogs] = useState<WebsiteBlogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const getTemporaryLikesCount = (blog: WebsiteBlogItem) =>
    typeof blog.engagement?.likes === 'number' && blog.engagement.likes > 0
      ? blog.engagement.likes
      : 12;

  const getTemporaryCommentsCount = (blog: WebsiteBlogItem) =>
    typeof blog.engagement?.commentsCount === 'number' && blog.engagement.commentsCount > 0
      ? blog.engagement.commentsCount
      : 4;

  useEffect(() => {
    let isMounted = true;

    async function loadBlogs() {
      try {
        const response = await fetchWebsiteBlogs(1, 3);

        if (isMounted) {
          setBlogs(response.data?.data?.slice(0, 3) ?? []);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setBlogs([]);
          setIsLoading(false);
        }
      }
    }

    loadBlogs();

    return () => {
      isMounted = false;
    };
  }, []);

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
          {!isLoading && blogs.length === 0 ? (
            <div className="blog-card" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
              <p>No blogs found right now.</p>
            </div>
          ) : null}

          {blogs.map((blog, index) => (
            <div className="blog-card" key={blog.id} ref={blogRefs[index]}>
              {/* IMAGE */}
              <div className="blog-image-wrapper">
                <Image
                  src={getBlogImage(blog)}
                  alt={blog.title}
                  width={420}
                  height={320}
                  className="blog-image"
                  unoptimized
                />

                {/* DATE */}
                {/* <div className="blog-date">
                  <h3>{formatBlogDate(blog.publishedAt).day}</h3>
                  <span>{formatBlogDate(blog.publishedAt).month}</span>
                </div> */}
              </div>

              {/* CONTENT */}
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="blog-category">{getBlogCategory(blog)}</span>

                  <p>
                    By <span>{getBlogAuthor(blog)}</span>
                  </p>
                </div>

                <h4 className="blog-heading">{blog.title}</h4>

                <Link href={`/blog/${blog.slug}`} className="blog-readmore">
                  <span className="blog-readmore-text">Read More</span>
                  <span className="blog-arrow" aria-hidden="true">
                    <ArrowUpRight size={16} />
                  </span>

                  <span className="blog-engagement" aria-label="Blog engagement">
                    <button
                      type="button"
                      className="blog-engagement-item"
                      aria-label={`${getTemporaryLikesCount(blog)} likes`}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        // future: handle like action here
                      }}
                    >
                      <Heart size={14} />
                      <span>{getTemporaryLikesCount(blog)}</span>
                    </button>

                    <button
                      type="button"
                      className="blog-engagement-item"
                      aria-label={`${getTemporaryCommentsCount(blog)} comments`}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        // future: open comments or navigate to comments
                      }}
                    >
                      <MessageCircle size={14} />
                      <span>{getTemporaryCommentsCount(blog)}</span>
                    </button>
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* MORE BLOGS BUTTON */}
        <div className="blogs-more">
          <Link href="/blog" className="blogs-more-btn">
            <span>More Blogs </span>

            <span className="blogs-more-icon">
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
