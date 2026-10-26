'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchWebsitePageBySlug, type WebsitePage } from '@/services/pages.services';

type AdvisoryPanelProps = {
  year: string;
};

type AdvisoryMember = {
  author: string;
  role: string;
  quote: string;
  avatar: string;
};

const FALLBACK_AVATAR = '/assets/team/1.jpg';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function getImageUrl(value: unknown): string {
  if (typeof value === 'string') return value.trim();
  if (!isRecord(value)) return '';

  const variants = isRecord(value.urlVariants) ? value.urlVariants : null;

  return (
    getString(value.url) ||
    getString(value.src) ||
    getString(value.original) ||
    getString(value.medium) ||
    getString(value.small) ||
    getString(value.thumbnail) ||
    getString(variants?.large) ||
    getString(variants?.medium) ||
    getString(variants?.thumbnail)
  );
}

function extractMembers(page: WebsitePage | null): AdvisoryMember[] {
  if (!page) return [];

  const members: AdvisoryMember[] = [];
  const seen = new Set<string>();

  function addMember(value: Record<string, unknown>, allowTitle = false) {
    const author =
      getString(value.author) ||
      getString(value.name) ||
      getString(value.fullName) ||
      (allowTitle ? getString(value.title) : '');
    if (!author) return;

    const role =
      getString(value.role) ||
      getString(value.designation) ||
      getString(value.position) ||
      getString(value.company) ||
      getString(value.subtitle);
    const quote =
      getString(value.quote) ||
      getString(value.description) ||
      getString(value.message) ||
      getString(value.content);
    const avatar =
      getImageUrl(value.avatar) ||
      getImageUrl(value.image) ||
      getImageUrl(value.photo) ||
      getImageUrl(value.profileImage);
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

    if (Array.isArray(value.testimonials)) {
      value.testimonials.forEach((item) => {
        if (isRecord(item)) addMember(item, true);
      });
    }

    if (
      value.type === 'testimonialSection' &&
      isRecord(value.data) &&
      Array.isArray(value.data.testimonials)
    ) {
      value.data.testimonials.forEach((item) => {
        if (isRecord(item)) addMember(item, true);
      });
    }

    addMember(value);
    Object.values(value).forEach(search);
  }

  search(page);

  return members.sort((first, second) =>
    first.author.localeCompare(second.author, undefined, { sensitivity: 'base' }),
  );
}

export default function AdvisoryPanel({ year }: AdvisoryPanelProps) {
  const [page, setPage] = useState<WebsitePage | null>(null);
  const [members, setMembers] = useState<AdvisoryMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadPage() {
      setIsLoading(true);

      try {
        const data = await fetchWebsitePageBySlug(`advisory-panel-${year}`);
        if (!isMounted) return;

        setPage(data);
        setMembers(extractMembers(data));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Failed to load advisory panel for ${year}.`, error);
        if (isMounted) {
          setPage(null);
          setMembers([]);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void loadPage();

    return () => {
      isMounted = false;
    };
  }, [year]);

  if (isLoading) {
    return <div className="advisory-page-loading">Loading advisory panel...</div>;
  }

  return (
    <main className="advisory-page">
      <div className="advisory-members-heading-card">
        <h2>{page?.title || `Advisory Panel ${year}`}</h2>
        <p>
          Trusted leaders from enterprise and technology who help shape the CIO Choice recognition
          program.
        </p>
      </div>

      <section className="advisory-panel-section">
        <div className="advisory-container">
          {members.length === 0 ? (
            <p className="advisory-empty-state">No advisory panel members available.</p>
          ) : (
            <div className="advisory-grid">
              {members.map((member) => (
                <article key={`${member.author}-${member.role}`} className="advisory-card">
                  <Image
                    src={member.avatar || FALLBACK_AVATAR}
                    alt={member.author}
                    width={230}
                    height={230}
                    className="advisory-avatar"
                    unoptimized
                  />
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
