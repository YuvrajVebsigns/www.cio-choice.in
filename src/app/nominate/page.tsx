//
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MONGODB_ID_REGEX, NOMINATION_CATEGORY_OPTIONS } from '@/constants/nominations.constants';
import { submitWebsiteNomination } from '@/services/nominations.service';

type CIOEntry = {
  categoryId: string;
  name: string;
  company: string;
  email: string;
  mobile: string;
};

type FormErrors = {
  nominatorName?: string;
  nominatorCompany?: string;
  nominatorCity?: string;
  nominatorEmail?: string;
  nominatorContact?: string;
  cios?: {
    [key: number]: {
      categoryId?: string;
      name?: string;
      company?: string;
      email?: string;
      mobile?: string;
    };
  };
};

export default function NominatePage() {
  const [nominatorName, setNominatorName] = useState('');
  const [nominatorCompany, setNominatorCompany] = useState('');
  const [nominatorCity, setNominatorCity] = useState('');
  const [nominatorContact, setNominatorContact] = useState('');
  const [nominatorEmail, setNominatorEmail] = useState('');

  const [cios, setCios] = useState<CIOEntry[]>([
    { categoryId: '', name: '', company: '', email: '', mobile: '' },
  ]);

  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [animatingCioIndex, setAnimatingCioIndex] = useState<number | null>(null);
  const [animationType, setAnimationType] = useState<'add' | 'remove' | null>(null);

  const maxCios = 10;

  const addCio = () => {
    if (cios.length >= maxCios) return;

    setCios((prev) => {
      const newIndex = prev.length;

      setTimeout(() => {
        setAnimationType('add');
        setAnimatingCioIndex(newIndex);

        setTimeout(() => {
          setAnimatingCioIndex(null);
          setAnimationType(null);
        }, 800);
      }, 10);

      return [...prev, { categoryId: '', name: '', company: '', email: '', mobile: '' }];
    });
  };

  const removeCio = (idx: number) => {
    setAnimationType('remove');
    setAnimatingCioIndex(idx);

    setTimeout(() => {
      setCios((prev) => prev.filter((_, i) => i !== idx));

      if (errors.cios?.[idx]) {
        const nextCioErrors = { ...errors.cios };
        delete nextCioErrors[idx];
        setErrors({ ...errors, cios: nextCioErrors });
      }

      setAnimatingCioIndex(null);
      setAnimationType(null);
    }, 600);
  };

  const updateCio = (idx: number, key: keyof CIOEntry, value: string) => {
    setCios((prev) => prev.map((c, i) => (i === idx ? { ...c, [key]: value } : c)));

    if (errors.cios?.[idx]?.[key]) {
      setErrors({
        ...errors,
        cios: {
          ...errors.cios,
          [idx]: {
            ...errors.cios[idx],
            [key]: undefined,
          },
        },
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const nameRegex = /^[A-Za-z\s]+$/;

    const nextErrors: FormErrors = {};
    let hasErrors = false;

    if (!nominatorName.trim()) {
      nextErrors.nominatorName = 'Nominator name is required.';
      hasErrors = true;
    } else if (!nameRegex.test(nominatorName)) {
      nextErrors.nominatorName = 'Only alphabets are allowed.';
      hasErrors = true;
    }

    if (!nominatorCompany.trim()) {
      nextErrors.nominatorCompany = 'Company name is required.';
      hasErrors = true;
    }

    if (!nominatorCity.trim()) {
      nextErrors.nominatorCity = 'City is required.';
      hasErrors = true;
    }

    if (!nominatorEmail.trim()) {
      nextErrors.nominatorEmail = 'Email is required.';
      hasErrors = true;
    } else if (!emailRegex.test(nominatorEmail)) {
      nextErrors.nominatorEmail = 'Enter a valid email.';
      hasErrors = true;
    }

    if (nominatorContact && !phoneRegex.test(nominatorContact)) {
      nextErrors.nominatorContact = 'Enter a valid 10-digit phone number.';
      hasErrors = true;
    }

    const cioErrorsMap: NonNullable<FormErrors['cios']> = {};

    cios.forEach((c, idx) => {
      const currentCioErrors: NonNullable<FormErrors['cios']>[number] = {};

      if (!c.categoryId) {
        currentCioErrors.categoryId = 'Please select a category.';
        hasErrors = true;
      } else if (!MONGODB_ID_REGEX.test(c.categoryId)) {
        currentCioErrors.categoryId = 'Invalid category. Please select again.';
        hasErrors = true;
      }

      if (!c.name.trim()) {
        currentCioErrors.name = 'CIO name is required.';
        hasErrors = true;
      } else if (!nameRegex.test(c.name)) {
        currentCioErrors.name = 'Only alphabets are allowed.';
        hasErrors = true;
      }

      if (!c.company.trim()) {
        currentCioErrors.company = 'CIO company is required.';
        hasErrors = true;
      }

      if (!c.email.trim()) {
        currentCioErrors.email = 'Email is required.';
        hasErrors = true;
      } else if (!emailRegex.test(c.email)) {
        currentCioErrors.email = 'Enter a valid email address.';
        hasErrors = true;
      }

      if (c.mobile && !phoneRegex.test(c.mobile)) {
        currentCioErrors.mobile = 'Enter a valid 10-digit mobile number.';
        hasErrors = true;
      }

      if (Object.keys(currentCioErrors).length > 0) {
        cioErrorsMap[idx] = currentCioErrors;
      }
    });

    if (Object.keys(cioErrorsMap).length > 0) {
      nextErrors.cios = cioErrorsMap;
    }

    setErrors(nextErrors);

    if (hasErrors) {
      setStatus('Please fix the errors marked in the form below.');
      return;
    }

    setStatus(null);
    setIsSubmitting(true);

    try {
      const response = await submitWebsiteNomination({
        nominatorName,
        nominatorCompany,
        nominatorCity,
        nominatorContact,
        nominatorEmail,
        nominees: cios.map((cio) => ({
          categoryId: cio.categoryId,
          contactName: cio.name,
          companyName: cio.company,
          contactEmail: cio.email,
          mobileNo: cio.mobile,
        })),
      });

      const apiMessage =
        response && typeof response === 'object' && 'message' in response
          ? String((response as { message?: string }).message)
          : '';

      if (apiMessage) {
        setStatus(apiMessage);
      }

      setSubmitted(true);
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : 'Failed to submit nomination. Please try again.',
      );
      setSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="nominate-page-container">
        <section className="nominate-success-section">
          <h1>CIO CHOICE 2026 — Nomination Received</h1>
          <p>
            Thank you. Your nomination has been recorded. You will receive a confirmation email
            shortly and the nominated CIO(s) will be notified as described.
          </p>
          <p>
            <Link href="/">Return to home</Link>
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="nominate-page-container">
      <section className="nominate-page-content">
        <h1>ICT Vendor Recommendation Form</h1>

        <p>
          Help us recognize the ICT vendors that have consistently delivered excellence, innovation,
          and customer-centric solutions. Your recommendation contributes to identifying the most
          trusted technology partners in the industry.
        </p>

        <div className="nominate-info-box">
          <p>
            <strong>Dear CIO,</strong>
          </p>

          <p>You are important and your vote is important.</p>

          <p>
            Your recommendation will help and assist ICT Vendors applying for the CIO CHOICE
            Recognition and enable them to earn the trust and respect of the CIO community.
          </p>

          <p>
            Vendors from the Technology space can be recommended under categories such as
            Independent Software Vendors, Software Products, Hardware, Network & Storage Vendors,
            Data Centre & IT Infrastructure Vendors, Security Vendors, Telecom Services Vendors, DR
            & BCP Services Vendors, System Integrators, and other related ICT solution providers.
          </p>

          <p>
            The approach to vendor recognition is based on a<strong> Customer-Centric</strong>{' '}
            evaluation model that reflects real customer experience with ICT vendors.
          </p>

          <h3>Nomination Process &amp; Confirmation</h3>

          <p>
            Once you complete this form, the following confirmation emails will be automatically
            triggered:
          </p>

          <ol>
            <li>
              To the <strong>CIO CHOICE Team</strong>, containing your recommendation details.
            </li>

            <li>
              To <strong>you</strong>, acknowledging and summarizing your submitted recommendations.
            </li>

            <li>
              To each recommended ICT vendor, informing them that they have been recommended by you
              for <strong>CIO CHOICE 2027</strong>.
            </li>
          </ol>

          <p className="nominate-note">
            <strong>
              Please note that your referral vote is confidential and will not be shared, displayed,
              or published in any private or public forum.
            </strong>
          </p>
        </div>
        <br />
        <br />

        <div className="nominate-wrapper">
          <div className="nominate-card">
            <div className="nominate-card-header">NOMINATION FORM</div>

            <div className="nominate-card-body">
              <p className="nominate-sub">
                You can nominate up to 10 Influential CIOs by clicking on the &quot;Add CIO&quot;
                button.
              </p>

              <form id="nominate-form" onSubmit={handleSubmit} className="nominate-form" noValidate>
                <fieldset className="nominate-fieldset">
                  <legend className="nominate-legend">Nominator details</legend>

                  <label className="nominate-label">
                    CIO&apos;s Name *
                    <input
                      value={nominatorName}
                      onChange={(e) => {
                        setNominatorName(e.target.value.replace(/[^A-Za-z\s]/g, ''));
                        if (errors.nominatorName)
                          setErrors({ ...errors, nominatorName: undefined });
                      }}
                      placeholder="Full Name"
                      className="nominate-input-field"
                    />
                    {errors.nominatorName && (
                      <div className="registration-error">{errors.nominatorName}</div>
                    )}
                  </label>

                  <label className="nominate-label">
                    CIO&apos;s Company Name *
                    <input
                      value={nominatorCompany}
                      onChange={(e) => {
                        setNominatorCompany(e.target.value);
                        if (errors.nominatorCompany) {
                          setErrors({ ...errors, nominatorCompany: undefined });
                        }
                      }}
                      className="nominate-input-field"
                    />
                    {errors.nominatorCompany && (
                      <div className="registration-error">{errors.nominatorCompany}</div>
                    )}
                  </label>

                  <label className="nominate-label">
                    CIO&apos;s City *
                    <input
                      value={nominatorCity}
                      onChange={(e) => {
                        setNominatorCity(e.target.value);
                        if (errors.nominatorCity)
                          setErrors({ ...errors, nominatorCity: undefined });
                      }}
                      placeholder="eg. Mumbai"
                      className="nominate-input-field"
                    />
                    {errors.nominatorCity && (
                      <div className="registration-error">{errors.nominatorCity}</div>
                    )}
                  </label>

                  <label className="nominate-label">
                    CIO&apos;s Contact Number
                    <input
                      type="tel"
                      value={nominatorContact}
                      onChange={(e) => {
                        setNominatorContact(e.target.value.replace(/[^0-9]/g, ''));
                        if (errors.nominatorContact) {
                          setErrors({ ...errors, nominatorContact: undefined });
                        }
                      }}
                      maxLength={10}
                      placeholder="9876543210"
                      className="nominate-input-field"
                    />
                    {errors.nominatorContact && (
                      <div className="registration-error">{errors.nominatorContact}</div>
                    )}
                  </label>

                  <label className="nominate-label">
                    CIO&apos;s Email ID *
                    <input
                      type="email"
                      value={nominatorEmail}
                      onChange={(e) => {
                        setNominatorEmail(e.target.value);
                        if (errors.nominatorEmail) {
                          setErrors({ ...errors, nominatorEmail: undefined });
                        }
                      }}
                      placeholder="abc@abc.com"
                      className="nominate-input-field"
                    />
                    {errors.nominatorEmail && (
                      <div className="registration-error">{errors.nominatorEmail}</div>
                    )}
                    <br />
                    <br />
                  </label>
                </fieldset>

                <fieldset className="nominate-fieldset">
                  <legend className="nominate-legend"> You can recommend (up to {maxCios})</legend>

                  {cios.map((c, idx) => (
                    <div
                      key={idx}
                      className={`nominate-cio-block ${
                        animatingCioIndex === idx && animationType === 'add' ? 'cio-slide-in' : ''
                      } ${
                        animatingCioIndex === idx && animationType === 'remove'
                          ? 'cio-slide-out'
                          : ''
                      }`}
                    >
                      <div className="nominate-cio-top">
                        <strong className="nominate-cio-title">CIO {idx + 1}</strong>
                        {cios.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeCio(idx)}
                            className="nominate-remove-btn"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <label className="nominate-label">
                        Recommended ICT Vendor by Category *
                        <select
                          value={c.categoryId}
                          onChange={(e) => updateCio(idx, 'categoryId', e.target.value)}
                          className="nominate-input-field"
                        >
                          <option value="">- Select Category -</option>
                          {NOMINATION_CATEGORY_OPTIONS.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors.cios?.[idx]?.categoryId && (
                          <div className="registration-error">{errors.cios[idx].categoryId}</div>
                        )}
                      </label>

                      <label className="nominate-label">
                        ICT Vendor Contact Name *
                        <input
                          value={c.name}
                          onChange={(e) =>
                            updateCio(idx, 'name', e.target.value.replace(/[^A-Za-z\s]/g, ''))
                          }
                          className="nominate-input-field"
                        />
                        {errors.cios?.[idx]?.name && (
                          <div className="registration-error">{errors.cios[idx].name}</div>
                        )}
                      </label>

                      <label className="nominate-label">
                        ICT Company Name *
                        <input
                          value={c.company}
                          onChange={(e) => updateCio(idx, 'company', e.target.value)}
                          className="nominate-input-field"
                        />
                        {errors.cios?.[idx]?.company && (
                          <div className="registration-error">{errors.cios[idx].company}</div>
                        )}
                      </label>

                      <label className="nominate-label">
                        Contact Email *
                        <input
                          type="email"
                          value={c.email}
                          onChange={(e) => updateCio(idx, 'email', e.target.value)}
                          className="nominate-input-field"
                        />
                        {errors.cios?.[idx]?.email && (
                          <div className="registration-error">{errors.cios[idx].email}</div>
                        )}
                      </label>

                      <label className="nominate-label">
                        Mobile No.
                        <input
                          type="tel"
                          value={c.mobile}
                          onChange={(e) =>
                            updateCio(idx, 'mobile', e.target.value.replace(/[^0-9]/g, ''))
                          }
                          maxLength={10}
                          placeholder="9876543210"
                          className="nominate-input-field"
                        />
                        {errors.cios?.[idx]?.mobile && (
                          <div className="registration-error">{errors.cios[idx].mobile}</div>
                        )}
                      </label>
                    </div>
                  ))}
                </fieldset>

                <div className="nominate-add-wrap">
                  <button
                    type="button"
                    onClick={addCio}
                    disabled={cios.length >= maxCios}
                    className="nominate-btn nominate-btn-add"
                  >
                    + Add CIO
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="nominate-submit-row">
          {status && (
            <p className="registration-status" style={{ marginBottom: '15px', color: 'red' }}>
              {status}
            </p>
          )}

          <button
            type="submit"
            form="nominate-form"
            className="nominate-btn nominate-btn-primary nominate-submit"
            aria-label="Submit nomination"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>

          <small className="nominate-submit-note">
            By submitting you agree that nominated CIOs will be contacted. All nominations are
            confidential.
          </small>
        </div>
      </section>
    </main>
  );
}

// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';

// type VendorEntry = {
//   category: string;
//   company: string;
//   contactName: string;
//   email: string;
//   mobile: string;
// };

// type FormErrors = {
//   cioName?: string;
//   cioCompany?: string;
//   cioCity?: string;
//   cioContact?: string;
//   cioEmail?: string;
//   vendors?: {
//     [key: number]: {
//       category?: string;
//       company?: string;
//       contactName?: string;
//       email?: string;
//       mobile?: string;
//     };
//   };
// };

// const VENDOR_CATEGORY_OPTIONS = [
//   'Cloud Solutions',
//   'Cybersecurity',
//   'Data Center',
//   'Enterprise Applications',
//   'IT Infrastructure',
//   'Networking',
//   'Software Solutions',
//   'Technology Services',
// ];

// export default function VendorRecommendationPage() {
//   const [cioName, setCioName] = useState('');
//   const [cioCompany, setCioCompany] = useState('');
//   const [cioCity, setCioCity] = useState('');
//   const [cioContact, setCioContact] = useState('');
//   const [cioEmail, setCioEmail] = useState('');

//   const [vendors, setVendors] = useState<VendorEntry[]>([
//     { category: '', company: '', contactName: '', email: '', mobile: '' },
//   ]);

//   const [submitted, setSubmitted] = useState(false);
//   const [status, setStatus] = useState<string | null>(null);
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [animatingVendorIndex, setAnimatingVendorIndex] = useState<number | null>(null);
//   const [animationType, setAnimationType] = useState<'add' | 'remove' | null>(null);

//   const maxVendors = 10;

//   const addVendor = () => {
//     if (vendors.length >= maxVendors) return;

//     setVendors((prev) => {
//       const newIndex = prev.length;

//       setTimeout(() => {
//         setAnimationType('add');
//         setAnimatingVendorIndex(newIndex);

//         setTimeout(() => {
//           setAnimatingVendorIndex(null);
//           setAnimationType(null);
//         }, 800);
//       }, 10);

//       return [...prev, { category: '', company: '', contactName: '', email: '', mobile: '' }];
//     });
//   };

//   const removeVendor = (idx: number) => {
//     setAnimationType('remove');
//     setAnimatingVendorIndex(idx);

//     setTimeout(() => {
//       setVendors((prev) => prev.filter((_, i) => i !== idx));

//       if (errors.vendors?.[idx]) {
//         const nextVendorErrors = { ...errors.vendors };
//         delete nextVendorErrors[idx];
//         setErrors({ ...errors, vendors: nextVendorErrors });
//       }

//       setAnimatingVendorIndex(null);
//       setAnimationType(null);
//     }, 600);
//   };

//   const updateVendor = (idx: number, key: keyof VendorEntry, value: string) => {
//     setVendors((prev) => prev.map((v, i) => (i === idx ? { ...v, [key]: value } : v)));

//     if (errors.vendors?.[idx]?.[key]) {
//       setErrors({
//         ...errors,
//         vendors: {
//           ...errors.vendors,
//           [idx]: {
//             ...errors.vendors[idx],
//             [key]: undefined,
//           },
//         },
//       });
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^[0-9]{10}$/;
//     const nameRegex = /^[A-Za-z\s]+$/;

//     const nextErrors: FormErrors = {};
//     let hasErrors = false;

//     if (!cioName.trim()) {
//       nextErrors.cioName = "CIO's name is required.";
//       hasErrors = true;
//     } else if (!nameRegex.test(cioName)) {
//       nextErrors.cioName = 'Only alphabets are allowed.';
//       hasErrors = true;
//     }

//     if (!cioCompany.trim()) {
//       nextErrors.cioCompany = "CIO's company name is required.";
//       hasErrors = true;
//     }

//     if (!cioCity.trim()) {
//       nextErrors.cioCity = "CIO's city is required.";
//       hasErrors = true;
//     }

//     if (cioContact && !phoneRegex.test(cioContact)) {
//       nextErrors.cioContact = 'Enter a valid 10-digit contact number.';
//       hasErrors = true;
//     }

//     if (!cioEmail.trim()) {
//       nextErrors.cioEmail = "CIO's email ID is required.";
//       hasErrors = true;
//     } else if (!emailRegex.test(cioEmail)) {
//       nextErrors.cioEmail = 'Enter a valid email ID.';
//       hasErrors = true;
//     }

//     const vendorErrorsMap: NonNullable<FormErrors['vendors']> = {};

//     vendors.forEach((vendor, idx) => {
//       const currentVendorErrors: NonNullable<FormErrors['vendors']>[number] = {};

//       if (!vendor.category) {
//         currentVendorErrors.category = 'Please select a category.';
//         hasErrors = true;
//       }

//       if (!vendor.company.trim()) {
//         currentVendorErrors.company = 'ICT company name is required.';
//         hasErrors = true;
//       }

//       if (!vendor.contactName.trim()) {
//         currentVendorErrors.contactName = 'ICT vendor contact name is required.';
//         hasErrors = true;
//       } else if (!nameRegex.test(vendor.contactName)) {
//         currentVendorErrors.contactName = 'Only alphabets are allowed.';
//         hasErrors = true;
//       }

//       if (!vendor.email.trim()) {
//         currentVendorErrors.email = 'Contact email is required.';
//         hasErrors = true;
//       } else if (!emailRegex.test(vendor.email)) {
//         currentVendorErrors.email = 'Enter a valid email address.';
//         hasErrors = true;
//       }

//       if (vendor.mobile && !phoneRegex.test(vendor.mobile)) {
//         currentVendorErrors.mobile = 'Enter a valid 10-digit mobile number.';
//         hasErrors = true;
//       }

//       if (Object.keys(currentVendorErrors).length > 0) {
//         vendorErrorsMap[idx] = currentVendorErrors;
//       }
//     });

//     if (Object.keys(vendorErrorsMap).length > 0) {
//       nextErrors.vendors = vendorErrorsMap;
//     }

//     setErrors(nextErrors);

//     if (hasErrors) {
//       setStatus('Please fix the errors marked in the form below.');
//       return;
//     }

//     setStatus(null);
//     setIsSubmitting(true);

//     try {
//       setSubmitted(true);
//     } catch (error) {
//       setStatus(
//         error instanceof Error
//           ? error.message
//           : 'Failed to submit vendor recommendation. Please try again.',
//       );
//       setSubmitted(false);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (submitted) {
//     return (
//       <main className="nominate-page-container">
//         <section className="nominate-success-section">
//           <h1>ICT Vendor Recommendation Received</h1>
//           <p>
//             Thank you. Your vendor recommendation has been recorded. You will receive a confirmation
//             email shortly.
//           </p>
//           <p>
//             <Link href="/">Return to home</Link>
//           </p>
//         </section>
//       </main>
//     );
//   }

//   return (
//     <main className="nominate-page-container">
//       <section className="nominate-page-content">
//         <div className="nominate-wrapper">
//           <div className="nominate-card">
//             <div className="nominate-card-header">NOMINATE LEADING ICT VENDORS</div>

//             <div className="nominate-card-body">
//               <p className="nominate-sub">
//                 You can recommend up to 10 ICT vendors by clicking on the &quot;Add New Vendor&quot;
//                 button.
//               </p>

//               <form id="nominate-form" onSubmit={handleSubmit} className="nominate-form" noValidate>
//                 <fieldset className="nominate-fieldset">
//                   <legend className="nominate-legend">CIO details</legend>

//                   <label className="nominate-label">
//                     <span>CIO&apos;s Name *</span>
//                     <input
//                       value={cioName}
//                       onChange={(e) => {
//                         setCioName(e.target.value.replace(/[^A-Za-z\s]/g, ''));
//                         if (errors.cioName) setErrors({ ...errors, cioName: undefined });
//                       }}
//                       placeholder="Full Name"
//                       className="nominate-input-field"
//                     />
//                     {errors.cioName && <div className="registration-error">{errors.cioName}</div>}
//                   </label>

//                   <label className="nominate-label">
//                     <span>CIO&apos;s Company Name *</span>
//                     <input
//                       value={cioCompany}
//                       onChange={(e) => {
//                         setCioCompany(e.target.value);
//                         if (errors.cioCompany) setErrors({ ...errors, cioCompany: undefined });
//                       }}
//                       placeholder="Company Name"
//                       className="nominate-input-field"
//                     />
//                     {errors.cioCompany && (
//                       <div className="registration-error">{errors.cioCompany}</div>
//                     )}
//                   </label>

//                   <label className="nominate-label">
//                     <span>CIO&apos;s City *</span>
//                     <input
//                       value={cioCity}
//                       onChange={(e) => {
//                         setCioCity(e.target.value);
//                         if (errors.cioCity) setErrors({ ...errors, cioCity: undefined });
//                       }}
//                       placeholder="eg. Mumbai"
//                       className="nominate-input-field"
//                     />
//                     {errors.cioCity && <div className="registration-error">{errors.cioCity}</div>}
//                   </label>

//                   <label className="nominate-label">
//                     <span>CIO&apos;s Contact Number</span>
//                     <input
//                       type="tel"
//                       value={cioContact}
//                       onChange={(e) => {
//                         setCioContact(e.target.value.replace(/[^0-9]/g, ''));
//                         if (errors.cioContact) setErrors({ ...errors, cioContact: undefined });
//                       }}
//                       maxLength={10}
//                       placeholder="9876543210"
//                       className="nominate-input-field"
//                     />
//                     {errors.cioContact && (
//                       <div className="registration-error">{errors.cioContact}</div>
//                     )}
//                   </label>

//                   <label className="nominate-label">
//                     <span>CIO&apos;s Email ID *</span>
//                     <input
//                       type="email"
//                       value={cioEmail}
//                       onChange={(e) => {
//                         setCioEmail(e.target.value);
//                         if (errors.cioEmail) setErrors({ ...errors, cioEmail: undefined });
//                       }}
//                       placeholder="abc@abc.com"
//                       className="nominate-input-field"
//                     />
//                     {errors.cioEmail && <div className="registration-error">{errors.cioEmail}</div>}
//                     <br />
//                     <br />
//                   </label>
//                 </fieldset>

//                 <fieldset className="nominate-fieldset">
//                   <legend className="nominate-legend">
//                     ICT vendor recommendations (up to {maxVendors})
//                   </legend>

//                   {vendors.map((vendor, idx) => (
//                     <div
//                       key={idx}
//                       className={`nominate-cio-block ${
//                         animatingVendorIndex === idx && animationType === 'add'
//                           ? 'cio-slide-in'
//                           : ''
//                       } ${
//                         animatingVendorIndex === idx && animationType === 'remove'
//                           ? 'cio-slide-out'
//                           : ''
//                       }`}
//                     >
//                       <div className="nominate-cio-top">
//                         <strong className="nominate-cio-title">Vendor {idx + 1}</strong>

//                         {vendors.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => removeVendor(idx)}
//                             className="nominate-remove-btn"
//                           >
//                             Remove
//                           </button>
//                         )}
//                       </div>

//                       <div className="nominate-fieldset">
//                         <label className="nominate-label">
//                           <span>Recommended ICT Vendor by Category *</span>
//                           <select
//                             value={vendor.category}
//                             onChange={(e) => updateVendor(idx, 'category', e.target.value)}
//                             className="nominate-input-field"
//                           >
//                             <option value="">- Select Category -</option>
//                             {VENDOR_CATEGORY_OPTIONS.map((option) => (
//                               <option key={option} value={option}>
//                                 {option}
//                               </option>
//                             ))}
//                           </select>
//                           {errors.vendors?.[idx]?.category && (
//                             <div className="registration-error">{errors.vendors[idx].category}</div>
//                           )}
//                         </label>

//                         <label className="nominate-label">
//                           <span>ICT Company Name *</span>
//                           <input
//                             value={vendor.company}
//                             onChange={(e) => updateVendor(idx, 'company', e.target.value)}
//                             placeholder="Enter ICT Company Name"
//                             className="nominate-input-field"
//                           />
//                           {errors.vendors?.[idx]?.company && (
//                             <div className="registration-error">{errors.vendors[idx].company}</div>
//                           )}
//                         </label>

//                         <label className="nominate-label">
//                           <span>ICT Vendor Contact Name *</span>
//                           <input
//                             value={vendor.contactName}
//                             onChange={(e) =>
//                               updateVendor(
//                                 idx,
//                                 'contactName',
//                                 e.target.value.replace(/[^A-Za-z\s]/g, ''),
//                               )
//                             }
//                             placeholder="Enter Contact Name"
//                             className="nominate-input-field"
//                           />
//                           {errors.vendors?.[idx]?.contactName && (
//                             <div className="registration-error">
//                               {errors.vendors[idx].contactName}
//                             </div>
//                           )}
//                         </label>

//                         <label className="nominate-label">
//                           <span>Contact Email *</span>
//                           <input
//                             type="email"
//                             value={vendor.email}
//                             onChange={(e) => updateVendor(idx, 'email', e.target.value)}
//                             placeholder="Enter Contact Email"
//                             className="nominate-input-field"
//                           />
//                           {errors.vendors?.[idx]?.email && (
//                             <div className="registration-error">{errors.vendors[idx].email}</div>
//                           )}
//                         </label>

//                         <label className="nominate-label">
//                           <span>Mobile No.</span>
//                           <input
//                             type="tel"
//                             value={vendor.mobile}
//                             onChange={(e) =>
//                               updateVendor(idx, 'mobile', e.target.value.replace(/[^0-9]/g, ''))
//                             }
//                             maxLength={10}
//                             placeholder="9876543210"
//                             className="nominate-input-field"
//                           />
//                           {errors.vendors?.[idx]?.mobile && (
//                             <div className="registration-error">{errors.vendors[idx].mobile}</div>
//                           )}
//                         </label>
//                       </div>
//                     </div>
//                   ))}
//                 </fieldset>

//                 <div className="nominate-add-wrap">
//                   <button
//                     type="button"
//                     onClick={addVendor}
//                     disabled={vendors.length >= maxVendors}
//                     className="nominate-btn nominate-btn-add"
//                   >
//                     + Add New Vendor
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>

//         <div className="nominate-submit-row">
//           {status && (
//             <p className="registration-status" style={{ marginBottom: '15px', color: 'red' }}>
//               {status}
//             </p>
//           )}

//           <button
//             type="submit"
//             form="nominate-form"
//             className="nominate-btn nominate-btn-primary nominate-submit"
//             aria-label="Submit vendor recommendation"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? 'Submitting...' : 'Submit'}
//           </button>

//           <small className="nominate-submit-note">
//             By submitting you agree that recommended ICT vendors may be contacted. All
//             recommendations are confidential.
//           </small>
//         </div>
//       </section>
//     </main>
//   );
// }
