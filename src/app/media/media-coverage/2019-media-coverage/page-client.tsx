'use client';

import { useState } from 'react';
// import Link from 'next/link';

const tabs = ['Overview', 'Highlights', 'Media Picks'];

const content = {
  Overview: [
    '2019 was a landmark year for CORE Media coverage, with national press and broadcast mentions.',
    'This page brings together the top media stories, brand mentions, and campaign highlights.',
  ],
  Highlights: [
    'Featured in leading business magazines for advisory panel leadership.',
    'TV interview coverage on in-market business channels.',
    'Thought leadership quotes in technology and enterprise publications.',
  ],
  'Media Picks': [
    'Press release on Advisory Panel launch and member announcements.',
    'Video recap of the 2019 media coverage event.',
    'Social media stories and digital news roundups.',
  ],
};

export default function MediaCoverage2019Page() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <main className="page-container">
      <section className="page-header">
        <h1>Media Coverage - 2019</h1>
        <p>Interactive coverage recap of CORE Media&apos;s 2019 media coverage highlights.</p>
      </section>

      <section className="media-coverage-tabs">
        <div className="tab-buttons">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`tab-button ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="tab-content">
          <ul>
            {content[activeTab as keyof typeof content].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
