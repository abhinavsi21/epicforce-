/**
 * EpicForce.ai Knowledge Base — Single Source of Truth
 * Structured, chunked, and RAG-ready for semantic and keyword retrieval.
 */

import { KnowledgeChunk, NamedEntity, UserIntent } from '../types';
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

export const KNOWLEDGE_CHUNKS: KnowledgeChunk[] = [
  {
    id: 'company-overview',
    category: 'company',
    title: 'EpicForce.ai Company Overview',
    content:
      'EpicForce.ai is a purpose-driven innovation platform building intelligent technology that amplifies humanity. Tagline: "Where ideas become epic." Slogan: "Powered by force, guided by AI." Located across San Francisco, Mumbai, and global hubs. It bridges human purpose and intelligence into systems of lasting clarity and scale.',
    tags: ['company', 'epicforce', 'about', 'overview', 'identity', 'what is', 'locations'],
    associatedActions: ['GO_PRODUCTS', 'GO_MISSION'],
  },
  {
    id: 'company-mission',
    category: 'mission',
    title: 'Mission & Purpose',
    content:
      'EpicForce.ai mission: "Use technology to make us more human." Rather than creating mindless distraction or replacing human will, we design systems that simplify cognitive friction, dissolve mental noise, and restore human clarity and agency.',
    tags: ['mission', 'vision', 'purpose', 'philosophy', 'why exist'],
    associatedActions: ['GO_MISSION', 'GO_PILLARS'],
  },
  {
    id: 'company-pillars',
    category: 'mission',
    title: 'The Four Key Pillars',
    content:
      'The 4 Pillars of EpicForce.ai:\n1. Clarity: Helping individuals and teams gain acute awareness, dissolve noise, and identify high-leverage direction.\n2. Creativity: Transforming raw sparks into scalable structural reality through purposeful technology.\n3. Impact: Compounding positive results without vanity metrics.\n4. Community: Cultivating sovereign, collaborative human ecosystems.',
    tags: ['pillars', 'clarity', 'creativity', 'impact', 'community', 'core pillars'],
    associatedActions: ['GO_PILLARS'],
  },
  {
    id: 'product-innerverse',
    category: 'products',
    title: 'Innerverse Flagship Product',
    content:
      `Innerverse is EpicForce.ai’s first live product — a personal Life Navigation System (not a generic meditation, therapy, or simple habit app). Central insight: "The question is not only how do I feel? The question is whether I am moving toward the right life." It features 5 Core Navigation Pathways: Purpose (understand what drives you), Clarity (reduce noise & identify direction), Discipline (turn intention into consistent action), Alignment (bring actions closer to values), and Healing (create space for reflection & recovery). Live web platform destinations: ${INNERVERSE_URL} and ${MY_INNERVERSE_URL}.`,
    tags: ['innerverse', 'life navigation system', 'flagship', 'pathways', 'diagnostic', 'purpose', 'clarity', 'discipline', 'alignment', 'healing', 'first product', 'myinnerverse.in'],
    associatedActions: ['GO_INNERVERSE', 'OPEN_INNERVERSE', 'OPEN_MY_INNERVERSE'],
  },
  {
    id: 'innerverse-user-journey',
    category: 'products',
    title: 'Innerverse User Journey & Diagnostic',
    content:
      `The Innerverse journey follows 7 steps: 01 Assessment (Baseline diagnostic evaluating cognitive friction), 02 Personal Profile (Calculates orientation profile), 03 Identify Path (Focuses on highest-leverage area), 04 AI Guided Journey (Tailored weekly prompts), 05 Action & Reflection (Daily rituals), 06 Progress Telemetry (Auditing shift without vanity metrics), and 07 Long-Term Growth (Compounds personal clarity). The orientation diagnostic is interactive on-page or live on ${INNERVERSE_URL} and ${MY_INNERVERSE_URL}.`,
    tags: ['innerverse journey', 'diagnostic', 'assessment', 'user journey', 'calibration', 'steps'],
    associatedActions: ['GO_INNERVERSE', 'OPEN_INNERVERSE', 'OPEN_MY_INNERVERSE'],
  },
  {
    id: 'product-ai-aaji',
    category: 'products',
    title: 'AI Aaji Intelligent Digital Assistant',
    content:
      `AI Aaji is EpicForce.ai’s intelligent conversational digital assistant and real-time voice companion. It is now LIVE with an interactive live voice session directly on our website (featuring natural real-time dialogue with the Aoede voice model powered by Gemini Live) and an official destination at ${AI_AAJI_URL}. AI Aaji unites natural voice dialogue, computer control, workflow automation, email drafting, intelligent form filling, and multilingual assistance to eliminate cognitive friction and reclaim personal hours for humans.`,
    tags: ['ai aaji', 'aaji', 'assistant', 'companion', 'live', 'voice demo', 'voice companion', 'aoede', 'live voice', 'automation', 'productivity'],
    associatedActions: ['GO_AI_AAJI_DEMO', 'OPEN_AI_AAJI_WEBSITE', 'GO_AI_AAJI', 'GO_ROADMAP'],
  },
  {
    id: 'ai-aaji-live-demo',
    category: 'products',
    title: 'AI Aaji Live Voice Session Demo',
    content:
      `The AI Aaji Live Voice Demo is an interactive section situated immediately below the Products Overview on EpicForce.ai (#ai-aaji-demo). Visitors can experience real-time bidirectional voice conversation with AI Aaji using the Aoede voice configuration, a reactive glowing 3D orb with audio soundwave rings, live transcripts, and zero required logins. Privacy guarantee: microphone audio is processed in real time and never stored or recorded.`,
    tags: ['ai aaji demo', 'live voice demo', 'voice session', 'aoede', 'orb', 'interactive voice', 'real time voice'],
    associatedActions: ['GO_AI_AAJI_DEMO', 'OPEN_AI_AAJI_WEBSITE'],
  },
  {
    id: 'innerverse-insights',
    category: 'products',
    title: 'Innerverse Thought Leadership & Insights',
    content:
      'Innerverse Thought Leadership features three core publications:\n1. "You Are More Than Your Goals" (Framework): Explores the Four Foundations (Mindset, Heartset, Healthset, Soulset) and Seven Scores for life reflection and alignment.\n2. "Manifestation Is Not About Wishing" (Thought Leadership): Connects intention and self-awareness to purposeful execution without claiming mystical guarantees.\n3. "Innerverse Seven Score Framework for Life Navigation" (Research & Theory by Anish Timble): A theoretical synthesis and proposed validation programme modeling self-awareness, goal alignment, and fulfillment orientation.',
    tags: ['insights', 'articles', 'thought leadership', 'four foundations', 'manifestation', 'research paper', 'seven scores', 'theory', 'validation programme', 'publications'],
    associatedActions: ['GO_INSIGHTS', 'GO_INNERVERSE'],
  },
  {
    id: 'team-anish-timble',
    category: 'team',
    title: 'Anish Timble — Vision Architect',
    content:
      'Anish Timble is the founder and Vision Architect of EpicForce.ai. Born in the U.S., raised in India, and back in the U.S. after 26 years. A respectful rebel and lifelong problem solver dedicated to addressing humanity’s crisis of meaning and identity through purposeful technology. Focus: Ecosystem Architecture, Product Philosophy, Human Potential. Quote: "EpicForce.ai is my answer — a studio and movement dedicated to building solutions that don’t just make life efficient, but meaningful."',
    tags: ['anish', 'anish timble', 'founder', 'vision architect', 'leadership', 'who founded'],
    associatedActions: ['GO_TEAM', 'CONNECT_ANISH'],
  },
  {
    id: 'team-abhinav-singh',
    category: 'team',
    title: 'Abhinav Singh — Chief Growth Architect',
    content:
      'Abhinav Singh is the Chief Growth Architect at EpicForce.ai. He designs growth systems, structural scaling frameworks, and distribution ecosystems that turn attention into authority, and authority into sustainable revenue. Quote: "For me, growth is not promotion. It’s precision engineering." Focus: Growth Systems, Scale Architecture, Distribution Ecosystems.',
    tags: ['abhinav', 'abhinav singh', 'chief growth architect', 'growth', 'marketing', 'distribution'],
    associatedActions: ['GO_TEAM', 'CONNECT_ABHINAV'],
  },
  {
    id: 'roadmap-phases',
    category: 'roadmap',
    title: 'Strategic Roadmap 2026–2028',
    content:
      'EpicForce.ai Strategic Roadmap:\n• Phase 01: Foundation & MVP (Q3–Q4 2026) — Innerverse live at innervers.ai.studio, Diagnostic Engine, Philosophy.\n• Phase 02: Product-Market Fit (Q1–Q2 2027) — Innerverse Mobile apps, AI Aaji alpha prototype, institutional alliances.\n• Phase 03: Growth & Expansion (Q3–Q4 2027) — AI Aaji public beta, community & wellness pilots, distribution expansion.\n• Phase 04: Ecosystem Development (2028) — Full intelligence layer, developer platform & SDKs.',
    tags: ['roadmap', 'timeline', 'future', 'phases', 'milestones', 'phase 1', 'phase 2', 'phase 3', 'phase 4', '2026', '2027', '2028'],
    associatedActions: ['GO_ROADMAP'],
  },
  {
    id: 'investment-thesis',
    category: 'company',
    title: 'Why Invest in EpicForce.ai',
    content:
      'EpicForce.ai investment thesis highlights:\n• Technology that makes us more human: Addresses the acute global crisis of focus and meaning.\n• Proven first product: Innerverse is live with functioning navigation pathways.\n• Network compounding: Modular tools feeding a unified personal intelligence layer.\n• Leadership: Cross-domain balance of philosophy and growth engineering.\n• Global-first perspective: San Francisco and Mumbai transatlantic execution.\nNote: We do not publish speculative financial projections. Inquiries can be submitted to our founders directly.',
    tags: ['invest', 'investment', 'why invest', 'capital', 'partner with us', 'thesis'],
    associatedActions: ['GO_INVESTMENT', 'GO_CONTACT'],
  },
  {
    id: 'partner-melukat',
    category: 'partner',
    title: 'Promoting Partner — Melukat Meditation Center',
    content:
      'Melukat Meditation Center is featured on EpicForce.ai as a PROMOTING PARTNER (Featured Partner), NOT an EpicForce.ai product or subsidiary. It is a sanctuary centered on meditation, self-inquiry, peace, and conscious living. Website: https://melukat.app. Founded with spiritual guidance from Alain Yaovi Dagba.',
    tags: ['melukat', 'melukat meditation center', 'partner', 'promoting partner', 'featured partner', 'not epicforce product', 'meditation'],
    associatedActions: ['GO_MELUKAT', 'OPEN_MELUKAT'],
  },
  {
    id: 'contact-details',
    category: 'contact',
    title: 'Official Contact & Inquiries',
    content:
      `Contact EpicForce.ai:\n• Official Email: ${CONTACT_EMAIL}\n• Official Instagram: ${INSTAGRAM_URL} (@epicforce.ai)\n• Locations: San Francisco · Mumbai · Global\n• Transmissions can also be submitted directly through the verified contact form on the website.`,
    tags: ['contact', 'email', 'instagram', 'reach out', 'inquiry', 'message', 'address'],
    associatedActions: ['GO_CONTACT', 'OPEN_EMAIL', 'OPEN_INSTAGRAM'],
  },
];

