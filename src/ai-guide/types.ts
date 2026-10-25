/**
 * EpicForce AI Guide — Architecture Type Definitions
 * Enterprise-grade contracts for Intent, Entity, Knowledge, Context, Actions, and Security.
 */

export type UserIntent =
  | 'COMPANY_INFO'
  | 'MISSION_INFO'
  | 'PILLARS_INFO'
  | 'PRODUCT_INFO'
  | 'INNERVERSE_INFO'
  | 'AI_AAJI_INFO'
  | 'TEAM_INFO'
  | 'ROADMAP_INFO'
  | 'INVESTMENT_INFO'
  | 'PARTNER_INFO'
  | 'CONTACT_INFO'
  | 'INSIGHTS_INFO'
  | 'NAVIGATION'
  | 'EXTERNAL_LINK'
  | 'GENERAL_CONVERSATION'
  | 'OUT_OF_SCOPE'
  | 'INJECTION_ATTEMPT';

export type NamedEntity =
  | 'EPICFORCE'
  | 'INNERVERSE'
  | 'AI_AAJI'
  | 'INSIGHTS'
  | 'ANISH_TIMBLE'
  | 'ABHINAV_SINGH'
  | 'MELUKAT'
  | 'ROADMAP'
  | 'PILLARS'
  | 'INVESTMENT'
  | 'CONTACT';

export type ApprovedActionType =
  // Internal Page Navigation
  | 'GO_HOME'
  | 'GO_ABOUT'
  | 'GO_MISSION'
  | 'GO_PILLARS'
  | 'GO_PRODUCTS'
  | 'GO_INNERVERSE'
  | 'GO_AI_AAJI'
  | 'GO_AI_AAJI_DEMO'
  | 'GO_INSIGHTS'
  | 'GO_ROADMAP'
  | 'GO_TEAM'
  | 'GO_INVESTMENT'
  | 'GO_CONTACT'
  | 'GO_MELUKAT'
  | 'GO_PARTNERS'
  // Approved External Destinations
  | 'OPEN_INNERVERSE'
  | 'OPEN_MY_INNERVERSE'
  | 'OPEN_AI_AAJI_WEBSITE'
  | 'OPEN_MELUKAT'
  | 'OPEN_INSTAGRAM'
  | 'OPEN_EMAIL'
  | 'CONNECT_ANISH'
  | 'CONNECT_ABHINAV'
  | 'OPEN_ARTICLE_FOUNDATIONS'
  | 'OPEN_ARTICLE_MANIFESTATION'
  | 'OPEN_ARTICLE_RESEARCH';

export interface ActionDefinition {
  type: ApprovedActionType;
  label: string;
  category: 'navigation' | 'external';
  target: string;
  isExternal?: boolean;
}

export interface KnowledgeChunk {
  id: string;
  category: 'company' | 'products' | 'team' | 'roadmap' | 'partner' | 'contact' | 'mission';
  title: string;
  content: string;
  tags: string[];
  associatedActions?: ApprovedActionType[];
}

export interface ConversationTurn {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: number;
  intent?: UserIntent;
  entities?: NamedEntity[];
  actions?: ActionDefinition[];
}

export interface ConversationContext {
  currentSection: string;
  currentRoute: string;
  lastViewedSection?: string;
  lastIntent?: UserIntent;
  lastEntity?: NamedEntity;
  lastAction?: ApprovedActionType;
  history: ConversationTurn[];
}

export interface AIGuideRequest {
  message: string;
  context: {
    currentSection?: string;
    currentRoute?: string;
    lastViewedSection?: string;
    history?: {
      role: 'user' | 'assistant';
      text: string;
      intent?: UserIntent;
      entity?: NamedEntity;
    }[];
  };
}

export interface AIGuideResponse {
  message: string;
  intent: UserIntent;
  entities: NamedEntity[];
  actions: ActionDefinition[];
  suggestedFollowUps: string[];
  resolvedContext?: {
    entity?: NamedEntity;
    topic?: string;
  };
  source: 'faq' | 'knowledge' | 'ai_engine' | 'fallback' | 'security';
}

export interface AIProviderConfig {
  apiKey?: string;
  model?: string;
  temperature?: number;
  timeoutMs?: number;
}
