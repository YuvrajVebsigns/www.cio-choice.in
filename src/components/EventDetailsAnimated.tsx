'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';

import useScrollAnimation from '../hooks/useScrollAnimation';
import { ApiError } from '@/services/apiFetch';
import { downloadWebsiteReport } from '@/services/reports.service';
import { fetchWebsitePageBySlug, type WebsitePage } from '@/services/pages.services';

const EVENT_AGENDA_REPORT_ID = '6abf755696e36c5cdb48933d';
const AGENDA_HASHES = [
  '#event-details-agenda-pdf',
  '#event-details',
  '#agenda',
  '#event-details-agenda',
  '#event-agenda',
];

const INDUSTRIES = [
  'Automotive',
  'Banking',
  'BFSI',
  'Healthcare',
  'IT / ITES',
  'Manufacturing',
  'Retail / FMCG',
  'Telecom',
  'Media & Entertainment',
  'Pharma',
  'Logistics',
  'Other',
];

const COUNTRY_CODES = ['+91', '+1', '+44', '+971', '+65'];

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  countryCode: '+91',
  companyName: '',
  designation: '',
  industry: '',
};

const formatEventDate = (date: string) => {
  const formattedDate = new Date(date);
  const datePart = formattedDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const timePart = formattedDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return `${datePart} at ${timePart}`;
};

type Section = {
  heading: string;
  body: string;
};

type FeaturedEvent = {
  title: string;
  author: string;
  date: string;
  comments?: string;
  heroImage: string;
  badge?: string;
  summary?: string;
  sections: Section[];
  quote?: string;
  quoteAuthor?: string;
};

type DownloadForm = typeof EMPTY_FORM;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getAgendaPdfUrl(page: WebsitePage): string | null {
  const contentBlocks = page.content?.blocks ?? [];
  const pageSections = Array.isArray(page.sections) ? page.sections : [];

  for (const block of [...contentBlocks, ...pageSections]) {
    if (!isRecord(block) || !isRecord(block.data) || !Array.isArray(block.data.testimonials)) {
      continue;
    }

    for (const testimonial of block.data.testimonials) {
      if (!isRecord(testimonial) || typeof testimonial.quote !== 'string') {
        continue;
      }

      try {
        const url = new URL(testimonial.quote.trim());
        if (url.protocol === 'https:' && url.pathname.toLowerCase().endsWith('.pdf')) {
          return url.toString();
        }
      } catch {
        // Ignore non-URL testimonial content and keep looking for a PDF.
      }
    }
  }

  return null;
}

function AnimatedEventSection({ section }: { section: Section }) {
  const sectionRef = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="event-details-section" ref={sectionRef}>
      <h2>{section.heading}</h2>
      <p>{section.body}</p>
    </section>
  );
}

