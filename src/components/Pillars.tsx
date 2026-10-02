import React, { useState } from 'react';
import { pillars } from '../data/pillars';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Pillars: React.FC = () => {
  const [activePillarIdx, setActivePillarIdx] = useState<number | null>(null);

  const getPillarAccent = (num: string) => {
    switch (num) {
      case '01':
        return {
          glow: 'from-cyan-500/20 via-blue-500/10 to-transparent',
          border: 'group-hover:border-cyan-400/50',
          badgeText: 'text-cyan-400',
          badgeBg: 'bg-cyan-500/10 border-cyan-500/20',
          dot: 'bg-cyan-400',
          manifesto: 'Manifested in Innerverse Life Navigation & Clarity Pathways',
        };
      case '02':
        return {
          glow: 'from-purple-500/20 via-indigo-500/10 to-transparent',
          border: 'group-hover:border-purple-400/50',
          badgeText: 'text-purple-400',
          badgeBg: 'bg-purple-500/10 border-purple-500/20',
          dot: 'bg-purple-400',
          manifesto: 'Manifested in AI Aaji Creative Workflows & Prototyping Engines',
        };
      case '03':
        return {
          glow: 'from-amber-500/20 via-orange-500/10 to-transparent',
          border: 'group-hover:border-amber-400/50',
          badgeText: 'text-amber-400',
          badgeBg: 'bg-amber-500/10 border-amber-500/20',
          dot: 'bg-amber-400',
          manifesto: 'Manifested in Telemetry Systems & Measurable Human Momentum',
        };
      case '04':
        return {
          glow: 'from-rose-500/20 via-pink-500/10 to-transparent',
          border: 'group-hover:border-rose-400/50',
          badgeText: 'text-rose-400',
          badgeBg: 'bg-rose-500/10 border-rose-500/20',
          dot: 'bg-rose-400',
          manifesto: 'Manifested in Accountability Pods & Shared Ecosystem Synergy',
        };
      default:
        return {
          glow: 'from-blue-500/20 to-transparent',
          border: 'group-hover:border-blue-400/50',
          badgeText: 'text-blue-400',
          badgeBg: 'bg-blue-500/10 border-blue-500/20',
          dot: 'bg-blue-400',
          manifesto: 'Core Architectural Standard',
        };
    }
  };

  return (
    <section
      id="pillars"
      className="relative py-28 md:py-36 bg-[#060814] text-white border-t border-white/10 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-cyan-900/10 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-semibold tracking-widest text-[#22D3EE] uppercase">
                02 / WHAT WE BUILD AROUND
              </span>
              <span className="h-px w-10 bg-[#22D3EE]/40" />
              <span className="font-mono text-xs text-neutral-400">Architectural Invariants</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-white leading-tight text-balance">
              Four principles. <br />
              <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
                One direction.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-base text-neutral-300 font-light leading-relaxed">
            Every product architecture, algorithmic model, and partnership at EpicForce.ai is engineered around these four foundational tenets.
          </p>
        </div>

        {/* 4 Architectural Glass Monolith Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {pillars.map((pillar, idx) => {
            const accent = getPillarAccent(pillar.number);
            const isHovered = activePillarIdx === idx;

            return (
              <div
                key={pillar.number}
                onMouseEnter={() => setActivePillarIdx(idx)}
                onMouseLeave={() => setActivePillarIdx(null)}
                className={`group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.05] via-white/[0.02] to-transparent border border-white/10 ${accent.border} transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/60 overflow-hidden cursor-default`}
              >
                {/* Luminous internal ambient gradient wash on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${accent.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                {/* Top of Card: Number + Custom SVG Icon */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-display text-3xl font-light text-neutral-400 group-hover:text-white transition-colors">
                      {pillar.number}
                    </span>

                    {/* Glowing Minimalist Icon Box */}
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/15 flex items-center justify-center text-neutral-300 group-hover:scale-110 group-hover:text-white transition-all duration-300 shadow-inner">
                      {pillar.number === '01' && (
                        <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="12" cy="12" r="9" />
                          <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.4" />
                          <line x1="12" y1="3" x2="12" y2="7" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                          <line x1="3" y1="12" x2="7" y2="12" />
                          <line x1="17" y1="12" x2="21" y2="12" />
                        </svg>
                      )}
                      {pillar.number === '02' && (
                        <svg className="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M12 2L2 7l10 5 10-5-10-5z" />
                          <path d="M2 17l10 5 10-5" />
                          <path d="M2 12l10 5 10-5" />
                        </svg>
                      )}
                      {pillar.number === '03' && (
                        <svg className="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M12 20V10" />
                          <path d="M18 20V4" />
                          <path d="M6 20v-4" />
                          <circle cx="18" cy="4" r="2.5" fill="currentColor" fillOpacity="0.5" />
                        </svg>
                      )}
                      {pillar.number === '04' && (
                        <svg className="w-6 h-6 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="8" cy="8" r="4" />
                          <circle cx="16" cy="16" r="4" />
                          <path d="M11 11l2 2" strokeDasharray="2 2" />
                          <circle cx="8" cy="8" r="1.5" fill="currentColor" />
                          <circle cx="16" cy="16" r="1.5" fill="currentColor" />
                        </svg>
                      )}
                    </div>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-medium text-white mb-3 group-hover:text-white transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                {/* Bottom of Card: Key Aspects & Product Manifestation */}
                <div className="relative z-10 pt-6 border-t border-white/10 mt-auto">
                  <ul className="space-y-2 text-xs text-neutral-400 font-mono mb-4">
                    {pillar.keyAspects.map((aspect, aIdx) => (
                      <li key={aIdx} className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${accent.dot} opacity-80`} />
                        <span className="text-neutral-300 group-hover:text-white transition-colors">
                          {aspect}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Manifestation Tag */}
                  <div className={`p-2.5 rounded-xl border text-[11px] font-mono leading-tight ${accent.badgeBg} ${accent.badgeText}`}>
                    {accent.manifesto}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
