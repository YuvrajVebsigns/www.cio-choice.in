export type NomineeInput = {
  categoryId: string;
  subcategoryId?: string;
  contactName: string;
  companyName: string;
  contactEmail: string;
  mobileNo?: string;
  countryCode?: string;
  mobileCountryCode?: string;
};

export type NominationSubmissionInput = {
  nominatorName: string;
  nominatorCompany: string;
  nominatorCity: string;
  nominatorContact?: string;
  nominatorCountryCode?: string;
  nominatorEmail: string;
  nominees: NomineeInput[];
};

/** Matches backend SubmitNominationDto (Postman). */
export type SubmitNominationApiBody = {
  nominatorName: string;
  nominatorCompany: string;
  nominatorCity: string;
  nominatorPhone?: string;
  nominatorCountryCode?: string;
  nominatorEmail: string;
  nominees: {
    categoryId: string;
    subCategoryId?: string;
    contactName: string;
    companyName: string;
    contactEmail: string;
    mobileNo?: string;
    countryCode?: string;
    mobileCountryCode?: string;
  }[];
};

export type WebsiteNominationCategory = {
  id: string;
  name: string;
  slug?: string;
  isActive?: boolean;
  sortOrder?: number;
};

export type NominationResponse = {
  success?: boolean;
  message?: string;
  data?: unknown;
};
