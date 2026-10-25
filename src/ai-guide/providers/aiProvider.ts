/**
 * AI Provider Abstraction Interface
 * Decouples model execution from underlying vendor APIs (Gemini, Claude, OpenAI, local fallback).
 */

import { GoogleGenAI } from '@google/genai';
import { KnowledgeChunk, NamedEntity, UserIntent } from '../types';

export interface ProviderContext {
  userMessage: string;
  verifiedKnowledge: KnowledgeChunk[];
  intent: UserIntent;
  entities: NamedEntity[];
  currentSection: string;
  currentRoute: string;
  conversationHistory: { role: 'user' | 'assistant'; text: string }[];
}

export interface ProviderResponse {
  text: string;
  suggestedActionKeys?: string[];
  providerUsed: string;
}

export interface AIProvider {
  name: string;
  isAvailable(): boolean;
  generateResponse(context: ProviderContext): Promise<ProviderResponse>;
}

/**
 * Production Gemini Provider implementation using @google/genai
 */
export class GeminiAIProvider implements AIProvider {
  name = 'GeminiAIProvider (gemini-3.8-flash)';
  private apiKey: string | undefined;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.GEMINI_API_KEY;
  }

  isAvailable(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0);
  }

  async generateResponse(context: ProviderContext): Promise<ProviderResponse> {
    if (!this.apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const ai = new GoogleGenAI({
      apiKey: this.apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const knowledgeSummary = context.verifiedKnowledge
      .map((k) => `[${k.title}]: ${k.content}`)
      .join('\n\n');

    const systemInstruction = `
You are the official EpicForce AI Guide for EpicForce.ai.
Your role: Intelligent, calm, professional, and concise website concierge.

STRICT INVARIANTS:
1. You must answer ONLY using the verified knowledge below. If information is not in the verified knowledge, clearly say that you do not have that verified information in the website knowledge base rather than guessing.
2. NEVER invent funding, valuation, investors, customer numbers, awards, or launch dates.
3. Innerverse is a "Life Navigation System" (NOT a generic meditation, therapy, or simple habit app). Live site: https://innervers.ai.studio.
4. AI Aaji is in development / coming soon.
5. Innerverse Thought Leadership features three core publications: "You Are More Than Your Goals" (Four Foundations & Seven Scores), "Manifestation Is Not About Wishing" (intention and action), and "Innerverse Seven Score Framework for Life Navigation" (theoretical synthesis and proposed validation programme by Anish Timble).
6. Melukat Meditation Center is an aligned PROMOTING PARTNER (melukat.app), NOT an EpicForce.ai product or subsidiary.
7. Founders: Anish Timble (Vision Architect) and Abhinav Singh (Chief Growth Architect).
8. Keep responses concise: 2 to 4 sentences. Avoid fluff or corporate jargon.

VERIFIED KNOWLEDGE:
${knowledgeSummary}

CURRENT SECTION: ${context.currentSection}
INTENT: ${context.intent}
ENTITIES: ${context.entities.join(', ')}
`;

    const contents = [
      ...context.conversationHistory.slice(-4).map((h) => ({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.text }],
      })),
      {
        role: 'user',
        parts: [{ text: context.userMessage }],
      },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.25,
      },
    });

    const text = response.text || '';
    if (!text.trim()) {
      throw new Error('Gemini returned an empty text candidate');
    }

    return {
      text: text.trim(),
      providerUsed: this.name,
    };
  }
}

/**
 * Deterministic Local Fallback Provider
 * Synthesizes relevant knowledge chunks without network dependencies.
 */
export class LocalFallbackProvider implements AIProvider {
  name = 'LocalFallbackProvider (Deterministic Synthesis)';

  isAvailable(): boolean {
    return true;
  }

  async generateResponse(context: ProviderContext): Promise<ProviderResponse> {
    if (context.verifiedKnowledge.length > 0) {
      const primary = context.verifiedKnowledge[0];
      return {
        text: primary.content,
        providerUsed: this.name,
      };
    }

    return {
      text: "I'm the official EpicForce AI Guide. I can help you explore EpicForce.ai, our flagship Life Navigation System Innerverse, AI Aaji, our leadership, roadmap, partnerships, or guide you across the website.",
      providerUsed: this.name,
    };
  }
}
