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
} from '@/types/nominations.types';

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
      ...(nominee.mobileNo?.trim() ? { mobileNo: nominee.mobileNo.trim() } : {}),
    })),
  };

  const phone = input.nominatorContact?.trim();
  if (phone) {
    body.nominatorPhone = phone;
  }

  return body;
}

function assertNominationSaved(response: NominationResponse) {
  if (response.success === false) {
    throw new Error(response.message || 'Nomination was not saved.');
  }
}

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

async function postNomination(body: SubmitNominationApiBody) {
  const auth = await ensureWebsiteAuth();

  return apiFetch<NominationResponse>(API_ENDPOINTS.WEBSITE.NOMINATIONS, {
    method: 'POST',
    requireAuth: false,
    headers: buildWebsiteAuthHeaders(auth),
    body: JSON.stringify(body),
  });
}

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
