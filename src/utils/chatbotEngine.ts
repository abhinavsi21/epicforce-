import {
  epicforceKnowledge,
  ChatAction,
  sectionSuggestedQuestions,
} from '../data/chatbotKnowledge';
import {
  INNERVERSE_URL,
  MELUKAT_URL,
  INSTAGRAM_URL,
  CONTACT_EMAIL,
} from '../config/links';

export interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  actions?: ChatAction[];
  suggestedFollowUps?: string[];
  timestamp: number;
}

export interface ChatSessionContext {
  lastTopic?: 'innerverse' | 'ai-aaji' | 'founders' | 'investment' | 'roadmap' | 'melukat' | 'contact' | 'mission' | 'insights';
  currentSection?: string;
  history: { role: 'user' | 'model'; parts: { text: string }[] }[];
}

/**
 * Layer 1: High-precision verified deterministic knowledge matcher.
 * Provides instant, zero-latency, hallucination-free answers with deep-link actions.
 */
export function getPreplannedAnswer(
  query: string,
  context: ChatSessionContext
): { text: string; actions?: ChatAction[]; followUps?: string[]; topic?: ChatSessionContext['lastTopic'] } | null {
  const q = query.trim().toLowerCase();

  // 1. Contextual Follow-up Resolutions
  if (context.lastTopic === 'innerverse') {
    if (
      q.includes('can i use') ||
      q.includes('can i try') ||
      q.includes('where is it') ||
      q.includes('how do i access') ||
      q.includes('link') ||
      q.includes('url') ||
      q.includes('website')
    ) {
      return {
        text: 'Yes! The live Innerverse experience is accessible at innervers.ai.studio. You can also explore our interactive orientation diagnostic directly on this page.',
        actions: [
          { label: 'Explore Diagnostic', type: 'scroll', target: 'innerverse' },
          { label: 'Launch Live Innerverse ↗', type: 'external', target: INNERVERSE_URL, isExternal: true },
        ],
        followUps: ['How does Innerverse work?', 'What is AI Aaji?', 'View Roadmap'],
        topic: 'innerverse',
      };
    }
  }

  if (context.lastTopic === 'ai-aaji') {
    if (
      q.includes('when') ||
      q.includes('launch') ||
      q.includes('release') ||
      q.includes('available') ||
      q.includes('use it')
    ) {
      return {
        text: 'AI Aaji is currently in active architecture and development as part of our strategic roadmap. It will begin alpha testing in Phase 2 (Q1–Q2 2027) with a public beta in Phase 3.',
        actions: [
          { label: 'View Capabilities', type: 'scroll', target: 'ai-aaji' },
          { label: 'View Roadmap', type: 'scroll', target: 'roadmap' },
        ],
        followUps: ['What can AI Aaji do?', 'What is Innerverse?', 'Join Waitlist'],
        topic: 'ai-aaji',
      };
    }
  }

  // 2. Direct Navigation Intents
  if (q.startsWith('take me to') || q.startsWith('go to') || q.startsWith('show me') || q.startsWith('where is')) {
    if (q.includes('innerverse')) {
      return {
        text: 'Innerverse is featured in the Products section of EpicForce.ai. It is our flagship Life Navigation System.',
        actions: [
          { label: 'Explore Innerverse', type: 'scroll', target: 'innerverse' },
          { label: 'Launch Live Innerverse ↗', type: 'external', target: INNERVERSE_URL, isExternal: true },
        ],
        topic: 'innerverse',
      };
    }
    if (q.includes('aaji') || q.includes('assistant') || q.includes('companion')) {
      return {
        text: 'AI Aaji is featured right after Innerverse in our Product Ecosystem section.',
        actions: [{ label: 'View AI Aaji', type: 'scroll', target: 'ai-aaji' }],
        topic: 'ai-aaji',
      };
    }
    if (q.includes('insight') || q.includes('article') || q.includes('thought leadership') || q.includes('paper')) {
      return {
        text: 'The Thought Leadership & Insights section features three key publications exploring ideas for a more intentional life.',
        actions: [{ label: 'View Insights', type: 'scroll', target: 'insights' }],
        topic: 'insights',
      };
    }
    if (q.includes('team') || q.includes('founder') || q.includes('leadership')) {
      return {
        text: 'Our leadership section introduces Vision Architect Anish Timble and Chief Growth Architect Abhinav Singh.',
        actions: [{ label: 'Meet the Team', type: 'scroll', target: 'founders' }],
        topic: 'founders',
      };
    }
    if (q.includes('roadmap') || q.includes('timeline') || q.includes('phase')) {
      return {
        text: 'The Strategic Roadmap outlines our four-phase trajectory from 2026 through 2028.',
        actions: [{ label: 'View Roadmap', type: 'scroll', target: 'roadmap' }],
        topic: 'roadmap',
      };
    }
    if (q.includes('partner') || q.includes('melukat')) {
      return {
        text: 'Our Promoting Partner spotlight highlights Melukat Meditation Center.',
        actions: [
          { label: 'View Partner Section', type: 'scroll', target: 'partners' },
          { label: 'Explore Melukat ↗', type: 'external', target: MELUKAT_URL, isExternal: true },
        ],
        topic: 'melukat',
      };
    }
    if (q.includes('contact') || q.includes('email') || q.includes('reach')) {
      return {
        text: 'You can reach us directly via our transmission form or official email.',
        actions: [
          { label: 'Go to Contact', type: 'scroll', target: 'contact' },
          { label: 'Email EpicForce.ai', type: 'external', target: `mailto:${CONTACT_EMAIL}`, isExternal: true },
        ],
        topic: 'contact',
      };
    }
  }

  // 3. What is EpicForce.ai? / Company definition
  if (
    q.includes('what is epicforce') ||
    q.includes('tell me about epicforce') ||
    q.includes('what do you guys do') ||
    q.includes('what does epicforce do') ||
    q.includes("what's this company about") ||
    q.includes('what are you building') ||
    q === 'about'
  ) {
    return {
      text: 'EpicForce.ai is a purpose-driven innovation platform building technology that amplifies humanity. We turn human purpose and intelligence into systems of lasting clarity and scale, currently highlighted by our flagship product Innerverse and our forthcoming AI Aaji companion.',
      actions: [
        { label: 'Explore Products', type: 'scroll', target: 'products' },
        { label: 'Read Mission', type: 'scroll', target: 'mission' },
      ],
      followUps: ['What is Innerverse?', 'What is AI Aaji?', 'Who founded EpicForce.ai?'],
      topic: 'mission',
    };
  }

  // 4. Mission & Core Pillars
  if (q.includes('mission') || q.includes('vision') || q.includes('purpose') && !q.includes('pathway')) {
    return {
      text: 'Our mission is to "Use technology to make us more human." In a world overwhelmed by attention fragmentation and superficial metrics, we build tools that restore human agency, clarity, and intentional momentum.',
      actions: [
        { label: 'Explore Mission', type: 'scroll', target: 'mission' },
        { label: 'Four Key Pillars', type: 'scroll', target: 'pillars' },
      ],
      followUps: ['Explain the 4 Core Pillars', 'What is Innerverse?', 'Why Invest?'],
      topic: 'mission',
    };
  }

  if (q.includes('pillar') || q.includes('core pillars') || q.includes('four pillars')) {
    return {
      text: 'EpicForce.ai is built upon 4 foundational pillars:\n• Clarity: Dissolving cognitive fog to reveal high-leverage direction.\n• Creativity: Transforming raw sparks into scalable structural reality.\n• Impact: Compounding positive results without vanity metrics.\n• Community: Fostering collaborative, sovereign human ecosystems.',
      actions: [{ label: 'View Pillars Section', type: 'scroll', target: 'pillars' }],
      followUps: ['What is EpicForce.ai?', 'What is Innerverse?', 'Meet the Team'],
      topic: 'mission',
    };
  }

  // 5. Innerverse
  if (
    q.includes('innerverse') ||
    q.includes('life navigation') ||
    q.includes('first product') ||
    q.includes('diagnostic')
  ) {
    return {
      text: 'Innerverse is EpicForce.ai’s first product — a personal Life Navigation System. Unlike generic meditation or habit apps, Innerverse centers on a fundamental question: "The question is not only how do I feel? The question is whether I am moving toward the right life." It maps personal growth across 5 pathways: Purpose, Clarity, Discipline, Alignment, and Healing.',
      actions: [
        { label: 'Explore Innerverse', type: 'scroll', target: 'innerverse' },
        { label: 'Launch Live Innerverse ↗', type: 'external', target: INNERVERSE_URL, isExternal: true },
      ],
      followUps: ['How does Innerverse work?', 'What are the 5 pathways?', 'What is AI Aaji?'],
      topic: 'innerverse',
    };
  }

  // 6. AI Aaji
  if (q.includes('aaji') || q.includes('ai aaji') || q.includes('companion') || q.includes('assistant')) {
    return {
      text: 'AI Aaji is an intelligent digital assistant concept being developed by EpicForce.ai. Designed to go beyond simple conversational scripts, it combines contextual voice dialogue, computer control, workflow automation, and multilingual capability to reclaim personal hours for humans.',
      actions: [
        { label: 'Explore AI Aaji', type: 'scroll', target: 'ai-aaji' },
        { label: 'View Roadmap', type: 'scroll', target: 'roadmap' },
      ],
      followUps: ['When is AI Aaji launching?', 'What is Innerverse?', 'Who founded EpicForce.ai?'],
      topic: 'ai-aaji',
    };
  }

  // 7. Founders & Leadership
  if (
    q.includes('founder') ||
    q.includes('who started') ||
    q.includes('leadership') ||
    q.includes('team') ||
    q.includes('anish') ||
    q.includes('abhinav') ||
    q.includes('growth')
  ) {
    if (q.includes('anish') || q.includes('vision architect')) {
      return {
        text: 'Anish Timble is the Vision Architect and founder of EpicForce.ai. Born in the U.S., raised in India, and back in the U.S. after 26 years, he is a lifelong problem solver dedicated to tackling humanity’s crisis of meaning and identity through purposeful technology.',
        actions: [
          { label: 'Meet Anish on Page', type: 'scroll', target: 'founders' },
          { label: 'Connect on LinkedIn ↗', type: 'external', target: epicforceKnowledge.founders.anishTimble.connectUrl, isExternal: true },
        ],
        followUps: ['Who is Abhinav Singh?', 'What is EpicForce.ai?', 'Explore Innerverse'],
        topic: 'founders',
      };
    }

    if (q.includes('abhinav') || q.includes('growth architect') || q.includes('handles growth')) {
      return {
        text: 'Abhinav Singh is the Chief Growth Architect at EpicForce.ai. He designs growth systems, product-led distribution loops, and structural frameworks that turn attention into authority and scalable community conversion.',
        actions: [
          { label: 'Meet Abhinav on Page', type: 'scroll', target: 'founders' },
          { label: 'Connect on Instagram ↗', type: 'external', target: epicforceKnowledge.founders.abhinavSingh.connectUrl, isExternal: true },
        ],
        followUps: ['Who is Anish Timble?', 'What is the roadmap?', 'Partner With Us'],
        topic: 'founders',
      };
    }

    return {
      text: 'EpicForce.ai is led by Vision Architect Anish Timble and Chief Growth Architect Abhinav Singh, pairing philosophical ecosystem design with precision growth engineering.',
      actions: [{ label: 'Meet the Founders', type: 'scroll', target: 'founders' }],
      followUps: ['Who is Anish Timble?', 'Who is Abhinav Singh?', 'What is the roadmap?'],
      topic: 'founders',
    };
  }

  // 8. Investment & Partner Opportunities
  if (
    q.includes('invest') ||
    q.includes('investor') ||
    q.includes('partner') && !q.includes('melukat') ||
    q.includes('why invest') ||
    q.includes('capital')
  ) {
    return {
      text: 'The website presents EpicForce.ai’s investment thesis around building human-amplifying technology, a live flagship product (Innerverse), network effects across modular systems, and transatlantic execution. For specific confidential terms, you can transmit an inquiry to our founders.',
      actions: [
        { label: 'Why EpicForce?', type: 'scroll', target: 'why-epicforce' },
        { label: 'Partner With Us', type: 'scroll', target: 'contact' },
      ],
      followUps: ['What is the roadmap?', 'What is Innerverse?', 'How do I contact you?'],
      topic: 'investment',
    };
  }

  // 9. Strategic Roadmap
  if (q.includes('roadmap') || q.includes('timeline') || q.includes('milestones') || q.includes('future')) {
    return {
      text: 'EpicForce.ai’s roadmap progresses across four strategic phases:\n• Phase 1 (Q3–Q4 2026): Foundation & MVP (Innerverse live at innervers.ai.studio)\n• Phase 2 (Q1–Q2 2027): Product-Market Fit & AI Aaji Prototype\n• Phase 3 (Q3–Q4 2027): Growth & Expansion with AI Aaji Beta\n• Phase 4 (2028): Full Ecosystem & Developer Platform',
      actions: [{ label: 'View Roadmap', type: 'scroll', target: 'roadmap' }],
      followUps: ['When is AI Aaji launching?', 'What is Innerverse?', 'Why Invest?'],
      topic: 'roadmap',
    };
  }

  // 10. Promoting Partner: Melukat Meditation Center
  if (q.includes('melukat') || q.includes('meditation center') || q.includes('promoting partner')) {
    return {
      text: 'Melukat Meditation Center is featured on EpicForce.ai as an aligned Promoting Partner, not an EpicForce product. It is a sanctuary centered on meditation, self-inquiry, peace, and conscious living. You can explore their experience directly at melukat.app.',
      actions: [
        { label: 'View Partner Section', type: 'scroll', target: 'partners' },
        { label: 'Explore Melukat ↗', type: 'external', target: MELUKAT_URL, isExternal: true },
      ],
      followUps: ['What are EpicForce products?', 'What is Innerverse?', 'How to partner?'],
      topic: 'melukat',
    };
  }

  // 11. Thought Leadership & Insights
  if (
    q.includes('insight') ||
    q.includes('thought leadership') ||
    q.includes('article') ||
    q.includes('research paper') ||
    q.includes('four foundations') ||
    q.includes('seven score') ||
    q.includes('manifestation')
  ) {
    return {
      text: 'Our Thought Leadership & Insights section features three curated publications:\n• "You Are More Than Your Goals" — The Four Foundations (Mindset, Heartset, Healthset, Soulset) and Seven Scores framework.\n• "Manifestation Is Not About Wishing" — Aligning intention, state, and consistent action.\n• "Innerverse Seven Score Framework for Life Navigation" — Theoretical synthesis and proposed validation programme by Anish Timble.',
      actions: [
        { label: 'View Insights', type: 'scroll', target: 'insights' },
      ],
      followUps: ['What is the Four Foundations article?', 'Tell me about the research paper', 'What is Innerverse?'],
      topic: 'insights',
    };
  }

  // 12. Contact & Socials
  if (
    q.includes('contact') ||
    q.includes('email') ||
    q.includes('reach out') ||
    q.includes('instagram') ||
    q.includes('twitter') ||
    q.includes('address') ||
    q.includes('location')
  ) {
    return {
      text: 'You can reach the EpicForce.ai team directly at nsh.aimac@gmail.com, connect via Instagram @epicforce.ai, or send a transmission through our verified contact form.',
      actions: [
        { label: 'Transmit Inquiry', type: 'scroll', target: 'contact' },
        { label: 'Email EpicForce.ai', type: 'external', target: `mailto:${CONTACT_EMAIL}`, isExternal: true },
        { label: 'Open Instagram ↗', type: 'external', target: INSTAGRAM_URL, isExternal: true },
      ],
      followUps: ['Who are the founders?', 'What is Innerverse?', 'Why Invest?'],
      topic: 'contact',
    };
  }

  // 12. Friendly Salutations
  if (q === 'hi' || q === 'hello' || q === 'hey' || q.startsWith('hi ') || q.startsWith('hello ')) {
    return {
      text: 'Hello! I am the EpicForce AI Guide. I can help you explore our mission, products like Innerverse and AI Aaji, leadership, investment thesis, roadmap, or guide you around the site. What would you like to discover?',
      actions: [
        { label: 'Explore Innerverse', type: 'scroll', target: 'innerverse' },
        { label: 'View Roadmap', type: 'scroll', target: 'roadmap' },
        { label: 'Meet the Team', type: 'scroll', target: 'founders' },
      ],
      followUps: ['What is EpicForce.ai?', 'What is Innerverse?', 'What is AI Aaji?'],
    };
  }

  return null;
}

/**
 * Fallback response when query is outside domain scope
 */
export function getOutOfScopeAnswer(): {
  text: string;
  actions: ChatAction[];
  followUps: string[];
} {
  return {
    text: "I'm the official EpicForce AI Guide. I specialize in explaining EpicForce.ai, our flagship Life Navigation System Innerverse, AI Aaji, our leadership, roadmap, partnerships, and guiding you across the platform.",
    actions: [
      { label: 'What is EpicForce.ai?', type: 'scroll', target: 'products' },
      { label: 'Explore Innerverse', type: 'scroll', target: 'innerverse' },
      { label: 'View Roadmap', type: 'scroll', target: 'roadmap' },
    ],
    followUps: [
      'What is Innerverse?',
      'Who founded EpicForce.ai?',
      'How can I partner or invest?',
    ],
  };
}
