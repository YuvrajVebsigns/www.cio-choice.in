'use client';

import { useState } from 'react';
import Link from 'next/link';

type CIOEntry = {
  category: string;
  name: string;
  company: string;
  email: string;
  mobile: string;
};

export default function NominatePage() {
  const [nominatorName, setNominatorName] = useState('');
  const [nominatorCompany, setNominatorCompany] = useState('');
  const [nominatorCity, setNominatorCity] = useState('');
  const [nominatorContact, setNominatorContact] = useState('');
  const [nominatorEmail, setNominatorEmail] = useState('');

  const [cios, setCios] = useState<CIOEntry[]>([
    {
      category: '',
      name: '',
      company: '',
      email: '',
      mobile: '',
    },
  ]);

  const [submitted, setSubmitted] = useState(false);

  const maxCios = 10;

  const addCio = () => {
    if (cios.length >= maxCios) return;

    setCios((s) => [
      ...s,
      {
        category: '',
        name: '',
        company: '',
        email: '',
        mobile: '',
      },
    ]);
  };

  const removeCio = (idx: number) => {
    setCios((s) => s.filter((_, i) => i !== idx));
  };

  const updateCio = (idx: number, key: keyof CIOEntry, value: string) => {
    setCios((s) =>
      s.map((c, i) =>
        i === idx
          ? {
              ...c,
              [key]: value,
            }
          : c,
      ),
    );
  };

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const nameRegex = /^[A-Za-z\s]+$/;

    if (
      !nominatorName.trim() ||
      !nameRegex.test(nominatorName) ||
      !nominatorCompany.trim() ||
      !nominatorCity.trim() ||
      !nominatorEmail.trim() ||
      !emailRegex.test(nominatorEmail)
    ) {
      return false;
    }

    if (nominatorContact && !phoneRegex.test(nominatorContact)) {
      return false;
    }

    for (const c of cios) {
      if (
        !c.name.trim() ||
        !nameRegex.test(c.name) ||
        !c.company.trim() ||
        !c.email.trim() ||
        !emailRegex.test(c.email) ||
        !c.category.trim()
      ) {
        return false;
      }

      if (c.mobile && !phoneRegex.test(c.mobile)) {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      alert('Please complete all required fields correctly.');
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="nominate-page-container">
        <section className="nominate-success-section">
          <h1>CIO Power List 2026 — Nomination Received</h1>

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
        <h1>CIO Power List 2026: Nominate the Nation’s Most Influential Technology Leaders</h1>

        <p>
          Your nomination plays a vital role in recognizing CIOs for the exemplary impact they have
          created and in helping them qualify for the CIO Power List 2026, placing their work firmly
          in the spotlight.
        </p>

        <h3>Categories</h3>

        <p>
          CIOs may be nominated under either of the following categories:{' '}
          <strong>Business Icon</strong> or <strong>Technology Icon</strong>.
        </p>

        <h3>Nomination Process &amp; Confirmation</h3>

        <p>
          Once you submit your nomination, an automated process will trigger three confirmation
          emails:
        </p>

        <ol>
          <li>To the CIO Power List (CORE Media) team, sharing the nomination details.</li>

          <li>To you, acknowledging and summarizing all your nominations.</li>

          <li>
            To each nominated CIO, informing them that they have been nominated by you for CIO Power
            List 2026.
          </li>
        </ol>

        <h3>Note</h3>

        <ol>
          <li>
            All nominations are treated with strict confidentiality and will not be shared or
            displayed on any private or public forums.
          </li>

          <li>CIOs are welcome to nominate themselves.</li>

          <li>
            For ICT vendors, there is no commercial or sponsorship obligation associated with
            nominating CIOs for the CIO Power List 2026.
          </li>
        </ol>

        <div className="nominate-wrapper">
          <div className="nominate-card">
            <div className="nominate-card-header">NOMINATION FORM</div>

            <div className="nominate-card-body">
              <p className="nominate-sub">
                You can nominate up to 10 Influential CIOs by clicking on the &quot;Add CIO&quot;
                button.
              </p>

              <form id="nominate-form" onSubmit={handleSubmit} className="nominate-form">
                <fieldset className="nominate-fieldset">
                  <legend className="nominate-legend">Nominator details</legend>

                  {/* NOMINATOR NAME */}
                  <label className="nominate-label">
                    Name of the Nominator *
                    <input
                      value={nominatorName}
                      onChange={(e) => setNominatorName(e.target.value.replace(/[^A-Za-z\s]/g, ''))}
                      pattern="^[A-Za-z\s]+$"
                      title="Only alphabets are allowed"
                      required
                      className="nominate-input-field"
                    />
                  </label>

                  {/* COMPANY */}
                  <label className="nominate-label">
                    Name of the Nominator&apos;s Company *
                    <input
                      value={nominatorCompany}
                      onChange={(e) => setNominatorCompany(e.target.value)}
                      required
                      className="nominate-input-field"
                    />
                  </label>

                  {/* CITY */}
                  <label className="nominate-label">
                    Nominator City *
                    <input
                      value={nominatorCity}
                      onChange={(e) => setNominatorCity(e.target.value)}
                      placeholder="eg. Mumbai"
                      required
                      className="nominate-input-field"
                    />
                  </label>

                  {/* CONTACT */}
                  <label className="nominate-label">
                    Nominator Contact No
                    <input
                      type="tel"
                      value={nominatorContact}
                      onChange={(e) => setNominatorContact(e.target.value.replace(/[^0-9]/g, ''))}
                      maxLength={10}
                      pattern="[0-9]{10}"
                      title="Enter a valid 10-digit phone number"
                      placeholder="9876543210"
                      className="nominate-input-field"
                    />
                  </label>

                  {/* EMAIL */}
                  <label className="nominate-label">
                    Nominator Email ID *
                    <input
                      type="email"
                      value={nominatorEmail}
                      onChange={(e) => setNominatorEmail(e.target.value)}
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      title="Enter a valid email address"
                      placeholder="abc@abc.com"
                      required
                      className="nominate-input-field"
                    />
                  </label>
                </fieldset>

                <fieldset className="nominate-fieldset">
                  <legend className="nominate-legend">CIO nominations (up to {maxCios})</legend>

                  {cios.map((c, idx) => (
                    <div key={idx} className="nominate-cio-block">
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

                      {/* CATEGORY */}
                      <label className="nominate-label">
                        Nominated CIO by Category *
                        <select
                          value={c.category}
                          onChange={(e) => updateCio(idx, 'category', e.target.value)}
                          required
                          className="nominate-input-field"
                        >
                          <option value="">- Select Category -</option>

                          <option value="Business Icon">Business Icon</option>

                          <option value="Technology Icon">Technology Icon</option>
                        </select>
                      </label>

                      {/* CIO NAME */}
                      <label className="nominate-label">
                        CIO Contact Name *
                        <input
                          value={c.name}
                          onChange={(e) =>
                            updateCio(idx, 'name', e.target.value.replace(/[^A-Za-z\s]/g, ''))
                          }
                          pattern="^[A-Za-z\s]+$"
                          title="Only alphabets are allowed"
                          required
                          className="nominate-input-field"
                        />
                      </label>

                      {/* COMPANY */}
                      <label className="nominate-label">
                        CIO Company Name *
                        <input
                          value={c.company}
                          onChange={(e) => updateCio(idx, 'company', e.target.value)}
                          required
                          className="nominate-input-field"
                        />
                      </label>

                      {/* EMAIL */}
                      <label className="nominate-label">
                        Contact Email *
                        <input
                          type="email"
                          value={c.email}
                          onChange={(e) => updateCio(idx, 'email', e.target.value)}
                          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                          title="Enter a valid email address"
                          required
                          className="nominate-input-field"
                        />
                      </label>

                      {/* MOBILE */}
                      <label className="nominate-label">
                        Mobile No.
                        <input
                          type="tel"
                          value={c.mobile}
                          onChange={(e) =>
                            updateCio(idx, 'mobile', e.target.value.replace(/[^0-9]/g, ''))
                          }
                          maxLength={10}
                          pattern="[0-9]{10}"
                          title="Enter a valid 10-digit phone number"
                          placeholder="9876543210"
                          className="nominate-input-field"
                        />
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
          <button
            type="submit"
            form="nominate-form"
            className="nominate-btn nominate-btn-primary nominate-submit"
            disabled={!validate()}
            aria-disabled={!validate()}
            aria-label="Submit nomination"
          >
            Submit
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
