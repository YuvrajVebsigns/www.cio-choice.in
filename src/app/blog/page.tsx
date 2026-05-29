// // 'use client';

// // import Image from 'next/image';
// // import Link from 'next/link';
// // import { ArrowUpRight, Search } from 'lucide-react';
// // import { useEffect, useState } from 'react';

// // interface Blog {
// //   id: number;
// //   slug: string;
// //   title: string;
// //   category: string;
// //   author: string;
// //   date: string;
// //   image: string;
// // }

// // export default function BlogPage() {
// //   const [blogs, setBlogs] = useState<Blog[]>([]);

// //   useEffect(() => {
// //     fetch('/api/blogs')
// //       .then((res) => res.json())
// //       .then((data) => setBlogs(data))
// //       .catch(() => setBlogs([]));
// //   }, []);

// //   return (
// //     <section className="blogpage-section">
// //       <div className="blogpage-container">
// //         {/* LEFT CONTENT */}
// //         <div className="blogpage-left">
// //           {blogs.map((blog) => (
// //             <div className="blogpage-card" key={blog.id}>
// //               <div className="blogpage-image-wrap">
// //                 <Image
// //                   src={blog.image}
// //                   alt={blog.title}
// //                   width={900}
// //                   height={500}
// //                   className="blogpage-image"
// //                 />

// //                 <div className="blogpage-date">
// //                   <h3>{blog.date.split(' ')[0]}</h3>
// //                   <span>{blog.date.split(' ')[1]}</span>
// //                 </div>
// //               </div>

// //               <div className="blogpage-content">
// //                 <div className="blogpage-meta">
// //                   <span className="blogpage-category">{blog.category}</span>

// //                   <p>By {blog.author}</p>
// //                 </div>

// //                 <h3>{blog.title}</h3>

// //                 <Link href={`/blog/${blog.slug}`} className="blogpage-readmore">
// //                   Read More
// //                   <span>
// //                     <ArrowUpRight size={16} />
// //                   </span>
// //                 </Link>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* SIDEBAR */}
// //         <aside className="blogpage-sidebar">
// //           {/* SEARCH */}
// //           <div className="sidebar-box">
// //             <h4>Search here</h4>

// //             <div className="sidebar-search">
// //               <input type="text" placeholder="Search here" />
// //               <button>
// //                 <Search size={16} />
// //               </button>
// //             </div>
// //           </div>

// //           {/* RELATED POSTS */}
// //           <div className="sidebar-box">
// //             <h4>Related post</h4>

// //             {blogs.slice(0, 3).map((blog) => (
// //               <div className="related-post" key={blog.id}>
// //                 <Image src={blog.image} alt={blog.title} width={80} height={80} />

// //                 <div>
// //                   <p>{blog.title}</p>
// //                   <span>{blog.date}</span>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           {/* CATEGORIES */}
// //           <div className="sidebar-box">
// //             <h4>Categories</h4>

// //             <ul className="sidebar-categories">
// //               <li>
// //                 Innovation <span>(03)</span>
// //               </li>
// //               <li>
// //                 Leadership <span>(02)</span>
// //               </li>
// //               <li>
// //                 Technology <span>(05)</span>
// //               </li>
// //               <li>
// //                 Marketing <span>(06)</span>
// //               </li>
// //               <li>
// //                 Management <span>(04)</span>
// //               </li>
// //             </ul>
// //           </div>

// //           {/* TAGS */}
// //           <div className="sidebar-box">
// //             <h4>Tags</h4>

// //             <div className="sidebar-tags">
// //               <span>Growth</span>
// //               <span>Success</span>
// //               <span>Innovation</span>
// //               <span>Focus</span>
// //               <span>Drive</span>
// //               <span>Business</span>
// //             </div>
// //           </div>
// //         </aside>
// //       </div>
// //     </section>
// //   );
// // }

// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { ArrowUpRight, ChevronRight } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// interface Blog {
//   id: number;
//   slug: string;
//   title: string;
//   category: string;
//   author: string;
//   date: string;
//   image: string;
//   text: string;
// }

// type AnimatedBlogCardProps = {
//   blog: Blog;
//   index: number;
//   variant?: string;
// };

// function AnimatedBlogCard({ blog, index, variant = 'animate-fade-in' }: AnimatedBlogCardProps) {
//   const initialTransform = variant.includes('left')
//     ? 'translateX(-40px)'
//     : variant.includes('right')
//       ? 'translateX(40px)'
//       : 'translateY(40px)';

//   const ref = useScrollAnimation<HTMLDivElement>({
//     animationClass: variant,
//     initialTransform,
//     threshold: 0.12,
//     once: false,
//   });

//   return (
//     <article ref={ref} className="blogpage-card" style={{ transitionDelay: `${index * 60}ms` }}>
//       <div className="blogpage-image-wrap">
//         <Image
//           src={blog.image}
//           alt={blog.title}
//           width={420}
//           height={260}
//           className="blogpage-image"
//         />

