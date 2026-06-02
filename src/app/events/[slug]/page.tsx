// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import ClientErrorBoundary from '@/components/ClientErrorBoundary';
// import EventDetailsAnimated from '@/components/EventDetailsAnimated';
// import {
//   fetchWebsiteEventByIdOrSlug,
//   fetchWebsiteEvents,
//   type WebsiteEvent,
// } from '@/services/events.service';

// type EventSection = {
//   heading: string;
//   body: string;
// };

// function isRecord(value: unknown): value is Record<string, unknown> {
//   return typeof value === 'object' && value !== null;
// }

// function getString(value: unknown, fallback = ''): string {
//   return typeof value === 'string' ? value : fallback;
// }

// export default function EventDetailsPage() {
//   const params = useParams<{ slug?: string | string[] }>();
//   const slug = Array.isArray(params?.slug) ? params.slug[0] : (params?.slug ?? '');

//   const [event, setEvent] = useState<WebsiteEvent | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     let isMounted = true;

//     async function loadEvent() {
//       if (!slug) {
//         if (isMounted) {
//           setError('Event slug is missing.');
//           setIsLoading(false);
//         }
//         return;
//       }

//       setIsLoading(true);
//       setError(null);

//       try {
//         let loadedEvent = await fetchWebsiteEventByIdOrSlug(slug);

//         if (!loadedEvent) {
//           const list = await fetchWebsiteEvents();
//           const matched = list.find((item) => String(item.id) === slug || item.slug === slug);

//           if (matched?.id) {
//             loadedEvent = await fetchWebsiteEventByIdOrSlug(String(matched.id));
//           }
//         }

//         if (isMounted) {
//           setEvent(loadedEvent);
//           setError(loadedEvent ? null : 'Event not found.');
//         }
//       } catch (loadError) {
//         if (isMounted) {
//           setEvent(null);
//           setError(loadError instanceof Error ? loadError.message : 'Failed to load event');
//         }
//       } finally {
//         if (isMounted) setIsLoading(false);
//       }
//     }

//     loadEvent();

//     return () => {
//       isMounted = false;
//     };
//   }, [slug]);

//   const readableSlug = (slug ?? '').replace(/-/g, ' ');

//   function extractTextFromContent(content: unknown): string {
//     if (!content) return '';

//     const recordContent = isRecord(content)
//       ? (content as { blocks?: unknown[]; summary?: unknown; description?: unknown })
//       : null;

//     if (Array.isArray(recordContent?.blocks)) {
//       return recordContent.blocks
//         .map((block) => {
//           if (!isRecord(block)) return '';

//           const blockData = isRecord(block.data) ? block.data : undefined;
//           if (typeof blockData?.text === 'string') return blockData.text;
//           if (typeof block.text === 'string') return block.text;

//           return '';
//         })
//         .filter(Boolean)
//         .join('\n\n');
//     }

//     if (Array.isArray(content)) {
//       return content
//         .map((item) =>
//           typeof item === 'string'
//             ? item
//             : isRecord(item) && typeof item.body === 'string'
//               ? item.body
//               : JSON.stringify(item),
//         )
//         .join('\n\n');
//     }

//     if (typeof content === 'string') return content;

//     if (recordContent) {
//       return (
//         getString(recordContent.summary) ||
//         getString(recordContent.description) ||
//         JSON.stringify(recordContent)
//       );
//     }

//     return String(content);
//   }

//   const normalizedSections: EventSection[] = [];

//   if (Array.isArray(event?.sections)) {
//     for (const section of event.sections) {
//       const sectionRecord = isRecord(section) ? section : undefined;
//       const heading =
//         getString(sectionRecord?.heading) || getString(sectionRecord?.title) || 'Details';
//       const body =
//         typeof sectionRecord?.body === 'string'
//           ? sectionRecord.body
//           : extractTextFromContent(sectionRecord?.body ?? sectionRecord?.content ?? section);

//       normalizedSections.push({ heading, body });
//     }
//   } else if (event?.content) {
//     normalizedSections.push({ heading: 'Details', body: extractTextFromContent(event.content) });
//   }

//   const featuredEvent = {
//     title: String(event?.title ?? event?.name ?? event?.eventName ?? 'Event'),
//     author: String(event?.organizer ?? event?.author ?? 'CORE Media'),
//     date: String(event?.startsAt ?? event?.date ?? ''),
//     heroImage: String(
//       event?.image ?? event?.heroImage ?? event?.banner ?? '/assets/blogs/blog-1.webp',
//     ),
//     badge: String(event?.category ?? 'Events'),
//     summary: extractTextFromContent(event?.description ?? event?.summary ?? ''),
//     sections: normalizedSections,
//   };

