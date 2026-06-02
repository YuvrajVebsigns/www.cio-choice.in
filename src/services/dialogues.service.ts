export interface WebsiteDialogueItem {
  id: string;
  slug: string;
  title: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  date?: string;
  isActive?: boolean;
  status?: string;
  publishedAt?: string;
}

export interface WebsiteDialoguesResponse {
  success: boolean;
  message: string;
  data: {
    data: WebsiteDialogueItem[];
    meta?: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
}

export interface WebsiteDialogueDetailResponse {
  success: boolean;
  message: string;
  data: WebsiteDialogueItem;
}

type WebsiteAuth = {
  token: string;
  websiteId: string;
};

function readStoredWebsiteAuth(): WebsiteAuth | null {
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

function extractWebsiteToken(response: any) {
  return (
    response.token ??
    response.data?.token ??
    response.data?.data?.token ??
    response.data?.website?.token ??
    response.data?.data?.website?.token ??
    null
  );
}

function extractWebsiteId(response: any) {
  return (
    response.websiteId ??
    response.website?.id ??
    response.data?.website?.id ??
    response.data?.data?.website?.id ??
    response.data?.websiteId ??
    response.data?.data?.websiteId ??
    response.data?.id ??
    response.id ??
    null
  );
}

async function ensureWebsiteAuth(domain: string) {
  if (typeof window === 'undefined') return null;

  const stored = readStoredWebsiteAuth();
  if (stored) return stored;

  const { apiFetch } = await import('@/services/apiFetch');

  const tokenRes = await apiFetch<any>(`/api/v1/website/token?domain=${encodeURIComponent(domain)}`, {
    method: 'POST',
    requireAuth: false,
    headers: {
      'Content-Type': 'application/json',
      'x-website-domain': domain,
    },
    body: JSON.stringify({}),
  });

  const token = extractWebsiteToken(tokenRes);
  const websiteId = extractWebsiteId(tokenRes);

  if (token && websiteId) {
    const value: WebsiteAuth = { token, websiteId };
    window.localStorage.setItem('websiteAuth', JSON.stringify(value));
    return value;
  }

  return null;
}

function getApiErrorStatus(error: unknown) {
  if (typeof error === 'object' && error !== null && 'statusCode' in error) {
    return Number((error as { statusCode?: unknown }).statusCode);
  }

  if (typeof error === 'object' && error !== null && 'status' in error) {
    return Number((error as { status?: unknown }).status);
  }

  return undefined;
}

export async function fetchWebsiteDialogues(page = 1, limit = 10, search = '') {
  const { apiFetch } = await import('@/services/apiFetch');

  const domain = 'coremediagroup.com';
  const auth = await ensureWebsiteAuth(domain);

  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search.trim()) {
    searchParams.set('search', search.trim());
  }

  const headers: Record<string, string> = {};
  if (auth?.token) headers.Authorization = `Bearer ${auth.token}`;
  if (auth?.websiteId) headers['x-website-id'] = auth.websiteId;

  const endpoint = `/api/v1/website/dialogues?${searchParams.toString()}`;

  try {
    const response = await apiFetch<WebsiteDialoguesResponse>(endpoint, {
      requireAuth: false,
      headers,
    });

    if (response?.success && response.data?.data) {
      return response;
    }
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

        return apiFetch<WebsiteDialoguesResponse>(endpoint, {
          requireAuth: false,
          headers: retryHeaders,
        });
      }
    }

    throw error;
  }

  return {
    success: true,
    message: 'No dialogues found',
    data: {
      data: [],
      meta: {
        total: 0,
        page,
        limit,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    },
  } satisfies WebsiteDialoguesResponse;
}

export async function fetchWebsiteDialogueBySlug(idOrSlug: string) {
  const slug = idOrSlug.trim();
  if (!slug) return null;

  const { apiFetch } = await import('@/services/apiFetch');

  const domain = 'coremediagroup.com';
  const auth = await ensureWebsiteAuth(domain);

  const headers: Record<string, string> = {};
  if (auth?.token) headers.Authorization = `Bearer ${auth.token}`;
  if (auth?.websiteId) headers['x-website-id'] = auth.websiteId;

  const endpoint = `/api/v1/website/dialogues/${encodeURIComponent(slug)}`;

  try {
    const response = await apiFetch<WebsiteDialogueDetailResponse>(endpoint, {
      requireAuth: false,
      headers,
    });

    if (response?.success && response.data) {
      return response.data;
    }
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

        const retryResponse = await apiFetch<WebsiteDialogueDetailResponse>(endpoint, {
          requireAuth: false,
          headers: retryHeaders,
        });

        if (retryResponse?.success && retryResponse.data) {
          return retryResponse.data;
        }
      }
    }
  }

  return null;
}  