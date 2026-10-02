export interface Pathway {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  reflectionQuestion: string;
  accentColor: string;
}

export const innerversePathways: Pathway[] = [
  {
    id: 'purpose',
    name: 'Purpose',
    subtitle: 'Understand what drives you',
    tagline: 'Connect daily effort with deep-seated meaning.',
    description: 'Deconstruct what truly motivates you beyond external expectations. Purpose is not an elusive lightning strike; it is the deliberate crystallization of your core convictions.',
    reflectionQuestion: 'If all external validation ceased tomorrow, what work would you still feel compelled to do?',
    accentColor: '#3B82F6'
  },
  {
    id: 'clarity',
    name: 'Clarity',
    subtitle: 'Reduce noise and identify direction',
    tagline: 'Filter out the irrelevant to see your immediate next step.',
    description: 'In an attention-fragmented world, clarity is an active discipline. Clear the cognitive fog, identify your true constraints, and map high-leverage trajectories.',
    reflectionQuestion: 'What is the single most important decision you are currently postponing?',
    accentColor: '#22D3EE'
  },
  {
    id: 'discipline',
    name: 'Discipline',
    subtitle: 'Turn intention into consistent action',
    tagline: 'Systematize momentum until progress becomes automatic.',
    description: 'Bridge the chasm between noble ambition and daily execution. Transform fickle motivation into resilient ritual architecture and steady personal accountability.',
    reflectionQuestion: 'What small, daily friction points repeatedly derail your best intentions?',
    accentColor: '#8B5CF6'
  },
  {
    id: 'alignment',
    name: 'Alignment',
    subtitle: 'Bring actions closer to values',
    tagline: 'Synchronize your calendar, energy, and inner compass.',
    description: 'Audit the congruence between what you claim to cherish and where your real hours and energy flow. Resolve inner contradictions through structural realignment.',
    reflectionQuestion: 'Where does your schedule least reflect your deeply held personal values?',
    accentColor: '#10B981'
  },
  {
    id: 'healing',
    name: 'Healing',
    subtitle: 'Create space for reflection and recovery',
    tagline: 'Acknowledge fatigue, restore reserves, and renew clarity.',
    description: 'Sustainable ambition demands restorative rhythm. Cultivate intentional pauses, process emotional wear-and-tear, and restore cognitive vibrancy from within.',
    reflectionQuestion: 'What unresolved mental baggage is draining energy from your current endeavors?',
    accentColor: '#EC4899'
  }
];

export const aiAajiFeatures = [
  {
    title: 'Voice Interaction',
    description: 'Natural, contextual voice interface designed for frictionless, hands-free dialogue.'
  },
  {
    title: 'Computer Control & Automation',
    description: 'Direct system interactions that safely execute routine desktop actions.'
  },
  {
    title: 'Workflow Automation',
    description: 'Connect fragmented personal apps and tools into seamless automated routines.'
  },
  {
    title: 'Email Assistance & Drafting',
    description: 'Context-aware message triage, synthesized drafting, and communication management.'
  },
  {
    title: 'Intelligent Form Filling',
    description: 'Automated retrieval and accurate input of repetitive verified documents.'
  },
  {
    title: 'Multilingual Interaction',
    description: 'Fluid translation and natural conversational support across global languages.'
  },
  {
    title: 'Adaptive Creative Synthesis',
    description: 'Rapid image generation, layout prototyping, and idea visualization.'
  },
  {
    title: 'Offline Resilience',
    description: 'Core privacy-first on-device logic capable of operating without cloud dependency.'
  }
];
