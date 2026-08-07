// //
// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { MONGODB_ID_REGEX, NOMINATION_CATEGORY_OPTIONS } from '@/constants/nominations.constants';
// import {
//   submitWebsiteNomination,
//   fetchWebsiteNominationCategories,
// } from '@/services/nominations.service';
// import type { WebsiteNominationCategory } from '@/types/nominations.types';

// type CIOEntry = {
//   categoryId: string;
//   name: string;
//   company: string;
//   email: string;
//   mobile: string;
// };

// type FormErrors = {
//   nominatorName?: string;
//   nominatorCompany?: string;
//   nominatorCity?: string;
//   nominatorEmail?: string;
//   nominatorContact?: string;
//   cios?: {
//     [key: number]: {
//       categoryId?: string;
//       name?: string;
//       company?: string;
//       email?: string;
//       mobile?: string;
//     };
//   };
// };

// export default function NominatePage() {
//   const [nominatorName, setNominatorName] = useState('');
//   const [nominatorCompany, setNominatorCompany] = useState('');
//   const [nominatorCity, setNominatorCity] = useState('');
//   const [nominatorContact, setNominatorContact] = useState('');
//   const [nominatorEmail, setNominatorEmail] = useState('');

//   const [cios, setCios] = useState<CIOEntry[]>([
//     { categoryId: '', name: '', company: '', email: '', mobile: '' },
//   ]);

//   const [submitted, setSubmitted] = useState(false);
//   const [status, setStatus] = useState<string | null>(null);
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [categories, setCategories] = useState<WebsiteNominationCategory[]>([]);
//   const [categoriesLoading, setCategoriesLoading] = useState(false);
//   const [categoriesError, setCategoriesError] = useState<string | null>(null);

//   const [animatingCioIndex, setAnimatingCioIndex] = useState<number | null>(null);
//   const [animationType, setAnimationType] = useState<'add' | 'remove' | null>(null);

//   const maxCios = 10;

//   useEffect(() => {
//     let isMounted = true;

//     async function loadCategories() {
//       setCategoriesLoading(true);
//       setCategoriesError(null);

//       try {
//         const response = await fetchWebsiteNominationCategories();
//         if (!isMounted) return;
//         setCategories(response ?? []);
//       } catch (error) {
//         if (!isMounted) return;
//         setCategoriesError(
//           error instanceof Error
//             ? error.message
//             : 'Unable to load categories. Please refresh the page.',
//         );
//       } finally {
//         if (isMounted) {
//           setCategoriesLoading(false);
//         }
//       }
//     }

//     loadCategories();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   const addCio = () => {
//     if (cios.length >= maxCios) return;

//     setCios((prev) => {
//       const newIndex = prev.length;

//       setTimeout(() => {
//         setAnimationType('add');
//         setAnimatingCioIndex(newIndex);

//         setTimeout(() => {
//           setAnimatingCioIndex(null);
//           setAnimationType(null);
//         }, 800);
//       }, 10);

//       return [...prev, { categoryId: '', name: '', company: '', email: '', mobile: '' }];
//     });
//   };

//   const removeCio = (idx: number) => {
//     setAnimationType('remove');
//     setAnimatingCioIndex(idx);

//     setTimeout(() => {
//       setCios((prev) => prev.filter((_, i) => i !== idx));

//       if (errors.cios?.[idx]) {
//         const nextCioErrors = { ...errors.cios };
//         delete nextCioErrors[idx];
//         setErrors({ ...errors, cios: nextCioErrors });
//       }

//       setAnimatingCioIndex(null);
//       setAnimationType(null);
//     }, 600);
//   };

//   const updateCio = (idx: number, key: keyof CIOEntry, value: string) => {
//     setCios((prev) => prev.map((c, i) => (i === idx ? { ...c, [key]: value } : c)));

//     if (errors.cios?.[idx]?.[key]) {
//       setErrors({
//         ...errors,
//         cios: {
//           ...errors.cios,
//           [idx]: {
//             ...errors.cios[idx],
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

//     if (!nominatorName.trim()) {
//       nextErrors.nominatorName = 'Nominator name is required.';
//       hasErrors = true;
//     } else if (!nameRegex.test(nominatorName)) {
//       nextErrors.nominatorName = 'Only alphabets are allowed.';
//       hasErrors = true;
//     }

//     if (!nominatorCompany.trim()) {
//       nextErrors.nominatorCompany = 'Company name is required.';
//       hasErrors = true;
//     }

//     if (!nominatorCity.trim()) {
//       nextErrors.nominatorCity = 'City is required.';
//       hasErrors = true;
//     }

