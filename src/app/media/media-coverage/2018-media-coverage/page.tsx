'use client';

import { useState } from 'react';
// import Link from 'next/link';

const tabs = ['Overview', 'Press Highlights', 'Impact'];

const content = {
  Overview: [
    '2018 set the stage for CORE Media’s strategic media presence with strong coverage in regional business press.',
    'This page captures the major media moments and storytelling themes from that year.',
  ],
  'Press Highlights': [
    'Profile stories in industry publications about leadership and innovation.',
    'Thought pieces on the future of digital media and branding.',
    'Event coverage from keynote sessions and partner announcements.',
  ],
  Impact: [
    'Increased brand recognition across enterprise and marketing audiences.',
    'Broader press syndication and social amplification of every major announcement.',
    'Stronger media credibility through evergreen coverage and interviews.',
  ],
};

export default function MediaCoverage2018Page() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <main className="page-container">
      <section className="page-header">
        <h1>Media Coverage - 2018</h1>
        <p>Interactive recap of CORE Media’s 2018 media coverage and press momentum.</p>
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
