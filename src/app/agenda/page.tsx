'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

import { fetchWebsitePageBySlug, type WebsitePage } from '@/services/pages.services';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isWebUrl(value: unknown): value is string {
  if (typeof value !== 'string' || !value.trim()) {
    return false;
  }

  try {
    const url = new URL(value.trim());
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

function extractAgenda(page: WebsitePage | null): { title: string; documentUrl: string } {
  const blocks = page?.content?.blocks;
  let title = typeof page?.title === 'string' && page.title.trim() ? page.title.trim() : 'Agenda';

  if (!Array.isArray(blocks)) {
    return { title, documentUrl: '' };
  }

  for (const block of blocks) {
    if (!isRecord(block) || !isRecord(block.data)) {
      continue;
    }

    const blockTitle = block.data.sectionTitle;
    if (typeof blockTitle === 'string' && blockTitle.trim()) {
      title = blockTitle.trim();
    }

    const testimonials = block.data.testimonials;
    if (!Array.isArray(testimonials)) {
      continue;
    }

    for (const item of testimonials) {
      if (!isRecord(item) || !isWebUrl(item.quote)) {
        continue;
      }

      return { title, documentUrl: item.quote.trim() };
    }
  }

  return { title, documentUrl: '' };
}

export default function AgendaPage() {
  const [agenda, setAgenda] = useState<{ title: string; documentUrl: string }>({
    title: 'Agenda',
    documentUrl: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadAgenda() {
      try {
        const page = await fetchWebsitePageBySlug('agenda');
        if (!isMounted) return;

        const dynamicAgenda = extractAgenda(page);
        setAgenda(dynamicAgenda);

        if (!dynamicAgenda.documentUrl) {
          setErrorMessage('The agenda document is not available right now.');
        }
      } catch {
        if (isMounted) {
          setErrorMessage('Unable to load the agenda. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadAgenda();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="min-h-[70vh] bg-[#f7f5f5] px-4 py-8 sm:px-6">
      <section className="mx-auto max-w-6xl">
        <header className="mb-5 flex items-center justify-between gap-4 border-b border-[#ad0000] pb-3">
          <h1 className="text-lg font-semibold text-[#920000]">{agenda.title}</h1>
          {agenda.documentUrl ? (
            <a
              href={agenda.documentUrl}
              download="agenda.pdf"
              className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[#a60000] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#820000] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a60000]"
            >
              <Download size={16} aria-hidden="true" />
              Download Agenda
            </a>
          ) : null}
        </header>

        {isLoading ? (
          <p className="py-16 text-center text-sm text-gray-600" role="status">
            Loading agenda…
          </p>
        ) : errorMessage ? (
          <p className="rounded-md border border-red-200 bg-white p-6 text-center text-sm text-red-800">
            {errorMessage}
          </p>
        ) : (
          <div className="overflow-hidden rounded-md border border-gray-300 bg-white shadow-md">
            <iframe
              src={agenda.documentUrl}
              title={`${agenda.title} document`}
              className="h-[75vh] min-h-[560px] w-full"
            />
          </div>
        )}
      </section>
    </main>
  );
}
