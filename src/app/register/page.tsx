'use client';

import { useEffect, useState } from 'react';
import { submitAttendeeRegistration } from '@/services/attendees.service';
import { fetchWebsiteEvents, WebsiteEvent } from '@/services/events.service';

type EventItem = WebsiteEvent;

export default function RegisterPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<string | ''>('');
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    selectedEvent?: string;
  }>({});

  useEffect(() => {
    fetchWebsiteEvents()
      .then((data: WebsiteEvent[]) => setEvents(data))
      .catch(() => setEvents([]));
  }, []);

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

    /* NAME VALIDATION */
    if (!name.trim()) {
      nextErrors.name = 'Name is required.';
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      nextErrors.name = 'Only alphabets are allowed.';
    }

    /* EMAIL VALIDATION */
    if (!email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email.';
    }

    /* PHONE VALIDATION */
    if (!phone.trim()) {
      nextErrors.phone = 'Phone number is required.';
    } else if (!/^[0-9]{10}$/.test(phone)) {
      nextErrors.phone = 'Enter a valid 10-digit phone number.';
    }

    /* EVENT VALIDATION */
    if (!selectedEvent) {
      nextErrors.selectedEvent = 'Please select an event.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setPopupMessage('Please fix the errors above.');
      return;
    }

    setLoading(true);
    setPopupMessage(null);

    try {
      await submitAttendeeRegistration({
        eventId: selectedEvent as string,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });

      setPopupMessage('Registration successful — thank you!');

      setName('');
      setEmail('');
      setPhone('');
      setOrganization('');
      setSelectedEvent('');
      setErrors({});
    } catch (err) {
      setPopupMessage(err instanceof Error ? err.message : 'Network error. Please try again.');
    } finally {
      setLoading(false);
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

          <h2 className="registration-title">Event Registration</h2>

          <form onSubmit={handleSubmit} className="registration-form">
            {/* NAME */}
            <label className="registration-label">
              Name*
              <input
                type="text"
                placeholder="Full name"
                value={name}
                pattern="^[A-Za-z\s]+$"
                title="Only alphabets are allowed"
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z\s]/g, '');
                }}
                onChange={(e) => {
                  setName(e.target.value);

                  if (errors.name) {
                    setErrors({
                      ...errors,
                      name: undefined,
                    });
                  }
                }}
              />
              {errors.name && <div className="registration-error">{errors.name}</div>}
            </label>

            {/* EMAIL */}
            <label className="registration-label">
              Email*
              <input
                type="email"
                placeholder="your@company.com"
                value={email}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Enter a valid email address"
                onChange={(e) => {
                  setEmail(e.target.value);

                  if (errors.email) {
                    setErrors({
                      ...errors,
                      email: undefined,
                    });
                  }
                }}
              />
              {errors.email && <div className="registration-error">{errors.email}</div>}
            </label>

            {/* PHONE */}
            <label className="registration-label">
              Phone*
              <input
                type="tel"
                placeholder="9876543210"
                value={phone}
                maxLength={10}
                pattern="[0-9]{10}"
                title="Enter a valid 10-digit phone number"
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                }}
                onChange={(e) => {
                  setPhone(e.target.value);

                  if (errors.phone) {
                    setErrors({
                      ...errors,
                      phone: undefined,
                    });
                  }
                }}
              />
              {errors.phone && <div className="registration-error">{errors.phone}</div>}
            </label>

            {/* ORGANIZATION */}
            <label className="registration-label">
              Organization
              <input
                type="text"
                placeholder="Company name"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              />
            </label>

            {/* EVENT */}
            <label className="registration-label">
              Select Event*
              <select
                value={selectedEvent}
                onChange={(e) => {
                  setSelectedEvent(e.target.value || '');

                  if (errors.selectedEvent) {
                    setErrors({
                      ...errors,
                      selectedEvent: undefined,
                    });
                  }
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
                <div className="registration-error">{errors.selectedEvent}</div>
              )}
            </label>

            {/* BUTTON */}
            <div className="registration-button-wrap">
              <button
                type="submit"
                className="registration-btn"
                disabled={
                  loading ||
                  !!errors.name ||
                  !!errors.email ||
                  !!errors.phone ||
                  !!errors.selectedEvent ||
                  !name ||
                  !email ||
                  !phone ||
                  !selectedEvent
                }
              >
                {loading ? 'Submitting...' : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
