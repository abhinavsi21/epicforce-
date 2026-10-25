import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Compass, CheckCircle2, Sparkles } from 'lucide-react';
import { innerversePathways } from '../data/products';
import { INNERVERSE_URL, trackEvent } from '../config/links';
import { InnerverseDiagnosticEngine } from '../components/InnerverseDiagnosticEngine';

export const InnerverseExperiencePage: React.FC = () => {
  const [activePathwayId, setActivePathwayId] = useState<string>('purpose');
  const activePathway =
    innerversePathways.find((p) => p.id === activePathwayId) || innerversePathways[0];

  const journeySteps = [
    {
      step: '01',
      title: 'Assessment',
      desc: 'Baseline diagnostic evaluating cognitive friction.',
    },
    {
      step: '02',
      title: 'Personal Profile',
      desc: 'Calculates your individual orientation profile.',
    },
    {
      step: '03',
      title: 'Identify Path',
      desc: 'Focuses energy on your single highest-leverage area.',
    },
    {
      step: '04',
      title: 'AI Guided Journey',
      desc: 'Tailored weekly prompts and structured reflection.',
    },
    {
      step: '05',
      title: 'Action & Reflection',
      desc: 'Daily ritual checks to ground theory into reality.',
    },
    {
      step: '06',
      title: 'Progress Telemetry',
      desc: 'Audits pattern shift without vanity numbers.',
    },
    {
      step: '07',
      title: 'Long-Term Growth',
      desc: 'Compounds personal clarity into enduring agency.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#060914] text-white">
      {/* Top Header matching Screenshot 3 & 4 with Live Link */}
      <header className="sticky top-0 z-40 bg-[#060914]/90 backdrop-blur-md border-b border-white/10 px-6 sm:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to EpicForce.ai</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-display font-medium text-base tracking-wider text-white">
                INNERVERSE
              </span>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 font-mono text-[11px] uppercase tracking-wider">
                System 01
              </span>
            </div>

            {/* Launch Live Innerverse Button */}
            <a
              href={INNERVERSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('innerverse_cta_click', { source: 'innerverse_page_header' })}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium tracking-wide transition-all shadow-md shadow-blue-600/20"
              aria-label="Launch Live Innerverse Website (opens in new tab)"
            >
              <span>Launch Live (innervers.ai.studio)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Announcement Banner */}
      <div className="bg-gradient-to-r from-blue-950/40 via-amber-950/20 to-blue-950/40 border-b border-white/5 py-3 px-6 text-center text-xs font-mono text-neutral-300">
        <span>This is the EpicForce.ai interactive product showcase. </span>
        <a
          href={INNERVERSE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('innerverse_cta_click', { source: 'innerverse_page_banner' })}
          className="text-[#22D3EE] hover:underline font-semibold inline-flex items-center gap-1 ml-1"
        >
          <span>Launch the live application at innervers.ai.studio</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>

      <main className="max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24 space-y-28">
        {/* Section 1: Interactive Diagnostic Engine (Screenshot 1 & 2) */}
        <section id="diagnostic">
          <InnerverseDiagnosticEngine onSelectPathway={(id) => setActivePathwayId(id)} />
        </section>

        {/* Section 2: Navigation Architecture & 5 Core Pathways (Screenshot 3) */}
        <section id="pathways" className="pt-8 border-t border-white/10">
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-xs font-semibold tracking-widest text-[#22D3EE] uppercase block mb-3">
              NAVIGATION ARCHITECTURE
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-normal text-white mb-4">
              The Five Core Pathways
            </h2>
            <p className="text-neutral-300 text-base sm:text-lg font-light leading-relaxed">
              Human progress is not linear. Innerverse routes your daily focus across these five essential dimensions.
            </p>
          </div>

          {/* 5 Horizontal Pathway Selection Cards matching Screenshot 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-10">
            {innerversePathways.map((pathway) => {
              const isActive = pathway.id === activePathwayId;
              return (
                <button
                  key={pathway.id}
                  onClick={() => setActivePathwayId(pathway.id)}
                  className={`p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[140px] ${
                    isActive
                      ? 'bg-white/10 border border-white/30 text-white shadow-xl shadow-black/40 scale-[1.02]'
                      : 'bg-[#0E1322] border border-white/10 text-neutral-400 hover:text-white hover:bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: pathway.accentColor }}
                    />
                    {isActive && (
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                        Active
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-medium text-white mb-1">
                      {pathway.name}
                    </h3>
                    <p className="text-xs text-neutral-300 font-light leading-snug line-clamp-2">
                      {pathway.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Pathway Deep Dive Container matching Screenshot 3 */}
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#0E1322] via-[#090D18] to-[#05070E] border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <span className="font-mono text-xs font-semibold tracking-widest text-[#22D3EE] uppercase block mb-3">
                PATHWAY DEEP-DIVE
              </span>

              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-white mb-4">
                <span style={{ color: activePathway.accentColor }}>{activePathway.name}</span>
                <span className="text-neutral-300">: {activePathway.subtitle}</span>
              </h3>

              <p className="font-display italic text-xl text-neutral-200 font-light mb-6">
                “{activePathway.tagline}”
              </p>

              <p className="text-neutral-300 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-3xl">
                {activePathway.description}
              </p>

              {/* Reflection Inquiry Card */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md mb-8 max-w-2xl">
                <span className="block font-mono text-xs uppercase tracking-wider text-neutral-400 mb-2">
                  Sample Guidance Inquiry
                </span>
                <p className="font-display text-xl italic text-amber-200 font-normal">
                  “{activePathway.reflectionQuestion}”
                </p>
              </div>

              {/* Action Button: Experience this pathway on innervers.ai.studio */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
                <a
                  href={INNERVERSE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('innerverse_cta_click', { source: 'pathway_deepdive_button', pathway: activePathway.id })}
                  className="px-6 py-3.5 min-h-[48px] rounded-xl bg-white text-[#060914] hover:bg-neutral-200 font-medium text-sm tracking-wide transition-all inline-flex items-center gap-2 shadow-lg shadow-white/10"
                >
                  <span>Experience {activePathway.name} on innervers.ai.studio ↗</span>
                </a>

                <span className="text-xs font-mono text-neutral-400">
                  Full adaptive prompts and progress loops run on live platform
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Product Architecture In Action (Screenshot 4) */}
        <section id="journey" className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="font-mono text-xs font-semibold tracking-widest text-[#22D3EE] uppercase block mb-3">
                PRODUCT ARCHITECTURE IN ACTION
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-normal text-white">
                The Innerverse User Journey
              </h2>
            </div>
            <span className="font-mono text-xs text-neutral-400">
              Continuous Calibration Loop
            </span>
          </div>

          {/* 7-Step Cards matching Screenshot 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-10">
            {journeySteps.map((stepItem, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0B0E1B] border border-amber-500/20 hover:border-amber-400/50 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-sm font-semibold text-amber-400 block mb-2">
                    {stepItem.step}
                  </span>
                  <h3 className="font-display text-xl font-medium text-white mb-2">
                    {stepItem.title}
                  </h3>
                  <p className="text-sm text-neutral-300 font-light leading-relaxed">
                    {stepItem.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Live Launch CTA */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-950/40 via-amber-950/20 to-[#0B0E1B] border border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl text-white font-normal mb-2">
                Ready to begin your actual journey?
              </h3>
              <p className="text-sm text-neutral-300 font-light">
                Launch the live platform to activate your personalized loops and daily rituals.
              </p>
            </div>

            <a
              href={INNERVERSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('innerverse_cta_click', { source: 'journey_bottom_cta' })}
              className="group px-7 py-3.5 min-h-[48px] rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm tracking-wide transition-all shadow-xl shadow-blue-600/20 inline-flex items-center justify-center gap-2 shrink-0"
              aria-label="Launch Live Innerverse Journey on innervers.ai.studio (opens in new tab)"
            >
              <span>Launch Live Innerverse ↗</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </section>
      </main>

      {/* Dedicated Experience Footer */}
      <footer className="border-t border-white/10 py-10 px-6 sm:px-12 text-center text-xs font-mono text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 EpicForce.ai. Innerverse is a flagship system of EpicForce.</p>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-neutral-300 hover:text-white">
              EpicForce.ai Home
            </Link>
            <span>·</span>
            <a
              href={INNERVERSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#22D3EE] hover:underline"
            >
              innervers.ai.studio ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
