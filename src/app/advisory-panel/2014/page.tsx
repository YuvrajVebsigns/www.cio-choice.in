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

        allMembers.push({
          author,
          role,
          quote,
          avatar,
        });
      }
    }

    Object.values(value).forEach(search);
  }

  search(page);

  return allMembers;
}

export default function AdvisoryPanel2014Page() {
  const [page, setPage] = useState<WebsitePage | null>(null);
  const [members, setMembers] = useState<AdvisoryMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPage() {
      try {
        setIsLoading(true);

        const data = await fetchWebsitePageBySlug('advisory-panel-2014');

        setPage(data);
        setMembers(extractMembers(data));
      } catch (error) {
        // Handle error silently
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
        <br />
        <h2>{page?.title || 'Advisory Panel 2014'}</h2>
        <br />
        <p>
          Trusted leaders from enterprise and technology who help shape the CIO Choice recognition
          program.
        </p>
      </div>

      <section className="advisory-panel-section">
        <div className="advisory-container">
          {members.length === 0 ? (
            <p
              style={{
                textAlign: 'center',
                padding: '40px 0',
              }}
            >
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
