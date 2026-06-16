// export const API_BASE_URL =
//   process.env.NEXT_PUBLIC_API_URL || 'https://backend.uatcoremedia.vebsigns.com';

// export const API_ENDPOINTS = {
//   AUTH: {
//     LOGIN: '/auth/login',
//     LOGOUT: '/auth/logout',
//     ME: '/auth/me',
//     REFRESH: '/auth/refresh',
//   },

//   WEBSITE: {
//     TOKEN: `${API_BASE_URL}/api/v1/website/token`,

//     CONTACTS: `${API_BASE_URL}/api/v1/website/contacts`,

//     ATTENDEES: {
//       REGISTER: `${API_BASE_URL}/api/v1/website/attendees/register`,
//     },

//     EVENTS: {
//       BASE: `${API_BASE_URL}/api/v1/website/events`,
//       BY_ID: (id: string) => `${API_BASE_URL}/api/v1/website/events/${encodeURIComponent(id)}`,
//     },

//     BLOGS: {
//       BASE: `${API_BASE_URL}/api/v1/website/blogs`,
//       BY_ID: (id: string) => `${API_BASE_URL}/api/v1/website/blogs/${encodeURIComponent(id)}`,
//     },

//     BLOG_COMMENTS: {
//       BASE: (id: string) =>
//         `${API_BASE_URL}/api/v1/website/blogs/${encodeURIComponent(id)}/comments`,
//     },

//     SPONSORS: {
//       BASE: `${API_BASE_URL}/api/v1/website/sponsors`,
//       BY_ID: (id: string) => `${API_BASE_URL}/api/v1/website/sponsors/${encodeURIComponent(id)}`,
//     },
//   },

//   USERS: {
//     BASE: `${API_BASE_URL}/users`,
//     BY_ID: (id: string) => `${API_BASE_URL}/users/${id}`,
//   },

//   MEDIA: {
//     BASE: `${API_BASE_URL}/media`,
//     UPLOAD: `${API_BASE_URL}/media/upload`,
//   },
// } as const;

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://backend.uatcoremedia.vebsigns.com';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    REFRESH: '/auth/refresh',
  },

  WEBSITE: {
    TOKEN: '/api/v1/website/token',
    CONTACTS: '/api/v1/website/contacts',

    PAGES: {
      BASE: '/api/v1/website/pages',
      BY_SLUG: (slug: string) => `/api/v1/website/pages/${encodeURIComponent(slug)}`,
    },

    ATTENDEES: {
      REGISTER: '/api/v1/website/attendees/register',
    },

    EVENTS: {
      BASE: '/api/v1/website/events',
      BY_ID: (id: string) => `/api/v1/website/events/${encodeURIComponent(id)}`,
    },

    BLOGS: {
      BASE: '/api/v1/website/blogs',
      BY_ID: (id: string) => `/api/v1/website/blogs/${encodeURIComponent(id)}`,
    },

    BLOG_COMMENTS: {
      BASE: (id: string) => `/api/v1/website/blogs/${encodeURIComponent(id)}/comments`,
    },

    SPONSORS: {
      BASE: '/api/v1/website/sponsors',
      BY_ID: (id: string) => `/api/v1/website/sponsors/${encodeURIComponent(id)}`,
    },
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
