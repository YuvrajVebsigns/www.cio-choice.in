export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    REFRESH: '/auth/refresh',
  },
  WEBSITE: {
    CONTACTS: '/api/v1/website/contacts',
    EVENTS: {
      BASE: '/api/v1/website/events',
      BY_ID: (id: string) => `/api/v1/website/events/${encodeURIComponent(id)}`,
    },
    BLOG_COMMENTS: {
      BASE: (id: string) => `/api/v1/website/blogs/${encodeURIComponent(id)}/comments`,
    },
  },
  ATTENDEES: {
    REGISTER: '/api/v1/attendees/register',
  },
  USERS: {
    BASE: '/users',
    BY_ID: (id: string) => `/users/${id}`,
  },
  MEDIA: {
    BASE: '/media',
    UPLOAD: '/media/upload',
  },
} as const;
