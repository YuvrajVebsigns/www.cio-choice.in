import { API_ENDPOINTS } from '@/constants/api';
import {
  buildWebsiteAuthHeaders,
  clearWebsiteAuth,
  ensureWebsiteAuth,
  getApiErrorStatus,
} from '@/lib/website-auth';
import { apiFetch } from '@/services/apiFetch';
import { fetchWebsitePageBySlugOrThrow } from '@/services/pages.services';

export type ReportDownloadInput = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  countryCode: string;
  companyName: string;
  designation: string;
  industry: string;
  reportId: string;
};

type ReportDownloadResponse = {
  success?: boolean;
  message?: string;
  data?: {
    downloadUrl?: string;
  };
};

const YEARBOOK_REPORT_IDS: Readonly<Record<number, string>> = {
  2026: '6adfd6329132c6df6351a93e',
  2025: '6adfd6d59132c6df6351a956',
  2024: '6adfd7ac9132c6df6351aa6f',
  2023: '6adfdcbb9132c6df6351af0d',
  2021: '6adfdd009132c6df6351af1e',
  2020: '6adfd7f59132c6df6351aabe',
  2019: '6adfdde59132c6df6351af45',
  2018: '6adfde2d9132c6df6351af47',
  2017: '6adfd8599132c6df6351ab3d',
  2016: '6adfd8cb9132c6df6351ac26',
  2014: '6adfde4e9132c6df6351af49',
  2013: '6adfd91a9132c6df6351ac28',
};

export async function fetchYearbookReportId(
  yearOrSlug: number | string,
  configuredReportId?: string,
): Promise<string> {
  const configuredId = configuredReportId?.trim();
  if (configuredId) {
    return configuredId;
  }

  if (typeof yearOrSlug === 'number' && YEARBOOK_REPORT_IDS[yearOrSlug]) {
    return YEARBOOK_REPORT_IDS[yearOrSlug];
  }

  const slug = typeof yearOrSlug === 'number' ? `yearbook-${yearOrSlug}` : yearOrSlug;
  const page = await fetchWebsitePageBySlugOrThrow(slug);
  const reportId = page.reportId;

  if (typeof reportId !== 'string' || !reportId.trim()) {
    throw new Error(`Year Book report ID is missing from CMS page "${slug}".`);
  }

  return reportId.trim();
}

async function postReportDownload(input: ReportDownloadInput) {
  const auth = await ensureWebsiteAuth();

  return apiFetch<ReportDownloadResponse>(API_ENDPOINTS.WEBSITE.REPORTS.DOWNLOAD, {
    method: 'POST',
    requireAuth: false,
    headers: buildWebsiteAuthHeaders(auth),
    body: JSON.stringify(input),
  });
}

export async function downloadWebsiteReport(input: ReportDownloadInput) {
  try {
    const response = await postReportDownload(input);
    const downloadUrl = response.data?.downloadUrl;

    if (!downloadUrl) {
      throw new Error(response.message || 'The report download link was not returned.');
    }

    return downloadUrl;
  } catch (error: unknown) {
    if (getApiErrorStatus(error) !== 401) {
      throw error;
    }

    clearWebsiteAuth();
    const response = await postReportDownload(input);
    const downloadUrl = response.data?.downloadUrl;

    if (!downloadUrl) {
      throw new Error(response.message || 'The report download link was not returned.');
    }

    return downloadUrl;
  }
}
