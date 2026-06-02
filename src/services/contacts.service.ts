// import { API_ENDPOINTS } from '@/constants/api';
// import { apiFetch } from '@/services/apiFetch';

// type WebsiteAuth = {
//   token: string;
//   websiteId: string;
// };

// export type ContactSubmission = {
//   fullName: string;
//   email: string;
//   phone: string;
//   service: string;
//   message: string;
// };

// type ContactResponse = {
//   message?: string;
//   data?: unknown;
// };

// function readStoredWebsiteAuth(): WebsiteAuth | null {
//   if (typeof window === 'undefined') return null;

//   const raw = window.localStorage.getItem('websiteAuth');
//   if (!raw) return null;

//   try {
//     const parsed: unknown = JSON.parse(raw);

//     if (
//       typeof parsed === 'object' &&
//       parsed !== null &&
//       'token' in parsed &&
//       'websiteId' in parsed &&
//       typeof (parsed as { token?: unknown }).token === 'string' &&
//       typeof (parsed as { websiteId?: unknown }).websiteId === 'string'
//     ) {
//       return {
//         token: (parsed as { token: string }).token,
//         websiteId: (parsed as { websiteId: string }).websiteId,
//       };
//     }
//   } catch {
//     return null;
//   }

//   return null;
// }

// function extractWebsiteToken(response: {
//   token?: string;
//   data?: {
//     token?: string;
//     data?: {
//       token?: string;
//       website?: {
//         token?: string;
//       };
//     };
//     website?: {
//       token?: string;
//     };
//   };
//   website?: {
//     token?: string;
//   };
// }) {
//   return (
//     response.token ??
//     response.data?.token ??
//     response.data?.data?.token ??
//     response.data?.website?.token ??
//     response.data?.data?.website?.token ??
//     response.website?.token ??
//     null
//   );
// }

// function extractWebsiteId(response: {
//   websiteId?: string;
//   data?: {
//     websiteId?: string;
//     id?: string;
//     data?: {
//       websiteId?: string;
//       id?: string;
//       website?: {
//         id?: string;
//       };
//     };
//     website?: {
//       id?: string;
//     };
//   };
//   website?: {
//     id?: string;
//   };
//   id?: string;
// }) {
//   return (
//     response.websiteId ??
//     response.website?.id ??
//     response.data?.website?.id ??
//     response.data?.websiteId ??
//     response.data?.data?.websiteId ??
//     response.data?.data?.website?.id ??
//     response.data?.data?.id ??
//     response.id ??
//     null
//   );
// }

// async function ensureWebsiteAuth(domain: string) {
//   if (typeof window === 'undefined') return null;

//   const stored = readStoredWebsiteAuth();
//   if (stored) return stored;

//   const tokenRes = await apiFetch<{
//     token?: string;
//     websiteId?: string;
//     website?: { id?: string };
//     data?: {
//       token?: string;
//       websiteId?: string;
//       id?: string;
//       website?: { token?: string; id?: string };
//       data?: {
//         token?: string;
//         websiteId?: string;
//         id?: string;
//         website?: { token?: string; id?: string };
//       };
//     };
//   }>(`/api/v1/website/token?domain=${encodeURIComponent(domain)}`, {
//     method: 'POST',
//     requireAuth: false,
//     headers: {
//       'Content-Type': 'application/json',
//       'x-website-domain': domain,
//     },
//     body: JSON.stringify({}),
//   });

//   const token = extractWebsiteToken(tokenRes);
//   const websiteId = extractWebsiteId(tokenRes);

//   if (token && websiteId) {
//     const value: WebsiteAuth = { token, websiteId };
//     window.localStorage.setItem('websiteAuth', JSON.stringify(value));
//     return value;
//   }

//   return null;
// }

// function getApiErrorStatus(error: unknown) {
//   if (typeof error === 'object' && error !== null && 'statusCode' in error) {
//     const statusCode = (error as { statusCode?: unknown }).statusCode;
//     return typeof statusCode === 'number' ? statusCode : Number(statusCode);
//   }

//   if (typeof error === 'object' && error !== null && 'status' in error) {
//     const status = (error as { status?: unknown }).status;
//     return typeof status === 'number' ? status : Number(status);
//   }

//   return undefined;
// }

