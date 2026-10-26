import { cache } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { API_ENDPOINTS } from '@/constants/api';
import { buildWebsiteAuthHeaders, getWebsiteDomain } from '@/lib/website-auth';
import { apiFetch } from '@/services/apiFetch';
import type { WebsitePage } from '@/services/pages.services';
import AdvisoryPanel from '../AdvisoryPanel';

type AdvisoryPanelPageProps = {
  params: Promise<{
    year: string;
  }>;
};

type WebsiteTokenResponse = {
  token?: unknown;
  websiteId?: unknown;
  id?: unknown;
  website?: unknown;
  data?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function getWebsiteAuth(response: WebsiteTokenResponse) {
  const data = isRecord(response.data) ? response.data : null;
  const nestedData = data && isRecord(data.data) ? data.data : null;
  const website = isRecord(response.website) ? response.website : null;
  const dataWebsite = data && isRecord(data.website) ? data.website : null;
  const nestedWebsite = nestedData && isRecord(nestedData.website) ? nestedData.website : null;

  const token =
    getString(response.token) ||
    getString(data?.token) ||
    getString(nestedData?.token) ||
    getString(website?.token) ||
    getString(dataWebsite?.token) ||
    getString(nestedWebsite?.token);
  const websiteId =
    getString(response.websiteId) ||
    getString(website?.id) ||
    getString(dataWebsite?.id) ||
    getString(data?.websiteId) ||
    getString(nestedData?.websiteId) ||
    getString(nestedWebsite?.id) ||
    getString(nestedData?.id) ||
    getString(data?.id) ||
    getString(response.id);

  return token && websiteId ? { token, websiteId } : null;
}

const fetchAdvisoryPage = cache(async (year: string): Promise<WebsitePage | null> => {
  const domain = getWebsiteDomain();
  const tokenResponse = await apiFetch<WebsiteTokenResponse>(
    `${API_ENDPOINTS.WEBSITE.TOKEN}?domain=${encodeURIComponent(domain)}`,
    {
      method: 'POST',
      requireAuth: false,
      cache: 'no-store',
      headers: { 'x-website-domain': domain },
      body: JSON.stringify({ domain }),
    },
  );
  const auth = getWebsiteAuth(tokenResponse);

  if (!auth) {
    throw new Error('The website API did not return valid authentication details.');
  }

  const response = await apiFetch<unknown>(
    API_ENDPOINTS.WEBSITE.PAGES.BY_SLUG(`advisory-panel-${year}`),
    {
      method: 'GET',
      requireAuth: false,
      cache: 'no-store',
      headers: buildWebsiteAuthHeaders(auth),
    },
  );
  const pageData =
    isRecord(response) && isRecord(response.data)
      ? isRecord(response.data.data)
        ? response.data.data
        : response.data
      : response;

  if (!isRecord(pageData) || typeof pageData.id !== 'string') return null;

  return pageData as WebsitePage;
});

async function getAdvisoryPage(year: string): Promise<WebsitePage | null> {
  try {
    return await fetchAdvisoryPage(year);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to load advisory panel SEO data for ${year}.`, error);
    return null;
  }
}

export async function generateMetadata({ params }: AdvisoryPanelPageProps): Promise<Metadata> {
  const { year } = await params;

  if (!/^\d{4}$/.test(year)) {
    notFound();
  }

  const page = await getAdvisoryPage(year);
  const seo = isRecord(page?.seo) ? page.seo : {};
  const canonicalUrl =
    getString(seo.canonicalUrl) || `https://ciochoice.com/advisory-panel/${year}`;
  const description =
    getString(seo.metaDescription) ||
    getString(page?.shortDescription) ||
    `Meet the CIO Choice advisory panel for ${year}.`;
  const title = getString(seo.metaTitle) || getString(page?.title) || `Advisory Panel ${year}`;
  const openGraphTitle = getString(seo.ogTitle) || title;
  const openGraphDescription = getString(seo.ogDescription) || description;
  const twitterTitle = getString(seo.twitterTitle) || openGraphTitle;
  const twitterDescription = getString(seo.twitterDescription) || openGraphDescription;
  const robots = getString(seo.robots);
  const keywords = Array.isArray(seo.metaKeywords)
    ? seo.metaKeywords.filter((keyword): keyword is string => typeof keyword === 'string')
    : [];

  return {
    title,
    description,
    keywords,
    alternates: { canonical: canonicalUrl },
    robots: {
      index: seo.noIndex !== true && !/\bnoindex\b/i.test(robots),
      follow: seo.noFollow !== true && !/\bnofollow\b/i.test(robots),
    },
    openGraph: {
      title: openGraphTitle,
      description: openGraphDescription,
      type: 'website',
      siteName: 'CIO Choice',
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: twitterTitle,
      description: twitterDescription,
    },
  };
}

export default async function AdvisoryPanelYearPage({ params }: AdvisoryPanelPageProps) {
  const { year } = await params;

  if (!/^\d{4}$/.test(year)) {
    notFound();
  }

  const page = await getAdvisoryPage(year);
  const seo = isRecord(page?.seo) ? page.seo : {};
  const schemaMarkup = getString(seo.schemaMarkup);
  let schema: unknown;

  if (schemaMarkup) {
    try {
      schema = JSON.parse(schemaMarkup) as unknown;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Invalid schema markup for advisory panel ${year}.`, error);
    }
  }

  return (
    <>
      {schema && (isRecord(schema) || Array.isArray(schema)) ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
          }}
        />
      ) : null}
      <AdvisoryPanel year={year} />
    </>
  );
}
