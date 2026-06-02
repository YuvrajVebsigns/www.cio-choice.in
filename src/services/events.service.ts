import { API_ENDPOINTS } from '@/constants/api';
import { apiFetch } from '@/services/apiFetch';

type WebsiteAuth = {
  token: string;
  websiteId: string;
};

export type WebsiteEvent = {
  id: string;
  title?: string;
  description?: string;
  startsAt?: string;
  [key: string]: unknown;
};

type RawEvent = Record<string, unknown>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getRecordValue(source: unknown, key: string): unknown {
  return isRecord(source) ? source[key] : undefined;
}

function getStringValue(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

export function readStoredWebsiteAuth(): WebsiteAuth | null {
  if (typeof window === 'undefined') return null;

  const raw = window.localStorage.getItem('websiteAuth');
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);

    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'token' in parsed &&
      'websiteId' in parsed &&
      typeof (parsed as { token?: unknown }).token === 'string' &&
      typeof (parsed as { websiteId?: unknown }).websiteId === 'string'
    ) {
      return {
        token: (parsed as { token: string }).token,
        websiteId: (parsed as { websiteId: string }).websiteId,
      };
    }
  } catch {
    return null;
  }

  return null;
}

async function ensureWebsiteAuth(domain: string) {
  if (typeof window === 'undefined') return null;

  const stored = readStoredWebsiteAuth();
  if (stored) return stored;

  const tokenRes = await apiFetch<unknown>(
    `/api/v1/website/token?domain=${encodeURIComponent(domain)}`,
    {
      method: 'POST',
      requireAuth: false,
      headers: {
        'Content-Type': 'application/json',
        'x-website-domain': domain,
      },
      body: JSON.stringify({}),
    },
  );

  const token =
    getStringValue(getRecordValue(tokenRes, 'token')) ??
    getStringValue(getRecordValue(getRecordValue(tokenRes, 'data'), 'token')) ??
    getStringValue(
      getRecordValue(getRecordValue(getRecordValue(tokenRes, 'data'), 'data'), 'token'),
    ) ??
    getStringValue(getRecordValue(getRecordValue(tokenRes, 'website'), 'token')) ??
    null;

  const websiteId =
    getStringValue(getRecordValue(tokenRes, 'websiteId')) ??
    getStringValue(getRecordValue(getRecordValue(tokenRes, 'website'), 'id')) ??
    getStringValue(
      getRecordValue(getRecordValue(getRecordValue(tokenRes, 'data'), 'website'), 'id'),
    ) ??
    getStringValue(getRecordValue(getRecordValue(tokenRes, 'data'), 'websiteId')) ??
    getStringValue(getRecordValue(tokenRes, 'id')) ??
    null;

  if (token && websiteId) {
    const value: WebsiteAuth = { token, websiteId };
    window.localStorage.setItem('websiteAuth', JSON.stringify(value));
    return value;
  }

  return null;
}

function getApiErrorStatus(error: unknown) {
  if (typeof error === 'object' && error !== null && 'statusCode' in error) {
    const statusCode = (error as { statusCode?: unknown }).statusCode;
    return typeof statusCode === 'number' ? statusCode : Number(statusCode);
  }

  if (typeof error === 'object' && error !== null && 'status' in error) {
    const status = (error as { status?: unknown }).status;
    return typeof status === 'number' ? status : Number(status);
  }

  return undefined;
}

