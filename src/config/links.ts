/**
 * Central Link & Contact Configuration for EpicForce.ai
 * Single source of truth for external destinations, social channels, and inquiries.
 */

export const INNERVERSE_URL = 'https://innervers.ai.studio';
export const MY_INNERVERSE_URL = 'https://myinnerverse.in';
export const AI_AAJI_URL = 'https://aiaajiassistant.vercel.app/';
export const INSTAGRAM_URL = 'https://www.instagram.com/epicforce.ai/?hl=en';
export const CONTACT_EMAIL = 'nsh.aimac@gmail.com';
export const TWITTER_URL = 'https://twitter.com/EpicForceAI';
export const LINKEDIN_URL = 'https://www.linkedin.com/company/epicforce-ai';

// Official Founder Connection Links
export const ANISH_LINKEDIN_URL = 'https://www.linkedin.com/in/anish-timble-a9700627/';
export const ABHINAV_INSTAGRAM_URL = 'https://www.instagram.com/abhinavsinghofficial21/?hl=en';

// Official Promoting Partners
export const MELUKAT_URL = 'https://melukat.app';

/**
 * Event Tracking Dispatcher (Ready for analytics integration)
 * Event types:
 * - 'innerverse_cta_click'
 * - 'instagram_click'
 * - 'email_click'
 * - 'contact_form_submit'
 */
export const trackEvent = (eventName: string, metadata?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    try {
      window.dispatchEvent(
        new CustomEvent('epicforce_analytics', {
          bubbles: false,
          cancelable: false,
          detail: { event: eventName, ...metadata, timestamp: Date.now() },
        })
      );
    } catch {
      // Safe no-op in restricted sandbox environments
    }
  }
};
