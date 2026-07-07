// 'use client';

// import { useEffect, useState } from 'react';
// import { X, Settings } from 'lucide-react';

// interface CookieConsentBannerProps {
//   onAccept: () => void;
//   onDecline: () => void;
// }

// export default function CookieConsentBanner({ onAccept, onDecline }: CookieConsentBannerProps) {
//   const [isVisible, setIsVisible] = useState(false);
//   const [showPreferences, setShowPreferences] = useState(false);
//   const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsVisible(true);
//     }, 600);

//     return () => clearTimeout(timer);
//   }, []);

//   const handleSavePreferences = () => {
//     if (analyticsEnabled) {
//       onAccept();
//     } else {
//       onDecline();
//     }
//   };

//   return (
//     <div
//       role="dialog"
//       aria-labelledby="cookie-title"
//       aria-describedby="cookie-desc"
//       className={`fixed bottom-6 left-6 z-[9999] max-w-3xl w-[calc(100%-3rem)] bg-white border border-slate-100 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-8 md:p-10 transition-all duration-500 ease-out transform ${
//         isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
//       }`}
//     >
//       {/* Header section with Close X button */}
//       <div className="flex items-center justify-between mb-4">
//         <h3
//           id="cookie-title"
//           className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2"
//         >
//           Let&apos;s Talk Cookies 🍪
//         </h3>
//         <button
//           onClick={onDecline}
//           aria-label="Close cookie consent banner"
//           className="text-slate-400 hover:text-slate-600 transition-colors duration-200 p-1 hover:bg-slate-50 rounded-full"
//         >
//           <X className="h-5 w-5" />
//         </button>
//       </div>

//       {/* Description section */}
//       <div id="cookie-desc" className="text-[14px] leading-relaxed text-slate-600 space-y-4 mb-6">
//         <p>
//           We use cookies to enhance your browsing experience, personalize your content, and
//           understand site performance. By clicking &ldquo;Accept all&rdquo;, you consent to the use
//           of cookies that help us deliver tailored content and improve how our site works.
//         </p>
//         <p>
//           You can view our full{' '}
//           <a
//             href="/privacy-policy"
//             className="font-semibold underline cursor-pointer text-slate-900 hover:text-slate-700"
//           >
//             Cookie Policy
//           </a>{' '}
//           for more details and update or disable your preferences anytime.
//         </p>
//       </div>

//       {/* Preferences Section (Expandable via Customize) */}
//       {showPreferences && (
//         <div className="mt-4 mb-6 pt-4 border-t border-slate-100 flex flex-col gap-3">
//           <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
//             Cookie Preferences
//           </p>
//           <div className="flex flex-col gap-2">
//             <div className="flex items-start justify-between p-4 bg-slate-50 rounded-2xl">
//               <div>
//                 <p className="text-sm font-semibold text-slate-800">Essential Cookies</p>
//                 <p className="text-xs text-slate-500">
//                   Required for the website to function properly.
//                 </p>
//               </div>
//               <span className="text-xs font-semibold text-slate-400 bg-slate-200 px-3 py-1 rounded-lg">
//                 Always Active
//               </span>
//             </div>
//             <div className="flex items-start justify-between p-4 bg-slate-50 rounded-2xl">
//               <div>
//                 <p className="text-sm font-semibold text-slate-800">
//                   Analytics &amp; Performance Cookies
//                 </p>
//                 <p className="text-xs text-slate-500">
//                   Help us understand visitor usage and optimize site performance.
//                 </p>
//               </div>
//               <input
//                 type="checkbox"
//                 checked={analyticsEnabled}
//                 onChange={(e) => setAnalyticsEnabled(e.target.checked)}
//                 className="w-4 h-4 mt-1 text-[#8e0101] border-slate-300 rounded focus:ring-[#8e0101] accent-[#8e0101]"
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Button Actions */}
//       <div className="flex flex-wrap items-center justify-end gap-3">
//         {showPreferences ? (
//           <>
//             <button
//               onClick={() => setShowPreferences(false)}
//               className="text-sm font-semibold text-slate-600 hover:text-slate-800 px-6 py-3 rounded-full hover:bg-slate-50 transition duration-200"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSavePreferences}
//               className="text-sm font-semibold text-white bg-slate-800 hover:bg-slate-900 px-8 py-3 rounded-full transition duration-200"
//             >
//               Save Preferences
//             </button>
//           </>
//         ) : (
//           <>
//             <button
//               onClick={onAccept}
//               id="btn-accept-all-cookies"
//               className="text-sm font-semibold text-white bg-[#8e0101] hover:bg-[#720000] px-8 py-3 rounded-full transition duration-200 shadow-md shadow-red-900/10 active:scale-95 cursor-pointer"
//             >
//               Accept all
//             </button>
//             <button
//               onClick={onDecline}
//               id="btn-essential-only-cookies"
//               className="text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 px-8 py-3 rounded-full border border-slate-200 transition duration-200 active:scale-95 cursor-pointer"
//             >
//               Essential only
//             </button>
//             <button
//               onClick={() => setShowPreferences(true)}
//               id="btn-customize-cookies"
//               className="text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 px-8 py-3 rounded-full border border-slate-200 flex items-center gap-2 transition duration-200 active:scale-95 cursor-pointer"
//             >
//               <Settings className="h-4 w-4 text-slate-500" />
//               Customize
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { Settings, X } from 'lucide-react';