//         <div className="blogpage-date">
//           <h3>{blog.date.split(' ')[0]}</h3>
//           <span>{blog.date.split(' ')[1]}</span>
//         </div>
//       </div>

//       <div className="blogpage-content">
//         <div className="blogpage-meta">
//           <span className="blogpage-category">{blog.category}</span>
//           <p>By {blog.author}</p>
//         </div>

//         <h4 className="blogpage-heading">{blog.title}</h4>

//         <Link href={`/blog/${blog.slug}`} className="blogpage-readmore">
//           Read More
//           <span className="blogpage-arrow">
//             <ArrowUpRight size={12} />
//           </span>
//         </Link>
//       </div>
//     </article>
//   );
// }

// export default function BlogPage() {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const heroMediaRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-right',
//     initialTransform: 'translateX(40px)',
//     threshold: 0.12,
//     once: false,
//   });
//   const heroContentRef = useScrollAnimation<HTMLDivElement>({
//     animationClass: 'animate-fade-in-left',
//     initialTransform: 'translateX(-40px)',
//     threshold: 0.12,
//     once: false,
//   });

//   const blogCards = Array.from({ length: 4 }, () => blogs.slice(0, 3)).flat();
//   const filteredCards = blogCards.filter((blog) => {
//     const searchValue = searchTerm.trim().toLowerCase();

//     if (!searchValue) {
//       return true;
//     }

//     return [blog.title, blog.category, blog.author, blog.text]
//       .join(' ')
//       .toLowerCase()
//       .includes(searchValue);
//   });

//   useEffect(() => {
//     fetch('/api/blogs')
//       .then((res) => res.json())
//       .then((data) => setBlogs(data))
//       .catch(() => setBlogs([]));
//   }, []);

//   return (
//     <>
//       {/* HERO SECTION */}

//       {/* <br />
//       <br /> */}
//       {/* <br />
//       <br /> */}

//       <section className="blog-hero">
//         <div className="blog-hero-media" ref={heroMediaRef}>
//           <Image
//             src="/assets/blogs/blog-1.webp"
//             alt="Read Blog"
//             fill
//             priority
//             className="blog-hero-image"
//           />
//         </div>

//         <div className="blog-hero-overlay"></div>

//         <div className="blog-hero-content" ref={heroContentRef}>
//           <h1>Read Blog</h1>

//           <div className="blog-breadcrumb">
//             <Link href="/" className="blog-breadcrumb-home">
//               🏦 Home
//             </Link>

//             <span>&gt;</span>

//             <p>Blog</p>
//           </div>
//         </div>
//       </section>

//       <br />

//       <section className="blogpage-section">
//         <div className="blogpage-container">
//           <form className="blogpage-searchbar" onSubmit={(event) => event.preventDefault()}>
//             <input
//               type="text"
//               placeholder="Search blog here"
//               value={searchTerm}
//               onChange={(event) => setSearchTerm(event.target.value)}
//             />

//             <button type="submit" aria-label="Search blog">
//               Search
//             </button>
//           </form>

//           <br />
//           <br />

//           <div className="blogpage-grid">
//             {filteredCards.map((blog, index) => {
//               const variant =
//                 index % 3 === 0
//                   ? 'animate-fade-in-left'
//                   : index % 3 === 1
//                     ? 'animate-fade-in'
//                     : 'animate-fade-in-right';

//               return (
//                 <AnimatedBlogCard
//                   key={`${blog.id}-${index}`}
//                   blog={blog}
//                   index={index}
//                   variant={variant}
//                 />
//               );
//             })}
//           </div>

//           <div className="blogpage-pagination" aria-label="Blog pagination">
//             <button className="blogpage-page blogpage-page-active" type="button">
//               01
//             </button>

//             <button className="blogpage-page" type="button">
//               02
//             </button>

//             <button
//               className="blogpage-page blogpage-page-arrow"
//               type="button"
//               aria-label="Next page"
//             >
//               <ChevronRight size={14} />
//             </button>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronRight, ChevronLeft, Heart, MessageCircle } from 'lucide-react';
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

function getBlogDescription(blog: WebsiteBlogItem) {
  return blog.excerpt || blog.seo?.metaDescription || '';
}

type AnimatedBlogCardProps = {
  blog: WebsiteBlogItem;
  index: number;
  variant?: string;
};

