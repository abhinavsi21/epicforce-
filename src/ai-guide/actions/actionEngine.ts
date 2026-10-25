/**
 * Controlled Action Registry & Execution Engine
 * Maps symbolic action types to verified page selectors and allowlisted URLs.
 */

import { ActionDefinition, ApprovedActionType } from '../types';
import {
  INNERVERSE_URL,
  MELUKAT_URL,
  INSTAGRAM_URL,
  CONTACT_EMAIL,
  ANISH_LINKEDIN_URL,
  ABHINAV_INSTAGRAM_URL,
} from '../../config/links';
import { ARTICLE_DOC_LINKS } from '../../config/articles';
import { isAllowlistedUrl, isAllowedSection } from '../security/urlAllowlist';

/**
 * Immutable Registry of Allowed Actions
 */
export const ACTION_REGISTRY: Record<ApprovedActionType, ActionDefinition> = {
  // Page Navigations (Smooth scrolling to approved sections)
  GO_HOME: {
    type: 'GO_HOME',
    label: 'Back to Top',
    category: 'navigation',
    target: 'hero',
  },
  GO_ABOUT: {
    type: 'GO_ABOUT',
    label: 'About EpicForce',
    category: 'navigation',
    target: 'mission',
  },
  GO_MISSION: {
    type: 'GO_MISSION',
    label: 'Our Mission',
    category: 'navigation',
    target: 'mission',
  },
  GO_PILLARS: {
    type: 'GO_PILLARS',
    label: 'Four Key Pillars',
    category: 'navigation',
    target: 'pillars',
  },
  GO_PRODUCTS: {
    type: 'GO_PRODUCTS',
    label: 'Explore Products',
    category: 'navigation',
    target: 'products',
  },
  GO_INNERVERSE: {
    type: 'GO_INNERVERSE',
    label: 'Explore Innerverse',
    category: 'navigation',
    target: 'innerverse',
  },
  GO_AI_AAJI: {
    type: 'GO_AI_AAJI',
    label: 'Explore AI Aaji',
    category: 'navigation',
    target: 'ai-aaji',
  },
  GO_AI_AAJI_DEMO: {
    type: 'GO_AI_AAJI_DEMO',
    label: 'Try AI Aaji Live Demo',
    category: 'navigation',
    target: 'ai-aaji-demo',
  },
  GO_INSIGHTS: {
    type: 'GO_INSIGHTS',
    label: 'Explore Thought Leadership & Insights',
    category: 'navigation',
    target: 'insights',
  },
  GO_ROADMAP: {
    type: 'GO_ROADMAP',
    label: 'View Roadmap',
    category: 'navigation',
    target: 'roadmap',
  },
  GO_TEAM: {
    type: 'GO_TEAM',
    label: 'Meet the Team',
    category: 'navigation',
    target: 'founders',
  },
  GO_INVESTMENT: {
    type: 'GO_INVESTMENT',
    label: 'Why EpicForce?',
    category: 'navigation',
    target: 'why-epicforce',
  },
  GO_CONTACT: {
    type: 'GO_CONTACT',
    label: 'Contact EpicForce',
    category: 'navigation',
    target: 'contact',
  },
  GO_MELUKAT: {
    type: 'GO_MELUKAT',
    label: 'View Partner Section',
    category: 'navigation',
    target: 'partners',
  },
  GO_PARTNERS: {
    type: 'GO_PARTNERS',
    label: 'View Promoting Partners',
    category: 'navigation',
    target: 'partners',
  },

  // Approved External Links
  OPEN_INNERVERSE: {
    type: 'OPEN_INNERVERSE',
    label: 'Launch Live Innerverse ↗',
    category: 'external',
    target: INNERVERSE_URL,
    isExternal: true,
  },
  OPEN_MY_INNERVERSE: {
    type: 'OPEN_MY_INNERVERSE',
    label: 'Open myinnerverse.in ↗',
    category: 'external',
    target: 'https://myinnerverse.in',
    isExternal: true,
  },
  OPEN_AI_AAJI_WEBSITE: {
    type: 'OPEN_AI_AAJI_WEBSITE',
    label: 'Visit AI Aaji Website ↗',
    category: 'external',
    target: 'https://aiaajiassistant.vercel.app/',
    isExternal: true,
  },
  OPEN_MELUKAT: {
    type: 'OPEN_MELUKAT',
    label: 'Explore Melukat ↗',
    category: 'external',
    target: MELUKAT_URL,
    isExternal: true,
  },
  OPEN_INSTAGRAM: {
    type: 'OPEN_INSTAGRAM',
    label: 'Open Instagram ↗',
    category: 'external',
    target: INSTAGRAM_URL,
    isExternal: true,
  },
  OPEN_EMAIL: {
    type: 'OPEN_EMAIL',
    label: 'Email EpicForce.ai',
    category: 'external',
    target: `mailto:${CONTACT_EMAIL}`,
    isExternal: true,
  },
  CONNECT_ANISH: {
    type: 'CONNECT_ANISH',
    label: 'Connect with Anish ↗',
    category: 'external',
    target: ANISH_LINKEDIN_URL,
    isExternal: true,
  },
  CONNECT_ABHINAV: {
    type: 'CONNECT_ABHINAV',
    label: 'Connect with Abhinav ↗',
    category: 'external',
    target: ABHINAV_INSTAGRAM_URL,
    isExternal: true,
  },
  OPEN_ARTICLE_FOUNDATIONS: {
    type: 'OPEN_ARTICLE_FOUNDATIONS',
    label: 'Read: Four Foundations Article ↗',
    category: 'external',
    target: ARTICLE_DOC_LINKS.fourFoundations,
    isExternal: true,
  },
  OPEN_ARTICLE_MANIFESTATION: {
    type: 'OPEN_ARTICLE_MANIFESTATION',
    label: 'Read: Manifestation Article ↗',
    category: 'external',
    target: ARTICLE_DOC_LINKS.manifestationBecoming,
    isExternal: true,
  },
  OPEN_ARTICLE_RESEARCH: {
    type: 'OPEN_ARTICLE_RESEARCH',
    label: 'Read: Seven Scores Research Paper ↗',
    category: 'external',
    target: ARTICLE_DOC_LINKS.sevenScoreResearch,
    isExternal: true,
  },
};

