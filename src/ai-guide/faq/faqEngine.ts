/**
 * Extensible FAQ Engine
 * Provides sub-millisecond, deterministic, verified answers for common visitor questions.
 */

import { ActionDefinition, ApprovedActionType, NamedEntity, UserIntent } from '../types';
import { ACTION_REGISTRY } from '../actions/actionEngine';

export interface FAQItem {
  id: string;
  question: string;
  intent: UserIntent;
  entity: NamedEntity;
  answer: string;
  keywords: string[];
  patterns: RegExp[];
  actions: ApprovedActionType[];
  followUps: string[];
}

export const FAQ_DATABASE: FAQItem[] = [
  {
    id: 'faq-what-is-epicforce',
    question: 'What is EpicForce.ai?',
    intent: 'COMPANY_INFO',
    entity: 'EPICFORCE',
    answer:
      'EpicForce.ai is a purpose-driven innovation platform focused on building technology that amplifies humanity. The company’s current ecosystem features our live flagship product Innerverse and our intelligent companion AI Aaji, with a broader roadmap toward an interconnected personal intelligence network.',
    keywords: ['what is epicforce', 'about epicforce', 'what do you do', 'what are you building', 'tell me about epicforce', 'who is epicforce'],
    patterns: [
      /what (is|does) epicforce(\.ai)?/i,
      /tell me about epicforce/i,
      /what (are you|is this) building/i,
      /what does this company do/i,
    ],
    actions: ['GO_PRODUCTS', 'GO_MISSION'],
    followUps: ['What is Innerverse?', 'What is AI Aaji?', 'Who founded EpicForce.ai?'],
  },
  {
    id: 'faq-mission',
    question: 'What is EpicForce.ai’s mission?',
    intent: 'MISSION_INFO',
    entity: 'EPICFORCE',
    answer:
      'Our mission is to "Use technology to make us more human." We believe the critical challenge of our era is a global crisis of human clarity and focus. We build tools that simplify cognitive friction, dissolve mental noise, and restore enduring personal agency.',
    keywords: ['mission', 'vision', 'purpose', 'core statement', 'why do you exist'],
    patterns: [
      /what is (your|the) mission/i,
      /what is (your|the) vision/i,
      /why (does|did) epicforce exist/i,
    ],
    actions: ['GO_MISSION', 'GO_PILLARS'],
    followUps: ['Explain the 4 Core Pillars', 'What is Innerverse?', 'Why Invest?'],
  },
  {
    id: 'faq-pillars',
    question: 'What are the 4 Core Pillars?',
    intent: 'PILLARS_INFO',
    entity: 'PILLARS',
    answer:
      'EpicForce.ai is built upon four foundational pillars:\n• Clarity: Helping individuals and teams gain acute awareness and identify high-leverage direction.\n• Creativity: Transforming raw sparks into scalable structural reality.\n• Impact: Compounding positive results without vanity metrics.\n• Community: Cultivating sovereign, collaborative human ecosystems.',
    keywords: ['pillars', 'four pillars', 'core pillars', '4 pillars'],
    patterns: [/pillars/i, /four pillars/i, /core pillars/i],
    actions: ['GO_PILLARS'],
    followUps: ['What is Innerverse?', 'Who founded EpicForce.ai?', 'View Roadmap'],
  },
  {
    id: 'faq-what-is-innerverse',
    question: 'What is Innerverse?',
    intent: 'INNERVERSE_INFO',
    entity: 'INNERVERSE',
    answer:
      'Innerverse is EpicForce.ai’s first flagship product — a personal Life Navigation System. Unlike generic meditation or habit apps, Innerverse centers on a foundational inquiry: "The question is not only how do I feel? The question is whether I am moving toward the right life." It maps personal growth across five essential pathways: Purpose, Clarity, Discipline, Alignment, and Healing.',
    keywords: ['innerverse', 'what is innerverse', 'life navigation', 'first product', 'tell me about innerverse'],
    patterns: [
      /what is innerverse/i,
      /tell me about innerverse/i,
      /what does innerverse do/i,
      /what is the first product/i,
    ],
    actions: ['GO_INNERVERSE', 'OPEN_INNERVERSE'],
    followUps: ['How does Innerverse work?', 'Can I try Innerverse?', 'What is AI Aaji?'],
  },
  {
    id: 'faq-try-innerverse',
    question: 'Where can I try Innerverse?',
    intent: 'EXTERNAL_LINK',
    entity: 'INNERVERSE',
    answer:
      'The live Innerverse experience is available at innervers.ai.studio. You can also explore our interactive orientation diagnostic and five navigation pathways directly on this website.',
    keywords: ['try innerverse', 'use innerverse', 'launch innerverse', 'innerverse website', 'innervers.ai.studio', 'open innerverse'],
    patterns: [
      /(can i|where can i|how do i) (use|try|access|test) innerverse/i,
      /launch innerverse/i,
      /open innerverse/i,
      /where is innerverse/i,
    ],
    actions: ['GO_INNERVERSE', 'OPEN_INNERVERSE'],
    followUps: ['What are the 5 pathways?', 'What is AI Aaji?', 'View Roadmap'],
  },
  {
    id: 'faq-insights-overview',
    question: 'What is the Innerverse Thought Leadership & Insights section?',
    intent: 'INSIGHTS_INFO',
    entity: 'INSIGHTS',
    answer:
      'The Innerverse Thought Leadership section features three key publications exploring ideas for a more intentional life:\n1. "You Are More Than Your Goals" — The Four Foundations (Mindset, Heartset, Healthset, Soulset) and Seven Scores.\n2. "Manifestation Is Not About Wishing" — Connecting intention and self-awareness to purposeful action.\n3. "Innerverse Seven Score Framework for Life Navigation" — Theoretical synthesis and proposed validation programme by Anish Timble.',
    keywords: ['insights', 'articles', 'thought leadership', 'publications', 'read articles', 'research'],
    patterns: [
      /what (are|is) (the )?(innerverse )?(insights|articles|thought leadership|publications)/i,
      /tell me about (the )?insights/i,
      /show me (the )?articles/i,
    ],
    actions: ['GO_INSIGHTS', 'OPEN_ARTICLE_FOUNDATIONS', 'OPEN_ARTICLE_RESEARCH'],
    followUps: ['Tell me about the Four Foundations', 'Tell me about the research paper', 'What is Innerverse?'],
  },
  {
    id: 'faq-four-foundations',
    question: 'What is the Four Foundations and Seven Scores article?',
    intent: 'INSIGHTS_INFO',
    entity: 'INSIGHTS',
    answer:
      'In "You Are More Than Your Goals", Innerverse explores how Mindset, Heartset, Healthset, and Soulset connect with seven reflective dimensions to help us understand where we are starting from before deciding where to go next.',
    keywords: ['four foundations', 'mindset', 'heartset', 'healthset', 'soulset', 'you are more than your goals'],
    patterns: [
      /four foundations/i,
      /you are more than your goals/i,
      /mindset heartset healthset soulset/i,
    ],
    actions: ['OPEN_ARTICLE_FOUNDATIONS', 'GO_INSIGHTS'],
    followUps: ['What is the Seven Scores research paper?', 'What is Manifestation article?', 'Explore Innerverse'],
  },
  {
    id: 'faq-manifestation',
    question: 'What is the Manifestation and Becoming article?',
    intent: 'INSIGHTS_INFO',
    entity: 'INSIGHTS',
    answer:
      '"Manifestation Is Not About Wishing. It Is About Who You Are Becoming" explores how intention, beliefs, emotions, goal alignment, and consistent action contribute to pursuing meaningful outcomes without claiming mystical guarantees.',
    keywords: ['manifestation', 'manifestation is not about wishing', 'who you are becoming', 'intention'],
    patterns: [
      /manifestation( is not about wishing)?/i,
      /who you are becoming/i,
    ],
    actions: ['OPEN_ARTICLE_MANIFESTATION', 'GO_INSIGHTS'],
    followUps: ['What is the Four Foundations article?', 'What is the research paper?', 'Explore Innerverse'],
  },
  {
    id: 'faq-seven-scores-research',
    question: 'What is the Innerverse Seven Score Research Paper?',
    intent: 'INSIGHTS_INFO',
    entity: 'INSIGHTS',
    answer:
      '"Innerverse Seven Score Framework for Life Navigation" by Anish Timble is a theoretical synthesis and proposed validation programme. It organizes self-awareness, purpose clarity, goal alignment, emotional health, execution readiness, and fulfillment orientation into a testable model.',
    keywords: ['research paper', 'seven score framework', 'validation programme', 'theoretical synthesis', 'theory'],
    patterns: [
      /research paper/i,
      /seven score framework/i,
      /validation programme/i,
      /theoretical synthesis/i,
    ],
    actions: ['OPEN_ARTICLE_RESEARCH', 'GO_INSIGHTS'],
    followUps: ['Read the Research Paper', 'What is the Four Foundations article?', 'Who founded EpicForce.ai?'],
  },
  {
    id: 'faq-ai-aaji',
    question: 'What is AI Aaji?',
    intent: 'AI_AAJI_INFO',
    entity: 'AI_AAJI',
    answer:
      'AI Aaji is EpicForce.ai’s intelligent conversational digital assistant and real-time voice companion. Now LIVE with an interactive live voice session directly on our website (featuring natural conversation powered by Gemini Live with Aoede voice) and an official destination at aiaajiassistant.vercel.app, AI Aaji combines natural voice dialogue, computer control, workflow automation, and multilingual capability to eliminate cognitive friction.',
    keywords: ['ai aaji', 'what is ai aaji', 'digital companion', 'second product', 'assistant', 'aaji', 'live demo', 'voice companion'],
    patterns: [
      /what is (ai )?aaji/i,
      /tell me about (ai )?aaji/i,
      /what does (ai )?aaji do/i,
    ],
    actions: ['GO_AI_AAJI_DEMO', 'OPEN_AI_AAJI_WEBSITE', 'GO_AI_AAJI'],
    followUps: ['Can I talk to AI Aaji live?', 'What is Innerverse?', 'Who founded EpicForce.ai?'],
  },
  {
    id: 'faq-try-ai-aaji',
    question: 'Where can I try AI Aaji?',
    intent: 'EXTERNAL_LINK',
    entity: 'AI_AAJI',
    answer:
      'You can try the real-time AI Aaji Live Voice Session directly on this page (with Aoede voice powered by Gemini Live), or launch the official AI Aaji website at aiaajiassistant.vercel.app.',
    keywords: ['try ai aaji', 'try aaji', 'talk to ai aaji', 'ai aaji live', 'ai aaji demo', 'live voice demo', 'aiaajiassistant.vercel.app'],
    patterns: [
      /(can i|where can i|how do i) (use|try|talk to|test) (ai )?aaji/i,
      /launch (ai )?aaji/i,
      /open (ai )?aaji/i,
      /live demo/i,
    ],
    actions: ['GO_AI_AAJI_DEMO', 'OPEN_AI_AAJI_WEBSITE'],
    followUps: ['What is Innerverse?', 'Who founded EpicForce.ai?', 'What are the 4 Pillars?'],
  },
  {
    id: 'faq-founders',
    question: 'Who founded EpicForce.ai?',
    intent: 'TEAM_INFO',
    entity: 'ANISH_TIMBLE',
    answer:
      'EpicForce.ai was founded by Vision Architect Anish Timble, alongside Chief Growth Architect Abhinav Singh. Anish architects ecosystem philosophy and product direction, while Abhinav designs scalable growth systems and distribution loops.',
    keywords: ['who founded', 'founders', 'leadership', 'team', 'who started', 'who created'],
    patterns: [
      /who (founded|started|created|leads) epicforce/i,
      /who (is|are) the (founder|founders|team|leadership)/i,
    ],
    actions: ['GO_TEAM', 'CONNECT_ANISH'],
    followUps: ['Who is Anish Timble?', 'Who is Abhinav Singh?', 'What is Innerverse?'],
  },
  {
    id: 'faq-anish',
    question: 'Who is Anish Timble?',
    intent: 'TEAM_INFO',
    entity: 'ANISH_TIMBLE',
    answer:
      'Anish Timble is the Vision Architect and founder of EpicForce.ai. Born in the U.S., raised in India, and back in the U.S. after 26 years, he realized one root issue facing humanity is a global crisis of meaning and identity. He founded EpicForce.ai to build technology that elevates human potential.',
    keywords: ['anish', 'anish timble', 'vision architect'],
    patterns: [/who is anish( timble)?/i, /tell me about anish/i],
    actions: ['GO_TEAM', 'CONNECT_ANISH'],
    followUps: ['Who is Abhinav Singh?', 'What is Innerverse?', 'Why Invest?'],
  },
  {
    id: 'faq-abhinav',
    question: 'Who is Abhinav Singh?',
    intent: 'TEAM_INFO',
    entity: 'ABHINAV_SINGH',
    answer:
      'Abhinav Singh is the Chief Growth Architect at EpicForce.ai. He designs growth systems, structural scaling frameworks, and distribution ecosystems that turn attention into authority and authority into revenue.',
    keywords: ['abhinav', 'abhinav singh', 'chief growth architect', 'handles growth'],
    patterns: [/who is abhinav( singh)?/i, /who handles growth/i],
    actions: ['GO_TEAM', 'CONNECT_ABHINAV'],
    followUps: ['Who is Anish Timble?', 'What is the roadmap?', 'Contact EpicForce'],
  },
  {
    id: 'faq-roadmap',
    question: 'What is the EpicForce.ai roadmap?',
    intent: 'ROADMAP_INFO',
    entity: 'ROADMAP',
    answer:
      'EpicForce.ai’s roadmap progresses across four strategic phases:\n• Phase 01 (Q3–Q4 2026): Foundation & MVP (Innerverse live at innervers.ai.studio)\n• Phase 02 (Q1–Q2 2027): Product-Market Fit & AI Aaji Prototype\n• Phase 03 (Q3–Q4 2027): Growth & Expansion with AI Aaji Beta\n• Phase 04 (2028): Ecosystem Development & Platform',
    keywords: ['roadmap', 'timeline', 'future plans', 'phases', 'milestones'],
    patterns: [
      /what is (your|the) roadmap/i,
      /show me the roadmap/i,
      /what is the timeline/i,
    ],
    actions: ['GO_ROADMAP'],
    followUps: ['When does Phase 2 start?', 'What is Innerverse?', 'How to Invest?'],
  },
  {
    id: 'faq-melukat',
    question: 'What is Melukat?',
    intent: 'PARTNER_INFO',
    entity: 'MELUKAT',
    answer:
      'Melukat Meditation Center is an aligned Promoting Partner featured on EpicForce.ai, NOT an EpicForce.ai product or subsidiary. It is a sanctuary centered on meditation, self-inquiry, peace, and conscious living. You can explore their experience directly at melukat.app.',
    keywords: ['melukat', 'is melukat an epicforce product', 'melukat meditation center', 'partner'],
    patterns: [
      /what is melukat/i,
      /is melukat an epicforce product/i,
      /tell me about melukat/i,
    ],
    actions: ['GO_MELUKAT', 'OPEN_MELUKAT'],
    followUps: ['What are EpicForce products?', 'What is Innerverse?', 'Contact EpicForce'],
  },
  {
    id: 'faq-contact',
    question: 'How do I contact EpicForce.ai?',
    intent: 'CONTACT_INFO',
    entity: 'CONTACT',
    answer:
      'You can reach the EpicForce.ai team directly at nsh.aimac@gmail.com or connect through Instagram @epicforce.ai. You can also submit an inquiry through our verified contact form on the website.',
    keywords: ['contact', 'email', 'instagram', 'reach out', 'inquiry', 'how to reach'],
    patterns: [
      /how (can|do) i contact( you| epicforce)?/i,
      /what is (your|the) email/i,
      /what is (your|the) instagram/i,
      /how to reach out/i,
    ],
    actions: ['GO_CONTACT', 'OPEN_EMAIL', 'OPEN_INSTAGRAM'],
    followUps: ['Who founded EpicForce.ai?', 'What is Innerverse?', 'Why Invest?'],
  },
  {
    id: 'faq-investment',
    question: 'Why should I invest in EpicForce.ai?',
    intent: 'INVESTMENT_INFO',
    entity: 'INVESTMENT',
    answer:
      'The website outlines EpicForce.ai’s investment thesis around building human-amplifying technology, a live flagship product (Innerverse), network compounding across modular products, and transatlantic execution. For confidential terms and partner discussions, you can reach out directly to our founders.',
    keywords: ['invest', 'investment', 'why invest', 'capital', 'partner with us'],
    patterns: [
      /why (should i )?invest/i,
      /investment thesis/i,
      /how (can|do) i (invest|partner)/i,
    ],
    actions: ['GO_INVESTMENT', 'GO_CONTACT'],
    followUps: ['What is the roadmap?', 'What is Innerverse?', 'Contact EpicForce'],
  },
];

