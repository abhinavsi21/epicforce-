import React from 'react';
import { whyEpicforceData } from '../data/whyEpicforce';
import { Check, ShieldCheck, Zap, Layers, Compass } from 'lucide-react';

export const WhyEpicforce: React.FC = () => {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0: return <Compass className="w-5 h-5 text-cyan-400" />;
      case 1: return <Zap className="w-5 h-5 text-blue-400" />;
      case 2: return <ShieldCheck className="w-5 h-5 text-purple-400" />;
      case 3: return <Layers className="w-5 h-5 text-emerald-400" />;
      default: return <Compass className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section
      id="why-epicforce"
      className="relative py-28 md:py-36 bg-[#070A16] text-white border-t border-white/10 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/3 left-10 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs font-semibold tracking-widest text-[#22D3EE] uppercase">
              07 / STRATEGIC FOUNDATIONS
            </span>
            <span className="h-px w-10 bg-[#22D3EE]/40" />
            <span className="text-xs font-mono text-neutral-400">The Thesis</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal leading-tight text-white mb-6">
            WHY EPICFORCE? <br />
            <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-sky-300">
              Technology with a human thesis.
            </span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed">
            Rather than chasing ephemeral hype cycles, we adhere to four durable architectural principles that guide how we formulate ideas, build software, and scale impact.
          </p>
        </div>

        {/* 4 Thesis Quadrants / Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {whyEpicforceData.map((item, idx) => (
            <div
              key={item.id}
              className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-white/[0.05] via-white/[0.02] to-transparent border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-semibold tracking-wider text-[#22D3EE] uppercase">
                    {item.tag}
                  </span>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                    {getIcon(idx)}
                  </div>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-medium text-white mb-3">
                  {item.title}
                </h3>

                <h4 className="text-base font-medium text-neutral-200 mb-4 leading-snug">
                  {item.headline}
                </h4>

                <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10">
                <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
                  {item.bulletPoints.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5">
                      <div className="p-0.5 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-400 shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-light">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