// export async function submitWebsiteContact(payload: ContactSubmission) {
//   const domain = 'coremediagroup.com';
//   const auth = await ensureWebsiteAuth(domain);

//   const headers: Record<string, string> = {};
//   if (auth?.token) headers.Authorization = `Bearer ${auth.token}`;
//   if (auth?.websiteId) headers['x-website-id'] = auth.websiteId;

//   try {
//     const response = await apiFetch<ContactResponse>(API_ENDPOINTS.WEBSITE.CONTACTS, {
//       method: 'POST',
//       requireAuth: false,
//       headers,
//       body: JSON.stringify(payload),
//     });

//     return response;
//   } catch (error: unknown) {
//     const statusCode = getApiErrorStatus(error);

//     if (statusCode === 401 && typeof window !== 'undefined') {
//       window.localStorage.removeItem('websiteAuth');

//       const freshAuth = await ensureWebsiteAuth(domain);

//       if (freshAuth?.token) {
//         const retryHeaders: Record<string, string> = {
//           Authorization: `Bearer ${freshAuth.token}`,
//           'x-website-id': freshAuth.websiteId,
//         };

//         return apiFetch<ContactResponse>(API_ENDPOINTS.WEBSITE.CONTACTS, {
//           method: 'POST',
//           requireAuth: false,
//           headers: retryHeaders,
//           body: JSON.stringify(payload),
//         });
//       }
//     }

//     throw error;
//   }
// }

import { API_ENDPOINTS } from '@/constants/api';
import { apiFetch } from '@/services/apiFetch';

type WebsiteAuth = {
  token: string;
  websiteId: string;
};

type WebsiteTokenResponse = {
  token?: string;
  websiteId?: string;
  id?: string;
  website?: {
    id?: string;
    token?: string;
  };
  data?: {
    token?: string;
    websiteId?: string;
    id?: string;
    website?: {
      id?: string;
      token?: string;
    };
    data?: {
      token?: string;
      websiteId?: string;
      id?: string;
      website?: {
        id?: string;
        token?: string;
      };
    };
  };
};

export type ContactSubmission = {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

type ContactResponse = {
  message?: string;
  data?: unknown;
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

function extractWebsiteToken(response: WebsiteTokenResponse) {
  return (
    response.token ??
    response.data?.token ??
    response.data?.data?.token ??
    response.data?.website?.token ??
    response.data?.data?.website?.token ??
    response.website?.token ??
    null
  );
}

function extractWebsiteId(response: WebsiteTokenResponse) {
  return (
    response.websiteId ??
    response.website?.id ??
    response.data?.website?.id ??
    response.data?.websiteId ??
    response.data?.data?.websiteId ??
    response.data?.data?.website?.id ??
    response.data?.data?.id ??
    response.data?.id ??
    response.id ??
    null
  );
}

async function ensureWebsiteAuth(domain: string) {
  if (typeof window === 'undefined') return null;

  const stored = readStoredWebsiteAuth();
  if (stored) return stored;

  const tokenRes = await apiFetch<WebsiteTokenResponse>(
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
    const statusCode = (error as { statusCode?: unknown }).statusCode;
    return typeof statusCode === 'number' ? statusCode : Number(statusCode);
  }

  if (typeof error === 'object' && error !== null && 'status' in error) {
    const status = (error as { status?: unknown }).status;
    return typeof status === 'number' ? status : Number(status);
  }

  return undefined;
}

export async function submitWebsiteContact(payload: ContactSubmission) {
  const domain = 'coremediagroup.com';
  const auth = await ensureWebsiteAuth(domain);

  const headers: Record<string, string> = {};
  if (auth?.token) headers.Authorization = `Bearer ${auth.token}`;
  if (auth?.websiteId) headers['x-website-id'] = auth.websiteId;

  try {
    const response = await apiFetch<ContactResponse>(API_ENDPOINTS.WEBSITE.CONTACTS, {
      method: 'POST',
      requireAuth: false,
      headers,
      body: JSON.stringify(payload),
    });

    return response;
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

        return apiFetch<ContactResponse>(API_ENDPOINTS.WEBSITE.CONTACTS, {
          method: 'POST',
          requireAuth: false,
          headers: retryHeaders,
          body: JSON.stringify(payload),
        });
      }
    }

    throw error;
  }
}
