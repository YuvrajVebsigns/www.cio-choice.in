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

async function fetchWebsitePage(endpoint: string): Promise<WebsitePage | null> {
  if (typeof window === 'undefined') return null;

  const domain = getWebsiteDomain();
  let auth = readStoredWebsiteAuth();

  if (!auth?.token || !auth.websiteId) {
    try {
      auth = await ensureWebsiteAuth(domain);
    } catch {
      return null;
    }
  }

  if (!auth?.token || !auth.websiteId) return null;

  try {
    const res = await apiFetch<unknown>(endpoint, {
      method: 'GET',
      requireAuth: false,
      headers: buildWebsiteAuthHeaders(auth),
    });

    return normalizePageResponse(res);
  } catch {
    return null;
  }
}

export async function fetchWebsitePageBySlug(slug: string): Promise<WebsitePage | null> {
  return fetchWebsitePage(API_ENDPOINTS.WEBSITE.PAGES.BY_SLUG(slug));
}

export async function fetchWebsiteMediaVideosPage(
  slug = 'media-videos',
): Promise<WebsitePage | null> {
  return fetchWebsitePage(API_ENDPOINTS.WEBSITE.PAGES.BY_SLUG(slug));
}
