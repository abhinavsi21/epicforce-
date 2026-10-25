/**
 * Master Chat Controller — Pipeline Coordinator
 * Orchestrates Safety -> Context -> Intent -> FAQ -> Knowledge -> AI Provider -> Validation.
 */

import {
  ActionDefinition,
  AIGuideRequest,
  AIGuideResponse,
  ApprovedActionType,
  ConversationContext,
  NamedEntity,
  UserIntent,
} from './types';
import { evaluateInputSafety } from './security/injectionDefense';
import { resolveContextualReferences } from './context/contextEngine';
import { classifyIntentAndEntities } from './intent/intentRouter';
import { matchFAQ } from './faq/faqEngine';
import { retrieveRelevantKnowledge } from './knowledge/knowledgeBase';
import { ACTION_REGISTRY, validateActions } from './actions/actionEngine';
import { GeminiAIProvider, LocalFallbackProvider } from './providers/aiProvider';

export class AIGuideController {
  private geminiProvider: GeminiAIProvider;
  private fallbackProvider: LocalFallbackProvider;

  constructor() {
    this.geminiProvider = new GeminiAIProvider();
    this.fallbackProvider = new LocalFallbackProvider();
  }

  async processMessage(request: AIGuideRequest): Promise<AIGuideResponse> {
    const rawMessage = request.message || '';

    // Step 1: Input Normalization & Security Injection Check
    const safety = evaluateInputSafety(rawMessage);
    if (!safety.isSafe) {
      return {
        message: safety.refusalMessage || "I cannot process this request.",
        intent: 'INJECTION_ATTEMPT',
        entities: [],
        actions: [ACTION_REGISTRY.GO_PRODUCTS, ACTION_REGISTRY.GO_MISSION],
        suggestedFollowUps: ['What is EpicForce.ai?', 'What is Innerverse?', 'View Roadmap'],
        source: 'security',
      };
    }

    // Step 2: Context Construction
    const historyTurns = (request.context.history || []).map((h, i) => ({
      id: `turn-${i}`,
      role: h.role,
      text: h.text,
      timestamp: Date.now(),
      intent: h.intent,
      entities: h.entity ? [h.entity] : [],
    }));

    const lastUserTurn = historyTurns.filter((t) => t.role === 'user').slice(-1)[0];
    const lastEntity = lastUserTurn?.entities?.[0];
    const lastIntent = lastUserTurn?.intent;

    const convContext: ConversationContext = {
      currentSection: request.context.currentSection || 'hero',
      currentRoute: request.context.currentRoute || '/',
      lastViewedSection: request.context.lastViewedSection || request.context.currentSection,
      lastEntity,
      lastIntent,
      history: historyTurns,
    };

    // Step 3: Conversational Reference Resolution (pronoun resolution: "it", "that", "where can I try it", "explain this")
    const resolvedRef = resolveContextualReferences(rawMessage, convContext);
    const activeQuery = resolvedRef.resolvedQuery;

    // Step 4: Intent Classification & Entity Extraction
    const classification = classifyIntentAndEntities(activeQuery, {
      lastEntity: resolvedRef.inferredEntity,
      lastIntent: resolvedRef.inferredIntent,
    });

    const activeIntent: UserIntent = resolvedRef.inferredIntent || classification.intent;
    const activeEntities: NamedEntity[] =
      classification.entities.length > 0
        ? classification.entities
        : resolvedRef.inferredEntity
        ? [resolvedRef.inferredEntity]
        : [];

    // Step 5: Direct Navigation Intent Shortcut
    if (classification.isNavigationRequest) {
      const navActions = this.resolveNavigationActions(activeEntities, activeQuery);
      return {
        message: this.getNavigationExplanation(activeEntities, activeQuery),
        intent: 'NAVIGATION',
        entities: activeEntities,
        actions: navActions,
        suggestedFollowUps: ['Tell me more', 'View Roadmap', 'Who founded EpicForce.ai?'],
        source: 'faq',
      };
    }

    // Step 6: Direct External Link Request Shortcut
    if (classification.isExternalLinkRequest) {
      const extActions = this.resolveExternalActions(activeEntities, activeQuery);
      return {
        message: this.getExternalLinkExplanation(activeEntities, activeQuery),
        intent: 'EXTERNAL_LINK',
        entities: activeEntities,
        actions: extActions,
        suggestedFollowUps: ['Explore Innerverse on page', 'What is AI Aaji?', 'Contact EpicForce'],
        source: 'faq',
      };
    }

    // Step 7: FAQ Engine Lookup (Near-instant, zero-latency, deterministic)
    const faqMatch = matchFAQ(activeQuery, activeIntent, activeEntities[0]);
    if (faqMatch) {
      return {
        message: faqMatch.item.answer,
        intent: faqMatch.item.intent,
        entities: [faqMatch.item.entity],
        actions: faqMatch.actions,
        suggestedFollowUps: faqMatch.item.followUps,
        source: 'faq',
      };
    }

    // Step 8: RAG-ready Knowledge Retrieval
    const relevantChunks = retrieveRelevantKnowledge(activeQuery, activeIntent, activeEntities);

    // Step 9: Determine whether AI Reasoning Engine is required
    let generatedText = '';
    let responseSource: AIGuideResponse['source'] = 'ai_engine';

    if (this.geminiProvider.isAvailable()) {
      try {
        const providerRes = await this.geminiProvider.generateResponse({
          userMessage: rawMessage,
          verifiedKnowledge: relevantChunks,
          intent: activeIntent,
          entities: activeEntities,
          currentSection: convContext.currentSection,
          currentRoute: convContext.currentRoute,
          conversationHistory: historyTurns.map((h) => ({ role: h.role, text: h.text })),
        });
        generatedText = providerRes.text;
      } catch (err) {
        console.warn('[AI Guide Controller] Gemini provider encountered error, falling back to local synthesis:', err);
        const fallbackRes = await this.fallbackProvider.generateResponse({
          userMessage: rawMessage,
          verifiedKnowledge: relevantChunks,
          intent: activeIntent,
          entities: activeEntities,
          currentSection: convContext.currentSection,
          currentRoute: convContext.currentRoute,
          conversationHistory: historyTurns.map((h) => ({ role: h.role, text: h.text })),
        });
        generatedText = fallbackRes.text;
        responseSource = 'fallback';
      }
    } else {
      const fallbackRes = await this.fallbackProvider.generateResponse({
        userMessage: rawMessage,
        verifiedKnowledge: relevantChunks,
        intent: activeIntent,
        entities: activeEntities,
        currentSection: convContext.currentSection,
        currentRoute: convContext.currentRoute,
        conversationHistory: historyTurns.map((h) => ({ role: h.role, text: h.text })),
      });
      generatedText = fallbackRes.text;
      responseSource = 'knowledge';
    }

    // Step 10: Validate and attach recommended actions
    const validatedActions = this.resolveRecommendedActions(activeIntent, activeEntities, relevantChunks);

    // Step 11: Determine Dynamic Follow-up Suggestions
    const followUps = this.resolveFollowUps(activeIntent, activeEntities);

    return {
      message: generatedText,
      intent: activeIntent,
      entities: activeEntities,
      actions: validatedActions,
      suggestedFollowUps: followUps,
      resolvedContext: {
        entity: activeEntities[0],
      },
      source: responseSource,
    };
  }

