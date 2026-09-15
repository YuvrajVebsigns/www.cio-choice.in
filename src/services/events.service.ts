import { API_ENDPOINTS } from '@/constants/api';
import {
  buildWebsiteAuthHeaders,
  clearWebsiteAuth,
  ensureWebsiteAuth,
  getApiErrorStatus,
  getWebsiteDomain,
  readStoredWebsiteAuth,
} from '@/lib/website-auth';
import { apiFetch } from '@/services/apiFetch';

export type WebsiteEvent = {
  id: string;
  title?: string;
  name?: string;
  eventName?: string;
  description?: string;
  startsAt?: string;
  startDate?: string;
  image?: string;
  heroImage?: string;
  banner?: string;
  category?: string;
  [key: string]: unknown;
};

type RawEvent = Record<string, unknown>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getImageUrl(value: unknown): string {
  if (typeof value === 'string') {
    return value.trim();
  }

  if (!isRecord(value)) {
    return '';
  }

  const urlVariants = isRecord(value.urlVariants) ? value.urlVariants : null;

  return (
    (typeof value.url === 'string' && value.url.trim()) ||
    (typeof value.original === 'string' && value.original.trim()) ||
    (typeof value.large === 'string' && value.large.trim()) ||
    (typeof value.medium === 'string' && value.medium.trim()) ||
    (typeof value.small === 'string' && value.small.trim()) ||
    (typeof value.thumbnail === 'string' && value.thumbnail.trim()) ||
    (typeof urlVariants?.large === 'string' && urlVariants.large.trim()) ||
    (typeof urlVariants?.medium === 'string' && urlVariants.medium.trim()) ||
    (typeof urlVariants?.small === 'string' && urlVariants.small.trim()) ||
    (typeof urlVariants?.thumbnail === 'string' && urlVariants.thumbnail.trim()) ||
    ''
  );
}

export function getWebsiteEventImageUrl(event: WebsiteEvent): string {
  return (
    getImageUrl(event.bannerImage) ||
    getImageUrl(event.bannerImageId) ||
    getImageUrl(event.imageId) ||
    getImageUrl(event.image) ||
    getImageUrl(event.heroImage) ||
    getImageUrl(event.banner) ||
    '/assets/blogs/blog-1.webp'
  );
}

export function getWebsiteEventSlug(event: WebsiteEvent): string {
  const slug = typeof event.slug === 'string' ? event.slug.trim() : '';

  if (slug) {
    return slug;
  }

  const title = event.title ?? event.name ?? event.eventName ?? '';

  return String(title)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function normalizeEvent(data: RawEvent, fallbackId = ''): WebsiteEvent {
  return {
    id: String(data.id ?? data._id ?? data.eventId ?? data.uid ?? data.slug ?? fallbackId),
    title:
      typeof data.title === 'string'
        ? data.title
        : typeof data.name === 'string'
          ? data.name
          : typeof data.eventName === 'string'
            ? data.eventName
            : undefined,
    description: typeof data.description === 'string' ? data.description : undefined,
    startsAt:
      typeof data.startsAt === 'string'
        ? data.startsAt
        : typeof data.startDate === 'string'
          ? data.startDate
          : undefined,
    ...data,
  };
}

function normalizeEventsResponse(res: unknown): WebsiteEvent[] {
  let items: unknown = [];

  if (isRecord(res)) {
    if (isRecord(res.data) && Array.isArray(res.data.data)) {
      items = res.data.data;
    } else if (Array.isArray(res.data)) {
      items = res.data;
    } else if (Array.isArray(res.items)) {
      items = res.items;
    } else if (Array.isArray(res.results)) {
      items = res.results;
    }
  } else if (Array.isArray(res)) {
    items = res;
  }

  if (!Array.isArray(items)) return [];

  return items.map((item) => normalizeEvent(item as RawEvent));
}

export async function fetchWebsiteEvents(): Promise<WebsiteEvent[]> {
  if (typeof window === 'undefined') return [];

  const domain = getWebsiteDomain();
  let auth = readStoredWebsiteAuth();

  if (!auth?.token || !auth.websiteId) {
    try {
      auth = await ensureWebsiteAuth(domain);
    } catch {
      return [];
    }
  }

  if (!auth?.token || !auth.websiteId) return [];

  try {
    const res = await apiFetch<unknown>(`${API_ENDPOINTS.WEBSITE.EVENTS.BASE}?page=1&limit=100`, {
      method: 'GET',
      requireAuth: false,
      headers: buildWebsiteAuthHeaders(auth),
    });

    return normalizeEventsResponse(res);
  } catch (error: unknown) {
    const statusCode = getApiErrorStatus(error);

    if (statusCode === 401) {
      clearWebsiteAuth();

      try {
        const freshAuth = await ensureWebsiteAuth(domain);

        const res = await apiFetch<unknown>(
          `${API_ENDPOINTS.WEBSITE.EVENTS.BASE}?page=1&limit=100`,
          {
            method: 'GET',
            requireAuth: false,
            headers: buildWebsiteAuthHeaders(freshAuth),
          },
        );

        return normalizeEventsResponse(res);
      } catch {
        return [];
      }
    }

    return [];
  }
}

export async function fetchWebsiteEventByIdOrSlug(idOrSlug: string): Promise<WebsiteEvent | null> {
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
    const res = await apiFetch<unknown>(API_ENDPOINTS.WEBSITE.EVENTS.BY_ID(idOrSlug), {
      method: 'GET',
      requireAuth: false,
      headers: buildWebsiteAuthHeaders(auth),
    });

    if (!isRecord(res)) return null;

    const data = isRecord(res.data) ? res.data : res;

    return normalizeEvent(data as RawEvent, idOrSlug);
  } catch (error: unknown) {
    const statusCode = getApiErrorStatus(error);

    if (statusCode === 401) {
      clearWebsiteAuth();

      try {
        const freshAuth = await ensureWebsiteAuth(domain);

        const res = await apiFetch<unknown>(API_ENDPOINTS.WEBSITE.EVENTS.BY_ID(idOrSlug), {
          method: 'GET',
          requireAuth: false,
          headers: buildWebsiteAuthHeaders(freshAuth),
        });

        if (!isRecord(res)) return null;

        const data = isRecord(res.data) ? res.data : res;

        return normalizeEvent(data as RawEvent, idOrSlug);
      } catch {
        return null;
      }
    }

    return null;
  }
}