/**
 * RAG-ready retriever: retrieves relevant verified knowledge chunks based on query, intent, and entities.
 */
export function retrieveRelevantKnowledge(
  query: string,
  intent?: UserIntent,
  entities?: NamedEntity[]
): KnowledgeChunk[] {
  const q = query.toLowerCase();
  const scored = KNOWLEDGE_CHUNKS.map((chunk) => {
    let score = 0;

    // Check entity matches
    if (entities && entities.length > 0) {
      if (entities.includes('INNERVERSE') && chunk.id.includes('innerverse')) score += 10;
      if (entities.includes('AI_AAJI') && chunk.id.includes('ai-aaji')) score += 10;
      if (entities.includes('ANISH_TIMBLE') && chunk.id.includes('anish')) score += 10;
      if (entities.includes('ABHINAV_SINGH') && chunk.id.includes('abhinav')) score += 10;
      if (entities.includes('MELUKAT') && chunk.id.includes('melukat')) score += 10;
      if (entities.includes('ROADMAP') && chunk.id.includes('roadmap')) score += 10;
      if (entities.includes('PILLARS') && chunk.id.includes('pillars')) score += 10;
      if (entities.includes('INVESTMENT') && chunk.id.includes('investment')) score += 10;
      if (entities.includes('CONTACT') && chunk.id.includes('contact')) score += 10;
      if (entities.includes('EPICFORCE') && chunk.id.includes('company')) score += 5;
    }

    // Check intent matches
    if (intent === 'INNERVERSE_INFO' && chunk.id.includes('innerverse')) score += 8;
    if (intent === 'AI_AAJI_INFO' && chunk.id.includes('ai-aaji')) score += 8;
    if (intent === 'TEAM_INFO' && chunk.category === 'team') score += 8;
    if (intent === 'ROADMAP_INFO' && chunk.category === 'roadmap') score += 8;
    if (intent === 'PARTNER_INFO' && chunk.category === 'partner') score += 8;
    if (intent === 'CONTACT_INFO' && chunk.category === 'contact') score += 8;
    if (intent === 'MISSION_INFO' && chunk.category === 'mission') score += 8;
    if (intent === 'PILLARS_INFO' && chunk.id.includes('pillars')) score += 8;
    if (intent === 'INVESTMENT_INFO' && chunk.id.includes('investment')) score += 8;

    // Tag and keyword matching
    for (const tag of chunk.tags) {
      if (q.includes(tag)) {
        score += 4;
      }
    }

    // Direct content snippet matching
    const words = q.split(/\s+/).filter((w) => w.length > 3);
    for (const w of words) {
      if (chunk.content.toLowerCase().includes(w)) {
        score += 1;
      }
    }

    return { chunk, score };
  });

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.chunk);
}
