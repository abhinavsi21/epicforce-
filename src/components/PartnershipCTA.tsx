import React from 'react';
import { ArrowUpRight, Handshake, Users, Mail } from 'lucide-react';
import { ContactReason } from '../types';

interface PartnershipCTAProps {
  onSelectAction: (reason: ContactReason) => void;
}

export const PartnershipCTA: React.FC<PartnershipCTAProps> = ({ onSelectAction }) => {
  return (
    <section
      id="invest"
      className="relative py-20 sm:py-24 md:py-32 bg-[#0B1020] text-white border-t border-white/10 overflow-hidden w-full max-w-[100vw]"
    >
      {/* Subtle Glow Backdrop */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 text-center relative z-10 w-full">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-[#38BDF8] uppercase mb-5">
          <Handshake className="w-3.5 h-3.5" />
          <span>Alignment & Capital</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-white mb-4 sm:mb-6">
          BUILD WITH <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-sky-300">US.</span>
        </h2>

        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl text-neutral-300 font-light leading-relaxed mb-8 sm:mb-10 text-balance px-2">
          EpicForce.ai is building an ecosystem of products focused on human potential, intelligent technology, and meaningful impact.
        </p>

        {/* Action Options (Full-width buttons on mobile with 48px touch targets) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto w-full px-2">
          <button
            onClick={() => onSelectAction('Investment / Partnership')}
            className="group w-full sm:w-auto px-7 py-3.5 min-h-[48px] rounded-xl bg-white text-[#0B1020] hover:bg-neutral-100 font-medium text-sm tracking-wide transition-all shadow-xl shadow-blue-500/10 inline-flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 active:scale-[0.98]"
          >
            <Handshake className="w-4 h-4 text-blue-600" />
            <span>Invest / Partner</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button
            onClick={() => onSelectAction('Product Collaboration')}
            className="group w-full sm:w-auto px-7 py-3.5 min-h-[48px] rounded-xl border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-medium text-sm tracking-wide transition-all inline-flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98]"
          >
            <Users className="w-4 h-4 text-cyan-400" />
            <span>Collaborate</span>
          </button>

          <button
            onClick={() => onSelectAction('General Inquiry')}
            className="group w-full sm:w-auto px-7 py-3.5 min-h-[48px] rounded-xl border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white font-medium text-sm tracking-wide transition-all inline-flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98]"
          >
            <Mail className="w-4 h-4 text-neutral-400" />
            <span>Contact Us</span>
          </button>
        </div>

        {/* Integrity note */}
        <p className="text-xs text-neutral-400 font-mono mt-8">
          Early-stage · Mission-driven · Globally oriented
        </p>
      </div>
    </section>
  );
};
