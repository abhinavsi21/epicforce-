import React, { useState } from 'react';
import { roadmapData } from '../data/roadmap';
import { Calendar, CheckCircle2, ChevronDown, ChevronUp, Clock, Milestone } from 'lucide-react';

export const Roadmap: React.FC = () => {
  const [selectedPhaseIdx, setSelectedPhaseIdx] = useState<number>(0);
  const [expandedDetails, setExpandedDetails] = useState<boolean>(true);
  const [mobileExpandedPhases, setMobileExpandedPhases] = useState<Record<number, boolean>>({
    0: true, // First phase expanded by default on mobile
    1: false,
    2: false,
    3: false,
  });

  const toggleMobilePhase = (idx: number) => {
    setMobileExpandedPhases((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <section
      id="roadmap"
      className="relative py-20 sm:py-28 md:py-36 bg-[#080B14] text-white border-t border-white/10 overflow-hidden w-full max-w-[100vw]"
    >
      {/* Background ambient gradient */}
      <div
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-purple-900/10 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 w-full">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs font-semibold tracking-widest text-[#22D3EE] uppercase">
              06 / THE ROAD AHEAD
            </span>
            <span className="h-px w-10 bg-[#22D3EE]/40" />
            <span className="text-xs font-mono text-neutral-400">2026 — 2028 Horizon</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-white mb-4 sm:mb-6">
            A deliberate <br />
            <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-sky-300">
              long-term journey.
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-300 font-light leading-relaxed">
            Our strategic trajectory spans foundational architecture, validated product-market fit, community expansion, and a unified AI ecosystem.
          </p>
        </div>

        {/* ============================================================ */}
        {/* DESKTOP LAYOUT (>= 1024px): Horizontal Stepper + Detail View */}
        {/* ============================================================ */}
        <div className="hidden lg:block">
          {/* Horizontal Stepper Track */}
          <div className="grid grid-cols-4 gap-4 mb-10 pb-8 border-b border-white/10 relative">
            <div className="absolute top-6 left-12 right-12 h-px bg-white/15 z-0" />

            {roadmapData.map((item, idx) => {
              const isSelected = selectedPhaseIdx === idx;
              const isCurrent = item.status === 'current';

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedPhaseIdx(idx)}
                  className={`relative z-10 flex flex-col items-start p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    isSelected
                      ? 'bg-white/10 border border-cyan-400/50 shadow-xl shadow-cyan-500/10'
                      : 'bg-white/[0.02] border border-white/5 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-4">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-cyan-400 ring-4 ring-cyan-400/20'
                          : isCurrent
                          ? 'bg-blue-500 ring-2 ring-blue-500/30'
                          : 'bg-neutral-600'
                      }`}
                    >
                      {isCurrent && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                    </div>

                    <span className="font-mono text-xs text-neutral-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      <span>{item.timeline}</span>
                    </span>
                  </div>

                  <span className="font-mono text-xs uppercase tracking-widest text-[#22D3EE] font-medium block">
                    {item.phase}
                  </span>

                  <h3 className="font-display text-xl font-medium text-white mt-1">
                    {item.title}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Deep Phase Focus View */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0F1426] via-[#0A0E1D] to-[#070914] border border-white/10 relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between gap-4 pb-8 mb-8 border-b border-white/10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-xs uppercase tracking-wider">
                    {roadmapData[selectedPhaseIdx].phase}
                  </span>
                  <span className="font-mono text-xs text-neutral-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Horizon: {roadmapData[selectedPhaseIdx].timeline}</span>
                  </span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-normal text-white">
                  {roadmapData[selectedPhaseIdx].title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                {roadmapData[selectedPhaseIdx].status === 'current' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Active Execution
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-xs font-mono">
                    Scheduled Pipeline
                  </span>
                )}

                <button
                  onClick={() => setExpandedDetails(!expandedDetails)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-white/10 text-xs font-mono text-neutral-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span>{expandedDetails ? 'Collapse' : 'Expand'}</span>
                  {expandedDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {expandedDetails && (
              <div className="animate-in fade-in duration-200">
                <h4 className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-6 flex items-center gap-2">
                  <Milestone className="w-4 h-4 text-cyan-400" />
                  <span>Primary Deliverables & Architectural Gates</span>
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  {roadmapData[selectedPhaseIdx].milestones.map((milestone, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-colors flex items-start gap-3.5"
                    >
                      <div className="p-1 rounded-full bg-cyan-950 text-cyan-400 shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <p className="text-sm text-neutral-200 font-light leading-relaxed">
                        {milestone}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ============================================================ */}
        {/* MOBILE LAYOUT (< 1024px): Continuous Vertical Glowing Timeline */}
        {/* ============================================================ */}
        <div className="lg:hidden relative pl-6 sm:pl-8 space-y-6">
          {/* Vertical spine timeline line */}
          <div className="absolute top-2 bottom-6 left-2.5 sm:left-3.5 w-0.5 bg-gradient-to-b from-[#22D3EE] via-[#3B82F6] to-purple-600/40" />

          {roadmapData.map((item, idx) => {
            const isExpanded = mobileExpandedPhases[idx];
            const isCurrent = item.status === 'current';

            return (
              <div key={idx} className="relative">
                {/* Timeline Node on Spine */}
                <div
                  className={`absolute -left-[23px] sm:-left-[27px] top-4 w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                    isCurrent
                      ? 'bg-cyan-400 ring-4 ring-cyan-400/30'
                      : 'bg-[#0B1020] border-2 border-white/40'
                  }`}
                >
                  {isCurrent && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                </div>

                {/* Mobile Phase Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/30 transition-all shadow-xl">
                  {/* Card Header */}
                  <div
                    onClick={() => toggleMobilePhase(idx)}
                    className="flex items-start justify-between gap-3 cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[11px] font-mono text-[#22D3EE] uppercase tracking-wider font-semibold">
                          {item.phase}
                        </span>
                        <span className="text-neutral-500">·</span>
                        <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-cyan-400" />
                          <span>{item.timeline}</span>
                        </span>
                      </div>

                      <h3 className="font-display text-xl sm:text-2xl font-medium text-white">
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 mt-1">
                      {isCurrent ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono whitespace-nowrap">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-[10px] font-mono whitespace-nowrap">
                          Planned
                        </span>
                      )}

                      <button
                        className="p-1 text-neutral-400 hover:text-white"
                        aria-label={isExpanded ? 'Collapse Phase' : 'Expand Phase'}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Milestones List for Mobile */}
                  {isExpanded && (
                    <div className="pt-4 mt-4 border-t border-white/10 space-y-2.5 animate-in fade-in duration-200">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                        Key Milestones & Gates:
                      </span>
                      {item.milestones.map((milestone, mIdx) => (
                        <div key={mIdx} className="flex items-start gap-2.5 text-xs text-neutral-300 font-light leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{milestone}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