/**
 * Searches the FAQ database using pattern matching and keyword overlap
 */
export function matchFAQ(
  query: string,
  resolvedIntent?: UserIntent,
  resolvedEntity?: NamedEntity
): { item: FAQItem; actions: ActionDefinition[] } | null {
  const q = query.toLowerCase().trim();

  // 1. Exact Pattern Match
  for (const item of FAQ_DATABASE) {
    for (const pattern of item.patterns) {
      if (pattern.test(q)) {
        const actionDefs = item.actions.map((act) => ACTION_REGISTRY[act]).filter(Boolean);
        return { item, actions: actionDefs };
      }
    }
  }

  // 2. Keyword & Entity/Intent Matching
  let bestMatch: FAQItem | null = null;
  let highestScore = 0;

  for (const item of FAQ_DATABASE) {
    let score = 0;

    if (resolvedEntity && item.entity === resolvedEntity) {
      score += 5;
    }
    if (resolvedIntent && item.intent === resolvedIntent) {
      score += 4;
    }

    for (const kw of item.keywords) {
      if (q.includes(kw)) {
        score += 8;
      }
    }

    if (score > highestScore && score >= 8) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch) {
    const actionDefs = bestMatch.actions.map((act) => ACTION_REGISTRY[act]).filter(Boolean);
    return { item: bestMatch, actions: actionDefs };
  }

  return null;
}
