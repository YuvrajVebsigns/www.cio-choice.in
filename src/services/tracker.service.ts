/**
 * CoreMediaTracker - Client-side tracking utility
 */
export interface TrackerConfig {
  backendUrl: string;
  token: string;
}

export interface TrackingEventData {
  eventType?: 'pageview' | 'consent_accepted' | 'consent_declined' | 'interaction';
  pageUrl?: string;
  pageTitle?: string;
  referrer?: string;
  metadata?: Record<string, string>;
}

export class CoreMediaTracker {
  private backendUrl: string;
  private token: string;
  private cookieConsentKey = 'core_media_cookie_consent';
  private visitorIdKey = 'core_media_visitor_id';
  private sessionIdKey = 'core_media_session_id';
  private visitorId = '';
  private sessionId = '';

  constructor(config: TrackerConfig) {
    this.backendUrl = config.backendUrl.replace(/\/$/, '');
    this.token = config.token;
    this.initIds();
  }

  // Initialize unique IDs
  private initIds() {
    if (typeof window === 'undefined') return;

    // Visitor ID (Persistent)
    if (!localStorage.getItem(this.visitorIdKey)) {
      localStorage.setItem(this.visitorIdKey, 'vis_' + this.generateUUID());
    }
    this.visitorId = localStorage.getItem(this.visitorIdKey) || '';

    // Session ID (Temporary)
    if (!sessionStorage.getItem(this.sessionIdKey)) {
      sessionStorage.setItem(this.sessionIdKey, 'sess_' + this.generateUUID());
    }
    this.sessionId = sessionStorage.getItem(this.sessionIdKey) || '';
  }

  private generateUUID(): string {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // Consent Status management
  getConsentStatus(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.cookieConsentKey); // 'accepted', 'declined', or null
  }

  setConsent(status: 'accepted' | 'declined') {
    if (typeof window === 'undefined') return;
    if (status !== 'accepted' && status !== 'declined') return;

    localStorage.setItem(this.cookieConsentKey, status);

    // Log the consent decision to the backend
    this.trackEvent({
      eventType: status === 'accepted' ? 'consent_accepted' : 'consent_declined',
    });
  }

  // Core Track Method
  async trackEvent(eventData: TrackingEventData) {
    if (typeof window === 'undefined') return;

    const consent = this.getConsentStatus();

    // If user explicitly declined cookies, do not track pageviews or interactions
    if (
      consent === 'declined' &&
      eventData.eventType &&
      !eventData.eventType.startsWith('consent_')
    ) {
      return;
    }

    const payload = {
      visitorId: this.visitorId,
      sessionId: this.sessionId,
      eventType: eventData.eventType || 'pageview',
      pageUrl: eventData.pageUrl || window.location.pathname,
      pageTitle: eventData.pageTitle || document.title,
      referrer: eventData.referrer || document.referrer || 'direct',
      userAgent: navigator.userAgent,
      metadata: eventData.metadata || {},
    };

    try {
      await fetch(`${this.backendUrl}/website/analytics/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(payload),
      });
    } catch {
      // Fail silently
    }
  }

  // Shortcut for tracking pageviews
  trackPageview(pageUrl?: string, pageTitle?: string) {
    this.trackEvent({
      eventType: 'pageview',
      pageUrl,
      pageTitle,
    });
  }

  // Shortcut for tracking custom interactions
  trackInteraction(
    elementId: string,
    elementText = '',
    extraMetadata: Record<string, string> = {},
  ) {
    this.trackEvent({
      eventType: 'interaction',
      metadata: {
        elementId,
        elementText,
        ...extraMetadata,
      },
    });
  }
}
