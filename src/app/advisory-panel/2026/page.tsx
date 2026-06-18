// 'use client';

// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import { fetchWebsitePageBySlug, type WebsitePage } from '@/services/pages.services';

// type AdvisoryMember = {
//   author: string;
//   role: string;
//   quote?: string;
//   avatar?: string;
// };

// function isRecord(value: unknown): value is Record<string, unknown> {
//   return typeof value === 'object' && value !== null;
// }

// function extractMembers(page: WebsitePage | null): AdvisoryMember[] {
//   if (!page) return [];

//   const allMembers: AdvisoryMember[] = [];
//   const seen = new Set<string>();

//   function search(value: unknown) {
//     if (Array.isArray(value)) {
//       value.forEach(search);
//       return;
//     }

//     if (!isRecord(value)) return;

//     const author = typeof value.author === 'string' ? value.author.trim() : '';
//     const role = typeof value.role === 'string' ? value.role.trim() : '';
//     const quote = typeof value.quote === 'string' ? value.quote : '';
//     const avatar = typeof value.avatar === 'string' ? value.avatar : '';

//     if (author) {
//       const key = `${author.toLowerCase()}-${role.toLowerCase()}`;

//       if (!seen.has(key)) {
//         seen.add(key);
//         allMembers.push({ author, role, quote, avatar });
//       }
//     }

//     Object.values(value).forEach(search);
//   }

//   search(page);

//   return allMembers;
// }

// export default function AdvisoryPanel2026Page() {
//   const [page, setPage] = useState<WebsitePage | null>(null);
//   const [members, setMembers] = useState<AdvisoryMember[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     async function loadPage() {
//       try {
//         setIsLoading(true);

//         const data = await fetchWebsitePageBySlug('advisory-panel-2026');

//         setPage(data);
//         setMembers(extractMembers(data));
//       } catch (error) {
//         // Handle error silently
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     loadPage();
//   }, []);

//   if (isLoading) {
//     return <div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>;
//   }

//   return (
//     <main className="advisory-page">
//       <div className="advisory-members-heading-card">
//         <br />
//         <h2>{page?.title || 'Advisory Panel 2026'}</h2>
//         <br />
//         <p>
//           Trusted leaders from enterprise and technology who help shape the CIO Choice recognition
//           program.
//         </p>
//       </div>

//       <section className="advisory-panel-section">
//         <div className="advisory-container">
//           {members.length === 0 ? (
//             <p style={{ textAlign: 'center', padding: '40px 0' }}>
//               No advisory panel members available.
//             </p>
//           ) : (
//             <div className="advisory-grid">
//               {members.map((member, index) => (
//                 <article key={`${member.author}-${index}`} className="advisory-card">
//                   {member.avatar ? (
//                     <Image
//                       src={member.avatar}
//                       alt={member.author}
//                       width={120}
//                       height={120}
//                       className="advisory-avatar"
//                       unoptimized
//                     />
//                   ) : (
//                     <div className="advisory-avatar advisory-avatar-placeholder" />
//                   )}

//                   <h3>{member.author}</h3>
//                   <p>{member.role}</p>

//                   {member.quote ? <blockquote>{member.quote}</blockquote> : null}
//                 </article>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>
//     </main>
//   );
// }

'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchWebsitePageBySlug, type WebsitePage } from '@/services/pages.services';

type AdvisoryMember = {
  author: string;
  role: string;
  quote?: string;
  avatar?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function getImageUrl(value: unknown): string {
  if (typeof value === 'string') return value;

  if (isRecord(value)) {
    return (
      getString(value.url) ||
      getString(value.original) ||
      getString(value.medium) ||
      getString(value.small) ||
      getString(value.thumbnail)
    );
  }

  return '';
}

function extractMembers(page: WebsitePage | null): AdvisoryMember[] {
  if (!page) return [];

  const members: AdvisoryMember[] = [];
  const seen = new Set<string>();

  function addMember(item: Record<string, unknown>) {
    const author =
      getString(item.author) ||
      getString(item.name) ||
      getString(item.fullName) ||
      getString(item.title);

    const role =
      getString(item.role) ||
      getString(item.designation) ||
      getString(item.position) ||
      getString(item.company) ||
      getString(item.subtitle);

    const quote =
      getString(item.quote) ||
      getString(item.description) ||
      getString(item.message) ||
      getString(item.content);

    const avatar =
      getImageUrl(item.avatar) ||
      getImageUrl(item.image) ||
      getImageUrl(item.photo) ||
      getImageUrl(item.profileImage);

    if (!author) return;

    const key = `${author.toLowerCase()}-${role.toLowerCase()}`;

    if (!seen.has(key)) {
      seen.add(key);
      members.push({ author, role, quote, avatar });
    }
  }

  function search(value: unknown) {
    if (Array.isArray(value)) {
      value.forEach(search);
      return;
    }

    if (!isRecord(value)) return;

    if (
      value.type === 'testimonialSection' &&
      isRecord(value.data) &&
      Array.isArray(value.data.testimonials)
    ) {
      value.data.testimonials.forEach((item) => {
        if (isRecord(item)) addMember(item);
      });
    }

    if (Array.isArray(value.testimonials)) {
      value.testimonials.forEach((item) => {
        if (isRecord(item)) addMember(item);
      });
    }

    addMember(value);

    Object.values(value).forEach(search);
  }

  search(page);

  return members;
}

export default function AdvisoryPanel2026Page() {
  const [page, setPage] = useState<WebsitePage | null>(null);
  const [members, setMembers] = useState<AdvisoryMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPage() {
      try {
        setIsLoading(true);

        const data = await fetchWebsitePageBySlug('advisory-panel-2026');

        setPage(data);
        setMembers(extractMembers(data));
      } catch (error) {
        setMembers([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadPage();
  }, []);

  if (isLoading) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <main className="advisory-page">
      <div className="advisory-members-heading-card">
        <h2>{page?.title || 'Advisory Panel 2026'}</h2>

        <p>
          Trusted leaders from enterprise and technology who help shape the CIO Choice recognition
          program.
        </p>
      </div>

      <section className="advisory-panel-section">
        <div className="advisory-container">
          {members.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '40px 0' }}>
              No advisory panel members available.
            </p>
          ) : (
            <div className="advisory-grid">
              {members.map((member, index) => (
                <article key={`${member.author}-${index}`} className="advisory-card">
                  {member.avatar ? (
                    <Image
                      src={member.avatar}
                      alt={member.author}
                      width={120}
                      height={120}
                      className="advisory-avatar"
                      unoptimized
                    />
                  ) : (
                    <div className="advisory-avatar advisory-avatar-placeholder">
                      {member.author.charAt(0)}
                    </div>
                  )}

                  <h3>{member.author}</h3>

                  {member.role ? <p>{member.role}</p> : null}

                  {member.quote ? <blockquote>{member.quote}</blockquote> : null}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
