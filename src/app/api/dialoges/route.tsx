import { NextResponse } from 'next/server';

export async function GET() {
  const dialoges = [
    {
      id: 1,
      slug: 'dialogue-1',
      quote:
        'CIO Dialogues is a unique experience that helped us in connecting with top CIOs and to better understand each other through an intimate conversation.',
      author: 'Sendil Kumar Venkatesan',
      role: 'VP IT | Shriram Value Services',
      avatar: '/assets/dialoges/client-2.webp',
    },
    {
      id: 2,
      slug: 'dialogue-2',
      quote:
        'It was a great experience being a part of CIO Dialogues. It provides an interesting informal opportunity for knowledge sharing, learning from industry peers.',
      author: 'Sendil Kumar Venkatesan',
      role: 'VP IT | Shriram Value Services',
      avatar: '/assets/dialoges/client-2.webp',
    },
    {
      id: 3,
      slug: 'dialogue-3',
      quote:
        'CIO Dialogues helped broaden my perspective and connected me with peers facing similar challenges in technology leadership.',
      author: 'Sendil Kumar Venkatesan',
      role: 'VP IT | Shriram Value Services',
      avatar: '/assets/dialoges/client-2.webp',
    },
    {
      id: 4,
      slug: 'dialogue-4',
      quote:
        'CIO Dialogues is a unique experience that helped us in connecting with top CIOs and to better understand each other through an intimate conversation.',
      author: 'Sendil Kumar Venkatesan',
      role: 'VP IT | Shriram Value Services',
      avatar: '/assets/dialoges/client-2.webp',
    },
    {
      id: 5,
      slug: 'dialogue-5',
      quote:
        'It was a great experience being a part of CIO Dialogues. It provides an interesting informal opportunity for knowledge sharing, learning from industry peers.',
      author: 'Sendil Kumar Venkatesan',
      role: 'VP IT | Shriram Value Services',
      avatar: '/assets/dialoges/client-2.webp',
    },
    {
      id: 6,
      slug: 'dialogue-6',
      quote:
        'CIO Dialogues helped broaden my perspective and connected me with peers facing similar challenges in technology leadership.',
      author: 'Sendil Kumar Venkatesan',
      role: 'VP IT | Shriram Value Services',
      avatar: '/assets/dialoges/client-2.webp',
    },
  ];

  return NextResponse.json(dialoges);
}
