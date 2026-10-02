import React from 'react';
import { ArrowRight, ArrowUpRight, Compass, Bot, Network } from 'lucide-react';
import { INNERVERSE_URL, trackEvent } from '../config/links';

interface ProductsOverviewProps {
  onScrollToInnerverse: () => void;
  onScrollToAIAaji: () => void;
}

export const ProductsOverview: React.FC<ProductsOverviewProps> = ({
  onScrollToInnerverse,
  onScrollToAIAaji,
}) => {
  return (
    <section
      id="products"
      className="relative py-28 md:py-36 bg-[#080B18] text-white border-t border-white/10 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-cyan-900/10 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs font-semibold tracking-widest text-[#22D3EE] uppercase">
              03 / PRODUCT ECOSYSTEM
            </span>
            <span className="h-px w-10 bg-[#22D3EE]/40" />
            <span className="font-mono text-xs text-neutral-400">Modular Architecture</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal leading-tight text-white mb-6">
            Building technology for <br />
            <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-sky-300">
              human potential.
            </span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed">
            We architect focused, modular tools designed to solve acute challenges of human clarity and cognitive friction. Each product stands on its own, compounding into a wider personal intelligence ecosystem.
          </p>
        </div>

        {/* Visual Ecosystem Architecture Map */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400">
              <Network className="w-4 h-4 text-cyan-400" />
              <span>EpicForce Ecosystem Interoperability</span>
            </div>
            <span className="text-xs font-mono text-[#22D3EE]">Unified Sovereign Data</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-center">
            {/* Node 1: Innerverse */}
            <a
              href={INNERVERSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('innerverse_cta_click', { source: 'ecosystem_map_node1' })}
              className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/20 hover:border-blue-400/50 transition-colors block text-left group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block">
                  Node 01 · Human Direction
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-blue-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <h4 className="font-display text-xl text-white font-medium mb-1">Innerverse</h4>
              <p className="text-xs text-neutral-400">Diagnoses personal friction, aligns decisions, and builds clarity on myinnerverse.in.</p>
            </a>

            {/* Mobile Directional Indicator */}
            <div className="md:hidden flex items-center justify-center text-cyan-400/80 font-mono text-xs py-0.5">
              <span>↓ Human direction telemetry</span>
            </div>

            {/* Hub: EpicForce Core Engine */}
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/20 relative">
              <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest block mb-1 font-semibold">
                Core Engine
              </span>
              <h4 className="font-display text-2xl text-white font-medium mb-1">EpicForce.ai</h4>
              <p className="text-xs text-neutral-300">
                Shared intelligence, privacy invariants, and adaptive synthesis layer.
              </p>
            </div>

            {/* Mobile Directional Indicator */}
            <div className="md:hidden flex items-center justify-center text-cyan-400/80 font-mono text-xs py-0.5">
              <span>↓ Autonomous execution actions</span>
            </div>

            {/* Node 2: AI Aaji */}
            <div
              onClick={onScrollToAIAaji}
              className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 hover:border-cyan-400/50 transition-colors block text-left cursor-pointer"
            >
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                Node 02 · Autonomous Action
              </span>
              <h4 className="font-display text-xl text-white font-medium mb-1">AI Aaji</h4>
              <p className="text-xs text-neutral-400">Executes workflows, automates tasks, and reclaims personal hours (In Architecture).</p>
            </div>
          </div>
        </div>

        {/* 2 Flagship Product Teaser Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product 01: Innerverse -> Links directly to live external site: myinnerverse.in */}
          <a
            href={INNERVERSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('innerverse_cta_click', { source: 'products_card_innerverse' })}
            className="group relative flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-blue-950/30 via-neutral-900/60 to-black/80 border border-white/10 hover:border-blue-500/50 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-blue-500/10"
            aria-label="Explore Innerverse on myinnerverse.in (opens in new tab)"
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="px-3 py-1 rounded-md bg-blue-500/10 text-blue-400 font-mono text-xs tracking-wider uppercase border border-blue-500/20 flex items-center gap-1.5">
                  <span>First Product · Live on myinnerverse.in</span>
                  <ArrowUpRight className="w-3 h-3 text-blue-400" />
                </span>
                <Compass className="w-6 h-6 text-blue-400 group-hover:rotate-45 transition-transform duration-300" />
              </div>

              <h3 className="font-display text-3xl sm:text-4xl font-medium text-white mb-2">
                Innerverse
              </h3>
              <p className="text-xs font-mono text-blue-300 mb-4 uppercase tracking-wider">
                Personal Life Navigation System
              </p>
              <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed mb-6">
                Guided assessment and five distinct growth pathways designed to bring clarity, discipline, purpose, alignment, and healing to your daily life.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-sm font-medium text-blue-400 group-hover:text-white transition-colors">
              <span>Explore Innerverse (myinnerverse.in)</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>

          {/* Product 02: AI Aaji */}
          <div
            onClick={onScrollToAIAaji}
            className="group relative flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-cyan-950/30 via-neutral-900/60 to-black/80 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-cyan-500/10"
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-400 font-mono text-xs tracking-wider uppercase border border-cyan-500/20">
                  In Development · Roadmap
                </span>
                <Bot className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              </div>

              <h3 className="font-display text-3xl sm:text-4xl font-medium text-white mb-2">
                AI Aaji
              </h3>
              <p className="text-xs font-mono text-cyan-300 mb-4 uppercase tracking-wider">
                Smart Digital Companion
              </p>
              <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed mb-6">
                A scalable intelligence system combining natural voice dialogue, computer interaction, autonomous workflow execution, and multilingual assistance.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-sm font-medium text-cyan-400 group-hover:text-white transition-colors">
              <span>View Capabilities & Architecture</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
