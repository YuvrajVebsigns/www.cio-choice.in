'use client';

import { useState } from 'react';
// import Link from 'next/link';

const tabs = ['Overview', 'Creative Direction', 'Campaign Results'];

const content = {
  Overview: [
    '2017 winning brand videos captured the brand vision with crisp storytelling and strong emotional appeal.',
    'This interactive page highlights the production themes and strategic outcomes.',
  ],
  'Creative Direction': [
    'Video narratives focused on product leadership and customer experience.',
    'A cinematic style supported premium branding and market differentiation.',
    'Visual motifs reinforced the brand’s key positioning statements.',
  ],
  'Campaign Results': [
    'Video launches generated improved audience recall and click-through rates.',
    'The campaign strengthened the brand’s presence in target segments.',
    'Integrated media execution delivered consistent messaging across channels.',
  ],
};

export default function WinningBrandVideos2017Page() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <main className="page-container">
      <section className="page-header">
        <h1>Winning Brand Videos - 2017</h1>
        <p>Interactive look at the 2017 winning brand video campaigns.</p>
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