export async function fetchWebsiteEvents(websiteId?: string): Promise<WebsiteEvent[]> {
  const domain = 'coremediagroup.com';
  let auth: WebsiteAuth | null = null;

  if (!websiteId) {
    auth = await ensureWebsiteAuth(domain);
    websiteId = auth?.websiteId ?? undefined;
  } else {
    // try to read token for headers if available
    auth = readStoredWebsiteAuth();
  }

  const headers: Record<string, string> = {};
  if (auth?.token) headers.Authorization = `Bearer ${auth.token}`;
  if (websiteId) headers['x-website-id'] = websiteId;

  try {
    const url = websiteId
      ? `${API_ENDPOINTS.WEBSITE.EVENTS.BASE}?websiteId=${encodeURIComponent(websiteId)}`
      : API_ENDPOINTS.WEBSITE.EVENTS.BASE;

    const res = await apiFetch<unknown>(url, {
      method: 'GET',
      requireAuth: false,
      headers,
    });

    // Normalize response shapes
    const items = isRecord(res) ? (res.data ?? res.items ?? res.results ?? []) : (res ?? []);

    if (!Array.isArray(items)) return [];

    return (items as RawEvent[]).map((it) => ({
      id: String(it['id'] ?? it['_id'] ?? it['eventId'] ?? it['uid'] ?? ''),
      title:
        (it['title'] as string) ??
        (it['name'] as string) ??
        (it['eventName'] as string) ??
        undefined,
      description: (it['description'] as string) ?? undefined,
      startsAt: (it['startsAt'] as string) ?? (it['startDate'] as string) ?? undefined,
      ...it,
    }));
  } catch (error: unknown) {
    const statusCode = getApiErrorStatus(error);

    if (statusCode === 401 && typeof window !== 'undefined') {
      window.localStorage.removeItem('websiteAuth');

      const freshAuth = await ensureWebsiteAuth(domain);

      if (freshAuth?.token) {
        const retryHeaders: Record<string, string> = {
          Authorization: `Bearer ${freshAuth.token}`,
          'x-website-id': freshAuth.websiteId,
        };

        const res = await apiFetch<unknown>(
          `${API_ENDPOINTS.WEBSITE.EVENTS.BASE}?websiteId=${encodeURIComponent(freshAuth.websiteId)}`,
          {
            method: 'GET',
            requireAuth: false,
            headers: retryHeaders,
          },
        );

        const items = isRecord(res) ? (res.data ?? res.items ?? res.results ?? []) : (res ?? []);
        if (!Array.isArray(items)) return [];

        return (items as RawEvent[]).map((it) => ({
          id: String(it['id'] ?? it['_id'] ?? it['eventId'] ?? it['uid'] ?? ''),
          title:
            (it['title'] as string) ??
            (it['name'] as string) ??
            (it['eventName'] as string) ??
            undefined,
          description: (it['description'] as string) ?? undefined,
          startsAt: (it['startsAt'] as string) ?? (it['startDate'] as string) ?? undefined,
          ...it,
        }));
      }
    }

    throw error;
  }
}

export async function fetchWebsiteEventByIdOrSlug(idOrSlug: string): Promise<WebsiteEvent | null> {
  const domain = 'coremediagroup.com';
  let auth: WebsiteAuth | null = null;

  try {
    auth = readStoredWebsiteAuth();
  } catch {
    auth = null;
  }

  const headers: Record<string, string> = {};
  if (auth?.token) headers.Authorization = `Bearer ${auth.token}`;
  if (auth?.websiteId) headers['x-website-id'] = auth.websiteId;

  try {
    const url = API_ENDPOINTS.WEBSITE.EVENTS.BY_ID(encodeURIComponent(idOrSlug));

    const res = await apiFetch<unknown>(url, {
      method: 'GET',
      requireAuth: false,
      headers,
    });

    const data = isRecord(res) ? (res.data ?? res) : null;
    if (!data) return null;

    return {
      id: String(
        getRecordValue(data, 'id') ??
          getRecordValue(data, '_id') ??
          getRecordValue(data, 'slug') ??
          idOrSlug,
      ),
      title:
        getStringValue(getRecordValue(data, 'title')) ??
        getStringValue(getRecordValue(data, 'name')) ??
        getStringValue(getRecordValue(data, 'eventName')) ??
        undefined,
      description:
        getStringValue(getRecordValue(data, 'description')) ??
        getStringValue(getRecordValue(data, 'summary')) ??
        undefined,
      startsAt:
        getStringValue(getRecordValue(data, 'startsAt')) ??
        getStringValue(getRecordValue(data, 'startDate')) ??
        undefined,
      ...(data as RawEvent),
    };
  } catch (error: unknown) {
    const status = getRecordValue(error, 'status');
    if ((status === 401 || status === '401') && typeof window !== 'undefined') {
      window.localStorage.removeItem('websiteAuth');

      const freshAuth = await ensureWebsiteAuth(domain);
      if (freshAuth?.token) {
        const retryHeaders: Record<string, string> = {
          Authorization: `Bearer ${freshAuth.token}`,
          'x-website-id': freshAuth.websiteId,
        };

        const url = API_ENDPOINTS.WEBSITE.EVENTS.BY_ID(encodeURIComponent(idOrSlug));
        const res = await apiFetch<unknown>(url, {
          method: 'GET',
          requireAuth: false,
          headers: retryHeaders,
        });

        const data = isRecord(res) ? (res.data ?? res) : null;
        if (!data) return null;
        return {
          id: String(
            getRecordValue(data, 'id') ??
              getRecordValue(data, '_id') ??
              getRecordValue(data, 'slug') ??
              idOrSlug,
          ),
          title:
            getStringValue(getRecordValue(data, 'title')) ??
            getStringValue(getRecordValue(data, 'name')) ??
            getStringValue(getRecordValue(data, 'eventName')) ??
            undefined,
          description:
            getStringValue(getRecordValue(data, 'description')) ??
            getStringValue(getRecordValue(data, 'summary')) ??
            undefined,
          startsAt:
            getStringValue(getRecordValue(data, 'startsAt')) ??
            getStringValue(getRecordValue(data, 'startDate')) ??
            undefined,
          ...(data as RawEvent),
        };
      }
    }

    throw error;
  }
}
