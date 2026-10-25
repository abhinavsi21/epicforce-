/**
 * External URL Security & Validation Allowlist
 * Strict security invariant: AI can NEVER generate or route to unapproved external URLs.
 */

import {
  INNERVERSE_URL,
  MY_INNERVERSE_URL,
  AI_AAJI_URL,
  MELUKAT_URL,
  INSTAGRAM_URL,
  CONTACT_EMAIL,
  ANISH_LINKEDIN_URL,
  ABHINAV_INSTAGRAM_URL,
} from '../../config/links';

export const APPROVED_EXTERNAL_URLS: ReadonlySet<string> = new Set([
  INNERVERSE_URL,
  MY_INNERVERSE_URL,
  AI_AAJI_URL,
  MELUKAT_URL,
  INSTAGRAM_URL,
  `mailto:${CONTACT_EMAIL}`,
  ANISH_LINKEDIN_URL,
  ABHINAV_INSTAGRAM_URL,
]);

/**
 * Validates whether an external URL is explicitly on the allowlist
 */
export function isAllowlistedUrl(url: string): boolean {
  if (!url) return false;
  const cleanUrl = url.trim();
  return (
    APPROVED_EXTERNAL_URLS.has(cleanUrl) ||
    cleanUrl.startsWith('https://innervers.ai.studio') ||
    cleanUrl.startsWith('https://myinnerverse.in') ||
    cleanUrl.startsWith('https://aiaajiassistant.vercel.app') ||
    cleanUrl.startsWith('https://melukat.app') ||
    cleanUrl.startsWith('https://www.instagram.com/epicforce.ai') ||
    cleanUrl.startsWith('https://docs.google.com') ||
    cleanUrl.startsWith(`mailto:${CONTACT_EMAIL}`)
  );
}

/**
 * Validates that an internal target section ID exists in the approved page layout
 */
export const APPROVED_SECTION_IDS: ReadonlySet<string> = new Set([
  'hero',
  'mission',
  'pillars',
  'founders',
  'products',
  'ai-aaji-demo',
  'innerverse',
  'ai-aaji',
  'insights',
  'why-epicforce',
  'roadmap',
  'partners',
  'contact',
]);

export function isAllowedSection(sectionId: string): boolean {
  return APPROVED_SECTION_IDS.has(sectionId.replace('#', '').trim());
}
