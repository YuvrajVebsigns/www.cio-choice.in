'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="contact-section">
      <div className="contact-container">
        {/* LEFT SIDE */}
        <div className="contact-map-area">
          <div className="contact-map">
            <Image
              src="/assets/map.svg"
              alt="Global Map"
              width={700}
              height={500}
              className="contact-map-img"
              priority
            />

            {/* Dots */}
            <span className="map-dot dot-1"></span>
            <span className="map-dot dot-2"></span>
            <span className="map-dot dot-3"></span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="contact-form-area">
          {/* Badge */}
          <div className="contact-badge">⬢ GET IN TOUCH</div>

          {/* Title */}
          <h2 className="contact-title">Let’s Start a Conversation</h2>

          {/* Form */}
          <form className="contact-form">
            <div className="contact-grid">
              <input type="text" placeholder="Full Name *" />

              <input type="email" placeholder="Email Address *" />

              <input type="tel" placeholder="Phone Number *" />

              <select>
                <option>Select a Service *</option>
                <option>Business Strategy</option>
                <option>Customer Experience</option>
                <option>IT Support</option>
              </select>
            </div>

            <textarea rows={6} placeholder="Your Message *" />

            {/* Button */}
            <button type="submit" className="contact-btn">
              <span>Send Message</span>

              <span className="contact-btn-icon">
                <ArrowUpRight size={18} />
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
