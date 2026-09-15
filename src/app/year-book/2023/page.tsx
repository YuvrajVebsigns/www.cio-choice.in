'use client';

import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const spreads: string[][] = [
  ['/assets/book2025/1.png'],
  ['/assets/book2025/2.png', '/assets/book2025/3.png'],
  ['/assets/book2025/4.png', '/assets/book2025/5.png'],
  ['/assets/book2025/6.png', '/assets/book2025/7.png'],
  ['/assets/book2025/8.png', '/assets/book2025/9.png'],
];

export default function SurveyStudyPage() {
  const [currentSpread, setCurrentSpread] = useState<number>(0);

  const heroContentRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.12,
    once: false,
  });

  const handleYearbookDownload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const pdfUrl = '/assets/yearbook/2026/CIO-CHOICE-2026-Yearbook.pdf';

    const link = document.createElement('a');

    link.href = pdfUrl;
    link.download = 'CIO-Choice-2023-YearBook.pdf';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const countryCodes = [
    { code: '+91', country: 'India' },
    { code: '+1', country: 'USA / Canada' },
    { code: '+44', country: 'United Kingdom' },
    { code: '+61', country: 'Australia' },
    { code: '+81', country: 'Japan' },
    { code: '+82', country: 'South Korea' },
    { code: '+86', country: 'China' },
    { code: '+65', country: 'Singapore' },
    { code: '+60', country: 'Malaysia' },
    { code: '+971', country: 'UAE' },
    { code: '+966', country: 'Saudi Arabia' },
    { code: '+974', country: 'Qatar' },
    { code: '+92', country: 'Pakistan' },
    { code: '+880', country: 'Bangladesh' },
    { code: '+94', country: 'Sri Lanka' },
    { code: '+977', country: 'Nepal' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
    { code: '+39', country: 'Italy' },
    { code: '+34', country: 'Spain' },
    { code: '+31', country: 'Netherlands' },
    { code: '+41', country: 'Switzerland' },
    { code: '+43', country: 'Austria' },
    { code: '+7', country: 'Russia / Kazakhstan' },
    { code: '+55', country: 'Brazil' },
    { code: '+52', country: 'Mexico' },
    { code: '+27', country: 'South Africa' },
    { code: '+20', country: 'Egypt' },
    { code: '+234', country: 'Nigeria' },
    { code: '+254', country: 'Kenya' },
    { code: '+63', country: 'Philippines' },
    { code: '+66', country: 'Thailand' },
    { code: '+84', country: 'Vietnam' },
    { code: '+64', country: 'New Zealand' },
  ];

  const currentPages = spreads[currentSpread] ?? [];

  const nextPage = () => {
    setCurrentSpread((prev) => Math.min(prev + 1, spreads.length - 1));
  };

  const prevPage = () => {
    setCurrentSpread((prev) => Math.max(prev - 1, 0));
  };

  return (
    <>
      <section className="survey-study-section" style={{ padding: '40px 24px' }}>
        <div className="survey-study-container">
          <div className="survey-study-row">
            <div className="survey-study-content" ref={heroContentRef}>
              <h2>CIO Choice 2023 Year Book</h2>

              <p className="survey-study-intro">
                The <strong>CIO Choice 2023 Year Book</strong> showcases India&apos;s most trusted
                ICT brands recognized by CIO Choice based on the stated preferences of CIOs and
                technology decision-makers.
              </p>

              <div className="survey-study-card">
                <div className="survey-study-book">
                  <img
                    src="/assets/yearbook/2023/1.png"
                    alt="CIO Choice Year Book 2026"
                    className="survey-study-book-image"
                  />

                  <div className="survey-study-book-content">
                    <h3>Year Book 2023</h3>

                    <p>
                      Enterprises honored with the prestigious CIO Choice 2023 Recognition are
                      acknowledged for delivering exceptional IT products, services, and solutions.
                    </p>

                    <p>
                      CIO Choice is distinguished as a mark of customer satisfaction and endorsement
                      by CIOs. Participation in CIO Choice is exclusive and reserved for industry
                      leaders in the ICT sector.
                    </p>

                    <p>
                      Achieving CIO Choice Recognition enhances brand value and serves as a powerful
                      tool for accelerating sales, providing assurance to customers and end users
                      alike that they are investing in top-tier offerings within their respective
                      categories.
                    </p>

                    <p>
                      Recognized organizations are prominently featured in the{' '}
                      <strong>CIO Choice 2023 Coffee Table Book.</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="book-section">
        <div className="book-container">
          <h2>CIO Choice Year Book</h2>

          <div className="book-wrapper">
            <button
              type="button"
              className="book-arrow left"
              onClick={prevPage}
              disabled={currentSpread === 0}
              aria-label="Previous page"
            >
              &#10094;
            </button>

            <div className={`book-spread ${currentSpread === 0 ? 'book-cover' : ''}`}>
              {currentPages.map((page, index) => (
                <div className="book-page" key={page}>
                  <img src={page} alt={`CIO Choice Year Book Page ${index + 1}`} />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="book-arrow right"
              onClick={nextPage}
              disabled={currentSpread === spreads.length - 1}
              aria-label="Next page"
            >
              &#10095;
            </button>
          </div>

          <div className="book-indicator">
            {currentSpread === 0
              ? 'Cover Page'
              : `Pages ${currentSpread * 2} - ${currentSpread * 2 + 1}`}
          </div>
        </div>
      </section>

      <section className="yearbook-download-section">
        <div className="yearbook-download-container">
          <p className="yearbook-download-heading">
            Please fill in your details below and click on ‘SUBMIT’ to download your copy of Year
            Book.
          </p>

          <form className="yearbook-download-form" onSubmit={handleYearbookDownload}>
            {/* First Name */}
            <div className="yearbook-form-row">
              <label htmlFor="firstName">
                First Name <span>*</span>
              </label>

              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter first name"
                required
                minLength={2}
                maxLength={50}
                pattern="[A-Za-z\s'-]+"
                title="First name should contain letters only"
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z\s'-]/g, '');
                }}
              />
            </div>

            {/* Last Name */}
            <div className="yearbook-form-row">
              <label htmlFor="lastName">
                Last Name <span>*</span>
              </label>

              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter last name"
                required
                minLength={2}
                maxLength={50}
                pattern="[A-Za-z\s'-]+"
                title="Last name should contain letters only"
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z\s'-]/g, '');
                }}
              />
            </div>

            {/* Company Name */}
            <div className="yearbook-form-row">
              <label htmlFor="companyName">
                Company Name <span>*</span>
              </label>

              <input
                type="text"
                id="companyName"
                name="companyName"
                placeholder="Enter company name"
                required
                minLength={2}
                maxLength={100}
                title="Enter a valid company name"
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /[^A-Za-z0-9\s&.,'()-]/g,
                    '',
                  );
                }}
              />
            </div>

            {/* Designation */}
            <div className="yearbook-form-row">
              <label htmlFor="designation">
                Designation <span>*</span>
              </label>

              <input
                type="text"
                id="designation"
                name="designation"
                placeholder="Enter designation"
                required
                minLength={2}
                maxLength={80}
                pattern="[A-Za-z\s]+"
                title="Designation should contain letters only"
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z\s]/g, '');
                }}
              />
            </div>

            {/* Mobile */}
            <div className="yearbook-form-row">
              <label htmlFor="mobile">
                Mobile No <span>*</span>
              </label>

              <div className="mobile-input">
                {/* Country Code */}
                <select
                  name="countryCode"
                  id="countryCode"
                  className="country-code"
                  defaultValue="+91"
                  aria-label="Country code"
                  required
                >
                  {countryCodes.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.code} ({item.country})
                    </option>
                  ))}
                </select>

                {/* Mobile Number */}
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  placeholder="Enter mobile number"
                  inputMode="numeric"
                  pattern="[0-9]+"
                  minLength={7}
                  maxLength={15}
                  required
                  title="Mobile number should contain numbers only"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '').slice(0, 15);
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div className="yearbook-form-row">
              <label htmlFor="email">
                Email <span>*</span>
              </label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="abc@abc.com"
                maxLength={100}
                required
              />
            </div>

            {/* Industry */}
            <div className="yearbook-form-row">
              <label htmlFor="industry">
                Industry <span>*</span>
              </label>

              <select id="industry" name="industry" required defaultValue="">
                <option value="" disabled>
                  Select Industry
                </option>

                <option value="AUTOMOBILES & AUTO ANCILLARIES">
                  AUTOMOBILES & AUTO ANCILLARIES
                </option>

                <option value="BANKING">BANKING</option>

                <option value="CHEMICALS">CHEMICALS</option>

                <option value="CONSULTING">CONSULTING</option>

                <option value="DIVERSIFIED GROUP">DIVERSIFIED GROUP</option>

                <option value="E-COMMERCE">E-COMMERCE</option>

                <option value="EDUCATION">EDUCATION</option>

                <option value="ENGINEERING">ENGINEERING</option>

                <option value="FINANCIAL SERVICES">FINANCIAL SERVICES</option>

                <option value="FMCG">FMCG</option>

                <option value="HEALTHCARE & PHARMA">HEALTHCARE & PHARMA</option>

                <option value="INSURANCE">INSURANCE</option>

                <option value="IT, BPO & ITES">IT, BPO & ITES</option>

                <option value="MANUFACTURING">MANUFACTURING</option>

                <option value="MEDIA & ENTERTAINMENT">MEDIA & ENTERTAINMENT</option>

                <option value="NBFC">NBFC</option>

                <option value="REALTY">REALTY</option>

                <option value="RETAIL">RETAIL</option>

                <option value="TELECOM">TELECOM</option>

                <option value="TRANSPORT & LOGISTICS">TRANSPORT & LOGISTICS</option>

                <option value="TRAVEL & HOSPITALITY">TRAVEL & HOSPITALITY</option>

                <option value="UTILITIES">UTILITIES</option>

                <option value="OTHER">OTHER</option>
              </select>
            </div>

            {/* Submit */}
            <button type="submit" className="yearbook-submit-btn">
              SUBMIT
            </button>
          </form>
        </div>
      </section>

      <section className="yearbook-cards-section">
        <div className="yearbook-cards-container">
          <h2>Explore Year Books</h2>

          <div className="yearbook-cards-grid">
            {Array.from({ length: 14 }, (_, index) => {
              const year = 2026 - index;

              const yearbookImages: Record<number, string> = {
                2026: '/assets/yearbook/2026/page-01.jpg',
                2025: '/assets/yearbook/2025/page-001.jpg',
                2024: '/assets/yearbook/2024/page-001.jpg',
                2023: '/assets/yearbook/2023/page-001.jpg',
                2022: '/assets/yearbook/2022/page-001.jpg',
                2021: '/assets/yearbook/2021/page-001.jpg',
                2020: '/assets/yearbook/2020/page-001.jpg',
                2019: '/assets/yearbook/2019/page-001.jpg',
                2018: '/assets/yearbook/2018/page-001.jpg',
                2017: '/assets/yearbook/2017/page-001.jpg',
                2016: '/assets/yearbook/2016/page-001.jpg',
                2015: '/assets/yearbook/2015/page-001.jpg',
                2014: '/assets/yearbook/2014/page-01.jpg',
                2013: '/assets/yearbook/2013/page-01.jpg',
              };

              return (
                <div className="yearbook-card" key={year}>
                  <div className="yearbook-card-image">
                    <img src={yearbookImages[year]} alt={`CIO Choice Year Book ${year}`} />
                  </div>

                  <h3>{year} Year Book</h3>

                  <a href={`/year-book/${year}`} className="yearbook-card-btn">
                    View Book
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
