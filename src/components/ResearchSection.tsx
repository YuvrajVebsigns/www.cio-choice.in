'use client';

import Link from 'next/link';

export default function ResearchSection() {
  const researches = [
    {
      title: 'CIO Outlook 2021, COVID 19 – BUSINESS IMPACT PULSE REPORT',
      url: 'https://core-mediagroup.com/ciooutlook2021/',
    },
    {
      title: 'CIO Outlook 2020, COVID 19 – BUSINESS IMPACT PULSE REPORT',
      url: 'https://core-mediagroup.com/ciooutlook2020/',
    },
  ];

  return (
    <section className="research-section">
      <div className="research-container">
        <div className="research-wrapper">
          <h2 className="research-title">Research & Reports</h2>

          <div className="research-list">
            {researches.map((item, idx) => (
              <div key={idx} className="research-item">
                <Link href="/research" className="research-link">
                  {item.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
