import { API_ENDPOINTS } from '@/constants/api';
import {
  buildWebsiteAuthHeaders,
  ensureWebsiteAuth,
  getWebsiteDomain,
  readStoredWebsiteAuth,
} from '@/lib/website-auth';
import { apiFetch } from '@/services/apiFetch';

export type WebsitePage = {
  id: string;
  title?: string;
  slug?: string;
  pageType?: string;
  status?: string;
  isHomepage?: boolean;
  content?: {
    blocks?: unknown[];
  };
  [key: string]: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function normalizePageResponse(res: unknown): WebsitePage | null {
  if (!isRecord(res)) return null;

  if (isRecord(res.data) && isRecord(res.data.data)) {
    return res.data.data as WebsitePage;
  }

  if (isRecord(res.data)) {
    return res.data as WebsitePage;
  }

  return res as WebsitePage;
}

function normalizePagesResponse(res: unknown): WebsitePage[] {
  let pages: unknown;

  if (Array.isArray(res)) {
    pages = res;
  } else if (isRecord(res)) {
    if (isRecord(res.data) && Array.isArray(res.data.data)) {
      pages = res.data.data;
    } else if (Array.isArray(res.data)) {
      pages = res.data;
    } else if (Array.isArray(res.items)) {
      pages = res.items;
    } else if (Array.isArray(res.results)) {
      pages = res.results;
    }
  }

  if (!Array.isArray(pages)) return [];

  return pages.filter(
    (page): page is WebsitePage =>
      isRecord(page) && typeof page.slug === 'string' && page.slug.length > 0,
  );
}

async function fetchWebsitePage(
  endpoint: string,
  throwOnError = false,
): Promise<WebsitePage | null> {
  if (typeof window === 'undefined') {
    if (throwOnError) {
      throw new Error('Website pages can only be loaded in the browser.');
    }

    return null;
  }

  const domain = getWebsiteDomain();
  let auth = readStoredWebsiteAuth();

  if (!auth?.token || !auth.websiteId) {
    try {
      auth = await ensureWebsiteAuth(domain);
    } catch (error) {
      if (throwOnError) throw error;
      return null;
    }
  }

  if (!auth?.token || !auth.websiteId) {
    if (throwOnError) {
      throw new Error('Website authentication is unavailable.');
    }

    return null;
  }

  try {
    const res = await apiFetch<unknown>(endpoint, {
      method: 'GET',
      requireAuth: false,
      headers: buildWebsiteAuthHeaders(auth),
    });

    return normalizePageResponse(res);
  } catch (error) {
    if (throwOnError) throw error;
    return null;
  }
}

export async function fetchWebsitePages(): Promise<WebsitePage[]> {
  if (typeof window === 'undefined') return [];

  const domain = getWebsiteDomain();
  let auth = readStoredWebsiteAuth();

  if (!auth?.token || !auth.websiteId) {
    try {
      auth = await ensureWebsiteAuth(domain);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to authenticate before loading website pages.', error);
      return [];
    }
  }

  if (!auth?.token || !auth.websiteId) return [];

  try {
    const response = await apiFetch<unknown>(
      `${API_ENDPOINTS.WEBSITE.PAGES.BASE}?page=1&limit=100`,
      {
        method: 'GET',
        requireAuth: false,
        headers: buildWebsiteAuthHeaders(auth),
      },
    );

    return normalizePagesResponse(response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to load website pages for navigation.', error);
    return [];
  }
}

export async function fetchWebsitePageBySlug(slug: string): Promise<WebsitePage | null> {
  return fetchWebsitePage(API_ENDPOINTS.WEBSITE.PAGES.BY_SLUG(slug));
}

export async function fetchWebsitePageBySlugOrThrow(slug: string): Promise<WebsitePage> {
  const page = await fetchWebsitePage(API_ENDPOINTS.WEBSITE.PAGES.BY_SLUG(slug), true);

  if (!page) {
    throw new Error(`Website page "${slug}" was not returned by the server.`);
  }

  return page;
}

export async function fetchWebsiteMediaVideosPage(
  slug = 'media-videos',
): Promise<WebsitePage | null> {
  return fetchWebsitePage(API_ENDPOINTS.WEBSITE.PAGES.BY_SLUG(slug));
}
