import React, { useState } from 'react';
import { Compass, Sparkles, Shield, Cpu, Eye, ArrowRight, Zap } from 'lucide-react';

export const Mission: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'thesis' | 'contrast'>('thesis');

  return (
    <section
      id="mission"
      className="relative py-28 md:py-36 bg-[#070A14] text-white overflow-hidden border-t border-white/10"
    >
      {/* Luminous Ambient Background Glows */}
      <div
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/15 to-cyan-500/5 rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-purple-600/15 to-pink-500/5 rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle Architectural Grid Lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-semibold tracking-widest text-[#22D3EE] uppercase">
                01 / THE MISSION
              </span>
              <span className="h-px w-12 bg-[#22D3EE]/40" />
              <span className="font-mono text-xs text-neutral-400">Core Directive</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.08] text-white text-balance break-words">
              Technology should make us <br />
              <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-indigo-300">
                more human.
              </span>
            </h2>
          </div>

          {/* Interactive Mode Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shrink-0">
            <button
              onClick={() => setActiveTab('thesis')}
              className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'thesis'
                  ? 'bg-white text-[#070A14] font-semibold shadow-lg shadow-white/10'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              The Thesis
            </button>
            <button
              onClick={() => setActiveTab('contrast')}
              className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'contrast'
                  ? 'bg-white text-[#070A14] font-semibold shadow-lg shadow-white/10'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              The Shift
            </button>
          </div>
        </div>

        {/* Dynamic Display Panels */}
        {activeTab === 'thesis' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Main Heroic Quote Card */}
            <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
              {/* Subtle top highlight rim */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-xs uppercase tracking-widest mb-8">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Foundational Invariant</span>
                </div>

                <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-100 font-normal leading-relaxed mb-8">
                  “Our mission is simple — use technology to make us more human. 
                  <span className="text-white font-medium"> EpicForce.ai</span> is a purpose-driven innovation platform building technology that amplifies humanity.”
                </blockquote>

                <p className="text-neutral-300 font-light text-base sm:text-lg leading-relaxed max-w-xl">
                  In an attention-fragmented world obsessed with transactional automation, we engineer software that restores personal agency, deepens self-awareness, and anchors ambition in authentic human values.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Non-extractive Architecture
                </span>
                <span className="text-[#38BDF8]">Human Potential × Artificial Intelligence</span>
              </div>
            </div>

            {/* Right Column: 3 Pillar Anchors */}
            <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 group-hover:scale-110 transition-transform">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-medium text-white mb-1.5">
                      Cognitive Sovereignty
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                      Protecting focus and attention from manipulative engagement loops. Technology designed to be closed after use, not endlessly scrolled.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-blue-500/40 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 group-hover:scale-110 transition-transform">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-medium text-white mb-1.5">
                      Amplified Clarity
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                      Filtering through infinite digital noise to highlight the single most leveraged action that moves you forward today.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-medium text-white mb-1.5">
                      Meaning Over Efficiency
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                      Speed without direction is merely faster chaos. We build tools that ensure rapid execution aligns with enduring human purpose.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* The Paradigm Shift Panel */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Industry Status Quo */}
            <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/60 border border-rose-500/20 relative overflow-hidden">
              <span className="font-mono text-xs uppercase tracking-widest text-rose-400 block mb-3">
                The Conventional AI Path
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-white mb-4">
                Hyper-Optimization for Passive Consumption
              </h3>
              <ul className="space-y-3 text-sm text-neutral-400 font-light">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-mono">✕</span>
                  <span>Addictive feed loops engineered to extract maximum daily screen dwell time.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-mono">✕</span>
                  <span>Superficial chatbot wrappers generating generic walls of non-actionable text.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-mono">✕</span>
                  <span>Atrophy of personal decision-making and gradual erosion of authentic agency.</span>
                </li>
              </ul>
            </div>

            {/* The EpicForce Standard */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-blue-950/40 via-cyan-950/20 to-neutral-900 border border-cyan-500/30 relative overflow-hidden shadow-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-300 block mb-3">
                The EpicForce Paradigm
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-white mb-4">
                Structured Amplification of Human Agency
              </h3>
              <ul className="space-y-3 text-sm text-neutral-200 font-light">
                <li className="flex items-start gap-2.5">
                  <span className="text-cyan-400 font-mono">✓</span>
                  <span>Diagnostic life navigation that maps decisions directly to personal values.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-cyan-400 font-mono">✓</span>
                  <span>Autonomous workflow companions that reclaim real hours for creative mastery.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-cyan-400 font-mono">✓</span>
                  <span>Privacy-first sovereign data models where your insights belong entirely to you.</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
