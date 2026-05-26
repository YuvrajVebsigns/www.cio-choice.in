'use client';

import { useEffect, useState } from 'react';

type EventItem = {
  id: number;
  title: string;
};

type EventApiItem = {
  id: number;
  title: string;
};

export default function RegisterPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<number | ''>('');
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; selectedEvent?: string }>(
    {},
  );

  useEffect(() => {
    fetch('/api/events')
      .then((r) => r.json())
      .then((data: EventApiItem[]) =>
        setEvents(data.map((event) => ({ id: event.id, title: event.title }))),
      )
      .catch(() => setEvents([]));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nextErrors: typeof errors = {};
    if (!name.trim()) nextErrors.name = 'Name is required.';
    if (!email.trim()) nextErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Enter a valid email.';
    if (!selectedEvent) nextErrors.selectedEvent = 'Please select an event.';

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setStatus('Please fix the errors above.');
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, organization, eventId: selectedEvent }),
      });

      const json = await res.json();

      if (res.ok) {
        setStatus('Registration successful — thank you!');
        setName('');
        setEmail('');
        setPhone('');
        setOrganization('');
        setSelectedEvent('');
        setErrors({});
      } else {
        setStatus(json?.message || 'Registration failed.');
      }
    } catch (err) {
      setStatus('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="project-section">
      <div className="project-container">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <br />
          <br />
          <h2 className="project-title">Event Registration</h2>

          <form onSubmit={handleSubmit} className="register-form">
            <label>
              Name*
              <br />
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                type="text"
                placeholder="Full name"
              />
              {errors.name && <div style={{ color: '#a40000', marginTop: 6 }}>{errors.name}</div>}
            </label>

            <label>
              Email*
              <br />
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                type="email"
                placeholder="your@company.com"
              />
              {errors.email && <div style={{ color: '#a40000', marginTop: 6 }}>{errors.email}</div>}
            </label>

            <label>
              Phone
              <br />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                placeholder="+1 555 555 5555"
              />
            </label>

            <label>
              Organization
              <br />
              <input
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                type="text"
                placeholder="Company name"
              />
            </label>

            <label>
              Select Event*
              <br />
              <select
                value={selectedEvent}
                onChange={(e) => {
                  setSelectedEvent(e.target.value ? Number(e.target.value) : '');
                  if (errors.selectedEvent) setErrors({ ...errors, selectedEvent: undefined });
                }}
              >
                <option value="">-- Select an event --</option>
                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.title}
                  </option>
                ))}
              </select>
              {errors.selectedEvent && (
                <div style={{ color: '#a40000', marginTop: 6 }}>{errors.selectedEvent}</div>
              )}
            </label>

            <div style={{ marginTop: 18 }}>
              <button
                type="submit"
                className="projects-btn"
                disabled={
                  loading ||
                  !!errors.name ||
                  !!errors.email ||
                  !!errors.selectedEvent ||
                  !name ||
                  !email ||
                  !selectedEvent
                }
              >
                {loading ? 'Submitting...' : 'Register'}
              </button>
            </div>

            {status && <p style={{ marginTop: 12 }}>{status}</p>}
          </form>
        </div>
      </div>

      <style jsx>{`
        .register-form label {
          display: block;
          margin-bottom: 12px;
        }

        .register-form input,
        .register-form select {
          width: 100%;
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid #ddd;
          margin-top: 6px;
        }

        .projects-btn {
          background: #a40000;
          color: white;
          padding: 10px 18px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
        }

        .projects-btn[disabled] {
          opacity: 0.6;
          cursor: default;
        }
      `}</style>
    </section>
  );
}
