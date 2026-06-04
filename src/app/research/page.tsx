'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Country } from 'react-phone-number-input';
import CountryCodeSelect, { getDialCodeFromCountry } from '@/components/CountryCodeSelect';
import { submitAttendeeRegistration } from '@/services/attendees.service';

const industries = [
  '',
  'ASSET MANAGEMENT (AMC)',
  'AUTOMOBILES & AUTO ANCILLARIES',
  'BANKING',
  'CHEMICALS',
  'CONSULTING',
  'DIVERSIFIED GROUP',
  'E-COMMERCE',
  'EDUCATION',
  'ENGINEERING',
  'FINANCIAL SERVICES',
  'FMCG',
  'HEALTHCARE & PHARMA',
  'INSURANCE',
  'IT, BPO & ITES',
  'MANUFACTURING',
  'MEDIA & ENTERTAINMENT',
  'NBFC',
  'REALTY',
  'RETAIL',
];

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState<Country>('IN');
  const [phone, setPhone] = useState('');
  const [industry, setIndustry] = useState('');
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    companyName?: string;
    designation?: string;
    email?: string;
    countryCode?: string;
    phone?: string;
    industry?: string;
  }>({});

  useEffect(() => {
    if (!popupMessage) return;

    const timer = window.setTimeout(() => {
      setPopupMessage(null);
    }, 3200);

    return () => window.clearTimeout(timer);
  }, [popupMessage]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nextErrors: typeof errors = {};

    if (!firstName.trim()) {
      nextErrors.firstName = 'First name is required.';
    } else if (!/^[A-Za-z\s]+$/.test(firstName.trim())) {
      nextErrors.firstName = 'Only alphabets are allowed.';
    }

    if (!lastName.trim()) {
      nextErrors.lastName = 'Last name is required.';
    } else if (!/^[A-Za-z\s]+$/.test(lastName.trim())) {
      nextErrors.lastName = 'Only alphabets are allowed.';
    }

    if (!companyName.trim()) {
      nextErrors.companyName = 'Company name is required.';
    }

    if (!designation.trim()) {
      nextErrors.designation = 'Designation is required.';
    }

    if (!email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Enter a valid email.';
    }

    const dialCode = getDialCodeFromCountry(country);
    if (!country || !dialCode) {
      nextErrors.countryCode = 'Please select a country code.';
    }

    const trimmedPhone = phone.trim();
    if (!trimmedPhone) {
      nextErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(trimmedPhone)) {
      nextErrors.phone = 'Phone number must be exactly 10 digits.';
    }

    if (!industry) {
      nextErrors.industry = 'Please select an industry.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setPopupMessage('Please fix the errors above.');
      return;
    }

    setLoading(true);
    setPopupMessage(null);

    try {
      const response = await submitAttendeeRegistration({
        eventId: 'business-pulse-report',
        name: `${firstName.trim()} ${lastName.trim()}`,
        email: email.trim(),
        phoneNumber: trimmedPhone,
        countryCode: dialCode,
        organization: companyName.trim(),
      });

      const apiMessage =
        response && typeof response === 'object' && 'message' in response
          ? String((response as { message?: string }).message)
          : '';

      setPopupMessage(apiMessage || 'Registration successful — thank you!');
      setFirstName('');
      setLastName('');
      setCompanyName('');
      setDesignation('');
      setEmail('');
      setCountry('IN');
      setPhone('');
      setIndustry('');
      setErrors({});
    } catch (err) {
      setPopupMessage(err instanceof Error ? err.message : 'Network error. Please try again.');
    } finally {
      setLoading(false);
      router.push('/research/download-report');
    }
  }

  return (
    <section className="registration-section">
      <div className="registration-container">
        <div className="registration-wrapper">
          {popupMessage ? (
            <div className="registration-popup" role="status" aria-live="polite">
              <span className="registration-popup-dot" aria-hidden="true" />
              <p>{popupMessage}</p>
              <button
                type="button"
                onClick={() => setPopupMessage(null)}
                aria-label="Close message"
              >
                ×
              </button>
            </div>
          ) : null}

          <h2 className="registration-title">CIO OUTLOOK SURVEY 2021 - BUSINESS PULSE REPORT</h2>

          <form onSubmit={handleSubmit} className="registration-form">
            <label className="registration-label">
              First Name *
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                disabled={loading}
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z\s]/g, '');
                }}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  if (errors.firstName) {
                    setErrors({ ...errors, firstName: undefined });
                  }
                }}
              />
              {errors.firstName && <div className="registration-error">{errors.firstName}</div>}
            </label>

            <label className="registration-label">
              Company Name *
              <input
                type="text"
                placeholder="Company Name"
                value={companyName}
                disabled={loading}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                  if (errors.companyName) {
                    setErrors({ ...errors, companyName: undefined });
                  }
                }}
              />
              {errors.companyName && <div className="registration-error">{errors.companyName}</div>}
            </label>

            <label className="registration-label">
              Last Name *
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                disabled={loading}
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z\s]/g, '');
                }}
                onChange={(e) => {
                  setLastName(e.target.value);
                  if (errors.lastName) {
                    setErrors({ ...errors, lastName: undefined });
                  }
                }}
              />
              {errors.lastName && <div className="registration-error">{errors.lastName}</div>}
            </label>

            <label className="registration-label">
              Designation *
              <input
                type="text"
                placeholder="Designation"
                value={designation}
                disabled={loading}
                onChange={(e) => {
                  setDesignation(e.target.value);
                  if (errors.designation) {
                    setErrors({ ...errors, designation: undefined });
                  }
                }}
              />
              {errors.designation && <div className="registration-error">{errors.designation}</div>}
            </label>

            <label className="registration-label">
              Mobile No *
              <div className="registration-phone-group">
                <CountryCodeSelect
                  value={country}
                  disabled={loading}
                  onChange={(nextCountry) => {
                    setCountry(nextCountry ?? 'IN');
                    if (errors.countryCode) {
                      setErrors({ ...errors, countryCode: undefined });
                    }
                  }}
                />
                <input
                  type="tel"
                  placeholder="9XXXXXXXXX"
                  value={phone}
                  disabled={loading}
                  inputMode="numeric"
                  maxLength={10}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value
                      .replace(/[^0-9]/g, '')
                      .slice(0, 10);
                  }}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) {
                      setErrors({ ...errors, phone: undefined });
                    }
                  }}
                />
              </div>
              {errors.phone && <div className="registration-error">{errors.phone}</div>}
              {errors.countryCode && <div className="registration-error">{errors.countryCode}</div>}
            </label>

            <label className="registration-label">
              Email *
              <input
                type="email"
                placeholder="abc@abc.com"
                value={email}
                disabled={loading}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors({ ...errors, email: undefined });
                  }
                }}
              />
              {errors.email && <div className="registration-error">{errors.email}</div>}
            </label>

            <label className="registration-label">
              Industry *
              <select
                value={industry}
                disabled={loading}
                onChange={(e) => {
                  setIndustry(e.target.value);
                  if (errors.industry) {
                    setErrors({ ...errors, industry: undefined });
                  }
                }}
              >
                <option value="">SELECT INDUSTRY</option>
                {industries.slice(1).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {errors.industry && <div className="registration-error">{errors.industry}</div>}
            </label>

            <div className="registration-button-wrap">
              <button
                type="submit"
                className="registration-btn"
                disabled={
                  loading ||
                  !firstName.trim() ||
                  !lastName.trim() ||
                  !companyName.trim() ||
                  !designation.trim() ||
                  !email.trim() ||
                  !phone.trim() ||
                  !industry ||
                  !country ||
                  !getDialCodeFromCountry(country) ||
                  phone.trim().length !== 10
                }
              >
                {loading ? 'Submitting...' : 'SUBMIT'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
