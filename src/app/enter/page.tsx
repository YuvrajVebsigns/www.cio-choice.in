import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enter CIO Choice 2027 | ICT Brand Recognition',
  description:
    'Enter CIO Choice 2027 to nominate your ICT product, service or solution for recognition through an independent CIO voting survey in India.',
  keywords: [
    'Enter CIO Choice 2027',
    'CIO Choice 2027 entry',
    'CIO Choice nomination',
    'ICT brand recognition India',
    'CIO voting survey',
    'technology product recognition',
    'IT service recognition',
    'ICT solution awards',
    'CIO Choice entry form',
    'CIO Choice participation',
  ],
  alternates: {
    canonical: 'https://ciochoice.com/enter',
  },
  openGraph: {
    title: 'Enter CIO Choice 2027 | Submit Your Entry',
    description:
      'Enter CIO Choice 2027 to nominate your ICT product, service or solution for recognition through an independent CIO voting survey in India.',
    url: 'https://ciochoice.com/enter',
    siteName: 'CIO Choice',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enter CIO Choice 2027 | Submit Your Entry',
    description:
      'Enter CIO Choice 2027 to nominate your ICT product, service or solution for recognition through an independent CIO voting survey in India.',
  },
};

export default function EnterPage() {
  return (
    <main className="enter-page">
      <section className="enter-section">
        <div className="enter-hero">
          <p className="enter-label">Enter CIO Choice 2027</p>

          <h1>
            CIO Choice 2027 welcomes you to participate in India’s largest CIO survey on product,
            service and / or solution recognition where winners are picked by CIOs.
          </h1>
        </div>

        <details open className="enter-card">
          <summary>Details to Enter</summary>

          <div className="enter-card-content">
            <p>
              <p>
                <a href="/research">CLICK HERE</a>
              </p>
              TO DOWNLOAD FORM. Please download the form from the link provided and fill in the
              details as per the form requirement. It is mandatory to fill each section.
            </p>

            <p>
              <strong>CATEGORY SELECTION:</strong> You are required to select the category of
              recognition your Product/ Service/ Solution falls into. If your Product/ Service/
              Solution does not fit any of the categories listed, please contact us on{' '}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@core-mediagroup.com&su=Enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-item"
              >
                contact@core-mediagroup.com
              </a>
              .
            </p>

            <p>
              <strong>DESCRIPTION:</strong> Please enter a paragraph of no more than 100 words
              describing your Product/ Service/ Solution and its innovative/associated features.
            </p>

            <p>
              <strong>AUTHORIZATION:</strong> Please ensure that you have the appropriate
              permissions and are duly authorized to enter on behalf of the Product/ Service/
              Solution.
            </p>

            <p>
              <strong>ENTRIES:</strong> You can fill in multiple entries using a fresh form for each
              Product/ Service/ Solution.
            </p>

            <p>
              <strong>NOTE:</strong> For assistance while filling the descriptions, feel free to
              contact us.
            </p>
          </div>
        </details>

        <details className="enter-card">
          <summary>After You Enter</summary>

          <div className="enter-card-content">
            <p>
              Send the filled entry form to{' '}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@core-mediagroup.com&su=Enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-item"
              >
                contact@core-mediagroup.com
              </a>
              . We will confirm successful entry and contact you if more information is required.
            </p>
          </div>
        </details>

        <details className="enter-card">
          <summary>The Rules</summary>

          <div className="enter-card-content">
            <p>
              This recognition is based on preferences of CIOs and ICT decision makers. Please read
              the terms & conditions in full before submitting.
            </p>

            <p>Once submitted, a product, service or solution cannot be withdrawn at any stage.</p>

            <p>
              The entry form is an electronic contract. By submitting it, you agree to the complete
              process.
            </p>
          </div>
        </details>

        <details className="enter-card">
          <summary>Investments Involved</summary>

          <div className="enter-card-content">
            <p>
              <strong>LARGE ENTERPRISES</strong> — ICT vendor company with &gt; 500 employees or
              annual turnover of &gt; US$ 15m in India.
            </p>

            <ul>
              <li>Entry – US$ 1,000 + Local Taxes for Yr. 2027</li>
              <li>If Recognised – US$ 11,000 + Local Taxes for Yr. 2027</li>
              <li>Total after Winning – US$ 12,000 + Local Taxes for Yr. 2027</li>
            </ul>

            <p>
              <strong>SMALL &amp; MEDIUM ENTERPRISES</strong>
            </p>

            <ul>
              <li>Entry – US$ 1,000 + Local Taxes for Yr. 2027</li>
              <li>If Recognised – US$ 8,000 + Local Taxes for Yr. 2027</li>
              <li>Total after Winning – US$ 9,000 + Local Taxes for Yr. 2027</li>
            </ul>

            <p>
              Please note that the entry fee is non-refundable even if the advisory panel eliminates
              your Product/ Service/ Solution.
            </p>
          </div>
        </details>

        <details className="enter-card">
          <summary>Download the Entry Form and Contact</summary>

          <div className="enter-card-content">
            <p>
              Please <a href="/research">CLICK HERE</a> to download the Entry Form.
            </p>

            <p>
              Please contact us on{' '}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@core-mediagroup.com&su=Enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-item"
              >
                contact@core-mediagroup.com
              </a>{' '}
              for the terms &amp; conditions.
            </p>
          </div>
        </details>

        <details className="enter-card">
          <summary>Questions?</summary>

          <div className="enter-card-content">
            <p>
              Contact us on +91 22 <strong>4608 0974</strong> or write to{' '}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@core-mediagroup.com&su=Enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-item"
              >
                contact@core-mediagroup.com
              </a>
              .
            </p>
          </div>
        </details>
      </section>
    </main>
  );
}
