export interface ThesisPoint {
  id: string;
  tag: string;
  title: string;
  headline: string;
  description: string;
  bulletPoints: string[];
}

export const whyEpicforceData: ThesisPoint[] = [
  {
    id: 'purpose-driven',
    tag: '01 / PURPOSE-DRIVEN',
    title: 'Purpose-Driven',
    headline: 'Technology designed around meaningful human outcomes.',
    description: 'We reject building technology purely to capture attention or maximize idle screen time. Every product we architect is measured by whether it clarifies, grounds, or elevates human agency.',
    bulletPoints: [
      'Focus on clarity and identity over addictive engagement mechanics',
      'Privacy-first architecture respecting user boundaries',
      'Built to cultivate real-world action, not continuous passive scrolling'
    ]
  },
  {
    id: 'product-led',
    tag: '02 / PRODUCT-LED',
    title: 'Product-Led',
    headline: 'Build focused products that solve specific, lived problems.',
    description: 'Instead of abstract promises, we deliver tangible software with acute utility. Starting with Innerverse for life navigation, each product stands on its own rigorous merit and immediate value.',
    bulletPoints: [
      'Rapid prototype validation paired with refined editorial craftsmanship',
      'Direct feedback loops with initial pilot communities',
      'Uncompromising commitment to intuitive, elegant interaction design'
    ]
  },
  {
    id: 'ai-native',
    tag: '03 / AI-NATIVE',
    title: 'AI-Native',
    headline: 'Use AI as a foundational capability, not a cosmetic wrapper.',
    description: 'We do not build thin chat wrappers over third-party models. We weave intelligent synthesis, personalized context engines, and natural interfaces directly into the fundamental product architecture.',
    bulletPoints: [
      'Adaptive intelligence that understands personal nuance and intent',
      'Hybrid on-device and cloud models balancing privacy and power',
      'Action-oriented automation that executes complex tasks transparently'
    ]
  },
  {
    id: 'ecosystem-thinking',
    tag: '04 / ECOSYSTEM THINKING',
    title: 'Ecosystem Thinking',
    headline: 'Build individual products that compound into a unified whole.',
    description: 'Each application we launch is a node in a larger personal operating system. Insights gained in Innerverse inform the proactive assistance of AI Aaji, creating synergistic personal leverage.',
    bulletPoints: [
      'Shared data dignity and unified user sovereign context',
      'Cross-product synergies multiplying individual leverage',
      'Extensible platform architecture built for generational durability'
    ]
  }
];
