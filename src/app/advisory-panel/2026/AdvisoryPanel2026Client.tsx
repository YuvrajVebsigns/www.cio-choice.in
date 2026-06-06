'use client';

import Image from 'next/image';
// import Link from 'next/link';
import { useMemo, useState } from 'react';

const advisors = [
  'Aarti Singh',
  'Gautam Datta',
  'Jayant Goyal',
  'Prosenjit Sengupta',
  'Rajiv Arora',
  'Ravi Pichan',
  'Sampath Manickram',
  'Shiv Bhasin',
  'Rohit Kumar',
  'Anita Bose',
];

const PAGE_SIZE = 8;

export default function AdvisoryPanel2026Client() {
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(advisors.length / PAGE_SIZE);
  const visibleAdvisors = useMemo(
    () => advisors.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [page],
  );

  return (
    <>
      {' '}
      <section className="advisory-members-section">
        <div className="advisory-members-heading-card">
          <br />
          <h2>Advisory Panel 2026</h2>
          <br />
          <p>
            Trusted leaders from enterprise and technology who help shape the CIO Choice recognition
            program.
          </p>
        </div>

        <div className="advisory-members-grid">
          {visibleAdvisors.map((name) => (
            <article key={name} className="advisor-card">
              <div className="advisor-avatar">
                <Image
                  src={
                    name === 'Aarti Singh'
                      ? '/assets/team/Aarti-Singh.png'
                      : name === 'Gautam Datta'
                        ? '/assets/team/Goutam-Datta.png'
                        : name === 'Jayant Goyal'
                          ? '/assets/team/Jayant-Goyal.png'
                          : name === 'Prosenjit Sengupta'
                            ? '/assets/team/Prosenjit-Sengupta.png'
                            : name === 'Rajiv Arora'
                              ? '/assets/team/Rajiv-Arora.png'
                              : name === 'Ravi Pichan'
                                ? '/assets/team/Ravi-Pichan-1.png'
                                : name === 'Sampath Manickram'
                                  ? '/assets/team/Sampath-Manickam.png'
                                  : name === 'Shiv Bhasin'
                                    ? '/assets/team/Shiv-Bhasin.png'
                                    : '/assets/team/1.jpg'
                  }
                  alt={name}
                  width={360}
                  height={360}
                  className="advisor-avatar-image"
                />
              </div>
              <div className="advisor-card-content">
                <span className="advisor-name">{name}</span>
                {name === 'Aarti Singh' && (
                  <span className="advisor-role">Enterprise CIO – Mahindra Group</span>
                )}
                {name === 'Gautam Datta' && (
                  <span className="advisor-role">
                    Chief Information & Digital Officer (CIDO) – Bajaj Life
                  </span>
                )}
                {name === 'Jayant Goyal' && <span className="advisor-role">CIO – Coforge</span>}
                {name === 'Prosenjit Sengupta' && (
                  <span className="advisor-role">
                    Group Chief Digital and Information Officer (CDIO) – ITC
                  </span>
                )}
                {name === 'Rajiv Arora' && (
                  <span className="advisor-role">
                    Global Head of IT Hubs (Regions) & Regional Countries – Siemens
                  </span>
                )}
                {name === 'Ravi Pichan' && (
                  <span className="advisor-role">CIO and Head – Digital Banking – RBL Bank</span>
                )}
                {name === 'Sampath Manickram' && <span className="advisor-role">CTO – NSE</span>}
                {name === 'Shiv Bhasin' && (
                  <span className="advisor-role">Chief Transformation Officer – IndusInd Bank</span>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="advisory-pagination">
          <button
            type="button"
            className="pagination-btn"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1}
          >
            ‹ Prev
          </button>
          <div className="pagination-pages">
            Page: {page} of {pageCount}
          </div>
          <button
            type="button"
            className="pagination-btn"
            onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
            disabled={page === pageCount}
          >
            Next ›
          </button>
        </div>
      </section>
    </>
  );
}
