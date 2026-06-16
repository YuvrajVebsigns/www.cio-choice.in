// import { apiFetch } from '@/services/apiFetch';

// export type WebsiteAuth = {
//   token: string;
//   websiteId: string;
// };

// type WebsiteTokenResponse = {
//   token?: string;
//   websiteId?: string;
//   id?: string;
//   website?: {
//     id?: string;
//     token?: string;
//   };
//   data?: {
//     token?: string;
//     websiteId?: string;
//     id?: string;
//     website?: {
//       id?: string;
//       token?: string;
//     };
//     data?: {
//       token?: string;
//       websiteId?: string;
//       id?: string;
//       website?: {
//         id?: string;
//         token?: string;
//       };
//     };
//   };
// };

// /** Domain registered in the backend for this website (must match admin website). */
// // export function getWebsiteDomain(): string {
// //   if (process.env.NEXT_PUBLIC_WEBSITE_DOMAIN) {
// //     return process.env.NEXT_PUBLIC_WEBSITE_DOMAIN;
// //   }

// //   if (typeof window !== 'undefined') {
// //     const host = window.location.hostname.replace(/^www\./, '');
// //     if (host && host !== 'localhost' && host !== '127.0.0.1') {
// //       return host;
// //     }
// //   }

// //   return 'ciochoice.com';
// // }

// export function getWebsiteDomain(): string {
//   console.log('ENV DOMAIN:', process.env.NEXT_PUBLIC_WEBSITE_DOMAIN);

//   if (process.env.NEXT_PUBLIC_WEBSITE_DOMAIN) {
//     return process.env.NEXT_PUBLIC_WEBSITE_DOMAIN;
//   }

//   if (typeof window !== 'undefined') {
//     const host = window.location.hostname.replace(/^www\./, '');
//     console.log('WINDOW HOST:', host);

//     if (host && host !== 'localhost' && host !== '127.0.0.1') {
//       return host;
//     }
//   }

//   return 'ciochoice.com';
// }
// export function readStoredWebsiteAuth(): WebsiteAuth | null {
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

// function extractWebsiteToken(response: WebsiteTokenResponse) {
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

// function extractWebsiteId(response: WebsiteTokenResponse) {
//   return (
//     response.websiteId ??
//     response.website?.id ??
//     response.data?.website?.id ??
//     response.data?.websiteId ??
//     response.data?.data?.websiteId ??
//     response.data?.data?.website?.id ??
//     response.data?.data?.id ??
//     response.data?.id ??
//     response.id ??
//     null
//   );
// }

// export async function ensureWebsiteAuth(domain?: string): Promise<WebsiteAuth> {
//   if (typeof window === 'undefined') {
//     throw new Error('Website authentication is only available in the browser.');
//   }

//   const resolvedDomain = domain ?? getWebsiteDomain();
//   const stored = readStoredWebsiteAuth();
//   if (stored) return stored;

//   const tokenRes = await apiFetch<WebsiteTokenResponse>(
//     `/api/v1/website/token?domain=${encodeURIComponent(resolvedDomain)}`,
//     {
//       method: 'POST',
//       requireAuth: false,
//       headers: {
//         'Content-Type': 'application/json',
//         'x-website-domain': resolvedDomain,
//       },
//       body: JSON.stringify({ domain: resolvedDomain }),
//     },
//   );

//   const token = extractWebsiteToken(tokenRes);
//   const websiteId = extractWebsiteId(tokenRes);

//   if (!token || !websiteId) {
//     throw new Error(
//       'Could not obtain website token. Check NEXT_PUBLIC_WEBSITE_DOMAIN and API URL.',
//     );
//   }

//   const value: WebsiteAuth = { token, websiteId };
//   window.localStorage.setItem('websiteAuth', JSON.stringify(value));
//   return value;
// }

// export function buildWebsiteAuthHeaders(auth: WebsiteAuth): Record<string, string> {
//   return {
//     Authorization: `Bearer ${auth.token}`,
//     'x-website-id': auth.websiteId,
//   };
// }

// export function clearWebsiteAuth() {
//   if (typeof window !== 'undefined') {
//     window.localStorage.removeItem('websiteAuth');
//   }
// }

// export function getApiErrorStatus(error: unknown) {
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

import { API_ENDPOINTS } from '@/constants/api';
import { apiFetch } from '@/services/apiFetch';

export type WebsiteAuth = {
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

export function getWebsiteDomain(): string {
  return process.env.NEXT_PUBLIC_WEBSITE_DOMAIN || 'https://ciochoice.com';
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

function extractWebsiteToken(response: WebsiteTokenResponse): string | null {
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

function extractWebsiteId(response: WebsiteTokenResponse): string | null {
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

export async function ensureWebsiteAuth(domain?: string): Promise<WebsiteAuth> {
  if (typeof window === 'undefined') {
    throw new Error('Website authentication is only available in the browser.');
  }

  const resolvedDomain = domain || getWebsiteDomain();

  const stored = readStoredWebsiteAuth();
  if (stored) return stored;

  const tokenRes = await apiFetch<WebsiteTokenResponse>(
    `${API_ENDPOINTS.WEBSITE.TOKEN}?domain=${encodeURIComponent(resolvedDomain)}`,
    {
      method: 'POST',
      requireAuth: false,
      headers: {
        'Content-Type': 'application/json',
        'x-website-domain': resolvedDomain,
      },
      body: JSON.stringify({ domain: resolvedDomain }),
    },
  );

  const token = extractWebsiteToken(tokenRes);
  const websiteId = extractWebsiteId(tokenRes);

  if (!token || !websiteId) {
    throw new Error('Could not obtain website token. Check website domain and API URL.');
  }

  const value: WebsiteAuth = { token, websiteId };
  window.localStorage.setItem('websiteAuth', JSON.stringify(value));

  return value;
}

export function buildWebsiteAuthHeaders(auth: WebsiteAuth): Record<string, string> {
  return {
    Authorization: `Bearer ${auth.token}`,
    'x-website-id': auth.websiteId,
  };
}

export function clearWebsiteAuth() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('websiteAuth');
  }
}

export function getApiErrorStatus(error: unknown) {
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
