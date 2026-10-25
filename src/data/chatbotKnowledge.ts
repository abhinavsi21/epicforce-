import {
  INNERVERSE_URL,
  MELUKAT_URL,
  INSTAGRAM_URL,
  CONTACT_EMAIL,
  ANISH_LINKEDIN_URL,
  ABHINAV_INSTAGRAM_URL,
} from '../config/links';

export interface ChatAction {
  label: string;
  type: 'scroll' | 'external';
  target: string;
  isExternal?: boolean;
}

export interface KnowledgeSection {
  title: string;
  content: string;
}

export const epicforceKnowledge = {
  company: {
    name: 'EpicForce.ai',
    tagline: 'Where ideas become epic.',
    slogan: 'Powered by force, guided by AI.',
    definition:
      'EpicForce.ai is a purpose-driven innovation platform building intelligent technology that amplifies humanity. We turn human purpose, intelligence, and ideas into enduring systems of lasting clarity and scale.',
    locations: 'San Francisco · Mumbai · Global',
    thesis:
      'We believe the defining crisis of our era is not a shortage of compute or efficiency, but a crisis of human clarity, meaning, and focus. We build technology designed to elevate human potential rather than replace it.',
  },

  mission: {
    coreStatement: 'Use technology to make us more human.',
    philosophy:
      'We create purposeful tools that simplify cognitive friction, dissolve noise, and ground high ambition into daily execution and enduring agency.',
  },

  pillars: [
    {
      number: '01',
      name: 'Clarity',
      description:
        'Helping individuals and teams gain acute awareness, dissolve mental noise, and identify high-leverage direction.',
    },
    {
      number: '02',
      name: 'Creativity',
      description:
        'Transforming raw sparks and human intent into scalable reality through purposeful technology and deep collaboration.',
    },
    {
      number: '03',
      name: 'Impact',
      description:
        'Measuring and compounding the positive, enduring effect of human action without superficial vanity metrics.',
    },
    {
      number: '04',
      name: 'Community',
      description:
        'Cultivating trusted, sovereign ecosystems and collaborative networks bound by shared purpose and collective elevation.',
    },
  ],

  founders: {
    anishTimble: {
      name: 'Anish Timble',
      role: 'Vision Architect',
      quote:
        'EpicForce.ai is my answer — a studio and movement dedicated to building solutions that don’t just make life efficient, but meaningful.',
      bio:
        'Born in the U.S., raised in India, and back in the U.S. after 26 years. A respectful rebel and lifelong problem solver dedicated to addressing the global crisis of meaning and identity through purposeful technology.',
      focus: 'Ecosystem Architecture · Product Philosophy · Human Potential',
      connectUrl: ANISH_LINKEDIN_URL,
      platform: 'LinkedIn',
    },
    abhinavSingh: {
      name: 'Abhinav Singh',
      role: 'Chief Growth Architect',
      quote: 'For me, growth is not promotion. It’s precision engineering.',
      bio:
        'Growth systems architect who turns attention into authority and authority into revenue. Specializes in structural scaling frameworks, product-led distribution loops, and sustainable community architecture.',
      focus: 'Growth Systems · Scale Architecture · Distribution Ecosystems',
      connectUrl: ABHINAV_INSTAGRAM_URL,
      platform: 'Instagram',
    },
  },

  products: {
    innerverse: {
      name: 'Innerverse',
      status: 'Live Flagship Product',
      classification: 'Life Navigation System',
      notA: 'Not a generic meditation, therapy, or basic habit-tracking app.',
      coreInsight:
        'The question is not only "how do I feel?" The true question is whether I am moving toward the right life.',
      description:
        'Innerverse is a personal Life Navigation System designed to evaluate cognitive friction and guide personal development across five core dimensions.',
      pathways: [
        { name: 'Purpose', desc: 'Understand what drives you beyond external validation.' },
        { name: 'Clarity', desc: 'Filter out the irrelevant to identify your immediate next step.' },
        { name: 'Discipline', desc: 'Turn intention into consistent ritual execution.' },
        { name: 'Alignment', desc: 'Bring your hours and energy closer to your deeply held values.' },
        { name: 'Healing', desc: 'Create intentional space for restorative rhythm and emotional processing.' },
      ],
      userJourney: [
        '01. Assessment (Baseline diagnostic evaluating cognitive friction)',
        '02. Personal Profile (Calculates your orientation profile)',
        '03. Identify Path (Focuses energy on your single highest-leverage area)',
        '04. AI Guided Journey (Tailored weekly prompts & structured reflection)',
        '05. Action & Reflection (Daily ritual checks to ground theory into reality)',
        '06. Progress Telemetry (Audits pattern shifts without vanity numbers)',
        '07. Long-Term Growth (Compounds personal clarity into enduring agency)',
      ],
      liveUrl: INNERVERSE_URL,
      onSiteShowcaseId: 'innerverse',
    },

    aiAaji: {
      name: 'AI Aaji',
      status: 'LIVE · Intelligent Voice Assistant & Companion',
      classification: 'Intelligent Voice Companion',
      description:
        'An intelligent AI assistant designed for natural interaction and real-time voice conversations. Experience AI Aaji through its live demo with Aoede voice or visit the official product website.',
      liveUrl: 'https://aiaajiassistant.vercel.app/',
      liveDemoSectionId: 'ai-aaji-demo',
      keyCapabilities: [
        'Real-time low-latency voice dialogue (Gemini Live · Aoede voice)',
        'Contextual conversational reasoning and empathy',
        'Computer control & desktop automation',
        'Workflow & app integration',
        'Email triage & synthesized drafting',
        'Intelligent form filling',
        'Multilingual conversational support',
        'Privacy-first design (no stored voice audio)',
      ],
      sectionId: 'ai-aaji',
    },
  },

  investment: {
    thesisTitle: 'Why Invest in EpicForce.ai?',
    points: [
      'Technology that makes us more human: Solves the acute global crisis of focus and meaning.',
      'Compelling first flagship product: Innerverse is already live with proven navigation pathways.',
      'Network compounding: Modular products feeding a unified, sovereign personal intelligence layer.',
      'Cross-domain leadership: Combining philosophical vision architecture with precision growth engineering.',
      'Global-first footprint: Founded with transatlantic perspectives across San Francisco, Mumbai, and global hubs.',
      'Capital-efficient velocity: Rapid execution powered by autonomous development models.',
    ],
    disclaimer:
      'The website outlines our investment thesis and strategic milestones. For confidential investment terms and partnership inquiries, connect directly with our founders.',
    sectionId: 'why-epicforce',
  },

  roadmap: [
    {
      phase: 'Phase 01',
      title: 'Foundation & MVP',
      timeline: 'Q3–Q4 2026',
      status: 'current',
      milestones: [
        'Innerverse Web Application Launch (innervers.ai.studio)',
        'Core Diagnostic Engine & 5 Navigation Pathways',
        'EpicForce Brand Foundation & Philosophy',
      ],
    },
    {
      phase: 'Phase 02',
      title: 'Product-Market Fit',
      timeline: 'Q1–Q2 2027',
      status: 'upcoming',
      milestones: [
        'Innerverse Mobile Applications (iOS / Android)',
        'AI Aaji Architecture & Alpha Prototype',
        'Seed Funding Round & Institutional Alliances',
      ],
    },
    {
      phase: 'Phase 03',
      title: 'Growth & Expansion',
      timeline: 'Q3–Q4 2027',
      status: 'future',
      milestones: [
        'AI Aaji Public Beta Launch',
        'Innerverse Community & Enterprise Wellness Pilots',
        'Series A Preparation & Global Distribution Expansion',
      ],
    },
    {
      phase: 'Phase 04',
      title: 'Ecosystem Development',
      timeline: '2028',
      status: 'future',
      milestones: [
        'Full EpicForce Intelligence Layer Integration',
        'Third-Party Developer Platform & SDKs',
        'Global Scaled Presence across Key Markets',
      ],
    },
  ],

  partner: {
    name: 'Melukat Meditation Center',
    relationship: 'Promoting Partner (Featured Partner)',
    isEpicforceProduct: false,
    website: MELUKAT_URL,
    description:
      'Melukat Meditation Center is a sanctuary centered around meditation, self-inquiry, peace, and conscious living. It is featured on EpicForce.ai as an aligned promoting partner exploring inner stillness and contemplation.',
    sectionId: 'partners',
  },

  contact: {
    email: CONTACT_EMAIL,
    instagram: INSTAGRAM_URL,
    locations: 'San Francisco · Mumbai · Global',
    sectionId: 'contact',
  },
};

