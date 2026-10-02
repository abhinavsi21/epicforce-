import React, { useState } from 'react';
import { ArrowUpRight, Compass, CheckCircle2 } from 'lucide-react';
import { innerversePathways } from '../data/products';
import { INNERVERSE_URL, trackEvent } from '../config/links';

export const InnerverseSection: React.FC = () => {
  const [activePathwayId, setActivePathwayId] = useState<string>('clarity');
  const activePathway = innerversePathways.find((p) => p.id === activePathwayId) || innerversePathways[0];

  const journeySteps = [
    { step: '01', title: 'Assessment', desc: 'Baseline diagnostic evaluating cognitive friction on myinnerverse.in.' },
    { step: '02', title: 'Personal Profile', desc: 'Calculates your individual orientation profile.' },
    { step: '03', title: 'Identify Path', desc: 'Focuses energy on your single highest-leverage area.' },
    { step: '04', title: 'AI Guided Journey', desc: 'Tailored weekly prompts and structured reflection.' },
    { step: '05', title: 'Action & Reflection', desc: 'Daily ritual checks to ground theory into reality.' },
    { step: '06', title: 'Progress Telemetry', desc: 'Audits pattern shift without vanity numbers.' },
    { step: '07', title: 'Long-Term Growth', desc: 'Compounds personal clarity into enduring agency.' },
  ];

  return (
    <section
      id="innerverse"
      className="relative py-28 md:py-36 bg-[#0B0908] text-white border-t border-amber-900/30 overflow-hidden"
    >
      {/* Warm atmospheric bronze & twilight light layers */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs font-semibold tracking-widest text-[#22D3EE] uppercase">
              04 / FLAGSHIP PRODUCT
            </span>
            <span className="h-px w-10 bg-[#22D3EE]/40" />
            <span className="text-xs font-mono text-amber-300/80">INNERVERSE · LIVE PRODUCT</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal leading-tight text-white mb-6">
            Your journey <br />
            starts <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-sky-200 to-cyan-300">here.</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed">
            Innerverse is your personal <strong className="font-semibold text-white">Life Navigation System</strong>. The interactive diagnostic and guided personal development platform is live at{' '}
            <a
              href={INNERVERSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('innerverse_cta_click', { source: 'innerverse_header_link' })}
              className="text-[#38BDF8] hover:underline inline-flex items-center gap-0.5"
            >
              <span>myinnerverse.in</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            .
          </p>
        </div>

        {/* Immersive Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left Column: Interactive Pathways Selector */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-3xl bg-neutral-900/70 border border-neutral-800 backdrop-blur-xl shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-amber-400" />
                  <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                    Five Core Navigation Pathways
                  </span>
                </div>
                <span className="text-xs font-mono text-neutral-500">Interactive</span>
              </div>

              <div className="space-y-2">
                {innerversePathways.map((pathway) => {
                  const isActive = pathway.id === activePathwayId;
                  return (
                    <button
                      key={pathway.id}
                      onClick={() => setActivePathwayId(pathway.id)}
                      className={`w-full text-left p-4 rounded-2xl transition-all duration-200 flex items-center justify-between cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                        isActive
                          ? 'bg-white/10 border border-white/20 text-white shadow-lg'
                          : 'bg-white/[0.02] border border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: pathway.accentColor }}
                          />
                          <span className="font-display text-lg font-medium">
                            {pathway.name}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 font-light mt-1 pl-4.5">
                          {pathway.subtitle}
                        </p>
                      </div>

                      {isActive && (
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-neutral-800 space-y-3">
              <a
                href={INNERVERSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('innerverse_cta_click', { source: 'innerverse_section_diagnostic_cta' })}
                className="group w-full py-4 px-6 rounded-xl bg-white text-[#080B14] hover:bg-neutral-200 font-medium text-sm tracking-wide transition-all inline-flex items-center justify-center gap-2 shadow-lg shadow-white/10 cursor-pointer active:scale-[0.98]"
                aria-label="Take the Innerverse Diagnostic on myinnerverse.in (opens in new tab)"
              >
                <span>Take the Innerverse Diagnostic ↗</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <p className="text-center text-xs text-neutral-400 font-mono">
                The full assessment & orientation experience runs on myinnerverse.in
              </p>
            </div>
          </div>

          {/* Right Column: Deep Dynamic Pathway Preview Canvas */}
          <div className="lg:col-span-7 flex flex-col justify-between p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#1A1612] via-[#120F0C] to-[#0A0908] border border-amber-900/40 relative overflow-hidden shadow-2xl">
            {/* Water / Celestial Ripples Background Aesthetic */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                  d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z"
                  fill="url(#water-grad)"
                />
                <defs>
                  <linearGradient id="water-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#D97706" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-xs uppercase tracking-wider mb-6">
                <span>Pathway Focus: {activePathway.name}</span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-white mb-4">
                {activePathway.tagline}
              </h3>

              <p className="text-neutral-300 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-xl">
                {activePathway.description}
              </p>

              {/* Reflection Callout */}
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
                <span className="block font-mono text-xs uppercase tracking-wider text-neutral-400 mb-2">
                  Sample Guidance Inquiry
                </span>
                <p className="font-display text-xl sm:text-2xl italic text-amber-100 font-normal">
                  “{activePathway.reflectionQuestion}”
                </p>
              </div>
            </div>

            {/* Bottom System Tags */}
            <div className="relative z-10 pt-8 mt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-4">
                <span>Personal Assessment</span>
                <span>·</span>
                <span>Adaptive Insights</span>
                <span>·</span>
                <span>Progress Telemetry</span>
              </div>
              <a
                href={INNERVERSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('innerverse_cta_click', { source: 'innerverse_canvas_bottom' })}
                className="text-amber-400 font-medium hover:underline inline-flex items-center gap-1"
              >
                <span>Explore on myinnerverse.in</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* 7-Step Conceptual Product User Journey */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#22D3EE] block mb-1">
                Product Architecture In Action
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-white font-normal">
                The Innerverse User Journey
              </h3>
            </div>
            <a
              href={INNERVERSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('innerverse_cta_click', { source: 'innerverse_journey_badge' })}
              className="text-xs font-mono text-[#22D3EE] hover:underline inline-flex items-center gap-1"
            >
              <span>myinnerverse.in ↗</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
            {journeySteps.map((j, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-neutral-900/60 border border-white/5 hover:border-amber-400/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs text-amber-400 font-semibold block mb-2">
                    {j.step}
                  </span>
                  <h4 className="font-display text-base font-medium text-white mb-1.5">
                    {j.title}
                  </h4>
                  <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
                    {j.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