function AnimatedBlogCard({ blog, index, variant = 'animate-fade-in' }: AnimatedBlogCardProps) {
  const likesCount =
    typeof blog.engagement?.likes === 'number' && blog.engagement.likes > 0
      ? blog.engagement.likes
      : 12;
  const commentsCount =
    typeof blog.engagement?.commentsCount === 'number' && blog.engagement.commentsCount > 0
      ? blog.engagement.commentsCount
      : 4;

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
          src={getBlogImage(blog)}
          alt={blog.title}
          width={420}
          height={260}
          className="blogpage-image"
          unoptimized
        />

        {/* <div className="blogpage-date">
          <h3>{formatBlogDate(blog.publishedAt).day}</h3>
          <span>{formatBlogDate(blog.publishedAt).month}</span>
        </div> */}
      </div>

      <div className="blogpage-content">
        <div className="blogpage-meta">
          <span className="blogpage-category">{getBlogCategory(blog)}</span>
          <p>By {getBlogAuthor(blog)}</p>
        </div>

        <h4 className="blogpage-heading">{blog.title}</h4>

        <Link href={`/blog/${blog.slug}`} className="blogpage-readmore">
          Read More
          <span className="blogpage-arrow">
            <ArrowUpRight size={12} />
          </span>
          <br />
          <br />
          <span className="blogpage-engagement" aria-label="Blog engagement">
            <button
              type="button"
              className="blogpage-engagement-item"
              aria-label={`${likesCount} likes`}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                // future: handle like
              }}
            >
              <Heart size={14} />
              <span>{likesCount}</span>
            </button>

            <button
              type="button"
              className="blogpage-engagement-item"
              aria-label={`${commentsCount} comments`}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                // future: open comments
              }}
            >
              <MessageCircle size={14} />
              <span>{commentsCount}</span>
            </button>
          </span>
        </Link>
      </div>
    </article>
  );
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<WebsiteBlogItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const CLIENT_PAGINATION_THRESHOLD = 200; // max items to fetch for client-side paging
  const [totalPages, setTotalPages] = useState<number>(1);
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

  const blogCards = blogs;
  const filteredCards = blogCards.filter((blog) => {
    const searchValue = searchTerm.trim().toLowerCase();

    if (!searchValue) {
      return true;
    }

    return [blog.title, getBlogCategory(blog), getBlogAuthor(blog), getBlogDescription(blog)]
      .join(' ')
      .toLowerCase()
      .includes(searchValue);
  });

  useEffect(() => {
    let isMounted = true;

    async function loadBlogs() {
      setIsLoading(true);
      setError(null);

      try {
        // First request page=1 to get meta.total quickly
        const firstResp = await fetchWebsiteBlogs(1, Math.max(10, limit), searchTerm);

        if (!isMounted) return;

        const total = firstResp.data?.meta?.total ?? firstResp.data?.data?.length ?? 0;

        // If total is small, fetch all items and use client-side pagination with 9-on-first-page rule
        if (total > 0 && total <= CLIENT_PAGINATION_THRESHOLD) {
          const allResp = await fetchWebsiteBlogs(1, total, searchTerm);
          const allItems = allResp.data?.data ?? [];

          // compute total pages for 9 on first page, 10 thereafter
          const pages = total <= 9 ? 1 : 1 + Math.ceil((total - 9) / 10);
          setTotalPages(pages);

          // set blogs for current page from the allItems
          const pageItems = (() => {
            if (page === 1) return allItems.slice(0, 9);
            const start = 9 + (page - 2) * 10;
            return allItems.slice(start, start + 10);
          })();

          setBlogs(pageItems);
        } else {
          // fallback to server pagination
          const resp = await fetchWebsiteBlogs(page, limit, searchTerm);
          const items = resp.data?.data ?? [];
          setBlogs(items);
          const meta = resp.data?.meta;
          setTotalPages(
            meta?.totalPages ?? Math.max(1, Math.ceil((meta?.total ?? items.length) / limit)),
          );
        }
      } catch (fetchError) {
        if (isMounted) {
          setBlogs([]);
          setError(fetchError instanceof Error ? fetchError.message : 'Failed to load blogs');
          setStatusMessage('Backend connection failed. Check token/domain/CORS.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadBlogs();

    return () => {
      isMounted = false;
    };
  }, [page, limit, searchTerm]);

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

          {isLoading ? <p>Loading blogs...</p> : null}

          {!isLoading && error ? <p>{error}</p> : null}

          {!isLoading && !error && statusMessage ? (
            <p style={{ marginBottom: '16px', opacity: 0.75 }}>{statusMessage}</p>
          ) : null}

          <div className="blogpage-grid">
            {!isLoading && !error && filteredCards.length === 0 ? (
              <div className="blogpage-card" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                <p>No blogs found.</p>
              </div>
            ) : null}

            {filteredCards.map((blog, index) => {
              const variant =
                index % 3 === 0
                  ? 'animate-fade-in-left'
                  : index % 3 === 1
                    ? 'animate-fade-in'
                    : 'animate-fade-in-right';

              return <AnimatedBlogCard key={blog.id} blog={blog} index={index} variant={variant} />;
            })}
          </div>

          <div className="blogpage-pagination" aria-label="Blog pagination">
            <button
              className="blogpage-page"
              type="button"
              aria-label="Previous page"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={isLoading || page <= 1}
            >
              <ChevronLeft size={14} />
            </button>

            <button className="blogpage-page blogpage-page-active" type="button" disabled>
              {String(page).padStart(2, '0')}
            </button>

            <button
              className="blogpage-page blogpage-page-arrow"
              type="button"
              aria-label="Next page"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={isLoading || page >= totalPages}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
