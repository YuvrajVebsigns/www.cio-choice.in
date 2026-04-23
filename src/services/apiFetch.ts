import { API_BASE_URL } from '@/constants/api';

export class ApiError extends Error {
  public statusCode: number;
  public data: unknown;

  constructor(message: string, statusCode: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.data = data;
  }
}

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
}

/**
 * Centralized API fetcher
 * Handles headers, generic JSON parsing, and central error throwing.
 */
export async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { requireAuth = true, headers, ...customConfig } = options;

  const config: RequestInit = {
    ...customConfig,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  // If credentials are required, we include them so cookies are sent automatically.
  if (requireAuth) {
    config.credentials = 'include';
  }

  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, config);

    // We try to parse the response body, but handle empty bodies
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new ApiError(
        data?.message || response.statusText || 'An error occurred',
        response.status,
        data,
      );
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // Network errors or other unexpected errors
    throw new ApiError(error instanceof Error ? error.message : 'Network error', 500);
  }
}
