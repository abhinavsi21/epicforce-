# EpicForce.ai — Production Website & Digital Headquarters

> **Where ideas become epic.**  
> *Powered by force, guided by AI.*

EpicForce.ai is a purpose-driven innovation platform building intelligent technology that amplifies humanity. This codebase represents a complete ground-up rebuild of the digital headquarters, engineered with a premium editorial technology aesthetic, responsive layout, fluid navigation, and zero-compromise design integrity.

---

## 1. Information Architecture & Flow

The experience unfolds as an intentional story rather than a disconnected collection of cards:

1. **Sticky Global Navigation (`Navbar.tsx`)**: 3-zone contract, subtle scroll backdrop blur, clean typography wordmark, mobile drawer, and direct action routing.
2. **Hero (`Hero.tsx`)**: Full viewport cinematic obsidian canvas (`#050816` → `#0B1020`) with a custom GPU-accelerated interactive Idea Nexus simulating `Idea → Intelligence → People → Impact`.
3. **Mission (`Mission.tsx`)**: Split editorial layout establishing the core thesis: *"Technology should make us more human."*
4. **Key Pillars (`Pillars.tsx`)**: 4-card grid featuring custom minimal geometric iconography for **Clarity**, **Creativity**, **Impact**, and **Community**.
5. **Founders & Leadership (`FounderSection.tsx`)**: High-fidelity editorial framing honoring the real voices and stories of **Anish Timble** (Vision Architect) and **Abhinav Singh** (Chief Growth Architect).
6. **Products Overview (`ProductsOverview.tsx`)**: Introduces the EpicForce ecosystem with direct links to deep-dive showcases.
7. **Flagship Product Showcase: Innerverse (`InnerverseSection.tsx`)**: Atmospheric bronze/twilight environment detailing the Life Navigation System and its five pathways (**Purpose**, **Clarity**, **Discipline**, **Alignment**, **Healing**).
8. **Dedicated Innerverse Page (`/innerverse`)**: Complete with an interactive 3-step diagnostic assessment engine, reflection prompts, and architecture roadmap.
9. **Intelligence System: AI Aaji (`AIAajiSection.tsx`)**: Technological preview with 8 key capability modules and an early waitlist notification system.
10. **Strategic Foundations: Why EpicForce? (`WhyEpicforce.tsx`)**: 4-quadrant thesis covering Purpose-Driven, Product-Led, AI-Native, and Ecosystem Thinking.
11. **Partnership CTA (`PartnershipCTA.tsx`)**: High-intent "Build With Us" gateway without artificial hype.
12. **The Road Ahead (`Roadmap.tsx`)**: Interactive timeline stepper covering Phase 1 (2026) through Phase 4 (2028).
13. **Direct Inquiries (`ContactForm.tsx`)**: Fully validated custom contact form with Supabase cloud integration and persistent local fallback.
14. **Footer (`Footer.tsx`)**: Sophisticated dark navigation mirror, social channels, and legal documentation links.

---

## 2. Design System Tokens

- **Palette**:
  - Dominant Neutral Field: Warm off-white / ivory (`#FAF9F6`) & Obsidian Navy (`#080B14`, `#050816`)
  - Accent Radiance: Electric Blue (`#3B82F6`), Cyan (`#22D3EE`), Subtle Amber (`#F59E0B`), Magenta (`#EC4899`)
- **Typography Pairing**:
  - Display / Headlines: `Cormorant Garamond` (editorial serif)
  - Interface / Body: `Plus Jakarta Sans` (refined human-centric sans-serif)
  - Telemetry / Code: `JetBrains Mono` (tabular numerals)
- **Zero-Pill Discipline**:
  - Metadata rendered as clean unboxed inline text with typographic separators (`·`, `/`).
  - No candy badges or fake status tickers.

---

## 3. Supabase Database Setup

To enable persistent cloud recording of inquiries in Supabase:

1. Create a project at [supabase.com](https://supabase.com).
2. Navigate to the **SQL Editor** in the Supabase Dashboard.
3. Paste and run the script found in `supabase_schema.sql`:

```sql
CREATE TABLE IF NOT EXISTS public.contacts (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    organization TEXT,
    reason TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' NOT NULL CHECK (status IN ('new', 'reviewed', 'contacted', 'archived'))
);

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert to contacts" 
ON public.contacts FOR INSERT TO anon WITH CHECK (true);
```

4. In your `.env` or deployment environment variables, provide:

```bash
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-public-key"
```

*(Note: If environment variables are omitted, the application automatically and gracefully persists submissions to browser `localStorage` under `epicforce_contacts` so form submissions never fail).*

---

## 4. Local Development & Build

```bash
# Install dependencies
npm install

# Start Vite dev server (port 3000)
npm run dev

# Run TypeScript check / linter
npm run lint

# Compile production bundle
npm run build
```

---

## 5. Deployment

The application is structured as a standard Vite + React SPA that can be deployed to Vercel, Netlify, Cloud Run, or GitHub Pages. For SPA client-side routing on static hosts, ensure URL rewrites map all routes (`/innerverse`, `/contact`, `/privacy`, `/terms`) to `index.html`.
