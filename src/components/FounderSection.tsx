import React from 'react';
import { founders } from '../data/founders';
import { Quote, Sparkles, ArrowUpRight, Instagram, Linkedin } from 'lucide-react';
import { FounderImage } from './assets/FounderImage';

export const FounderSection: React.FC = () => {
  return (
    <section
      id="founders"
      className="relative py-28 md:py-36 bg-[#080B14] text-white border-t border-white/10 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/4 left-10 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs font-semibold tracking-widest text-[#22D3EE] uppercase">
              04 / LEADERSHIP & PHILOSOPHY
            </span>
            <span className="h-px w-10 bg-[#22D3EE]/40" />
            <span className="text-xs font-mono text-neutral-400">Founders</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal leading-tight text-white mb-6">
            THE PEOPLE <br />
            BEHIND <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-sky-300">EPICFORCE.</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed">
            Built by people who believe technology should create meaning, not just efficiency.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {founders.map((founder, idx) => (
            <div
              key={founder.id}
              className="group relative flex flex-col justify-between rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 p-6 sm:p-8 md:p-10 transition-all duration-300 hover:bg-white/[0.05] shadow-2xl"
            >
              <div>
                {/* Header Lockup: Portrait + Identification */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 pb-8 border-b border-white/10">
                  {/* Portrait Framing with reusable FounderImage component (3:4 ratio) */}
                  <div className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-2xl overflow-hidden bg-neutral-900 border border-white/20 shrink-0 shadow-lg shadow-black/50">
                    <FounderImage
                      founderId={founder.id === 'anish-timble' ? 'anish-timble' : 'abhinav-singh'}
                      name={founder.name}
                    />
                  </div>

                  <div>
                    <h3 className="font-display text-3xl font-medium text-white group-hover:text-[#22D3EE] transition-colors">
                      {founder.name}
                    </h3>
                    <div className="font-mono text-xs tracking-wider uppercase text-[#38BDF8] mt-1 font-semibold">
                      {founder.role}
                    </div>
                    <div className="text-xs text-neutral-400 font-mono mt-2 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#22D3EE]" />
                      <span>{founder.focus}</span>
                    </div>
                  </div>
                </div>

                {/* Key Founder Quote (Audit 13) */}
                {founder.quote && (
                  <div className="relative mb-8 pl-5 border-l-2 border-[#3B82F6]/60">
                    <Quote className="w-4 h-4 text-[#3B82F6] absolute -top-1 -left-2.5 opacity-80" />
                    <p className="font-display text-xl sm:text-2xl italic font-normal text-neutral-100 leading-snug">
                      “{founder.quote}”
                    </p>
                  </div>
                )}

                {/* Narrative Bio */}
                <div className="space-y-3.5 text-neutral-300 text-sm sm:text-base font-light leading-relaxed mb-8">
                  {founder.bio.map((paragraph, pIdx) => (
                    <p key={pIdx}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Bottom decorative anchor line & Verified Profile Link */}
              <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400 font-mono">
                <a
                  href={founder.connectUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-neutral-300 hover:text-[#22D3EE] transition-colors group/link"
                  aria-label={`Connect with ${founder.name} on ${founder.connectPlatform === 'instagram' ? 'Instagram' : 'LinkedIn'}`}
                >
                  {founder.connectPlatform === 'instagram' ? (
                    <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
                  ) : (
                    <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                  )}
                  <span>Connect with {founder.name.split(' ')[0]}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 text-[#22D3EE]" />
                </a>

                <span className="text-[#22D3EE]">0{idx + 1} / 02</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
