'use client';

export default function DownloadReportPage() {
  return (
    <section className="download-report-section">
      <div className="download-report-card">
        <div className="download-report-icon" aria-hidden="true">
          😊
        </div>
        <h1>Thank you for submitting your details!</h1>
        <p>Click the button below to download the Business Pulse Report.</p>
        <a href="/api/research/download" className="download-report-btn">
          DOWNLOAD REPORT
        </a>
        <br />

        <p className="download-report-brand">CORE MEDIA GROUP</p>
      </div>
    </section>
  );
}
