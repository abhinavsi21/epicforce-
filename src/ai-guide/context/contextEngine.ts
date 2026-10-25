/**
 * Context Engine & Conversational Reference Resolver
 * Resolves implicit pronouns ("it", "that", "where can I try it", "explain this")
 * and maintains conversational state across interaction turns.
 */

import { ConversationContext, NamedEntity, UserIntent } from '../types';

export interface ReferenceResolution {
  resolvedQuery: string;
  inferredEntity?: NamedEntity;
  inferredIntent?: UserIntent;
  usedContext: boolean;
}

export function resolveContextualReferences(
  rawQuery: string,
  context: ConversationContext
): ReferenceResolution {
  const q = rawQuery.trim().toLowerCase().replace(/[.?!]+$/, '');

  // Pattern 1: Deictic reference to current on-screen section ("explain this", "what is this section", "tell me about this")
  if (
    q === 'explain this' ||
    q === 'what is this' ||
    q === 'tell me about this' ||
    q === 'what am i looking at' ||
    q === 'explain this section'
  ) {
    const sec = context.currentSection || context.lastViewedSection || 'hero';
    let entity: NamedEntity = 'EPICFORCE';
    let intent: UserIntent = 'COMPANY_INFO';

    if (sec === 'innerverse') {
      entity = 'INNERVERSE';
      intent = 'INNERVERSE_INFO';
    } else if (sec === 'ai-aaji') {
      entity = 'AI_AAJI';
      intent = 'AI_AAJI_INFO';
    } else if (sec === 'insights') {
      entity = 'INNERVERSE';
      intent = 'INNERVERSE_INFO';
    } else if (sec === 'founders') {
      entity = 'ANISH_TIMBLE';
      intent = 'TEAM_INFO';
    } else if (sec === 'roadmap') {
      entity = 'ROADMAP';
      intent = 'ROADMAP_INFO';
    } else if (sec === 'partners') {
      entity = 'MELUKAT';
      intent = 'PARTNER_INFO';
    } else if (sec === 'why-epicforce') {
      entity = 'INVESTMENT';
      intent = 'INVESTMENT_INFO';
    } else if (sec === 'pillars') {
      entity = 'PILLARS';
      intent = 'PILLARS_INFO';
    } else if (sec === 'mission') {
      entity = 'EPICFORCE';
      intent = 'MISSION_INFO';
    }

    return {
      resolvedQuery: `Explain the ${sec} section and ${entity}`,
      inferredEntity: entity,
      inferredIntent: intent,
      usedContext: true,
    };
  }

  // Pattern 2: Pronoun "it" or "that" referring to previous entity
  const hasPronoun =
    /\b(it|that|this product|the app|the system|the platform)\b/i.test(q);

  if (hasPronoun && context.lastEntity) {
    if (context.lastEntity === 'INNERVERSE') {
      if (q.includes('where can i try') || q.includes('how do i use') || q.includes('can i use') || q.includes('open') || q.includes('launch')) {
        return {
          resolvedQuery: 'Where can I try the live Innerverse platform?',
          inferredEntity: 'INNERVERSE',
          inferredIntent: 'EXTERNAL_LINK',
          usedContext: true,
        };
      }
      if (q.includes('who created') || q.includes('who made') || q.includes('who built')) {
        return {
          resolvedQuery: 'Who created Innerverse and EpicForce?',
          inferredEntity: 'ANISH_TIMBLE',
          inferredIntent: 'TEAM_INFO',
          usedContext: true,
        };
      }
    }

    if (context.lastEntity === 'AI_AAJI') {
      if (q.includes('when') || q.includes('launch') || q.includes('available') || q.includes('can i use')) {
        return {
          resolvedQuery: 'When is AI Aaji launching and what is its status?',
          inferredEntity: 'AI_AAJI',
          inferredIntent: 'AI_AAJI_INFO',
          usedContext: true,
        };
      }
    }

    if (context.lastEntity === 'MELUKAT') {
      if (q.includes('open') || q.includes('visit') || q.includes('where is it')) {
        return {
          resolvedQuery: 'Where can I visit Melukat Meditation Center?',
          inferredEntity: 'MELUKAT',
          inferredIntent: 'EXTERNAL_LINK',
          usedContext: true,
        };
      }
    }
  }

  // Pattern 3: Bare follow-ups like "where?", "when?", "how?"
  if (q === 'where?' || q === 'where' || q === 'how do i try it?') {
    if (context.lastEntity === 'INNERVERSE') {
      return {
        resolvedQuery: 'Where can I access Innerverse?',
        inferredEntity: 'INNERVERSE',
        inferredIntent: 'EXTERNAL_LINK',
        usedContext: true,
      };
    }
  }

  return {
    resolvedQuery: rawQuery,
    inferredEntity: context.lastEntity,
    inferredIntent: context.lastIntent,
    usedContext: false,
  };
}
