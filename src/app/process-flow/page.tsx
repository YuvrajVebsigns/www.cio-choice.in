export const metadata = {
  title: 'Process and Flow',
  description:
    'CIO CHOICE has a 3 stage easy and simple process for product, solution, and service recognition.',
};

export default function ProcessPage() {
  return (
    <main className="process-page">
      <section className="process-container">
        <div className="process-hero">
          <p className="process-label">Process and Flow</p>
          <h1>CIO CHOICE has a 3 stage easy and simple process</h1>
          <p>
            The CIO CHOICE recognition journey is designed to be transparent, structured and easy to
            follow. Each stage validates entries, engages the advisory panel, and gives CIO peers
            the power to choose the best products, solutions and services in their category.
          </p>
        </div>

        <details open className="process-card">
          <summary>Stage 1: Call for Applications</summary>
          <div>
            <p>
              ICT Companies apply for the CIO CHOICE recognition title based on their offering
              category.
            </p>
            <p>Applications are collated and segregated by the CIO CHOICE secretariat team.</p>
            <p>Eligible entries are validated before moving to the next stage of the process.</p>
          </div>
        </details>

        <details className="process-card">
          <summary>Stage 2: CIO CHOICE Advisory Panel</summary>
          <div>
            <p>The advisory panel includes industry leaders and CIOs from multiple sectors.</p>
            <p>Entries are reviewed, filtered and validated category-wise.</p>
            <p>Validated products, solutions and services move to the CIO voting survey stage.</p>
          </div>
        </details>

        <details className="process-card">
          <summary>Stage 3: CIO Voting Survey</summary>
          <div>
            <p>
              CIOs choose their preferred products, solutions and services through an independent
              voting survey.
            </p>
            <p>Responses are collected from the CIO community across the country.</p>
            <p>The final results determine the CIO CHOICE recognition title holders.</p>
          </div>
        </details>

        <details className="process-card">
          <summary>The Recognition</summary>
          <div>
            <p>
              The recognition is presented during a grand gala evening with CXO guests from the ICT
              space celebrating the honored companies.
            </p>
          </div>
        </details>

        <details className="process-card">
          <summary>Honored Products promote the Recognition</summary>
          <div>
            <p>
              Honored ICT companies can use the CIO CHOICE title logo for one calendar year across
              packaging, promotions, advertising and marketing campaigns.
            </p>
          </div>
        </details>
      </section>
    </main>
  );
}
