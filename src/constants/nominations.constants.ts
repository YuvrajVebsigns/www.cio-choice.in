/** CIO Power List nomination categories (MongoDB ids from backend). */
export const NOMINATION_CATEGORY_OPTIONS = [
  {
    label: 'Business Icon',
    id: process.env.NEXT_PUBLIC_NOMINATION_CATEGORY_BUSINESS_ID ?? '60d5ecb8b392d7001f3e3a4b',
  },
  {
    label: 'Technology Icon',
    id: process.env.NEXT_PUBLIC_NOMINATION_CATEGORY_TECHNOLOGY_ID ?? '',
  },
].filter((option) => Boolean(option.id));

export const MONGODB_ID_REGEX = /^[a-f\d]{24}$/i;
