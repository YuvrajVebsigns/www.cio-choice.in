'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Dialogue {
  id: number;
  slug: string;
  title: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  date: string;
}

export default function DialoguesPage() {
  const [dialogues, setDialogues] = useState<Dialogue[]>([]);
  const featuredDialogues = dialogues.slice(0, 3);
  const repeatedDialogues = Array.from({ length: 3 }, () => featuredDialogues).flat();

  useEffect(() => {
    fetch('/api/dialoges')
      .then((res) => res.json())
      .then((data) => setDialogues(data))
      .catch(() => setDialogues([]));
  }, []);

  return (
    <section className="dialogues-section">
      <div className="dialogues-container">
        {/* <div className="dialogues-heading">
          <span className="dialogues-badge">
            <span className="dialogues-badge-mark">⬢</span>
            <span className="dialogues-badge-text">CLIENT&apos;S FEEDBACK</span>
          </span>
        </div> */}
        <br />
        <br />

        <h2 className="dialogues-title">
          All <span>Dialogues</span>
        </h2>

        <div className="dialogues-list">
          {repeatedDialogues.map((d, index) => (
            <article className="dialogue-card" key={`${d.id}-${index}`}>
              <Image
                src="/assets/dialoges/quote.png"
                alt="Quote"
                width={56}
                height={56}
                className="dialogue-quote"
              />

              <p className="dialogue-text">{d.quote}</p>

              <div className="dialogue-divider" />

              <div className="dialogue-footer">
                <Image
                  src={d.avatar}
                  alt={d.author}
                  width={58}
                  height={58}
                  className="dialogue-avatar"
                />

                <div>
                  <h4 className="dialogue-author">{d.author}</h4>
                  <p className="dialogue-role">{d.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