//     if (!nominatorEmail.trim()) {
//       nextErrors.nominatorEmail = 'Email is required.';
//       hasErrors = true;
//     } else if (!emailRegex.test(nominatorEmail)) {
//       nextErrors.nominatorEmail = 'Enter a valid email.';
//       hasErrors = true;
//     }

//     if (nominatorContact && !phoneRegex.test(nominatorContact)) {
//       nextErrors.nominatorContact = 'Enter a valid 10-digit phone number.';
//       hasErrors = true;
//     }

//     const cioErrorsMap: NonNullable<FormErrors['cios']> = {};

//     cios.forEach((c, idx) => {
//       const currentCioErrors: NonNullable<FormErrors['cios']>[number] = {};

//       if (!c.categoryId) {
//         currentCioErrors.categoryId = 'Please select a category.';
//         hasErrors = true;
//       } else if (!MONGODB_ID_REGEX.test(c.categoryId)) {
//         currentCioErrors.categoryId = 'Invalid category. Please select again.';
//         hasErrors = true;
//       }

//       if (!c.name.trim()) {
//         currentCioErrors.name = 'CIO name is required.';
//         hasErrors = true;
//       } else if (!nameRegex.test(c.name)) {
//         currentCioErrors.name = 'Only alphabets are allowed.';
//         hasErrors = true;
//       }

//       if (!c.company.trim()) {
//         currentCioErrors.company = 'CIO company is required.';
//         hasErrors = true;
//       }

//       if (!c.email.trim()) {
//         currentCioErrors.email = 'Email is required.';
//         hasErrors = true;
//       } else if (!emailRegex.test(c.email)) {
//         currentCioErrors.email = 'Enter a valid email address.';
//         hasErrors = true;
//       }

//       if (c.mobile && !phoneRegex.test(c.mobile)) {
//         currentCioErrors.mobile = 'Enter a valid 10-digit mobile number.';
//         hasErrors = true;
//       }

//       if (Object.keys(currentCioErrors).length > 0) {
//         cioErrorsMap[idx] = currentCioErrors;
//       }
//     });

//     if (Object.keys(cioErrorsMap).length > 0) {
//       nextErrors.cios = cioErrorsMap;
//     }

//     setErrors(nextErrors);

//     if (hasErrors) {
//       setStatus('Please fix the errors marked in the form below.');
//       return;
//     }

//     setStatus(null);
//     setIsSubmitting(true);

//     try {
//       const response = await submitWebsiteNomination({
//         nominatorName,
//         nominatorCompany,
//         nominatorCity,
//         nominatorContact,
//         nominatorEmail,
//         nominees: cios.map((cio) => ({
//           categoryId: cio.categoryId,
//           contactName: cio.name,
//           companyName: cio.company,
//           contactEmail: cio.email,
//           mobileNo: cio.mobile,
//         })),
//       });

//       const apiMessage =
//         response && typeof response === 'object' && 'message' in response
//           ? String((response as { message?: string }).message)
//           : '';

//       if (apiMessage) {
//         setStatus(apiMessage);
//       }

//       setSubmitted(true);
//     } catch (error) {
//       setStatus(
//         error instanceof Error ? error.message : 'Failed to submit nomination. Please try again.',
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
//           <h1>CIO CHOICE 2026 — Nomination Received</h1>
//           <p>
//             Thank you. Your nomination has been recorded. You will receive a confirmation email
//             shortly and the nominated CIO(s) will be notified as described.
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
//         <h1>ICT Vendor Recommendation Form</h1>

//         <p>
//           Help us recognize the ICT vendors that have consistently delivered excellence, innovation,
//           and customer-centric solutions. Your recommendation contributes to identifying the most
//           trusted technology partners in the industry.
//         </p>

//         <div className="nominate-info-box">
//           <p>
//             <strong>Dear CIO,</strong>
//           </p>

//           <p>You are important and your vote is important.</p>

//           <p>
//             Your recommendation will help and assist ICT Vendors applying for the CIO CHOICE
//             Recognition and enable them to earn the trust and respect of the CIO community.
//           </p>

//           <p>
//             Vendors from the Technology space can be recommended under categories such as
//             Independent Software Vendors, Software Products, Hardware, Network & Storage Vendors,
//             Data Centre & IT Infrastructure Vendors, Security Vendors, Telecom Services Vendors, DR
//             & BCP Services Vendors, System Integrators, and other related ICT solution providers.
//           </p>

//           <p>
//             The approach to vendor recognition is based on a<strong> Customer-Centric</strong>{' '}
//             evaluation model that reflects real customer experience with ICT vendors.
//           </p>