interface CookieConsentBannerProps {
  onAccept: () => void;
  onDecline: () => void;
}

export default function CookieConsentBanner({ onAccept, onDecline }: CookieConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleSavePreferences = () => {
    if (analyticsEnabled) {
      onAccept();
    } else {
      onDecline();
    }
  };

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      className={`cookie-consent-banner ${isVisible ? 'cookie-consent-banner--visible' : ''}`}
    >
      <div className="cookie-consent-card">
        <div className="cookie-consent-header">
          <div className="cookie-consent-title-group">
            <span className="cookie-consent-label">Cookie Consent</span>

            <h3 id="cookie-title" className="cookie-consent-title">
              Let&apos;s Talk Cookies 🍪
            </h3>
          </div>

          <button
            type="button"
            onClick={onDecline}
            aria-label="Close cookie consent banner"
            className="cookie-consent-close"
          >
            <X className="cookie-consent-close-icon" />
          </button>
        </div>

        <div id="cookie-desc" className="cookie-consent-body">
          <p>
            We use cookies to enhance your browsing experience, personalize your content, and
            understand site performance.
          </p>

          <p>
            Click <strong>Accept all</strong> to agree to cookies that help us deliver better
            content and a smoother browsing experience.
          </p>

          <p>
            View our{' '}
            <a href="/privacy-policy" className="cookie-consent-link">
              Cookie Policy
            </a>{' '}
            to update or disable preferences anytime.
          </p>
        </div>

        {showPreferences && (
          <div className="cookie-consent-preferences">
            <p className="cookie-consent-preferences-label">Cookie Preferences</p>

            <div className="cookie-consent-preference-list">
              <div className="cookie-consent-preference-item">
                <div>
                  <p className="cookie-consent-preference-title">Essential Cookies</p>
                  <p className="cookie-consent-preference-text">
                    Required for the website to function properly.
                  </p>
                </div>

                <span className="cookie-consent-badge">Always Active</span>
              </div>

              <div className="cookie-consent-preference-item">
                <div>
                  <p className="cookie-consent-preference-title">
                    Analytics &amp; Performance Cookies
                  </p>
                  <p className="cookie-consent-preference-text">
                    Help us understand visitor usage and optimize site performance.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="cookie-consent-checkbox"
                />
              </div>
            </div>
          </div>
        )}

        <div className="cookie-consent-actions">
          {showPreferences ? (
            <>
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="cookie-consent-button cookie-consent-button--ghost"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSavePreferences}
                className="cookie-consent-button cookie-consent-button--dark"
              >
                Save Preferences
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onAccept}
                id="btn-accept-all-cookies"
                className="cookie-consent-button cookie-consent-button--primary"
              >
                Accept all
              </button>

              <button
                type="button"
                onClick={onDecline}
                id="btn-essential-only-cookies"
                className="cookie-consent-button cookie-consent-button--secondary"
              >
                Essential only
              </button>

              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                id="btn-customize-cookies"
                className="cookie-consent-button cookie-consent-button--secondary"
              >
                <Settings className="cookie-consent-settings-icon" />
                Customize
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
