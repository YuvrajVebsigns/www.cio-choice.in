// import { API_ENDPOINTS } from '@/constants/api';
// import {
//   buildWebsiteAuthHeaders,
//   clearWebsiteAuth,
//   ensureWebsiteAuth,
//   getApiErrorStatus,
// } from '@/lib/website-auth';
// import { apiFetch, ApiError } from '@/services/apiFetch';
// import type {
//   NominationResponse,
//   NominationSubmissionInput,
//   SubmitNominationApiBody,
//   WebsiteNominationCategory,
// } from '@/types/nominations.types';

// function buildSubmitNominationBody(input: NominationSubmissionInput): SubmitNominationApiBody {
//   const body: SubmitNominationApiBody = {
//     nominatorName: input.nominatorName.trim(),
//     nominatorCompany: input.nominatorCompany.trim(),
//     nominatorCity: input.nominatorCity.trim(),
//     nominatorEmail: input.nominatorEmail.trim(),
//     nominees: input.nominees.map((nominee) => ({
//       categoryId: nominee.categoryId.trim(),
//       contactName: nominee.contactName.trim(),
//       companyName: nominee.companyName.trim(),
//       contactEmail: nominee.contactEmail.trim(),
//       ...(nominee.mobileNo?.trim() ? { mobileNo: nominee.mobileNo.trim() } : {}),
//     })),
//   };

//   const phone = input.nominatorContact?.trim();
//   if (phone) {
//     body.nominatorPhone = phone;
//   }

//   return body;
// }

// function assertNominationSaved(response: NominationResponse) {
//   if (response.success === false) {
//     throw new Error(response.message || 'Nomination was not saved.');
//   }
// }

// export function formatNominationErrorMessage(error: unknown): string {
//   if (error instanceof ApiError) {
//     const data = error.data;

//     if (typeof data === 'object' && data !== null && 'message' in data) {
//       const message = (data as { message?: unknown }).message;

//       if (Array.isArray(message)) {
//         return message.map(String).join(', ');
//       }

//       if (typeof message === 'string' && message.trim()) {
//         return message;
//       }
//     }

//     if (error.message) {
//       return error.message;
//     }
//   }

//   if (error instanceof Error) {
//     return error.message;
//   }

//   return 'Failed to submit nomination. Please try again.';
// }

// async function postNomination(body: SubmitNominationApiBody) {
//   const auth = await ensureWebsiteAuth();

//   return apiFetch<NominationResponse>(API_ENDPOINTS.WEBSITE.NOMINATIONS, {
//     method: 'POST',
//     requireAuth: false,
//     headers: buildWebsiteAuthHeaders(auth),
//     body: JSON.stringify(body),
//   });
// }

// export async function fetchWebsiteNominationCategories() {
//   async function getCategories() {
//     const auth = await ensureWebsiteAuth();
//     return apiFetch<{
//       success?: boolean;
//       message?: string;
//       data?: WebsiteNominationCategory[];
//     }>(API_ENDPOINTS.WEBSITE.NOMINATION_CATEGORIES, {
//       method: 'GET',
//       requireAuth: false,
//       headers: buildWebsiteAuthHeaders(auth),
//     });
//   }

//   try {
//     const response = await getCategories();
//     if (response.success === false) {
//       throw new Error(response.message || 'Failed to load nomination categories.');
//     }
//     return response.data ?? [];
//   } catch (error: unknown) {
//     const statusCode = getApiErrorStatus(error);
//     if (statusCode === 401) {
//       clearWebsiteAuth();
//       const response = await getCategories();
//       if (response.success === false) {
//         throw new Error(response.message || 'Failed to load nomination categories.');
//       }
//       return response.data ?? [];
//     }
//     throw error;
//   }
// }

// export async function submitWebsiteNomination(input: NominationSubmissionInput) {
//   const body = buildSubmitNominationBody(input);

//   try {
//     const response = await postNomination(body);
//     assertNominationSaved(response);
//     return response;
//   } catch (error: unknown) {
//     const statusCode = getApiErrorStatus(error);

//     if (statusCode === 401) {
//       clearWebsiteAuth();
//       const response = await postNomination(body);
//       assertNominationSaved(response);
//       return response;
//     }

//     throw new Error(formatNominationErrorMessage(error));
//   }
// }

import { API_ENDPOINTS } from '@/constants/api';
import {
  buildWebsiteAuthHeaders,
  clearWebsiteAuth,
  ensureWebsiteAuth,
  getApiErrorStatus,
} from '@/lib/website-auth';
import { apiFetch, ApiError } from '@/services/apiFetch';
import type {
  NominationResponse,
  NominationSubmissionInput,
  SubmitNominationApiBody,
  WebsiteNominationCategory,
} from '@/types/nominations.types';

/* =========================================================
   SUBCATEGORY TYPE
   ========================================================= */

export type WebsiteNominationSubCategory = {
  id: string;
  name?: string;
  label?: string;
  categoryId?: string;
};

