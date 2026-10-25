import { Partner } from '../types';
import { MELUKAT_URL } from '../config/links';

/**
 * Promoting and Featured Partners Configuration
 * Separated cleanly from EpicForce.ai primary products.
 */
export const partners: Partner[] = [
  {
    id: 'melukat',
    name: 'Melukat Meditation Center',
    category: 'Promoting Partner',
    url: MELUKAT_URL,
    cta: 'Explore Melukat',
    headline: 'Melukat Meditation Center',
    subheadline: 'Meditation Center',
    description:
      'A sanctuary centered around meditation, self-inquiry, peace, and conscious living. Discover contemplative guidance, inner stillness, and spiritual clarity.',
    tagline: 'A space for meditation, inner exploration, and conscious living.',
    founderOrTeacher: 'Alain Yaovi Dagba',
    image: '/assets/partners/melukat.jpg',
    imageAlt: 'Melukat Meditation Center — Promoting Partner',
    focusAreas: [
      'Mindful Meditation',
      'Self-Inquiry & Awareness',
      'Conscious Living',
      'Inner Stillness',
    ],
  },
];