//           <h3>Nomination Process &amp; Confirmation</h3>

//           <p>
//             Once you complete this form, the following confirmation emails will be automatically
//             triggered:
//           </p>

//           <ol>
//             <li>
//               To the <strong>CIO CHOICE Team</strong>, containing your recommendation details.
//             </li>

//             <li>
//               To <strong>you</strong>, acknowledging and summarizing your submitted recommendations.
//             </li>

//             <li>
//               To each recommended ICT vendor, informing them that they have been recommended by you
//               for <strong>CIO CHOICE 2027</strong>.
//             </li>
//           </ol>

//           <p className="nominate-note">
//             <strong>
//               Please note that your referral vote is confidential and will not be shared, displayed,
//               or published in any private or public forum.
//             </strong>
//           </p>
//         </div>
//         <br />
//         <br />

//         <div className="nominate-wrapper">
//           <div className="nominate-card">
//             <div className="nominate-card-header">NOMINATION FORM</div>

//             <div className="nominate-card-body">
//               <p className="nominate-sub">
//                 You can nominate up to 10 Influential CIOs by clicking on the &quot;Add CIO&quot;
//                 button.
//               </p>

//               <form id="nominate-form" onSubmit={handleSubmit} className="nominate-form" noValidate>
//                 <fieldset className="nominate-fieldset">
//                   <legend className="nominate-legend">Nominator details</legend>

//                   <label className="nominate-label">
//                     CIO&apos;s Name *
//                     <input
//                       value={nominatorName}
//                       onChange={(e) => {
//                         setNominatorName(e.target.value.replace(/[^A-Za-z\s]/g, ''));
//                         if (errors.nominatorName)
//                           setErrors({ ...errors, nominatorName: undefined });
//                       }}
//                       placeholder="Full Name"
//                       className="nominate-input-field"
//                     />
//                     {errors.nominatorName && (
//                       <div className="registration-error">{errors.nominatorName}</div>
//                     )}
//                   </label>

//                   <label className="nominate-label">
//                     CIO&apos;s Company Name *
//                     <input
//                       value={nominatorCompany}
//                       onChange={(e) => {
//                         setNominatorCompany(e.target.value);
//                         if (errors.nominatorCompany) {
//                           setErrors({ ...errors, nominatorCompany: undefined });
//                         }
//                       }}
//                       className="nominate-input-field"
//                     />
//                     {errors.nominatorCompany && (
//                       <div className="registration-error">{errors.nominatorCompany}</div>
//                     )}
//                   </label>

//                   <label className="nominate-label">
//                     CIO&apos;s City *
//                     <input
//                       value={nominatorCity}
//                       onChange={(e) => {
//                         setNominatorCity(e.target.value);
//                         if (errors.nominatorCity)
//                           setErrors({ ...errors, nominatorCity: undefined });
//                       }}
//                       placeholder="eg. Mumbai"
//                       className="nominate-input-field"
//                     />
//                     {errors.nominatorCity && (
//                       <div className="registration-error">{errors.nominatorCity}</div>
//                     )}
//                   </label>

//                   <label className="nominate-label">
//                     CIO&apos;s Contact Number
//                     <input
//                       type="tel"
//                       value={nominatorContact}
//                       onChange={(e) => {
//                         setNominatorContact(e.target.value.replace(/[^0-9]/g, ''));
//                         if (errors.nominatorContact) {
//                           setErrors({ ...errors, nominatorContact: undefined });
//                         }
//                       }}
//                       maxLength={10}
//                       placeholder="9876543210"
//                       className="nominate-input-field"
//                     />
//                     {errors.nominatorContact && (
//                       <div className="registration-error">{errors.nominatorContact}</div>
//                     )}
//                   </label>

//                   <label className="nominate-label">
//                     CIO&apos;s Email ID *
//                     <input
//                       type="email"
//                       value={nominatorEmail}
//                       onChange={(e) => {
//                         setNominatorEmail(e.target.value);
//                         if (errors.nominatorEmail) {
//                           setErrors({ ...errors, nominatorEmail: undefined });
//                         }
//                       }}
//                       placeholder="abc@abc.com"
//                       className="nominate-input-field"
//                     />
//                     {errors.nominatorEmail && (
//                       <div className="registration-error">{errors.nominatorEmail}</div>
//                     )}
//                     <br />
//                     <br />
//                   </label>
//                 </fieldset>

//                 <fieldset className="nominate-fieldset">
//                   <legend className="nominate-legend"> You can recommend (up to {maxCios})</legend>

