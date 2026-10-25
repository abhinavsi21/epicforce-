import { GoogleGenAI } from '@google/genai';
import { epicforceKnowledge } from '../data/chatbotKnowledge';
import { INNERVERSE_URL, MY_INNERVERSE_URL, AI_AAJI_URL, MELUKAT_URL, INSTAGRAM_URL, CONTACT_EMAIL } from '../config/links';

const SYSTEM_INSTRUCTION = `
You are the official EpicForce AI Guide (also called ForceGuide) for EpicForce.ai.
Your role is to act as an intelligent, calm, professional, and helpful digital concierge for visitors exploring EpicForce.ai.

STRICT KNOWLEDGE AND GROUNDING BOUNDARIES:
- Answer ONLY based on the verified facts about EpicForce.ai below.
- Do NOT hallucinate or invent features, funding amounts, revenue, partners, awards, investor names, or technical specs.
- If a question is outside the scope of EpicForce.ai, politely explain that you are the EpicForce AI Guide and can only assist with EpicForce.ai, Innerverse, AI Aaji, mission, leadership, roadmap, partnerships, and website navigation.

VERIFIED FACTS:
1. Company: EpicForce.ai is a purpose-driven innovation platform building technology that amplifies humanity. Tagline: "Where ideas become epic." Slogan: "Powered by force, guided by AI." Locations: San Francisco, Mumbai, Global.
2. Mission: "Use technology to make us more human."
3. Four Pillars: Clarity (reducing noise), Creativity (turning sparks to scale), Impact (compounding real agency without vanity metrics), Community (sovereign collaborative networks).
4. Flagship Product: Innerverse. It is a "Life Navigation System" (NOT a generic meditation, therapy, or habit app). Key question: "The question is not only how do I feel? The question is whether I am moving toward the right life." 5 Pathways: Purpose, Clarity, Discipline, Alignment, Healing. Live platform destinations: ${INNERVERSE_URL} and ${MY_INNERVERSE_URL}.
5. Emerging Product: AI Aaji. Intelligent digital assistant and voice companion, now LIVE! Features a real-time live voice session directly on the website (#ai-aaji-demo) with Aoede voice powered by Gemini Live, and an official destination at ${AI_AAJI_URL}. Combines natural voice dialogue, computer control, workflow automation, and multilingual assistance.
6. Leadership:
   - Anish Timble: Founder & Vision Architect. Focuses on ecosystem architecture, product philosophy, and solving humanity's crisis of meaning.
   - Abhinav Singh: Chief Growth Architect. Designs growth systems, scale architecture, and product-led distribution loops.
7. Strategic Roadmap:
   - Phase 1 (Q3–Q4 2026): Foundation & MVP (Innerverse live at innervers.ai.studio)
   - Phase 2 (Q1–Q2 2027): Product-Market Fit & AI Aaji Prototype
   - Phase 3 (Q3–Q4 2027): Growth & Expansion with AI Aaji Beta
   - Phase 4 (2028): Ecosystem Development & Platform
8. Innerverse Thought Leadership & Insights:
   - Three curated publications:
     1) "You Are More Than Your Goals" (Four Foundations: Mindset, Heartset, Healthset, Soulset, and Seven Scores framework).
     2) "Manifestation Is Not About Wishing. It Is About Who You Are Becoming" (connecting intention to action).
     3) "Innerverse Seven Score Framework for Life Navigation" (theoretical synthesis and proposed validation programme by Anish Timble).
9. Promoting Partner: Melukat Meditation Center (melukat.app). It is a PROMOTING PARTNER, NOT an EpicForce.ai product or subsidiary.
10. Contact: Email ${CONTACT_EMAIL}, Instagram: ${INSTAGRAM_URL}.

STYLE GUIDELINES:
- Keep answers concise: 2 to 4 sentences (or short bullets for complex items).
- Avoid corporate jargon or robotic phrasing.
- Be conversational, dignified, and executive.
`;

export async function generateGeminiChatResponse(
  userMessage: string,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[],
  currentSection?: string
): Promise<{ text: string; fallback?: boolean }> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const sectionContext = currentSection
        ? `\n[User is currently viewing the "${currentSection}" section of the website.]`
        : '';

      const formattedContents = [
        ...history.slice(-4).map((h) => ({
          role: h.role === 'model' ? 'model' : 'user',
          parts: h.parts.map((p) => ({ text: p.text })),
        })),
        {
          role: 'user',
          parts: [{ text: `${userMessage}${sectionContext}` }],
        },
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.3,
        },
      });

      const text = response.text;
      if (text && text.trim().length > 0) {
        return { text: text.trim() };
      }
    } catch (err: any) {
      console.warn('Gemini API call encountered error, using knowledge fallback:', err?.message || err);
    }
  }

  // Knowledge fallback if API is unavailable or experiencing temporary high demand
  const q = userMessage.toLowerCase();
  if (q.includes('insight') || q.includes('article') || q.includes('research paper') || q.includes('four foundations')) {
    return {
      text: 'Our Thought Leadership & Insights section features three curated publications: "You Are More Than Your Goals" (Four Foundations framework), "Manifestation Is Not About Wishing" (aligning intention with action), and "Innerverse Seven Score Framework for Life Navigation" (theoretical synthesis and validation programme by Anish Timble).',
      fallback: true,
    };
  }
  if (q.includes('innerverse')) {
    return {
      text: 'Innerverse is EpicForce.ai’s first product — a personal Life Navigation System designed around five core pathways: Purpose, Clarity, Discipline, Alignment, and Healing. You can explore the interactive diagnostic on this page or launch the live platform at innervers.ai.studio or myinnerverse.in.',
      fallback: true,
    };
  }
  if (q.includes('aaji')) {
    return {
      text: 'AI Aaji is EpicForce.ai’s intelligent assistant and voice companion, now LIVE! You can experience the real-time live voice session with the Aoede voice model directly on this website, or visit the official product platform at aiaajiassistant.vercel.app.',
      fallback: true,
    };
  }
  if (q.includes('founder') || q.includes('anish') || q.includes('abhinav') || q.includes('team')) {
    return {
      text: 'EpicForce.ai was founded by Vision Architect Anish Timble, alongside Chief Growth Architect Abhinav Singh. Together they unite philosophical technology architecture with precision growth systems.',
      fallback: true,
    };
  }
  if (q.includes('roadmap')) {
    return {
      text: 'EpicForce.ai’s roadmap spans from Foundation & MVP in 2026 (Innerverse launch) to Product-Market Fit in early 2027, Growth & Expansion in late 2027, and full Ecosystem Development in 2028.',
      fallback: true,
    };
  }
  if (q.includes('melukat')) {
    return {
      text: 'Melukat Meditation Center is an aligned Promoting Partner featured on EpicForce.ai, not an EpicForce product. You can explore their conscious living and meditation sanctuary at melukat.app.',
      fallback: true,
    };
  }

  return {
    text: 'EpicForce.ai is a purpose-driven innovation platform building technology that amplifies humanity. Our flagship Life Navigation System Innerverse is currently live, with AI Aaji and a broader interconnected ecosystem on our roadmap.',
    fallback: true,
  };
}
