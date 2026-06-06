'use client';

import { useState } from 'react';
// import Link from 'next/link';

const tabs = ['Overview', 'Video Highlights', 'Brand Impact'];

const content = {
  Overview: [
    '2019 winning brand videos showcased bold storytelling and strong visual identity.',
    'This page lets you switch between key themes and campaign success stories.',
  ],
  'Video Highlights': [
    'Campaign video for the flagship brand scored high engagement across digital channels.',
    'Short-form teasers were used to amplify brand awareness on social platforms.',
    'Behind-the-scenes content helped humanize the brand narrative.',
  ],
  'Brand Impact': [
    'The video series supported stronger brand recall and user affinity.',
    'Media placements and social sharing expanded the campaign reach.',
    'Creative direction reinforced the brand’s premium market positioning.',
  ],
};

export default function WinningBrandVideos2019Page() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <main className="page-container">
      <section className="page-header">
        <h1>Winning Brand Videos - 2019</h1>
        <p>Interactive look at the 2019 winning brand video programs.</p>
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