  private resolveNavigationActions(entities: NamedEntity[], query: string): ActionDefinition[] {
    const q = query.toLowerCase();
    if (entities.includes('INNERVERSE') || q.includes('innerverse')) {
      return [ACTION_REGISTRY.GO_INNERVERSE, ACTION_REGISTRY.OPEN_INNERVERSE];
    }
    if (entities.includes('AI_AAJI') || q.includes('aaji')) {
      return [ACTION_REGISTRY.GO_AI_AAJI, ACTION_REGISTRY.GO_ROADMAP];
    }
    if (entities.includes('INSIGHTS') || q.includes('insight') || q.includes('article') || q.includes('research paper')) {
      return [ACTION_REGISTRY.GO_INSIGHTS, ACTION_REGISTRY.OPEN_ARTICLE_FOUNDATIONS, ACTION_REGISTRY.OPEN_ARTICLE_RESEARCH];
    }
    if (entities.includes('ROADMAP') || q.includes('roadmap')) {
      return [ACTION_REGISTRY.GO_ROADMAP];
    }
    if (entities.includes('ANISH_TIMBLE') || entities.includes('ABHINAV_SINGH') || q.includes('team') || q.includes('founder')) {
      return [ACTION_REGISTRY.GO_TEAM];
    }
    if (entities.includes('MELUKAT') || q.includes('melukat')) {
      return [ACTION_REGISTRY.GO_MELUKAT, ACTION_REGISTRY.OPEN_MELUKAT];
    }
    if (entities.includes('INVESTMENT') || q.includes('invest')) {
      return [ACTION_REGISTRY.GO_INVESTMENT, ACTION_REGISTRY.GO_CONTACT];
    }
    if (entities.includes('PILLARS') || q.includes('pillar')) {
      return [ACTION_REGISTRY.GO_PILLARS];
    }
    if (entities.includes('CONTACT') || q.includes('contact')) {
      return [ACTION_REGISTRY.GO_CONTACT, ACTION_REGISTRY.OPEN_EMAIL];
    }
    return [ACTION_REGISTRY.GO_PRODUCTS, ACTION_REGISTRY.GO_MISSION];
  }

