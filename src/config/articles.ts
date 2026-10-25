/**
 * Centralized Article & Thought Leadership Configuration
 * Source of truth for Innerverse thought leadership articles and research documents.
 */

export interface InnerverseArticle {
  id: string;
  title: string;
  subtitle?: string;
  category: 'INNERVERSE FRAMEWORK' | 'THOUGHT LEADERSHIP' | 'RESEARCH & THEORY';
  badge?: string;
  authorCredit?: string;
  description: string;
  takeaway: string;
  metadata: string;
  ctaText: string;
  estimatedReadTime: string;
  url: string;
  featured: boolean;
}

// Configurable Google Docs URLs for the three thought leadership pieces.
// Update these URLs with your specific shared Google Docs links.
export const ARTICLE_DOC_LINKS = {
  fourFoundations: 'https://docs.google.com/document/d/1X7Mr8IxeDhFTviADirj-FjNwrxGPHWF64cMMnHYxbAw/edit?usp=sharing',
  manifestationBecoming: 'https://docs.google.com/document/d/1j7izlRNk8xNR4U-LcPip1xjW55eijUspKZvjg___cSA/edit?usp=sharing',
  sevenScoreResearch: 'https://docs.google.com/document/d/1FFOjzVYzOh_VmPraDMUEQG_y5SFIKaCvB7zQG908oa4/edit?usp=sharing',
};

export const INNERVERSE_ARTICLES: InnerverseArticle[] = [
  {
    id: 'four-foundations-seven-scores',
    title: "You Are More Than Your Goals: Understanding the Four Foundations of Life Through InnerVerse's Seven Scores",
    category: 'INNERVERSE FRAMEWORK',
    badge: 'Core Framework',
    description:
      'Success is more than what we achieve. Discover how Mindset, Heartset, Healthset and Soulset connect with the seven Innerverse dimensions to help us reflect on who we are, where we are going, and whether our goals align with the life we want to build.',
    takeaway: 'Before deciding where to go next, understand where you are starting from.',
    metadata: 'Framework · Self-awareness · Life navigation',
    ctaText: 'Read the Full Article ↗',
    estimatedReadTime: '~7 min read',
    url: ARTICLE_DOC_LINKS.fourFoundations,
    featured: true,
  },
  {
    id: 'manifestation-becoming',
    title: 'Manifestation Is Not About Wishing. It Is About Who You Are Becoming.',
    subtitle: 'Energy, consciousness, intention, and the Seven InnerVerse Scores',
    category: 'THOUGHT LEADERSHIP',
    badge: 'Editorial Perspective',
    description:
      'What if meaningful change begins not with what we wish to receive, but with who we are becoming? Explore how intention, beliefs, emotions, goal alignment and consistent action contribute to the way we pursue meaningful outcomes.',
    takeaway: 'Manifestation becomes more practical when intention is connected to self-understanding and purposeful action.',
    metadata: 'Intention · Alignment · Personal growth',
    ctaText: 'Read the Full Article ↗',
    estimatedReadTime: '~5 min read',
    url: ARTICLE_DOC_LINKS.manifestationBecoming,
    featured: false,
  },
  {
    id: 'seven-score-research',
    title: 'Innerverse Seven Score Framework for Life Navigation',
    subtitle: 'A theoretical synthesis and proposed validation programme',
    authorCredit: 'Anish Timble | EpicForce.ai',
    category: 'RESEARCH & THEORY',
    badge: 'Theoretical Paper',
    description:
      'A deeper examination of the proposed Innerverse Seven Score framework, its conceptual foundations, measurement design and future validation programme. Explore how self-awareness, purpose clarity, goal clarity, goal alignment, emotional health, execution readiness and fulfillment orientation can be organized into a testable life-navigation model.',
    takeaway: 'A framework becomes stronger when its assumptions are transparent and its claims remain open to evidence.',
    metadata: 'Conceptual research · Seven Scores · Validation',
    ctaText: 'Read the Research Paper ↗',
    estimatedReadTime: '~12 min read',
    url: ARTICLE_DOC_LINKS.sevenScoreResearch,
    featured: false,
  },
];