/**
 * Validates and sanitizes actions against the approved action registry
 */
export function validateActions(actions?: (ActionDefinition | ApprovedActionType)[]): ActionDefinition[] {
  if (!actions || !Array.isArray(actions)) return [];

  const verified: ActionDefinition[] = [];

  for (const item of actions) {
    const actionKey = typeof item === 'string' ? item : item.type;
    const registered = ACTION_REGISTRY[actionKey];

    if (!registered) continue;

    // Security check: If external, target must be in URL allowlist
    if (registered.category === 'external' || registered.isExternal) {
      if (!isAllowlistedUrl(registered.target)) {
        console.warn(`[Security] Blocked non-allowlisted URL target: ${registered.target}`);
        continue;
      }
    } else {
      // If navigation, target must be an approved section
      if (!isAllowedSection(registered.target)) {
        console.warn(`[Security] Blocked non-allowlisted section target: ${registered.target}`);
        continue;
      }
    }

    verified.push(registered);
  }

  return verified;
}

/**
 * Client-side Safe Action Execution
 */
export function executeAction(action: ActionDefinition, onScrollCallback?: (target: string) => void): void {
  if (action.category === 'external' || action.isExternal) {
    if (isAllowlistedUrl(action.target)) {
      try {
        const link = document.createElement('a');
        link.href = action.target;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.warn('External navigation error:', err);
      }
    }
    return;
  }

  if (action.category === 'navigation') {
    if (isAllowedSection(action.target)) {
      if (onScrollCallback) {
        onScrollCallback(action.target);
      } else {
        const el = document.getElementById(action.target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }
}
