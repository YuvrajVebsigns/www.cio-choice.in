// import { API_ENDPOINTS } from '@/constants/api';
// import {
//   buildWebsiteAuthHeaders,
//   clearWebsiteAuth,
//   ensureWebsiteAuth,
//   getApiErrorStatus,
//   getWebsiteDomain,
//   readStoredWebsiteAuth,
// } from '@/lib/website-auth';
// import { apiFetch } from '@/services/apiFetch';

// export type WebsiteEvent = {
//   id: string;
//   title?: string;
//   name?: string;
//   eventName?: string;
//   description?: string;
//   startsAt?: string;
//   startDate?: string;
//   image?: string;
//   heroImage?: string;
//   banner?: string;
//   category?: string;
//   [key: string]: unknown;
// };

// type RawEvent = Record<string, unknown>;

// function isRecord(value: unknown): value is Record<string, unknown> {
//   return typeof value === 'object' && value !== null;
// }

// function normalizeEventsResponse(res: unknown): WebsiteEvent[] {
//   const items = isRecord(res) ? (res.data ?? res.items ?? res.results ?? []) : (res ?? []);

//   if (!Array.isArray(items)) return [];

//   return (items as RawEvent[]).map((it) => ({
//     id: String(it.id ?? it._id ?? it.eventId ?? it.uid ?? ''),
//     title:
//       typeof it.title === 'string'
//         ? it.title
//         : typeof it.name === 'string'
//           ? it.name
//           : typeof it.eventName === 'string'
//             ? it.eventName
//             : undefined,
//     description: typeof it.description === 'string' ? it.description : undefined,
//     startsAt:
//       typeof it.startsAt === 'string'
//         ? it.startsAt
//         : typeof it.startDate === 'string'
//           ? it.startDate
//           : undefined,
//     ...it,
//   }));
// }

// export async function fetchWebsiteEvents(): Promise<WebsiteEvent[]> {
//   if (typeof window === 'undefined') return [];

//   const domain = getWebsiteDomain();
//   let auth = readStoredWebsiteAuth();

//   if (!auth?.token || !auth.websiteId) {
//     try {
//       auth = await ensureWebsiteAuth(domain);
//     } catch {
//       return [];
//     }
//   }

//   if (!auth?.token || !auth.websiteId) return [];

//   const headers = buildWebsiteAuthHeaders(auth);

//   try {
//     const res = await apiFetch<unknown>(`${API_ENDPOINTS.WEBSITE.EVENTS.BASE}?page=1&limit=100`, {
//       method: 'GET',
//       requireAuth: false,
//       headers,
//     });

//     return normalizeEventsResponse(res);
//   } catch (error: unknown) {
//     const statusCode = getApiErrorStatus(error);

//     if (statusCode === 401) {
//       clearWebsiteAuth();

//       try {
//         const freshAuth = await ensureWebsiteAuth(domain);
//         const retryHeaders = buildWebsiteAuthHeaders(freshAuth);

//         const res = await apiFetch<unknown>(
//           `${API_ENDPOINTS.WEBSITE.EVENTS.BASE}?page=1&limit=100`,
//           {
//             method: 'GET',
//             requireAuth: false,
//             headers: retryHeaders,
//           },
//         );

//         return normalizeEventsResponse(res);
//       } catch {
//         return [];
//       }
//     }

//     return [];
//   }
// }

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
  const items = isRecord(res) ? (res.data ?? res.items ?? res.results ?? []) : (res ?? []);

  if (!Array.isArray(items)) return [];

  return (items as RawEvent[]).map((item) => normalizeEvent(item));
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
