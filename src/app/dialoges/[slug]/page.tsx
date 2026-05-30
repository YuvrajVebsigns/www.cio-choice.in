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

export default function DialogueDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [dialogue, setDialogue] = useState<Dialogue | null>(null);

  useEffect(() => {
    fetch('/api/dialoges')
      .then((res) => res.json())
      .then((data: Dialogue[]) => {
        const found = data.find((d) => d.slug === slug) || null;
        setDialogue(found);
      })
      .catch(() => setDialogue(null));
  }, [slug]);

  if (!dialogue) return <div className="blog-not-found">Dialogue not found</div>;

  return (
    <section className="dialogue-detail">
      <div className="dialogue-top">
        <Image src={dialogue.avatar} alt={dialogue.author} width={1200} height={420} />
      </div>

      <div className="dialogue-meta">
        <h1>{dialogue.title}</h1>
        <p className="dialogue-role">
          {dialogue.role} — {dialogue.date}
        </p>
        <blockquote className="dialogue-quote-full">{dialogue.quote}</blockquote>
        <p className="dialogue-author">— {dialogue.author}</p>
      </div>
    </section>
  );
}
