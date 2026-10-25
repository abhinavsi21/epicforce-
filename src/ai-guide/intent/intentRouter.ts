/**
 * Intent Router & Entity Extractor
 * Classifies visitor queries into strict system intents and extracts domain entities.
 */

import { NamedEntity, UserIntent } from '../types';

export interface ClassificationResult {
  intent: UserIntent;
  entities: NamedEntity[];
  confidence: number;
  isNavigationRequest: boolean;
  isExternalLinkRequest: boolean;
}

export function classifyIntentAndEntities(
  query: string,
  resolvedContext?: { lastEntity?: NamedEntity; lastIntent?: UserIntent }
): ClassificationResult {
  const q = query.toLowerCase().trim();
  const entities: NamedEntity[] = [];

  // Entity Extraction with synonym resolution
  if (
    q.includes('epicforce') ||
    q.includes('company') ||
    q.includes('startup') ||
    q.includes('studio') ||
    q.includes('movement')
  ) {
    entities.push('EPICFORCE');
  }

  if (
    q.includes('innerverse') ||
    q.includes('inner verse') ||
    q.includes('life navigation') ||
    q.includes('diagnostic') ||
    q.includes('first product') ||
    q.includes('pathway')
  ) {
    entities.push('INNERVERSE');
  }

  if (
    q.includes('aaji') ||
    q.includes('ai aaji') ||
    q.includes('assistant') ||
    q.includes('companion') ||
    q.includes('second product') ||
    q.includes('voice demo') ||
    q.includes('talk to ai aaji') ||
    q.includes('talk to aaji') ||
    q.includes('aoede') ||
    q.includes('live voice')
  ) {
    entities.push('AI_AAJI');
  }

  if (q.includes('anish') || q.includes('timble') || q.includes('vision architect')) {
    entities.push('ANISH_TIMBLE');
  }

  if (
    q.includes('abhinav') ||
    q.includes('singh') ||
    q.includes('growth architect') ||
    q.includes('growth')
  ) {
    entities.push('ABHINAV_SINGH');
  }

  if (
    q.includes('melukat') ||
    q.includes('meditation center') ||
    q.includes('partner') ||
    q.includes('promoting partner')
  ) {
    entities.push('MELUKAT');
  }

  if (
    q.includes('roadmap') ||
    q.includes('timeline') ||
    q.includes('milestones') ||
    q.includes('phase 1') ||
    q.includes('phase 2') ||
    q.includes('phase 3') ||
    q.includes('phase 4') ||
    q.includes('2026') ||
    q.includes('2027') ||
    q.includes('2028')
  ) {
    entities.push('ROADMAP');
  }

  if (q.includes('pillar') || q.includes('clarity') || q.includes('creativity') || q.includes('impact') || q.includes('community')) {
    entities.push('PILLARS');
  }

  if (q.includes('invest') || q.includes('capital') || q.includes('funding') || q.includes('investor')) {
    entities.push('INVESTMENT');
  }

  if (
    q.includes('insight') ||
    q.includes('article') ||
    q.includes('thought leadership') ||
    q.includes('research paper') ||
    q.includes('four foundations') ||
    q.includes('seven score') ||
    q.includes('manifestation') ||
    q.includes('paper')
  ) {
    entities.push('INSIGHTS');
  }

  if (q.includes('contact') || q.includes('email') || q.includes('instagram') || q.includes('message') || q.includes('reach out')) {
    entities.push('CONTACT');
  }

  // Fallback to conversational memory context if no entity found directly
  if (entities.length === 0 && resolvedContext?.lastEntity) {
    entities.push(resolvedContext.lastEntity);
  }

  // Detect Action Modifiers
  const isNavigation =
    q.startsWith('take me to') ||
    q.startsWith('scroll to') ||
    q.startsWith('go to') ||
    q.startsWith('show me') ||
    q.startsWith('where is') ||
    q.includes('take me there') ||
    q.includes('jump to');

  const isExternal =
    q.startsWith('open ') ||
    q.startsWith('launch ') ||
    q.startsWith('visit ') ||
    q.includes('live website') ||
    q.includes('external link') ||
    q.includes('open app');

  if (isExternal) {
    return {
      intent: 'EXTERNAL_LINK',
      entities,
      confidence: 0.95,
      isNavigationRequest: false,
      isExternalLinkRequest: true,
    };
  }

  if (isNavigation) {
    return {
      intent: 'NAVIGATION',
      entities,
      confidence: 0.92,
      isNavigationRequest: true,
      isExternalLinkRequest: false,
    };
  }

  // Intent Mapping
  if (
    entities.includes('INSIGHTS') ||
    q.includes('insight') ||
    q.includes('article') ||
    q.includes('research paper') ||
    q.includes('four foundations') ||
    q.includes('seven score')
  ) {
    return { intent: 'INSIGHTS_INFO', entities, confidence: 0.92, isNavigationRequest: false, isExternalLinkRequest: false };
  }

  if (entities.includes('INNERVERSE') || q.includes('innerverse')) {
    return { intent: 'INNERVERSE_INFO', entities, confidence: 0.9, isNavigationRequest: false, isExternalLinkRequest: false };
  }

  if (entities.includes('AI_AAJI') || q.includes('aaji')) {
    return { intent: 'AI_AAJI_INFO', entities, confidence: 0.9, isNavigationRequest: false, isExternalLinkRequest: false };
  }

  if (entities.includes('MELUKAT') || q.includes('melukat')) {
    return { intent: 'PARTNER_INFO', entities, confidence: 0.95, isNavigationRequest: false, isExternalLinkRequest: false };
  }

  if (entities.includes('ANISH_TIMBLE') || entities.includes('ABHINAV_SINGH') || q.includes('founder') || q.includes('team') || q.includes('leadership')) {
    return { intent: 'TEAM_INFO', entities, confidence: 0.9, isNavigationRequest: false, isExternalLinkRequest: false };
  }

  if (entities.includes('ROADMAP') || q.includes('roadmap')) {
    return { intent: 'ROADMAP_INFO', entities, confidence: 0.9, isNavigationRequest: false, isExternalLinkRequest: false };
  }

  if (entities.includes('PILLARS') || q.includes('pillar')) {
    return { intent: 'PILLARS_INFO', entities, confidence: 0.88, isNavigationRequest: false, isExternalLinkRequest: false };
  }

  if (entities.includes('INVESTMENT') || q.includes('invest')) {
    return { intent: 'INVESTMENT_INFO', entities, confidence: 0.9, isNavigationRequest: false, isExternalLinkRequest: false };
  }

  if (entities.includes('CONTACT') || q.includes('contact') || q.includes('email')) {
    return { intent: 'CONTACT_INFO', entities, confidence: 0.9, isNavigationRequest: false, isExternalLinkRequest: false };
  }

  if (q.includes('mission') || q.includes('vision') || q.includes('why exist')) {
    return { intent: 'MISSION_INFO', entities, confidence: 0.85, isNavigationRequest: false, isExternalLinkRequest: false };
  }

  if (q.includes('product') || q.includes('ecosystem')) {
    return { intent: 'PRODUCT_INFO', entities, confidence: 0.85, isNavigationRequest: false, isExternalLinkRequest: false };
  }

  if (
    q.includes('epicforce') ||
    q.includes('what do you do') ||
    q.includes('what is this') ||
    q.includes('about')
  ) {
    return { intent: 'COMPANY_INFO', entities, confidence: 0.85, isNavigationRequest: false, isExternalLinkRequest: false };
  }

  if (q === 'hi' || q === 'hello' || q === 'hey' || q.startsWith('hello') || q.startsWith('good morning')) {
    return { intent: 'GENERAL_CONVERSATION', entities, confidence: 0.9, isNavigationRequest: false, isExternalLinkRequest: false };
  }

  return { intent: 'GENERAL_CONVERSATION', entities, confidence: 0.5, isNavigationRequest: false, isExternalLinkRequest: false };
}
