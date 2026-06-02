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
import {
  fetchWebsiteBlogComments,
  fetchWebsiteBlogs,
  submitWebsiteBlogLike,
  type WebsiteBlogComment,
  type WebsiteBlogItem,
} from '@/services/blogs.service';

function getBlogCategory(blog: WebsiteBlogItem) {
  return blog.websites?.[0]?.name || blog.tags?.[0] || 'Blog';
}

function getBlogImage(blog: WebsiteBlogItem) {
  return blog.featureImage || blog.seo?.ogImage || '/assets/blogs/blog-1.png';
}

export default function BlogsSection() {
  const [blogs, setBlogs] = useState<WebsiteBlogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [likedBlogs, setLikedBlogs] = useState<Set<string>>(new Set());
  const [openCommentsBlogId, setOpenCommentsBlogId] = useState<string | null>(null);
  const [commentsByBlogId, setCommentsByBlogId] = useState<Record<string, WebsiteBlogComment[]>>({});
  const [loadingCommentsFor, setLoadingCommentsFor] = useState<string | null>(null);

  const LIKED_KEY = 'likedBlogs';

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

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(LIKED_KEY);
      if (!raw) return;

      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) {
        setLikedBlogs(new Set(arr.map(String)));
      }
    } catch {
      setLikedBlogs(new Set());
    }
  }, []);

  function saveLikedBlogs(next: Set<string>) {
    try {
      window.localStorage.setItem(LIKED_KEY, JSON.stringify(Array.from(next)));
    } catch {
      // ignore
    }
  }

  function addLikedBlog(id: string | number) {
    setLikedBlogs((prev) => {
      const next = new Set(prev);
      next.add(String(id));
      saveLikedBlogs(next);
      return next;
    });
  }

  function removeLikedBlog(id: string | number) {
    setLikedBlogs((prev) => {
      const next = new Set(prev);
      next.delete(String(id));
      saveLikedBlogs(next);
      return next;
    });
  }

  function getLikesCount(blog: WebsiteBlogItem) {
    return typeof blog.engagement?.likes === 'number' && blog.engagement.likes > 0
      ? blog.engagement.likes
      : 0;
  }

  function getCommentsCount(blog: WebsiteBlogItem) {
    return typeof blog.engagement?.commentsCount === 'number' ? blog.engagement.commentsCount : 0;
  }

  function getCommentAuthor(comment: WebsiteBlogComment) {
    return comment.name || 'Guest';
  }

  function getCommentMessage(comment: WebsiteBlogComment) {
    return comment.message || '';
  }

  async function handleLikeClick(e: React.MouseEvent<HTMLButtonElement>, blogId?: string) {
    e.stopPropagation();
    e.preventDefault();

    if (!blogId) return;

    const wasLiked = likedBlogs.has(String(blogId));

    if (wasLiked) {
      setBlogs((prev) =>
        prev.map((blog) =>
          blog.id === blogId
            ? {
                ...blog,
                engagement: {
                  ...blog.engagement,
                  likes: Math.max(0, (blog.engagement?.likes ?? 0) - 1),
                },
              }
            : blog,
        ),
      );

      removeLikedBlog(blogId);
      return;
    }

    setBlogs((prev) =>
      prev.map((blog) =>
        blog.id === blogId
          ? {
              ...blog,
              engagement: {
                ...blog.engagement,
                likes: (blog.engagement?.likes ?? 0) + 1,
              },
            }
          : blog,
      ),
    );

    addLikedBlog(blogId);

    try {
      await submitWebsiteBlogLike(blogId);
    } catch (error) {
      console.error('Like failed:', error);

      setBlogs((prev) =>
        prev.map((blog) =>
          blog.id === blogId
            ? {
                ...blog,
                engagement: {
                  ...blog.engagement,
                  likes: Math.max(0, (blog.engagement?.likes ?? 1) - 1),
                },
              }
            : blog,
        ),
      );

      removeLikedBlog(blogId);
    }
  }

  async function handleCommentToggle(e: React.MouseEvent<HTMLButtonElement>, blogId?: string) {
    e.stopPropagation();
    e.preventDefault();

    if (!blogId) return;

    const nextOpen = openCommentsBlogId === blogId ? null : blogId;
    setOpenCommentsBlogId(nextOpen);

    if (!nextOpen) return;
    if (commentsByBlogId[blogId]) return;

    setLoadingCommentsFor(blogId);

    try {
      const response = await fetchWebsiteBlogComments(blogId);

      setCommentsByBlogId((prev) => ({
        ...prev,
        [blogId]: (response.data ?? []).filter((comment) => comment.isApproved !== false),
      }));
    } finally {
      setLoadingCommentsFor(null);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function loadBlogs() {
      try {
        const response = await fetchWebsiteBlogs(1, 3);

        if (isMounted) {
          setBlogs(response.data?.data?.slice(0, 3) ?? []);
          setIsLoading(false);
        }
      } catch {
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
        <div className="blogs-heading">
          <span className="blogs-subtitle">
            <span className="blogs-subtitle-mark">⬢</span>
            <span className="blogs-subtitle-text">INSIGHTS & IDEAS</span>
          </span>

          <h2 className="blogs-title">
            Our <span>Blogs</span>
          </h2>
        </div>

        <div className="blogs-grid">
          {!isLoading && blogs.length === 0 ? (
            <div className="blog-card" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
              <p>No blogs found right now.</p>
            </div>
          ) : null}

          {blogs.map((blog, index) => {
            const liked = likedBlogs.has(String(blog.id));

            return (
              <div className="blog-card" key={String(blog.id)} ref={blogRefs[index]}>
                <div className="blog-image-wrapper">
                  <Image
                    src={getBlogImage(blog)}
                    alt={blog.title}
                    width={420}
                    height={320}
                    className="blog-image"
                    unoptimized
                  />
                </div>

                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="blog-category">{getBlogCategory(blog)}</span>
                  </div>

                  <h4 className="blog-heading">{blog.title}</h4>

                  <div className="blogpage-footer">
                    <Link href={`/blog/${blog.slug}`} className="blog-readmore">
                      <span className="blog-readmore-text">Read More</span>
                      <span className="blog-arrow" aria-hidden="true">
                        <ArrowUpRight size={16} />
                      </span>
                    </Link>

                    <span className="blog-engagement" aria-label="Blog engagement">
                      <button
                        type="button"
                        className={`blog-engagement-item ${liked ? 'liked' : ''}`}
                        aria-label={`${getLikesCount(blog)} likes`}
                        onClick={(e) => handleLikeClick(e, blog.id)}
                        style={liked ? { color: '#e53935' } : undefined}
                      >
                        <Heart size={14} fill={liked ? '#e53935' : 'none'} />
                        <span>{getLikesCount(blog)}</span>
                      </button>

                      <button
                        type="button"
                        className="blog-engagement-item"
                        aria-label={`${getCommentsCount(blog)} comments`}
                        onClick={(e) => handleCommentToggle(e, blog.id)}
                      >
                        <MessageCircle size={14} />
                        <span>{getCommentsCount(blog)}</span>
                      </button>
                    </span>
                  </div>

                  {openCommentsBlogId === blog.id ? (
                    <div
                      className="blog-inline-comments"
                      style={{
                        marginTop: 16,
                        paddingTop: 16,
                        borderTop: '1px solid rgba(0,0,0,0.08)',
                      }}
                    >
                      {loadingCommentsFor === blog.id ? <p>Loading comments...</p> : null}

                      {!loadingCommentsFor && (commentsByBlogId[blog.id]?.length ?? 0) === 0 ? (
                        <p style={{ opacity: 0.7 }}>No comments yet.</p>
                      ) : null}

                      <div style={{ display: 'grid', gap: 12 }}>
                        {(commentsByBlogId[blog.id] ?? []).map((comment, commentIndex) => (
                          <div
                            key={comment.id ?? `${blog.id}-${commentIndex}`}
                            style={{
                              background: 'rgba(255,255,255,0.75)',
                              borderRadius: 12,
                              padding: '10px 12px',
                            }}
                          >
                            <strong style={{ display: 'block', marginBottom: 4 }}>
                              {getCommentAuthor(comment)}
                            </strong>

                            <p style={{ margin: 0, lineHeight: 1.6 }}>
                              {getCommentMessage(comment)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

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