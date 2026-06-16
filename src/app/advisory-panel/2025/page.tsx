// import Link from 'next/link';

// export const metadata = {
//   title: 'Advisory Panel 2025',
//   description:
//     'Explore the Advisory Panel 2025 page for CIO Choice advisory members, insights, and recognition highlights.',
// };

// export default function AdvisoryPanel2025Page() {
//   return (
//     <main className="advisory-page">
//       <div className="advisory-members-heading-card">
//         <br />
//         <h2>Advisory Panel 2025</h2>
//         <br />
//         <p>
//           Trusted leaders from enterprise and technology who help shape the CIO Choice recognition
//           program.
//         </p>
//       </div>

//       {/* <section className="advisory-page-section">
//         <article className="advisory-page-card">
//           <h2 className="advisory-page-card-heading">Trusted Industry Leadership</h2>
//           <p className="advisory-page-card-text">
//             Advisory Panel 2025 unites senior CIOs and IT decision-makers who shape the methodology
//             and credibility of CIO Choice recognition programs.
//           </p>
//         </article>

//         <article className="advisory-page-card">
//           <h2 className="advisory-page-card-heading">Why This Panel Matters</h2>
//           <p className="advisory-page-card-text">
//             The panel validates award selection, supports community-driven research, and ensures
//             recognition is aligned with real enterprise priorities.
//           </p>
//         </article>

//         <div className="advisory-page-card">
//           <h2 className="advisory-page-card-heading">Panel Highlights</h2>
//           <ul className="advisory-page-list">
//             <li className="advisory-page-list-item">
//               <span className="advisory-page-list-item-label">01 Expert governance</span>
//               <p className="advisory-page-list-item-text">
//                 A curated community of CIO leaders reviewing industry performance and category
//                 recognition.
//               </p>
//             </li>
//             <li className="advisory-page-list-item">
//               <span className="advisory-page-list-item-label">02 Strategic insight</span>
//               <p className="advisory-page-list-item-text">
//                 Actionable guidance for brands that want to align with CIO priorities and enterprise
//                 trust.
//               </p>
//             </li>
//             <li className="advisory-page-list-item">
//               <span className="advisory-page-list-item-label">03 Broad industry credibility</span>
//               <p className="advisory-page-list-item-text">
//                 Panel endorsement strengthens recognition value and amplifies member reputation.
//               </p>
//             </li>
//           </ul>
//         </div>
//       </section> */}
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

function extractMembers(page: WebsitePage | null): AdvisoryMember[] {
  if (!page) return [];

  const allMembers: AdvisoryMember[] = [];
  const seen = new Set<string>();

  function search(value: unknown) {
    if (Array.isArray(value)) {
      value.forEach(search);
      return;
    }

    if (!isRecord(value)) return;

    const author = typeof value.author === 'string' ? value.author.trim() : '';
    const role = typeof value.role === 'string' ? value.role.trim() : '';
    const quote = typeof value.quote === 'string' ? value.quote : '';
    const avatar = typeof value.avatar === 'string' ? value.avatar : '';

    if (author) {
      const key = `${author.toLowerCase()}-${role.toLowerCase()}`;

      if (!seen.has(key)) {
        seen.add(key);
        allMembers.push({ author, role, quote, avatar });
      }
    }

    Object.values(value).forEach(search);
  }

  search(page);

  return allMembers;
}

export default function AdvisoryPanel2025Page() {
  const [page, setPage] = useState<WebsitePage | null>(null);
  const [members, setMembers] = useState<AdvisoryMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPage() {
      setIsLoading(true);

      const data = await fetchWebsitePageBySlug('advisory-panel-2025');

      setPage(data);
      setMembers(extractMembers(data));
      setIsLoading(false);
    }

    loadPage();
  }, []);

  if (isLoading) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <main className="advisory-page">
      <div className="advisory-members-heading-card">
        <br />
        <h2>{page?.title || 'Advisory Panel 2025'}</h2>
        <br />
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
                    <div className="advisory-avatar advisory-avatar-placeholder" />
                  )}

                  <h3>{member.author}</h3>
                  <p>{member.role}</p>

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
