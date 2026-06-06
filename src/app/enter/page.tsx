export const metadata = {
  title: 'Enter CIO Choice 2026',
  description: 'Enter India’s largest CIO survey for product, service and solution recognition.',
};

const sectionStyle = {
  maxWidth: 1080,
  margin: '0 auto',
  padding: '40px 24px',
};

const cardStyle = {
  background: '#fff',
  borderRadius: '1.75rem',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  boxShadow: '0 24px 55px rgba(0, 0, 0, 0.08)',
  padding: '2rem',
  marginBottom: '1.5rem',
};

const summaryStyle = {
  cursor: 'pointer',
  fontSize: '1.1rem',
  fontWeight: 700,
  margin: 0,
};

const linkStyle = {
  color: '#a40000',
  textDecoration: 'underline',
};

export default function EnterPage() {
  return (
    <main style={{ background: '#f7f7f7' }}>
      <section style={sectionStyle}>
        <div style={{ ...cardStyle, background: '#a40000', color: '#fff' }}>
          <p
            style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.16em', opacity: 0.9 }}
          >
            Enter CIO Choice 2026
          </p>
          <h1 style={{ margin: '1rem 0', fontSize: 'clamp(2rem, 3vw, 3.4rem)', lineHeight: 1.05 }}>
            CIO Choice 2026 welcomes you to participate in India’s largest CIO survey on product,
            service and / or solution recognition where winners are picked by CIOs.
          </h1>
          <p style={{ margin: 0, maxWidth: 860, lineHeight: 1.8, fontSize: '1rem' }}>
            It will only take a couple of minutes of your time to enter. Please be sure to download
            the full terms & conditions and read the details below.
          </p>
        </div>

        <details open style={cardStyle}>
          <summary style={summaryStyle}>Details to Enter</summary>
          <div style={{ marginTop: '1rem', lineHeight: 1.85, color: '#1f2937' }}>
            <p>
              <a
                href="https://www.cio-choice.in/wp-content/uploads/2025/07/CIO-CHOICE-Entry-Form-2026.docx"
                target="_blank"
                rel="noreferrer"
                style={linkStyle}
              >
                CLICK HERE
              </a>{' '}
              TO DOWNLOAD FORM Please download the form from the link provided and fill in the
              details as per the form requirement. It is mandatory to fill each section.
            </p>

            <p>
              <strong>CATEGORY SELECTION:</strong> You are required to select the category of
              recognition your Product/ Service/ Solution falls into. This information is available
              in the entry form. If your Product/ Service/ Solution does not fit any of the
              categories listed below, then please contact us on{' '}
              <a href="mailto:contact@core-mediagroup.com" style={linkStyle}>
                contact@core-mediagroup.com
              </a>{' '}
              and we will incorporate it in the list subject to it being appropriate.
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
              <strong>ENTRIES:</strong> You are allowed to fill in a single Product/ Service/
              Solution as one entry; however, you can fill in multiple entries using a fresh form
              for each new entry even if it is from the same brand, provided they are for a
              different Product/ Service/ Solution each time.
            </p>

            <p>
              <strong>NOTE:</strong> For assistance while filling the descriptions, feel free to
              contact us.
            </p>
          </div>
        </details>

        <details style={cardStyle}>
          <summary style={summaryStyle}>After You Enter</summary>
          <div style={{ marginTop: '1rem', lineHeight: 1.85, color: '#1f2937' }}>
            <p>
              Send the filled in entry form to us on{' '}
              <a href="mailto:contact@core-mediagroup.com" style={linkStyle}>
                contact@core-mediagroup.com
              </a>{' '}
              . We will send an email to you confirming successful entry of your product, service or
              solution & contact you if we need any further information.
            </p>
          </div>
        </details>

        <details style={cardStyle}>
          <summary style={summaryStyle}>The Rules</summary>
          <div style={{ marginTop: '1rem', lineHeight: 1.85, color: '#1f2937' }}>
            <p>
              This is a unique recognition for ICT Product/ Service/ Solution based on preferences
              of CIOs and ICT decision makers that you are entering. But we want to ensure this is
              the right thing for you and that you’re the authorized person to do this. Therefore,
              we request you to please read the terms & conditions in full.
            </p>
            <p>
              You cannot opt out your product, service or solution once submitted. We hope you do
              appreciate that given the nature of the study involved; your opting out at any stage
              may risk the other Product/ Service/ Solution in that category or even an entire
              category.
            </p>
            <p>
              The entry form is an electronic contract. By submitting the on-line entry form you are
              committing to and signing up to the entire process and cannot withdraw at any stage.
            </p>
          </div>
        </details>

        <details style={cardStyle}>
          <summary style={summaryStyle}>Investments Involved</summary>
          <div style={{ marginTop: '1rem', lineHeight: 1.85, color: '#1f2937' }}>
            <p>
              <strong>LARGE ENTERPRISES</strong> (To qualify as a Large Enterprise, the ICT vendor
              company needs to have &gt; 500 employees or an Annual Turnover of &gt; US$ 15m in the
              Indian geography)
            </p>
            <ul style={{ paddingLeft: '1.4rem', marginTop: 0 }}>
              <li>Entry – US$ 1,000 + Local Taxes for Yr. 2026</li>
              <li>
                If Recognised CIO CHOICE of the Year – US$ 11,000 + Local Taxes for Yr. 2026
                (License Fees)
              </li>
              <li>Total after Winning – US$ 12,000 + Local Taxes for Yr. 2026</li>
            </ul>
            <p>
              <strong>SMALL & MEDIUM ENTERPRISES</strong>
            </p>
            <ul style={{ paddingLeft: '1.4rem', marginTop: 0 }}>
              <li>Entry – US$ 1,000 + Local Taxes for Yr. 2026</li>
              <li>
                If Recognised CIO CHOICE of the Year – US$ 8,000 + Local Taxes for Yr. 2026 (License
                Fees)
              </li>
              <li>Total after Winning – US$ 9,000 + Local Taxes for Yr. 2026</li>
            </ul>
            <p>
              Please note that the entry fee is non-refundable even if the advisory panel eliminates
              your Product/ Service/ Solution.
            </p>
          </div>
        </details>

        <details style={cardStyle}>
          <summary style={summaryStyle}>Download the Entry Form and Contact</summary>
          <div style={{ marginTop: '1rem', lineHeight: 1.85, color: '#1f2937' }}>
            <p>
              Please{' '}
              <a
                href="https://www.cio-choice.in/wp-content/uploads/2025/07/CIO-CHOICE-Entry-Form-2026.docx"
                target="_blank"
                rel="noreferrer"
                style={linkStyle}
              >
                CLICK HERE
              </a>{' '}
              to download the Entry Form.
            </p>
            <p>
              Please contact us on{' '}
              <a href="mailto:contact@core-mediagroup.com" style={linkStyle}>
                contact@core-mediagroup.com
              </a>{' '}
              for the terms & conditions.
            </p>
          </div>
        </details>

        <details style={cardStyle}>
          <summary style={summaryStyle}>Questions?</summary>
          <div style={{ marginTop: '1rem', lineHeight: 1.85, color: '#1f2937' }}>
            <p>
              If you have any questions about the entry form and/or the process, please feel free to
              contact us on +91 22 <strong>4608 0974</strong> or you may write to us on{' '}
              <a href="mailto:contact@core-mediagroup.com" style={linkStyle}>
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