export default function EventDetailsAnimated({
  featuredEvent,
  readableSlug,
}: {
  featuredEvent: FeaturedEvent;
  readableSlug: string;
}) {
  const [agendaPdfUrl, setAgendaPdfUrl] = useState<string | null>(null);
  const [agendaLoadError, setAgendaLoadError] = useState('');
  const [isAgendaLoaded, setIsAgendaLoaded] = useState(false);
  const [showDownloadForm, setShowDownloadForm] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [formData, setFormData] = useState<DownloadForm>(EMPTY_FORM);
  const [formError, setFormError] = useState('');

  const heroRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-right',
    initialTransform: 'translateX(-24px)',
  });
  const metaRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(24px)',
  });
  const quoteRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in',
    initialTransform: 'translateY(24px)',
  });

  useEffect(() => {
    let isMounted = true;

    async function loadAgenda() {
      try {
        const page = await fetchWebsitePageBySlug('agenda');
        if (!isMounted) {
          return;
        }

        const pdfUrl = page ? getAgendaPdfUrl(page) : null;
        setAgendaPdfUrl(pdfUrl);
        if (!pdfUrl) {
          setAgendaLoadError('The agenda document is not available right now.');
        }
      } catch {
        if (isMounted) {
          setAgendaLoadError('Unable to load the agenda. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setIsAgendaLoaded(true);
        }
      }
    }

    void loadAgenda();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!agendaPdfUrl || typeof window === 'undefined') {
      return;
    }

    const hash = window.location.hash.toLowerCase();
    if (!AGENDA_HASHES.some((supportedHash) => hash.startsWith(supportedHash))) {
      return;
    }

    let attempts = 0;
    let timer: number;

    const scrollToAgenda = () => {
      const target =
        document.querySelector('#event-details-agenda-pdf .event-agenda-inline-header h3') ??
        document.getElementById('event-details-agenda-pdf') ??
        document.getElementById('event-agenda');

      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        return;
      }

      attempts += 1;
      if (attempts < 30) {
        timer = window.setTimeout(scrollToAgenda, 200);
      }
    };

    timer = window.setTimeout(scrollToAgenda, 100);
    return () => window.clearTimeout(timer);
  }, [agendaPdfUrl]);

  useEffect(() => {
    if (!showDownloadForm) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape' && !isDownloading) {
        setShowDownloadForm(false);
      }
    }

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showDownloadForm, isDownloading]);

  function handleFormChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.currentTarget;
    setFormData((previous) => ({ ...previous, [name]: value }));
  }

  async function handleDownloadSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isDownloading || !agendaPdfUrl) {
      return;
    }

    setFormError('');
    setIsDownloading(true);

    try {
      const downloadUrl = await downloadWebsiteReport({
        ...formData,
        reportId: EVENT_AGENDA_REPORT_ID,
      });
      window.location.assign(downloadUrl);
      setShowDownloadForm(false);
    } catch (error: unknown) {
      if (error instanceof ApiError && error.statusCode === 404) {
        window.location.assign(agendaPdfUrl);
        setShowDownloadForm(false);
      } else {
        setFormError('Unable to download the agenda. Please try again.');
      }
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <>
      <div className="event-details-hero" ref={heroRef}>
        <div className="event-details-image-wrap">
          <Image
            src={featuredEvent.heroImage}
            alt={featuredEvent.title}
            fill
            priority
            className="event-details-image"
            unoptimized={featuredEvent.heroImage.startsWith('http')}
          />
        </div>

        <div className="event-details-headline">
          <span className="event-details-badge">{featuredEvent.badge}</span>
          <h1>{featuredEvent.title}</h1>
          <div className="event-details-breadcrumb">
            <Link href="/">Home</Link>
            <span>&gt;</span>
            <Link href="/events">Events</Link>
            <span>&gt;</span>
            <p>{readableSlug}</p>
          </div>
        </div>
      </div>

      <div className="event-details-meta-grid" ref={metaRef}>
        <div className="event-details-meta-card">
          <span className="event-details-meta-label">Authored by</span>
          <strong>{featuredEvent.author}</strong>
        </div>
        <div className="event-details-meta-card">
          <span className="event-details-meta-label">Date Released</span>
          <strong>{formatEventDate(featuredEvent.date)}</strong>
        </div>
      </div>

      <article className="event-details-article">
        {featuredEvent.summary && <p className="event-details-intro">{featuredEvent.summary}</p>}

        {agendaPdfUrl ? (
          <section id="event-agenda" className="my-8 scroll-mt-24">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <h2 className="m-0 text-2xl font-bold text-[#2c1313]">Agenda</h2>
              <button
                type="button"
                onClick={() => {
                  setFormError('');
                  setShowDownloadForm(true);
                }}
                disabled={isDownloading}
                className="rounded-md bg-[#a60000] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#820000] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Download Agenda
              </button>
            </div>

            <div
              id="event-details-agenda-pdf"
              className="overflow-hidden rounded-md border border-gray-300 bg-white shadow-md"
            >
              <div className="event-agenda-inline-header border-b border-gray-200 px-4 py-3">
                <h3 className="m-0 text-lg font-semibold text-[#2c1313]">Event Agenda</h3>
              </div>
              <iframe
                className="h-[75vh] min-h-[560px] w-full"
                src={`${agendaPdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                title={`${featuredEvent.title} event agenda`}
              />
            </div>
          </section>
        ) : null}
        {!agendaPdfUrl && isAgendaLoaded && agendaLoadError ? (
          <p role="status" className="my-6 text-sm text-gray-600">
            {agendaLoadError}
          </p>
        ) : null}

        {featuredEvent.quote ? (
          <div className="event-details-quote" ref={quoteRef}>
            <div className="event-details-quote-mark">“</div>
            <p>{featuredEvent.quote}</p>
            <span>— {featuredEvent.quoteAuthor}</span>
          </div>
        ) : null}

        {featuredEvent.sections.map((section, index) => (
          <AnimatedEventSection key={`${section.heading}-${index}`} section={section} />
        ))}
      </article>

      {showDownloadForm && agendaPdfUrl ? (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto bg-black/60 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isDownloading) {
              setShowDownloadForm(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="agenda-download-title"
            className="relative my-auto max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-5 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={() => setShowDownloadForm(false)}
              disabled={isDownloading}
              aria-label="Close download form"
              className="absolute right-4 top-3 rounded p-2 text-2xl leading-none text-gray-500 hover:text-gray-900 disabled:opacity-50"
            >
              ×
            </button>

            <div className="mb-6 pr-8">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#a60000]">
                Agenda
              </span>
              <h2 id="agenda-download-title" className="mt-1 text-2xl font-bold text-gray-900">
                Download Event Agenda
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Please fill in your details to download the complete agenda.
              </p>
            </div>

            <form onSubmit={handleDownloadSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  id="agenda-first-name"
                  name="firstName"
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleFormChange}
                />
                <FormField
                  id="agenda-last-name"
                  name="lastName"
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleFormChange}
                />
                <FormField
                  id="agenda-email"
                  name="email"
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                />
                <div>
                  <label
                    htmlFor="agenda-phone"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <select
                      id="agenda-country-code"
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleFormChange}
                      aria-label="Country calling code"
                      className="w-24 rounded-md border border-gray-300 bg-white px-2 py-2.5 text-sm text-gray-900"
                    >
                      {COUNTRY_CODES.map((code) => (
                        <option key={code} value={code}>
                          {code}
                        </option>
                      ))}
                    </select>
                    <input
                      id="agenda-phone"
                      name="phoneNumber"
                      type="tel"
                      autoComplete="tel-national"
                      value={formData.phoneNumber}
                      onChange={handleFormChange}
                      required
                      className="min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-2.5 text-sm text-gray-900"
                    />
                  </div>
                </div>
                <FormField
                  id="agenda-company"
                  name="companyName"
                  label="Company Name"
                  value={formData.companyName}
                  onChange={handleFormChange}
                />
                <FormField
                  id="agenda-designation"
                  name="designation"
                  label="Designation"
                  value={formData.designation}
                  onChange={handleFormChange}
                />
                <div className="sm:col-span-2">
                  <label
                    htmlFor="agenda-industry"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Industry
                  </label>
                  <select
                    id="agenda-industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleFormChange}
                    required
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900"
                  >
                    <option value="">Please select an industry</option>
                    {INDUSTRIES.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {formError ? (
                <p role="alert" className="text-sm text-red-700">
                  {formError}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isDownloading}
                className="w-full rounded-md bg-[#a60000] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#820000] disabled:cursor-wait disabled:opacity-60"
              >
                {isDownloading ? 'Preparing Download…' : 'Download Agenda'}
              </button>
            </form>
          </section>
        </div>
      ) : null}
    </>
  );
}

function FormField({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
}: {
  id: string;
  name: keyof DownloadForm;
  label: string;
  type?: 'text' | 'email';
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={name}
        required
        className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm text-gray-900"
      />
    </div>
  );
}
