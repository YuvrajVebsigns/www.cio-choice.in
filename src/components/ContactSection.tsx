// 'use client';

// import Image from 'next/image';
// import { AlertCircle, ArrowUpRight, CheckCircle2, LoaderCircle, X } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { submitWebsiteContact } from '@/services/contacts.service';

// const SERVICE_OPTIONS = [
//   'Business Strategy',
//   'Customer Experience',
//   'CIO Events & Conferences',
//   'Brand Recognition',
//   'Video Content',
// ];

// type ToastState = {
//   type: 'success' | 'error';
//   title: string;
//   message: string;
// } | null;

// export default function ContactSection() {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [service, setService] = useState('');
//   const [message, setMessage] = useState('');

//   const [toast, setToast] = useState<ToastState>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     if (!toast) {
//       return;
//     }

//     const timer = window.setTimeout(() => {
//       setToast(null);
//     }, 4000);

//     return () => {
//       window.clearTimeout(timer);
//     };
//   }, [toast]);

//   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     const trimmedName = fullName.trim();
//     const trimmedEmail = email.trim();
//     const trimmedPhone = phone.trim();
//     const trimmedService = service.trim();
//     const trimmedMessage = message.trim();

//     if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedService || !trimmedMessage) {
//       setToast({
//         type: 'error',
//         title: 'Incomplete Form',
//         message: 'Please fill in all the required fields.',
//       });

//       return;
//     }

//     if (!/^[A-Za-z\s]+$/.test(trimmedName)) {
//       setToast({
//         type: 'error',
//         title: 'Invalid Name',
//         message: 'Please enter only alphabetic characters in your name.',
//       });

//       return;
//     }

//     if (!/^[0-9]{10}$/.test(trimmedPhone)) {
//       setToast({
//         type: 'error',
//         title: 'Invalid Phone Number',
//         message: 'Please enter a valid 10-digit phone number.',
//       });

//       return;
//     }

//     setIsSubmitting(true);
//     setToast(null);

//     try {
//       await submitWebsiteContact({
//         fullName: trimmedName,
//         email: trimmedEmail,
//         phone: trimmedPhone,
//         service: trimmedService,
//         message: trimmedMessage,
//       });

//       setToast({
//         type: 'success',
//         title: 'Message Sent Successfully!',
//         message: 'Thank you for contacting us. We will get back to you soon.',
//       });

//       setFullName('');
//       setEmail('');
//       setPhone('');
//       setService('');
//       setMessage('');
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error && error.message
//           ? error.message
//           : 'Something went wrong. Please try again.';

//       setToast({
//         type: 'error',
//         title: 'Message Not Sent',
//         message: errorMessage,
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <section className="contact-section" id="contact-section">
//       {/* SUCCESS / ERROR TOAST */}
//       {toast && (
//         <div
//           className={`contact-toast contact-toast--${toast.type}`}
//           role={toast.type === 'error' ? 'alert' : 'status'}
//           aria-live={toast.type === 'error' ? 'assertive' : 'polite'}
//         >
//           <div className="contact-toast-icon">
//             {toast.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
//           </div>

//           <div className="contact-toast-content">
//             <strong>{toast.title}</strong>
//             <p>{toast.message}</p>
//           </div>

//           <button
//             type="button"
//             className="contact-toast-close"
//             onClick={() => setToast(null)}
//             aria-label="Close notification"
//           >
//             <X size={18} />
//           </button>

//           <span className="contact-toast-progress" aria-hidden="true" />
//         </div>
//       )}

//       <div className="contact-container">
//         {/* LEFT SIDE */}
//         <div className="contact-map-area">
//           <div className="contact-map">
//             <Image
//               src="/assets/map3.png"
//               alt="Global map showing our locations"
//               width={700}
//               height={500}
//               className="contact-map-img"
//               priority
//             />

//             <span className="map-dot dot-1" />
//             <span className="map-dot dot-2" />
//             <span className="map-dot dot-3" />
//           </div>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="contact-form-area">
//           <div className="contact-badge">
//             <Image
//               src="/assets/icon.png"
//               alt=""
//               width={20}
//               height={20}
//               className="contact-badge-icon"
//             />

//             <span>GET IN TOUCH</span>
//           </div>

//           <h2 className="contact-title">Let’s Start a Conversation</h2>

//           <form className="contact-form" onSubmit={handleSubmit}>
//             <div className="contact-grid">
//               <input
//                 type="text"
//                 name="fullName"
//                 placeholder="Full Name *"
//                 value={fullName}
//                 required
//                 autoComplete="name"
//                 pattern="^[A-Za-z\s]+$"
//                 title="Only alphabets are allowed"
//                 onChange={(event) => {
//                   const value = event.target.value.replace(/[^A-Za-z\s]/g, '');

