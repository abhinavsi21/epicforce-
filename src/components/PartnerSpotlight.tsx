import React from 'react';
import { ArrowUpRight, Compass, Sparkles } from 'lucide-react';
import { partners } from '../data/partners';
import { MelukatVisual } from './assets/MelukatVisual';
import { trackEvent } from '../config/links';

interface PartnerSpotlightProps {
  partnerId?: string;
  className?: string;
}

/**
 * Editorial Partner Spotlight Section
 * Distinctly positioned as a promoting/featured partner — not an EpicForce product.
 * Minimal, executive, and non-intrusive.
 */
export const PartnerSpotlight: React.FC<PartnerSpotlightProps> = ({
  partnerId = 'melukat',
  className = '',
}) => {
  const partner = partners.find((p) => p.id === partnerId) || partners[0];

  if (!partner) return null;

  return (
    <section
      id="partners"
      className={`relative py-20 sm:py-24 bg-[#070913] text-white border-t border-white/10 overflow-hidden ${className}`}
      aria-label="Promoting Partner Spotlight"
    >
      {/* Subtle ambient lighting with soft purple and gold warmth */}
      <div
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 bg-purple-900/10 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Curated Partner Spotlight Frame */}
        <div className="relative rounded-3xl p-6 sm:p-8 md:p-10 bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/10 backdrop-blur-xl shadow-2xl">
          {/* Subtle top eyebrow indicating partnership category */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="font-mono text-xs font-semibold tracking-widest text-amber-300 uppercase">
                {partner.category}
              </span>
              <span className="text-neutral-500">·</span>
              <span className="font-mono text-xs text-neutral-400">Ecosystem Alignment</span>
            </div>

            <span className="text-xs font-mono text-neutral-400">
              External Destination ↗
            </span>
          </div>

          {/* Main 2-Column Spotlight Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Partner Visual / Emblem */}
            <div className="lg:col-span-5 w-full">
              <MelukatVisual
                imageSrc={partner.image}
                altText={partner.imageAlt || partner.name}
              />
            </div>

            {/* Right: Partner Narrative & Action */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-xs uppercase tracking-wider mb-4">
                  <Compass className="w-3.5 h-3.5" />
                  <span>{partner.subheadline}</span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl text-white font-normal mb-3">
                  {partner.headline}
                </h3>

                <p className="font-display italic text-lg sm:text-xl text-neutral-200 font-light mb-4">
                  “{partner.tagline}”
                </p>

                <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed mb-6 max-w-xl">
                  {partner.description}
                </p>

                {/* Focus areas pill tags */}
                {partner.focusAreas && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {partner.focusAreas.map((area, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-300"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('partner_click', { partner: partner.id, url: partner.url })}
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-xl bg-amber-400 hover:bg-amber-300 text-[#070913] font-medium text-sm tracking-wide transition-all duration-200 shadow-lg shadow-amber-500/10 active:scale-[0.98] w-full sm:w-auto"
                  aria-label={`${partner.cta} on melukat.app (opens in new tab)`}
                >
                  <span>{partner.cta}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <span className="text-xs font-mono text-neutral-400">
                  Direct connection to melukat.app
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