//   function renderBlock(block: unknown, index: number) {
//     if (!isRecord(block)) return null;

//     const key =
//       typeof block.id === 'string' ? block.id : `${String(block.type ?? 'block')}-${index}`;
//     const type = typeof block.type === 'string' ? block.type.toLowerCase() : '';
//     const data = isRecord(block.data) ? block.data : undefined;

//     if (type === 'header') {
//       const level = typeof data?.level === 'number' ? data.level : 2;
//       const text = typeof data?.text === 'string' ? data.text.trim() : '';
//       if (!text) return null;

//       return level <= 2 ? <h2 key={key}>{text}</h2> : <h3 key={key}>{text}</h3>;
//     }

//     if (type === 'paragraph') {
//       const text = typeof data?.text === 'string' ? data.text.trim() : '';
//       if (!text) return null;

//       return (
//         <p
//           key={key}
//           style={{ marginBottom: '18px', lineHeight: 1.8 }}
//           dangerouslySetInnerHTML={{ __html: text }}
//         />
//       );
//     }

//     if (type === 'list') {
//       const items = Array.isArray(data?.items)
//         ? data.items.filter((item): item is string => typeof item === 'string')
//         : [];

//       if (!items.length) return null;

//       return (
//         <ul key={key} className="overview-list">
//           {items.map((item) => (
//             <li key={item}>
//               <strong>{item}</strong>
//             </li>
//           ))}
//         </ul>
//       );
//     }

//     if (type === 'image') {
//       const file = isRecord(data?.file) ? data.file : undefined;
//       const url = typeof file?.url === 'string' ? file.url : '';
//       if (!url) return null;

//       return (
//         <div key={key} style={{ margin: '24px 0' }}>
//           <Image
//             src={url}
//             alt={typeof data?.caption === 'string' ? data.caption : 'Event image'}
//             width={1200}
//             height={675}
//             unoptimized
//           />
//         </div>
//       );
//     }

//     if (type === 'quote') {
//       const text = typeof data?.text === 'string' ? data.text.trim() : '';
//       if (!text) return null;

//       return (
//         <blockquote
//           key={key}
//           style={{ margin: '24px 0', paddingLeft: '18px', borderLeft: '3px solid #d11f26' }}
//         >
//           {text}
//         </blockquote>
//       );
//     }

//     if (type === 'delimiter') {
//       return <hr key={key} style={{ margin: '24px 0' }} />;
//     }

//     const fallbackText = typeof data?.text === 'string' ? data.text.trim() : '';
//     if (!fallbackText) return null;

//     return (
//       <p
//         key={key}
//         style={{ marginBottom: '18px', lineHeight: 1.8 }}
//         dangerouslySetInnerHTML={{ __html: fallbackText }}
//       />
//     );
//   }

//   const contentBlocks =
//     isRecord(event?.content) && Array.isArray((event.content as { blocks?: unknown[] }).blocks)
//       ? ((event.content as { blocks?: unknown[] }).blocks ?? [])
//       : [];

//   return (
//     <main className="event-details-page">
//       <div className="event-details-shell">
//         {isLoading ? <p>Loading event...</p> : null}
//         {!isLoading && error ? <p>{error}</p> : null}

//         {!isLoading && event && (
//           <ClientErrorBoundary>
//             <EventDetailsAnimated featuredEvent={featuredEvent} readableSlug={readableSlug} />

//             {contentBlocks.length > 0 ? (
//               <div>{contentBlocks.map((block, index) => renderBlock(block, index))}</div>
//             ) : null}

//             <div style={{ marginTop: 24 }}>
//               {featuredEvent.sections.length > 0 ? (
//                 <div style={{ marginTop: 18 }}>
//                   {featuredEvent.sections.map((section, index) => (
//                     <section key={`sec-${index}`} style={{ marginTop: 18 }}>
//                       <h3>{section.heading}</h3>
//                       {String(section.body)
//                         .split('\n\n')
//                         .map((paragraph, paragraphIndex) => (
//                           <p
//                             key={paragraphIndex}
//                             style={{ marginBottom: 12 }}
//                             dangerouslySetInnerHTML={{ __html: paragraph }}
//                           />
//                         ))}
//                     </section>
//                   ))}
//                 </div>
//               ) : null}