//                   setFullName(value);
//                 }}
//               />

//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email Address *"
//                 value={email}
//                 required
//                 autoComplete="email"
//                 title="Enter a valid email address"
//                 onChange={(event) => setEmail(event.target.value)}
//               />

//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="Phone Number *"
//                 value={phone}
//                 required
//                 autoComplete="tel"
//                 inputMode="numeric"
//                 maxLength={10}
//                 pattern="[0-9]{10}"
//                 title="Enter a valid 10-digit phone number"
//                 onChange={(event) => {
//                   const value = event.target.value.replace(/[^0-9]/g, '');

//                   setPhone(value);
//                 }}
//               />

//               <select
//                 name="service"
//                 required
//                 value={service}
//                 onChange={(event) => setService(event.target.value)}
//               >
//                 <option value="" disabled>
//                   Select a Service *
//                 </option>

//                 {SERVICE_OPTIONS.map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <textarea
//               name="message"
//               rows={6}
//               placeholder="Your Message *"
//               required
//               value={message}
//               onChange={(event) => setMessage(event.target.value)}
//             />

//             <button
//               type="submit"
//               className={`contact-btn ${isSubmitting ? 'contact-btn--loading' : ''}`}
//               disabled={isSubmitting}
//               aria-busy={isSubmitting}
//             >
//               <span>{isSubmitting ? 'Sending Message...' : 'Submit Message'}</span>

//               <span className="contact-btn-icon" aria-hidden="true">
//                 {isSubmitting ? (
//                   <LoaderCircle size={20} className="contact-btn-loader" />
//                 ) : (
//                   <ArrowUpRight size={20} />
//                 )}
//               </span>
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { submitWebsiteContact } from '@/services/contacts.service';

const SERVICE_OPTIONS = [
  'Business Strategy',
  'Customer Experience',
  'CIO Events & Conferences',
  'Brand Recognition',
  'Video Content',
];

export default function ContactSection() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!popupMessage) return;

    const timer = window.setTimeout(() => {
      setPopupMessage(null);
    }, 3200);

    return () => window.clearTimeout(timer);
  }, [popupMessage]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedService = service.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedService || !trimmedMessage) {
      setPopupMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setPopupMessage(null);

    try {
      await submitWebsiteContact({
        fullName: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        service: trimmedService,
        message: trimmedMessage,
      });

      setPopupMessage('Thank you! Your message has been received.');
      setFullName('');
      setEmail('');
      setPhone('');
      setService('');
      setMessage('');
    } catch (error) {
      setPopupMessage(error instanceof Error ? error.message : 'Failed to send your message.');
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <section className="contact-section" id="contact-section">
      <div className="contact-container">
        {/* LEFT SIDE */}
        <div className="contact-map-area">
          <div className="contact-map">
            <Image
              src="/assets/map3.png"
              alt="Global Map"
              width={700}
              height={500}
              className="contact-map-img"
              priority
            />

            {/* Dots */}
            <span className="map-dot dot-1"></span>
            <span className="map-label label-1">India</span>

            <span className="map-dot dot-2"></span>
            <span className="map-label label-2">Dubai</span>

            <span className="map-dot dot-3"></span>
            <span className="map-label label-3">Australia</span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="contact-form-area">
          {popupMessage ? (
            <div className="contact-popup" role="status" aria-live="polite">
              <span className="contact-popup-dot" aria-hidden="true" />
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

          {/* Badge */}
          <div className="contact-badge">⬢ GET IN TOUCH</div>

          {/* Title */}
          {/* <h2 className="contact-title">Let’s Start a Conversation</h2> */}

          {/* Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-grid">
              {/* FULL NAME */}
              <input
                type="text"
                name="fullName"
                placeholder="Full Name *"
                value={fullName}
                required
                pattern="^[A-Za-z\s]+$"
                title="Only alphabets are allowed"
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z\s]/g, '');
                }}
                onChange={(e) => setFullName(e.target.value)}
              />

              {/* EMAIL */}
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={email}
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Enter a valid email address"
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* PHONE NUMBER */}
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                value={phone}
                required
                maxLength={10}
                pattern="[0-9]{10}"
                title="Enter a valid 10-digit phone number"
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                }}
                onChange={(e) => setPhone(e.target.value)}
              />

              {/* SELECT */}
              <select required value={service} onChange={(e) => setService(e.target.value)}>
                <option value="" disabled>
                  Select a Service *
                </option>

                {SERVICE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* MESSAGE */}
            <textarea
              rows={6}
              placeholder="Your Message *"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {/* BUTTON */}
            <button type="submit" className="contact-btn" disabled={isSubmitting}>
              <span>{isSubmitting ? 'Sending...' : 'Submit '}</span>

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