//                   {cios.map((c, idx) => (
//                     <div
//                       key={idx}
//                       className={`nominate-cio-block ${
//                         animatingCioIndex === idx && animationType === 'add' ? 'cio-slide-in' : ''
//                       } ${
//                         animatingCioIndex === idx && animationType === 'remove'
//                           ? 'cio-slide-out'
//                           : ''
//                       }`}
//                     >
//                       <div className="nominate-cio-top">
//                         <strong className="nominate-cio-title">CIO {idx + 1}</strong>
//                         {cios.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => removeCio(idx)}
//                             className="nominate-remove-btn"
//                           >
//                             Remove
//                           </button>
//                         )}
//                       </div>

//                       <label className="nominate-label">
//                         Recommended ICT Vendor by Category *
//                         <select
//                           value={c.categoryId}
//                           onChange={(e) => updateCio(idx, 'categoryId', e.target.value)}
//                           className="nominate-input-field"
//                         >
//                           <option value="">
//                             {categoriesLoading ? 'Loading categories...' : '- Select Category -'}
//                           </option>
//                           {(categories.length > 0 ? categories : NOMINATION_CATEGORY_OPTIONS).map(
//                             (option) => (
//                               <option key={option.id} value={option.id}>
//                                 {'name' in option ? option.name : option.label}
//                               </option>
//                             ),
//                           )}
//                         </select>
//                         {errors.cios?.[idx]?.categoryId && (
//                           <div className="registration-error">{errors.cios[idx].categoryId}</div>
//                         )}
//                         {categoriesError && (
//                           <div className="registration-error">{categoriesError}</div>
//                         )}
//                       </label>

//                       <label className="nominate-label">
//                         ICT Vendor Contact Name *
//                         <input
//                           value={c.name}
//                           onChange={(e) =>
//                             updateCio(idx, 'name', e.target.value.replace(/[^A-Za-z\s]/g, ''))
//                           }
//                           className="nominate-input-field"
//                         />
//                         {errors.cios?.[idx]?.name && (
//                           <div className="registration-error">{errors.cios[idx].name}</div>
//                         )}
//                       </label>

//                       <label className="nominate-label">
//                         ICT Company Name *
//                         <input
//                           value={c.company}
//                           onChange={(e) => updateCio(idx, 'company', e.target.value)}
//                           className="nominate-input-field"
//                         />
//                         {errors.cios?.[idx]?.company && (
//                           <div className="registration-error">{errors.cios[idx].company}</div>
//                         )}
//                       </label>

//                       <label className="nominate-label">
//                         Contact Email *
//                         <input
//                           type="email"
//                           value={c.email}
//                           onChange={(e) => updateCio(idx, 'email', e.target.value)}
//                           className="nominate-input-field"
//                         />
//                         {errors.cios?.[idx]?.email && (
//                           <div className="registration-error">{errors.cios[idx].email}</div>
//                         )}
//                       </label>

//                       <label className="nominate-label">
//                         Mobile No.
//                         <input
//                           type="tel"
//                           value={c.mobile}
//                           onChange={(e) =>
//                             updateCio(idx, 'mobile', e.target.value.replace(/[^0-9]/g, ''))
//                           }
//                           maxLength={10}
//                           placeholder="9876543210"
//                           className="nominate-input-field"
//                         />
//                         {errors.cios?.[idx]?.mobile && (
//                           <div className="registration-error">{errors.cios[idx].mobile}</div>
//                         )}
//                       </label>
//                     </div>
//                   ))}
//                 </fieldset>

//                 <div className="nominate-add-wrap">
//                   <button
//                     type="button"
//                     onClick={addCio}
//                     disabled={cios.length >= maxCios}
//                     className="nominate-btn nominate-btn-add"
//                   >
//                     + Add CIO
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
//             aria-label="Submit nomination"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? 'Submitting...' : 'Submit'}
//           </button>

//           <small className="nominate-submit-note">
//             By submitting you agree that nominated CIOs will be contacted. All nominations are
//             confidential.
//           </small>
//         </div>
//       </section>
//     </main>
//   );
// }

'use client';