  private getNavigationExplanation(entities: NamedEntity[], query: string): string {
    const q = query.toLowerCase();
    if (entities.includes('INNERVERSE') || q.includes('innerverse')) {
      return 'Innerverse is featured in the Products section of EpicForce.ai. I can take you there now.';
    }
    if (entities.includes('AI_AAJI') || q.includes('aaji')) {
      return 'AI Aaji is featured right after Innerverse in our Product Ecosystem section. Here is the link.';
    }
    if (entities.includes('INSIGHTS') || q.includes('insight') || q.includes('article')) {
      return 'Our Thought Leadership & Insights section features three publications on intentional living, the Four Foundations, and the Seven Score research paper.';
    }
    if (entities.includes('ROADMAP') || q.includes('roadmap')) {
      return 'Our Strategic Roadmap outlines our progression across four phases through 2028. I can scroll you to it.';
    }
    if (entities.includes('ANISH_TIMBLE') || entities.includes('ABHINAV_SINGH') || q.includes('team') || q.includes('founder')) {
      return 'Our leadership section introduces Vision Architect Anish Timble and Chief Growth Architect Abhinav Singh.';
    }
    if (entities.includes('MELUKAT') || q.includes('melukat')) {
      return 'Melukat Meditation Center is highlighted in our Promoting Partner section near the lower half of the page.';
    }
    if (entities.includes('CONTACT') || q.includes('contact')) {
      return 'You can transmit an inquiry or contact our team directly in the contact section.';
    }
    return 'Here is the relevant section of the website.';
  }

  private resolveExternalActions(entities: NamedEntity[], query: string): ActionDefinition[] {
    const q = query.toLowerCase();
    if (entities.includes('INNERVERSE') || q.includes('innerverse')) {
      return [ACTION_REGISTRY.OPEN_INNERVERSE, ACTION_REGISTRY.GO_INNERVERSE];
    }
    if (entities.includes('MELUKAT') || q.includes('melukat')) {
      return [ACTION_REGISTRY.OPEN_MELUKAT, ACTION_REGISTRY.GO_MELUKAT];
    }
    if (q.includes('instagram')) {
      return [ACTION_REGISTRY.OPEN_INSTAGRAM];
    }
    if (q.includes('email') || q.includes('mail')) {
      return [ACTION_REGISTRY.OPEN_EMAIL];
    }
    return [ACTION_REGISTRY.OPEN_INNERVERSE];
  }

