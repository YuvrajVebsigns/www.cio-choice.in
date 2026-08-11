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
//     TOKEN: '/api/v1/website/token',
//     CONTACTS: '/api/v1/website/contacts',
//     NOMINATIONS: '/api/v1/website/nominations',
//     NOMINATION_CATEGORIES: '/api/v1/website/nominations/categories',

//     PAGES: {
//       BASE: '/api/v1/website/pages',
//       BY_SLUG: (slug: string) => `/api/v1/website/pages/${encodeURIComponent(slug)}`,
//     },

//     ATTENDEES: {
//       REGISTER: '/api/v1/website/attendees/register',
//     },

//     EVENTS: {
//       BASE: '/api/v1/website/events',
//       BY_ID: (id: string) => `/api/v1/website/events/${encodeURIComponent(id)}`,
//     },

//     BLOGS: {
//       BASE: '/api/v1/website/blogs',
//       BY_ID: (id: string) => `/api/v1/website/blogs/${encodeURIComponent(id)}`,
//     },

//     BLOG_COMMENTS: {
//       BASE: (id: string) => `/api/v1/website/blogs/${encodeURIComponent(id)}/comments`,
//     },

//     SPONSORS: {
//       BASE: '/api/v1/website/sponsors',
//       BY_ID: (id: string) => `/api/v1/website/sponsors/${encodeURIComponent(id)}`,
//     },
//   },

//   USERS: {
//     BASE: '/users',
//     BY_ID: (id: string) => `/users/${id}`,
//   },

//   MEDIA: {
//     BASE: '/media',
//     UPLOAD: '/media/upload',
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

    NOMINATIONS: '/api/v1/website/nominations',

    NOMINATION_STATUS: '/api/v1/website/nominations/status',

    NOMINATION_CATEGORIES: '/api/v1/website/nominations/categories',

    NOMINATION_SUB_CATEGORIES: '/api/v1/website/nominations/sub-categories',

    SUBSCRIBES: '/api/v1/website/subscribes',

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