//               <div style={{ marginTop: 24 }}>
//                 <Link href="/register" className="talk-btn">
//                   Registration
//                 </Link>
//               </div>
//             </div>
//           </ClientErrorBoundary>
//         )}
//       </div>
//     </main>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowUpLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import ClientErrorBoundary from '@/components/ClientErrorBoundary';
import EventDetailsAnimated from '@/components/EventDetailsAnimated';
import {
  fetchWebsiteEventByIdOrSlug,
  fetchWebsiteEvents,
  type WebsiteEvent,
} from '@/services/events.service';

type EventSection = {
  heading: string;
  body: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function getEventField(event: WebsiteEvent, key: string): unknown {
  return (event as unknown as Record<string, unknown>)[key];
}

export default function EventDetailsPage() {
  const params = useParams<{ slug?: string | string[] }>();

  const slug: string = Array.isArray(params?.slug) ? (params.slug[0] ?? '') : (params?.slug ?? '');

  const [event, setEvent] = useState<WebsiteEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function extractTextFromContent(content: unknown): string {
    if (!content) return '';

    const recordContent = isRecord(content)
      ? (content as { blocks?: unknown[]; summary?: unknown; description?: unknown })
      : null;

    if (Array.isArray(recordContent?.blocks)) {
      return recordContent.blocks
        .map((block) => {
          if (!isRecord(block)) return '';

          const blockData = isRecord(block.data) ? block.data : undefined;

          if (typeof blockData?.text === 'string') return blockData.text;
          if (typeof block.text === 'string') return block.text;

          return '';
        })
        .filter(Boolean)
        .join('\n\n');
    }

    if (Array.isArray(content)) {
      return content
        .map((item) =>
          typeof item === 'string'
            ? item
            : isRecord(item) && typeof item.body === 'string'
              ? item.body
              : JSON.stringify(item),
        )
        .join('\n\n');
    }

    if (typeof content === 'string') return content;

    if (recordContent) {
      return (
        getString(recordContent.summary) ||
        getString(recordContent.description) ||
        JSON.stringify(recordContent)
      );
    }

    return String(content);
  }

  useEffect(() => {
    let isMounted = true;

    async function loadEvent() {
      if (!slug) {
        if (isMounted) {
          setError('Event slug is missing.');
          setIsLoading(false);
        }
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        let loadedEvent = await fetchWebsiteEventByIdOrSlug(slug);

        if (!loadedEvent) {
          const list = await fetchWebsiteEvents();

          const matched = list.find(
            (item) =>
              String(getEventField(item, 'id')) === slug || getEventField(item, 'slug') === slug,
          );

          if (matched) {
            const matchedId = getEventField(matched, 'id');

            if (matchedId) {
              loadedEvent = await fetchWebsiteEventByIdOrSlug(String(matchedId));
            }
          }
        }

        if (isMounted) {
          setEvent(loadedEvent);
          setError(loadedEvent ? null : 'Event not found.');
        }
      } catch (loadError) {
        if (isMounted) {
          setEvent(null);
          setError(loadError instanceof Error ? loadError.message : 'Failed to load event');
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadEvent();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (isLoading) {
    return (
      <main className="event-details-page">
        <p style={{ padding: '80px 20px', textAlign: 'center' }}>Loading event...</p>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="not-found-page">
        <Image src="/assets/404.png" alt="Event Not Found" width={700} height={500} />

        <h1>Event Not Found</h1>
        <p>
          The event you&apos;re looking for is unavailable or may have been removed. Browse our
          latest events to discover what&apos;s coming next.
        </p>

        <Link href="/events" className="backbutton">
          <div className="backbutton-icon">
            <ArrowUpLeft size={18} />
          </div>

          <span>Back to Events</span>
        </Link>
      </main>
    );
  }

  const readableSlug = slug.replace(/-/g, ' ');

  const normalizedSections: EventSection[] = [];

  const eventSections = getEventField(event, 'sections');

  if (Array.isArray(eventSections)) {
    for (const section of eventSections) {
      const sectionRecord = isRecord(section) ? section : undefined;

      const heading =
        getString(sectionRecord?.heading) || getString(sectionRecord?.title) || 'Details';

      const body =
        typeof sectionRecord?.body === 'string'
          ? sectionRecord.body
          : extractTextFromContent(sectionRecord?.body ?? sectionRecord?.content ?? section);

      normalizedSections.push({ heading, body });
    }
  } else {
    const eventContentForSections = getEventField(event, 'content');

    if (eventContentForSections) {
      normalizedSections.push({
        heading: 'Details',
        body: extractTextFromContent(eventContentForSections),
      });
    }
  }

  const featuredEvent = {
    title: String(
      getEventField(event, 'title') ??
        getEventField(event, 'name') ??
        getEventField(event, 'eventName') ??
        'Event',
    ),
    author: String(
      getEventField(event, 'organizer') ?? getEventField(event, 'author') ?? 'CORE Media',
    ),
    date: String(getEventField(event, 'startsAt') ?? getEventField(event, 'date') ?? ''),
    heroImage: String(
      getEventField(event, 'image') ??
        getEventField(event, 'heroImage') ??
        getEventField(event, 'banner') ??
        '/assets/blogs/blog-1.webp',
    ),
    badge: String(getEventField(event, 'category') ?? 'Events'),
    summary: extractTextFromContent(
      getEventField(event, 'description') ?? getEventField(event, 'summary') ?? '',
    ),
    sections: normalizedSections,
  };

  function renderBlock(block: unknown, index: number) {
    if (!isRecord(block)) return null;

    const key =
      typeof block.id === 'string' ? block.id : `${String(block.type ?? 'block')}-${index}`;

    const type = typeof block.type === 'string' ? block.type.toLowerCase() : '';
    const data = isRecord(block.data) ? block.data : undefined;

    if (type === 'header') {
      const level = typeof data?.level === 'number' ? data.level : 2;
      const text = typeof data?.text === 'string' ? data.text.trim() : '';

      if (!text) return null;

      return level <= 2 ? <h2 key={key}>{text}</h2> : <h3 key={key}>{text}</h3>;
    }

    if (type === 'paragraph') {
      const text = typeof data?.text === 'string' ? data.text.trim() : '';

      if (!text) return null;

      return (
        <p
          key={key}
          style={{ marginBottom: '18px', lineHeight: 1.8 }}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      );
    }

    if (type === 'list') {
      const items = Array.isArray(data?.items)
        ? data.items.filter((item): item is string => typeof item === 'string')
        : [];

      if (!items.length) return null;

      return (
        <ul key={key} className="overview-list">
          {items.map((item) => (
            <li key={item}>
              <strong>{item}</strong>
            </li>
          ))}
        </ul>
      );
    }

    if (type === 'image') {
      const file = isRecord(data?.file) ? data.file : undefined;
      const url = typeof file?.url === 'string' ? file.url : '';

      if (!url) return null;

      return (
        <div key={key} style={{ margin: '24px 0' }}>
          <Image
            src={url}
            alt={typeof data?.caption === 'string' ? data.caption : 'Event image'}
            width={1200}
            height={675}
            unoptimized
          />
        </div>
      );
    }

    if (type === 'quote') {
      const text = typeof data?.text === 'string' ? data.text.trim() : '';

      if (!text) return null;

      return (
        <blockquote
          key={key}
          style={{ margin: '24px 0', paddingLeft: '18px', borderLeft: '3px solid #d11f26' }}
        >
          {text}
        </blockquote>
      );
    }

    if (type === 'delimiter') {
      return <hr key={key} style={{ margin: '24px 0' }} />;
    }

    const fallbackText = typeof data?.text === 'string' ? data.text.trim() : '';

    if (!fallbackText) return null;

    return (
      <p
        key={key}
        style={{ marginBottom: '18px', lineHeight: 1.8 }}
        dangerouslySetInnerHTML={{ __html: fallbackText }}
      />
    );
  }

  const eventContent = getEventField(event, 'content');

  const contentBlocks =
    isRecord(eventContent) && Array.isArray(eventContent.blocks) ? eventContent.blocks : [];

  return (
    <main className="event-details-page">
      <div className="event-details-shell">
        <ClientErrorBoundary>
          <EventDetailsAnimated featuredEvent={featuredEvent} readableSlug={readableSlug} />

          {contentBlocks.length > 0 ? (
            <div>{contentBlocks.map((block, index) => renderBlock(block, index))}</div>
          ) : null}

          <div style={{ marginTop: 24 }}>
            {featuredEvent.sections.length > 0 ? (
              <div style={{ marginTop: 18 }}>
                {featuredEvent.sections.map((section, index) => (
                  <section key={`sec-${index}`} style={{ marginTop: 18 }}>
                    <h3>{section.heading}</h3>

                    {String(section.body)
                      .split('\n\n')
                      .map((paragraph, paragraphIndex) => (
                        <p
                          key={paragraphIndex}
                          style={{ marginBottom: 12 }}
                          dangerouslySetInnerHTML={{ __html: paragraph }}
                        />
                      ))}
                  </section>
                ))}
              </div>
            ) : null}

            <div style={{ marginTop: 24 }}>
              <Link href="/register" className="talk-btn">
                Registration
              </Link>
            </div>
          </div>
        </ClientErrorBoundary>
      </div>
    </main>
  );
}