/**
 * Suggested Questions categorized dynamically by current active section
 */
export const sectionSuggestedQuestions: Record<string, string[]> = {
  hero: [
    'What is EpicForce.ai?',
    'What are you building?',
    'Explore the products',
    'Who founded EpicForce.ai?',
  ],
  mission: [
    'What is EpicForce.ai’s mission?',
    'Explain the 4 Core Pillars',
    'What is your design philosophy?',
  ],
  pillars: [
    'Explain the 4 Core Pillars',
    'How do you define Clarity and Impact?',
    'What makes EpicForce unique?',
  ],
  founders: [
    'Who is Anish Timble?',
    'Who is Abhinav Singh?',
    'How can I connect with the founders?',
  ],
  products: [
    'What products are in the ecosystem?',
    'What is Innerverse?',
    'What is AI Aaji?',
    'How do the products connect?',
  ],
  innerverse: [
    'What is Innerverse?',
    'How does Innerverse work?',
    'What is the Innerverse diagnostic?',
    'Launch Live Innerverse',
  ],
  'ai-aaji': [
    'What is AI Aaji?',
    'What can AI Aaji do?',
    'When is AI Aaji launching?',
  ],
  insights: [
    'What is the Four Foundations framework?',
    'Tell me about the Seven Scores research paper',
    'What is the Manifestation article about?',
    'Read the thought leadership articles',
  ],
  'why-epicforce': [
    'Why invest in EpicForce.ai?',
    'What is your growth strategy?',
    'How can I partner or invest?',
  ],
  roadmap: [
    'What is the strategic roadmap?',
    'When does Phase 2 start?',
    'What is planned for 2028?',
  ],
  partners: [
    'What is Melukat?',
    'Is Melukat an EpicForce product?',
    'Visit Melukat Meditation Center',
  ],
  contact: [
    'How can I contact EpicForce.ai?',
    'What is the official email?',
    'Where is EpicForce based?',
  ],
  default: [
    'What is EpicForce.ai?',
    'What is Innerverse?',
    'What is AI Aaji?',
    'Who are the founders?',
    'What is the roadmap?',
    'How can I contact you?',
  ],
};
