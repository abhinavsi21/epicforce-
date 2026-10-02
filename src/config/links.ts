/**
 * Central Link & Contact Configuration for EpicForce.ai
 * Single source of truth for external destinations, social channels, and inquiries.
 */

export const INNERVERSE_URL = 'https://myinnerverse.in';
export const INSTAGRAM_URL = 'https://www.instagram.com/epicforce.ai/?hl=en';
export const CONTACT_EMAIL = 'nsh.aimac@gmail.com';
export const TWITTER_URL = 'https://twitter.com/EpicForceAI';
export const LINKEDIN_URL = 'https://www.linkedin.com/company/epicforce-ai';

// Official Founder Connection Links
export const ANISH_LINKEDIN_URL = 'https://www.linkedin.com/in/anish-timble-a9700627/';
export const ABHINAV_INSTAGRAM_URL = 'https://www.instagram.com/abhinavsinghofficial21/?hl=en';

/**
 * Event Tracking Dispatcher (Ready for analytics integration)
 * Event types:
 * - 'innerverse_cta_click'
 * - 'instagram_click'
 * - 'email_click'
 * - 'contact_form_submit'
 */
export const trackEvent = (eventName: string, metadata?: Record<string, unknown>) => {
  // Dispatches a custom DOM event and logs in development
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('epicforce_analytics', {
        detail: { event: eventName, ...metadata, timestamp: Date.now() },
      })
    );
  }
};