import Select, { StylesConfig } from 'react-select';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MONGODB_ID_REGEX, NOMINATION_CATEGORY_OPTIONS } from '@/constants/nominations.constants';
import {
  submitWebsiteNomination,
  fetchWebsiteNominationCategories,
} from '@/services/nominations.service';
import type { WebsiteNominationCategory } from '@/types/nominations.types';

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

  const [categories, setCategories] = useState<WebsiteNominationCategory[]>([]);
  // const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  const [animatingCioIndex, setAnimatingCioIndex] = useState<number | null>(null);
  const [animationType, setAnimationType] = useState<'add' | 'remove' | null>(null);

  const maxCios = 10;

  useEffect(() => {
    if (submitted) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [submitted]);

  useEffect(() => {
    let isMounted = true;

    async function loadCategories() {
      // setCategoriesLoading(true);
      setCategoriesError(null);

      try {
        const response = await fetchWebsiteNominationCategories();
        if (!isMounted) return;
        setCategories(response ?? []);
      } catch (error) {
        if (!isMounted) return;
        setCategoriesError(
          error instanceof Error
            ? error.message
            : 'Unable to load categories. Please refresh the page.',
        );
      } finally {
        // if (isMounted) {
        //   setCategoriesLoading(false);
        // }
      }
    }

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

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

  // const categoryOptions = (categories.length > 0 ? categories : NOMINATION_CATEGORY_OPTIONS).map(
  //   (option) => ({
  //     value: option.id,
  //     label: 'name' in option ? option.name : option.label,
  //   }),
  // );

  type CategoryOption = {
    value: string;
    label: string;
  };

  const categoryOptions: CategoryOption[] = (
    categories.length > 0 ? categories : NOMINATION_CATEGORY_OPTIONS
  ).map((option) => ({
    value: option.id,
    label: 'name' in option ? option.name : option.label,
  }));

  const customSelectStyles: StylesConfig<CategoryOption, false> = {
    control: (provided, state) => ({
      ...provided,
      minHeight: 52,
      borderRadius: 14,
      borderColor: state.isFocused ? '#8e0101' : 'rgba(142,1,1,.18)',
      boxShadow: state.isFocused ? '0 0 0 4px rgba(142,1,1,.1)' : 'none',
      '&:hover': {
        borderColor: '#8e0101',
      },
    }),

    placeholder: (provided) => ({
      ...provided,
      color: '#999',
    }),

    valueContainer: (provided) => ({
      ...provided,
      padding: '0 14px',
    }),

    indicatorSeparator: () => ({
      display: 'none',
    }),

    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#8e0101',
    }),

    menu: (provided) => ({
      ...provided,
      borderRadius: 14,
      overflow: 'hidden',
      zIndex: 9999,
    }),

    menuList: (provided) => ({
      ...provided,
      maxHeight: 260,
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#8e0101' : state.isFocused ? '#f8e9e9' : '#fff',
      color: state.isSelected ? '#fff' : '#333',
      cursor: 'pointer',
      padding: 12,
    }),
  };

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
                      {/* <div className="nominate-cio-top">
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

                      

                      <label className="nominate-label nominate-category-field">
  Recommended ICT Vendor by Category *

  <Select
    styles={customSelectStyles}
    options={categoryOptions}
    placeholder="Select Category"
    isSearchable
    value={
      categoryOptions.find(
        (option) => option.value === c.categoryId
      ) || null
    }
    onChange={(selected) =>
      updateCio(idx, 'categoryId', selected?.value || '')
    }
  />

  {errors.cios?.[idx]?.categoryId && (
    <div className="registration-error">
      {errors.cios[idx].categoryId}
    </div>
  )}

  {categoriesError && (
    <div className="registration-error">
      {categoriesError}
    </div>
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
                    </div> */}

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

                      {/* <label className="nominate-label">
                        Recommended ICT Vendor by Category *
                       

                        <Select
  styles={customSelectStyles}
  options={categoryOptions}
  placeholder="Select Category"
  isSearchable
  value={
    categoryOptions.find(
      (option) => option.value === c.categoryId
    ) || null
  }
  onChange={(selected) =>
    updateCio(idx, 'categoryId', selected?.value || '')
  }
/>


                        {errors.cios?.[idx]?.categoryId && (
                          <div className="registration-error">{errors.cios[idx].categoryId}</div>
                        )}
                        {categoriesError && (
                          <div className="registration-error">{categoriesError}</div>
                        )}
                      </label> */}

                      <label className="nominate-label nominate-category-field">
                        Recommended ICT Vendor by Category *
                        <Select
                          styles={customSelectStyles}
                          options={categoryOptions}
                          placeholder="Select Category"
                          isSearchable
                          value={
                            categoryOptions.find((option) => option.value === c.categoryId) || null
                          }
                          onChange={(selected) =>
                            updateCio(idx, 'categoryId', selected?.value || '')
                          }
                        />
                        {errors.cios?.[idx]?.categoryId && (
                          <div className="registration-error">{errors.cios[idx].categoryId}</div>
                        )}
                        {categoriesError && (
                          <div className="registration-error">{categoriesError}</div>
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