  private getExternalLinkExplanation(entities: NamedEntity[], query: string): string {
    const q = query.toLowerCase();
    if (entities.includes('INNERVERSE') || q.includes('innerverse')) {
      return 'The full live Innerverse platform is available at innervers.ai.studio.';
    }
    if (entities.includes('MELUKAT') || q.includes('melukat')) {
      return 'Melukat Meditation Center is an aligned promoting partner. You can visit their live experience at melukat.app.';
    }
    if (q.includes('instagram')) {
      return 'You can connect with EpicForce.ai on our official Instagram page.';
    }
    if (q.includes('email')) {
      return 'You can email our team directly at nsh.aimac@gmail.com.';
    }
    return 'Here is the approved external link.';
  }

  private resolveRecommendedActions(
    intent: UserIntent,
    entities: NamedEntity[],
    relevantChunks: any[]
  ): ActionDefinition[] {
    const actionTypes: ApprovedActionType[] = [];

    if (entities.includes('INNERVERSE') || intent === 'INNERVERSE_INFO') {
      actionTypes.push('GO_INNERVERSE', 'OPEN_INNERVERSE');
    } else if (entities.includes('AI_AAJI') || intent === 'AI_AAJI_INFO') {
      actionTypes.push('GO_AI_AAJI', 'GO_ROADMAP');
    } else if (entities.includes('INSIGHTS') || intent === 'INSIGHTS_INFO') {
      actionTypes.push('GO_INSIGHTS', 'OPEN_ARTICLE_FOUNDATIONS', 'OPEN_ARTICLE_RESEARCH');
    } else if (entities.includes('MELUKAT') || intent === 'PARTNER_INFO') {
      actionTypes.push('GO_MELUKAT', 'OPEN_MELUKAT');
    } else if (entities.includes('ANISH_TIMBLE') || entities.includes('ABHINAV_SINGH') || intent === 'TEAM_INFO') {
      actionTypes.push('GO_TEAM');
      if (entities.includes('ANISH_TIMBLE')) actionTypes.push('CONNECT_ANISH');
      if (entities.includes('ABHINAV_SINGH')) actionTypes.push('CONNECT_ABHINAV');
    } else if (entities.includes('ROADMAP') || intent === 'ROADMAP_INFO') {
      actionTypes.push('GO_ROADMAP');
    } else if (entities.includes('INVESTMENT') || intent === 'INVESTMENT_INFO') {
      actionTypes.push('GO_INVESTMENT', 'GO_CONTACT');
    } else if (entities.includes('CONTACT') || intent === 'CONTACT_INFO') {
      actionTypes.push('GO_CONTACT', 'OPEN_EMAIL', 'OPEN_INSTAGRAM');
    } else {
      actionTypes.push('GO_PRODUCTS', 'GO_MISSION');
    }

    return validateActions(actionTypes);
  }

  private resolveFollowUps(intent: UserIntent, entities: NamedEntity[]): string[] {
    if (entities.includes('INNERVERSE') || intent === 'INNERVERSE_INFO') {
      return ['What are the 5 pathways?', 'Can I try Innerverse?', 'What is AI Aaji?'];
    }
    if (entities.includes('AI_AAJI') || intent === 'AI_AAJI_INFO') {
      return ['When is AI Aaji launching?', 'What is Innerverse?', 'View Roadmap'];
    }
    if (entities.includes('INSIGHTS') || intent === 'INSIGHTS_INFO') {
      return ['What is the Four Foundations framework?', 'Tell me about the research paper', 'What is Manifestation article?'];
    }
    if (entities.includes('MELUKAT') || intent === 'PARTNER_INFO') {
      return ['What are EpicForce products?', 'What is Innerverse?', 'Contact EpicForce'];
    }
    if (intent === 'TEAM_INFO') {
      return ['Who is Anish Timble?', 'Who is Abhinav Singh?', 'What is Innerverse?'];
    }
    if (intent === 'ROADMAP_INFO') {
      return ['When does Phase 2 start?', 'What is Innerverse?', 'Why Invest?'];
    }
    return ['What is EpicForce.ai?', 'What is Innerverse?', 'Meet the Team', 'View Roadmap'];
  }
}