/* =========================================================
   BUILD NOMINATION BODY
   ========================================================= */

function buildSubmitNominationBody(input: NominationSubmissionInput): SubmitNominationApiBody {
  const body: SubmitNominationApiBody = {
    nominatorName: input.nominatorName.trim(),
    nominatorCompany: input.nominatorCompany.trim(),
    nominatorCity: input.nominatorCity.trim(),
    nominatorEmail: input.nominatorEmail.trim(),

    nominees: input.nominees.map((nominee) => ({
      categoryId: nominee.categoryId.trim(),
      contactName: nominee.contactName.trim(),
      companyName: nominee.companyName.trim(),
      contactEmail: nominee.contactEmail.trim(),

      ...(nominee.mobileNo?.trim()
        ? {
            mobileNo: nominee.mobileNo.trim(),
          }
        : {}),
    })),
  };

  const phone = input.nominatorContact?.trim();

  if (phone) {
    body.nominatorPhone = phone;
  }

  return body;
}

/* =========================================================
   ASSERT NOMINATION SAVED
   ========================================================= */

function assertNominationSaved(response: NominationResponse) {
  if (response.success === false) {
    throw new Error(response.message || 'Nomination was not saved.');
  }
}

/* =========================================================
   FORMAT API ERROR
   ========================================================= */

export function formatNominationErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    const data = error.data;

    if (typeof data === 'object' && data !== null && 'message' in data) {
      const message = (data as { message?: unknown }).message;

      if (Array.isArray(message)) {
        return message.map(String).join(', ');
      }

      if (typeof message === 'string' && message.trim()) {
        return message;
      }
    }

    if (error.message) {
      return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Failed to submit nomination. Please try again.';
}

/* =========================================================
   POST NOMINATION
   ========================================================= */

async function postNomination(body: SubmitNominationApiBody) {
  const auth = await ensureWebsiteAuth();

  return apiFetch<NominationResponse>(API_ENDPOINTS.WEBSITE.NOMINATIONS, {
    method: 'POST',
    requireAuth: false,
    headers: buildWebsiteAuthHeaders(auth),
    body: JSON.stringify(body),
  });
}

/* =========================================================
   GET NOMINATION CATEGORIES
   ========================================================= */

export async function fetchWebsiteNominationCategories() {
  async function getCategories() {
    const auth = await ensureWebsiteAuth();

    return apiFetch<{
      success?: boolean;
      message?: string;
      data?: WebsiteNominationCategory[];
    }>(API_ENDPOINTS.WEBSITE.NOMINATION_CATEGORIES, {
      method: 'GET',
      requireAuth: false,
      headers: buildWebsiteAuthHeaders(auth),
    });
  }

  try {
    const response = await getCategories();

    if (response.success === false) {
      throw new Error(response.message || 'Failed to load nomination categories.');
    }

    return response.data ?? [];
  } catch (error: unknown) {
    const statusCode = getApiErrorStatus(error);

    if (statusCode === 401) {
      clearWebsiteAuth();

      const response = await getCategories();

      if (response.success === false) {
        throw new Error(response.message || 'Failed to load nomination categories.');
      }

      return response.data ?? [];
    }

    throw error;
  }
}

/* =========================================================
   GET NOMINATION SUB-CATEGORIES
   ========================================================= */

export async function fetchWebsiteNominationSubCategories() {
  async function getSubCategories() {
    const auth = await ensureWebsiteAuth();

    return apiFetch<{
      success?: boolean;
      message?: string;
      data?: WebsiteNominationSubCategory[];
    }>(API_ENDPOINTS.WEBSITE.NOMINATION_SUB_CATEGORIES, {
      method: 'GET',
      requireAuth: false,
      headers: buildWebsiteAuthHeaders(auth),
    });
  }

  try {
    const response = await getSubCategories();

    if (response.success === false) {
      throw new Error(response.message || 'Failed to load nomination subcategories.');
    }

    return response.data ?? [];
  } catch (error: unknown) {
    const statusCode = getApiErrorStatus(error);

    if (statusCode === 401) {
      clearWebsiteAuth();

      const response = await getSubCategories();

      if (response.success === false) {
        throw new Error(response.message || 'Failed to load nomination subcategories.');
      }

      return response.data ?? [];
    }

    throw error;
  }
}

/* =========================================================
   SUBMIT WEBSITE NOMINATION
   ========================================================= */

export async function submitWebsiteNomination(input: NominationSubmissionInput) {
  const body = buildSubmitNominationBody(input);

  try {
    const response = await postNomination(body);

    assertNominationSaved(response);

    return response;
  } catch (error: unknown) {
    const statusCode = getApiErrorStatus(error);

    if (statusCode === 401) {
      clearWebsiteAuth();

      const response = await postNomination(body);

      assertNominationSaved(response);

      return response;
    }

    throw new Error(formatNominationErrorMessage(error));
  }
}
