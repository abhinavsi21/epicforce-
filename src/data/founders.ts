import { Founder } from '../types';
import { ANISH_LINKEDIN_URL, ABHINAV_INSTAGRAM_URL } from '../config/links';

export const founders: Founder[] = [
  {
    id: 'anish-timble',
    name: 'Anish Timble',
    role: 'Vision Architect',
    quote:
      'EpicForce.ai is my answer — a studio and movement dedicated to building solutions that don’t just make life efficient, but meaningful.',
    bio: [
      'Born in the U.S., raised in India, and back in the U.S. after 26 years.',
      'Growing up with my maternal family, I became a respectful rebel and lifelong problem solver.',
      'Through research into the biggest challenges facing humanity, I realized one root issue stands out: a global crisis of meaning and identity.',
      'Dedicated to building purposeful technology that elevates human potential and brings clarity to an increasingly noisy world.',
    ],
    focus: 'Ecosystem Architecture · Product Philosophy · Human Potential',
    imageAlt: 'Anish Timble, Vision Architect at EpicForce.ai',
    connectUrl: ANISH_LINKEDIN_URL,
    connectPlatform: 'linkedin',
  },
  {
    id: 'abhinav-singh',
    name: 'Abhinav Singh',
    role: 'Chief Growth Architect',
    quote: 'For me, growth is not promotion. It’s precision engineering.',
    bio: [
      'I design growth systems — not campaigns.',
      'Where strategy meets structure, scale becomes predictable.',
      'Blending data, positioning, and execution, I architect ecosystems that turn attention into authority, and authority into revenue.',
      'Specialized in product-led loops, structural scaling frameworks, and sustainable audience-to-community conversion.',
    ],
    focus: 'Growth Systems · Scale Architecture · Distribution Ecosystems',
    imageAlt: 'Abhinav Singh, Chief Growth Architect at EpicForce.ai',
    connectUrl: ABHINAV_INSTAGRAM_URL,
    connectPlatform: 'instagram',
  },
];
